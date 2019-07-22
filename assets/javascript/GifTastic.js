"use strict";
/* global GifTasticController */

class GifTastic {

    constructor() {
        
        this._GifTasticController = null;
        // this.test2 = this.test2.bind(this);
    }

    startProgram() {

        this._GifTasticController = new GifTasticController();
  
        $(window).on("startFinished", this.test2);

        this._GifTasticController.test1controller();
    }

    test2() {

        $(window).off("startFinished", this.test2);

        // alert("now");
    }


}


// class Game {

//     constructor() {

//         this._GameController = null;
//     }

//     startGame() {

//         this._GameController = new GameController();

//         this._GameController.beginStartSequence().then(() => {

//             this.pickCategory();
//         });
//     }

//     pickCategory() {

//         this._GameController.pickCategory().then(() => {

//             this.pickDifficulty();
//         });
//     }

//     pickDifficulty() {

//         this._GameController.pickDifficulty().then(() => {

//             this.startTriviaQuestions();
//         });
//     }

//     startTriviaQuestions() {

//         this._GameController.getTriviaQuestionsFromAPI().then(() => {

//             this._GameController.answerTriviaQuestions().then(() => {

//                 this.startGame();  //User chose to play again
//             });

//         });
//     }
// }