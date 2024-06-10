const Branch = require("../model/branch");

// To get the data
exports.branchdetails = async (req, res) => {
  try {
    const { name, mobile, branch } = req.body;
    const assign = await Branch.create({ name, mobile, branch });
    res.redirect('/admin/Branch');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "error caught",
    });
  }
};

// To update data
exports.branchupdateinfo = async (req, res) => {
  try {
    // Initiate id
    const { leadId, name, mobile } = req.body;
    const assign = await Branch.findByIdAndUpdate(
      { _id: leadId },
      { name, mobile },
      { new: true } // Return the updated document
    );
    // If id not found
    if (!assign) {
      return res.status(404).json({
        success: false,
        message: "ID not found",
      });
    }
    res.redirect('/admin/Branch');
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// To delete info
exports.branchdltdata = async (req, res) => {
  try {
    const { id } = req.params;
    const dlt = await Branch.findByIdAndDelete(id);
    if (!dlt) {
      return res.status(404).json({
        success: false,
        message: "ID not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Data deleted",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
