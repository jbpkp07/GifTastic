"use strict";
/* global Utility */

class Model {

    constructor() {

        this._topics = [];
        this._topicsKey = "_gifTasticTopics";

        this.assignTopicsFromLocalStorage();
    }

    assignTopicsFromLocalStorage() {

        if (localStorage.getItem(this._topicsKey) === null) {

            this._topics.push(new Topic("Computers", false));
            this._topics.push(new Topic("Lakers", false));
            this._topics.push(new Topic("Disc Golf", false));

            this.setTopicsInLocalStorage();
        }
        else {

            this.getTopicsFromLocalStorage();
        }
    }

    getTopicsFromLocalStorage() {

        let simpleTopics = JSON.parse(localStorage.getItem(this._topicsKey));

        for (let topic of simpleTopics) {

            this._topics.push(new Topic(topic, false));
        }
    }

    setTopicsInLocalStorage() {

        let simpleTopics = [];

        for (let topic of this._topics) {

            simpleTopics.push(topic._topic);
        }

        localStorage.setItem(this._topicsKey, JSON.stringify(simpleTopics));
    }

    addTopic(simpleTopic) {

        if (simpleTopic.length < 1) {

            return;
        }

        if (typeof this._topics.find(topicOBJ => topicOBJ._topic === simpleTopic) === 'undefined') {
            
            this._topics.push(new Topic(simpleTopic, false));

            this.setTopicsInLocalStorage();
        }
    }

    removeTopic(simpleTopic) {

        this._topics = this._topics.filter(topicOBJ => topicOBJ._topic !== simpleTopic);

        this.setTopicsInLocalStorage();
    }

    selectTopic(simpleTopic) {

        let topic = this._topics.find(topicOBJ => topicOBJ._topic === simpleTopic);

        topic.selectTopic();
    }

    unSelectTopic(simpleTopic) {

        let topic = this._topics.find(topicOBJ => topicOBJ._topic === simpleTopic);

        topic.unSelectTopic();
    }
}


class Topic {

    constructor(topic, isSelected) {

        this._topic = topic;

        this._isSelected = isSelected;
    }

    selectTopic() {

        this._isSelected = true;
    }

    unSelectTopic() {

        this._isSelected = false;
    }
}