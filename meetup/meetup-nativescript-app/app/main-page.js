"use strict";
var main_view_model_1 = require("./main-view-model");
var http = require('http');
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var model = new main_view_model_1.MeetupModel();
    var url = global.MIDDLEWARE_ENDPOINT + "/api/track";
    var _this = this;
    model.isLoading = true;
    var promise = http.request({
        url: url,
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    var success = function (result) {
        var data = JSON.parse(result.content);
        model.set("source", data);
        model.isLoading = false;
    };
    var error = function (error) {
        console.error(JSON.stringify(error));
        model.isLoading = false;
    };
    promise.then(success, error);
    page.bindingContext = model;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map