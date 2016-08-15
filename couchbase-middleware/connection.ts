import mongoose = require('mongoose')

export class Connection {

    db:any;

    constructor(){
      let connectionString = process.env.MONGO_URL || 'mongodb://localhost/couchbase-middleware';

      let options  =  {
          server : {
              socketOptions : {
                keepAlive : 1,
                connectTimeoutMS: 30000
              }
          }
      };

      this.db = mongoose.connect(connectionString, options)
    }
}
