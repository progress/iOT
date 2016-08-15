"use strict";
var mongoose = require('mongoose');
var Connection = (function () {
    function Connection() {
        var connectionString = process.env.MONGO_URL || 'mongodb://localhost/couchbase-middleware';
        var options = {
            server: {
                socketOptions: {
                    keepAlive: 1,
                    connectTimeoutMS: 30000
                }
            }
        };
        this.db = mongoose.connect(connectionString, options);
    }
    return Connection;
}());
exports.Connection = Connection;
