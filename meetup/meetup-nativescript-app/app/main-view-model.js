"use strict";
var observable = require("data/observable");
var frameModule = require('ui/frame');
var MeetupModel = (function (_super) {
    __extends(MeetupModel, _super);
    function MeetupModel() {
        _super.call(this);
    }
    Object.defineProperty(MeetupModel.prototype, "categoricalSource", {
        get: function () {
            return [
                { Time: "6:00", Count: 2 },
                { Time: "6:30", Count: 5 },
                { Time: "7:00", Count: 10, },
                { Time: "7:30", Count: 5 },
                { Time: "8:00", Count: 2 },
                { Time: "8:30", Count: 0 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    MeetupModel.prototype.draw = function () {
        frameModule.topmost().navigate("draw-page");
    };
    MeetupModel.prototype.onTap = function () {
        console.log("here");
    };
    return MeetupModel;
}(observable.Observable));
exports.MeetupModel = MeetupModel;
//# sourceMappingURL=main-view-model.js.map