"use strict";
/* global ViewController, Model, GifTastic, Utility */

class GifTasticController {

    constructor() {

        this._model = new Model();
        this._viewController = new ViewController();

        this.initialize();
    }

    initialize() {

        this.renderSearchHistoryBTNs();
    }

    renderSearchHistoryBTNs() {

        this._viewController.renderSearchHistoryBTNs(this._model._topics);

        this.assignSearchHistoryBTNListeners();
    }

    assignSearchHistoryBTNListeners() {

        for (let btn of this._viewController._searchHistoryBTNs) {

            let simpleTopic = btn.children(".selectBtn").text();

            btn.children(".selectBtn").click(() => {

                if (btn.hasClass("selected")) {

                    btn.removeClass("selected");

                    this._model.unSelectTopic(simpleTopic);

                    btn.fadeTo(250, 1.0);
                }
                else {

                    btn.addClass("selected");

                    this._model.selectTopic(simpleTopic);

                    btn.fadeTo(250, 0.25);
                }

                // console.log(simpleTopic);
            });

            btn.children(".removeBtn").click(() => {

                // console.log("Removed " + simpleTopic);

                this.removeSearchHistoryBTNListeners();

                this._model.removeTopic(simpleTopic);

                // this._viewController._btnWrapper.children(btn.attr("id")).remove();

                this.renderSearchHistoryBTNs();
            });

            if ($(window).width() > 768) {

                btn.mouseenter(() => {

                    btn.children(".removeBtn").fadeIn(250);
                });
    
                btn.mouseleave(() => {
    
                    btn.children(".removeBtn").fadeOut(250);
                });
            }
        }
    }

    removeSearchHistoryBTNListeners() {

        for (let btn of this._viewController._searchHistoryBTNs) {
        
            btn.off();

            btn.children().off();
        }
    }
}



 // $(window).off("startFinished", this.test2);



// class GameController {

//     constructor() {

//         this._ViewController = new ViewController();
//         this._Model = new Model();
//         this._IsCategoryPicked = false;
//         this._IsDifficultyPicked = false;
//         this._AreTriviaQuestionsConsumed = false;
//         this._PlayAgain = false;
//     }

//     beginStartSequence() {

//         $("#startBTN").click(() => {

//             $("#startBTN").off("click");

//             this._ViewController.startGame();
//         });

//         return Utility.createPromise(() => this._ViewController.isGameStarted === true );
//     }

//     pickCategory() {

//         this._ViewController.createCategoryBTNs(this._Model._TriviaAPI._Categories);

//         this._ViewController.showPickCategory(1000);

//         let thisController = this;

//         $(".categoryBTN").click(function () {

//             $(".categoryBTN").off("click");

//             thisController._ViewController.hidePickCategory(1000).then(() => {

//                 thisController._Model._CategoryPicked = $(this).text();

//                 thisController._IsCategoryPicked = true;
//             });
//         });

//         return Utility.createPromise(() => this._IsCategoryPicked === true);
//     }

//     pickDifficulty() {

//         this._ViewController.createDifficultyBTNs(this._Model._TriviaAPI._Difficulties);

//         this._ViewController.showPickDifficulty(1000);

//         let thisController = this;

//         $(".difficultyBTN").click(function () {

//             $(".difficultyBTN").off("click");

//             thisController._ViewController.hidePickDifficulty(1000).then(() => {

//                 thisController._Model._DifficultyPicked = $(this).text();

//                 let startTime;

//                 if (thisController._Model._DifficultyPicked === "Hard") { startTime = 10; }
//                 else if (thisController._Model._DifficultyPicked === "Medium") { startTime = 20; }
//                 else { startTime = 30; }

//                 thisController._ViewController._StartTime = startTime;

//                 thisController._IsDifficultyPicked = true;
//             });
//         });

//         return Utility.createPromise(() => this._IsDifficultyPicked === true);
//     }

//     getTriviaQuestionsFromAPI() {

//         let promise = this._Model.setTriviaQuestions();

//         return promise;
//     }

//     answerTriviaQuestions() {

//         if (this._Model._IsAnotherQuestionAvailable) {

//             this._ViewController.hideRevealAnswer(1000).then(() => {

//                 this.startNextQuestion();
//             });
//         }
//         else {

//             this._ViewController.showPlayAgainBTN(1000).then(() => {

//                 $("#playAgainBTN").click(() => {

//                     $("#playAgainBTN").off("click");

//                     this._ViewController.hidePlayAgainBTN(1000).then(() => {

//                         this._ViewController.hideRevealAnswer(1000).then(() => {

//                             this._PlayAgain = true;
//                         });
//                     });
//                 });
//             });
//         }

//         return Utility.createPromise(() => this._PlayAgain === true);
//     }

//     startNextQuestion() {

//         let thisController = this;

//         let question = this._Model.getNextTriviaQuestion();

//         this._ViewController.createNewQuestion(question);

//         this._ViewController.showQuestion(1000).then(() => {

//             this._ViewController.startTimer();

//             Utility.createPromise(() => this._ViewController._IsTimerRunning === false).then(() => {

//                 if (!thisController._ViewController._WasTimerManuallyStopped) {

//                     $(".answerBTN").off("click");

//                     thisController._Model.updateQuestionUnAnswered();

//                     this.revealAnswer();
//                 }
//             });

//             $(".answerBTN").click(function () { 

//                 thisController._ViewController.stopTimer();

//                 $(".answerBTN").off("click");

//                 let selectedAnswer = $(this).text();

//                 thisController._Model.updateQuestionAnswered(selectedAnswer);

//                 thisController.revealAnswer();
//             });
//         });
//     }

//     revealAnswer() {

//         this._ViewController.hideQuestion(1000).then(() => {

//             this._ViewController.setRevealAnswer(this._Model._CurrentQuestion, this._Model._Results);

//             this._ViewController.showRevealAnswer(1000).then(() => {

//                 setTimeout(() => { 

//                     this.answerTriviaQuestions();

//                 }, 5000);
//             });
//         });
//     }
// }