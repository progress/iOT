import request = require('request');
import fs = require('fs');

export class Routes  {

    app:any;
    settings:any;

    constructor(app, settings){
        this.app = app;
        this.settings = settings;

        let _this = this;

        this.app.post('/api/track', (req, res)=> {
            let body = req.body;
            let mongoose = _this.settings.mongoose;

            let Model = mongoose.model('person');

            Model.findOne({
                tagId : body.id
            }, (err, person)=>{
                if (person === null){
                    person = new Model();

                    person.tagId = body.id;
                    person.firstName = body.firstName;
                    person.lastName = body.lastName;
                    person.isDirty = false

                    person.save ((err, person)=> {
                        res.json(person);
                        // request.post({
                        //     url : _this.settings.syncGateway,
                        //     headers: {
                        //       "Content-Type" : 'application/json'
                        //     },
                        //     body : JSON.stringify({
                        //         _id : body.id,
                        //         firstname : body.firstName,
                        //         lastname: body.lastName
                        //     });
                        // }, (err, reponse, body) => {
                        //     res.json(body);
                        // });
                    });
                }
                else {
                    res.json(person);
                }
            });
        });

        app.get('/api/winner', (req, res)=>{
              let mongoose = _this.settings.mongoose;

              fs.readFile(__dirname + '/data/data.json', 'utf8', (err, data)=>{
                  if (!err){
                      let json = JSON.parse(data);
                      var result = [];
                      let Model = mongoose.model('person');

                      Model.find({isDirty :false }, (err, people)=>{
                          for(var idx in people){
                            let person = people[idx];

                            if (json[person.tagId]){
                                result.push({
                                   person : person,
                                   id : json[person.tagId]
                                });
                            }
                        }

                        let randomIdx = Math.floor(Math.random() * (result.length -1));

                        if (result[randomIdx]){
                          let person = result[randomIdx].person;

                          person.isDirty = true

                          person.save((err, person)=> {
                            if (!err) {
                              res.json({
                                  "message": "Tag #" + result[randomIdx].id,
                                  "epc": person.tagId
                              })
                            } else {
                              res.json(err);
                            }
                          });

                      }
                      else {
                        res.json({
                            message : "That's it for now."
                        })
                      }
                    });
                  }
              });
        });
    }
}
