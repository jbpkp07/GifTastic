"use strict";

class Utility {

    static createPromise(waitCondition) {

        const poll = (resolve) => {

            if (waitCondition()) {

                resolve();
            }
            else {

                setTimeout(() => poll(resolve), 100);
            }
        };

        return new Promise(poll);
    }
}

var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var is_Edge = navigator.userAgent.indexOf("Edge") > -1;
var is_chrome = !!window.chrome && !is_opera && !is_Edge;
var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !is_Edge;
var is_firefox = typeof window.InstallTrigger !== 'undefined';
var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);