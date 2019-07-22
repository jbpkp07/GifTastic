"use strict";
/* global Utility */

class ViewController {

    constructor() {

        this._searchHistoryBTNs = [];
        this._btnWrapper = $("#btnWrapper");
    }

    renderSearchHistoryBTNs(topics) {

        this._searchHistoryBTNs = [];

        this._btnWrapper.children(".searchBtn").remove();

        let count = 0;

        for (let topic of topics) {

            let newBTNId = "btn-" + count;

            let newSearchBTN = $("<div>").attr("id", newBTNId).addClass("searchBtn");

            if (topic._isSelected) {
                
                newSearchBTN.addClass("selected").fadeTo(0, 0.25);
            }

            let newSelectBTN = $("<div>").text(topic._topic).addClass("selectBtn");

            let newRemoveBTN = $("<div>").text("X").addClass("removeBtn");

            if ($(window).width() > 768) {

                newRemoveBTN.hide(0);
            }

            newSearchBTN.append(newSelectBTN).append(newRemoveBTN);

            this._searchHistoryBTNs.push(newSearchBTN);

            this._btnWrapper.append(newSearchBTN);

            count++;
        }

        this.assignSearchHistoryBTNListeners();
    }

    // renderSearchHistoryBTNs() {

    //     // this._viewController.renderSearchHistoryBTNs(this._model._topics);

    //     this.assignSearchHistoryBTNListeners();
    // }

