const express = require('express');
const router = express.Router();
const dbo = require('../assets/db');
const Job = require('../model/job');

/* GET jobs listing. */
router.get('/', async function(req, res, next) {
  try {
    const dbConnect = await dbo.getDb();
    const findResult = await dbConnect.collection("brokerage_job").find({}).toArray();
    res.json(findResult);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET specific jobs. */
router.get('/:job', async function(req, res, next) {
  try {
    const dbConnect = await dbo.getDb();
    const findResult = await dbConnect.collection("brokerage_job").find({"job":req.params.job}).toArray();
    res.json(findResult);
  } catch (error) {
    res.status(500).send(error);
  }
});


/* GET specific shipment. */
router.get('/shipment/:shipment', async function(req, res, next) {
  try {
    const dbConnect = await dbo.getDb();
    const findResult = await dbConnect.collection("brokerage_job").find({"shipment":req.params.shipment}).next();
    res.json(findResult);
  } catch (error) {
    res.status(500).send(error);
  }
});


/* POST create a new Job*/
router.post('/', async function(req, res, next) {
  try {
    const job = new Job(req.body);
    console.log("job",job)
    const dbConnect = await dbo.getDb();
    await dbConnect.collection('brokerage_job').insertOne(job);
    res.json(job);
  } catch (error) {
    res.status(500).send(error);
  }
}); 

/* POST update a shipment location*/
router.post('/updatelocation', async function(req, res, next) {
  try {
    const job = new Job(req.body, {skipJob:true, skipStatus:true});
    const dbConnect = await dbo.getDb();
    // Ignores other data sent on Job and updates Lat/Long
    await dbConnect.collection('brokerage_job').updateOne(
      {"shipment" : job.shipment,},
      {
        $set: {
          "latitude":job.latitude,
          "longitude":job.longitude
        }
      });
    res.json(job);
  } catch (error) {
    res.status(500).send(error)
  }
}); 

module.exports = router;
