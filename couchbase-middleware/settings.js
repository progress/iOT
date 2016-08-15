"use strict";
var node_promise_1 = require('node-promise');
var Settings = (function () {
    function Settings(mongoose) {
        this.Promise = node_promise_1.Promise;
        this.mongoose = mongoose;
        this.google_api_key = "AIzaSyB2Tvz5Eutu6harY_0qGTvZrOuFnC5RGig";
        this.syncGateway = process.env.SYNC_GATEWAY || 'http://localhost:4984/test-database/';
    }
    return Settings;
}());
exports.Settings = Settings;
