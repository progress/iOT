import {Promise} from 'node-promise';

export class Settings {
    Promise:any;
    mongoose:any;

    google_api_key:any;
    syncGateway:any;

    constructor(mongoose){
      this.Promise = Promise;
      this.mongoose = mongoose;
      this.google_api_key = "AIzaSyB2Tvz5Eutu6harY_0qGTvZrOuFnC5RGig";
      this.syncGateway = process.env.SYNC_GATEWAY || 'http://localhost:4984/test-database/';
    }
}
