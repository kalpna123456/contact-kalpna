const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Yeh frontend se data lane ke liye zaroori hai

// 1. Apne MongoDB ka asli link yahan paste karein (Sabse aasan tariqa)
// mongodb connect
mongoose.connect("mongodb+srv://kalpna:xjbiZnAIbVLUTRnj@cluster0.eqwffvd.mongodb.net/contact-kalpna")
  .then(() => console.log("Database Connect Ho Gaya!"))
  .catch(err => console.log("Error:", err));

// 2. Data ka structure (Schema)
const Contact = mongoose.model('Contact', new mongoose.Schema({
  name: String,
  email: String,
  message: String
}));

// 3. Data receive karne ka raasta (Route)
app.post('/api/contact', async (req, res) => {
  try {
    const nayaData = new Contact(req.body); // Form ka data pakda
    await nayaData.save();                  // Database me save kiya
    res.json({ success: true });            // React ko bataya ke kaam ho gaya
  } catch (error) {
    res.json({ success: false });
  }
});

// Server ko port 5000 par chalana
app.listen(5000, () => 
    console.log("Server ready hai port 5000 par!"));
module.exports = app;
