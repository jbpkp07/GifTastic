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

const isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
const isEdge = navigator.userAgent.indexOf("Edge") > -1;
const isChrome = !!window.chrome && !isOpera && !isEdge;
const isExplorer= typeof document !== 'undefined' && !!document.documentMode && !isEdge;
const isFirefox = typeof window.InstallTrigger !== 'undefined';
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);