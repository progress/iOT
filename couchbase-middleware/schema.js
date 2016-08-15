"use strict";
var Schema = (function () {
    function Schema(db) {
        var Schema = db.Schema;
        var ObjectId = db.ObjectId;
        var Person = new Schema({
            firstName: String,
            lastName: String,
            tagId: String,
            isDirty: Boolean
        });
        db.model('person', Person);
    }
    return Schema;
}());
exports.Schema = Schema;
