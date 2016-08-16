import { EventData } from "data/observable";
import { Page } from "ui/page";
import { MeetupModel } from "./main-view-model";

import http = require('http');

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    let model = new MeetupModel();

    let url = global.MIDDLEWARE_ENDPOINT + "/api/track";
    let _this = this;

    model.isLoading = true;

    let promise = http.request({
        url : url,
        method: "GET",
        headers: { "Content-Type" : "application/json"}
    });

    let success = (result)=> {
        let data = JSON.parse(result.content);
        model.set("source", data);
        model.isLoading = false;
    };

    let error = (error)=> {
       console.error(JSON.stringify(error));
       model.isLoading = false;
    };

    promise.then(success, error);

    page.bindingContext = model;
}
