var express = require('express');
var router = express.Router();
const dbo = require('../assets/db');


/* GET home page. */
router.all('/', async function(req, res, next) {
  console.log(req.body);
  let jobs = [];

  if(Object.keys(req.body).length > 0) {
    const dbConnect = await dbo.getDb();
    const criteria = {}
    if(req.body.job !== '') {
      criteria.job = {
        $regex: '^'+req.body.job,
        $options: "i"
      }
    }
    if(req.body.shipment !== '') {
      criteria.shipment = {
        $regex: '^'+req.body.shipment,
        $options: "i"
      }
    }
    jobs = await dbConnect.collection("brokerage_job").find(criteria).toArray();
    console.log('Jobs Found', jobs.length);
  }

  res.render('index', { 
    jobSearch: (req.body.job !== undefined ? req.body.job : ''),
    shipmentSearch: (req.body.shipment !== undefined ? req.body.shipment : ''),
    jobs: jobs
  });
});


module.exports = router;
