const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

let dbConnection = null;


module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        console.log(err)
        // return callback(err);
      }

      dbConnection = db.db("pcb");
      console.log("Successfully connected to MongoDB.");
      // return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
