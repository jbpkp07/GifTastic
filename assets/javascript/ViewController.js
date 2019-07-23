"use strict";
/* global Model, Utility */

class ViewController {

    constructor() {

        this._model = new Model();

        this._searchInput = $("#searchInput");
        this._submitBTN = $("#searchInputBtn");
        this._btnWrapper = $("#btnWrapper");
        this._searchHistoryBTNs = [];
        this._gifContainer = $("#gifContainer");

        this._gifPlaceholders = [
            
            '<div class="gifWrapper"style="background-color:coral;"><div class="gifBox"></div><div class="sideBar"></div></div>',
            '<div class="gifWrapper"style="background-color:lightblue;"><div class="gifBox"></div><div class="sideBar"></div></div>',
            '<div class="gifWrapper"style="background-color:khaki;"><div class="gifBox"></div><div class="sideBar"></div></div>',
            '<div class="gifWrapper"style="background-color:pink;"><div class="gifBox"></div><div class="sideBar"></div></div>',
            '<div class="gifWrapper"style="background-color:lightgreen;"><div class="gifBox"></div><div class="sideBar"></div></div>',
            '<div class="gifWrapper"style="background-color:coral;"><div class="gifBox"></div><div class="sideBar"></div></div>',
            '<div class="gifWrapper"style="background-color:lightblue;"><div class="gifBox"></div><div class="sideBar"></div></div>',
            '<div class="gifWrapper"style="background-color:khaki;"><div class="gifBox"></div><div class="sideBar"></div></div>',
            '<div class="gifWrapper"style="background-color:pink;"><div class="gifBox"></div><div class="sideBar"></div></div>',
            '<div class="gifWrapper"style="background-color:lightgreen;"><div class="gifBox"></div><div class="sideBar"></div></div>'
        ];

        $(window).on("renderGifs", () => {

            this.renderGifs();
        });

        this.renderSearchHistoryBTNs();
    }

    renderSearchHistoryBTNs() {

        this._searchHistoryBTNs = [];

        this._btnWrapper.children(".searchBtn").remove();

        let count = 0;

        for (let topic of this._model._topicGifs) {

            let newBTNId = "btn-" + count;

            let newSearchBTN = $("<div>").attr("id", newBTNId).addClass("searchBtn");

            if (topic._isSelected) {

                newSearchBTN.addClass("selected").fadeTo(0, 0.25);
            }

            let newSelectBTN = $("<div>").text(topic._topic).addClass("selectBtn");

            let newRemoveBTN = $("<div>").append($("<span>").text("X")).addClass("removeBtn");

            if ($(window).width() > 768) {

                newRemoveBTN.hide(0);
            }

            newSearchBTN.append(newSelectBTN).append(newRemoveBTN);

            this._searchHistoryBTNs.push(newSearchBTN);

            this._btnWrapper.append(newSearchBTN);

            count++;
        }

        this.addGifPlaceholders();

        this.assignListeners();
    }

    renderGifs() {
 
        this._gifContainer.empty();

        for (let topicGif of this._model._topicGifs) {
           
            if (topicGif._isSelected) {

                for (let gif of topicGif._stillGifs) {
              
                    this._gifContainer.append(gif);
                }
            }
        }

        this.addGifPlaceholders();
    }

    addGifPlaceholders() {

        if (this._gifContainer.children().length === 0) {

            for (let placeholder of this._gifPlaceholders) {

                this._gifContainer.append(placeholder);
            }
        }
    }

    assignListeners() {

        for (let btn of this._searchHistoryBTNs) {

            let simpleTopic = btn.children(".selectBtn").text();

            btn.children(".selectBtn").click(() => {

                if (btn.hasClass("selected")) {

                    btn.removeClass("selected");

                    this._model.unSelectTopic(simpleTopic);

                    btn.fadeTo(250, 1.0);

                    this.renderGifs();
                }
                else {

                    btn.addClass("selected");

                    this._model.selectTopic(simpleTopic);

                    btn.fadeTo(250, 0.25);
                }
            });

            btn.children(".removeBtn").click(() => {

                this.removeListeners();

                this._model.removeTopic(simpleTopic);

                this.renderSearchHistoryBTNs();

                this.renderGifs();
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

        this._submitBTN.click((event) => {

            event.preventDefault();

            this.removeListeners();

            let newSimpleTopic = this._searchInput.val().toString();

            this._searchInput.val("");

            this._model.addTopic(newSimpleTopic.trim());

            this.renderSearchHistoryBTNs();
        });
    }

    removeListeners() {

        for (let btn of this._searchHistoryBTNs) {

            btn.off();

            btn.children().off();
        }

        this._submitBTN.off();
    }
}