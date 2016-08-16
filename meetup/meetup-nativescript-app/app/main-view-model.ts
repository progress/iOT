import observable = require("data/observable");
import frameModule = require('ui/frame');

export class MeetupModel extends observable.Observable {

    private _data:any;
    private _isLoading:any;

    get source() {
      return this._data;
    }

    set source(value: any) {
      if (value.length){
        this._data= value;
        this.notifyPropertyChange("source", value)
      }
    }

    constructor() {
        super();
        this._data = [];
        this._isLoading = false;
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

    public draw(){
      frameModule.topmost().navigate("draw-page");
    }

    public onTap() {
        console.log("here");
    }
}
