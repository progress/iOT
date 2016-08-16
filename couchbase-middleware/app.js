
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var util = require('util');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var ConnectionModule = require(__dirname + '/connection');

var connection = new ConnectionModule.Connection();

var SettingsModule =  require(__dirname + '/settings')

var settings = new SettingsModule.Settings(connection.db);

new  require(__dirname + '/schema').Schema(settings.mongoose);

var RouteModule = require(__dirname + '/routes');

new RouteModule.Routes(app, settings);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

  var WebSocketClient = require('websocket').client;

  var client = new WebSocketClient();

  var buffer = new Buffer(util.format("%s:%s", 'progressfollowerdemo@amtech.mx/progressfollowersdemo', 'Test1234'));

  var auth = util.format("Basic %s", buffer.toString('base64'));
  var uri = util.format("wss://dap.amtech.mx/amtech/push/notifications");

  // amtech websocket Initializization.
  client.connect(uri, null, null, {
      "Authorization" : auth
  });

  /*

  {"creationDate":"2016-01-29T20:48:55.084+00:00","body":"Attendee urn:epc:tag:grai:0606353.00004.1308 exit from room /amtech/things/entities/usa:lasVegas:fourSeasons:level2:AccaciaBR1","guestusers":[],"_tenant":"progressnext2016","thinguri":"/amtech/things/entities/urn:epc:tag:grai:0606353.00004.1308","recipients":[null],"description":"","guesttenants":["progressnext2016"],"subject":"Attendee urn:epc:tag:grai:0606353.00004.1308 exit from room /amtech/things/entities/usa:lasVegas:fourSeasons:level2:AccaciaBR1","@type":"/amtech/activities/progressNext2016/notifications/AttendeeExit","_resourcestatus":"valid","_name":"1607c3393c8e4a55aa6edaadef4c3a4a","@id":"/amtech/notifications/instances/1607c3393c8e4a55aa6edaadef4c3a4a","_user":"progresscreator@amtech.mx"}

  { type: 'utf8',
  utf8Data: '{"creationDate":"2016-07-27T23:44:34.278+00:00","body":"From ProgressBridgeConfigDemo:b8:27:eb:bd:89:ee:llrpAntennaConfigDemo1 - smoothingResult: new - epcString: e280116060000205529dca97 - epcUri: urn:epc:raw:96.xe280116060000205529dca97 - producer: ProgressBridgeConfigDemo:b8:27:eb:bd:89:ee:LLRPReaderConfigDemo - tagEncoding: raw - location: {\\"wkt\\":\\"POINT(-122.1632072 37.4446387)\\",\\"sContext\\":\\"geo\\"}","guestusers":[],"_tenant":"progressfollowersdemo","thinguri":"","recipients":[null],"guesttenants":[],"description":"description of EPC, with placeholders","@type":"/amtech/activities/bridgeConfigDemo/notifications/sawAnEPC","subject":"read from ProgressBridgeConfigDemo:b8:27:eb:bd:89:ee:llrpAntennaConfigDemo1","_resourcestatus":"valid","_name":"fe108fa0f6ed45658fddc4e8aa7ee27a","@id":"/amtech/notifications/instances/fe108fa0f6ed45658fddc4e8aa7ee27a","_creationdatemillis":1469663074278,"_user":"epelegrillopart@gmail.com"}' }

  */

  var _connection;

  client.on('connect', function(connection) {
      _connection = connection

      var url = util.format('http://%s:%s/api/track','localhost', server.address().port);

      connection.on('error', function(error) {
          console.log("Connection Error: " + error.toString());
      });
      connection.on('message', function(message) {
          if (message.type === 'utf8'){
              var data = message.utf8Data;
              var json = JSON.parse(data);

              var match = json.body.match(/epcString:[^-][^\s]+/);

              if (match.length) {
                var tagId = match[0].split(":")[1].trim();

                var request = require('request');

                request.post({
                    url : url,
                    headers: {'content-type' : 'application/json'},
                    body : JSON.stringify({
                       firstName : "Epc",
                       lastName: tagId,
                       id:  tagId
                    })
                }, function(err, response, body){

                });
              }
          }
      });

      connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
      });
  });

  //  process.on('SIGINT', function () {
  //     _connection.close();
  //  });

  client.on('connectFailed', function(error) {
      console.log('Connect Error: ' + error.toString());
  });

});
