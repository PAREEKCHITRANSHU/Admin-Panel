// adminController.js
const Supervisor = require("../model/Supervisor");
const Branch = require("../model/branch");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Admin=require("../model/admin");
// Controller for the Admin Dashboard
exports.getAdminDashboard =async (req, res) => {
  const lead=await Admin.find();
  res.render("admin/admin",{lead});
};

// Controller for the Supervisor Dashboard
exports.getSupervisor = async (req, res) => {
  let lead=await Supervisor.find();
  res.render("admin/supervisor",{lead});
};
exports.getBranch =async (req, res) => {
  let lead=await Branch.find();
  res.render("admin/branch",{lead});
};
//sign and log page
exports.signinpage =async (req, res) => {
  res.render("admin/signin");
};
exports.loginpage =async (req, res) => {
  res.render("admin/login");
};

//signin activity
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exist",
      });
    }
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }
    const user = await Admin.create({
      username,
      email,
      password: hashPassword,
    });
    res.redirect("/admin/login");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User can not be registered",
    });
  }
};

//login activity
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });
    if (!user) {
      return res.render("admin/error404");
    }
    const payload = {
      email: user.email,
      id: user._id,
      username: user.username,
    };
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (Date.now() >= decodedToken.exp * 1000) {
        // Token is expired, redirect to login page
        return res.redirect("/admin/login");
      }
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      // console.log(token);
      res.cookie("token", token, options);
      return res.redirect("/admin/home");
    } else {
      return res.render("error404");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};

exports.logout = (req, res) => {
  try {
    // Clear the admin token cookie
    res.clearCookie("token");
    return res.redirect("/admin/login");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "logout failure",
    });
  }
};