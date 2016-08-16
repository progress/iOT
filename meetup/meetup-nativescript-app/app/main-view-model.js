"use strict";
var observable = require("data/observable");
var frameModule = require('ui/frame');
var MeetupModel = (function (_super) {
    __extends(MeetupModel, _super);
    function MeetupModel() {
        _super.call(this);
        this._data = [];
        this._isLoading = false;
    }
    Object.defineProperty(MeetupModel.prototype, "source", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (value.length) {
                this._data = value;
                this.notifyPropertyChange("source", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MeetupModel.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            if (this._isLoading !== value) {
                this._isLoading = value;
                this.notifyPropertyChange("isLoading", value);
            }
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