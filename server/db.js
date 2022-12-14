"use strict";
// var admin = require("firebase-admin");
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = exports.firestore = void 0;
// var serviceAccount = require("path/to/serviceAccountKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://apx-dwf-m6-elg-default-rtdb.firebaseio.com",
// });
const admin = require("firebase-admin");
const serviceAccount = require("../key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://apx-dwf-m6-elg-default-rtdb.firebaseio.com",
});
const firestore = admin.firestore();
exports.firestore = firestore;
const rtdb = admin.database();
exports.rtdb = rtdb;