    assignSearchHistoryBTNListeners() {

        for (let btn of this._searchHistoryBTNs) {

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

        for (let btn of this._searchHistoryBTNs) {
        
            btn.off();

            btn.children().off();
        }
    }





}




// class ViewController {

//     constructor() {

//         this._GameTitle = $("#gameTitle");
//         this._StartBtn = $("#startBTN");

//         this._PickCategory = $("#categories");
//         this._CategoryBTNs = $("#categoryBTNs");

//         this._PickDifficulty = $("#difficulties");
//         this._DifficultyBTNs = $("#difficultyBTNs");

//         this._Questions = $("#questions");
//         this._Question = $("#question");
//         this._Category = $("#category");
//         this._Difficulty = $("#difficulty");
//         this._AnswerBTNs = $("#answerBTNs");
//         this._Timer = $("#timer");

//         this._RevealAnswer = $("#revealAnswer");
//         this._Result = $("#result");
//         this._CorrectAnswer = $("#correctAnswer");
//         this._CorrectAnswers = $("#correctAnswers");
//         this._IncorrectAnswers = $("#incorrectAnswers");
//         this._Unanswered = $("#unanswered");
//         this._PlayAgainBTN = $("#playAgainBTN");

//         this._StartTime = 0;
//         this._TimerID = 0;
//         this._IsTimerRunning = false;
//         this._WasTimerManuallyStopped = false;

//         this._IsGameStarted = false;

//         this.initialize();
//     }

//     initialize() {

//         this.showGameTitle(1000);

//         this.showStartBtn(1000);

//         this.emptyCategoryBTNs();

//         this.emptyDifficultyBTNs();
//     }

//     startGame() {

//         let promises = [];

//         promises.push(this.hideGameTitle(1000));

//         promises.push(this.hideStartBtn(1000));

//         Promise.all(promises).then(() => {

//             this._IsGameStarted = true;
//         });
//     }

//     hideGameTitle(mSec) {

//         return this._GameTitle.fadeOut(mSec).promise();
//     }

//     hideStartBtn(mSec) {

//         return this._StartBtn.fadeOut(mSec).promise();
//     }

//     showGameTitle(mSec) {

//         return this._GameTitle.fadeIn(mSec);
//     }

//     showStartBtn(mSec) {

//         return this._StartBtn.fadeIn(mSec);
//     }

//     createCategoryBTNs(categories) {

//         for (let category of categories) {

//             var newBTN = $("<div>");

//             newBTN.text(category);

//             newBTN.addClass("categoryBTN button");

//             this._CategoryBTNs.append(newBTN);
//         }
//     }

//     emptyCategoryBTNs() {

//         this._CategoryBTNs.empty();
//     }

//     showPickCategory(mSec) {

//         this._PickCategory.fadeIn(mSec);
//     }

//     hidePickCategory(mSec) {

//         return this._PickCategory.fadeOut(mSec).promise();
//     }

//     createDifficultyBTNs(difficulties) {

//         for (let difficulty of difficulties) {

//             var newBTN = $("<div>");

//             newBTN.text(difficulty);

//             newBTN.addClass("difficultyBTN button");

//             this._DifficultyBTNs.append(newBTN);
//         }
//     }

//     emptyDifficultyBTNs() {

//         this._DifficultyBTNs.empty();
//     }

//     showPickDifficulty(mSec) {

//         this._PickDifficulty.fadeIn(mSec);
//     }

//     hidePickDifficulty(mSec) {

//         return this._PickDifficulty.fadeOut(mSec).promise();
//     }

//     createNewQuestion(question) {

//         this.emptyAnswerBTNs();

//         this._Category.html("Category :&nbsp;&nbsp;" + question._Category);

//         let difficulty = question._Difficulty.charAt(0).toUpperCase() + question._Difficulty.slice(1);

//         this._Difficulty.html("Difficulty :&nbsp;&nbsp;" + difficulty);

//         this._Question.html(question._Question);

//         for (let answer of question._Answers) {

//             var newBTN = $("<div>");

//             newBTN.html(answer);

//             newBTN.addClass("answerBTN button");

//             this._AnswerBTNs.append(newBTN);
//         }

//         this._Timer.text("Time : " + this._StartTime);
//     }

//     emptyAnswerBTNs() {

//         this._AnswerBTNs.empty();
//     }

//     showQuestion(mSec) {

//         return this._Questions.fadeIn(mSec).promise();
//     }

//     hideQuestion(mSec) {

//         return this._Questions.fadeOut(mSec).promise();
//     }

//     startTimer() {

//         let timeRemaining = this._StartTime;

//         this._IsTimerRunning = true;

//         this._WasTimerManuallyStopped = false;

//         this._Timer.text("Time : " + timeRemaining);

//         timeRemaining--;

//         this._TimerID = setInterval(() => {

//             this._Timer.text("Time : " + timeRemaining);

//             if (timeRemaining === 0) {

//                 this.resetTimer();
//             }

//             timeRemaining--;

//         }, 1000);
//     }

//     stopTimer() {

//         this._WasTimerManuallyStopped = true;

//         this.resetTimer();
//     }

//     resetTimer() {

//         clearInterval(this._TimerID);

//         this._IsTimerRunning = false;
//     }

//     setRevealAnswer(question, results) {

//         this._Result.text(results.lastResult);

//         this._CorrectAnswer.html("(Correct : " + question._CorrectAnswer + ")");

//         this._CorrectAnswers.text("Total Correct : " + results.correctAnswers).addClass("totals");

//         this._IncorrectAnswers.text("Total Incorrect : " + results.incorrectAnswers).addClass("totals");

//         this._Unanswered.text("Total Unanswered : " + results.unanswered).addClass("totals");
//     }

//     showRevealAnswer(mSec) {

//         return this._RevealAnswer.fadeIn(mSec).promise();
//     }

//     hideRevealAnswer(mSec) {

//         return this._RevealAnswer.fadeOut(mSec).promise();
//     }

//     showPlayAgainBTN(mSec) {

//         return this._PlayAgainBTN.fadeIn(mSec).promise();
//     }

//     hidePlayAgainBTN(mSec) {

//         return this._PlayAgainBTN.fadeOut(mSec).promise();
//     }


//     get isGameStarted() { return this._IsGameStarted; }
//     set isGameStarted(value) { throw new Error("Class:View:isGameStarted is PRIVATE"); }
// }