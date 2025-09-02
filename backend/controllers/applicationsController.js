const { createApplication, getApplicationById } = require('../models/application');
const generateApplicationId = require('../utils/generateApplicationId');

async function submitApplication(req, res) {
  try {
    const { name, email, phone, address } = req.body;
    if (!name || !email || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const citizenship = req.files?.citizenship ? req.files.citizenship[0].path : null;
    const photo = req.files?.photo ? req.files.photo[0].path : null;

    const application_id = generateApplicationId();
    const newApp = await createApplication({ application_id, name, email, phone, address, citizenship, photo });

    res.status(201).json({
      message: "Application submitted successfully",
      application_id: newApp.application_id,
      citizenship: newApp.citizenship,
      photo: newApp.photo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function trackApplication(req, res) {
  try {
    const { application_id, email } = req.body;

    if (!application_id || !email) {
      return res.status(400).json({ message: "application_id and email are required" });
    }

    const app = await getApplicationById(application_id);
    if (!app) return res.status(404).json({ message: "Application not found" });

    if (email !== app.email) {
      return res.status(403).json({ message: "Email does not match application record" });
    }

    res.json({
      application_id: app.application_id,
      name: app.name,
      status: app.status,
      submitted_at: app.created_at,
      citizenship: app.citizenship, 
      photo: app.photo,             
      comments: app.comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = { submitApplication, trackApplication };
