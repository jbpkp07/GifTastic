"use strict";
/* global Model, Utility */

class ViewController {

    constructor() {

        this._model = new Model();
        this._searchHistoryBTNs = [];
        this._btnWrapper = $("#btnWrapper");
        this._searchInput = $("#searchInput");
        this._submitBTN = $("#searchInputBtn");

        this.renderSearchHistoryBTNs();
    }

    renderSearchHistoryBTNs() {

        this._searchHistoryBTNs = [];

        this._btnWrapper.children(".searchBtn").remove();

        let count = 0;

        for (let topic of this._model._topics) {

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

        this.assignListeners();
    }

    assignListeners() {

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
            });

            btn.children(".removeBtn").click(() => {

                this.removeListeners();

                this._model.removeTopic(simpleTopic);

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