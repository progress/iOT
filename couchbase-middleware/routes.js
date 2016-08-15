"use strict";
var fs = require('fs');
var Routes = (function () {
    function Routes(app, settings) {
        this.app = app;
        this.settings = settings;
        var _this = this;
        this.app.post('/api/track', function (req, res) {
            var body = req.body;
            var mongoose = _this.settings.mongoose;
            var Model = mongoose.model('person');
            Model.findOne({
                tagId: body.id
            }, function (err, person) {
                if (person === null) {
                    person = new Model();
                    person.tagId = body.id;
                    person.firstName = body.firstName;
                    person.lastName = body.lastName;
                    person.isDirty = false;
                    person.save(function (err, person) {
                        res.json(person);
                    });
                }
                else {
                    res.json(person);
                }
            });
        });
        app.get('/api/winner', function (req, res) {
            var mongoose = _this.settings.mongoose;
            fs.readFile(__dirname + '/data/data.json', 'utf8', function (err, data) {
                if (!err) {
                    var json_1 = JSON.parse(data);
                    var result = [];
                    var Model = mongoose.model('person');
                    Model.find({ isDirty: false }, function (err, people) {
                        for (var idx in people) {
                            var person = people[idx];
                            if (json_1[person.tagId]) {
                                result.push({
                                    person: person,
                                    id: json_1[person.tagId]
                                });
                            }
                        }
                        var randomIdx = Math.floor(Math.random() * (result.length - 1));
                        if (result[randomIdx]) {
                            var person = result[randomIdx].person;
                            person.isDirty = true;
                            person.save(function (err, person) {
                                if (!err) {
                                    res.json({
                                        "message": "Tag #" + result[randomIdx].id,
                                        "epc": person.tagId
                                    });
                                }
                                else {
                                    res.json(err);
                                }
                            });
                        }
                        else {
                            res.json({
                                message: "That's it for now."
                            });
                        }
                    });
                }
            });
        });
    }
    return Routes;
}());
exports.Routes = Routes;
