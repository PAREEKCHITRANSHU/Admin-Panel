const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const  {restrictedArea}= require("../middlewares/user");

router.get("/home", restrictedArea, adminController.getAdminDashboard);
router.get("/Supervisor",  restrictedArea,adminController.getSupervisor);
router.get("/branch",  restrictedArea,adminController.getBranch);
router.get("/",adminController.signinpage);
router.get("/login",adminController.loginpage);

//branchroute
const {
  branchdetails,
  branchupdateinfo,
  branchdltdata,
} = require("../controllers/branchcontroller");

router.post("/branch/assign", restrictedArea, branchdetails);
router.post("/branch/edit",  restrictedArea,branchupdateinfo);
router.delete("/branch/delete/:id", restrictedArea, branchdltdata);

//supervisor route
const {
  details,
  updateinfo,
  dltdata,
} = require("../controllers/supercontroller");

router.post("/Supervisor/assign",  restrictedArea,details);
router.post("/Supervisor/edit",  restrictedArea,updateinfo);
router.delete("/Supervisor/delete/:id", restrictedArea, dltdata);

//sign  in
router.post("/signup",adminController.signup)
//login
router.post("/loginpath",adminController.login)

//logout
router.get("/logout", restrictedArea,adminController.logout);



module.exports = router;
