"use strict";
/* global Utility */

class Model {

    constructor() {
        
        this._topics = [];
        this._topicsKey = "_gifTasticTopics";
        // this._topicsAreReady = new CustomEvent("topicsReady");


        this.assignTopicsFromLocalStorage();
    }

    assignTopicsFromLocalStorage() {

        if (localStorage.getItem(this._topicsKey) === null) {
            
            this._topics.push("Computers");
            this._topics.push("Lakers");
            this._topics.push("Disc Golf");

            this.setTopicsInLocalStorage();
        }
        else {
    
            this.getTopicsFromLocalStorage();
        }

        // dispatchEvent(this._topicsAreReady);
    }

    getTopicsFromLocalStorage() {

        this._topics = JSON.parse(localStorage.getItem(this._topicsKey));
    }

    setTopicsInLocalStorage() {

        localStorage.setItem(this._topicsKey, JSON.stringify(this._topics));
    }

    removeTopic(topic) {

        this._topics = this._topics.filter(x => x !== topic);

        this.setTopicsInLocalStorage();
    }
}



// class Model {

//     constructor() {

//         this._TriviaQuestions = [];
//         this._TriviaQuestionsIndex = 0;
//         this._CurrentQuestion = null;

//         this._QuestionAmount = 10;

//         this._CategoryPicked = null;
//         this._DifficultyPicked = null;

//         this._AreQuestionsReady = false;
//         this._IsAnotherQuestionAvailable = false;

//         this._Results = {

//             correctAnswers: 0,
//             incorrectAnswers: 0,
//             unanswered: 0,
//             lastResult: "NONE"
//         };

//         this._TriviaAPI = new TriviaAPI(this._QuestionAmount);
//     }

//     static correct() { return "Correct Answer!"; }

//     static incorrect() { return "Incorrect Answer"; }

//     static unanswered() { return "Unanswered..."; }

//     setTriviaQuestions() {

//         this._AreQuestionsReady = false;
//         this._TriviaQuestions = [];

//         if (this._CategoryPicked === null || this._DifficultyPicked === null) {

//             alert("ERROR:  Class:Model:setTriviaQuestions _CategoryPicked or _DifficultyPicked is null");
//             throw new Error("Class:Model:setTriviaQuestions _CategoryPicked or _DifficultyPicked is null");
//         }

//         this._TriviaAPI.getTriviaQuestionsFromAPI(this._CategoryPicked, this._DifficultyPicked).then(() => {

//             for (let question of this._TriviaAPI._APIResponse.results) {

//                 this._TriviaQuestions.push(new TriviaQuestion(question));
//             }
    
//             if (this._TriviaQuestions.length !== this._QuestionAmount) {

//                 alert("ERROR:  Class:Model:setTriviaQuestions TriviaAPI did not return the expected amount of questions");
//                 throw new Error("Class:Model:setTriviaQuestions TriviaAPI did not return the expected amount of questions");
//             }

//             if (this._TriviaQuestions.length > 0) {

//                 this._IsAnotherQuestionAvailable = true;
//             }

//             this._AreQuestionsReady = true;
//         });

//         return Utility.createPromise(() => this._AreQuestionsReady === true);
//     }

//     getNextTriviaQuestion() {

//         this._CurrentQuestion = this._TriviaQuestions[this._TriviaQuestionsIndex];

//         this._TriviaQuestionsIndex++;

//         if (this._TriviaQuestionsIndex === this._QuestionAmount) {

//             this._IsAnotherQuestionAvailable = false;
//         }

//         return this._CurrentQuestion;
//     }

//     updateQuestionAnswered(selectedAnswer) {

//         if (selectedAnswer === this._CurrentQuestion._CorrectAnswer) {

//             this._Results.correctAnswers++;

//             this._Results.lastResult = Model.correct();
//         }
//         else {

//             this._Results.incorrectAnswers++;

//             this._Results.lastResult = Model.incorrect();
//         }
//     }

//     updateQuestionUnAnswered() {

//         this._Results.unanswered++;

//         this._Results.lastResult = Model.unanswered();
//     }
// }


// class TriviaAPI {

//     constructor(amount) {

//         this._APIRoot = "https://opentdb.com/api.php";
//         this._APIAmount = "amount=" + amount;
//         this._APICategory = "category=";
//         this._APIDifficulty = "difficulty=";
//         this._APIType = "type=multiple";

//         this._Categories = ["General Knowledge", "Sports", "Computers", "Video Games", "Movies", "History"];
//         this._Difficulties = ["Easy", "Medium", "Hard"];

//         this._APIResponse = null;

//         this._AreTriviaQuestionsConsumed = false;
//     }

//     getTriviaQuestionsFromAPI(category, difficulty) {

//         let apiURL = this.generateAPIUrl(category, difficulty);

//         let connection = {
//             url: apiURL,
//             method: "Get"
//         };

//         this._AreTriviaQuestionsConsumed = false;

//         $.ajax(connection).then((response) => {

//             if (response.response_code !== 0) {

//                 alert("Triva API did not return results. Please refresh page and try again.");
//                 throw new Error("Class:GameController:getTriviaQuestionsFromAPI trivia API did not respond correctly");
//             }

//             this._APIResponse = response;

//             this._AreTriviaQuestionsConsumed = true;
            
//         }).catch(() => {

//             alert("Triva API did not return results. Please refresh page and try again.");
//             throw new Error("Class:GameController:getTriviaQuestionsFromAPI trivia API did not respond correctly");
//         });

//         return Utility.createPromise(() => this._AreTriviaQuestionsConsumed === true);
//     }

//     generateAPIUrl(category, difficulty) {

//         let categoryNum;

//         switch (category) {

//             case this._Categories[0]: //General Knowledge
//                 categoryNum = 9;
//                 break;
//             case this._Categories[1]: //Sports
//                 categoryNum = 21;
//                 break;
//             case this._Categories[2]: //Computers
//                 categoryNum = 18;
//                 break;
//             case this._Categories[3]: //Video Games
//                 categoryNum = 15;
//                 break;
//             case this._Categories[4]: //Movies
//                 categoryNum = 11;
//                 break;
//             case this._Categories[5]: //History
//                 categoryNum = 23;
//                 break;
//         }

//         let apiUrl =
//             this._APIRoot + "?" +
//             this._APIAmount + "&" +
//             this._APICategory + categoryNum + "&" +
//             this._APIDifficulty + difficulty.toLowerCase() + "&" +
//             this._APIType;

//         return apiUrl;
//     }
// }


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