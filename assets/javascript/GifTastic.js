"use strict";
/* global ViewController */

class GifTastic {

    constructor() {

        this._viewController = null;
    }

    startProgram() {

        this._viewController = new ViewController();
    }
}