import observable = require("data/observable");
import frameModule = require('ui/frame');

export class MeetupModel extends observable.Observable {

    get categoricalSource() {
      return [
        { Time: "6:00", Count: 2},
        { Time: "6:30", Count: 5 },
        { Time: "7:00", Count: 10, },
        { Time: "7:30", Count: 5},
        { Time: "8:00", Count: 2},
        { Time: "8:30", Count: 0}
      ]
    }

    constructor() {
        super();
    }

    public draw(){
      frameModule.topmost().navigate("draw-page");
    }

    public onTap() {
        console.log("here");
    }
}
