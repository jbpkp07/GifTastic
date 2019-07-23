"use strict";
/* global Utility */

class Model {

    constructor() {

        this._topicGifs = [];
        this._topicsKey = "_gifTasticTopics";

        this._apiLimit = 10;
        this._giphyAPI = new GiphyAPI(this._apiLimit);

        this.assignTopicsFromLocalStorage();
    }

    assignTopicsFromLocalStorage() {

        if (localStorage.getItem(this._topicsKey) === null) {

            this._topicGifs.push(new TopicGifs("Computers", false));
            this._topicGifs.push(new TopicGifs("Lakers", false));
            this._topicGifs.push(new TopicGifs("Disc Golf", false));

            this.setTopicsInLocalStorage();
        }
        else {

            this.getTopicsFromLocalStorage();
        }
    }

    getTopicsFromLocalStorage() {

        let simpleTopics = JSON.parse(localStorage.getItem(this._topicsKey));

        for (let topic of simpleTopics) {

            this._topicGifs.push(new TopicGifs(topic, false));
        }
    }

    setTopicsInLocalStorage() {

        let simpleTopics = [];

        for (let topic of this._topicGifs) {

            simpleTopics.push(topic._topic);
        }

        localStorage.setItem(this._topicsKey, JSON.stringify(simpleTopics));
    }

    addTopic(simpleTopic) {

        if (simpleTopic.length < 1) {

            return;
        }

        if (typeof this._topicGifs.find(topicOBJ => topicOBJ._topic === simpleTopic) === 'undefined') {

            this._topicGifs.push(new TopicGifs(simpleTopic, false));

            this.setTopicsInLocalStorage();
        }
    }

    removeTopic(simpleTopic) {

        this._topicGifs = this._topicGifs.filter(topicOBJ => topicOBJ._topic !== simpleTopic);

        this.setTopicsInLocalStorage();
    }

    selectTopic(simpleTopic) {

        let topic = this._topicGifs.find(topicOBJ => topicOBJ._topic === simpleTopic);

        topic.selectTopic();

        if (topic._apiResponse === null) {
  
            this._giphyAPI.getGifsFromAPI(simpleTopic).then(() => {

                topic.assignGifs(this._giphyAPI._apiResponse);

                dispatchEvent(new CustomEvent("renderGifs"));
            });
        } 
        else {

            dispatchEvent(new CustomEvent("renderGifs"));
        }
    }

    unSelectTopic(simpleTopic) {

        let topic = this._topicGifs.find(topicOBJ => topicOBJ._topic === simpleTopic);

        topic.unSelectTopic();
    }
}


class TopicGifs {

    constructor(topic, isSelected) {

        this._topic = topic;
        this._isSelected = isSelected;

        this._apiResponse = null;
        this._stillGifs = [];
        this._animatedGifs = [];
    }

    selectTopic() {

        this._isSelected = true;
    }

    unSelectTopic() {

        this._isSelected = false;
    }

    assignGifs(apiResponse) {

        if (this._apiResponse === null) {

            this._apiResponse = apiResponse;

            for (let gifPackage of this._apiResponse.data) {

               this.buildStillImageHTML(gifPackage);
            }
        }
    }

    buildStillImageHTML(gifPackage) {

        let stillGif = new Image();

        stillGif.src = gifPackage.images.original_still.url;

        this.buildGifHTML(stillGif);
    }

    buildGifHTML(img) {

        $(img).addClass("gif");

        let gifBox = $("<div>").addClass("gifBox").append(img);

        let sideBar = $("<div>").addClass("sideBar").text("Rating: PG");

        let gifWrapper = $("<div>").addClass("gifWrapper").append(gifBox, sideBar);

        this._stillGifs.push(gifWrapper);
    }
}


class GiphyAPI {

    constructor(limit) {

        this._apiRoot = "https://api.giphy.com/v1/gifs/search";
        this._apiKey = "api_key=KLZEzDR0Dtlp37kOPbcElqrIsQGzbmfQ";
        this._apiQuery = "q=";
        this._apiLimit = "limit=" + limit;
        this._apiLang = "lang=en";

        this._apiResponse = null;

        this._areGifsConsumed = false;
    }

    getGifsFromAPI(simpleTopic) {

        let apiURL = this.generateAPIUrl(simpleTopic);

        let connection = {
            url: apiURL,
            method: "Get"
        };

        this._areGifsConsumed = false;

        $.ajax(connection).then((response) => {

            if (response.meta.status !== 200 || response.meta.msg !== "OK") {

                alert("Giphy API did not return results. Please refresh page and try again.");
                throw new Error("Class:Model:getGifsFromAPI Giphy API did not respond correctly");
            }

            this._apiResponse = response;

            this._areGifsConsumed = true;

        }).catch(() => {

            alert("Giphy API did not return results. Please refresh page and try again.");
            throw new Error("Class:Model:getGifsFromAPI Giphy API did not respond correctly");
        });

        return Utility.createPromise(() => this._areGifsConsumed === true);
    }

    generateAPIUrl(simpleTopic) {

        let apiUrl =
            this._apiRoot + "?" +
            this._apiKey + "&" +
            this._apiQuery + simpleTopic + "&" +
            this._apiLimit + "&" +
            this._apiLang;

        return apiUrl;
    }
}