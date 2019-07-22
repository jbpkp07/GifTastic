"use strict";
/* global GifTasticController */

class GifTastic {

    constructor() {
        
        this._gifTasticController = null;
    }

    startProgram() {

        this._gifTasticController = new GifTasticController();

        // this._gifTasticController.renderSearchHistoryButtons();

        // $(window).on("topicsReady", this.renderSearchHistoryButtons);


    }
}