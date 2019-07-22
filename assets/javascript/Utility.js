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