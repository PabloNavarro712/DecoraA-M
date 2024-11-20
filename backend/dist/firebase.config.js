"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseDataBase = exports.app = exports.firebaseConfig = void 0;
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
exports.firebaseConfig = {
    apiKey: "AIzaSyDsMka1kQMKOdxXdimJUSdQzEjeTr-k2_w",
    authDomain: "albergue-57e14.firebaseapp.com",
    projectId: "albergue-57e14",
    storageBucket: "albergue-57e14.appspot.com",
    messagingSenderId: "302261908325",
    appId: "1:302261908325:web:5b9d239b0abb6f3cbb278c",
    measurementId: "G-JB8QBN37KK"
};
exports.app = (0, app_1.initializeApp)(exports.firebaseConfig);
exports.firebaseDataBase = (0, database_1.getDatabase)(exports.app);
//# sourceMappingURL=firebase.config.js.map