"use strict";
/* global Utility, isChrome, isFirefox, isEdge, isOpera */

class Model {

    constructor() {

        this._topicGifs = [];
        this._topicsKey = "_gifTasticTopics";

        this._apiLimit = 50;
        this._giphyAPI = new GiphyAPI(this._apiLimit);

        this.assignTopicsFromSessionStorage();
    }

    assignTopicsFromSessionStorage() {

        if (sessionStorage.getItem(this._topicsKey) === null) {

            this._topicGifs.push(new TopicGifs("Lebron James", false));
            this._topicGifs.push(new TopicGifs("Kobe Bryant", false));
            this._topicGifs.push(new TopicGifs("Kevin Durant", false));
            this._topicGifs.push(new TopicGifs("Stephen Curry", false));
            this._topicGifs.push(new TopicGifs("James Harden", false));
            this._topicGifs.push(new TopicGifs("Russell Westbrook", false));
            this._topicGifs.push(new TopicGifs("Magic Johnson", false));
            this._topicGifs.push(new TopicGifs("Kareem Abdul-Jabbar", false));
            this._topicGifs.push(new TopicGifs("Michael Jordan", false));
            this._topicGifs.push(new TopicGifs("Anthony Davis", false));

            this.setTopicsInSessionStorage();
        }
        else {

            this.getTopicsFromSessionStorage();
        }
    }

    getTopicsFromSessionStorage() {

        let simpleTopics = JSON.parse(sessionStorage.getItem(this._topicsKey));

        for (let topic of simpleTopics) {

            this._topicGifs.push(new TopicGifs(topic, false));
        }
    }

    setTopicsInSessionStorage() {

        let simpleTopics = [];

        for (let topic of this._topicGifs) {

            simpleTopics.push(topic._topic);
        }

        sessionStorage.setItem(this._topicsKey, JSON.stringify(simpleTopics));
    }

    addTopic(simpleTopic) {

        simpleTopic = simpleTopic.trim();

        if (simpleTopic.length < 1) {

            return;
        }

        let isTopicAlreadyInHistory = typeof this._topicGifs.find(topicOBJ => topicOBJ._topic.toUpperCase() === simpleTopic.toUpperCase()) !== 'undefined';

        if (!isTopicAlreadyInHistory) {

            this._topicGifs.push(new TopicGifs(simpleTopic, true));

            this.setTopicsInSessionStorage();

            this.selectTopic(simpleTopic);
        }
    }

    removeTopic(simpleTopic) {

        this._topicGifs = this._topicGifs.filter(topicOBJ => topicOBJ._topic !== simpleTopic);

        this.setTopicsInSessionStorage();
    }

    selectTopic(simpleTopic) {

        let topic = this._topicGifs.find(topicOBJ => topicOBJ._topic === simpleTopic);

        if (topic._apiResponse === null) {

            this._giphyAPI.getGifsFromAPI(simpleTopic).then(() => {

                topic.assignGifs(this._giphyAPI._apiResponse);

                if (topic._gifHTMLElements.length === 0) {

                    alert("No Gifs Found For :   " + topic._topic);

                    this.removeTopic(simpleTopic);
                }
                else {

                    this.unSelectAllTopics();

                    topic.selectTopic();
                
                    dispatchEvent(new CustomEvent("renderAllContent"));
                }  
            });
        }
        else {

            this.unSelectAllTopics();

            topic.selectTopic();

            dispatchEvent(new CustomEvent("renderAllContent"));
        }
    }

    unSelectTopic(simpleTopic) {

        let topic = this._topicGifs.find(topicOBJ => topicOBJ._topic === simpleTopic);

        topic.unSelectTopic();
    }

    unSelectAllTopics() {

        for (let topic of this._topicGifs) {

            topic.unSelectTopic();
        }
    }
}


class TopicGifs {

    constructor(topic, isSelected) {

        this._topic = topic;
        this._isSelected = isSelected;

        this._apiResponse = null;
        this._gifHTMLElements = [];
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

            let resultsCount = this._apiResponse.pagination.count;

            let randomResultsIndexes = [];

            if (resultsCount > 10) {

                while (randomResultsIndexes.length < 10) {

                    let randomIndex = Math.floor(Math.random() * resultsCount);

                    if (!randomResultsIndexes.includes(randomIndex)) {

                        randomResultsIndexes.push(randomIndex);
                    }
                }
            }
            else {

                //Not enough results to randomize, so we just load the array with sequential indexes
                for (let i = 0; i < resultsCount; i++) {

                    randomResultsIndexes.push(i);
                }
            }

            for (let i of randomResultsIndexes) {

                let gifPackage = this._apiResponse.data[i];

                let stillSRC = gifPackage.images.original_still.url;

                let stillGif = new Image();

                stillGif.src = stillSRC; //Begin still image downloading immediately

                let animatedSRC;

                if ($(window).width() <= 768) {

                    //If mobile, can't use '.webp' files, so we use '.gif' instead.
                    //To limit data usage, we shift over to smaller gif sizes here.
                    animatedSRC = gifPackage.images.fixed_height_small.url;
                }
                else if (isChrome || isFirefox || isEdge || isOpera) {

                    //Optimized for best quality vs load time (Desktop Browsers > 768px). Use '.webp'
                    animatedSRC = gifPackage.images.fixed_height.webp;
                }
                else {

                    //Can't use smaller, better '.webp' files if using IE or Safari (Desktop Browsers > 768px)
                    //Other Desktop Browser? Use '.gifs'
                    animatedSRC = gifPackage.images.fixed_height.url;
                }

                let animatedGif = new Image();

                if ($(window).width() > 768) {

                    //Only preemptively download animated gifs/webp if NOT on mobile
                    setTimeout(() => {

                        //Begin download after we will likely already have still images (try to get them first!)
                        animatedGif.src = animatedSRC;
                    }, 1000);
                }

                let rating = gifPackage.rating.toUpperCase();

                $(stillGif).addClass("gif").attr("still_src", stillSRC).attr("animated_src", animatedSRC);

                let gifBox = $("<div>").addClass("gifBox").append(stillGif);

                let sideBar = $("<div>").addClass("sideBar").text("Rating: " + rating);

                let gifWrapper = $("<div>").addClass("gifWrapper").attr("hasclicked", "false").append(gifBox, sideBar);

                this._gifHTMLElements.push(gifWrapper);
            }
        }
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

        const apiURL = this.generateAPIUrl(simpleTopic);

        const connection = {
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