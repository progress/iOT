"use strict";
var observable = require("data/observable");
var http = require('http');
var DrawModel = (function (_super) {
    __extends(DrawModel, _super);
    function DrawModel() {
        _super.call(this);
        this._message = "---";
        this._isLoading = false;
    }
    Object.defineProperty(DrawModel.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            if (this._message !== value) {
                this._message = value;
                this.notifyPropertyChange("message", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawModel.prototype, "isLoading", {
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
    DrawModel.prototype.tap = function () {
        var url = global.MIDDLEWARE_ENDPOINT + "/api/winner";
        var _this = this;
        this.message = "---";
        this.isLoading = true;
        var promise = http.request({
            url: url,
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        var success = function (result) {
            var content = JSON.parse(result.content);
            if (content.message) {
                _this.message = content.message;
            }
            _this.isLoading = false;
        };
        var error = function (error) {
            console.error(JSON.stringify(error));
            _this.isLoading = false;
        };
        promise.then(success, error);
    };
    return DrawModel;
}(observable.Observable));
exports.DrawModel = DrawModel;
//# sourceMappingURL=draw-view-model.js.map