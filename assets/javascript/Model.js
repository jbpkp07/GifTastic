"use strict";
/* global Utility */

class Model {

    constructor() {

        this._topics = [];
        this._topicsKey = "_gifTasticTopics";

        this._apiAmount = 10;
        this._giphyAPI = new GiphyAPI(this._apiAmount);

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


class GiphyAPI {

    constructor(amount) {

        this._apiRoot = "https://api.giphy.com/v1/gifs/search";
        this._apiKey = "api_key=KLZEzDR0Dtlp37kOPbcElqrIsQGzbmfQ";
        this._apiQuery = "q=";
        this._apiLimit = "limit=";
        this._apiLang = "lang=en";

        this._APIResponse = null;

        this._AreGifsConsumed = false;
    }

    getGifsFromAPI(topic) {

        let apiURL = this.generateAPIUrl(topic);

        let connection = {
            url: apiURL,
            method: "Get"
        };

        this._AreGifsConsumed = false;

        $.ajax(connection).then((response) => {

            if (response.meta.status !== 200 || response.meta.msg !== "OK") {

                alert("Giphy API did not return results. Please refresh page and try again.");
                throw new Error("Class:Model:getGifsFromAPI Giphy API did not respond correctly");
            }

            this._APIResponse = response;

            this._AreGifsConsumed = true;

        }).catch(() => {

            alert("Giphy API did not return results. Please refresh page and try again.");
            throw new Error("Class:Model:getGifsFromAPI Giphy API did not respond correctly");
        });

        return Utility.createPromise(() => this._AreGifsConsumed === true);
    }

    generateAPIUrl(topic) {

        let apiUrl =
            this._apiRoot + "?" +
            this._apiKey + "&" +


            this._apiAmount + "&" +
            this._apiCategory + categoryNum + "&" +
            this._apiDifficulty + difficulty.toLowerCase() + "&" +
            this._APIType;

        return apiUrl;
    }
}


// class TriviaQuestion {

//     constructor(jsonQuestion) {

//         this._Category = jsonQuestion.category;
//         this._Type = jsonQuestion.type;
//         this._Difficulty = jsonQuestion.difficulty;
//         this._Question = jsonQuestion.question;
//         this._CorrectAnswer = jsonQuestion.correct_answer;
//         this._IncorrectAnswers = jsonQuestion.incorrect_answers;

//         this._Answers = [];

//         this.randomizeAnswers();
//     }

//     randomizeAnswers() {

//         for (let incorrectAnswer of this._IncorrectAnswers) {

//             this._Answers.push(incorrectAnswer);
//         }

//         this._Answers.push(this._CorrectAnswer);

//         this._Answers = this.shuffle(this._Answers);
//     }

//     shuffle(array) {

//         let currentIndex = array.length;
//         let temporaryValue;
//         let randomIndex;

//         while (currentIndex !== 0) {

//           randomIndex = Math.floor(Math.random() * currentIndex);

//           currentIndex--;

//           temporaryValue = array[currentIndex];
//           array[currentIndex] = array[randomIndex];
//           array[randomIndex] = temporaryValue;
//         }

//         return array;
//     }
// }