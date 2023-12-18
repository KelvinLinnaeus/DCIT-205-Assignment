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


app.post('/startVisitation', async (req, res) => {
  try {
    const newEncounter = await Encounter.create(req.body);
    res.status(201).json(newEncounter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/submitVitals', async (req, res) => {
  try {
    const newVitals = await Vitals.create(req.body);
    res.status(201).json(newVitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/patient/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
