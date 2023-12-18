const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/electronicMedicalRecordSystem', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


const patientSchema = new mongoose.Schema({
  patientID: String,
  surname: String,
  otherNames: String,
  gender: String,
  phoneNumber: String,
  residentialAddress: String,
  emergencyContact: {
    name: String,
    contact: String,
    relationship: String,
  },
});

const visitationSchema = new mongoose.Schema({
  patientID: String,
  dateAndTime: Date,
  encounterType: String,
});

const vitalsSchema = new mongoose.Schema({
  patientID: String,
  bloodPressure: String,
  temperature: String,
  pulse: String,
  spO2: String,
});

const Vitals = mongoose.model('Vitals', vitalsSchema);
const Encounter = mongoose.model('Visitation', visitationSchema);
const Patient = mongoose.model('Patient', patientSchema);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/registerPatient', async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

