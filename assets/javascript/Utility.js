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

// @ts-ignore
const isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
const isEdge = navigator.userAgent.indexOf("Edge") > -1;
// @ts-ignore
const isChrome = !!window.chrome && !isOpera && !isEdge;
// @ts-ignore
const isExplorer= typeof document !== 'undefined' && !!document.documentMode && !isEdge;
// @ts-ignore
const isFirefox = typeof window.InstallTrigger !== 'undefined';
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);