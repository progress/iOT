"use strict";
var draw_view_model_1 = require("./draw-view-model");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new draw_view_model_1.DrawModel();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=draw-page.js.map