const Supervisor = require("../model/Supervisor");

// To get the data
exports.details = async (req, res) => {
  try {
    const { name, mobile, password } = req.body;
    const assign = await Supervisor.create({ name, mobile, password });
    res.redirect('/admin/Supervisor');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "error caught",
    });
  }
};

// To update data
exports.updateinfo = async (req, res) => {
  try {
    // Initiate id
    const { leadId, name, mobile } = req.body;
    const assign = await Supervisor.findByIdAndUpdate(
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
    /*res.status(200).json({
      success: true,
      data: assign,
      message: "Data updated successfully",
    });*/
    res.redirect('/admin/Supervisor');
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
exports.dltdata = async (req, res) => {
  try {
    const {id} = req.params;
    const dlt = await Supervisor.findByIdAndDelete(id);
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
