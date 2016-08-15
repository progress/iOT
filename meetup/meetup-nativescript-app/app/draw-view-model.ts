import observable = require("data/observable");
import http = require('http');

export class DrawModel extends observable.Observable {

    private _message:any;
    private _isLoading:any;

    constructor() {
        super();
        this._message = "---";
        this._isLoading = false;
    }

    get message() {
      return this._message;
    }

    set message(value: string) {
      if (this._message !== value) {
          this._message = value;
          this.notifyPropertyChange("message", value)
      }
    }

    get isLoading() {
      return this._isLoading;
    }

    set isLoading(value: boolean) {
      if (this._isLoading !== value) {
          this._isLoading = value;
          this.notifyPropertyChange("isLoading", value)
      }
    }

    public tap () {
      let url = global.MIDDLEWARE_ENDPOINT + "/api/winner";
      let _this = this;

      this.message = "---";
      this.isLoading = true;

      let promise = http.request({
          url : url,
          method: "GET",
          headers: { "Content-Type" : "application/json"}
      });

      let success = (result)=> {
        let content = JSON.parse(result.content);

        if (content.message){
            _this.message = content.message;
        }
        _this.isLoading = false;
      };

      let error = (error)=> {
         console.error(JSON.stringify(error));
         _this.isLoading = false;
      };

      promise.then(success, error);
    }
}
