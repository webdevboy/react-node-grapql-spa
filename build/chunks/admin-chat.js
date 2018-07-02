require("source-map-support").install();
exports.ids = ["admin-chat"];
exports.modules = {

/***/ "./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/Chat.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n\n.Chat-container-1W0oW{\n\t-ms-flex: 1 1 100%;\n\t    flex: 1 1 100%;\n\tpadding: 0px;\n}\n\n.Chat-body-wrapper-36nY9 {\n\t-ms-flex: 2 1 0%;\n\t    flex: 2 1 0%;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n}", "", {"version":3,"sources":["/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/Chat.css"],"names":[],"mappings":";;AAEA;CACC,mBAAmB;KACf,eAAe;CACnB,aAAa;CACb;;AAED;CACC,iBAAiB;KACb,aAAa;IACd,qBAAqB;IACrB,cAAc;IACd,2BAA2B;QACvB,uBAAuB;CAC9B","file":"Chat.css","sourcesContent":["\n\n.container{\n\t-ms-flex: 1 1 100%;\n\t    flex: 1 1 100%;\n\tpadding: 0px;\n}\n\n.body-wrapper {\n\t-ms-flex: 2 1 0%;\n\t    flex: 2 1 0%;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n}"],"sourceRoot":""}]);

// exports
exports.locals = {
	"container": "Chat-container-1W0oW",
	"body-wrapper": "Chat-body-wrapper-36nY9"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatHistory/ChatHistory.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.ChatHistory-main-container-3Cgn-{\n    -ms-flex: 2 1 auto;\n        flex: 2 1 auto;\n    display: -ms-flexbox;\n    display: flex;\n}\n.ChatHistory-content-1wFME{\n    color: white;\n    -ms-flex: 2 1 0%;\n        flex: 2 1 0%;\n    width: 100%;\n    display: -ms-flexbox;\n    display: flex;\n}\n.ChatHistory-chat-avatar-2lX3f{\n    width: 30px;\n    border-radius: 50%;\n}\n.ChatHistory-chat-color-3UvTy {\n    width: 8px;\n    height: 24px;\n    border-radius: 4px;\n}\n.ChatHistory-table-_q1wt {\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    table-layout: fixed;\n    border-collapse: collapse;\n    -ms-flex: 2 1 auto;\n        flex: 2 1 auto;\n    -ms-flex-direction: column;\n        flex-direction: column;\n}\n.ChatHistory-table-_q1wt thead {\n    display: block;\n    width: 100%;\n    background: #1B3143;\n}\n.ChatHistory-table-_q1wt tbody {\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    height: 100%;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    overflow: auto;\n}\n.ChatHistory-table-_q1wt thead th {\n    height: 50px;\n    vertical-align: middle;\n    text-align: left;\n    color: #b2b9c4;\n    font-size: 13px;\n    font-weight: 600;\n}\n.ChatHistory-table-_q1wt thead tr,\n.ChatHistory-table-_q1wt tbody tr {\n    -webkit-box-shadow: 0 1px 0 0 #313D4F;\n            box-shadow: 0 1px 0 0 #313D4F;\n    display: table;\n    width: 100%;\n}\n.ChatHistory-table-_q1wt thead tr {\n    -webkit-box-shadow: 0 2px 0 0 #313D4F;\n            box-shadow: 0 2px 0 0 #313D4F;\n}\n.ChatHistory-table-_q1wt td {\n    vertical-align: middle;\n    text-align: left;\n}\ntd {\n    font-size: 14px;\n}\n.ChatHistory-table-avatar-3rNIG{\n}\ntr.ChatHistory-active-3ATAH{\n    background-color: #FF5300;\n}\n.ChatHistory-table-_q1wt tbody > tr:hover {\n    background-color: #FF5300;\n}\n.ChatHistory-table-_q1wt tbody td,\n.ChatHistory-table-_q1wt thead th {\n    padding: 0 10px;\n}\n.ChatHistory-table-_q1wt tbody td {\n    font-size: 13px;\n    font-weight: 200;\n    max-height: 50px;\n    height: 50px;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n}\n.ChatHistory-table-_q1wt .ChatHistory-color-2ljop {\n    min-width: 15px;\n    width: 15px;\n    max-width: 15px;\n    vertical-align: middle;\n}\n.ChatHistory-table-_q1wt .ChatHistory-avatar-2c1vj {\n    min-width: 50px;\n    width: 50px;\n    max-width: 50px;\n}\n.ChatHistory-table-_q1wt td.ChatHistory-user-2DHSO {\n    font-weight: 600;\n}\n.ChatHistory-table-_q1wt .ChatHistory-user-2DHSO {\n    min-width: 120px;\n    width: 120px;\n    max-width: 120px;\n}\n.ChatHistory-table-_q1wt .ChatHistory-lastmsg-1A8dK {\n    min-width: 35%;\n    width: 35%;\n    max-width: 35%;\n}\n@media (max-width: 672px) {\n    .ChatHistory-table-_q1wt .ChatHistory-lastmsg-1A8dK {\n        min-width: auto;\n        width: auto;\n        max-width: auto;\n    }\n}\n.ChatHistory-clickable-2Qhsv {\n    cursor: pointer;\n}\n.ChatHistory-table-_q1wt .ChatHistory-count-2R7kv {\n    min-width: 120px;\n    width: 120px;\n    max-width: 120px;\n}\n.ChatHistory-table-_q1wt .ChatHistory-country-3PT7p {\n    min-width: 160px;\n    width: 160px;\n    max-width: 160px;\n}\n.ChatHistory-table-_q1wt .ChatHistory-country-3PT7p .famfamfam-flags {\n        display: inline-block;\n        margin-right: 5px;\n    }\n.ChatHistory-table-_q1wt .ChatHistory-device-TkFcA {\n    min-width: 120px;\n    width: 120px;\n    max-width: 120px;\n}\n.ChatHistory-current-3GChV {\n    color: #2EA2F8 !important;\n}\n.ChatHistory-table-_q1wt .ChatHistory-timeago-2i8Jw {\n    text-align: right\n}\n.ChatHistory-table-_q1wt .ChatHistory-timeago-2i8Jw.ChatHistory-asc-mP_Wp span:after {\n            display: inline-block;\n            width: 0;\n            height: 0;\n            margin-left: 0.3em;\n            vertical-align: middle;\n            content: \"\";\n            border-bottom: 0.3em solid;\n            border-right: 0.3em solid transparent;\n            border-left: 0.3em solid transparent;\n}\n.ChatHistory-table-_q1wt .ChatHistory-timeago-2i8Jw.ChatHistory-desc-1wcBS span:after {\n            display: inline-block;\n            width: 0;\n            height: 0;\n            margin-left: 0.3em;\n            vertical-align: middle;\n            content: \"\";\n            border-top: 0.3em solid;\n            border-right: 0.3em solid transparent;\n            border-left: 0.3em solid transparent;\n}\n\n\n\n", "", {"version":3,"sources":["/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/ChatHistory/ChatHistory.css"],"names":[],"mappings":";AACA;IACI,mBAAmB;QACf,eAAe;IACnB,qBAAqB;IACrB,cAAc;CACjB;AACD;IACI,aAAa;IACb,iBAAiB;QACb,aAAa;IACjB,YAAY;IACZ,qBAAqB;IACrB,cAAc;CACjB;AACD;IACI,YAAY;IACZ,mBAAmB;CACtB;AACD;IACI,WAAW;IACX,aAAa;IACb,mBAAmB;CACtB;AACD;IACI,qBAAqB;IACrB,cAAc;IACd,YAAY;IACZ,oBAAoB;IACpB,0BAA0B;IAC1B,mBAAmB;QACf,eAAe;IACnB,2BAA2B;QACvB,uBAAuB;CAC9B;AACD;IACI,eAAe;IACf,YAAY;IACZ,oBAAoB;CACvB;AACD;IACI,qBAAqB;IACrB,cAAc;IACd,YAAY;IACZ,aAAa;IACb,2BAA2B;QACvB,uBAAuB;IAC3B,eAAe;CAClB;AACD;IACI,aAAa;IACb,uBAAuB;IACvB,iBAAiB;IACjB,eAAe;IACf,gBAAgB;IAChB,iBAAiB;CACpB;AACD;;IAEI,sCAAsC;YAC9B,8BAA8B;IACtC,eAAe;IACf,YAAY;CACf;AACD;IACI,sCAAsC;YAC9B,8BAA8B;CACzC;AACD;IACI,uBAAuB;IACvB,iBAAiB;CACpB;AACD;IACI,gBAAgB;CACnB;AACD;CACC;AACD;IACI,0BAA0B;CAC7B;AACD;IACI,0BAA0B;CAC7B;AACD;;IAEI,gBAAgB;CACnB;AACD;IACI,gBAAgB;IAChB,iBAAiB;IACjB,iBAAiB;IACjB,aAAa;IACb,iBAAiB;IACjB,2BAA2B;OACxB,wBAAwB;CAC9B;AACD;IACI,gBAAgB;IAChB,YAAY;IACZ,gBAAgB;IAChB,uBAAuB;CAC1B;AACD;IACI,gBAAgB;IAChB,YAAY;IACZ,gBAAgB;CACnB;AACD;IACI,iBAAiB;CACpB;AACD;IACI,iBAAiB;IACjB,aAAa;IACb,iBAAiB;CACpB;AACD;IACI,eAAe;IACf,WAAW;IACX,eAAe;CAClB;AACD;IACI;QACI,gBAAgB;QAChB,YAAY;QACZ,gBAAgB;KACnB;CACJ;AACD;IACI,gBAAgB;CACnB;AACD;IACI,iBAAiB;IACjB,aAAa;IACb,iBAAiB;CACpB;AACD;IACI,iBAAiB;IACjB,aAAa;IACb,iBAAiB;CACpB;AACD;QACQ,sBAAsB;QACtB,kBAAkB;KACrB;AACL;IACI,iBAAiB;IACjB,aAAa;IACb,iBAAiB;CACpB;AACD;IACI,0BAA0B;CAC7B;AACD;IACI,iBAAiB;CACpB;AACD;YACY,sBAAsB;YACtB,SAAS;YACT,UAAU;YACV,mBAAmB;YACnB,uBAAuB;YACvB,YAAY;YACZ,2BAA2B;YAC3B,sCAAsC;YACtC,qCAAqC;CAChD;AACD;YACY,sBAAsB;YACtB,SAAS;YACT,UAAU;YACV,mBAAmB;YACnB,uBAAuB;YACvB,YAAY;YACZ,wBAAwB;YACxB,sCAAsC;YACtC,qCAAqC;CAChD","file":"ChatHistory.css","sourcesContent":["\n.main-container{\n    -ms-flex: 2 1 auto;\n        flex: 2 1 auto;\n    display: -ms-flexbox;\n    display: flex;\n}\n.content{\n    color: white;\n    -ms-flex: 2 1 0%;\n        flex: 2 1 0%;\n    width: 100%;\n    display: -ms-flexbox;\n    display: flex;\n}\n.chat-avatar{\n    width: 30px;\n    border-radius: 50%;\n}\n.chat-color {\n    width: 8px;\n    height: 24px;\n    border-radius: 4px;\n}\n.table {\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    table-layout: fixed;\n    border-collapse: collapse;\n    -ms-flex: 2 1 auto;\n        flex: 2 1 auto;\n    -ms-flex-direction: column;\n        flex-direction: column;\n}\n.table thead {\n    display: block;\n    width: 100%;\n    background: #1B3143;\n}\n.table tbody {\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    height: 100%;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    overflow: auto;\n}\n.table thead th {\n    height: 50px;\n    vertical-align: middle;\n    text-align: left;\n    color: #b2b9c4;\n    font-size: 13px;\n    font-weight: 600;\n}\n.table thead tr,\n.table tbody tr {\n    -webkit-box-shadow: 0 1px 0 0 #313D4F;\n            box-shadow: 0 1px 0 0 #313D4F;\n    display: table;\n    width: 100%;\n}\n.table thead tr {\n    -webkit-box-shadow: 0 2px 0 0 #313D4F;\n            box-shadow: 0 2px 0 0 #313D4F;\n}\n.table td {\n    vertical-align: middle;\n    text-align: left;\n}\ntd {\n    font-size: 14px;\n}\n.table-avatar{\n}\ntr.active{\n    background-color: #FF5300;\n}\n.table tbody > tr:hover {\n    background-color: #FF5300;\n}\n.table tbody td,\n.table thead th {\n    padding: 0 10px;\n}\n.table tbody td {\n    font-size: 13px;\n    font-weight: 200;\n    max-height: 50px;\n    height: 50px;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n}\n.table .color {\n    min-width: 15px;\n    width: 15px;\n    max-width: 15px;\n    vertical-align: middle;\n}\n.table .avatar {\n    min-width: 50px;\n    width: 50px;\n    max-width: 50px;\n}\n.table td.user {\n    font-weight: 600;\n}\n.table .user {\n    min-width: 120px;\n    width: 120px;\n    max-width: 120px;\n}\n.table .lastmsg {\n    min-width: 35%;\n    width: 35%;\n    max-width: 35%;\n}\n@media (max-width: 672px) {\n    .table .lastmsg {\n        min-width: auto;\n        width: auto;\n        max-width: auto;\n    }\n}\n.clickable {\n    cursor: pointer;\n}\n.table .count {\n    min-width: 120px;\n    width: 120px;\n    max-width: 120px;\n}\n.table .country {\n    min-width: 160px;\n    width: 160px;\n    max-width: 160px;\n}\n.table .country :global(.famfamfam-flags) {\n        display: inline-block;\n        margin-right: 5px;\n    }\n.table .device {\n    min-width: 120px;\n    width: 120px;\n    max-width: 120px;\n}\n.current {\n    color: #2EA2F8 !important;\n}\n.table .timeago {\n    text-align: right\n}\n.table .timeago.asc span:after {\n            display: inline-block;\n            width: 0;\n            height: 0;\n            margin-left: 0.3em;\n            vertical-align: middle;\n            content: \"\";\n            border-bottom: 0.3em solid;\n            border-right: 0.3em solid transparent;\n            border-left: 0.3em solid transparent;\n}\n.table .timeago.desc span:after {\n            display: inline-block;\n            width: 0;\n            height: 0;\n            margin-left: 0.3em;\n            vertical-align: middle;\n            content: \"\";\n            border-top: 0.3em solid;\n            border-right: 0.3em solid transparent;\n            border-left: 0.3em solid transparent;\n}\n\n\n\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"main-container": "ChatHistory-main-container-3Cgn-",
	"content": "ChatHistory-content-1wFME",
	"chat-avatar": "ChatHistory-chat-avatar-2lX3f",
	"chat-color": "ChatHistory-chat-color-3UvTy",
	"table": "ChatHistory-table-_q1wt",
	"table-avatar": "ChatHistory-table-avatar-3rNIG",
	"active": "ChatHistory-active-3ATAH",
	"color": "ChatHistory-color-2ljop",
	"avatar": "ChatHistory-avatar-2c1vj",
	"user": "ChatHistory-user-2DHSO",
	"lastmsg": "ChatHistory-lastmsg-1A8dK",
	"clickable": "ChatHistory-clickable-2Qhsv",
	"count": "ChatHistory-count-2R7kv",
	"country": "ChatHistory-country-3PT7p",
	"device": "ChatHistory-device-TkFcA",
	"current": "ChatHistory-current-3GChV",
	"timeago": "ChatHistory-timeago-2i8Jw",
	"asc": "ChatHistory-asc-mP_Wp",
	"desc": "ChatHistory-desc-1wcBS"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatInspector/ChatInspector.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-header-Ecd2L {\n        display: -ms-flexbox;\n        display: flex;\n        margin-bottom: 20px;\n        -ms-flex-align: center;\n            align-items: center;\n\n    }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-header-Ecd2L .ChatInspector-actions-3nOpi {\n            -ms-flex-align: center;\n                align-items: center;\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex: 1 1 0%;\n                flex: 1 1 0%;\n            position: relative;\n        }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-header-Ecd2L .ChatInspector-actions-3nOpi a {\n                display: -ms-flexbox;\n                display: flex;\n                -ms-flex: 1 1 0%;\n                    flex: 1 1 0%;\n                -ms-flex-align: center;\n                    align-items: center;\n            }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-header-Ecd2L .ChatInspector-table-avatar-1m8c1 {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: row;\n                flex-direction: row;\n            -ms-flex: 1 1 0%;\n                flex: 1 1 0%;\n            -ms-flex-align: center;\n                align-items: center;\n        }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-header-Ecd2L .ChatInspector-table-avatar-1m8c1 .ChatInspector-chat-avatar-2ADqu{\n                width: 30px;\n                border-radius: 50%;\n                height: 30px;\n                background-color: white;\n            }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-header-Ecd2L .ChatInspector-table-avatar-1m8c1 .ChatInspector-chat-color-3Mp-s{\n                width: 8px;\n                height: 24px;\n                background-color: #DBFF0E;\n                border-radius: 10px;\n                margin-right: 15px;\n                float: left;\n            }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-username-2bed2 {\n        -ms-flex: 2 1 100%;\n            flex: 2 1 100%;\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n            flex-direction: column;\n        margin-left: 15px;\n        line-height: 20px;\n    }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-username-2bed2 h3 {\n            margin: 0;\n            color: #FFF;\n            font-size: 18px;\n        }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-username-2bed2 span {\n            font-size: 12px;\n            color: #A8AAB7;\n        }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG label {\n            color: #fff;\n            font-size: 12px;\n            font-weight: 100;\n        }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG span {\n            -ms-flex: 1 1 0%;\n                flex: 1 1 0%;\n            text-align: right;\n            -ms-flex-align: end;\n                align-items: flex-end;\n            color: #B7B9C4;\n            font-size: 12px;\n        }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-attachments-list-34Z2_ {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-attachments-list-34Z2_ .ChatInspector-attachment-item-1sgp1 {\n                -ms-flex-direction: row;\n                    flex-direction: row;\n                -ms-flex: 1 1 0%;\n                    flex: 1 1 0%;\n                display: -ms-flexbox;\n                display: flex;\n                -ms-flex-align: center;\n                    align-items: center;\n                margin-bottom: 10px;\n            }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-attachments-list-34Z2_ .ChatInspector-attachment-item-1sgp1 .ChatInspector-extension-item-2HEg_ {\n                    width: 32px;\n                    margin-right: 15px;\n                    display: -ms-flexbox;\n                    display: flex;\n                }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-attachments-list-34Z2_ .ChatInspector-attachment-item-1sgp1 .ChatInspector-size-item-1DzR0 {\n                    -ms-flex: 2 1 0%;\n                        flex: 2 1 0%;\n                    -ms-flex-pack: end;\n                        justify-content: flex-end;\n                    margin: 0;\n                }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-attachments-list-34Z2_ .ChatInspector-attachment-item-1sgp1 .ChatInspector-date-item-2egHJ {\n                    -ms-flex: 1 1 0%;\n                        flex: 1 1 0%;\n                    -ms-flex-pack: end;\n                        justify-content: flex-end;\n                }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-info-line-34iFH {\n            display: -ms-flexbox;\n            display: flex;\n            height: 30px;\n            -ms-flex-align: end;\n                align-items: flex-end;\n            margin-bottom: 5px;\n        }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-info-line-34iFH span {\n                -ms-flex: 1 1 0%;\n                    flex: 1 1 0%;\n                text-align: right;\n                -ms-flex-align: end;\n                    align-items: flex-end;\n            }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-info-line-34iFH .ChatInspector-flag-3x9Po {\n                display: inline-block;\n                margin-right: 5px;\n            }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-info-line-34iFH * {\n                padding: 0;\n                margin: 0;\n            }\n\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-info-1x7EZ,\n        .ChatInspector-inspector-3IAqA .ChatInspector-container-content-198uG .ChatInspector-notes-3DcAz {\n            margin-bottom: 20px;\n        }\n", "", {"version":3,"sources":["/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/ChatInspector/ChatInspector.css"],"names":[],"mappings":";;QAEQ;QACA,qBAAqB;QACrB,cAAc;QACd,oBAAoB;QACpB,uBAAuB;YACnB,oBAAoB;;KAE3B;;QAEG;YACI,uBAAuB;gBACnB,oBAAoB;YACxB,qBAAqB;YACrB,cAAc;YACd,iBAAiB;gBACb,aAAa;YACjB,mBAAmB;SACtB;;QAED;gBACQ,qBAAqB;gBACrB,cAAc;gBACd,iBAAiB;oBACb,aAAa;gBACjB,uBAAuB;oBACnB,oBAAoB;aAC3B;;QAEL;YACI,qBAAqB;YACrB,cAAc;YACd,wBAAwB;gBACpB,oBAAoB;YACxB,iBAAiB;gBACb,aAAa;YACjB,uBAAuB;gBACnB,oBAAoB;SAC3B;;QAED;gBACQ,YAAY;gBACZ,mBAAmB;gBACnB,aAAa;gBACb,wBAAwB;aAC3B;;QAEL;gBACQ,WAAW;gBACX,aAAa;gBACb,0BAA0B;gBAC1B,oBAAoB;gBACpB,mBAAmB;gBACnB,YAAY;aACf;;QAEL;QACA,mBAAmB;YACf,eAAe;QACnB,qBAAqB;QACrB,cAAc;QACd,2BAA2B;YACvB,uBAAuB;QAC3B,kBAAkB;QAClB,kBAAkB;KACrB;;QAEG;YACI,UAAU;YACV,YAAY;YACZ,gBAAgB;SACnB;;QAED;YACI,gBAAgB;YAChB,eAAe;SAClB;;QAED;YACI,YAAY;YACZ,gBAAgB;YAChB,iBAAiB;SACpB;;QAED;YACI,iBAAiB;gBACb,aAAa;YACjB,kBAAkB;YAClB,oBAAoB;gBAChB,sBAAsB;YAC1B,eAAe;YACf,gBAAgB;SACnB;;QAED;YACI,qBAAqB;YACrB,cAAc;YACd,2BAA2B;gBACvB,uBAAuB;SAC9B;;QAED;gBACQ,wBAAwB;oBACpB,oBAAoB;gBACxB,iBAAiB;oBACb,aAAa;gBACjB,qBAAqB;gBACrB,cAAc;gBACd,uBAAuB;oBACnB,oBAAoB;gBACxB,oBAAoB;aACvB;;QAEL;oBACY,YAAY;oBACZ,mBAAmB;oBACnB,qBAAqB;oBACrB,cAAc;iBACjB;;QAET;oBACY,iBAAiB;wBACb,aAAa;oBACjB,mBAAmB;wBACf,0BAA0B;oBAC9B,UAAU;iBACb;;QAET;oBACY,iBAAiB;wBACb,aAAa;oBACjB,mBAAmB;wBACf,0BAA0B;iBACjC;;QAET;YACI,qBAAqB;YACrB,cAAc;YACd,aAAa;YACb,oBAAoB;gBAChB,sBAAsB;YAC1B,mBAAmB;SACtB;;QAED;gBACQ,iBAAiB;oBACb,aAAa;gBACjB,kBAAkB;gBAClB,oBAAoB;oBAChB,sBAAsB;aAC7B;;QAEL;gBACQ,sBAAsB;gBACtB,kBAAkB;aACrB;;QAEL;gBACQ,WAAW;gBACX,UAAU;aACb;;QAEL;;YAEI,oBAAoB;SACvB","file":"ChatInspector.css","sourcesContent":["\n\n        .inspector .container-header {\n        display: -ms-flexbox;\n        display: flex;\n        margin-bottom: 20px;\n        -ms-flex-align: center;\n            align-items: center;\n\n    }\n\n        .inspector .container-header .actions {\n            -ms-flex-align: center;\n                align-items: center;\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex: 1 1 0%;\n                flex: 1 1 0%;\n            position: relative;\n        }\n\n        .inspector .container-header .actions a {\n                display: -ms-flexbox;\n                display: flex;\n                -ms-flex: 1 1 0%;\n                    flex: 1 1 0%;\n                -ms-flex-align: center;\n                    align-items: center;\n            }\n\n        .inspector .container-header .table-avatar {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: row;\n                flex-direction: row;\n            -ms-flex: 1 1 0%;\n                flex: 1 1 0%;\n            -ms-flex-align: center;\n                align-items: center;\n        }\n\n        .inspector .container-header .table-avatar .chat-avatar{\n                width: 30px;\n                border-radius: 50%;\n                height: 30px;\n                background-color: white;\n            }\n\n        .inspector .container-header .table-avatar .chat-color{\n                width: 8px;\n                height: 24px;\n                background-color: #DBFF0E;\n                border-radius: 10px;\n                margin-right: 15px;\n                float: left;\n            }\n\n        .inspector .username {\n        -ms-flex: 2 1 100%;\n            flex: 2 1 100%;\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n            flex-direction: column;\n        margin-left: 15px;\n        line-height: 20px;\n    }\n\n        .inspector .username h3 {\n            margin: 0;\n            color: #FFF;\n            font-size: 18px;\n        }\n\n        .inspector .username span {\n            font-size: 12px;\n            color: #A8AAB7;\n        }\n\n        .inspector .container-content label {\n            color: #fff;\n            font-size: 12px;\n            font-weight: 100;\n        }\n\n        .inspector .container-content span {\n            -ms-flex: 1 1 0%;\n                flex: 1 1 0%;\n            text-align: right;\n            -ms-flex-align: end;\n                align-items: flex-end;\n            color: #B7B9C4;\n            font-size: 12px;\n        }\n\n        .inspector .container-content .attachments-list {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        }\n\n        .inspector .container-content .attachments-list .attachment-item {\n                -ms-flex-direction: row;\n                    flex-direction: row;\n                -ms-flex: 1 1 0%;\n                    flex: 1 1 0%;\n                display: -ms-flexbox;\n                display: flex;\n                -ms-flex-align: center;\n                    align-items: center;\n                margin-bottom: 10px;\n            }\n\n        .inspector .container-content .attachments-list .attachment-item .extension-item {\n                    width: 32px;\n                    margin-right: 15px;\n                    display: -ms-flexbox;\n                    display: flex;\n                }\n\n        .inspector .container-content .attachments-list .attachment-item .size-item {\n                    -ms-flex: 2 1 0%;\n                        flex: 2 1 0%;\n                    -ms-flex-pack: end;\n                        justify-content: flex-end;\n                    margin: 0;\n                }\n\n        .inspector .container-content .attachments-list .attachment-item .date-item {\n                    -ms-flex: 1 1 0%;\n                        flex: 1 1 0%;\n                    -ms-flex-pack: end;\n                        justify-content: flex-end;\n                }\n\n        .inspector .container-content .info-line {\n            display: -ms-flexbox;\n            display: flex;\n            height: 30px;\n            -ms-flex-align: end;\n                align-items: flex-end;\n            margin-bottom: 5px;\n        }\n\n        .inspector .container-content .info-line span {\n                -ms-flex: 1 1 0%;\n                    flex: 1 1 0%;\n                text-align: right;\n                -ms-flex-align: end;\n                    align-items: flex-end;\n            }\n\n        .inspector .container-content .info-line .flag {\n                display: inline-block;\n                margin-right: 5px;\n            }\n\n        .inspector .container-content .info-line * {\n                padding: 0;\n                margin: 0;\n            }\n\n        .inspector .container-content .info,\n        .inspector .container-content .notes {\n            margin-bottom: 20px;\n        }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"inspector": "ChatInspector-inspector-3IAqA",
	"container-header": "ChatInspector-container-header-Ecd2L",
	"actions": "ChatInspector-actions-3nOpi",
	"table-avatar": "ChatInspector-table-avatar-1m8c1",
	"chat-avatar": "ChatInspector-chat-avatar-2ADqu",
	"chat-color": "ChatInspector-chat-color-3Mp-s",
	"username": "ChatInspector-username-2bed2",
	"container-content": "ChatInspector-container-content-198uG",
	"attachments-list": "ChatInspector-attachments-list-34Z2_",
	"attachment-item": "ChatInspector-attachment-item-1sgp1",
	"extension-item": "ChatInspector-extension-item-2HEg_",
	"size-item": "ChatInspector-size-item-1DzR0",
	"date-item": "ChatInspector-date-item-2egHJ",
	"info-line": "ChatInspector-info-line-34iFH",
	"flag": "ChatInspector-flag-3x9Po",
	"info": "ChatInspector-info-1x7EZ",
	"notes": "ChatInspector-notes-3DcAz"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatRoom/ChatMessage/ChatMessage.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.ChatMessage-container-rqBrT{\n    \n    display: -ms-flexbox;\n    \n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    margin: 20px;\n}\n@media (max-width: 672px) {\n    .ChatMessage-container-rqBrT{\n        max-width: 100%;\n    }\n}\n@media (max-width: 991px) {\n    .ChatMessage-container-rqBrT{\n        max-width: 100%;\n    }\n}\n.ChatMessage-content-13Yah {\n    -ms-flex: 1 1 0%;\n        flex: 1 1 0%;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n        flex-direction: row;\n    -ms-flex-align: start;\n        align-items: flex-start;\n    max-width: 70%;\n}\n.ChatMessage-message-juel- {\n    color: white;\n    font-size: 14px;\n    font-weight: 200;\n    padding: 10px 20px 15px 20px;\n    border-radius: 6px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -ms-flex: 2 1 0%;\n        flex: 2 1 0%;\n    -ms-flex-order: 1;\n        order: 1;\n    position: relative\n}\n.ChatMessage-message-juel-:before {\n    \n    display: inline-block;\n    \n    position: absolute;\n    \n    top: 0;\n    \n    width: 0;\n    \n    height: 0;\n    \n    vertical-align: middle;\n    \n    content: \"\";\n    \n    border-bottom: 20px solid transparent;\n}\n.ChatMessage-right-2iCaU .ChatMessage-message-juel- {\n    background-color: #2EA2F8;\n    -ms-flex-order: 1;\n        order: 1\n}\n.ChatMessage-right-2iCaU .ChatMessage-message-juel-:before {\n    \n    right: -10px;\n    \n    border-left: 15px solid #2EA2F8;\n}\n.ChatMessage-left-1pdWc .ChatMessage-message-juel-{\n    background-color: #12212E;\n    -ms-flex-order: 2;\n        order: 2\n}\n.ChatMessage-left-1pdWc .ChatMessage-message-juel-:before {\n    \n    left: -10px;\n    \n    border-right: 15px solid #12212E;\n}\n.ChatMessage-right-2iCaU .ChatMessage-avatar-3WRHq {\n    margin-left: 20px;\n    -ms-flex-order: 2;\n        order: 2;\n}\n.ChatMessage-left-1pdWc .ChatMessage-avatar-3WRHq{\n    margin-right: 20px;\n    -ms-flex-order: 1;\n        order: 1;\n}\n.ChatMessage-avatar-3WRHq > img {\n    width: 50px;\n    border-radius: 50%;\n    background-color: white;\n}\n.ChatMessage-time-ago-2VS5g {\n    color: #a0b9bf;\n    font-size: 12px;\n}\n.ChatMessage-right-2iCaU .ChatMessage-time-ago-2VS5g {\n    margin-right: 70px;\n    text-align: end;\n}\n.ChatMessage-left-1pdWc .ChatMessage-time-ago-2VS5g {\n    margin-left: 70px;\n    text-align: start;\n}\n/*\n.right .info{\n    text-align: end;\n}\n\n.left .info{\n    text-align: start;\n}*/\n.ChatMessage-right-2iCaU{\n    -ms-flex-align: end;\n        align-items: flex-end;\n}\n.ChatMessage-left-1pdWc{\n    -ms-flex-align: start;\n        align-items: flex-start;\n}\n@media (max-width: 672px) {\n    .ChatMessage-avatar-3WRHq {\n        display: none !important;\n    }\n    .ChatMessage-time-ago-2VS5g {\n        margin-right: 0 !important;\n        margin-left: 0 !important;\n    }\n}", "", {"version":3,"sources":["/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/ChatRoom/ChatMessage/ChatMessage.css"],"names":[],"mappings":";AACA;;IAEI,qBAAqB;;IAErB,cAAc;IACd,2BAA2B;QACvB,uBAAuB;IAC3B,aAAa;CAChB;AACD;IACI;QACI,gBAAgB;KACnB;CACJ;AACD;IACI;QACI,gBAAgB;KACnB;CACJ;AACD;IACI,iBAAiB;QACb,aAAa;IACjB,qBAAqB;IACrB,cAAc;IACd,wBAAwB;QACpB,oBAAoB;IACxB,sBAAsB;QAClB,wBAAwB;IAC5B,eAAe;CAClB;AACD;IACI,aAAa;IACb,gBAAgB;IAChB,iBAAiB;IACjB,6BAA6B;IAC7B,mBAAmB;IACnB,qBAAqB;IACrB,cAAc;IACd,2BAA2B;QACvB,uBAAuB;IAC3B,iBAAiB;QACb,aAAa;IACjB,kBAAkB;QACd,SAAS;IACb,kBAAkB;CACrB;AACD;;IAEI,sBAAsB;;IAEtB,mBAAmB;;IAEnB,OAAO;;IAEP,SAAS;;IAET,UAAU;;IAEV,uBAAuB;;IAEvB,YAAY;;IAEZ,sCAAsC;CACzC;AACD;IACI,0BAA0B;IAC1B,kBAAkB;QACd,QAAQ;CACf;AACD;;IAEI,aAAa;;IAEb,gCAAgC;CACnC;AACD;IACI,0BAA0B;IAC1B,kBAAkB;QACd,QAAQ;CACf;AACD;;IAEI,YAAY;;IAEZ,iCAAiC;CACpC;AACD;IACI,kBAAkB;IAClB,kBAAkB;QACd,SAAS;CAChB;AACD;IACI,mBAAmB;IACnB,kBAAkB;QACd,SAAS;CAChB;AACD;IACI,YAAY;IACZ,mBAAmB;IACnB,wBAAwB;CAC3B;AACD;IACI,eAAe;IACf,gBAAgB;CACnB;AACD;IACI,mBAAmB;IACnB,gBAAgB;CACnB;AACD;IACI,kBAAkB;IAClB,kBAAkB;CACrB;AACD;;;;;;;GAOG;AACH;IACI,oBAAoB;QAChB,sBAAsB;CAC7B;AACD;IACI,sBAAsB;QAClB,wBAAwB;CAC/B;AACD;IACI;QACI,yBAAyB;KAC5B;IACD;QACI,2BAA2B;QAC3B,0BAA0B;KAC7B;CACJ","file":"ChatMessage.css","sourcesContent":["\n.container{\n    \n    display: -ms-flexbox;\n    \n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    margin: 20px;\n}\n@media (max-width: 672px) {\n    .container{\n        max-width: 100%;\n    }\n}\n@media (max-width: 991px) {\n    .container{\n        max-width: 100%;\n    }\n}\n.content {\n    -ms-flex: 1 1 0%;\n        flex: 1 1 0%;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n        flex-direction: row;\n    -ms-flex-align: start;\n        align-items: flex-start;\n    max-width: 70%;\n}\n.message {\n    color: white;\n    font-size: 14px;\n    font-weight: 200;\n    padding: 10px 20px 15px 20px;\n    border-radius: 6px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -ms-flex: 2 1 0%;\n        flex: 2 1 0%;\n    -ms-flex-order: 1;\n        order: 1;\n    position: relative\n}\n.message:before {\n    \n    display: inline-block;\n    \n    position: absolute;\n    \n    top: 0;\n    \n    width: 0;\n    \n    height: 0;\n    \n    vertical-align: middle;\n    \n    content: \"\";\n    \n    border-bottom: 20px solid transparent;\n}\n.right .message {\n    background-color: #2EA2F8;\n    -ms-flex-order: 1;\n        order: 1\n}\n.right .message:before {\n    \n    right: -10px;\n    \n    border-left: 15px solid #2EA2F8;\n}\n.left .message{\n    background-color: #12212E;\n    -ms-flex-order: 2;\n        order: 2\n}\n.left .message:before {\n    \n    left: -10px;\n    \n    border-right: 15px solid #12212E;\n}\n.right .avatar {\n    margin-left: 20px;\n    -ms-flex-order: 2;\n        order: 2;\n}\n.left .avatar{\n    margin-right: 20px;\n    -ms-flex-order: 1;\n        order: 1;\n}\n.avatar > img {\n    width: 50px;\n    border-radius: 50%;\n    background-color: white;\n}\n.time-ago {\n    color: #a0b9bf;\n    font-size: 12px;\n}\n.right .time-ago {\n    margin-right: 70px;\n    text-align: end;\n}\n.left .time-ago {\n    margin-left: 70px;\n    text-align: start;\n}\n/*\n.right .info{\n    text-align: end;\n}\n\n.left .info{\n    text-align: start;\n}*/\n.right{\n    -ms-flex-align: end;\n        align-items: flex-end;\n}\n.left{\n    -ms-flex-align: start;\n        align-items: flex-start;\n}\n@media (max-width: 672px) {\n    .avatar {\n        display: none !important;\n    }\n    .time-ago {\n        margin-right: 0 !important;\n        margin-left: 0 !important;\n    }\n}"],"sourceRoot":""}]);

// exports
exports.locals = {
	"container": "ChatMessage-container-rqBrT",
	"content": "ChatMessage-content-13Yah",
	"message": "ChatMessage-message-juel-",
	"right": "ChatMessage-right-2iCaU",
	"left": "ChatMessage-left-1pdWc",
	"avatar": "ChatMessage-avatar-3WRHq",
	"time-ago": "ChatMessage-time-ago-2VS5g"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatRoom/ChatRoom.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n\n.ChatRoom-container-1IVbN {\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -ms-flex: 2 1 0%;\n        flex: 2 1 0%;\n    -ms-flex-pack: end;\n        justify-content: flex-end;\n}\n\n.ChatRoom-chat-inputs-2tQtd {\n    display: -ms-flexbox;\n    display: flex;\n    background: #1B3143;\n    -ms-flex-align: end;\n        align-items: flex-end;\n    padding: 15px;\n    border-top: 1px solid rgba(255,255,255,.1);\n}\n\n.ChatRoom-chat-inputs-2tQtd .ChatRoom-elastic-32oLv {\n\t\tdisplay: -ms-flexbox;\n\t\tdisplay: flex;\n\t    -ms-flex: 1 1 0%;\n\t        flex: 1 1 0%;\n\t    margin-right: 15px;\n\t}\n\n.ChatRoom-chat-inputs-2tQtd .ChatRoom-actionGroup-ivG95 {\n\t\t-ms-flex: 0 1 0%;\n\t\t    flex: 0 1 0%;\n    \tdisplay: -ms-flexbox;\n    \tdisplay: flex;\n    \t-ms-flex-align: center;\n    \t    align-items: center;\n\t}\n\n.ChatRoom-chat-inputs-2tQtd .ChatRoom-actionGroup-ivG95 .dropdown-toggle {\n    \t\tdisplay: -ms-flexbox;\n    \t\tdisplay: flex;\n    \t}\n\n.ChatRoom-chat-inputs-2tQtd .ChatRoom-actions-1fWuO {\n\t\tmargin-right: 15px;\n\t}\n\n.ChatRoom-chat-inputs-2tQtd .ChatRoom-message-field-3YrAI {\n\t\tcolor: #FFFFFF;\n\t    border-radius: 4px;\n\t    border: 0;\n\t    -ms-flex: 2 1 100%;\n\t        flex: 2 1 100%;\n\t    height: 36px;\n\t    background: transparent;\n\t    font-family: 'Montserrat';\n\t    font-size: 14px;\n\t    font-weight: normal;\n\t    padding: 0 15px 0 0;\n\t    line-height: 18px;\n\t    resize: none;\n\t\tz-index: 9;\n\t}\n\n.ChatRoom-messages-cbr4Q {\n\t-ms-flex: 2 1 0%;\n\t    flex: 2 1 0%;\n\toverflow: auto;\n    -ms-flex-direction: column-reverse;\n        flex-direction: column-reverse;\n    padding: 20px;\n    overflow-x: hidden;\n}\n\n", "", {"version":3,"sources":["/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/ChatRoom/ChatRoom.css"],"names":[],"mappings":";;AAEA;CACC,qBAAqB;CACrB,cAAc;IACX,2BAA2B;QACvB,uBAAuB;IAC3B,iBAAiB;QACb,aAAa;IACjB,mBAAmB;QACf,0BAA0B;CACjC;;AAED;IACI,qBAAqB;IACrB,cAAc;IACd,oBAAoB;IACpB,oBAAoB;QAChB,sBAAsB;IAC1B,cAAc;IACd,2CAA2C;CAC9C;;AAED;EACE,qBAAqB;EACrB,cAAc;KACX,iBAAiB;SACb,aAAa;KACjB,mBAAmB;EACtB;;AAEF;EACE,iBAAiB;MACb,aAAa;KACd,qBAAqB;KACrB,cAAc;KACd,uBAAuB;SACnB,oBAAoB;EAC3B;;AAEF;MACM,qBAAqB;MACrB,cAAc;MACd;;AAEN;EACE,mBAAmB;EACnB;;AAEF;EACE,eAAe;KACZ,mBAAmB;KACnB,UAAU;KACV,mBAAmB;SACf,eAAe;KACnB,aAAa;KACb,wBAAwB;KACxB,0BAA0B;KAC1B,gBAAgB;KAChB,oBAAoB;KACpB,oBAAoB;KACpB,kBAAkB;KAClB,aAAa;EAChB,WAAW;EACX;;AAEF;CACC,iBAAiB;KACb,aAAa;CACjB,eAAe;IACZ,mCAAmC;QAC/B,+BAA+B;IACnC,cAAc;IACd,mBAAmB;CACtB","file":"ChatRoom.css","sourcesContent":["\n\n.container {\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -ms-flex: 2 1 0%;\n        flex: 2 1 0%;\n    -ms-flex-pack: end;\n        justify-content: flex-end;\n}\n\n.chat-inputs {\n    display: -ms-flexbox;\n    display: flex;\n    background: #1B3143;\n    -ms-flex-align: end;\n        align-items: flex-end;\n    padding: 15px;\n    border-top: 1px solid rgba(255,255,255,.1);\n}\n\n.chat-inputs .elastic {\n\t\tdisplay: -ms-flexbox;\n\t\tdisplay: flex;\n\t    -ms-flex: 1 1 0%;\n\t        flex: 1 1 0%;\n\t    margin-right: 15px;\n\t}\n\n.chat-inputs .actionGroup {\n\t\t-ms-flex: 0 1 0%;\n\t\t    flex: 0 1 0%;\n    \tdisplay: -ms-flexbox;\n    \tdisplay: flex;\n    \t-ms-flex-align: center;\n    \t    align-items: center;\n\t}\n\n.chat-inputs .actionGroup :global(.dropdown-toggle) {\n    \t\tdisplay: -ms-flexbox;\n    \t\tdisplay: flex;\n    \t}\n\n.chat-inputs .actions {\n\t\tmargin-right: 15px;\n\t}\n\n.chat-inputs .message-field {\n\t\tcolor: #FFFFFF;\n\t    border-radius: 4px;\n\t    border: 0;\n\t    -ms-flex: 2 1 100%;\n\t        flex: 2 1 100%;\n\t    height: 36px;\n\t    background: transparent;\n\t    font-family: 'Montserrat';\n\t    font-size: 14px;\n\t    font-weight: normal;\n\t    padding: 0 15px 0 0;\n\t    line-height: 18px;\n\t    resize: none;\n\t\tz-index: 9;\n\t}\n\n.messages {\n\t-ms-flex: 2 1 0%;\n\t    flex: 2 1 0%;\n\toverflow: auto;\n    -ms-flex-direction: column-reverse;\n        flex-direction: column-reverse;\n    padding: 20px;\n    overflow-x: hidden;\n}\n\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"container": "ChatRoom-container-1IVbN",
	"chat-inputs": "ChatRoom-chat-inputs-2tQtd",
	"elastic": "ChatRoom-elastic-32oLv",
	"actionGroup": "ChatRoom-actionGroup-ivG95",
	"actions": "ChatRoom-actions-1fWuO",
	"message-field": "ChatRoom-message-field-3YrAI",
	"messages": "ChatRoom-messages-cbr4Q"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/CurrentTalks/CurrentTalks.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.CurrentTalks-container-3rFSS {\n  padding: 10px;\n  background-color: #12212E;\n  border-right: 1px solid #263d50;\n  resize: horizontal;\n  position: relative;\n  max-width: 180px;\n  min-width: 60px;\n  display: none;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -webkit-transition: all .2s ease-out;\n  -o-transition: all .2s ease-out;\n  transition: all .2s ease-out;\n}\n.CurrentTalks-container-3rFSS * {\n  -webkit-transition: all .2s ease-out;\n  -o-transition: all .2s ease-out;\n  transition: all .2s ease-out;\n}\n.mobile .resizable-handle {\n  display: none !important;\n}\n.mobile .CurrentTalks-container-3rFSS,\n.CurrentTalks-container-3rFSS.CurrentTalks-min-2w-WG {\n  min-width: 60px;\n  width: 60px;\n  max-width: 60px;\n  display: -ms-flexbox;\n  display: flex;\n  /* TAVA AQUI NA SEXTA FEIRA */\n}\n.mobile .CurrentTalks-container-3rFSS .CurrentTalks-container-header-2-l7r, .CurrentTalks-container-3rFSS.CurrentTalks-min-2w-WG .CurrentTalks-container-header-2-l7r {\n    display: none;\n  }\n.mobile .CurrentTalks-container-3rFSS .CurrentTalks-talk-31VmZ, .CurrentTalks-container-3rFSS.CurrentTalks-min-2w-WG .CurrentTalks-talk-31VmZ {\n    border: none;\n    padding: 0;\n    background: none;\n    margin-bottom: 5px;\n  }\n.mobile .CurrentTalks-container-3rFSS .CurrentTalks-talk-31VmZ .CurrentTalks-count-1c_46, .CurrentTalks-container-3rFSS.CurrentTalks-min-2w-WG .CurrentTalks-talk-31VmZ .CurrentTalks-count-1c_46 {\n      position: absolute;\n      top: 0px;\n      right: -5px;\n    }\n.mobile .CurrentTalks-container-3rFSS .CurrentTalks-talk-31VmZ:hover, .CurrentTalks-container-3rFSS.CurrentTalks-min-2w-WG .CurrentTalks-talk-31VmZ:hover {\n  background: #0C151D;\n}\n.mobile .CurrentTalks-container-3rFSS .CurrentTalks-user-e0ES5, .CurrentTalks-container-3rFSS.CurrentTalks-min-2w-WG .CurrentTalks-user-e0ES5 {\n    height: 100%;\n    -ms-flex-pack: center;\n        justify-content: center;\n    -ms-flex-align: center;\n        align-items: center;\n  }\n.mobile .CurrentTalks-container-3rFSS .CurrentTalks-user-e0ES5 span, .CurrentTalks-container-3rFSS.CurrentTalks-min-2w-WG .CurrentTalks-user-e0ES5 span {\n      display: none;\n    }\n.mobile .CurrentTalks-container-3rFSS .CurrentTalks-talk-avatar-1m1Ko, .CurrentTalks-container-3rFSS.CurrentTalks-min-2w-WG .CurrentTalks-talk-avatar-1m1Ko {\n    width: 30px;\n    height: 30px;\n    margin: 0;\n\n  }\n.CurrentTalks-container-3rFSS.CurrentTalks-max-ypaZS {\n  min-width: 180px;\n  display: -ms-flexbox;\n  display: flex;\n}\n@media (max-width: 991px) {\n  .CurrentTalks-container-3rFSS {\n    max-width: 60px !important;\n  }\n  .CurrentTalks-container-3rFSS.CurrentTalks-max-ypaZS {\n    min-width: 60px;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n.CurrentTalks-container-header-2-l7r {\n  margin-bottom: 10px;\n}\n.CurrentTalks-header-3eEbf {\n  color: #A8AAB7;\n  font-size: 12px;\n  font-weight: 500;\n}\n.CurrentTalks-user-e0ES5 {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex: 2 1 0%;\n      flex: 2 1 0%;\n}\n.CurrentTalks-current-talks-1mP4- {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n.CurrentTalks-talk-31VmZ {\n  position: relative;\n  border: 1px solid #313d4f;\n  padding: 5px;\n  -ms-flex: 1 0 38px;\n      flex: 1 0 38px;\n  height: 38px;\n  color: #b2b9c4;\n  background-color: #273142;\n  color: #b2b9c4;\n  border-radius: 4px;\n  position: relative;\n  font-size: 12px;\n  font-weight: bold;\n  margin-bottom: 12px;\n  -ms-flex-align: center;\n      align-items: center;\n  display: -ms-flexbox;\n  display: flex;\n}\n.CurrentTalks-talk-31VmZ:hover {\n  background: #0C151D;\n  border-color:  #12212E;\n  color: #2EA2F8;\n  cursor: pointer;\n}\n.CurrentTalks-talk-avatar-1m1Ko {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  margin: 1px 10px 0 2px;\n  background-color: white;\n  background-size: contain;\n}\n.CurrentTalks-count-1c_46 {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  font-weight: bold;\n  height: 20px;\n  width: 20px;\n  line-height: 0;\n  -ms-flex: 0 0 20px;\n      flex: 0 0 20px\n}\n", "", {"version":3,"sources":["/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/CurrentTalks/CurrentTalks.css"],"names":[],"mappings":";AACA;EACE,cAAc;EACd,0BAA0B;EAC1B,gCAAgC;EAChC,mBAAmB;EACnB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;EAChB,cAAc;EACd,2BAA2B;MACvB,uBAAuB;EAC3B,qCAAqC;EACrC,gCAAgC;EAChC,6BAA6B;CAC9B;AACD;EACE,qCAAqC;EACrC,gCAAgC;EAChC,6BAA6B;CAC9B;AACD;EACE,yBAAyB;CAC1B;AACD;;EAEE,gBAAgB;EAChB,YAAY;EACZ,gBAAgB;EAChB,qBAAqB;EACrB,cAAc;EACd,8BAA8B;CAC/B;AACD;IACI,cAAc;GACf;AACH;IACI,aAAa;IACb,WAAW;IACX,iBAAiB;IACjB,mBAAmB;GACpB;AACH;MACM,mBAAmB;MACnB,SAAS;MACT,YAAY;KACb;AACL;EACE,oBAAoB;CACrB;AACD;IACI,aAAa;IACb,sBAAsB;QAClB,wBAAwB;IAC5B,uBAAuB;QACnB,oBAAoB;GACzB;AACH;MACM,cAAc;KACf;AACL;IACI,YAAY;IACZ,aAAa;IACb,UAAU;;GAEX;AACH;EACE,iBAAiB;EACjB,qBAAqB;EACrB,cAAc;CACf;AACD;EACE;IACE,2BAA2B;GAC5B;EACD;IACE,gBAAgB;IAChB,qBAAqB;IACrB,cAAc;GACf;CACF;AACD;EACE,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,iBAAiB;CAClB;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,iBAAiB;MACb,aAAa;CAClB;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,2BAA2B;MACvB,uBAAuB;CAC5B;AACD;EACE,mBAAmB;EACnB,0BAA0B;EAC1B,aAAa;EACb,mBAAmB;MACf,eAAe;EACnB,aAAa;EACb,eAAe;EACf,0BAA0B;EAC1B,eAAe;EACf,mBAAmB;EACnB,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;EAClB,oBAAoB;EACpB,uBAAuB;MACnB,oBAAoB;EACxB,qBAAqB;EACrB,cAAc;CACf;AACD;EACE,oBAAoB;EACpB,uBAAuB;EACvB,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,wBAAwB;EACxB,yBAAyB;CAC1B;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,sBAAsB;MAClB,wBAAwB;EAC5B,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,eAAe;EACf,mBAAmB;MACf,cAAc;CACnB","file":"CurrentTalks.css","sourcesContent":["\n.container {\n  padding: 10px;\n  background-color: #12212E;\n  border-right: 1px solid #263d50;\n  resize: horizontal;\n  position: relative;\n  max-width: 180px;\n  min-width: 60px;\n  display: none;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -webkit-transition: all .2s ease-out;\n  -o-transition: all .2s ease-out;\n  transition: all .2s ease-out;\n}\n.container * {\n  -webkit-transition: all .2s ease-out;\n  -o-transition: all .2s ease-out;\n  transition: all .2s ease-out;\n}\n:global(.mobile .resizable-handle) {\n  display: none !important;\n}\n:global(.mobile) .container,\n.container.min {\n  min-width: 60px;\n  width: 60px;\n  max-width: 60px;\n  display: -ms-flexbox;\n  display: flex;\n  /* TAVA AQUI NA SEXTA FEIRA */\n}\n:global(.mobile) .container .container-header, .container.min .container-header {\n    display: none;\n  }\n:global(.mobile) .container .talk, .container.min .talk {\n    border: none;\n    padding: 0;\n    background: none;\n    margin-bottom: 5px;\n  }\n:global(.mobile) .container .talk .count, .container.min .talk .count {\n      position: absolute;\n      top: 0px;\n      right: -5px;\n    }\n:global(.mobile) .container .talk:hover, .container.min .talk:hover {\n  background: #0C151D;\n}\n:global(.mobile) .container .user, .container.min .user {\n    height: 100%;\n    -ms-flex-pack: center;\n        justify-content: center;\n    -ms-flex-align: center;\n        align-items: center;\n  }\n:global(.mobile) .container .user span, .container.min .user span {\n      display: none;\n    }\n:global(.mobile) .container .talk-avatar, .container.min .talk-avatar {\n    width: 30px;\n    height: 30px;\n    margin: 0;\n\n  }\n.container.max {\n  min-width: 180px;\n  display: -ms-flexbox;\n  display: flex;\n}\n@media (max-width: 991px) {\n  .container {\n    max-width: 60px !important;\n  }\n  .container.max {\n    min-width: 60px;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n.container-header {\n  margin-bottom: 10px;\n}\n.header {\n  color: #A8AAB7;\n  font-size: 12px;\n  font-weight: 500;\n}\n.user {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex: 2 1 0%;\n      flex: 2 1 0%;\n}\n.current-talks {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n.talk {\n  position: relative;\n  border: 1px solid #313d4f;\n  padding: 5px;\n  -ms-flex: 1 0 38px;\n      flex: 1 0 38px;\n  height: 38px;\n  color: #b2b9c4;\n  background-color: #273142;\n  color: #b2b9c4;\n  border-radius: 4px;\n  position: relative;\n  font-size: 12px;\n  font-weight: bold;\n  margin-bottom: 12px;\n  -ms-flex-align: center;\n      align-items: center;\n  display: -ms-flexbox;\n  display: flex;\n}\n.talk:hover {\n  background: #0C151D;\n  border-color:  #12212E;\n  color: #2EA2F8;\n  cursor: pointer;\n}\n.talk-avatar {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  margin: 1px 10px 0 2px;\n  background-color: white;\n  background-size: contain;\n}\n.count {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  font-weight: bold;\n  height: 20px;\n  width: 20px;\n  line-height: 0;\n  -ms-flex: 0 0 20px;\n      flex: 0 0 20px\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"container": "CurrentTalks-container-3rFSS",
	"min": "CurrentTalks-min-2w-WG",
	"container-header": "CurrentTalks-container-header-2-l7r",
	"talk": "CurrentTalks-talk-31VmZ",
	"count": "CurrentTalks-count-1c_46",
	"user": "CurrentTalks-user-e0ES5",
	"talk-avatar": "CurrentTalks-talk-avatar-1m1Ko",
	"max": "CurrentTalks-max-ypaZS",
	"header": "CurrentTalks-header-3eEbf",
	"current-talks": "CurrentTalks-current-talks-1mP4-"
};

/***/ }),

/***/ "./src/admin/actions/chat.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRoom", function() { return selectRoom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addRoom", function() { return addRoom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChatRooms", function() { return getChatRooms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSingleChatRoom", function() { return getSingleChatRoom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllMessagesFromRoom", function() { return getAllMessagesFromRoom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMessage", function() { return addMessage; });
/* harmony import */ var admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/admin/constants/chat.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);
var _templateObject = /*#__PURE__*/ _taggedTemplateLiteral(["{\n\t\t\t\t\t\tgetChatRooms {\n\t\t\t\t\t\t    id\n\t\t\t\t\t\t    blocked\n\t\t\t\t\t\t    archived\n\t\t\t\t\t\t    color\n\t\t\t\t\t\t    total_messages\n\t\t\t\t\t\t    created_at\n\t\t\t\t\t\t    last_message {\n\t\t\t\t\t\t    \tbody\n\t\t\t\t\t\t    \tcreated_at\n\t\t\t\t\t\t    }\n\t\t\t\t\t\t    customer {\n\t\t\t\t\t\t      sfid\n\t\t\t\t\t\t      email\n\t\t\t\t\t\t      first_name\n\t\t\t\t\t\t      last_name\n\t\t\t\t\t\t      phone\n\t\t\t\t\t\t      type__c\n\t\t\t\t\t\t      account_id\n\t\t\t\t\t\t    }\n\t\t\t\t\t\t}\n\t        }"]),
    _templateObject2 = /*#__PURE__*/ _taggedTemplateLiteral(["query getSingleChatRoom($id: ID!) {\n\t\t \t\t\t\tgetSingleChatRoom(id: $id) {\n\t\t\t\t\t    id\n\t\t\t\t\t    blocked\n\t\t\t\t\t    archived\n\t\t\t\t\t    color\n\t\t\t\t\t    total_messages\n\t\t\t\t\t    last_message {\n\t\t\t\t\t    \tbody\n\t\t\t\t\t    \tcreated_at\n\t\t\t\t\t    }\n\t\t\t\t\t    customer {\n\t\t\t\t\t      sfid\n\t\t\t\t\t      email\n\t\t\t\t\t      first_name\n\t\t\t\t\t      last_name\n\t\t\t\t\t      phone\n\t\t\t\t\t      type__c\n\t\t\t\t\t      account_id\n\t\t\t\t\t    }\n\t\t\t\t\t    messages {\n\t\t\t\t\t    \tid\n\t\t\t\t\t\t    body\n\t\t\t\t\t\t    created_at\n\t\t\t\t\t\t\t\tautomated\n\t\t\t\t\t\t\t\tcli_read\n\t\t\t\t\t\t\t\tadv_read\n\t\t\t\t\t\t    user {\n\t\t\t\t\t\t    \tid\n\t\t\t\t\t\t    \tavatar_path\n\t\t\t\t\t\t    }\n\t\t\t\t\t    }\n\t\t\t\t  \t}\n  \t\t\t\t}"]),
    _templateObject3 = /*#__PURE__*/ _taggedTemplateLiteral(["query getMessagesFromChatRoom($id: ID!, $pagination: Pagination) {\n\t\t \t\t\t\tgetMessagesFromChatRoom(id: $id, pagination: $pagination) {\n\t\t\t\t\t    id\n\t\t\t\t\t    body\n\t\t\t\t\t    created_at\n\t\t\t\t\t\t\tautomated\n\t\t\t\t\t\t\tcli_read\n\t\t\t\t\t\t\tadv_read\n\t\t\t\t\t\t  user {\n\t\t\t\t\t\t    id\n\t\t\t\t\t\t    avatar_path\n\t\t\t\t\t\t  }\n\t\t\t\t\t  }\n\t  \t\t\t}"]);

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }



function selectRoom(id) {
  return function (dispatch) {
    dispatch({
      type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["SHOW_BACKDROP"]
    });
    dispatch({
      type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["SELECT_ROOM"],
      payload: {
        id: id
      }
    });
    dispatch({
      type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["SHOW_SIDEBAR"]
    });
  };
}
function addRoom(room) {
  return function (dispatch) {
    dispatch({
      type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["ADD_CHAT_ROOM"],
      payload: {
        room: room
      }
    });
  };
}
function getChatRooms(offset, limit) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch, getState, _ref) {
        var client, _ref3, data, _getChatRooms;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                client = _ref.client;
                dispatch({
                  type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["GET_CHAT_ROOMS"]
                });
                _context.prev = 2;
                _context.next = 5;
                return client.query({
                  query: graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(_templateObject)
                });

              case 5:
                _ref3 = _context.sent;
                data = _ref3.data;
                _getChatRooms = data.getChatRooms;
                dispatch({
                  type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["GET_CHAT_ROOMS_SUCCESS"],
                  payload: {
                    rooms: _getChatRooms
                  }
                });
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](2);
                console.error(_context.t0);
                dispatch({
                  type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["GET_CHAT_ROOMS_ERROR"],
                  payload: {
                    e: _context.t0
                  }
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 11]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}
function getSingleChatRoom(id) {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch, getState, _ref4) {
        var client, history, _ref6, data, _getSingleChatRoom;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                client = _ref4.client, history = _ref4.history;
                dispatch({
                  type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["GET_SINGLE_CHAT_ROOM"]
                });
                _context2.prev = 2;
                _context2.next = 5;
                return client.query({
                  query: graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(_templateObject2),
                  variables: {
                    id: id
                  }
                });

              case 5:
                _ref6 = _context2.sent;
                data = _ref6.data;
                _getSingleChatRoom = data.getSingleChatRoom;
                dispatch({
                  type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["ADD_CHAT_ROOM"],
                  payload: {
                    room: _getSingleChatRoom
                  }
                });
                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](2);
                console.error(_context2.t0);
                dispatch({
                  type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["GET_SINGLE_CHAT_ROOM_ERROR"],
                  payload: {
                    e: _context2.t0
                  }
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 11]]);
      }));

      return function (_x4, _x5, _x6) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
}
function getAllMessagesFromRoom(id, pagination) {
  return (
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dispatch, getState, _ref7) {
        var client, history, _ref9, data, getMessagesFromChatRoom, room;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                client = _ref7.client, history = _ref7.history;
                _context3.prev = 1;
                _context3.next = 4;
                return client.query({
                  query: graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(_templateObject3),
                  variables: {
                    id: id,
                    pagination: pagination
                  }
                });

              case 4:
                _ref9 = _context3.sent;
                data = _ref9.data;
                getMessagesFromChatRoom = data.getMessagesFromChatRoom;
                room = {
                  id: id,
                  messages: getMessagesFromChatRoom
                };
                dispatch({
                  type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["UPDATE_CHAT_ROOM"],
                  payload: {
                    room: room
                  }
                });
                _context3.next = 15;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](1);
                console.error(_context3.t0);
                dispatch({
                  type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["GET_SINGLE_CHAT_ROOM_ERROR"],
                  payload: {
                    e: _context3.t0
                  }
                });

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 11]]);
      }));

      return function (_x7, _x8, _x9) {
        return _ref8.apply(this, arguments);
      };
    }()
  );
}
function addMessage(_ref10) {
  var roomId = _ref10.roomId,
      message = _ref10.message;
  return (
    /*#__PURE__*/
    function () {
      var _ref11 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dispatch) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dispatch({
                  type: admin_constants_chat__WEBPACK_IMPORTED_MODULE_0__["ADD_MESSAGE_TO_CHAT_ROOM"],
                  payload: {
                    roomId: roomId,
                    message: message
                  }
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function (_x10) {
        return _ref11.apply(this, arguments);
      };
    }()
  );
}

/***/ }),

/***/ "./src/admin/components/Chat/Chat.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/Chat.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/Chat.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/Chat.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/admin/components/Chat/Chat.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Chat_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/admin/components/Chat/Chat.css");
/* harmony import */ var _Chat_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Chat_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ChatInspector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/admin/components/Chat/ChatInspector/ChatInspector.js");
/* harmony import */ var _CurrentTalks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/admin/components/Chat/CurrentTalks/CurrentTalks.js");
/* harmony import */ var _ChatHistory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/admin/components/Chat/ChatHistory/ChatHistory.js");
/* harmony import */ var _ChatRoom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/admin/components/Chat/ChatRoom/ChatRoom.js");
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/Chat.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }





 // import Filters from "../filters";
// import Sidebar from "../Sidebar";







 // import { subscribeNewChatRooms } from '../../../redux/actions/chat';

/* <div className={cx('dropdown', s.dropdown)}>
            <button className={"btn dropdown-toggle"} type="button" id="filter2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span>User</span>
            </button>
            <ul className={"dropdown-menu"} aria-labelledby="filter2">
              <li className={"dropdown-header"}>Type of User</li>
              <li className={"dropdown-item"}><a href="#">All</a></li>
              <li className={"dropdown-item"}><a href="#">Registered</a></li>
              <li className={"dropdown-item"}><a href="#">Unregistered</a></li>
            </ul>
          </div>

          <div className={cx('dropdown', s.dropdown)}>
            <button className={"btn dropdown-toggle"} type="button" id="filter3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span>Color</span>
            </button>
            <ul className={"dropdown-menu"} aria-labelledby="filter3">
              <li className={"dropdown-header"}>Color</li>
              <li className={"dropdown-item"}><a href="#">All</a></li>
              <li className={"dropdown-item"}><a href="#">Registered</a></li>
              <li className={"dropdown-item"}><a href="#">Annonymous</a></li>
            </ul>   
          </div>


          <div className={cx('dropdown', s.dropdown)}>
            <button className={"btn dropdown-toggle"} type="button" id="filter4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span>Device</span>
            </button>
            <ul className={"dropdown-menu"} aria-labelledby="filter4">
              <li className={"dropdown-item"}><a href="#">Mobile</a></li>
              <li className={"dropdown-item"}><a href="#">Browser</a></li>
              <li className={"dropdown-divider"}></li>
              <li className={"dropdown-item"}><a href="#">iOS</a></li>
              <li className={"dropdown-item"}><a href="#">Android</a></li>
            </ul>
          </div>
          
          
          <Filters searchInput={el => this.search = el} handleChange={handleChange} filters={filters} clearFilter={clearFilter} activeFilters={activeFilters} onSelectFilter={onSelectFilter} />
          
          */

var ChatManager = function ChatManager(_ref) {
  var rooms = _ref.rooms,
      filters = _ref.filters,
      handleChange = _ref.handleChange,
      clearFilter = _ref.clearFilter,
      activeFilters = _ref.activeFilters,
      onSelectFilter = _ref.onSelectFilter;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _Chat_css__WEBPACK_IMPORTED_MODULE_4___default.a["body-wrapper"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChatHistory__WEBPACK_IMPORTED_MODULE_10__["default"], {
    rooms: rooms,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }));
};

var Chat =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Chat, _React$Component);

  function Chat(props) {
    var _this;

    _classCallCheck(this, Chat);

    _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this, props));
    _this.state = {
      search: "",
      filters: null
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleSelectFilter = _this.handleSelectFilter.bind(_assertThisInitialized(_this));
    _this.clearFilter = _this.clearFilter.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Chat, [{
    key: "handleChange",
    value: function handleChange(ev) {
      this.setState({
        search: this.search.value
      });
    }
  }, {
    key: "handleSelectFilter",
    value: function handleSelectFilter(ev, _ref2) {
      var key = _ref2.key,
          id = _ref2.id;
      this.setState({
        filters: _defineProperty({}, key, id)
      });
    }
  }, {
    key: "clearFilter",
    value: function clearFilter(ev, _ref3) {
      var key = _ref3.key;
      this.setState({
        filters: lodash__WEBPACK_IMPORTED_MODULE_5___default.a.reduce(this.state.filters, function (filter, value, filterKey) {
          if (filterKey !== key) {
            filter[filterKey] = value;
          }

          return filter;
        }, {})
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          isManager = _props.isManager,
          showChatInspector = _props.showChatInspector,
          selectedRoomId = _props.selectedRoomId,
          rooms = _props.rooms,
          room = _props.room;
      var filtersAvailable = [// {
        //   label: 'role',
        //   key: 'roleId',
        //   options: roles,
        //   type: 'dropdown'
        // }
      ];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "wrapper-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CurrentTalks__WEBPACK_IMPORTED_MODULE_9__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }, isManager ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ChatManager, {
        rooms: rooms,
        handleChange: this.handleChange,
        filters: filtersAvailable,
        activeFilters: this.state.filters,
        clearFilter: this.clearFilter,
        onSelectFilter: this.handleSelectFilter,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChatRoom__WEBPACK_IMPORTED_MODULE_11__["default"], {
        currentRoute: this.props.currentRoute,
        id: room.id,
        conversation: room.messages,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      })));
    }
  }]);

  return Chat;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
/**
 * 
 * 
 * <Sidebar className={cx((isManager) ? "manager-sidebar" : "room-sidebar")} fixed={!(isManager)} show={showChatInspector}>
          {
            (isManager && selectedRoomId) ? <ChatInspector id={selectedRoomId} isManager={isManager} /> : null
          }
          {
            (!isManager && room.id) ? <ChatInspector id={room.id} isManager={isManager} /> : null
          }
        </Sidebar>
*/


var mapStateToProps = function mapStateToProps(state) {
  return {
    rooms: [],
    selectedRoomId: null
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps, {})(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3___default()(_Chat_css__WEBPACK_IMPORTED_MODULE_4___default.a)(Chat)));

/***/ }),

/***/ "./src/admin/components/Chat/ChatHistory/ChatHistory.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatHistory/ChatHistory.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatHistory/ChatHistory.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatHistory/ChatHistory.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/admin/components/Chat/ChatHistory/ChatHistory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/admin/components/Chat/ChatHistory/ChatHistory.css");
/* harmony import */ var _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/admin/components/Chat/gfx/avatar.png");
/* harmony import */ var _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_gfx_avatar_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_history__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/core/history.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var admin_actions_chat__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/admin/actions/chat.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_12__);
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/ChatHistory/ChatHistory.js";

var _templateObject = /*#__PURE__*/ _taggedTemplateLiteral(["\n        subscription {\n            newRoom {\n              id\n              blocked\n              archived\n              color\n              total_messages\n              last_message {\n                body\n                created_at\n              }\n              customer {\n                sfid\n                email\n                first_name\n                last_name\n                phone\n                type__c\n                account_id\n              }\n            }\n          }\n      "]);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }














var messages = Object(react_intl__WEBPACK_IMPORTED_MODULE_2__["defineMessages"])({
  general: {
    id: 'settings.generalSettings.header',
    defaultMessage: 'General',
    description: 'settings.generalSettings.header'
  },
  siteTitle: {
    id: 'settings.generalSettings.field.siteTitle',
    defaultMessage: 'Site title',
    description: 'settings.generalSettings.field.siteTitle'
  },
  siteDescription: {
    id: 'settings.generalSettings.field.siteDescription',
    defaultMessage: 'Description',
    description: 'settings.generalSettings.field.siteDescription'
  },
  siteDefaultEmail: {
    id: 'settings.generalSettings.field.siteDefaultEmail',
    defaultMessage: 'Default email',
    description: 'settings.generalSettings.field.siteDefaultEmail'
  },
  save: {
    id: 'actions.save',
    defaultMessage: 'Save',
    description: 'actions.save'
  }
});

var ChatHistory =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ChatHistory, _React$Component);

  function ChatHistory(props) {
    var _this;

    _classCallCheck(this, ChatHistory);

    _this = _possibleConstructorReturn(this, (ChatHistory.__proto__ || Object.getPrototypeOf(ChatHistory)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "offset", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 400
    });
    Object.defineProperty(_assertThisInitialized(_this), "chunkSize", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 20
    });
    _this.inspectRoom = _this.inspectRoom.bind(_assertThisInitialized(_this)); // this.onScrollToBottom = this.onScrollToBottom.bind(this);

    _this.toggleSortBy = _this.toggleSortBy.bind(_assertThisInitialized(_this));
    _this.openRoom = _this.openRoom.bind(_assertThisInitialized(_this));
    _this.timeoutID = null;
    _this.delay = 250;
    _this.state = {
      predicate: 'timeago',
      order: true // false -> asc | true -> desc

    }; // this.rooms = _.orderBy(props.rooms, [this.state.predicate], [this.state.order]);

    return _this;
  }

  _createClass(ChatHistory, [{
    key: "openRoom",
    value: function openRoom(id) {
      core_history__WEBPACK_IMPORTED_MODULE_7__["default"].push("/chat/".concat(id));
    }
  }, {
    key: "inspectRoom",
    value: function inspectRoom(id) {
      this.props.selectRoom(id);
    }
  }, {
    key: "toggleSortBy",
    value: function toggleSortBy(e, predicate) {
      e.preventDefault();

      if (this.state.predicate === predicate) {
        this.setState({
          order: !this.state.order
        });
      } else {
        this.setState({
          predicate: predicate
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log(this.context);
      console.log(this.props);
      this.subscribe();
    }
  }, {
    key: "subscribe",
    value: function subscribe() {
      var client = this.context.client;
      var addRoom = this.props.addRoom;
      this.subscriptionObserver = client.subscribe({
        query: graphql_tag__WEBPACK_IMPORTED_MODULE_12___default()(_templateObject)
      }).subscribe({
        next: function next(data) {
          addRoom(data.newRoom);
        },
        error: function error(err) {
          console.error('err', err);
        }
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(e, id) {
      var _this2 = this;

      if (!this.timeoutID) {
        this.timeoutID = setTimeout(function () {
          _this2.inspectRoom(id);

          _this2.timeoutID = null;
        }, this.delay);
      } else {
        this.timeoutID = clearTimeout(this.timeoutID);
        this.openRoom(id);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var rooms = lodash__WEBPACK_IMPORTED_MODULE_8___default.a.orderBy(this.props.rooms, [this.state.predicate], [this.state.order ? 'desc' : 'asc']);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a['main-container'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 150
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a['content'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a['table']),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        className: _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.color,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        className: _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.avatar,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.user, 'hidden-xs-down'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        },
        __self: this
      }, "Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.lastmsg),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        },
        __self: this
      }, "Last Message"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.count, 'hidden-lg-down'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      }, "Total Messages"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.country, 'hidden-sm-down'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        },
        __self: this
      }, "Location"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.device, 'hidden-sm-down'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        },
        __self: this
      }, "Device"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        onClick: function onClick(e) {
          return _this3.toggleSortBy(e, 'timeago');
        },
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.timeago, 'hidden-xs-down', _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.clickable, this.state.predicate === 'timeago' ? _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.current : '', this.state.predicate === 'timeago' && this.state.order ? _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.desc : _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.asc),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        },
        __self: this
      }, "Time")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 166
        },
        __self: this
      }, rooms.map(function (room) {
        if (room.total_messages) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
            key: room.id,
            onClick: function onClick(e) {
              return _this3.handleClick(e, room.id);
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 172
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            className: _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.color,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 173
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a['chat-color'],
            style: {
              backgroundColor: room.color || 'grey'
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 174
            },
            __self: this
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            className: _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.avatar,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 176
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a['table-avatar'],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 177
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
            className: _ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a['chat-avatar'],
            src: _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_6___default.a,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 178
            },
            __self: this
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.user, 'hidden-xs-down'),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 181
            },
            __self: this
          }, room.customer ? "".concat(room.customer.first_name, " ").concat(room.customer.last_name) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.lastmsg),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 182
            },
            __self: this
          }, room.last_message.body), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.count, 'hidden-lg-down'),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 185
            },
            __self: this
          }, room.total_messages), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.country, 'hidden-sm-down'),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 186
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('famfamfam-flags'),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 187
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 188
            },
            __self: this
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.device, 'hidden-sm-down'),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 194
            },
            __self: this
          }, "Android"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a.timeago, 'hidden-xs-down'),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 195
            },
            __self: this
          }, room.last_message.created_at ? moment__WEBPACK_IMPORTED_MODULE_11___default()(room.last_message.created_at).fromNow() : null));
        } else {
          return null;
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 204
        },
        __self: this
      })))));
    }
  }]);

  return ChatHistory;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component); // const mapStateToProps = (state) => ({
//   rooms: state.chat.rooms,
// });


Object.defineProperty(ChatHistory, "contextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    client: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
  }
});
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_10__["connect"])(null, {
  selectRoom: admin_actions_chat__WEBPACK_IMPORTED_MODULE_9__["selectRoom"],
  addRoom: admin_actions_chat__WEBPACK_IMPORTED_MODULE_9__["addRoom"]
})(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3___default()(_ChatHistory_css__WEBPACK_IMPORTED_MODULE_4___default.a)(ChatHistory)));

/***/ }),

/***/ "./src/admin/components/Chat/ChatInspector/ChatInspector.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatInspector/ChatInspector.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatInspector/ChatInspector.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatInspector/ChatInspector.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/admin/components/Chat/ChatInspector/ChatInspector.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/admin/components/Chat/ChatInspector/ChatInspector.css");
/* harmony import */ var _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ChatInspector_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/admin/components/Chat/gfx/avatar.png");
/* harmony import */ var _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_gfx_avatar_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_history__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/core/history.js");
/* harmony import */ var react_feather_dist_icons_plus_circle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("react-feather/dist/icons/plus-circle");
/* harmony import */ var react_feather_dist_icons_plus_circle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_plus_circle__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_feather_dist_icons_more_horizontal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("react-feather/dist/icons/more-horizontal");
/* harmony import */ var react_feather_dist_icons_more_horizontal__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_more_horizontal__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_feather_dist_icons_user__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("react-feather/dist/icons/user");
/* harmony import */ var react_feather_dist_icons_user__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_user__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_feather_dist_icons_shield__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("react-feather/dist/icons/shield");
/* harmony import */ var react_feather_dist_icons_shield__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_shield__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_feather_dist_icons_package__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("react-feather/dist/icons/package");
/* harmony import */ var react_feather_dist_icons_package__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_package__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_extensions_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("react-extensions-svg");
/* harmony import */ var react_extensions_svg__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_extensions_svg__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_14__);
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/ChatInspector/ChatInspector.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }












 // import NavItem from '../../../components/NavBar/NavItem';





var messages = Object(react_intl__WEBPACK_IMPORTED_MODULE_1__["defineMessages"])({
  account: {
    id: 'chatinspector.header.action.account',
    defaultMessage: 'Account',
    description: 'Room Inspector dropdown user account'
  },
  archive: {
    id: 'chatinspector.header.action.archive',
    defaultMessage: 'Archive',
    description: 'Room Inspector dropdown archive conversation'
  },
  block: {
    id: 'chatinspector.header.action.block',
    defaultMessage: 'Block',
    description: 'Room Inspector dropdown block communications'
  },
  openRoom: {
    id: 'chatinspector.actions.openroom',
    defaultMessage: 'Open Conversation',
    description: 'Action on chat inspector to join conversation'
  },
  goBack: {
    id: 'chatinspector.actions.goback',
    defaultMessage: 'Go Back',
    description: 'Return to chat history'
  }
});
var quickActions = [{
  to: '/new',
  label: messages.account,
  icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather_dist_icons_user__WEBPACK_IMPORTED_MODULE_9___default.a, {
    color: "#FFFFFF",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: undefined
  }),
  class: 'info'
}, {
  to: '/new',
  label: messages.archive,
  icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather_dist_icons_package__WEBPACK_IMPORTED_MODULE_11___default.a, {
    color: "#FFFFFF",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: undefined
  })
}, {
  to: '/new',
  label: messages.block,
  icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather_dist_icons_shield__WEBPACK_IMPORTED_MODULE_10___default.a, {
    color: "#FFFFFF",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: undefined
  }),
  class: 'danger'
}];

var RenderExtensionIcon = function RenderExtensionIcon(_ref) {
  var extension = _ref.extension;
  var props = {
    color: '#FFFFFF',
    size: '32px'
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_extensions_svg__WEBPACK_IMPORTED_MODULE_12__[Object(lodash__WEBPACK_IMPORTED_MODULE_14__["capitalize"])(extension)], props);
};

var ChatInspector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ChatInspector, _React$Component);

  function ChatInspector(props) {
    var _this;

    _classCallCheck(this, ChatInspector);

    _this = _possibleConstructorReturn(this, (ChatInspector.__proto__ || Object.getPrototypeOf(ChatInspector)).call(this, props));
    _this.openRoom = _this.openRoom.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ChatInspector, [{
    key: "openRoom",
    value: function openRoom(e, id) {
      core_history__WEBPACK_IMPORTED_MODULE_6__["default"].push("/chat/".concat(id));
    }
  }, {
    key: "goBack",
    value: function goBack() {
      core_history__WEBPACK_IMPORTED_MODULE_6__["default"].goBack();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          rooms = _props.rooms,
          isManager = _props.isManager;

      var room = lodash__WEBPACK_IMPORTED_MODULE_14___default.a.find(rooms, {
        id: id
      }); // const room = rooms[id];


      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a.inspector,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['container-header'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['table-avatar'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['chat-avatar'],
        src: _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_5___default.a,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a.username,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, room.customer ? room.customer.first_name + ' ' + room.customer.last_name : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a.actions, 'dropdown'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('dropdown-toggle', 'no-caret'),
        id: "room-actions",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather_dist_icons_more_horizontal__WEBPACK_IMPORTED_MODULE_8___default.a, {
        color: "#FFFFFF",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('dropdown-menu', 'dropdown-menu-right'),
        "aria-labelledby": "room-actions",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "dropdown-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }, "Room Actions"), quickActions.map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: 'dropdown-item',
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: item.to,
          className: item.class,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          },
          __self: this
        }, item.icon, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], _extends({}, item.label, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          },
          __self: this
        }))));
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['container-content'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['info'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['info-line'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }, "Email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        },
        __self: this
      }, room.customer ? room.customer.email : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['info-line'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        },
        __self: this
      }, "Phone"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      }, "3102918223")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['info-line'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        },
        __self: this
      }, "Location"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['info-line'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        },
        __self: this
      }, "UUID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }, "76ASDAG6D7AS6KJJAOI099ALKAS"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['notes'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['info-line'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        },
        __self: this
      }, "Notes"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 164
        },
        __self: this
      }, this.props.notes && this.props.notes.length ? this.props.notes.length : 'Theres no notes yet')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("input-group"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 167
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Add notes here",
        "aria-describedby": "addnote",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 168
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "input-group-addon",
        id: "addnote",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 169
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather_dist_icons_plus_circle__WEBPACK_IMPORTED_MODULE_7___default.a, {
        color: "#FFFFFF",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['attachments'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['info-line'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178
        },
        __self: this
      }, "Attachments"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 179
        },
        __self: this
      }, this.props.attachments && this.props.attachments.length ? this.props.attachments.length : 'No attachments yet')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['attachments-list'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 182
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['attachment-item'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 184
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['extension-item'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RenderExtensionIcon, {
        extension: "mp3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['size-item'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        },
        __self: this
      }, "1.83(Mb)"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['date-item'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        },
        __self: this
      }, "28 Feb, 2017"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a['container-action'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 196
        },
        __self: this
      }, isManager ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('btn', 'btn-primary', 'btn-block'),
        onClick: function onClick(e) {
          return _this2.openRoom(e, room.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], _extends({}, messages.openRoom, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        },
        __self: this
      }))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('btn', 'btn-primary', 'btn-block'),
        onClick: this.goBack,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], _extends({}, messages.goBack, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        },
        __self: this
      })))));
    }
  }]);

  return ChatInspector;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    rooms: state.chat.rooms
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_13__["connect"])(mapStateToProps, null)(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_ChatInspector_css__WEBPACK_IMPORTED_MODULE_3___default.a)(ChatInspector)));

/***/ }),

/***/ "./src/admin/components/Chat/ChatRoom/ChatMessage/ChatMessage.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatRoom/ChatMessage/ChatMessage.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatRoom/ChatMessage/ChatMessage.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatRoom/ChatMessage/ChatMessage.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/admin/components/Chat/ChatRoom/ChatMessage/ChatMessage.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ChatMessage_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/admin/components/Chat/ChatRoom/ChatMessage/ChatMessage.css");
/* harmony import */ var _ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ChatMessage_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/admin/components/Chat/gfx/avatar.png");
/* harmony import */ var _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_gfx_avatar_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/ChatRoom/ChatMessage/ChatMessage.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var messages = Object(react_intl__WEBPACK_IMPORTED_MODULE_1__["defineMessages"])({
  currentTalks: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header'
  }
});

var ChatMessage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ChatMessage, _React$Component);

  function ChatMessage(props) {
    _classCallCheck(this, ChatMessage);

    return _possibleConstructorReturn(this, (ChatMessage.__proto__ || Object.getPrototypeOf(ChatMessage)).call(this, props));
  }

  _createClass(ChatMessage, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          attachments = _props.attachments,
          message = _props.message; // const attachments = _.times(attachments);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default.a['container'], this.props.owner === 'customer' ? _ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default.a['left'] : _ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default.a['right']),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default.a.content,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }, message.user && message.user.avatar_path ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default.a['avatar'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: message.user.avatar_path,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      })) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default.a['message'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default.a['corpus'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }, message.body), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default.a['attachments'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default.a['time-ago'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, moment__WEBPACK_IMPORTED_MODULE_7___default()(message.created_at).fromNow())));
    }
  }]);

  return ChatMessage;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_ChatMessage_css__WEBPACK_IMPORTED_MODULE_3___default.a)(ChatMessage));

/***/ }),

/***/ "./src/admin/components/Chat/ChatRoom/ChatRoom.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatRoom/ChatRoom.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatRoom/ChatRoom.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/ChatRoom/ChatRoom.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/admin/components/Chat/ChatRoom/ChatRoom.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ChatRoom_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/admin/components/Chat/ChatRoom/ChatRoom.css");
/* harmony import */ var _ChatRoom_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ChatRoom_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ChatMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/admin/components/Chat/ChatRoom/ChatMessage/ChatMessage.js");
/* harmony import */ var react_feather_dist_icons_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("react-feather/dist/icons/link");
/* harmony import */ var react_feather_dist_icons_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_feather_dist_icons_link_2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("react-feather/dist/icons/link-2");
/* harmony import */ var react_feather_dist_icons_link_2__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_link_2__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_feather_dist_icons_paperclip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("react-feather/dist/icons/paperclip");
/* harmony import */ var react_feather_dist_icons_paperclip__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_paperclip__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_feather_dist_icons_file_plus__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("react-feather/dist/icons/file-plus");
/* harmony import */ var react_feather_dist_icons_file_plus__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_file_plus__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var admin_actions_chat__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./src/admin/actions/chat.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _sendMessage_graphql__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./src/admin/components/Chat/ChatRoom/sendMessage.graphql");
/* harmony import */ var _sendMessage_graphql__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_sendMessage_graphql__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _subscribeNewMessage_graphql__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./src/admin/components/Chat/ChatRoom/subscribeNewMessage.graphql");
/* harmony import */ var _subscribeNewMessage_graphql__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_subscribeNewMessage_graphql__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _Breadcrumbs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./src/admin/components/Breadcrumbs/Breadcrumbs.js");
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/ChatRoom/ChatRoom.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }



















var messages = Object(react_intl__WEBPACK_IMPORTED_MODULE_1__["defineMessages"])({
  send: {
    id: "actions.send",
    defaultMessage: "Send",
    description: "actions.send"
  },
  textareaPlaceholder: {
    id: "textarea.placeholder",
    defaultMessage: "Write your message",
    description: "placeholder for textarea chat room"
  },
  dropdownTitle: {
    id: "dropdown.title",
    defaultMessage: "Add to Conversation",
    description: "dropdown title Add to Conversation"
  },
  dropdownFile: {
    id: "dropdown.uploadfile",
    defaultMessage: "File",
    description: "dropdown send file"
  },
  dropdownDocuSign: {
    id: "dropdown.docusign",
    defaultMessage: "Link DocuSign",
    description: "dropdown docusign"
  },
  dropdownLink: {
    id: "dropdown.link",
    defaultMessage: "Link URL",
    description: "dropdown link url"
  },
  loadMore: {
    id: "chat.room.load.more",
    defaultMessage: "Load More",
    description: "Button on top of chat room to fetch more messages"
  }
});
var quickActions = [{
  to: "#file",
  label: messages.dropdownFile,
  icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather_dist_icons_file_plus__WEBPACK_IMPORTED_MODULE_10___default.a, {
    color: "#FFFFFF",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: undefined
  })
}, {
  to: "#docusign",
  label: messages.dropdownDocuSign,
  icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather_dist_icons_link__WEBPACK_IMPORTED_MODULE_7___default.a, {
    color: "#FFFFFF",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: undefined
  })
}, {
  to: "#link-url",
  label: messages.dropdownLink,
  icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather_dist_icons_link_2__WEBPACK_IMPORTED_MODULE_8___default.a, {
    color: "#FFFFFF",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: undefined
  })
}]; // const getTextAreaPlaceholder = () => intl. {...messages.placeholder} />

var ChatRoom =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ChatRoom, _React$Component);

  function ChatRoom(props) {
    var _this;

    _classCallCheck(this, ChatRoom);

    _this = _possibleConstructorReturn(this, (ChatRoom.__proto__ || Object.getPrototypeOf(ChatRoom)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "sendMessage", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        e.preventDefault();

        if (_this.state.message.length) {
          _this.context.client.mutate({
            mutation: _sendMessage_graphql__WEBPACK_IMPORTED_MODULE_15___default.a,
            variables: {
              roomId: _this.props.id,
              body: _this.state.message
            }
          }).then(function (_ref) {
            var data = _ref.data;
            console.log(data, "!!success");

            _this.setState({
              message: ""
            });
          });
        }
      }
    });
    _this.state = {
      message: "",
      currentChunk: 1
    };
    _this.handleMessageChange = _this.handleMessageChange.bind(_assertThisInitialized(_this));
    _this.maxConversationLength = 20;
    _this.loadMore = _this.loadMore.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ChatRoom, [{
    key: "handleMessageChange",
    value: function handleMessageChange(e) {
      this.setState({
        message: this.message.value
      });
      var heightLimit = 200;
      this.message.style.height = "";
      /* Reset the height */

      this.message.style.height = "".concat(Math.min(this.message.scrollHeight, heightLimit), "px");
    }
  }, {
    key: "loadMore",
    value: function loadMore() {
      this.setState({
        currentChunk: this.state.currentChunk + 1
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollToLastMessage();
      this.subscribe();
    }
  }, {
    key: "scrollToLastMessage",
    value: function scrollToLastMessage(delay) {
      delay = delay || 300;
      $(this.messageContainer).animate({
        scrollTop: "".concat(this.messageContainer.scrollHeight, "px")
      }, delay);
    }
  }, {
    key: "subscribe",
    value: function subscribe() {
      var client = this.context.client;
      var _props = this.props,
          addMessage = _props.addMessage,
          id = _props.id;
      this.subscriptionObserver = client.subscribe({
        query: _subscribeNewMessage_graphql__WEBPACK_IMPORTED_MODULE_16___default.a,
        variables: {
          roomId: id
        }
      }).subscribe({
        next: function next(data) {
          console.log(data);
          addMessage({
            roomId: id,
            message: data.newMessage
          });
        },
        error: function error(err) {
          console.error("err", err);
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.conversation.length > prevProps.conversation.length) {
        this.scrollToLastMessage();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          intl = _props2.intl,
          conversation = _props2.conversation;
      var textAreaPlaceholder = intl.formatMessage(messages.textareaPlaceholder);

      var visibleMessages = lodash__WEBPACK_IMPORTED_MODULE_12___default.a.sortBy(conversation, [function (msg) {
        return lodash__WEBPACK_IMPORTED_MODULE_12___default.a.now(msg.created_at);
      }]).reverse(); // const messageChunks = _.chunk(sortedByDate, this.maxConversationLength);
      // const visibleMessages = _.sortBy(_.flatten(messageChunks.slice(0, this.state.currentChunk)), [function(msg) { return _.now(msg.created_at) }]).reverse();


      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatRoom_css__WEBPACK_IMPORTED_MODULE_4___default.a.container,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 174
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Breadcrumbs__WEBPACK_IMPORTED_MODULE_17__["default"], {
        route: this.props.currentRoute,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatRoom_css__WEBPACK_IMPORTED_MODULE_4___default.a.messages,
        ref: function ref(el) {
          return _this2.messageContainer = el;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        },
        __self: this
      }, visibleMessages.map(function (msg) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChatMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
          key: msg.id,
          message: msg,
          owner: msg.user ? "user" : "customer",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 180
          },
          __self: this
        });
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        className: _ChatRoom_css__WEBPACK_IMPORTED_MODULE_4___default.a["chat-inputs"],
        onSubmit: this.sendMessage,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 183
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatRoom_css__WEBPACK_IMPORTED_MODULE_4___default.a.elastic,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        autoFocus: true,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()("form-control", _ChatRoom_css__WEBPACK_IMPORTED_MODULE_4___default.a["message-field"]),
        onChange: this.handleMessageChange,
        value: this.state.message,
        ref: function ref(input) {
          return _this2.message = input;
        },
        placeholder: textAreaPlaceholder,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ChatRoom_css__WEBPACK_IMPORTED_MODULE_4___default.a.actionGroup,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(_ChatRoom_css__WEBPACK_IMPORTED_MODULE_4___default.a.actions, "dropup"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 190
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()("dropdown-toggle", "no-caret"),
        id: "room-actions",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather_dist_icons_paperclip__WEBPACK_IMPORTED_MODULE_9___default.a, {
        size: "18",
        color: "#FFFFFF",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 193
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()("dropdown-menu", "dropdown-menu-right"),
        "aria-labelledby": "room-actions",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 196
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "dropdown-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], _extends({}, messages.dropdownTitle, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        },
        __self: this
      }))), quickActions.map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "dropdown-item",
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 199
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: item.to,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 199
          },
          __self: this
        }, item.icon, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], _extends({}, item.label, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 199
          },
          __self: this
        }))));
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()("btn", this.state.message.length ? "btn-secondary" : "btn-primary"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 203
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], _extends({}, messages.send, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 204
        },
        __self: this
      }))))));
    }
  }]);

  return ChatRoom;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Object.defineProperty(ChatRoom, "contextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    client: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired // store: PropTypes.object.isRequired,

  }
});

var mapStateToProps = function mapStateToProps(state, props) {
  var _$find = lodash__WEBPACK_IMPORTED_MODULE_12___default.a.find(state.chat.rooms, {
    id: props.id
  }),
      messages = _$find.messages;

  return {
    conversation: messages
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_14__["connect"])(mapStateToProps, {
  addMessage: admin_actions_chat__WEBPACK_IMPORTED_MODULE_13__["addMessage"]
})(Object(react_intl__WEBPACK_IMPORTED_MODULE_1__["injectIntl"])(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3___default()(_ChatRoom_css__WEBPACK_IMPORTED_MODULE_4___default.a)(ChatRoom))));

/***/ }),

/***/ "./src/admin/components/Chat/ChatRoom/sendMessage.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"automated"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"cli_read"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"adv_read"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"created_at"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":167}};
    doc.loc.source = {"body":"mutation sendMessage($roomId: ID!, $body: String!) {\n    sendMessage(roomId: $roomId, body: $body) {\n\t\tid\n\t\tbody\n\t\tautomated\n\t\tcli_read\n\t\tadv_read\n\t\tcreated_at\n    }\n}","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

    // Collect any fragment/type references from a node, adding them to the refs Set
    function collectFragmentReferences(node, refs) {
      if (node.kind === "FragmentSpread") {
        refs.add(node.name.value);
      } else if (node.kind === "VariableDefinition") {
        var type = node.type;
        if (type.kind === "NamedType") {
          refs.add(type.name.value);
        }
      }

      if (node.selectionSet) {
        node.selectionSet.selections.forEach(function(selection) {
          collectFragmentReferences(selection, refs);
        });
      }

      if (node.variableDefinitions) {
        node.variableDefinitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }

      if (node.definitions) {
        node.definitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }
    }

    var definitionRefs = {};
    (function extractReferences() {
      doc.definitions.forEach(function(def) {
        if (def.name) {
          var refs = new Set();
          collectFragmentReferences(def, refs);
          definitionRefs[def.name.value] = refs;
        }
      });
    })();

    function findOperation(doc, name) {
      return doc.definitions.find(function(op) {
        return op.name ? op.name.value == name : false;
      });
    }

    function oneQuery(doc, operationName) {
      // Copy the DocumentNode, but clear out the definitions
      var newDoc = Object.assign({}, doc);

      var op = findOperation(doc, operationName);
      newDoc.definitions = [op];

      // Now, for the operation we're running, find any fragments referenced by
      // it or the fragments it references
      var opRefs = definitionRefs[operationName] || new Set();
      var allRefs = new Set();
      var newRefs = new Set(opRefs);
      while (newRefs.size > 0) {
        var prevRefs = newRefs;
        newRefs = new Set();

        prevRefs.forEach(function(refName) {
          if (!allRefs.has(refName)) {
            allRefs.add(refName);
            var childRefs = definitionRefs[refName] || new Set();
            childRefs.forEach(function(childRef) {
              newRefs.add(childRef);
            });
          }
        });
      }

      allRefs.forEach(function(refName) {
        var op = findOperation(doc, refName);
        if (op) {
          newDoc.definitions.push(op);
        }
      });

      return newDoc;
    }

    module.exports = doc;
    
        module.exports["sendMessage"] = oneQuery(doc, "sendMessage");
        


/***/ }),

/***/ "./src/admin/components/Chat/ChatRoom/subscribeNewMessage.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"automated"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"cli_read"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"adv_read"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"created_at"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"avatar_path"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sfid"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":224}};
    doc.loc.source = {"body":"subscription newMessage($roomId: ID!) {\n  newMessage(roomId: $roomId) {\n    id\n    body\n    automated\n    cli_read\n    adv_read\n    created_at\n    user {\n      id\n      avatar_path\n    }\n    customer {\n      sfid\n    }\n  }\n}","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

    // Collect any fragment/type references from a node, adding them to the refs Set
    function collectFragmentReferences(node, refs) {
      if (node.kind === "FragmentSpread") {
        refs.add(node.name.value);
      } else if (node.kind === "VariableDefinition") {
        var type = node.type;
        if (type.kind === "NamedType") {
          refs.add(type.name.value);
        }
      }

      if (node.selectionSet) {
        node.selectionSet.selections.forEach(function(selection) {
          collectFragmentReferences(selection, refs);
        });
      }

      if (node.variableDefinitions) {
        node.variableDefinitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }

      if (node.definitions) {
        node.definitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }
    }

    var definitionRefs = {};
    (function extractReferences() {
      doc.definitions.forEach(function(def) {
        if (def.name) {
          var refs = new Set();
          collectFragmentReferences(def, refs);
          definitionRefs[def.name.value] = refs;
        }
      });
    })();

    function findOperation(doc, name) {
      return doc.definitions.find(function(op) {
        return op.name ? op.name.value == name : false;
      });
    }

    function oneQuery(doc, operationName) {
      // Copy the DocumentNode, but clear out the definitions
      var newDoc = Object.assign({}, doc);

      var op = findOperation(doc, operationName);
      newDoc.definitions = [op];

      // Now, for the operation we're running, find any fragments referenced by
      // it or the fragments it references
      var opRefs = definitionRefs[operationName] || new Set();
      var allRefs = new Set();
      var newRefs = new Set(opRefs);
      while (newRefs.size > 0) {
        var prevRefs = newRefs;
        newRefs = new Set();

        prevRefs.forEach(function(refName) {
          if (!allRefs.has(refName)) {
            allRefs.add(refName);
            var childRefs = definitionRefs[refName] || new Set();
            childRefs.forEach(function(childRef) {
              newRefs.add(childRef);
            });
          }
        });
      }

      allRefs.forEach(function(refName) {
        var op = findOperation(doc, refName);
        if (op) {
          newDoc.definitions.push(op);
        }
      });

      return newDoc;
    }

    module.exports = doc;
    
        module.exports["newMessage"] = oneQuery(doc, "newMessage");
        


/***/ }),

/***/ "./src/admin/components/Chat/CurrentTalks/CurrentTalks.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/CurrentTalks/CurrentTalks.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/CurrentTalks/CurrentTalks.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/components/Chat/CurrentTalks/CurrentTalks.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/admin/components/Chat/CurrentTalks/CurrentTalks.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/admin/components/Chat/CurrentTalks/CurrentTalks.css");
/* harmony import */ var _CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/admin/components/Chat/gfx/avatar.png");
/* harmony import */ var _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_gfx_avatar_png__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/components/Chat/CurrentTalks/CurrentTalks.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }







 // import { toggleCurrentTalk } from '../../../../redux/actions/currentTalks';


var messages = Object(react_intl__WEBPACK_IMPORTED_MODULE_1__["defineMessages"])({
  conversations: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Conversations',
    description: 'currentTalks.container.header'
  }
});

var CurrentTalks =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CurrentTalks, _React$Component);

  function CurrentTalks() {
    var _this;

    _classCallCheck(this, CurrentTalks);

    _this = _possibleConstructorReturn(this, (CurrentTalks.__proto__ || Object.getPrototypeOf(CurrentTalks)).call(this));
    _this.toggleConversationsWidth = _this.toggleConversationsWidth.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CurrentTalks, [{
    key: "toggleConversationsWidth",
    value: function toggleConversationsWidth(e) {
      e.preventDefault(); // this.props.toggleCurrentTalk();

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var expanded = this.props.expanded;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a['container'], 'conversations', expanded ? _CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a.max : _CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a.min),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a['container-header'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: _CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a['header'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], _extends({}, messages.conversations, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      })), " ")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('talks-list', _CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a['current-talks']),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }, [1, 2, 3, 4].map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: index,
          className: _CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a['talk'],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 46
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: _CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a.user,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 47
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a['talk-avatar']),
          style: {
            backgroundImage: 'url(' + _gfx_avatar_png__WEBPACK_IMPORTED_MODULE_7___default.a + ') !important'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 48
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 50
          },
          __self: this
        }, "Ferreiro")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a.count, 'badge', 'badge-pill', 'badge-danger'),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 52
          },
          __self: this
        }, "2"));
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "resizable-handle",
        draggable: true,
        onMouseUp: this.toggleConversationsWidth,
        onDragStart: this.toggleConversationsWidth,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      }));
    }
  }]);

  return CurrentTalks;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    expanded: true
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps, null)(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_CurrentTalks_css__WEBPACK_IMPORTED_MODULE_3___default.a)(CurrentTalks)));

/***/ }),

/***/ "./src/admin/components/Chat/gfx/avatar.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/admin/components/Chat/gfx/avatar.png?97765f92";

/***/ }),

/***/ "./src/admin/routes/chat/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/admin/components/Layout/Layout.js");
/* harmony import */ var _components_Chat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/admin/components/Chat/Chat.js");
/* harmony import */ var _components_Chat_ChatRoom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/admin/components/Chat/ChatRoom/ChatRoom.js");
/* harmony import */ var admin_actions_chat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/admin/actions/chat.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("js-cookie");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/routes/chat/index.js";

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }








/* harmony default export */ __webpack_exports__["default"] = ({
  path: "/chat",
  name: "chat",
  rootNav: true,
  permission: "manage_chat",
  // Keep in mind, routes are evaluated in order
  children: [{
    path: "",
    name: "chat",
    nav: true,
    action: function () {
      var _action = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var store, route, client, rooms;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                store = _ref.store, route = _ref.route, client = _ref.client;
                console.log("passei aqui!"); // store.dispatch(setCurrentTalk((Cookies.get("chattalks-expanded") == "true")));

                _context.next = 4;
                return store.dispatch(Object(admin_actions_chat__WEBPACK_IMPORTED_MODULE_4__["getChatRooms"])());

              case 4:
                rooms = store.getState().chat.rooms;
                return _context.abrupt("return", {
                  title: "Chat",
                  chunk: "chatManager",
                  permission: "manage_chat",
                  component: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 42
                    },
                    __self: this
                  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Chat__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    isManager: true,
                    rooms: rooms,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 42
                    },
                    __self: this
                  }))
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function action(_x) {
        return _action.apply(this, arguments);
      };
    }()
  }, {
    // inside chat conversation
    path: "/:id",
    name: "conversation",
    nav: true,
    permission: "manage_chat",
    action: function () {
      var _action2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref2) {
        var store, params, route, _ref3, rooms, room;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                store = _ref2.store, params = _ref2.params, route = _ref2.route;
                _context2.next = 3;
                return store.getState().chat;

              case 3:
                _ref3 = _context2.sent;
                rooms = _ref3.rooms;
                console.log(rooms.length);

                if (rooms.length) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 9;
                return store.dispatch(Object(admin_actions_chat__WEBPACK_IMPORTED_MODULE_4__["getSingleChatRoom"])(params.id));

              case 9:
                _context2.next = 13;
                break;

              case 11:
                _context2.next = 13;
                return store.dispatch(Object(admin_actions_chat__WEBPACK_IMPORTED_MODULE_4__["getAllMessagesFromRoom"])(params.id));

              case 13:
                _context2.next = 15;
                return Object(lodash__WEBPACK_IMPORTED_MODULE_6__["find"])(store.getState().chat.rooms, {
                  id: params.id
                });

              case 15:
                room = _context2.sent;
                return _context2.abrupt("return", {
                  title: "Conversation",
                  chunk: "chatRoom",
                  component: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    route: route,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 77
                    },
                    __self: this
                  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Chat__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    currentRoute: route,
                    isManager: false,
                    room: room,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 77
                    },
                    __self: this
                  }))
                });

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function action(_x2) {
        return _action2.apply(this, arguments);
      };
    }()
  }],
  action: function () {
    var _action3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(_ref4) {
      var next, child;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              next = _ref4.next;
              _context3.next = 3;
              return next();

            case 3:
              child = _context3.sent;
              return _context3.abrupt("return", child);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function action(_x3) {
      return _action3.apply(this, arguments);
    };
  }()
});

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2FkbWluLWNoYXQuanMiLCJzb3VyY2VzIjpbIi9Wb2x1bWVzL0RBVEEvd29yay9sdW5hLXdlYi1zZXJ2ZXIvc3JjL2FkbWluL2NvbXBvbmVudHMvQ2hhdC9DaGF0LmNzcyIsIi9Wb2x1bWVzL0RBVEEvd29yay9sdW5hLXdlYi1zZXJ2ZXIvc3JjL2FkbWluL2NvbXBvbmVudHMvQ2hhdC9DaGF0SGlzdG9yeS9DaGF0SGlzdG9yeS5jc3MiLCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ2hhdEluc3BlY3Rvci9DaGF0SW5zcGVjdG9yLmNzcyIsIi9Wb2x1bWVzL0RBVEEvd29yay9sdW5hLXdlYi1zZXJ2ZXIvc3JjL2FkbWluL2NvbXBvbmVudHMvQ2hhdC9DaGF0Um9vbS9DaGF0TWVzc2FnZS9DaGF0TWVzc2FnZS5jc3MiLCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ2hhdFJvb20vQ2hhdFJvb20uY3NzIiwiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vY29tcG9uZW50cy9DaGF0L0N1cnJlbnRUYWxrcy9DdXJyZW50VGFsa3MuY3NzIiwiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vYWN0aW9ucy9jaGF0LmpzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ2hhdC5jc3M/NjY5ZiIsIi9Wb2x1bWVzL0RBVEEvd29yay9sdW5hLXdlYi1zZXJ2ZXIvc3JjL2FkbWluL2NvbXBvbmVudHMvQ2hhdC9DaGF0LmpzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ2hhdEhpc3RvcnkvQ2hhdEhpc3RvcnkuY3NzP2E4ZjUiLCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ2hhdEhpc3RvcnkvQ2hhdEhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2hhdC9DaGF0SW5zcGVjdG9yL0NoYXRJbnNwZWN0b3IuY3NzP2IwNjMiLCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ2hhdEluc3BlY3Rvci9DaGF0SW5zcGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ2hhdFJvb20vQ2hhdE1lc3NhZ2UvQ2hhdE1lc3NhZ2UuY3NzPzg3MWQiLCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ2hhdFJvb20vQ2hhdE1lc3NhZ2UvQ2hhdE1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2hhdC9DaGF0Um9vbS9DaGF0Um9vbS5jc3M/MzRmMSIsIi9Wb2x1bWVzL0RBVEEvd29yay9sdW5hLXdlYi1zZXJ2ZXIvc3JjL2FkbWluL2NvbXBvbmVudHMvQ2hhdC9DaGF0Um9vbS9DaGF0Um9vbS5qcyIsIi9Wb2x1bWVzL0RBVEEvd29yay9sdW5hLXdlYi1zZXJ2ZXIvc3JjL2FkbWluL2NvbXBvbmVudHMvQ2hhdC9DaGF0Um9vbS9zZW5kTWVzc2FnZS5ncmFwaHFsIiwiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vY29tcG9uZW50cy9DaGF0L0NoYXRSb29tL3N1YnNjcmliZU5ld01lc3NhZ2UuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvYWRtaW4vY29tcG9uZW50cy9DaGF0L0N1cnJlbnRUYWxrcy9DdXJyZW50VGFsa3MuY3NzPzZhZjkiLCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ3VycmVudFRhbGtzL0N1cnJlbnRUYWxrcy5qcyIsIi9Wb2x1bWVzL0RBVEEvd29yay9sdW5hLXdlYi1zZXJ2ZXIvc3JjL2FkbWluL2NvbXBvbmVudHMvQ2hhdC9nZngvYXZhdGFyLnBuZyIsIi9Wb2x1bWVzL0RBVEEvd29yay9sdW5hLXdlYi1zZXJ2ZXIvc3JjL2FkbWluL3JvdXRlcy9jaGF0L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG4uQ2hhdC1jb250YWluZXItMVcwb1d7XFxuXFx0LW1zLWZsZXg6IDEgMSAxMDAlO1xcblxcdCAgICBmbGV4OiAxIDEgMTAwJTtcXG5cXHRwYWRkaW5nOiAwcHg7XFxufVxcblxcbi5DaGF0LWJvZHktd3JhcHBlci0zNm5ZOSB7XFxuXFx0LW1zLWZsZXg6IDIgMSAwJTtcXG5cXHQgICAgZmxleDogMiAxIDAlO1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vY29tcG9uZW50cy9DaGF0L0NoYXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7O0FBRUE7Q0FDQyxtQkFBbUI7S0FDZixlQUFlO0NBQ25CLGFBQWE7Q0FDYjs7QUFFRDtDQUNDLGlCQUFpQjtLQUNiLGFBQWE7SUFDZCxxQkFBcUI7SUFDckIsY0FBYztJQUNkLDJCQUEyQjtRQUN2Qix1QkFBdUI7Q0FDOUJcIixcImZpbGVcIjpcIkNoYXQuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcblxcbi5jb250YWluZXJ7XFxuXFx0LW1zLWZsZXg6IDEgMSAxMDAlO1xcblxcdCAgICBmbGV4OiAxIDEgMTAwJTtcXG5cXHRwYWRkaW5nOiAwcHg7XFxufVxcblxcbi5ib2R5LXdyYXBwZXIge1xcblxcdC1tcy1mbGV4OiAyIDEgMCU7XFxuXFx0ICAgIGZsZXg6IDIgMSAwJTtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcImNvbnRhaW5lclwiOiBcIkNoYXQtY29udGFpbmVyLTFXMG9XXCIsXG5cdFwiYm9keS13cmFwcGVyXCI6IFwiQ2hhdC1ib2R5LXdyYXBwZXItMzZuWTlcIlxufTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLkNoYXRIaXN0b3J5LW1haW4tY29udGFpbmVyLTNDZ24te1xcbiAgICAtbXMtZmxleDogMiAxIGF1dG87XFxuICAgICAgICBmbGV4OiAyIDEgYXV0bztcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5DaGF0SGlzdG9yeS1jb250ZW50LTF3Rk1Fe1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIC1tcy1mbGV4OiAyIDEgMCU7XFxuICAgICAgICBmbGV4OiAyIDEgMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuLkNoYXRIaXN0b3J5LWNoYXQtYXZhdGFyLTJsWDNme1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4uQ2hhdEhpc3RvcnktY2hhdC1jb2xvci0zVXZUeSB7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogMjRweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG4uQ2hhdEhpc3RvcnktdGFibGUtX3Exd3Qge1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICAgIC1tcy1mbGV4OiAyIDEgYXV0bztcXG4gICAgICAgIGZsZXg6IDIgMSBhdXRvO1xcbiAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5DaGF0SGlzdG9yeS10YWJsZS1fcTF3dCB0aGVhZCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZDogIzFCMzE0MztcXG59XFxuLkNoYXRIaXN0b3J5LXRhYmxlLV9xMXd0IHRib2R5IHtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcbi5DaGF0SGlzdG9yeS10YWJsZS1fcTF3dCB0aGVhZCB0aCB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgY29sb3I6ICNiMmI5YzQ7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG59XFxuLkNoYXRIaXN0b3J5LXRhYmxlLV9xMXd0IHRoZWFkIHRyLFxcbi5DaGF0SGlzdG9yeS10YWJsZS1fcTF3dCB0Ym9keSB0ciB7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAxcHggMCAwICMzMTNENEY7XFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMCAxcHggMCAwICMzMTNENEY7XFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuLkNoYXRIaXN0b3J5LXRhYmxlLV9xMXd0IHRoZWFkIHRyIHtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDJweCAwIDAgIzMxM0Q0RjtcXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIDJweCAwIDAgIzMxM0Q0RjtcXG59XFxuLkNoYXRIaXN0b3J5LXRhYmxlLV9xMXd0IHRkIHtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxudGQge1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcbi5DaGF0SGlzdG9yeS10YWJsZS1hdmF0YXItM3JOSUd7XFxufVxcbnRyLkNoYXRIaXN0b3J5LWFjdGl2ZS0zQVRBSHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGNTMwMDtcXG59XFxuLkNoYXRIaXN0b3J5LXRhYmxlLV9xMXd0IHRib2R5ID4gdHI6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkY1MzAwO1xcbn1cXG4uQ2hhdEhpc3RvcnktdGFibGUtX3Exd3QgdGJvZHkgdGQsXFxuLkNoYXRIaXN0b3J5LXRhYmxlLV9xMXd0IHRoZWFkIHRoIHtcXG4gICAgcGFkZGluZzogMCAxMHB4O1xcbn1cXG4uQ2hhdEhpc3RvcnktdGFibGUtX3Exd3QgdGJvZHkgdGQge1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XFxuICAgIG1heC1oZWlnaHQ6IDUwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgLW8tdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbn1cXG4uQ2hhdEhpc3RvcnktdGFibGUtX3Exd3QgLkNoYXRIaXN0b3J5LWNvbG9yLTJsam9wIHtcXG4gICAgbWluLXdpZHRoOiAxNXB4O1xcbiAgICB3aWR0aDogMTVweDtcXG4gICAgbWF4LXdpZHRoOiAxNXB4O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG4uQ2hhdEhpc3RvcnktdGFibGUtX3Exd3QgLkNoYXRIaXN0b3J5LWF2YXRhci0yYzF2aiB7XFxuICAgIG1pbi13aWR0aDogNTBweDtcXG4gICAgd2lkdGg6IDUwcHg7XFxuICAgIG1heC13aWR0aDogNTBweDtcXG59XFxuLkNoYXRIaXN0b3J5LXRhYmxlLV9xMXd0IHRkLkNoYXRIaXN0b3J5LXVzZXItMkRIU08ge1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbn1cXG4uQ2hhdEhpc3RvcnktdGFibGUtX3Exd3QgLkNoYXRIaXN0b3J5LXVzZXItMkRIU08ge1xcbiAgICBtaW4td2lkdGg6IDEyMHB4O1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIG1heC13aWR0aDogMTIwcHg7XFxufVxcbi5DaGF0SGlzdG9yeS10YWJsZS1fcTF3dCAuQ2hhdEhpc3RvcnktbGFzdG1zZy0xQThkSyB7XFxuICAgIG1pbi13aWR0aDogMzUlO1xcbiAgICB3aWR0aDogMzUlO1xcbiAgICBtYXgtd2lkdGg6IDM1JTtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDY3MnB4KSB7XFxuICAgIC5DaGF0SGlzdG9yeS10YWJsZS1fcTF3dCAuQ2hhdEhpc3RvcnktbGFzdG1zZy0xQThkSyB7XFxuICAgICAgICBtaW4td2lkdGg6IGF1dG87XFxuICAgICAgICB3aWR0aDogYXV0bztcXG4gICAgICAgIG1heC13aWR0aDogYXV0bztcXG4gICAgfVxcbn1cXG4uQ2hhdEhpc3RvcnktY2xpY2thYmxlLTJRaHN2IHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uQ2hhdEhpc3RvcnktdGFibGUtX3Exd3QgLkNoYXRIaXN0b3J5LWNvdW50LTJSN2t2IHtcXG4gICAgbWluLXdpZHRoOiAxMjBweDtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBtYXgtd2lkdGg6IDEyMHB4O1xcbn1cXG4uQ2hhdEhpc3RvcnktdGFibGUtX3Exd3QgLkNoYXRIaXN0b3J5LWNvdW50cnktM1BUN3Age1xcbiAgICBtaW4td2lkdGg6IDE2MHB4O1xcbiAgICB3aWR0aDogMTYwcHg7XFxuICAgIG1heC13aWR0aDogMTYwcHg7XFxufVxcbi5DaGF0SGlzdG9yeS10YWJsZS1fcTF3dCAuQ2hhdEhpc3RvcnktY291bnRyeS0zUFQ3cCAuZmFtZmFtZmFtLWZsYWdzIHtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgICB9XFxuLkNoYXRIaXN0b3J5LXRhYmxlLV9xMXd0IC5DaGF0SGlzdG9yeS1kZXZpY2UtVGtGY0Ege1xcbiAgICBtaW4td2lkdGg6IDEyMHB4O1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIG1heC13aWR0aDogMTIwcHg7XFxufVxcbi5DaGF0SGlzdG9yeS1jdXJyZW50LTNHQ2hWIHtcXG4gICAgY29sb3I6ICMyRUEyRjggIWltcG9ydGFudDtcXG59XFxuLkNoYXRIaXN0b3J5LXRhYmxlLV9xMXd0IC5DaGF0SGlzdG9yeS10aW1lYWdvLTJpOEp3IHtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHRcXG59XFxuLkNoYXRIaXN0b3J5LXRhYmxlLV9xMXd0IC5DaGF0SGlzdG9yeS10aW1lYWdvLTJpOEp3LkNoYXRIaXN0b3J5LWFzYy1tUF9XcCBzcGFuOmFmdGVyIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICAgICAgd2lkdGg6IDA7XFxuICAgICAgICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwLjNlbTtcXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuM2VtIHNvbGlkO1xcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMC4zZW0gc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDAuM2VtIHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG4uQ2hhdEhpc3RvcnktdGFibGUtX3Exd3QgLkNoYXRIaXN0b3J5LXRpbWVhZ28tMmk4SncuQ2hhdEhpc3RvcnktZGVzYy0xd2NCUyBzcGFuOmFmdGVyIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICAgICAgd2lkdGg6IDA7XFxuICAgICAgICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwLjNlbTtcXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDAuM2VtIHNvbGlkO1xcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMC4zZW0gc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDAuM2VtIHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vY29tcG9uZW50cy9DaGF0L0NoYXRIaXN0b3J5L0NoYXRIaXN0b3J5LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQ0E7SUFDSSxtQkFBbUI7UUFDZixlQUFlO0lBQ25CLHFCQUFxQjtJQUNyQixjQUFjO0NBQ2pCO0FBQ0Q7SUFDSSxhQUFhO0lBQ2IsaUJBQWlCO1FBQ2IsYUFBYTtJQUNqQixZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLGNBQWM7Q0FDakI7QUFDRDtJQUNJLFlBQVk7SUFDWixtQkFBbUI7Q0FDdEI7QUFDRDtJQUNJLFdBQVc7SUFDWCxhQUFhO0lBQ2IsbUJBQW1CO0NBQ3RCO0FBQ0Q7SUFDSSxxQkFBcUI7SUFDckIsY0FBYztJQUNkLFlBQVk7SUFDWixvQkFBb0I7SUFDcEIsMEJBQTBCO0lBQzFCLG1CQUFtQjtRQUNmLGVBQWU7SUFDbkIsMkJBQTJCO1FBQ3ZCLHVCQUF1QjtDQUM5QjtBQUNEO0lBQ0ksZUFBZTtJQUNmLFlBQVk7SUFDWixvQkFBb0I7Q0FDdkI7QUFDRDtJQUNJLHFCQUFxQjtJQUNyQixjQUFjO0lBQ2QsWUFBWTtJQUNaLGFBQWE7SUFDYiwyQkFBMkI7UUFDdkIsdUJBQXVCO0lBQzNCLGVBQWU7Q0FDbEI7QUFDRDtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsaUJBQWlCO0NBQ3BCO0FBQ0Q7O0lBRUksc0NBQXNDO1lBQzlCLDhCQUE4QjtJQUN0QyxlQUFlO0lBQ2YsWUFBWTtDQUNmO0FBQ0Q7SUFDSSxzQ0FBc0M7WUFDOUIsOEJBQThCO0NBQ3pDO0FBQ0Q7SUFDSSx1QkFBdUI7SUFDdkIsaUJBQWlCO0NBQ3BCO0FBQ0Q7SUFDSSxnQkFBZ0I7Q0FDbkI7QUFDRDtDQUNDO0FBQ0Q7SUFDSSwwQkFBMEI7Q0FDN0I7QUFDRDtJQUNJLDBCQUEwQjtDQUM3QjtBQUNEOztJQUVJLGdCQUFnQjtDQUNuQjtBQUNEO0lBQ0ksZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQiwyQkFBMkI7T0FDeEIsd0JBQXdCO0NBQzlCO0FBQ0Q7SUFDSSxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQix1QkFBdUI7Q0FDMUI7QUFDRDtJQUNJLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osZ0JBQWdCO0NBQ25CO0FBQ0Q7SUFDSSxpQkFBaUI7Q0FDcEI7QUFDRDtJQUNJLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsaUJBQWlCO0NBQ3BCO0FBQ0Q7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLGVBQWU7Q0FDbEI7QUFDRDtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixnQkFBZ0I7S0FDbkI7Q0FDSjtBQUNEO0lBQ0ksZ0JBQWdCO0NBQ25CO0FBQ0Q7SUFDSSxpQkFBaUI7SUFDakIsYUFBYTtJQUNiLGlCQUFpQjtDQUNwQjtBQUNEO0lBQ0ksaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixpQkFBaUI7Q0FDcEI7QUFDRDtRQUNRLHNCQUFzQjtRQUN0QixrQkFBa0I7S0FDckI7QUFDTDtJQUNJLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsaUJBQWlCO0NBQ3BCO0FBQ0Q7SUFDSSwwQkFBMEI7Q0FDN0I7QUFDRDtJQUNJLGlCQUFpQjtDQUNwQjtBQUNEO1lBQ1ksc0JBQXNCO1lBQ3RCLFNBQVM7WUFDVCxVQUFVO1lBQ1YsbUJBQW1CO1lBQ25CLHVCQUF1QjtZQUN2QixZQUFZO1lBQ1osMkJBQTJCO1lBQzNCLHNDQUFzQztZQUN0QyxxQ0FBcUM7Q0FDaEQ7QUFDRDtZQUNZLHNCQUFzQjtZQUN0QixTQUFTO1lBQ1QsVUFBVTtZQUNWLG1CQUFtQjtZQUNuQix1QkFBdUI7WUFDdkIsWUFBWTtZQUNaLHdCQUF3QjtZQUN4QixzQ0FBc0M7WUFDdEMscUNBQXFDO0NBQ2hEXCIsXCJmaWxlXCI6XCJDaGF0SGlzdG9yeS5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiXFxuLm1haW4tY29udGFpbmVye1xcbiAgICAtbXMtZmxleDogMiAxIGF1dG87XFxuICAgICAgICBmbGV4OiAyIDEgYXV0bztcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5jb250ZW50e1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIC1tcy1mbGV4OiAyIDEgMCU7XFxuICAgICAgICBmbGV4OiAyIDEgMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuLmNoYXQtYXZhdGFye1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4uY2hhdC1jb2xvciB7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogMjRweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG4udGFibGUge1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICAgIC1tcy1mbGV4OiAyIDEgYXV0bztcXG4gICAgICAgIGZsZXg6IDIgMSBhdXRvO1xcbiAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi50YWJsZSB0aGVhZCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZDogIzFCMzE0MztcXG59XFxuLnRhYmxlIHRib2R5IHtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcbi50YWJsZSB0aGVhZCB0aCB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgY29sb3I6ICNiMmI5YzQ7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG59XFxuLnRhYmxlIHRoZWFkIHRyLFxcbi50YWJsZSB0Ym9keSB0ciB7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAxcHggMCAwICMzMTNENEY7XFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMCAxcHggMCAwICMzMTNENEY7XFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuLnRhYmxlIHRoZWFkIHRyIHtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDJweCAwIDAgIzMxM0Q0RjtcXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIDJweCAwIDAgIzMxM0Q0RjtcXG59XFxuLnRhYmxlIHRkIHtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxudGQge1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcbi50YWJsZS1hdmF0YXJ7XFxufVxcbnRyLmFjdGl2ZXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGNTMwMDtcXG59XFxuLnRhYmxlIHRib2R5ID4gdHI6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkY1MzAwO1xcbn1cXG4udGFibGUgdGJvZHkgdGQsXFxuLnRhYmxlIHRoZWFkIHRoIHtcXG4gICAgcGFkZGluZzogMCAxMHB4O1xcbn1cXG4udGFibGUgdGJvZHkgdGQge1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XFxuICAgIG1heC1oZWlnaHQ6IDUwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgLW8tdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbn1cXG4udGFibGUgLmNvbG9yIHtcXG4gICAgbWluLXdpZHRoOiAxNXB4O1xcbiAgICB3aWR0aDogMTVweDtcXG4gICAgbWF4LXdpZHRoOiAxNXB4O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG4udGFibGUgLmF2YXRhciB7XFxuICAgIG1pbi13aWR0aDogNTBweDtcXG4gICAgd2lkdGg6IDUwcHg7XFxuICAgIG1heC13aWR0aDogNTBweDtcXG59XFxuLnRhYmxlIHRkLnVzZXIge1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbn1cXG4udGFibGUgLnVzZXIge1xcbiAgICBtaW4td2lkdGg6IDEyMHB4O1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIG1heC13aWR0aDogMTIwcHg7XFxufVxcbi50YWJsZSAubGFzdG1zZyB7XFxuICAgIG1pbi13aWR0aDogMzUlO1xcbiAgICB3aWR0aDogMzUlO1xcbiAgICBtYXgtd2lkdGg6IDM1JTtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDY3MnB4KSB7XFxuICAgIC50YWJsZSAubGFzdG1zZyB7XFxuICAgICAgICBtaW4td2lkdGg6IGF1dG87XFxuICAgICAgICB3aWR0aDogYXV0bztcXG4gICAgICAgIG1heC13aWR0aDogYXV0bztcXG4gICAgfVxcbn1cXG4uY2xpY2thYmxlIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4udGFibGUgLmNvdW50IHtcXG4gICAgbWluLXdpZHRoOiAxMjBweDtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBtYXgtd2lkdGg6IDEyMHB4O1xcbn1cXG4udGFibGUgLmNvdW50cnkge1xcbiAgICBtaW4td2lkdGg6IDE2MHB4O1xcbiAgICB3aWR0aDogMTYwcHg7XFxuICAgIG1heC13aWR0aDogMTYwcHg7XFxufVxcbi50YWJsZSAuY291bnRyeSA6Z2xvYmFsKC5mYW1mYW1mYW0tZmxhZ3MpIHtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgICB9XFxuLnRhYmxlIC5kZXZpY2Uge1xcbiAgICBtaW4td2lkdGg6IDEyMHB4O1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIG1heC13aWR0aDogMTIwcHg7XFxufVxcbi5jdXJyZW50IHtcXG4gICAgY29sb3I6ICMyRUEyRjggIWltcG9ydGFudDtcXG59XFxuLnRhYmxlIC50aW1lYWdvIHtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHRcXG59XFxuLnRhYmxlIC50aW1lYWdvLmFzYyBzcGFuOmFmdGVyIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICAgICAgd2lkdGg6IDA7XFxuICAgICAgICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwLjNlbTtcXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAuM2VtIHNvbGlkO1xcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMC4zZW0gc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDAuM2VtIHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG4udGFibGUgLnRpbWVhZ28uZGVzYyBzcGFuOmFmdGVyIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICAgICAgd2lkdGg6IDA7XFxuICAgICAgICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwLjNlbTtcXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDAuM2VtIHNvbGlkO1xcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMC4zZW0gc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDAuM2VtIHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG5cXG5cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwibWFpbi1jb250YWluZXJcIjogXCJDaGF0SGlzdG9yeS1tYWluLWNvbnRhaW5lci0zQ2duLVwiLFxuXHRcImNvbnRlbnRcIjogXCJDaGF0SGlzdG9yeS1jb250ZW50LTF3Rk1FXCIsXG5cdFwiY2hhdC1hdmF0YXJcIjogXCJDaGF0SGlzdG9yeS1jaGF0LWF2YXRhci0ybFgzZlwiLFxuXHRcImNoYXQtY29sb3JcIjogXCJDaGF0SGlzdG9yeS1jaGF0LWNvbG9yLTNVdlR5XCIsXG5cdFwidGFibGVcIjogXCJDaGF0SGlzdG9yeS10YWJsZS1fcTF3dFwiLFxuXHRcInRhYmxlLWF2YXRhclwiOiBcIkNoYXRIaXN0b3J5LXRhYmxlLWF2YXRhci0zck5JR1wiLFxuXHRcImFjdGl2ZVwiOiBcIkNoYXRIaXN0b3J5LWFjdGl2ZS0zQVRBSFwiLFxuXHRcImNvbG9yXCI6IFwiQ2hhdEhpc3RvcnktY29sb3ItMmxqb3BcIixcblx0XCJhdmF0YXJcIjogXCJDaGF0SGlzdG9yeS1hdmF0YXItMmMxdmpcIixcblx0XCJ1c2VyXCI6IFwiQ2hhdEhpc3RvcnktdXNlci0yREhTT1wiLFxuXHRcImxhc3Rtc2dcIjogXCJDaGF0SGlzdG9yeS1sYXN0bXNnLTFBOGRLXCIsXG5cdFwiY2xpY2thYmxlXCI6IFwiQ2hhdEhpc3RvcnktY2xpY2thYmxlLTJRaHN2XCIsXG5cdFwiY291bnRcIjogXCJDaGF0SGlzdG9yeS1jb3VudC0yUjdrdlwiLFxuXHRcImNvdW50cnlcIjogXCJDaGF0SGlzdG9yeS1jb3VudHJ5LTNQVDdwXCIsXG5cdFwiZGV2aWNlXCI6IFwiQ2hhdEhpc3RvcnktZGV2aWNlLVRrRmNBXCIsXG5cdFwiY3VycmVudFwiOiBcIkNoYXRIaXN0b3J5LWN1cnJlbnQtM0dDaFZcIixcblx0XCJ0aW1lYWdvXCI6IFwiQ2hhdEhpc3RvcnktdGltZWFnby0yaThKd1wiLFxuXHRcImFzY1wiOiBcIkNoYXRIaXN0b3J5LWFzYy1tUF9XcFwiLFxuXHRcImRlc2NcIjogXCJDaGF0SGlzdG9yeS1kZXNjLTF3Y0JTXCJcbn07IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLWNvbnRhaW5lci1oZWFkZXItRWNkMkwge1xcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gICAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG4gICAgfVxcblxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLWNvbnRhaW5lci1oZWFkZXItRWNkMkwgLkNoYXRJbnNwZWN0b3ItYWN0aW9ucy0zbk9waSB7XFxuICAgICAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIC1tcy1mbGV4OiAxIDEgMCU7XFxuICAgICAgICAgICAgICAgIGZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuQ2hhdEluc3BlY3Rvci1pbnNwZWN0b3ItM0lBcUEgLkNoYXRJbnNwZWN0b3ItY29udGFpbmVyLWhlYWRlci1FY2QyTCAuQ2hhdEluc3BlY3Rvci1hY3Rpb25zLTNuT3BpIGEge1xcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICAgICAgLW1zLWZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICAgICAgICAgIGZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICAgICAgfVxcblxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLWNvbnRhaW5lci1oZWFkZXItRWNkMkwgLkNoYXRJbnNwZWN0b3ItdGFibGUtYXZhdGFyLTFtOGMxIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICAgIC1tcy1mbGV4OiAxIDEgMCU7XFxuICAgICAgICAgICAgICAgIGZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLWNvbnRhaW5lci1oZWFkZXItRWNkMkwgLkNoYXRJbnNwZWN0b3ItdGFibGUtYXZhdGFyLTFtOGMxIC5DaGF0SW5zcGVjdG9yLWNoYXQtYXZhdGFyLTJBRHF1e1xcbiAgICAgICAgICAgICAgICB3aWR0aDogMzBweDtcXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICAgICAgICAgIH1cXG5cXG4gICAgICAgIC5DaGF0SW5zcGVjdG9yLWluc3BlY3Rvci0zSUFxQSAuQ2hhdEluc3BlY3Rvci1jb250YWluZXItaGVhZGVyLUVjZDJMIC5DaGF0SW5zcGVjdG9yLXRhYmxlLWF2YXRhci0xbThjMSAuQ2hhdEluc3BlY3Rvci1jaGF0LWNvbG9yLTNNcC1ze1xcbiAgICAgICAgICAgICAgICB3aWR0aDogOHB4O1xcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDI0cHg7XFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNEQkZGMEU7XFxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcXG4gICAgICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgICAgICAgfVxcblxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLXVzZXJuYW1lLTJiZWQyIHtcXG4gICAgICAgIC1tcy1mbGV4OiAyIDEgMTAwJTtcXG4gICAgICAgICAgICBmbGV4OiAyIDEgMTAwJTtcXG4gICAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICBtYXJnaW4tbGVmdDogMTVweDtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgICB9XFxuXFxuICAgICAgICAuQ2hhdEluc3BlY3Rvci1pbnNwZWN0b3ItM0lBcUEgLkNoYXRJbnNwZWN0b3ItdXNlcm5hbWUtMmJlZDIgaDMge1xcbiAgICAgICAgICAgIG1hcmdpbjogMDtcXG4gICAgICAgICAgICBjb2xvcjogI0ZGRjtcXG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuQ2hhdEluc3BlY3Rvci1pbnNwZWN0b3ItM0lBcUEgLkNoYXRJbnNwZWN0b3ItdXNlcm5hbWUtMmJlZDIgc3BhbiB7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgICAgICAgIGNvbG9yOiAjQThBQUI3O1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLWNvbnRhaW5lci1jb250ZW50LTE5OHVHIGxhYmVsIHtcXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDEwMDtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5DaGF0SW5zcGVjdG9yLWluc3BlY3Rvci0zSUFxQSAuQ2hhdEluc3BlY3Rvci1jb250YWluZXItY29udGVudC0xOTh1RyBzcGFuIHtcXG4gICAgICAgICAgICAtbXMtZmxleDogMSAxIDAlO1xcbiAgICAgICAgICAgICAgICBmbGV4OiAxIDEgMCU7XFxuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICAgICAgICAgICAgLW1zLWZsZXgtYWxpZ246IGVuZDtcXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgICAgICAgICAgIGNvbG9yOiAjQjdCOUM0O1xcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5DaGF0SW5zcGVjdG9yLWluc3BlY3Rvci0zSUFxQSAuQ2hhdEluc3BlY3Rvci1jb250YWluZXItY29udGVudC0xOTh1RyAuQ2hhdEluc3BlY3Rvci1hdHRhY2htZW50cy1saXN0LTM0WjJfIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLWNvbnRhaW5lci1jb250ZW50LTE5OHVHIC5DaGF0SW5zcGVjdG9yLWF0dGFjaG1lbnRzLWxpc3QtMzRaMl8gLkNoYXRJbnNwZWN0b3ItYXR0YWNobWVudC1pdGVtLTFzZ3AxIHtcXG4gICAgICAgICAgICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICAgICAgICAtbXMtZmxleDogMSAxIDAlO1xcbiAgICAgICAgICAgICAgICAgICAgZmxleDogMSAxIDAlO1xcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgICAgICAgICAgfVxcblxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLWNvbnRhaW5lci1jb250ZW50LTE5OHVHIC5DaGF0SW5zcGVjdG9yLWF0dGFjaG1lbnRzLWxpc3QtMzRaMl8gLkNoYXRJbnNwZWN0b3ItYXR0YWNobWVudC1pdGVtLTFzZ3AxIC5DaGF0SW5zcGVjdG9yLWV4dGVuc2lvbi1pdGVtLTJIRWdfIHtcXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMnB4O1xcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgICAgICB9XFxuXFxuICAgICAgICAuQ2hhdEluc3BlY3Rvci1pbnNwZWN0b3ItM0lBcUEgLkNoYXRJbnNwZWN0b3ItY29udGFpbmVyLWNvbnRlbnQtMTk4dUcgLkNoYXRJbnNwZWN0b3ItYXR0YWNobWVudHMtbGlzdC0zNFoyXyAuQ2hhdEluc3BlY3Rvci1hdHRhY2htZW50LWl0ZW0tMXNncDEgLkNoYXRJbnNwZWN0b3Itc2l6ZS1pdGVtLTFEelIwIHtcXG4gICAgICAgICAgICAgICAgICAgIC1tcy1mbGV4OiAyIDEgMCU7XFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogMiAxIDAlO1xcbiAgICAgICAgICAgICAgICAgICAgLW1zLWZsZXgtcGFjazogZW5kO1xcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDA7XFxuICAgICAgICAgICAgICAgIH1cXG5cXG4gICAgICAgIC5DaGF0SW5zcGVjdG9yLWluc3BlY3Rvci0zSUFxQSAuQ2hhdEluc3BlY3Rvci1jb250YWluZXItY29udGVudC0xOTh1RyAuQ2hhdEluc3BlY3Rvci1hdHRhY2htZW50cy1saXN0LTM0WjJfIC5DaGF0SW5zcGVjdG9yLWF0dGFjaG1lbnQtaXRlbS0xc2dwMSAuQ2hhdEluc3BlY3Rvci1kYXRlLWl0ZW0tMmVnSEoge1xcbiAgICAgICAgICAgICAgICAgICAgLW1zLWZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAxIDEgMCU7XFxuICAgICAgICAgICAgICAgICAgICAtbXMtZmxleC1wYWNrOiBlbmQ7XFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgICAgICAgICAgICAgfVxcblxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLWNvbnRhaW5lci1jb250ZW50LTE5OHVHIC5DaGF0SW5zcGVjdG9yLWluZm8tbGluZS0zNGlGSCB7XFxuICAgICAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgICAgICAgICAgLW1zLWZsZXgtYWxpZ246IGVuZDtcXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5DaGF0SW5zcGVjdG9yLWluc3BlY3Rvci0zSUFxQSAuQ2hhdEluc3BlY3Rvci1jb250YWluZXItY29udGVudC0xOTh1RyAuQ2hhdEluc3BlY3Rvci1pbmZvLWxpbmUtMzRpRkggc3BhbiB7XFxuICAgICAgICAgICAgICAgIC1tcy1mbGV4OiAxIDEgMCU7XFxuICAgICAgICAgICAgICAgICAgICBmbGV4OiAxIDEgMCU7XFxuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICAgICAgICAgICAgICAtbXMtZmxleC1hbGlnbjogZW5kO1xcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgICAgICAgICAgIH1cXG5cXG4gICAgICAgIC5DaGF0SW5zcGVjdG9yLWluc3BlY3Rvci0zSUFxQSAuQ2hhdEluc3BlY3Rvci1jb250YWluZXItY29udGVudC0xOTh1RyAuQ2hhdEluc3BlY3Rvci1pbmZvLWxpbmUtMzRpRkggLkNoYXRJbnNwZWN0b3ItZmxhZy0zeDlQbyB7XFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxuICAgICAgICAgICAgfVxcblxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLWNvbnRhaW5lci1jb250ZW50LTE5OHVHIC5DaGF0SW5zcGVjdG9yLWluZm8tbGluZS0zNGlGSCAqIHtcXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMDtcXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwO1xcbiAgICAgICAgICAgIH1cXG5cXG4gICAgICAgIC5DaGF0SW5zcGVjdG9yLWluc3BlY3Rvci0zSUFxQSAuQ2hhdEluc3BlY3Rvci1jb250YWluZXItY29udGVudC0xOTh1RyAuQ2hhdEluc3BlY3Rvci1pbmZvLTF4N0VaLFxcbiAgICAgICAgLkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBIC5DaGF0SW5zcGVjdG9yLWNvbnRhaW5lci1jb250ZW50LTE5OHVHIC5DaGF0SW5zcGVjdG9yLW5vdGVzLTNEY0F6IHtcXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICAgICAgfVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ2hhdEluc3BlY3Rvci9DaGF0SW5zcGVjdG9yLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiOztRQUVRO1FBQ0EscUJBQXFCO1FBQ3JCLGNBQWM7UUFDZCxvQkFBb0I7UUFDcEIsdUJBQXVCO1lBQ25CLG9CQUFvQjs7S0FFM0I7O1FBRUc7WUFDSSx1QkFBdUI7Z0JBQ25CLG9CQUFvQjtZQUN4QixxQkFBcUI7WUFDckIsY0FBYztZQUNkLGlCQUFpQjtnQkFDYixhQUFhO1lBQ2pCLG1CQUFtQjtTQUN0Qjs7UUFFRDtnQkFDUSxxQkFBcUI7Z0JBQ3JCLGNBQWM7Z0JBQ2QsaUJBQWlCO29CQUNiLGFBQWE7Z0JBQ2pCLHVCQUF1QjtvQkFDbkIsb0JBQW9CO2FBQzNCOztRQUVMO1lBQ0kscUJBQXFCO1lBQ3JCLGNBQWM7WUFDZCx3QkFBd0I7Z0JBQ3BCLG9CQUFvQjtZQUN4QixpQkFBaUI7Z0JBQ2IsYUFBYTtZQUNqQix1QkFBdUI7Z0JBQ25CLG9CQUFvQjtTQUMzQjs7UUFFRDtnQkFDUSxZQUFZO2dCQUNaLG1CQUFtQjtnQkFDbkIsYUFBYTtnQkFDYix3QkFBd0I7YUFDM0I7O1FBRUw7Z0JBQ1EsV0FBVztnQkFDWCxhQUFhO2dCQUNiLDBCQUEwQjtnQkFDMUIsb0JBQW9CO2dCQUNwQixtQkFBbUI7Z0JBQ25CLFlBQVk7YUFDZjs7UUFFTDtRQUNBLG1CQUFtQjtZQUNmLGVBQWU7UUFDbkIscUJBQXFCO1FBQ3JCLGNBQWM7UUFDZCwyQkFBMkI7WUFDdkIsdUJBQXVCO1FBQzNCLGtCQUFrQjtRQUNsQixrQkFBa0I7S0FDckI7O1FBRUc7WUFDSSxVQUFVO1lBQ1YsWUFBWTtZQUNaLGdCQUFnQjtTQUNuQjs7UUFFRDtZQUNJLGdCQUFnQjtZQUNoQixlQUFlO1NBQ2xCOztRQUVEO1lBQ0ksWUFBWTtZQUNaLGdCQUFnQjtZQUNoQixpQkFBaUI7U0FDcEI7O1FBRUQ7WUFDSSxpQkFBaUI7Z0JBQ2IsYUFBYTtZQUNqQixrQkFBa0I7WUFDbEIsb0JBQW9CO2dCQUNoQixzQkFBc0I7WUFDMUIsZUFBZTtZQUNmLGdCQUFnQjtTQUNuQjs7UUFFRDtZQUNJLHFCQUFxQjtZQUNyQixjQUFjO1lBQ2QsMkJBQTJCO2dCQUN2Qix1QkFBdUI7U0FDOUI7O1FBRUQ7Z0JBQ1Esd0JBQXdCO29CQUNwQixvQkFBb0I7Z0JBQ3hCLGlCQUFpQjtvQkFDYixhQUFhO2dCQUNqQixxQkFBcUI7Z0JBQ3JCLGNBQWM7Z0JBQ2QsdUJBQXVCO29CQUNuQixvQkFBb0I7Z0JBQ3hCLG9CQUFvQjthQUN2Qjs7UUFFTDtvQkFDWSxZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIscUJBQXFCO29CQUNyQixjQUFjO2lCQUNqQjs7UUFFVDtvQkFDWSxpQkFBaUI7d0JBQ2IsYUFBYTtvQkFDakIsbUJBQW1CO3dCQUNmLDBCQUEwQjtvQkFDOUIsVUFBVTtpQkFDYjs7UUFFVDtvQkFDWSxpQkFBaUI7d0JBQ2IsYUFBYTtvQkFDakIsbUJBQW1CO3dCQUNmLDBCQUEwQjtpQkFDakM7O1FBRVQ7WUFDSSxxQkFBcUI7WUFDckIsY0FBYztZQUNkLGFBQWE7WUFDYixvQkFBb0I7Z0JBQ2hCLHNCQUFzQjtZQUMxQixtQkFBbUI7U0FDdEI7O1FBRUQ7Z0JBQ1EsaUJBQWlCO29CQUNiLGFBQWE7Z0JBQ2pCLGtCQUFrQjtnQkFDbEIsb0JBQW9CO29CQUNoQixzQkFBc0I7YUFDN0I7O1FBRUw7Z0JBQ1Esc0JBQXNCO2dCQUN0QixrQkFBa0I7YUFDckI7O1FBRUw7Z0JBQ1EsV0FBVztnQkFDWCxVQUFVO2FBQ2I7O1FBRUw7O1lBRUksb0JBQW9CO1NBQ3ZCXCIsXCJmaWxlXCI6XCJDaGF0SW5zcGVjdG9yLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCJcXG5cXG4gICAgICAgIC5pbnNwZWN0b3IgLmNvbnRhaW5lci1oZWFkZXIge1xcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gICAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG4gICAgfVxcblxcbiAgICAgICAgLmluc3BlY3RvciAuY29udGFpbmVyLWhlYWRlciAuYWN0aW9ucyB7XFxuICAgICAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIC1tcy1mbGV4OiAxIDEgMCU7XFxuICAgICAgICAgICAgICAgIGZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuaW5zcGVjdG9yIC5jb250YWluZXItaGVhZGVyIC5hY3Rpb25zIGEge1xcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICAgICAgLW1zLWZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICAgICAgICAgIGZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICAgICAgfVxcblxcbiAgICAgICAgLmluc3BlY3RvciAuY29udGFpbmVyLWhlYWRlciAudGFibGUtYXZhdGFyIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICAgIC1tcy1mbGV4OiAxIDEgMCU7XFxuICAgICAgICAgICAgICAgIGZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLmluc3BlY3RvciAuY29udGFpbmVyLWhlYWRlciAudGFibGUtYXZhdGFyIC5jaGF0LWF2YXRhcntcXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwcHg7XFxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMHB4O1xcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgICAgICAgICB9XFxuXFxuICAgICAgICAuaW5zcGVjdG9yIC5jb250YWluZXItaGVhZGVyIC50YWJsZS1hdmF0YXIgLmNoYXQtY29sb3J7XFxuICAgICAgICAgICAgICAgIHdpZHRoOiA4cHg7XFxuICAgICAgICAgICAgICAgIGhlaWdodDogMjRweDtcXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0RCRkYwRTtcXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgICAgICAgICAgICAgICBmbG9hdDogbGVmdDtcXG4gICAgICAgICAgICB9XFxuXFxuICAgICAgICAuaW5zcGVjdG9yIC51c2VybmFtZSB7XFxuICAgICAgICAtbXMtZmxleDogMiAxIDEwMCU7XFxuICAgICAgICAgICAgZmxleDogMiAxIDEwMCU7XFxuICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxuICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcXG4gICAgfVxcblxcbiAgICAgICAgLmluc3BlY3RvciAudXNlcm5hbWUgaDMge1xcbiAgICAgICAgICAgIG1hcmdpbjogMDtcXG4gICAgICAgICAgICBjb2xvcjogI0ZGRjtcXG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuaW5zcGVjdG9yIC51c2VybmFtZSBzcGFuIHtcXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgICAgICAgY29sb3I6ICNBOEFBQjc7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuaW5zcGVjdG9yIC5jb250YWluZXItY29udGVudCBsYWJlbCB7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmY7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuaW5zcGVjdG9yIC5jb250YWluZXItY29udGVudCBzcGFuIHtcXG4gICAgICAgICAgICAtbXMtZmxleDogMSAxIDAlO1xcbiAgICAgICAgICAgICAgICBmbGV4OiAxIDEgMCU7XFxuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICAgICAgICAgICAgLW1zLWZsZXgtYWxpZ246IGVuZDtcXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgICAgICAgICAgIGNvbG9yOiAjQjdCOUM0O1xcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5pbnNwZWN0b3IgLmNvbnRhaW5lci1jb250ZW50IC5hdHRhY2htZW50cy1saXN0IHtcXG4gICAgICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLmluc3BlY3RvciAuY29udGFpbmVyLWNvbnRlbnQgLmF0dGFjaG1lbnRzLWxpc3QgLmF0dGFjaG1lbnQtaXRlbSB7XFxuICAgICAgICAgICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgICAgICAgICAgLW1zLWZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICAgICAgICAgIGZsZXg6IDEgMSAwJTtcXG4gICAgICAgICAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAgICAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgICAgICAgICAgIH1cXG5cXG4gICAgICAgIC5pbnNwZWN0b3IgLmNvbnRhaW5lci1jb250ZW50IC5hdHRhY2htZW50cy1saXN0IC5hdHRhY2htZW50LWl0ZW0gLmV4dGVuc2lvbi1pdGVtIHtcXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMnB4O1xcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgICAgICB9XFxuXFxuICAgICAgICAuaW5zcGVjdG9yIC5jb250YWluZXItY29udGVudCAuYXR0YWNobWVudHMtbGlzdCAuYXR0YWNobWVudC1pdGVtIC5zaXplLWl0ZW0ge1xcbiAgICAgICAgICAgICAgICAgICAgLW1zLWZsZXg6IDIgMSAwJTtcXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAyIDEgMCU7XFxuICAgICAgICAgICAgICAgICAgICAtbXMtZmxleC1wYWNrOiBlbmQ7XFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcXG4gICAgICAgICAgICAgICAgfVxcblxcbiAgICAgICAgLmluc3BlY3RvciAuY29udGFpbmVyLWNvbnRlbnQgLmF0dGFjaG1lbnRzLWxpc3QgLmF0dGFjaG1lbnQtaXRlbSAuZGF0ZS1pdGVtIHtcXG4gICAgICAgICAgICAgICAgICAgIC1tcy1mbGV4OiAxIDEgMCU7XFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogMSAxIDAlO1xcbiAgICAgICAgICAgICAgICAgICAgLW1zLWZsZXgtcGFjazogZW5kO1xcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgICAgICAgICAgICAgIH1cXG5cXG4gICAgICAgIC5pbnNwZWN0b3IgLmNvbnRhaW5lci1jb250ZW50IC5pbmZvLWxpbmUge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAgICAgaGVpZ2h0OiAzMHB4O1xcbiAgICAgICAgICAgIC1tcy1mbGV4LWFsaWduOiBlbmQ7XFxuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuaW5zcGVjdG9yIC5jb250YWluZXItY29udGVudCAuaW5mby1saW5lIHNwYW4ge1xcbiAgICAgICAgICAgICAgICAtbXMtZmxleDogMSAxIDAlO1xcbiAgICAgICAgICAgICAgICAgICAgZmxleDogMSAxIDAlO1xcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgICAgICAgICAgICAgLW1zLWZsZXgtYWxpZ246IGVuZDtcXG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXG4gICAgICAgICAgICB9XFxuXFxuICAgICAgICAuaW5zcGVjdG9yIC5jb250YWluZXItY29udGVudCAuaW5mby1saW5lIC5mbGFnIHtcXG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcXG4gICAgICAgICAgICB9XFxuXFxuICAgICAgICAuaW5zcGVjdG9yIC5jb250YWluZXItY29udGVudCAuaW5mby1saW5lICoge1xcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xcbiAgICAgICAgICAgICAgICBtYXJnaW46IDA7XFxuICAgICAgICAgICAgfVxcblxcbiAgICAgICAgLmluc3BlY3RvciAuY29udGFpbmVyLWNvbnRlbnQgLmluZm8sXFxuICAgICAgICAuaW5zcGVjdG9yIC5jb250YWluZXItY29udGVudCAubm90ZXMge1xcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICAgICAgICB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcImluc3BlY3RvclwiOiBcIkNoYXRJbnNwZWN0b3ItaW5zcGVjdG9yLTNJQXFBXCIsXG5cdFwiY29udGFpbmVyLWhlYWRlclwiOiBcIkNoYXRJbnNwZWN0b3ItY29udGFpbmVyLWhlYWRlci1FY2QyTFwiLFxuXHRcImFjdGlvbnNcIjogXCJDaGF0SW5zcGVjdG9yLWFjdGlvbnMtM25PcGlcIixcblx0XCJ0YWJsZS1hdmF0YXJcIjogXCJDaGF0SW5zcGVjdG9yLXRhYmxlLWF2YXRhci0xbThjMVwiLFxuXHRcImNoYXQtYXZhdGFyXCI6IFwiQ2hhdEluc3BlY3Rvci1jaGF0LWF2YXRhci0yQURxdVwiLFxuXHRcImNoYXQtY29sb3JcIjogXCJDaGF0SW5zcGVjdG9yLWNoYXQtY29sb3ItM01wLXNcIixcblx0XCJ1c2VybmFtZVwiOiBcIkNoYXRJbnNwZWN0b3ItdXNlcm5hbWUtMmJlZDJcIixcblx0XCJjb250YWluZXItY29udGVudFwiOiBcIkNoYXRJbnNwZWN0b3ItY29udGFpbmVyLWNvbnRlbnQtMTk4dUdcIixcblx0XCJhdHRhY2htZW50cy1saXN0XCI6IFwiQ2hhdEluc3BlY3Rvci1hdHRhY2htZW50cy1saXN0LTM0WjJfXCIsXG5cdFwiYXR0YWNobWVudC1pdGVtXCI6IFwiQ2hhdEluc3BlY3Rvci1hdHRhY2htZW50LWl0ZW0tMXNncDFcIixcblx0XCJleHRlbnNpb24taXRlbVwiOiBcIkNoYXRJbnNwZWN0b3ItZXh0ZW5zaW9uLWl0ZW0tMkhFZ19cIixcblx0XCJzaXplLWl0ZW1cIjogXCJDaGF0SW5zcGVjdG9yLXNpemUtaXRlbS0xRHpSMFwiLFxuXHRcImRhdGUtaXRlbVwiOiBcIkNoYXRJbnNwZWN0b3ItZGF0ZS1pdGVtLTJlZ0hKXCIsXG5cdFwiaW5mby1saW5lXCI6IFwiQ2hhdEluc3BlY3Rvci1pbmZvLWxpbmUtMzRpRkhcIixcblx0XCJmbGFnXCI6IFwiQ2hhdEluc3BlY3Rvci1mbGFnLTN4OVBvXCIsXG5cdFwiaW5mb1wiOiBcIkNoYXRJbnNwZWN0b3ItaW5mby0xeDdFWlwiLFxuXHRcIm5vdGVzXCI6IFwiQ2hhdEluc3BlY3Rvci1ub3Rlcy0zRGNBelwiXG59OyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uQ2hhdE1lc3NhZ2UtY29udGFpbmVyLXJxQnJUe1xcbiAgICBcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIFxcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIG1hcmdpbjogMjBweDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDY3MnB4KSB7XFxuICAgIC5DaGF0TWVzc2FnZS1jb250YWluZXItcnFCclR7XFxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDk5MXB4KSB7XFxuICAgIC5DaGF0TWVzc2FnZS1jb250YWluZXItcnFCclR7XFxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIH1cXG59XFxuLkNoYXRNZXNzYWdlLWNvbnRlbnQtMTNZYWgge1xcbiAgICAtbXMtZmxleDogMSAxIDAlO1xcbiAgICAgICAgZmxleDogMSAxIDAlO1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAtbXMtZmxleC1hbGlnbjogc3RhcnQ7XFxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gICAgbWF4LXdpZHRoOiA3MCU7XFxufVxcbi5DaGF0TWVzc2FnZS1tZXNzYWdlLWp1ZWwtIHtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XFxuICAgIHBhZGRpbmc6IDEwcHggMjBweCAxNXB4IDIwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgLW1zLWZsZXg6IDIgMSAwJTtcXG4gICAgICAgIGZsZXg6IDIgMSAwJTtcXG4gICAgLW1zLWZsZXgtb3JkZXI6IDE7XFxuICAgICAgICBvcmRlcjogMTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlXFxufVxcbi5DaGF0TWVzc2FnZS1tZXNzYWdlLWp1ZWwtOmJlZm9yZSB7XFxuICAgIFxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIFxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIFxcbiAgICB0b3A6IDA7XFxuICAgIFxcbiAgICB3aWR0aDogMDtcXG4gICAgXFxuICAgIGhlaWdodDogMDtcXG4gICAgXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgIFxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgXFxuICAgIGJvcmRlci1ib3R0b206IDIwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxufVxcbi5DaGF0TWVzc2FnZS1yaWdodC0yaUNhVSAuQ2hhdE1lc3NhZ2UtbWVzc2FnZS1qdWVsLSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyRUEyRjg7XFxuICAgIC1tcy1mbGV4LW9yZGVyOiAxO1xcbiAgICAgICAgb3JkZXI6IDFcXG59XFxuLkNoYXRNZXNzYWdlLXJpZ2h0LTJpQ2FVIC5DaGF0TWVzc2FnZS1tZXNzYWdlLWp1ZWwtOmJlZm9yZSB7XFxuICAgIFxcbiAgICByaWdodDogLTEwcHg7XFxuICAgIFxcbiAgICBib3JkZXItbGVmdDogMTVweCBzb2xpZCAjMkVBMkY4O1xcbn1cXG4uQ2hhdE1lc3NhZ2UtbGVmdC0xcGRXYyAuQ2hhdE1lc3NhZ2UtbWVzc2FnZS1qdWVsLXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzEyMjEyRTtcXG4gICAgLW1zLWZsZXgtb3JkZXI6IDI7XFxuICAgICAgICBvcmRlcjogMlxcbn1cXG4uQ2hhdE1lc3NhZ2UtbGVmdC0xcGRXYyAuQ2hhdE1lc3NhZ2UtbWVzc2FnZS1qdWVsLTpiZWZvcmUge1xcbiAgICBcXG4gICAgbGVmdDogLTEwcHg7XFxuICAgIFxcbiAgICBib3JkZXItcmlnaHQ6IDE1cHggc29saWQgIzEyMjEyRTtcXG59XFxuLkNoYXRNZXNzYWdlLXJpZ2h0LTJpQ2FVIC5DaGF0TWVzc2FnZS1hdmF0YXItM1dSSHEge1xcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcXG4gICAgLW1zLWZsZXgtb3JkZXI6IDI7XFxuICAgICAgICBvcmRlcjogMjtcXG59XFxuLkNoYXRNZXNzYWdlLWxlZnQtMXBkV2MgLkNoYXRNZXNzYWdlLWF2YXRhci0zV1JIcXtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbiAgICAtbXMtZmxleC1vcmRlcjogMTtcXG4gICAgICAgIG9yZGVyOiAxO1xcbn1cXG4uQ2hhdE1lc3NhZ2UtYXZhdGFyLTNXUkhxID4gaW1nIHtcXG4gICAgd2lkdGg6IDUwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcbi5DaGF0TWVzc2FnZS10aW1lLWFnby0yVlM1ZyB7XFxuICAgIGNvbG9yOiAjYTBiOWJmO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxufVxcbi5DaGF0TWVzc2FnZS1yaWdodC0yaUNhVSAuQ2hhdE1lc3NhZ2UtdGltZS1hZ28tMlZTNWcge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDcwcHg7XFxuICAgIHRleHQtYWxpZ246IGVuZDtcXG59XFxuLkNoYXRNZXNzYWdlLWxlZnQtMXBkV2MgLkNoYXRNZXNzYWdlLXRpbWUtYWdvLTJWUzVnIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDcwcHg7XFxuICAgIHRleHQtYWxpZ246IHN0YXJ0O1xcbn1cXG4vKlxcbi5yaWdodCAuaW5mb3tcXG4gICAgdGV4dC1hbGlnbjogZW5kO1xcbn1cXG5cXG4ubGVmdCAuaW5mb3tcXG4gICAgdGV4dC1hbGlnbjogc3RhcnQ7XFxufSovXFxuLkNoYXRNZXNzYWdlLXJpZ2h0LTJpQ2FVe1xcbiAgICAtbXMtZmxleC1hbGlnbjogZW5kO1xcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbn1cXG4uQ2hhdE1lc3NhZ2UtbGVmdC0xcGRXY3tcXG4gICAgLW1zLWZsZXgtYWxpZ246IHN0YXJ0O1xcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA2NzJweCkge1xcbiAgICAuQ2hhdE1lc3NhZ2UtYXZhdGFyLTNXUkhxIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gICAgfVxcbiAgICAuQ2hhdE1lc3NhZ2UtdGltZS1hZ28tMlZTNWcge1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XFxuICAgICAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xcbiAgICB9XFxufVwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ2hhdFJvb20vQ2hhdE1lc3NhZ2UvQ2hhdE1lc3NhZ2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFDQTs7SUFFSSxxQkFBcUI7O0lBRXJCLGNBQWM7SUFDZCwyQkFBMkI7UUFDdkIsdUJBQXVCO0lBQzNCLGFBQWE7Q0FDaEI7QUFDRDtJQUNJO1FBQ0ksZ0JBQWdCO0tBQ25CO0NBQ0o7QUFDRDtJQUNJO1FBQ0ksZ0JBQWdCO0tBQ25CO0NBQ0o7QUFDRDtJQUNJLGlCQUFpQjtRQUNiLGFBQWE7SUFDakIscUJBQXFCO0lBQ3JCLGNBQWM7SUFDZCx3QkFBd0I7UUFDcEIsb0JBQW9CO0lBQ3hCLHNCQUFzQjtRQUNsQix3QkFBd0I7SUFDNUIsZUFBZTtDQUNsQjtBQUNEO0lBQ0ksYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQixxQkFBcUI7SUFDckIsY0FBYztJQUNkLDJCQUEyQjtRQUN2Qix1QkFBdUI7SUFDM0IsaUJBQWlCO1FBQ2IsYUFBYTtJQUNqQixrQkFBa0I7UUFDZCxTQUFTO0lBQ2Isa0JBQWtCO0NBQ3JCO0FBQ0Q7O0lBRUksc0JBQXNCOztJQUV0QixtQkFBbUI7O0lBRW5CLE9BQU87O0lBRVAsU0FBUzs7SUFFVCxVQUFVOztJQUVWLHVCQUF1Qjs7SUFFdkIsWUFBWTs7SUFFWixzQ0FBc0M7Q0FDekM7QUFDRDtJQUNJLDBCQUEwQjtJQUMxQixrQkFBa0I7UUFDZCxRQUFRO0NBQ2Y7QUFDRDs7SUFFSSxhQUFhOztJQUViLGdDQUFnQztDQUNuQztBQUNEO0lBQ0ksMEJBQTBCO0lBQzFCLGtCQUFrQjtRQUNkLFFBQVE7Q0FDZjtBQUNEOztJQUVJLFlBQVk7O0lBRVosaUNBQWlDO0NBQ3BDO0FBQ0Q7SUFDSSxrQkFBa0I7SUFDbEIsa0JBQWtCO1FBQ2QsU0FBUztDQUNoQjtBQUNEO0lBQ0ksbUJBQW1CO0lBQ25CLGtCQUFrQjtRQUNkLFNBQVM7Q0FDaEI7QUFDRDtJQUNJLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsd0JBQXdCO0NBQzNCO0FBQ0Q7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0NBQ25CO0FBQ0Q7SUFDSSxtQkFBbUI7SUFDbkIsZ0JBQWdCO0NBQ25CO0FBQ0Q7SUFDSSxrQkFBa0I7SUFDbEIsa0JBQWtCO0NBQ3JCO0FBQ0Q7Ozs7Ozs7R0FPRztBQUNIO0lBQ0ksb0JBQW9CO1FBQ2hCLHNCQUFzQjtDQUM3QjtBQUNEO0lBQ0ksc0JBQXNCO1FBQ2xCLHdCQUF3QjtDQUMvQjtBQUNEO0lBQ0k7UUFDSSx5QkFBeUI7S0FDNUI7SUFDRDtRQUNJLDJCQUEyQjtRQUMzQiwwQkFBMEI7S0FDN0I7Q0FDSlwiLFwiZmlsZVwiOlwiQ2hhdE1lc3NhZ2UuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcbi5jb250YWluZXJ7XFxuICAgIFxcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgbWFyZ2luOiAyMHB4O1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNjcycHgpIHtcXG4gICAgLmNvbnRhaW5lcntcXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogOTkxcHgpIHtcXG4gICAgLmNvbnRhaW5lcntcXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcXG4gICAgfVxcbn1cXG4uY29udGVudCB7XFxuICAgIC1tcy1mbGV4OiAxIDEgMCU7XFxuICAgICAgICBmbGV4OiAxIDEgMCU7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIC1tcy1mbGV4LWFsaWduOiBzdGFydDtcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgICBtYXgtd2lkdGg6IDcwJTtcXG59XFxuLm1lc3NhZ2Uge1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgZm9udC13ZWlnaHQ6IDIwMDtcXG4gICAgcGFkZGluZzogMTBweCAyMHB4IDE1cHggMjBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAtbXMtZmxleDogMiAxIDAlO1xcbiAgICAgICAgZmxleDogMiAxIDAlO1xcbiAgICAtbXMtZmxleC1vcmRlcjogMTtcXG4gICAgICAgIG9yZGVyOiAxO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmVcXG59XFxuLm1lc3NhZ2U6YmVmb3JlIHtcXG4gICAgXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgXFxuICAgIHRvcDogMDtcXG4gICAgXFxuICAgIHdpZHRoOiAwO1xcbiAgICBcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICBcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBcXG4gICAgYm9yZGVyLWJvdHRvbTogMjBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG59XFxuLnJpZ2h0IC5tZXNzYWdlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJFQTJGODtcXG4gICAgLW1zLWZsZXgtb3JkZXI6IDE7XFxuICAgICAgICBvcmRlcjogMVxcbn1cXG4ucmlnaHQgLm1lc3NhZ2U6YmVmb3JlIHtcXG4gICAgXFxuICAgIHJpZ2h0OiAtMTBweDtcXG4gICAgXFxuICAgIGJvcmRlci1sZWZ0OiAxNXB4IHNvbGlkICMyRUEyRjg7XFxufVxcbi5sZWZ0IC5tZXNzYWdle1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTIyMTJFO1xcbiAgICAtbXMtZmxleC1vcmRlcjogMjtcXG4gICAgICAgIG9yZGVyOiAyXFxufVxcbi5sZWZ0IC5tZXNzYWdlOmJlZm9yZSB7XFxuICAgIFxcbiAgICBsZWZ0OiAtMTBweDtcXG4gICAgXFxuICAgIGJvcmRlci1yaWdodDogMTVweCBzb2xpZCAjMTIyMTJFO1xcbn1cXG4ucmlnaHQgLmF2YXRhciB7XFxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgICAtbXMtZmxleC1vcmRlcjogMjtcXG4gICAgICAgIG9yZGVyOiAyO1xcbn1cXG4ubGVmdCAuYXZhdGFye1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxuICAgIC1tcy1mbGV4LW9yZGVyOiAxO1xcbiAgICAgICAgb3JkZXI6IDE7XFxufVxcbi5hdmF0YXIgPiBpbWcge1xcbiAgICB3aWR0aDogNTBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuLnRpbWUtYWdvIHtcXG4gICAgY29sb3I6ICNhMGI5YmY7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG59XFxuLnJpZ2h0IC50aW1lLWFnbyB7XFxuICAgIG1hcmdpbi1yaWdodDogNzBweDtcXG4gICAgdGV4dC1hbGlnbjogZW5kO1xcbn1cXG4ubGVmdCAudGltZS1hZ28ge1xcbiAgICBtYXJnaW4tbGVmdDogNzBweDtcXG4gICAgdGV4dC1hbGlnbjogc3RhcnQ7XFxufVxcbi8qXFxuLnJpZ2h0IC5pbmZve1xcbiAgICB0ZXh0LWFsaWduOiBlbmQ7XFxufVxcblxcbi5sZWZ0IC5pbmZve1xcbiAgICB0ZXh0LWFsaWduOiBzdGFydDtcXG59Ki9cXG4ucmlnaHR7XFxuICAgIC1tcy1mbGV4LWFsaWduOiBlbmQ7XFxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxufVxcbi5sZWZ0e1xcbiAgICAtbXMtZmxleC1hbGlnbjogc3RhcnQ7XFxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDY3MnB4KSB7XFxuICAgIC5hdmF0YXIge1xcbiAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbiAgICB9XFxuICAgIC50aW1lLWFnbyB7XFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDtcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcImNvbnRhaW5lclwiOiBcIkNoYXRNZXNzYWdlLWNvbnRhaW5lci1ycUJyVFwiLFxuXHRcImNvbnRlbnRcIjogXCJDaGF0TWVzc2FnZS1jb250ZW50LTEzWWFoXCIsXG5cdFwibWVzc2FnZVwiOiBcIkNoYXRNZXNzYWdlLW1lc3NhZ2UtanVlbC1cIixcblx0XCJyaWdodFwiOiBcIkNoYXRNZXNzYWdlLXJpZ2h0LTJpQ2FVXCIsXG5cdFwibGVmdFwiOiBcIkNoYXRNZXNzYWdlLWxlZnQtMXBkV2NcIixcblx0XCJhdmF0YXJcIjogXCJDaGF0TWVzc2FnZS1hdmF0YXItM1dSSHFcIixcblx0XCJ0aW1lLWFnb1wiOiBcIkNoYXRNZXNzYWdlLXRpbWUtYWdvLTJWUzVnXCJcbn07IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcbi5DaGF0Um9vbS1jb250YWluZXItMUlWYk4ge1xcblxcdGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgLW1zLWZsZXg6IDIgMSAwJTtcXG4gICAgICAgIGZsZXg6IDIgMSAwJTtcXG4gICAgLW1zLWZsZXgtcGFjazogZW5kO1xcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG59XFxuXFxuLkNoYXRSb29tLWNoYXQtaW5wdXRzLTJ0UXRkIHtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJhY2tncm91bmQ6ICMxQjMxNDM7XFxuICAgIC1tcy1mbGV4LWFsaWduOiBlbmQ7XFxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxuICAgIHBhZGRpbmc6IDE1cHg7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LC4xKTtcXG59XFxuXFxuLkNoYXRSb29tLWNoYXQtaW5wdXRzLTJ0UXRkIC5DaGF0Um9vbS1lbGFzdGljLTMyb0x2IHtcXG5cXHRcXHRkaXNwbGF5OiAtbXMtZmxleGJveDtcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdCAgICAtbXMtZmxleDogMSAxIDAlO1xcblxcdCAgICAgICAgZmxleDogMSAxIDAlO1xcblxcdCAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuXFx0fVxcblxcbi5DaGF0Um9vbS1jaGF0LWlucHV0cy0ydFF0ZCAuQ2hhdFJvb20tYWN0aW9uR3JvdXAtaXZHOTUge1xcblxcdFxcdC1tcy1mbGV4OiAwIDEgMCU7XFxuXFx0XFx0ICAgIGZsZXg6IDAgMSAwJTtcXG4gICAgXFx0ZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIFxcdGRpc3BsYXk6IGZsZXg7XFxuICAgIFxcdC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgIFxcdCAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdH1cXG5cXG4uQ2hhdFJvb20tY2hhdC1pbnB1dHMtMnRRdGQgLkNoYXRSb29tLWFjdGlvbkdyb3VwLWl2Rzk1IC5kcm9wZG93bi10b2dnbGUge1xcbiAgICBcXHRcXHRkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgXFx0XFx0ZGlzcGxheTogZmxleDtcXG4gICAgXFx0fVxcblxcbi5DaGF0Um9vbS1jaGF0LWlucHV0cy0ydFF0ZCAuQ2hhdFJvb20tYWN0aW9ucy0xZld1TyB7XFxuXFx0XFx0bWFyZ2luLXJpZ2h0OiAxNXB4O1xcblxcdH1cXG5cXG4uQ2hhdFJvb20tY2hhdC1pbnB1dHMtMnRRdGQgLkNoYXRSb29tLW1lc3NhZ2UtZmllbGQtM1lyQUkge1xcblxcdFxcdGNvbG9yOiAjRkZGRkZGO1xcblxcdCAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuXFx0ICAgIGJvcmRlcjogMDtcXG5cXHQgICAgLW1zLWZsZXg6IDIgMSAxMDAlO1xcblxcdCAgICAgICAgZmxleDogMiAxIDEwMCU7XFxuXFx0ICAgIGhlaWdodDogMzZweDtcXG5cXHQgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuXFx0ICAgIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCc7XFxuXFx0ICAgIGZvbnQtc2l6ZTogMTRweDtcXG5cXHQgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG5cXHQgICAgcGFkZGluZzogMCAxNXB4IDAgMDtcXG5cXHQgICAgbGluZS1oZWlnaHQ6IDE4cHg7XFxuXFx0ICAgIHJlc2l6ZTogbm9uZTtcXG5cXHRcXHR6LWluZGV4OiA5O1xcblxcdH1cXG5cXG4uQ2hhdFJvb20tbWVzc2FnZXMtY2JyNFEge1xcblxcdC1tcy1mbGV4OiAyIDEgMCU7XFxuXFx0ICAgIGZsZXg6IDIgMSAwJTtcXG5cXHRvdmVyZmxvdzogYXV0bztcXG4gICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbn1cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vY29tcG9uZW50cy9DaGF0L0NoYXRSb29tL0NoYXRSb29tLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiOztBQUVBO0NBQ0MscUJBQXFCO0NBQ3JCLGNBQWM7SUFDWCwyQkFBMkI7UUFDdkIsdUJBQXVCO0lBQzNCLGlCQUFpQjtRQUNiLGFBQWE7SUFDakIsbUJBQW1CO1FBQ2YsMEJBQTBCO0NBQ2pDOztBQUVEO0lBQ0kscUJBQXFCO0lBQ3JCLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsb0JBQW9CO1FBQ2hCLHNCQUFzQjtJQUMxQixjQUFjO0lBQ2QsMkNBQTJDO0NBQzlDOztBQUVEO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7S0FDWCxpQkFBaUI7U0FDYixhQUFhO0tBQ2pCLG1CQUFtQjtFQUN0Qjs7QUFFRjtFQUNFLGlCQUFpQjtNQUNiLGFBQWE7S0FDZCxxQkFBcUI7S0FDckIsY0FBYztLQUNkLHVCQUF1QjtTQUNuQixvQkFBb0I7RUFDM0I7O0FBRUY7TUFDTSxxQkFBcUI7TUFDckIsY0FBYztNQUNkOztBQUVOO0VBQ0UsbUJBQW1CO0VBQ25COztBQUVGO0VBQ0UsZUFBZTtLQUNaLG1CQUFtQjtLQUNuQixVQUFVO0tBQ1YsbUJBQW1CO1NBQ2YsZUFBZTtLQUNuQixhQUFhO0tBQ2Isd0JBQXdCO0tBQ3hCLDBCQUEwQjtLQUMxQixnQkFBZ0I7S0FDaEIsb0JBQW9CO0tBQ3BCLG9CQUFvQjtLQUNwQixrQkFBa0I7S0FDbEIsYUFBYTtFQUNoQixXQUFXO0VBQ1g7O0FBRUY7Q0FDQyxpQkFBaUI7S0FDYixhQUFhO0NBQ2pCLGVBQWU7SUFDWixtQ0FBbUM7UUFDL0IsK0JBQStCO0lBQ25DLGNBQWM7SUFDZCxtQkFBbUI7Q0FDdEJcIixcImZpbGVcIjpcIkNoYXRSb29tLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCJcXG5cXG4uY29udGFpbmVyIHtcXG5cXHRkaXNwbGF5OiAtbXMtZmxleGJveDtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcbiAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIC1tcy1mbGV4OiAyIDEgMCU7XFxuICAgICAgICBmbGV4OiAyIDEgMCU7XFxuICAgIC1tcy1mbGV4LXBhY2s6IGVuZDtcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxufVxcblxcbi5jaGF0LWlucHV0cyB7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMUIzMTQzO1xcbiAgICAtbXMtZmxleC1hbGlnbjogZW5kO1xcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgICBwYWRkaW5nOiAxNXB4O1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMSk7XFxufVxcblxcbi5jaGF0LWlucHV0cyAuZWxhc3RpYyB7XFxuXFx0XFx0ZGlzcGxheTogLW1zLWZsZXhib3g7XFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXG5cXHQgICAgLW1zLWZsZXg6IDEgMSAwJTtcXG5cXHQgICAgICAgIGZsZXg6IDEgMSAwJTtcXG5cXHQgICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcblxcdH1cXG5cXG4uY2hhdC1pbnB1dHMgLmFjdGlvbkdyb3VwIHtcXG5cXHRcXHQtbXMtZmxleDogMCAxIDAlO1xcblxcdFxcdCAgICBmbGV4OiAwIDEgMCU7XFxuICAgIFxcdGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBcXHRkaXNwbGF5OiBmbGV4O1xcbiAgICBcXHQtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICBcXHQgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHR9XFxuXFxuLmNoYXQtaW5wdXRzIC5hY3Rpb25Hcm91cCA6Z2xvYmFsKC5kcm9wZG93bi10b2dnbGUpIHtcXG4gICAgXFx0XFx0ZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIFxcdFxcdGRpc3BsYXk6IGZsZXg7XFxuICAgIFxcdH1cXG5cXG4uY2hhdC1pbnB1dHMgLmFjdGlvbnMge1xcblxcdFxcdG1hcmdpbi1yaWdodDogMTVweDtcXG5cXHR9XFxuXFxuLmNoYXQtaW5wdXRzIC5tZXNzYWdlLWZpZWxkIHtcXG5cXHRcXHRjb2xvcjogI0ZGRkZGRjtcXG5cXHQgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcblxcdCAgICBib3JkZXI6IDA7XFxuXFx0ICAgIC1tcy1mbGV4OiAyIDEgMTAwJTtcXG5cXHQgICAgICAgIGZsZXg6IDIgMSAxMDAlO1xcblxcdCAgICBoZWlnaHQ6IDM2cHg7XFxuXFx0ICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcblxcdCAgICBmb250LWZhbWlseTogJ01vbnRzZXJyYXQnO1xcblxcdCAgICBmb250LXNpemU6IDE0cHg7XFxuXFx0ICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuXFx0ICAgIHBhZGRpbmc6IDAgMTVweCAwIDA7XFxuXFx0ICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xcblxcdCAgICByZXNpemU6IG5vbmU7XFxuXFx0XFx0ei1pbmRleDogOTtcXG5cXHR9XFxuXFxuLm1lc3NhZ2VzIHtcXG5cXHQtbXMtZmxleDogMiAxIDAlO1xcblxcdCAgICBmbGV4OiAyIDEgMCU7XFxuXFx0b3ZlcmZsb3c6IGF1dG87XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcXG59XFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcImNvbnRhaW5lclwiOiBcIkNoYXRSb29tLWNvbnRhaW5lci0xSVZiTlwiLFxuXHRcImNoYXQtaW5wdXRzXCI6IFwiQ2hhdFJvb20tY2hhdC1pbnB1dHMtMnRRdGRcIixcblx0XCJlbGFzdGljXCI6IFwiQ2hhdFJvb20tZWxhc3RpYy0zMm9MdlwiLFxuXHRcImFjdGlvbkdyb3VwXCI6IFwiQ2hhdFJvb20tYWN0aW9uR3JvdXAtaXZHOTVcIixcblx0XCJhY3Rpb25zXCI6IFwiQ2hhdFJvb20tYWN0aW9ucy0xZld1T1wiLFxuXHRcIm1lc3NhZ2UtZmllbGRcIjogXCJDaGF0Um9vbS1tZXNzYWdlLWZpZWxkLTNZckFJXCIsXG5cdFwibWVzc2FnZXNcIjogXCJDaGF0Um9vbS1tZXNzYWdlcy1jYnI0UVwiXG59OyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uQ3VycmVudFRhbGtzLWNvbnRhaW5lci0zckZTUyB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyMjEyRTtcXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICMyNjNkNTA7XFxuICByZXNpemU6IGhvcml6b250YWw7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXgtd2lkdGg6IDE4MHB4O1xcbiAgbWluLXdpZHRoOiA2MHB4O1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAuMnMgZWFzZS1vdXQ7XFxuICAtby10cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2Utb3V0O1xcbiAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLW91dDtcXG59XFxuLkN1cnJlbnRUYWxrcy1jb250YWluZXItM3JGU1MgKiB7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAuMnMgZWFzZS1vdXQ7XFxuICAtby10cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2Utb3V0O1xcbiAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLW91dDtcXG59XFxuLm1vYmlsZSAucmVzaXphYmxlLWhhbmRsZSB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcbi5tb2JpbGUgLkN1cnJlbnRUYWxrcy1jb250YWluZXItM3JGU1MsXFxuLkN1cnJlbnRUYWxrcy1jb250YWluZXItM3JGU1MuQ3VycmVudFRhbGtzLW1pbi0ydy1XRyB7XFxuICBtaW4td2lkdGg6IDYwcHg7XFxuICB3aWR0aDogNjBweDtcXG4gIG1heC13aWR0aDogNjBweDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC8qIFRBVkEgQVFVSSBOQSBTRVhUQSBGRUlSQSAqL1xcbn1cXG4ubW9iaWxlIC5DdXJyZW50VGFsa3MtY29udGFpbmVyLTNyRlNTIC5DdXJyZW50VGFsa3MtY29udGFpbmVyLWhlYWRlci0yLWw3ciwgLkN1cnJlbnRUYWxrcy1jb250YWluZXItM3JGU1MuQ3VycmVudFRhbGtzLW1pbi0ydy1XRyAuQ3VycmVudFRhbGtzLWNvbnRhaW5lci1oZWFkZXItMi1sN3Ige1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbi5tb2JpbGUgLkN1cnJlbnRUYWxrcy1jb250YWluZXItM3JGU1MgLkN1cnJlbnRUYWxrcy10YWxrLTMxVm1aLCAuQ3VycmVudFRhbGtzLWNvbnRhaW5lci0zckZTUy5DdXJyZW50VGFsa3MtbWluLTJ3LVdHIC5DdXJyZW50VGFsa3MtdGFsay0zMVZtWiB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgfVxcbi5tb2JpbGUgLkN1cnJlbnRUYWxrcy1jb250YWluZXItM3JGU1MgLkN1cnJlbnRUYWxrcy10YWxrLTMxVm1aIC5DdXJyZW50VGFsa3MtY291bnQtMWNfNDYsIC5DdXJyZW50VGFsa3MtY29udGFpbmVyLTNyRlNTLkN1cnJlbnRUYWxrcy1taW4tMnctV0cgLkN1cnJlbnRUYWxrcy10YWxrLTMxVm1aIC5DdXJyZW50VGFsa3MtY291bnQtMWNfNDYge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB0b3A6IDBweDtcXG4gICAgICByaWdodDogLTVweDtcXG4gICAgfVxcbi5tb2JpbGUgLkN1cnJlbnRUYWxrcy1jb250YWluZXItM3JGU1MgLkN1cnJlbnRUYWxrcy10YWxrLTMxVm1aOmhvdmVyLCAuQ3VycmVudFRhbGtzLWNvbnRhaW5lci0zckZTUy5DdXJyZW50VGFsa3MtbWluLTJ3LVdHIC5DdXJyZW50VGFsa3MtdGFsay0zMVZtWjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiAjMEMxNTFEO1xcbn1cXG4ubW9iaWxlIC5DdXJyZW50VGFsa3MtY29udGFpbmVyLTNyRlNTIC5DdXJyZW50VGFsa3MtdXNlci1lMEVTNSwgLkN1cnJlbnRUYWxrcy1jb250YWluZXItM3JGU1MuQ3VycmVudFRhbGtzLW1pbi0ydy1XRyAuQ3VycmVudFRhbGtzLXVzZXItZTBFUzUge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4ubW9iaWxlIC5DdXJyZW50VGFsa3MtY29udGFpbmVyLTNyRlNTIC5DdXJyZW50VGFsa3MtdXNlci1lMEVTNSBzcGFuLCAuQ3VycmVudFRhbGtzLWNvbnRhaW5lci0zckZTUy5DdXJyZW50VGFsa3MtbWluLTJ3LVdHIC5DdXJyZW50VGFsa3MtdXNlci1lMEVTNSBzcGFuIHtcXG4gICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxuLm1vYmlsZSAuQ3VycmVudFRhbGtzLWNvbnRhaW5lci0zckZTUyAuQ3VycmVudFRhbGtzLXRhbGstYXZhdGFyLTFtMUtvLCAuQ3VycmVudFRhbGtzLWNvbnRhaW5lci0zckZTUy5DdXJyZW50VGFsa3MtbWluLTJ3LVdHIC5DdXJyZW50VGFsa3MtdGFsay1hdmF0YXItMW0xS28ge1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICBtYXJnaW46IDA7XFxuXFxuICB9XFxuLkN1cnJlbnRUYWxrcy1jb250YWluZXItM3JGU1MuQ3VycmVudFRhbGtzLW1heC15cGFaUyB7XFxuICBtaW4td2lkdGg6IDE4MHB4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogOTkxcHgpIHtcXG4gIC5DdXJyZW50VGFsa3MtY29udGFpbmVyLTNyRlNTIHtcXG4gICAgbWF4LXdpZHRoOiA2MHB4ICFpbXBvcnRhbnQ7XFxuICB9XFxuICAuQ3VycmVudFRhbGtzLWNvbnRhaW5lci0zckZTUy5DdXJyZW50VGFsa3MtbWF4LXlwYVpTIHtcXG4gICAgbWluLXdpZHRoOiA2MHB4O1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gIH1cXG59XFxuLkN1cnJlbnRUYWxrcy1jb250YWluZXItaGVhZGVyLTItbDdyIHtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcbi5DdXJyZW50VGFsa3MtaGVhZGVyLTNlRWJmIHtcXG4gIGNvbG9yOiAjQThBQUI3O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuLkN1cnJlbnRUYWxrcy11c2VyLWUwRVM1IHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC1tcy1mbGV4OiAyIDEgMCU7XFxuICAgICAgZmxleDogMiAxIDAlO1xcbn1cXG4uQ3VycmVudFRhbGtzLWN1cnJlbnQtdGFsa3MtMW1QNC0ge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLkN1cnJlbnRUYWxrcy10YWxrLTMxVm1aIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMzMTNkNGY7XFxuICBwYWRkaW5nOiA1cHg7XFxuICAtbXMtZmxleDogMSAwIDM4cHg7XFxuICAgICAgZmxleDogMSAwIDM4cHg7XFxuICBoZWlnaHQ6IDM4cHg7XFxuICBjb2xvcjogI2IyYjljNDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNzMxNDI7XFxuICBjb2xvcjogI2IyYjljNDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLkN1cnJlbnRUYWxrcy10YWxrLTMxVm1aOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6ICMwQzE1MUQ7XFxuICBib3JkZXItY29sb3I6ICAjMTIyMTJFO1xcbiAgY29sb3I6ICMyRUEyRjg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5DdXJyZW50VGFsa3MtdGFsay1hdmF0YXItMW0xS28ge1xcbiAgd2lkdGg6IDI0cHg7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBtYXJnaW46IDFweCAxMHB4IDAgMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxufVxcbi5DdXJyZW50VGFsa3MtY291bnQtMWNfNDYge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICB3aWR0aDogMjBweDtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgLW1zLWZsZXg6IDAgMCAyMHB4O1xcbiAgICAgIGZsZXg6IDAgMCAyMHB4XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9jb21wb25lbnRzL0NoYXQvQ3VycmVudFRhbGtzL0N1cnJlbnRUYWxrcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUNBO0VBQ0UsY0FBYztFQUNkLDBCQUEwQjtFQUMxQixnQ0FBZ0M7RUFDaEMsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCwyQkFBMkI7TUFDdkIsdUJBQXVCO0VBQzNCLHFDQUFxQztFQUNyQyxnQ0FBZ0M7RUFDaEMsNkJBQTZCO0NBQzlCO0FBQ0Q7RUFDRSxxQ0FBcUM7RUFDckMsZ0NBQWdDO0VBQ2hDLDZCQUE2QjtDQUM5QjtBQUNEO0VBQ0UseUJBQXlCO0NBQzFCO0FBQ0Q7O0VBRUUsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCw4QkFBOEI7Q0FDL0I7QUFDRDtJQUNJLGNBQWM7R0FDZjtBQUNIO0lBQ0ksYUFBYTtJQUNiLFdBQVc7SUFDWCxpQkFBaUI7SUFDakIsbUJBQW1CO0dBQ3BCO0FBQ0g7TUFDTSxtQkFBbUI7TUFDbkIsU0FBUztNQUNULFlBQVk7S0FDYjtBQUNMO0VBQ0Usb0JBQW9CO0NBQ3JCO0FBQ0Q7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO1FBQ2xCLHdCQUF3QjtJQUM1Qix1QkFBdUI7UUFDbkIsb0JBQW9CO0dBQ3pCO0FBQ0g7TUFDTSxjQUFjO0tBQ2Y7QUFDTDtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsVUFBVTs7R0FFWDtBQUNIO0VBQ0UsaUJBQWlCO0VBQ2pCLHFCQUFxQjtFQUNyQixjQUFjO0NBQ2Y7QUFDRDtFQUNFO0lBQ0UsMkJBQTJCO0dBQzVCO0VBQ0Q7SUFDRSxnQkFBZ0I7SUFDaEIscUJBQXFCO0lBQ3JCLGNBQWM7R0FDZjtDQUNGO0FBQ0Q7RUFDRSxvQkFBb0I7Q0FDckI7QUFDRDtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsaUJBQWlCO0NBQ2xCO0FBQ0Q7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztFQUNkLHVCQUF1QjtNQUNuQixvQkFBb0I7RUFDeEIsaUJBQWlCO01BQ2IsYUFBYTtDQUNsQjtBQUNEO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCwyQkFBMkI7TUFDdkIsdUJBQXVCO0NBQzVCO0FBQ0Q7RUFDRSxtQkFBbUI7RUFDbkIsMEJBQTBCO0VBQzFCLGFBQWE7RUFDYixtQkFBbUI7TUFDZixlQUFlO0VBQ25CLGFBQWE7RUFDYixlQUFlO0VBQ2YsMEJBQTBCO0VBQzFCLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLHVCQUF1QjtNQUNuQixvQkFBb0I7RUFDeEIscUJBQXFCO0VBQ3JCLGNBQWM7Q0FDZjtBQUNEO0VBQ0Usb0JBQW9CO0VBQ3BCLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsZ0JBQWdCO0NBQ2pCO0FBQ0Q7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsd0JBQXdCO0VBQ3hCLHlCQUF5QjtDQUMxQjtBQUNEO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCx1QkFBdUI7TUFDbkIsb0JBQW9CO0VBQ3hCLHNCQUFzQjtNQUNsQix3QkFBd0I7RUFDNUIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixZQUFZO0VBQ1osZUFBZTtFQUNmLG1CQUFtQjtNQUNmLGNBQWM7Q0FDbkJcIixcImZpbGVcIjpcIkN1cnJlbnRUYWxrcy5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiXFxuLmNvbnRhaW5lciB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyMjEyRTtcXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICMyNjNkNTA7XFxuICByZXNpemU6IGhvcml6b250YWw7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXgtd2lkdGg6IDE4MHB4O1xcbiAgbWluLXdpZHRoOiA2MHB4O1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAuMnMgZWFzZS1vdXQ7XFxuICAtby10cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2Utb3V0O1xcbiAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLW91dDtcXG59XFxuLmNvbnRhaW5lciAqIHtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLW91dDtcXG4gIC1vLXRyYW5zaXRpb246IGFsbCAuMnMgZWFzZS1vdXQ7XFxuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2Utb3V0O1xcbn1cXG46Z2xvYmFsKC5tb2JpbGUgLnJlc2l6YWJsZS1oYW5kbGUpIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuOmdsb2JhbCgubW9iaWxlKSAuY29udGFpbmVyLFxcbi5jb250YWluZXIubWluIHtcXG4gIG1pbi13aWR0aDogNjBweDtcXG4gIHdpZHRoOiA2MHB4O1xcbiAgbWF4LXdpZHRoOiA2MHB4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLyogVEFWQSBBUVVJIE5BIFNFWFRBIEZFSVJBICovXFxufVxcbjpnbG9iYWwoLm1vYmlsZSkgLmNvbnRhaW5lciAuY29udGFpbmVyLWhlYWRlciwgLmNvbnRhaW5lci5taW4gLmNvbnRhaW5lci1oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbjpnbG9iYWwoLm1vYmlsZSkgLmNvbnRhaW5lciAudGFsaywgLmNvbnRhaW5lci5taW4gLnRhbGsge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIH1cXG46Z2xvYmFsKC5tb2JpbGUpIC5jb250YWluZXIgLnRhbGsgLmNvdW50LCAuY29udGFpbmVyLm1pbiAudGFsayAuY291bnQge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB0b3A6IDBweDtcXG4gICAgICByaWdodDogLTVweDtcXG4gICAgfVxcbjpnbG9iYWwoLm1vYmlsZSkgLmNvbnRhaW5lciAudGFsazpob3ZlciwgLmNvbnRhaW5lci5taW4gLnRhbGs6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogIzBDMTUxRDtcXG59XFxuOmdsb2JhbCgubW9iaWxlKSAuY29udGFpbmVyIC51c2VyLCAuY29udGFpbmVyLm1pbiAudXNlciB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcbjpnbG9iYWwoLm1vYmlsZSkgLmNvbnRhaW5lciAudXNlciBzcGFuLCAuY29udGFpbmVyLm1pbiAudXNlciBzcGFuIHtcXG4gICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxuOmdsb2JhbCgubW9iaWxlKSAuY29udGFpbmVyIC50YWxrLWF2YXRhciwgLmNvbnRhaW5lci5taW4gLnRhbGstYXZhdGFyIHtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgbWFyZ2luOiAwO1xcblxcbiAgfVxcbi5jb250YWluZXIubWF4IHtcXG4gIG1pbi13aWR0aDogMTgwcHg7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA5OTFweCkge1xcbiAgLmNvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogNjBweCAhaW1wb3J0YW50O1xcbiAgfVxcbiAgLmNvbnRhaW5lci5tYXgge1xcbiAgICBtaW4td2lkdGg6IDYwcHg7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcbn1cXG4uY29udGFpbmVyLWhlYWRlciB7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG4uaGVhZGVyIHtcXG4gIGNvbG9yOiAjQThBQUI3O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuLnVzZXIge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXg6IDIgMSAwJTtcXG4gICAgICBmbGV4OiAyIDEgMCU7XFxufVxcbi5jdXJyZW50LXRhbGtzIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi50YWxrIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMzMTNkNGY7XFxuICBwYWRkaW5nOiA1cHg7XFxuICAtbXMtZmxleDogMSAwIDM4cHg7XFxuICAgICAgZmxleDogMSAwIDM4cHg7XFxuICBoZWlnaHQ6IDM4cHg7XFxuICBjb2xvcjogI2IyYjljNDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNzMxNDI7XFxuICBjb2xvcjogI2IyYjljNDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLnRhbGs6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogIzBDMTUxRDtcXG4gIGJvcmRlci1jb2xvcjogICMxMjIxMkU7XFxuICBjb2xvcjogIzJFQTJGODtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnRhbGstYXZhdGFyIHtcXG4gIHdpZHRoOiAyNHB4O1xcbiAgaGVpZ2h0OiAyNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgbWFyZ2luOiAxcHggMTBweCAwIDJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbn1cXG4uY291bnQge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICB3aWR0aDogMjBweDtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgLW1zLWZsZXg6IDAgMCAyMHB4O1xcbiAgICAgIGZsZXg6IDAgMCAyMHB4XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJjb250YWluZXJcIjogXCJDdXJyZW50VGFsa3MtY29udGFpbmVyLTNyRlNTXCIsXG5cdFwibWluXCI6IFwiQ3VycmVudFRhbGtzLW1pbi0ydy1XR1wiLFxuXHRcImNvbnRhaW5lci1oZWFkZXJcIjogXCJDdXJyZW50VGFsa3MtY29udGFpbmVyLWhlYWRlci0yLWw3clwiLFxuXHRcInRhbGtcIjogXCJDdXJyZW50VGFsa3MtdGFsay0zMVZtWlwiLFxuXHRcImNvdW50XCI6IFwiQ3VycmVudFRhbGtzLWNvdW50LTFjXzQ2XCIsXG5cdFwidXNlclwiOiBcIkN1cnJlbnRUYWxrcy11c2VyLWUwRVM1XCIsXG5cdFwidGFsay1hdmF0YXJcIjogXCJDdXJyZW50VGFsa3MtdGFsay1hdmF0YXItMW0xS29cIixcblx0XCJtYXhcIjogXCJDdXJyZW50VGFsa3MtbWF4LXlwYVpTXCIsXG5cdFwiaGVhZGVyXCI6IFwiQ3VycmVudFRhbGtzLWhlYWRlci0zZUViZlwiLFxuXHRcImN1cnJlbnQtdGFsa3NcIjogXCJDdXJyZW50VGFsa3MtY3VycmVudC10YWxrcy0xbVA0LVwiXG59OyIsImltcG9ydCB7XG4gIEdFVF9DSEFUX1JPT01TLFxuICBHRVRfQ0hBVF9ST09NU19TVUNDRVNTLFxuICBHRVRfQ0hBVF9ST09NU19FUlJPUixcbiAgR0VUX1NJTkdMRV9DSEFUX1JPT00sXG4gIEdFVF9TSU5HTEVfQ0hBVF9ST09NX0VSUk9SLFxuICBHRVRfU0lOR0xFX0NIQVRfUk9PTV9TVUNDRVNTLFxuICBTSE9XX0JBQ0tEUk9QLFxuICBTSE9XX1NJREVCQVIsXG4gIFNFTEVDVF9ST09NLFxuICBBRERfQ0hBVF9ST09NLFxuICBVUERBVEVfQ0hBVF9ST09NLFxuICBBRERfTUVTU0FHRV9UT19DSEFUX1JPT00sXG59IGZyb20gXCJhZG1pbi9jb25zdGFudHMvY2hhdFwiO1xuXG5pbXBvcnQgZ3FsIGZyb20gXCJncmFwaHFsLXRhZ1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0Um9vbShpZCkge1xuICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuXHRcdCAgIHR5cGU6IFNIT1dfQkFDS0RST1AsXG4gICAgfSk7XG5cbiAgICBkaXNwYXRjaCh7XG5cdFx0ICAgIHR5cGU6IFNFTEVDVF9ST09NLFxuXHRcdCAgICBwYXlsb2FkOiB7XG5cdFx0ICAgIFx0aWQsXG5cdFx0ICAgIH0sXG4gICAgfSk7XG5cbiAgICBkaXNwYXRjaCh7XG5cdFx0ICAgIHR5cGU6IFNIT1dfU0lERUJBUixcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJvb20ocm9vbSkge1xuICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuXHQgICAgICAgIHR5cGU6IEFERF9DSEFUX1JPT00sXG5cdCAgICAgICAgcGF5bG9hZDoge1xuXHQgICAgICAgIFx0cm9vbSxcblx0ICAgICAgICB9LFxuXHQgICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGF0Um9vbXMob2Zmc2V0LCBsaW1pdCkge1xuICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSwgeyBjbGllbnQgfSkgPT4ge1xuICAgIGRpc3BhdGNoKHtcblx0ICAgICAgICB0eXBlOiBHRVRfQ0hBVF9ST09NUyxcblx0ICAgIH0pO1xuXG5cdCAgICB0cnkge1xuXHQgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGNsaWVudC5xdWVyeSh7XG5cdCAgICAgICAgcXVlcnk6IGdxbGB7XG5cdFx0XHRcdFx0XHRnZXRDaGF0Um9vbXMge1xuXHRcdFx0XHRcdFx0ICAgIGlkXG5cdFx0XHRcdFx0XHQgICAgYmxvY2tlZFxuXHRcdFx0XHRcdFx0ICAgIGFyY2hpdmVkXG5cdFx0XHRcdFx0XHQgICAgY29sb3Jcblx0XHRcdFx0XHRcdCAgICB0b3RhbF9tZXNzYWdlc1xuXHRcdFx0XHRcdFx0ICAgIGNyZWF0ZWRfYXRcblx0XHRcdFx0XHRcdCAgICBsYXN0X21lc3NhZ2Uge1xuXHRcdFx0XHRcdFx0ICAgIFx0Ym9keVxuXHRcdFx0XHRcdFx0ICAgIFx0Y3JlYXRlZF9hdFxuXHRcdFx0XHRcdFx0ICAgIH1cblx0XHRcdFx0XHRcdCAgICBjdXN0b21lciB7XG5cdFx0XHRcdFx0XHQgICAgICBzZmlkXG5cdFx0XHRcdFx0XHQgICAgICBlbWFpbFxuXHRcdFx0XHRcdFx0ICAgICAgZmlyc3RfbmFtZVxuXHRcdFx0XHRcdFx0ICAgICAgbGFzdF9uYW1lXG5cdFx0XHRcdFx0XHQgICAgICBwaG9uZVxuXHRcdFx0XHRcdFx0ICAgICAgdHlwZV9fY1xuXHRcdFx0XHRcdFx0ICAgICAgYWNjb3VudF9pZFxuXHRcdFx0XHRcdFx0ICAgIH1cblx0XHRcdFx0XHRcdH1cblx0ICAgICAgICB9YCxcblx0ICAgICAgfSk7XG5cblx0ICAgICAgY29uc3QgeyBnZXRDaGF0Um9vbXMgfSA9IGRhdGE7XG5cblx0ICAgICAgZGlzcGF0Y2goe1xuXHQgICAgICAgIHR5cGU6IEdFVF9DSEFUX1JPT01TX1NVQ0NFU1MsXG5cdCAgICAgICAgcGF5bG9hZDoge1xuXHQgICAgICAgIFx0cm9vbXM6IGdldENoYXRSb29tcyxcblx0ICAgICAgICB9LFxuXHQgICAgICB9KTtcblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgIFx0Y29uc29sZS5lcnJvcihlKTtcblxuXHQgICAgXHRkaXNwYXRjaCh7XG5cdFx0ICAgICAgICB0eXBlOiBHRVRfQ0hBVF9ST09NU19FUlJPUixcblx0XHQgICAgICAgIHBheWxvYWQ6IHtcblx0XHRcdCAgICAgICAgZSxcblx0XHRcdCAgICB9LFxuXHRcdCAgICB9KTtcblx0ICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNpbmdsZUNoYXRSb29tKGlkKSB7XG4gIHJldHVybiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlLCB7IGNsaWVudCwgaGlzdG9yeSB9KSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuXHQgICAgICAgIHR5cGU6IEdFVF9TSU5HTEVfQ0hBVF9ST09NLFxuXHQgICAgfSk7XG5cblx0ICAgIHRyeSB7XG5cdCAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KHtcblx0ICAgICAgICBxdWVyeTogZ3FsYHF1ZXJ5IGdldFNpbmdsZUNoYXRSb29tKCRpZDogSUQhKSB7XG5cdFx0IFx0XHRcdFx0Z2V0U2luZ2xlQ2hhdFJvb20oaWQ6ICRpZCkge1xuXHRcdFx0XHRcdCAgICBpZFxuXHRcdFx0XHRcdCAgICBibG9ja2VkXG5cdFx0XHRcdFx0ICAgIGFyY2hpdmVkXG5cdFx0XHRcdFx0ICAgIGNvbG9yXG5cdFx0XHRcdFx0ICAgIHRvdGFsX21lc3NhZ2VzXG5cdFx0XHRcdFx0ICAgIGxhc3RfbWVzc2FnZSB7XG5cdFx0XHRcdFx0ICAgIFx0Ym9keVxuXHRcdFx0XHRcdCAgICBcdGNyZWF0ZWRfYXRcblx0XHRcdFx0XHQgICAgfVxuXHRcdFx0XHRcdCAgICBjdXN0b21lciB7XG5cdFx0XHRcdFx0ICAgICAgc2ZpZFxuXHRcdFx0XHRcdCAgICAgIGVtYWlsXG5cdFx0XHRcdFx0ICAgICAgZmlyc3RfbmFtZVxuXHRcdFx0XHRcdCAgICAgIGxhc3RfbmFtZVxuXHRcdFx0XHRcdCAgICAgIHBob25lXG5cdFx0XHRcdFx0ICAgICAgdHlwZV9fY1xuXHRcdFx0XHRcdCAgICAgIGFjY291bnRfaWRcblx0XHRcdFx0XHQgICAgfVxuXHRcdFx0XHRcdCAgICBtZXNzYWdlcyB7XG5cdFx0XHRcdFx0ICAgIFx0aWRcblx0XHRcdFx0XHRcdCAgICBib2R5XG5cdFx0XHRcdFx0XHQgICAgY3JlYXRlZF9hdFxuXHRcdFx0XHRcdFx0XHRcdGF1dG9tYXRlZFxuXHRcdFx0XHRcdFx0XHRcdGNsaV9yZWFkXG5cdFx0XHRcdFx0XHRcdFx0YWR2X3JlYWRcblx0XHRcdFx0XHRcdCAgICB1c2VyIHtcblx0XHRcdFx0XHRcdCAgICBcdGlkXG5cdFx0XHRcdFx0XHQgICAgXHRhdmF0YXJfcGF0aFxuXHRcdFx0XHRcdFx0ICAgIH1cblx0XHRcdFx0XHQgICAgfVxuXHRcdFx0XHQgIFx0fVxuICBcdFx0XHRcdH1gLFxuXHQgICAgICAgIHZhcmlhYmxlczoge1xuXHQgICAgICAgIFx0aWQsXG5cdCAgICAgICAgfSxcblx0ICAgICAgfSk7XG5cblx0ICAgICAgY29uc3QgeyBnZXRTaW5nbGVDaGF0Um9vbSB9ID0gZGF0YTtcblxuXHQgICAgICBkaXNwYXRjaCh7XG5cdCAgICAgICAgdHlwZTogQUREX0NIQVRfUk9PTSxcblx0ICAgICAgICBwYXlsb2FkOiB7XG5cdCAgICAgICAgXHRyb29tOiBnZXRTaW5nbGVDaGF0Um9vbSxcblx0ICAgICAgICB9LFxuXHQgICAgICB9KTtcblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgIFx0Y29uc29sZS5lcnJvcihlKTtcblxuXHQgICAgXHRkaXNwYXRjaCh7XG5cdFx0ICAgICAgICB0eXBlOiBHRVRfU0lOR0xFX0NIQVRfUk9PTV9FUlJPUixcblx0XHQgICAgICAgIHBheWxvYWQ6IHtcblx0XHRcdCAgICAgICAgZSxcblx0XHRcdCAgICB9LFxuXHRcdCAgICB9KTtcblx0ICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbE1lc3NhZ2VzRnJvbVJvb20oaWQsIHBhZ2luYXRpb24pIHtcbiAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUsIHsgY2xpZW50LCBoaXN0b3J5IH0pID0+IHtcblx0ICAgIHRyeSB7XG5cdCAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KHtcblx0ICAgICAgICBxdWVyeTogZ3FsYHF1ZXJ5IGdldE1lc3NhZ2VzRnJvbUNoYXRSb29tKCRpZDogSUQhLCAkcGFnaW5hdGlvbjogUGFnaW5hdGlvbikge1xuXHRcdCBcdFx0XHRcdGdldE1lc3NhZ2VzRnJvbUNoYXRSb29tKGlkOiAkaWQsIHBhZ2luYXRpb246ICRwYWdpbmF0aW9uKSB7XG5cdFx0XHRcdFx0ICAgIGlkXG5cdFx0XHRcdFx0ICAgIGJvZHlcblx0XHRcdFx0XHQgICAgY3JlYXRlZF9hdFxuXHRcdFx0XHRcdFx0XHRhdXRvbWF0ZWRcblx0XHRcdFx0XHRcdFx0Y2xpX3JlYWRcblx0XHRcdFx0XHRcdFx0YWR2X3JlYWRcblx0XHRcdFx0XHRcdCAgdXNlciB7XG5cdFx0XHRcdFx0XHQgICAgaWRcblx0XHRcdFx0XHRcdCAgICBhdmF0YXJfcGF0aFxuXHRcdFx0XHRcdFx0ICB9XG5cdFx0XHRcdFx0ICB9XG5cdCAgXHRcdFx0fWAsXG4gICAgICAgIFx0dmFyaWFibGVzOiB7XG5cdCAgICAgICAgXHRpZCxcblx0ICAgICAgICBcdHBhZ2luYXRpb24sXG5cdCAgICAgICAgfSxcblx0ICAgICAgfSk7XG5cblx0ICAgICAgY29uc3QgeyBnZXRNZXNzYWdlc0Zyb21DaGF0Um9vbSB9ID0gZGF0YTtcblxuXHQgICAgICBjb25zdCByb29tID0ge1xuXHQgICAgICAgIGlkLFxuXHQgICAgICAgIG1lc3NhZ2VzOiBnZXRNZXNzYWdlc0Zyb21DaGF0Um9vbSxcblx0ICAgICAgfTtcblxuXHQgICAgICBkaXNwYXRjaCh7XG5cdCAgICAgICAgdHlwZTogVVBEQVRFX0NIQVRfUk9PTSxcblx0ICAgICAgICBwYXlsb2FkOiB7XG5cdCAgICAgICAgXHRyb29tLFxuXHQgICAgICAgIH0sXG5cdCAgICAgIH0pO1xuXHQgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgXHRjb25zb2xlLmVycm9yKGUpO1xuXG5cdCAgICBcdGRpc3BhdGNoKHtcblx0XHQgICAgICAgIHR5cGU6IEdFVF9TSU5HTEVfQ0hBVF9ST09NX0VSUk9SLFxuXHRcdCAgICAgICAgcGF5bG9hZDoge1xuXHRcdFx0ICAgICAgICBlLFxuXHRcdFx0ICAgIH0sXG5cdFx0ICAgIH0pO1xuXHQgICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTWVzc2FnZSh7IHJvb21JZCwgbWVzc2FnZSB9KSB7XG4gIHJldHVybiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcblx0ICAgICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogQUREX01FU1NBR0VfVE9fQ0hBVF9ST09NLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICByb29tSWQsXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9DaGF0LmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9DaGF0LmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtNCEuL0NoYXQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZU1lc3NhZ2VzLCBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSBcInJlYWN0LWludGxcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gXCJpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlc1wiO1xuaW1wb3J0IHMgZnJvbSBcIi4vQ2hhdC5jc3NcIjtcbi8vIGltcG9ydCBGaWx0ZXJzIGZyb20gXCIuLi9maWx0ZXJzXCI7XG4vLyBpbXBvcnQgU2lkZWJhciBmcm9tIFwiLi4vU2lkZWJhclwiO1xuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IGN4IGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgQ2hhdEluc3BlY3RvciBmcm9tIFwiLi9DaGF0SW5zcGVjdG9yXCI7XG5pbXBvcnQgQ3VycmVudFRhbGtzIGZyb20gXCIuL0N1cnJlbnRUYWxrc1wiO1xuaW1wb3J0IENoYXRIaXN0b3J5IGZyb20gXCIuL0NoYXRIaXN0b3J5XCI7XG5pbXBvcnQgQ2hhdFJvb20gZnJvbSBcIi4vQ2hhdFJvb21cIjtcbi8vIGltcG9ydCB7IHN1YnNjcmliZU5ld0NoYXRSb29tcyB9IGZyb20gJy4uLy4uLy4uL3JlZHV4L2FjdGlvbnMvY2hhdCc7XG5cbi8qIDxkaXYgY2xhc3NOYW1lPXtjeCgnZHJvcGRvd24nLCBzLmRyb3Bkb3duKX0+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidG4gZHJvcGRvd24tdG9nZ2xlXCJ9IHR5cGU9XCJidXR0b25cIiBpZD1cImZpbHRlcjJcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgPHNwYW4+VXNlcjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17XCJkcm9wZG93bi1tZW51XCJ9IGFyaWEtbGFiZWxsZWRieT1cImZpbHRlcjJcIj5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJkcm9wZG93bi1oZWFkZXJcIn0+VHlwZSBvZiBVc2VyPC9saT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJkcm9wZG93bi1pdGVtXCJ9PjxhIGhyZWY9XCIjXCI+QWxsPC9hPjwvbGk+XG4gICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e1wiZHJvcGRvd24taXRlbVwifT48YSBocmVmPVwiI1wiPlJlZ2lzdGVyZWQ8L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJkcm9wZG93bi1pdGVtXCJ9PjxhIGhyZWY9XCIjXCI+VW5yZWdpc3RlcmVkPC9hPjwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KCdkcm9wZG93bicsIHMuZHJvcGRvd24pfT5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImJ0biBkcm9wZG93bi10b2dnbGVcIn0gdHlwZT1cImJ1dHRvblwiIGlkPVwiZmlsdGVyM1wiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8c3Bhbj5Db2xvcjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17XCJkcm9wZG93bi1tZW51XCJ9IGFyaWEtbGFiZWxsZWRieT1cImZpbHRlcjNcIj5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJkcm9wZG93bi1oZWFkZXJcIn0+Q29sb3I8L2xpPlxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtcImRyb3Bkb3duLWl0ZW1cIn0+PGEgaHJlZj1cIiNcIj5BbGw8L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJkcm9wZG93bi1pdGVtXCJ9PjxhIGhyZWY9XCIjXCI+UmVnaXN0ZXJlZDwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtcImRyb3Bkb3duLWl0ZW1cIn0+PGEgaHJlZj1cIiNcIj5Bbm5vbnltb3VzPC9hPjwvbGk+XG4gICAgICAgICAgICA8L3VsPiAgIFxuICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goJ2Ryb3Bkb3duJywgcy5kcm9wZG93bil9PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wiYnRuIGRyb3Bkb3duLXRvZ2dsZVwifSB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJmaWx0ZXI0XCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgIDxzcGFuPkRldmljZTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17XCJkcm9wZG93bi1tZW51XCJ9IGFyaWEtbGFiZWxsZWRieT1cImZpbHRlcjRcIj5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJkcm9wZG93bi1pdGVtXCJ9PjxhIGhyZWY9XCIjXCI+TW9iaWxlPC9hPjwvbGk+XG4gICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e1wiZHJvcGRvd24taXRlbVwifT48YSBocmVmPVwiI1wiPkJyb3dzZXI8L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJkcm9wZG93bi1kaXZpZGVyXCJ9PjwvbGk+XG4gICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e1wiZHJvcGRvd24taXRlbVwifT48YSBocmVmPVwiI1wiPmlPUzwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtcImRyb3Bkb3duLWl0ZW1cIn0+PGEgaHJlZj1cIiNcIj5BbmRyb2lkPC9hPjwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIFxuICAgICAgICAgIDxGaWx0ZXJzIHNlYXJjaElucHV0PXtlbCA9PiB0aGlzLnNlYXJjaCA9IGVsfSBoYW5kbGVDaGFuZ2U9e2hhbmRsZUNoYW5nZX0gZmlsdGVycz17ZmlsdGVyc30gY2xlYXJGaWx0ZXI9e2NsZWFyRmlsdGVyfSBhY3RpdmVGaWx0ZXJzPXthY3RpdmVGaWx0ZXJzfSBvblNlbGVjdEZpbHRlcj17b25TZWxlY3RGaWx0ZXJ9IC8+XG4gICAgICAgICAgXG4gICAgICAgICAgKi9cblxuY29uc3QgQ2hhdE1hbmFnZXIgPSAoeyByb29tcywgZmlsdGVycywgaGFuZGxlQ2hhbmdlLCBjbGVhckZpbHRlciwgYWN0aXZlRmlsdGVycywgb25TZWxlY3RGaWx0ZXIgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT17c1tcImJvZHktd3JhcHBlclwiXX0+XG4gICAgXG4gICAgPENoYXRIaXN0b3J5IHJvb21zPXtyb29tc30gLz5cbiAgPC9kaXY+XG4pO1xuXG5jbGFzcyBDaGF0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaDogXCJcIixcbiAgICAgIGZpbHRlcnM6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3RGaWx0ZXIgPSB0aGlzLmhhbmRsZVNlbGVjdEZpbHRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xlYXJGaWx0ZXIgPSB0aGlzLmNsZWFyRmlsdGVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UoZXYpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoOiB0aGlzLnNlYXJjaC52YWx1ZSB9KTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdEZpbHRlcihldiwgeyBrZXksIGlkIH0pIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgZmlsdGVyczogeyBba2V5XTogaWQgfSB9KTtcbiAgfVxuXG5cbiAgY2xlYXJGaWx0ZXIoZXYsIHsga2V5IH0pIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZpbHRlcnM6IF8ucmVkdWNlKHRoaXMuc3RhdGUuZmlsdGVycywgKGZpbHRlciwgdmFsdWUsIGZpbHRlcktleSkgPT4ge1xuICAgICAgICBpZiAoZmlsdGVyS2V5ICE9PSBrZXkpIHtcbiAgICAgICAgICBmaWx0ZXJbZmlsdGVyS2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgICB9LCB7fSksXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpc01hbmFnZXIsIHNob3dDaGF0SW5zcGVjdG9yLCBzZWxlY3RlZFJvb21JZCwgcm9vbXMsIHJvb20gfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBmaWx0ZXJzQXZhaWxhYmxlID0gW1xuICAgICAgLy8ge1xuICAgICAgLy8gICBsYWJlbDogJ3JvbGUnLFxuICAgICAgLy8gICBrZXk6ICdyb2xlSWQnLFxuICAgICAgLy8gICBvcHRpb25zOiByb2xlcyxcbiAgICAgIC8vICAgdHlwZTogJ2Ryb3Bkb3duJ1xuICAgICAgLy8gfVxuICAgIF07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e1wid3JhcHBlci1jb250YWluZXJcIn0+XG5cbiAgICAgICAgPEN1cnJlbnRUYWxrcyAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImJvZHlcIn0+XG4gICAgICAgICAgeyAoaXNNYW5hZ2VyKSA/XG4gICAgICAgICAgICA8Q2hhdE1hbmFnZXJcbiAgICAgICAgICAgICAgcm9vbXM9e3Jvb21zfVxuICAgICAgICAgICAgICBoYW5kbGVDaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICBmaWx0ZXJzPXtmaWx0ZXJzQXZhaWxhYmxlfVxuICAgICAgICAgICAgICBhY3RpdmVGaWx0ZXJzPXt0aGlzLnN0YXRlLmZpbHRlcnN9XG4gICAgICAgICAgICAgIGNsZWFyRmlsdGVyPXt0aGlzLmNsZWFyRmlsdGVyfVxuICAgICAgICAgICAgICBvblNlbGVjdEZpbHRlcj17dGhpcy5oYW5kbGVTZWxlY3RGaWx0ZXJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgOlxuICAgICAgICAgICAgPENoYXRSb29tIGN1cnJlbnRSb3V0ZT17dGhpcy5wcm9wcy5jdXJyZW50Um91dGV9IGlkPXtyb29tLmlkfSBjb252ZXJzYXRpb249e3Jvb20ubWVzc2FnZXN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgIFxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogXG4gKiBcbiAqIDxTaWRlYmFyIGNsYXNzTmFtZT17Y3goKGlzTWFuYWdlcikgPyBcIm1hbmFnZXItc2lkZWJhclwiIDogXCJyb29tLXNpZGViYXJcIil9IGZpeGVkPXshKGlzTWFuYWdlcil9IHNob3c9e3Nob3dDaGF0SW5zcGVjdG9yfT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoaXNNYW5hZ2VyICYmIHNlbGVjdGVkUm9vbUlkKSA/IDxDaGF0SW5zcGVjdG9yIGlkPXtzZWxlY3RlZFJvb21JZH0gaXNNYW5hZ2VyPXtpc01hbmFnZXJ9IC8+IDogbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoIWlzTWFuYWdlciAmJiByb29tLmlkKSA/IDxDaGF0SW5zcGVjdG9yIGlkPXtyb29tLmlkfSBpc01hbmFnZXI9e2lzTWFuYWdlcn0gLz4gOiBudWxsXG4gICAgICAgICAgfVxuICAgICAgICA8L1NpZGViYXI+XG4qL1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoe1xuICByb29tczogW10sXG4gIHNlbGVjdGVkUm9vbUlkOiBudWxsLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCB7IH0pKHdpdGhTdHlsZXMocykoQ2hhdCkpO1xuXG4iLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtNCEuL0NoYXRIaXN0b3J5LmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9DaGF0SGlzdG9yeS5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9DaGF0SGlzdG9yeS5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGRlZmluZU1lc3NhZ2VzLCBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL0NoYXRIaXN0b3J5LmNzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgYXZhdGFyIGZyb20gJy4uL2dmeC9hdmF0YXIucG5nJztcbmltcG9ydCBoaXN0b3J5IGZyb20gJ2NvcmUvaGlzdG9yeSc7IFxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHNlbGVjdFJvb20sIGFkZFJvb20gfSBmcm9tICdhZG1pbi9hY3Rpb25zL2NoYXQnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xuXG5jb25zdCBtZXNzYWdlcyA9IGRlZmluZU1lc3NhZ2VzKHtcbiAgZ2VuZXJhbDoge1xuICAgIGlkOiAnc2V0dGluZ3MuZ2VuZXJhbFNldHRpbmdzLmhlYWRlcicsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdHZW5lcmFsJyxcbiAgICBkZXNjcmlwdGlvbjogJ3NldHRpbmdzLmdlbmVyYWxTZXR0aW5ncy5oZWFkZXInLFxuICB9LFxuICBzaXRlVGl0bGU6IHtcbiAgICBpZDogJ3NldHRpbmdzLmdlbmVyYWxTZXR0aW5ncy5maWVsZC5zaXRlVGl0bGUnLFxuICAgIGRlZmF1bHRNZXNzYWdlOiAnU2l0ZSB0aXRsZScsXG4gICAgZGVzY3JpcHRpb246ICdzZXR0aW5ncy5nZW5lcmFsU2V0dGluZ3MuZmllbGQuc2l0ZVRpdGxlJyxcbiAgfSxcbiAgc2l0ZURlc2NyaXB0aW9uOiB7XG4gICAgaWQ6ICdzZXR0aW5ncy5nZW5lcmFsU2V0dGluZ3MuZmllbGQuc2l0ZURlc2NyaXB0aW9uJyxcbiAgICBkZWZhdWx0TWVzc2FnZTogJ0Rlc2NyaXB0aW9uJyxcbiAgICBkZXNjcmlwdGlvbjogJ3NldHRpbmdzLmdlbmVyYWxTZXR0aW5ncy5maWVsZC5zaXRlRGVzY3JpcHRpb24nLFxuICB9LFxuICBzaXRlRGVmYXVsdEVtYWlsOiB7XG4gICAgaWQ6ICdzZXR0aW5ncy5nZW5lcmFsU2V0dGluZ3MuZmllbGQuc2l0ZURlZmF1bHRFbWFpbCcsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdEZWZhdWx0IGVtYWlsJyxcbiAgICBkZXNjcmlwdGlvbjogJ3NldHRpbmdzLmdlbmVyYWxTZXR0aW5ncy5maWVsZC5zaXRlRGVmYXVsdEVtYWlsJyxcbiAgfSxcbiAgc2F2ZToge1xuICAgIGlkOiAnYWN0aW9ucy5zYXZlJyxcbiAgICBkZWZhdWx0TWVzc2FnZTogJ1NhdmUnLFxuICAgIGRlc2NyaXB0aW9uOiAnYWN0aW9ucy5zYXZlJyxcbiAgfSxcbn0pO1xuXG5cbmNsYXNzIENoYXRIaXN0b3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHsgY2xpZW50OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQgfTtcbiAgb2Zmc2V0ID0gNDAwO1xuICBjaHVua1NpemUgPSAyMDtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuaW5zcGVjdFJvb20gPSB0aGlzLmluc3BlY3RSb29tLmJpbmQodGhpcyk7XG4gICAgLy8gdGhpcy5vblNjcm9sbFRvQm90dG9tID0gdGhpcy5vblNjcm9sbFRvQm90dG9tLmJpbmQodGhpcyk7XG4gICAgdGhpcy50b2dnbGVTb3J0QnkgPSB0aGlzLnRvZ2dsZVNvcnRCeS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub3BlblJvb20gPSB0aGlzLm9wZW5Sb29tLmJpbmQodGhpcyk7XG4gICAgdGhpcy50aW1lb3V0SUQgPSBudWxsO1xuICAgIHRoaXMuZGVsYXkgPSAyNTA7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHByZWRpY2F0ZTogJ3RpbWVhZ28nLFxuICAgICAgb3JkZXI6IHRydWUsIC8vIGZhbHNlIC0+IGFzYyB8IHRydWUgLT4gZGVzY1xuICAgIH07XG5cbiAgICAvLyB0aGlzLnJvb21zID0gXy5vcmRlckJ5KHByb3BzLnJvb21zLCBbdGhpcy5zdGF0ZS5wcmVkaWNhdGVdLCBbdGhpcy5zdGF0ZS5vcmRlcl0pO1xuXG4gIH1cblxuICBvcGVuUm9vbShpZCkge1xuICAgIGhpc3RvcnkucHVzaChgL2NoYXQvJHtpZH1gKTtcbiAgfVxuXG4gIGluc3BlY3RSb29tKGlkKSB7XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RSb29tKGlkKTtcbiAgfVxuXG4gIHRvZ2dsZVNvcnRCeShlLCBwcmVkaWNhdGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5wcmVkaWNhdGUgPT09IHByZWRpY2F0ZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9yZGVyOiAhdGhpcy5zdGF0ZS5vcmRlciB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgcHJlZGljYXRlOiBwcmVkaWNhdGUgfSlcbiAgICB9XG5cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgY29uc29sZS5sb2codGhpcy5jb250ZXh0KTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzKTtcbiAgICB0aGlzLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgc3Vic2NyaWJlKCl7XG4gICAgY29uc3QgeyBjbGllbnQgfSA9IHRoaXMuY29udGV4dDtcbiAgICBjb25zdCB7IGFkZFJvb20gfSA9IHRoaXMucHJvcHM7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbk9ic2VydmVyID0gY2xpZW50LnN1YnNjcmliZSh7XG4gICAgICBxdWVyeTogZ3FsYFxuICAgICAgICBzdWJzY3JpcHRpb24ge1xuICAgICAgICAgICAgbmV3Um9vbSB7XG4gICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgIGJsb2NrZWRcbiAgICAgICAgICAgICAgYXJjaGl2ZWRcbiAgICAgICAgICAgICAgY29sb3JcbiAgICAgICAgICAgICAgdG90YWxfbWVzc2FnZXNcbiAgICAgICAgICAgICAgbGFzdF9tZXNzYWdlIHtcbiAgICAgICAgICAgICAgICBib2R5XG4gICAgICAgICAgICAgICAgY3JlYXRlZF9hdFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGN1c3RvbWVyIHtcbiAgICAgICAgICAgICAgICBzZmlkXG4gICAgICAgICAgICAgICAgZW1haWxcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lXG4gICAgICAgICAgICAgICAgcGhvbmVcbiAgICAgICAgICAgICAgICB0eXBlX19jXG4gICAgICAgICAgICAgICAgYWNjb3VudF9pZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgYCxcbiAgICB9KS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dChkYXRhKSB7XG4gICAgICAgIGFkZFJvb20oZGF0YS5uZXdSb29tKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcihlcnIpIHsgY29uc29sZS5lcnJvcignZXJyJywgZXJyKTsgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGUsIGlkKSB7XG5cbiAgICBpZiAoIXRoaXMudGltZW91dElEKSB7XG4gICAgICAgIHRoaXMudGltZW91dElEID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluc3BlY3RSb29tKGlkKVxuICAgICAgICAgICAgdGhpcy50aW1lb3V0SUQgPSBudWxsXG4gICAgICAgIH0sIHRoaXMuZGVsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGltZW91dElEID0gY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElEKTtcbiAgICAgICAgdGhpcy5vcGVuUm9vbShpZClcbiAgICB9XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IHJvb21zID0gXy5vcmRlckJ5KHRoaXMucHJvcHMucm9vbXMsIFt0aGlzLnN0YXRlLnByZWRpY2F0ZV0sIFsodGhpcy5zdGF0ZS5vcmRlcikgPyAnZGVzYycgOiAnYXNjJ10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydtYWluLWNvbnRhaW5lciddfT5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snY29udGVudCddfT5cbiAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXtjeChzWyd0YWJsZSddKX0+XG4gICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPXtzLmNvbG9yfT48L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT17cy5hdmF0YXJ9PjwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPXtjeChzLnVzZXIsICdoaWRkZW4teHMtZG93bicpfT5OYW1lPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e2N4KHMubGFzdG1zZyl9Pkxhc3QgTWVzc2FnZTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPXtjeChzLmNvdW50LCAnaGlkZGVuLWxnLWRvd24nKX0+VG90YWwgTWVzc2FnZXM8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT17Y3gocy5jb3VudHJ5LCAnaGlkZGVuLXNtLWRvd24nKX0+TG9jYXRpb248L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT17Y3gocy5kZXZpY2UsICdoaWRkZW4tc20tZG93bicpfT5EZXZpY2U8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnRvZ2dsZVNvcnRCeShlLCAndGltZWFnbycpfSBjbGFzc05hbWU9e2N4KHMudGltZWFnbywgJ2hpZGRlbi14cy1kb3duJywgcy5jbGlja2FibGUsICh0aGlzLnN0YXRlLnByZWRpY2F0ZSA9PT0gJ3RpbWVhZ28nKSA/IHMuY3VycmVudCA6ICcnLCh0aGlzLnN0YXRlLnByZWRpY2F0ZSA9PT0gJ3RpbWVhZ28nICYmIHRoaXMuc3RhdGUub3JkZXIpID8gcy5kZXNjIDogcy5hc2MpfT48c3Bhbj5UaW1lPC9zcGFuPjwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgPHRib2R5PlxuXG4gICAgICAgICAgICAgICAgeyByb29tcy5tYXAoKHJvb20pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb29tLnRvdGFsX21lc3NhZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e3Jvb20uaWR9IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZUNsaWNrKGUsIHJvb20uaWQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17cy5jb2xvcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ2NoYXQtY29sb3InXX0gc3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6IHJvb20uY29sb3IgfHwgJ2dyZXknIH19PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXtzLmF2YXRhcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3RhYmxlLWF2YXRhciddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPXtzWydjaGF0LWF2YXRhciddfSBzcmM9e2F2YXRhcn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17Y3gocy51c2VyLCAnaGlkZGVuLXhzLWRvd24nKX0+eyAocm9vbS5jdXN0b21lcikgPyBgJHtyb29tLmN1c3RvbWVyLmZpcnN0X25hbWV9ICR7cm9vbS5jdXN0b21lci5sYXN0X25hbWV9YCA6IG51bGwgfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9e2N4KHMubGFzdG1zZyl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyByb29tLmxhc3RfbWVzc2FnZS5ib2R5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17Y3gocy5jb3VudCwgJ2hpZGRlbi1sZy1kb3duJyl9Pnsgcm9vbS50b3RhbF9tZXNzYWdlcyB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17Y3gocy5jb3VudHJ5LCAnaGlkZGVuLXNtLWRvd24nKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KCdmYW1mYW1mYW0tZmxhZ3MnKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJvb21bcm9vbUlkXS5sb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17Y3gocy5kZXZpY2UsICdoaWRkZW4tc20tZG93bicpfT5BbmRyb2lkPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17Y3gocy50aW1lYWdvLCAnaGlkZGVuLXhzLWRvd24nKX0+eyAocm9vbS5sYXN0X21lc3NhZ2UuY3JlYXRlZF9hdCkgPyBtb21lbnQocm9vbS5sYXN0X21lc3NhZ2UuY3JlYXRlZF9hdCkuZnJvbU5vdygpIDogbnVsbCB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuLy8gY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe1xuLy8gICByb29tczogc3RhdGUuY2hhdC5yb29tcyxcbi8vIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIHsgc2VsZWN0Um9vbSwgYWRkUm9vbSB9KSh3aXRoU3R5bGVzKHMpKENoYXRIaXN0b3J5KSk7IiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9DaGF0SW5zcGVjdG9yLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9DaGF0SW5zcGVjdG9yLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtNCEuL0NoYXRJbnNwZWN0b3IuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBkZWZpbmVNZXNzYWdlcywgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9DaGF0SW5zcGVjdG9yLmNzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7IFxuaW1wb3J0IGF2YXRhciBmcm9tICcuLi9nZngvYXZhdGFyLnBuZyc7XG5pbXBvcnQgaGlzdG9yeSBmcm9tICdjb3JlL2hpc3RvcnknO1xuaW1wb3J0IFBsdXNDaXJjbGUgZnJvbSAncmVhY3QtZmVhdGhlci9kaXN0L2ljb25zL3BsdXMtY2lyY2xlJzsgXG5pbXBvcnQgTW9yZUhvcml6b250YWwgZnJvbSAncmVhY3QtZmVhdGhlci9kaXN0L2ljb25zL21vcmUtaG9yaXpvbnRhbCc7IFxuaW1wb3J0IFVzZXIgZnJvbSAncmVhY3QtZmVhdGhlci9kaXN0L2ljb25zL3VzZXInOyBcbmltcG9ydCBTaGllbGQgZnJvbSAncmVhY3QtZmVhdGhlci9kaXN0L2ljb25zL3NoaWVsZCc7IFxuaW1wb3J0IFBhY2thZ2UgZnJvbSAncmVhY3QtZmVhdGhlci9kaXN0L2ljb25zL3BhY2thZ2UnOyBcbi8vIGltcG9ydCBOYXZJdGVtIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvTmF2QmFyL05hdkl0ZW0nO1xuaW1wb3J0ICogYXMgRmlsZVR5cGVzU3ZnIGZyb20gJ3JlYWN0LWV4dGVuc2lvbnMtc3ZnJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBmaW5kLCBjYXBpdGFsaXplIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IG1lc3NhZ2VzID0gZGVmaW5lTWVzc2FnZXMoe1xuICBhY2NvdW50OiB7XG4gICAgaWQ6ICdjaGF0aW5zcGVjdG9yLmhlYWRlci5hY3Rpb24uYWNjb3VudCcsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdBY2NvdW50JyxcbiAgICBkZXNjcmlwdGlvbjogJ1Jvb20gSW5zcGVjdG9yIGRyb3Bkb3duIHVzZXIgYWNjb3VudCcsXG4gIH0sXG5cbiAgYXJjaGl2ZToge1xuICAgIGlkOiAnY2hhdGluc3BlY3Rvci5oZWFkZXIuYWN0aW9uLmFyY2hpdmUnLFxuICAgIGRlZmF1bHRNZXNzYWdlOiAnQXJjaGl2ZScsXG4gICAgZGVzY3JpcHRpb246ICdSb29tIEluc3BlY3RvciBkcm9wZG93biBhcmNoaXZlIGNvbnZlcnNhdGlvbicsXG4gIH0sXG5cbiAgYmxvY2s6IHtcbiAgICBpZDogJ2NoYXRpbnNwZWN0b3IuaGVhZGVyLmFjdGlvbi5ibG9jaycsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdCbG9jaycsXG4gICAgZGVzY3JpcHRpb246ICdSb29tIEluc3BlY3RvciBkcm9wZG93biBibG9jayBjb21tdW5pY2F0aW9ucycsXG4gIH0sXG5cbiAgb3BlblJvb206IHtcbiAgICBpZDogJ2NoYXRpbnNwZWN0b3IuYWN0aW9ucy5vcGVucm9vbScsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdPcGVuIENvbnZlcnNhdGlvbicsXG4gICAgZGVzY3JpcHRpb246ICdBY3Rpb24gb24gY2hhdCBpbnNwZWN0b3IgdG8gam9pbiBjb252ZXJzYXRpb24nLFxuICB9LFxuXG4gIGdvQmFjazoge1xuICAgIGlkOiAnY2hhdGluc3BlY3Rvci5hY3Rpb25zLmdvYmFjaycsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdHbyBCYWNrJyxcbiAgICBkZXNjcmlwdGlvbjogJ1JldHVybiB0byBjaGF0IGhpc3RvcnknLFxuICB9LFxuXG59KTtcblxuY29uc3QgcXVpY2tBY3Rpb25zID0gW1xuICB7XG4gICAgdG86ICcvbmV3JyxcbiAgICBsYWJlbDogbWVzc2FnZXMuYWNjb3VudCxcbiAgICBpY29uOiA8VXNlciBjb2xvcj1cIiNGRkZGRkZcIiAvPixcbiAgICBjbGFzczogJ2luZm8nLFxuICB9LFxuICB7XG4gICAgdG86ICcvbmV3JyxcbiAgICBsYWJlbDogbWVzc2FnZXMuYXJjaGl2ZSxcbiAgICBpY29uOiA8UGFja2FnZSBjb2xvcj1cIiNGRkZGRkZcIiAvPixcbiAgfSxcbiAge1xuICAgIHRvOiAnL25ldycsXG4gICAgbGFiZWw6IG1lc3NhZ2VzLmJsb2NrLFxuICAgIGljb246IDxTaGllbGQgY29sb3I9XCIjRkZGRkZGXCIgLz4sXG4gICAgY2xhc3M6ICdkYW5nZXInXG4gIH1cbl07XG5cbmNvbnN0IFJlbmRlckV4dGVuc2lvbkljb24gPSAoeyBleHRlbnNpb24gfSkgPT4ge1xuXG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGNvbG9yOiAnI0ZGRkZGRicsXG4gICAgc2l6ZTogJzMycHgnXG4gIH07XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZVR5cGVzU3ZnW2NhcGl0YWxpemUoZXh0ZW5zaW9uKV0sIHByb3BzKTtcblxufSBcblxuY2xhc3MgQ2hhdEluc3BlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMub3BlblJvb20gPSB0aGlzLm9wZW5Sb29tLmJpbmQodGhpcyk7XG4gIH1cblxuICBvcGVuUm9vbShlLCBpZCkge1xuICAgIGhpc3RvcnkucHVzaChgL2NoYXQvJHtpZH1gKVxuICB9XG5cbiAgZ29CYWNrKCkge1xuICAgIGhpc3RvcnkuZ29CYWNrKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IHsgaWQsIHJvb21zLCBpc01hbmFnZXJ9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHJvb20gPSBfLmZpbmQocm9vbXMsIHsgaWQ6IGlkIH0pO1xuICAgIC8vIGNvbnN0IHJvb20gPSByb29tc1tpZF07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3MuaW5zcGVjdG9yfT5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydjb250YWluZXItaGVhZGVyJ119PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWyd0YWJsZS1hdmF0YXInXX0+XG4gICAgICAgICAgICB7IC8qIDxkaXYgY2xhc3NOYW1lPXtzWydjaGF0LWNvbG9yJ119IHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOiByb29tLmNvbG9yIHx8ICdncmV5J319PjwvZGl2PiAqLyB9XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT17c1snY2hhdC1hdmF0YXInXX0gc3JjPXthdmF0YXJ9Lz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy51c2VybmFtZX0+XG4gICAgICAgICAgICA8aDM+eyhyb29tLmN1c3RvbWVyKSA/IHJvb20uY3VzdG9tZXIuZmlyc3RfbmFtZSArICcgJyArIHJvb20uY3VzdG9tZXIubGFzdF9uYW1lIDogbnVsbH08L2gzPlxuICAgICAgICAgICAgeyAvKiA8c3Bhbj57cm9vbS5jdXN0b21lci51c2VybmFtZX08L3NwYW4+Ki8gfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeChzLmFjdGlvbnMsICdkcm9wZG93bicpfT5cblxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtjeCgnZHJvcGRvd24tdG9nZ2xlJywgJ25vLWNhcmV0Jyl9IGlkPSdyb29tLWFjdGlvbnMnIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8TW9yZUhvcml6b250YWwgY29sb3I9XCIjRkZGRkZGXCIgLz5cbiAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17Y3goJ2Ryb3Bkb3duLW1lbnUnLCAnZHJvcGRvd24tbWVudS1yaWdodCcpfSBhcmlhLWxhYmVsbGVkYnk9J3Jvb20tYWN0aW9ucyc+XG5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJkcm9wZG93bi1oZWFkZXJcIn0+Um9vbSBBY3Rpb25zPC9saT5cbiAgICAgICAgICAgICAgeyBxdWlja0FjdGlvbnMubWFwKChpdGVtLCBpbmRleCkgPT4gPGxpIGNsYXNzTmFtZT17J2Ryb3Bkb3duLWl0ZW0nfSBrZXk9e2luZGV4fT48YSBocmVmPXtpdGVtLnRvfSBjbGFzc05hbWU9e2l0ZW0uY2xhc3N9PntpdGVtLmljb259PEZvcm1hdHRlZE1lc3NhZ2Ugey4uLml0ZW0ubGFiZWx9IC8+PC9hPjwvbGk+KSB9XG4gICAgICAgICAgICA8L3VsPlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydjb250YWluZXItY29udGVudCddfT5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydpbmZvJ119PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ2luZm8tbGluZSddfT5cbiAgICAgICAgICAgICAgPGxhYmVsPkVtYWlsPC9sYWJlbD5cbiAgICAgICAgICAgICAgPHNwYW4+eyAocm9vbS5jdXN0b21lcikgPyByb29tLmN1c3RvbWVyLmVtYWlsIDogbnVsbCB9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snaW5mby1saW5lJ119PlxuICAgICAgICAgICAgICA8bGFiZWw+UGhvbmU8L2xhYmVsPlxuICAgICAgICAgICAgICA8c3Bhbj4zMTAyOTE4MjIzPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+IFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ2luZm8tbGluZSddfT4gXG4gICAgICAgICAgICAgIDxsYWJlbD5Mb2NhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIHsgLypcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y3gocy5mbGFnLCAnZmFtZmFtZmFtLWZsYWdzJywgcm9vbS5jb3VudHJ5LnRvTG93ZXJDYXNlKCkpfT48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3Jvb20ubG9jYXRpb259XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snaW5mby1saW5lJ119PlxuICAgICAgICAgICAgICA8bGFiZWw+VVVJRDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzcGFuPjc2QVNEQUc2RDdBUzZLSkpBT0kwOTlBTEtBUzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ25vdGVzJ119PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snaW5mby1saW5lJ119PlxuICAgICAgICAgICAgICA8bGFiZWw+Tm90ZXM8L2xhYmVsPlxuICAgICAgICAgICAgICA8c3Bhbj57ICh0aGlzLnByb3BzLm5vdGVzICYmIHRoaXMucHJvcHMubm90ZXMubGVuZ3RoKSA/IHRoaXMucHJvcHMubm90ZXMubGVuZ3RoIDogJ1RoZXJlcyBubyBub3RlcyB5ZXQnIH08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KFwiaW5wdXQtZ3JvdXBcIil9PlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9e1wiZm9ybS1jb250cm9sXCJ9IHBsYWNlaG9sZGVyPVwiQWRkIG5vdGVzIGhlcmVcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiYWRkbm90ZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCIgaWQ9XCJhZGRub3RlXCI+XG4gICAgICAgICAgICAgICAgPFBsdXNDaXJjbGUgY29sb3I9XCIjRkZGRkZGXCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snYXR0YWNobWVudHMnXX0+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydpbmZvLWxpbmUnXX0+XG4gICAgICAgICAgICAgIDxsYWJlbD5BdHRhY2htZW50czwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzcGFuPnsgKHRoaXMucHJvcHMuYXR0YWNobWVudHMgJiYgdGhpcy5wcm9wcy5hdHRhY2htZW50cy5sZW5ndGgpID8gdGhpcy5wcm9wcy5hdHRhY2htZW50cy5sZW5ndGggOiAnTm8gYXR0YWNobWVudHMgeWV0JyB9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydhdHRhY2htZW50cy1saXN0J119PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ2F0dGFjaG1lbnQtaXRlbSddfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snZXh0ZW5zaW9uLWl0ZW0nXX0+XG4gICAgICAgICAgICAgICAgICA8UmVuZGVyRXh0ZW5zaW9uSWNvbiBleHRlbnNpb249J21wMycgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXtzWydzaXplLWl0ZW0nXX0+MS44MyhNYik8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c1snZGF0ZS1pdGVtJ119PjI4IEZlYiwgMjAxNzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snY29udGFpbmVyLWFjdGlvbiddfT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoaXNNYW5hZ2VyKSA/IDxidXR0b24gY2xhc3NOYW1lPXtjeCgnYnRuJywnYnRuLXByaW1hcnknLCAnYnRuLWJsb2NrJyl9IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLm9wZW5Sb29tKGUsIHJvb20uaWQpfT48Rm9ybWF0dGVkTWVzc2FnZSB7Li4ubWVzc2FnZXMub3BlblJvb219IC8+PC9idXR0b24+IDogPGJ1dHRvbiBjbGFzc05hbWU9e2N4KCdidG4nLCdidG4tcHJpbWFyeScsICdidG4tYmxvY2snKX0gb25DbGljaz17dGhpcy5nb0JhY2t9PjxGb3JtYXR0ZWRNZXNzYWdlIHsuLi5tZXNzYWdlcy5nb0JhY2t9IC8+PC9idXR0b24+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj4gXG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe1xuICByb29tczogc3RhdGUuY2hhdC5yb29tcyxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkod2l0aFN0eWxlcyhzKShDaGF0SW5zcGVjdG9yKSk7XG4iLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtNCEuL0NoYXRNZXNzYWdlLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9DaGF0TWVzc2FnZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9DaGF0TWVzc2FnZS5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGRlZmluZU1lc3NhZ2VzLCBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL0NoYXRNZXNzYWdlLmNzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7IFxuaW1wb3J0IGF2YXRhciBmcm9tICcuLi8uLi9nZngvYXZhdGFyLnBuZyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtZXNzYWdlcyA9IGRlZmluZU1lc3NhZ2VzKHtcbiAgY3VycmVudFRhbGtzOiB7XG4gICAgaWQ6ICdjdXJyZW50VGFsa3MuY29udGFpbmVyLmhlYWRlcicsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdDdXJyZW50IFRhbGtzJyxcbiAgICBkZXNjcmlwdGlvbjogJ2N1cnJlbnRUYWxrcy5jb250YWluZXIuaGVhZGVyJyxcbiAgfSxcbn0pO1xuXG5cbmNsYXNzIENoYXRNZXNzYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBhdHRhY2htZW50cywgbWVzc2FnZSB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjb25zdCBhdHRhY2htZW50cyA9IF8udGltZXMoYXR0YWNobWVudHMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeChzWydjb250YWluZXInXSwgKHRoaXMucHJvcHMub3duZXIgPT09ICdjdXN0b21lcicgPyBzWydsZWZ0J10gOiBzWydyaWdodCddKSl9PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MuY29udGVudH0+XG5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAgKG1lc3NhZ2UudXNlciAmJiBtZXNzYWdlLnVzZXIuYXZhdGFyX3BhdGgpID8gPGRpdiBjbGFzc05hbWU9e3NbJ2F2YXRhciddfT48aW1nIHNyYz17bWVzc2FnZS51c2VyLmF2YXRhcl9wYXRofS8+PC9kaXY+IDogbnVsbCBcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ21lc3NhZ2UnXX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snY29ycHVzJ119PnttZXNzYWdlLmJvZHl9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snYXR0YWNobWVudHMnXX0+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3RpbWUtYWdvJ119PlxuICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgeyBtb21lbnQobWVzc2FnZS5jcmVhdGVkX2F0KS5mcm9tTm93KCkgfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKENoYXRNZXNzYWdlKTtcbiIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy0zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy00IS4vQ2hhdFJvb20uY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtNCEuL0NoYXRSb29tLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtNCEuL0NoYXRSb29tLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICAiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVNZXNzYWdlcywgRm9ybWF0dGVkTWVzc2FnZSwgaW5qZWN0SW50bCB9IGZyb20gXCJyZWFjdC1pbnRsXCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tIFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIjtcbmltcG9ydCBzIGZyb20gXCIuL0NoYXRSb29tLmNzc1wiO1xuaW1wb3J0IGN4IGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgQ2hhdE1lc3NhZ2UgZnJvbSBcIi4vQ2hhdE1lc3NhZ2VcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJyZWFjdC1mZWF0aGVyL2Rpc3QvaWNvbnMvbGlua1wiO1xuaW1wb3J0IExpbmsyIGZyb20gXCJyZWFjdC1mZWF0aGVyL2Rpc3QvaWNvbnMvbGluay0yXCI7XG5pbXBvcnQgUGFwZXJjbGlwIGZyb20gXCJyZWFjdC1mZWF0aGVyL2Rpc3QvaWNvbnMvcGFwZXJjbGlwXCI7XG5pbXBvcnQgRmlsZVBsdXMgZnJvbSBcInJlYWN0LWZlYXRoZXIvZGlzdC9pY29ucy9maWxlLXBsdXNcIjtcbmltcG9ydCBncWwgZnJvbSBcImdyYXBocWwtdGFnXCI7XG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBhZGRNZXNzYWdlIH0gZnJvbSAnYWRtaW4vYWN0aW9ucy9jaGF0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmltcG9ydCBzZW5kTWVzc2FnZSBmcm9tIFwiLi9zZW5kTWVzc2FnZS5ncmFwaHFsXCI7XG5pbXBvcnQgc3Vic2NyaWJlTmV3TWVzc2FnZSBmcm9tIFwiLi9zdWJzY3JpYmVOZXdNZXNzYWdlLmdyYXBocWxcIjtcbmltcG9ydCBCcmVhZGNydW1icyBmcm9tIFwiLi4vLi4vQnJlYWRjcnVtYnNcIjtcblxuY29uc3QgbWVzc2FnZXMgPSBkZWZpbmVNZXNzYWdlcyh7XG4gIHNlbmQ6IHtcbiAgICBpZDogXCJhY3Rpb25zLnNlbmRcIixcbiAgICBkZWZhdWx0TWVzc2FnZTogXCJTZW5kXCIsXG4gICAgZGVzY3JpcHRpb246IFwiYWN0aW9ucy5zZW5kXCIsXG4gIH0sXG4gIHRleHRhcmVhUGxhY2Vob2xkZXI6IHtcbiAgICBpZDogXCJ0ZXh0YXJlYS5wbGFjZWhvbGRlclwiLFxuICAgIGRlZmF1bHRNZXNzYWdlOiBcIldyaXRlIHlvdXIgbWVzc2FnZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcInBsYWNlaG9sZGVyIGZvciB0ZXh0YXJlYSBjaGF0IHJvb21cIixcbiAgfSxcbiAgZHJvcGRvd25UaXRsZToge1xuICAgIGlkOiBcImRyb3Bkb3duLnRpdGxlXCIsXG4gICAgZGVmYXVsdE1lc3NhZ2U6IFwiQWRkIHRvIENvbnZlcnNhdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcImRyb3Bkb3duIHRpdGxlIEFkZCB0byBDb252ZXJzYXRpb25cIixcbiAgfSxcbiAgZHJvcGRvd25GaWxlOiB7XG4gICAgaWQ6IFwiZHJvcGRvd24udXBsb2FkZmlsZVwiLFxuICAgIGRlZmF1bHRNZXNzYWdlOiBcIkZpbGVcIixcbiAgICBkZXNjcmlwdGlvbjogXCJkcm9wZG93biBzZW5kIGZpbGVcIixcbiAgfSxcbiAgZHJvcGRvd25Eb2N1U2lnbjoge1xuICAgIGlkOiBcImRyb3Bkb3duLmRvY3VzaWduXCIsXG4gICAgZGVmYXVsdE1lc3NhZ2U6IFwiTGluayBEb2N1U2lnblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcImRyb3Bkb3duIGRvY3VzaWduXCIsXG4gIH0sXG4gIGRyb3Bkb3duTGluazoge1xuICAgIGlkOiBcImRyb3Bkb3duLmxpbmtcIixcbiAgICBkZWZhdWx0TWVzc2FnZTogXCJMaW5rIFVSTFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcImRyb3Bkb3duIGxpbmsgdXJsXCIsXG4gIH0sXG4gIGxvYWRNb3JlOiB7XG4gICAgaWQ6IFwiY2hhdC5yb29tLmxvYWQubW9yZVwiLFxuICAgIGRlZmF1bHRNZXNzYWdlOiBcIkxvYWQgTW9yZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkJ1dHRvbiBvbiB0b3Agb2YgY2hhdCByb29tIHRvIGZldGNoIG1vcmUgbWVzc2FnZXNcIixcbiAgfSxcbn0pO1xuXG5jb25zdCBxdWlja0FjdGlvbnMgPSBbXG4gIHtcbiAgICB0bzogXCIjZmlsZVwiLFxuICAgIGxhYmVsOiBtZXNzYWdlcy5kcm9wZG93bkZpbGUsXG4gICAgaWNvbjogPEZpbGVQbHVzIGNvbG9yPVwiI0ZGRkZGRlwiIC8+LFxuICB9LFxuICB7XG4gICAgdG86IFwiI2RvY3VzaWduXCIsXG4gICAgbGFiZWw6IG1lc3NhZ2VzLmRyb3Bkb3duRG9jdVNpZ24sXG4gICAgaWNvbjogPExpbmsgY29sb3I9XCIjRkZGRkZGXCIgLz4sXG4gIH0sXG4gIHtcbiAgICB0bzogXCIjbGluay11cmxcIixcbiAgICBsYWJlbDogbWVzc2FnZXMuZHJvcGRvd25MaW5rLFxuICAgIGljb246IDxMaW5rMiBjb2xvcj1cIiNGRkZGRkZcIiAvPixcbiAgfSxcbl07XG5cbi8vIGNvbnN0IGdldFRleHRBcmVhUGxhY2Vob2xkZXIgPSAoKSA9PiBpbnRsLiB7Li4ubWVzc2FnZXMucGxhY2Vob2xkZXJ9IC8+XG5cbmNsYXNzIENoYXRSb29tIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBjbGllbnQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAvLyBzdG9yZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICB9O1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgIGN1cnJlbnRDaHVuazogMSxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlTWVzc2FnZUNoYW5nZSA9IHRoaXMuaGFuZGxlTWVzc2FnZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMubWF4Q29udmVyc2F0aW9uTGVuZ3RoID0gMjA7XG4gICAgdGhpcy5sb2FkTW9yZSA9IHRoaXMubG9hZE1vcmUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZU1lc3NhZ2VDaGFuZ2UoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLnZhbHVlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgaGVpZ2h0TGltaXQgPSAyMDA7XG5cbiAgICB0aGlzLm1lc3NhZ2Uuc3R5bGUuaGVpZ2h0ID0gXCJcIjsgLyogUmVzZXQgdGhlIGhlaWdodCAqL1xuICAgIHRoaXMubWVzc2FnZS5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLm1pbih0aGlzLm1lc3NhZ2Uuc2Nyb2xsSGVpZ2h0LCBoZWlnaHRMaW1pdCl9cHhgO1xuICB9XG5cbiAgbG9hZE1vcmUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGN1cnJlbnRDaHVuazogdGhpcy5zdGF0ZS5jdXJyZW50Q2h1bmsgKyAxIH0pO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zY3JvbGxUb0xhc3RNZXNzYWdlKCk7XG4gICAgdGhpcy5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNjcm9sbFRvTGFzdE1lc3NhZ2UoZGVsYXkpIHtcbiAgICBkZWxheSA9IGRlbGF5IHx8IDMwMDtcbiAgICAkKHRoaXMubWVzc2FnZUNvbnRhaW5lcikuYW5pbWF0ZSh7IHNjcm9sbFRvcDogYCR7dGhpcy5tZXNzYWdlQ29udGFpbmVyLnNjcm9sbEhlaWdodH1weGAgfSwgZGVsYXkpO1xuICB9XG5cbiAgc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IHsgY2xpZW50IH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgY29uc3QgeyBhZGRNZXNzYWdlLCBpZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uT2JzZXJ2ZXIgPSBjbGllbnQuc3Vic2NyaWJlKHtcbiAgICAgIHF1ZXJ5OiBzdWJzY3JpYmVOZXdNZXNzYWdlLFxuICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgIHJvb21JZDogaWQsXG4gICAgICB9LFxuICAgIH0pLnN1YnNjcmliZSh7XG4gICAgICBuZXh0KGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAgICAgYWRkTWVzc2FnZSh7XG4gICAgICAgICAgcm9vbUlkOiBpZCxcbiAgICAgICAgICBtZXNzYWdlOiBkYXRhLm5ld01lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGVycm9yKGVycikgeyBjb25zb2xlLmVycm9yKFwiZXJyXCIsIGVycik7IH0sXG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb252ZXJzYXRpb24ubGVuZ3RoID4gcHJldlByb3BzLmNvbnZlcnNhdGlvbi5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9MYXN0TWVzc2FnZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRNZXNzYWdlID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5tZXNzYWdlLmxlbmd0aCkge1xuICAgICAgdGhpcy5jb250ZXh0LmNsaWVudC5tdXRhdGUoe1xuICAgICAgICBtdXRhdGlvbjogc2VuZE1lc3NhZ2UsXG4gICAgICAgIHZhcmlhYmxlczoge1xuICAgICAgICAgIHJvb21JZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgICAgICBib2R5OiB0aGlzLnN0YXRlLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KS50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCBcIiEhc3VjY2Vzc1wiKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2U6IFwiXCIgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGludGwsIGNvbnZlcnNhdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB0ZXh0QXJlYVBsYWNlaG9sZGVyID0gaW50bC5mb3JtYXRNZXNzYWdlKG1lc3NhZ2VzLnRleHRhcmVhUGxhY2Vob2xkZXIpO1xuXG4gICAgY29uc3QgdmlzaWJsZU1lc3NhZ2VzID0gXy5zb3J0QnkoY29udmVyc2F0aW9uLCBbZnVuY3Rpb24gKG1zZykgeyByZXR1cm4gXy5ub3cobXNnLmNyZWF0ZWRfYXQpOyB9XSkucmV2ZXJzZSgpO1xuICAgIC8vIGNvbnN0IG1lc3NhZ2VDaHVua3MgPSBfLmNodW5rKHNvcnRlZEJ5RGF0ZSwgdGhpcy5tYXhDb252ZXJzYXRpb25MZW5ndGgpO1xuICAgIC8vIGNvbnN0IHZpc2libGVNZXNzYWdlcyA9IF8uc29ydEJ5KF8uZmxhdHRlbihtZXNzYWdlQ2h1bmtzLnNsaWNlKDAsIHRoaXMuc3RhdGUuY3VycmVudENodW5rKSksIFtmdW5jdGlvbihtc2cpIHsgcmV0dXJuIF8ubm93KG1zZy5jcmVhdGVkX2F0KSB9XSkucmV2ZXJzZSgpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmNvbnRhaW5lcn0+XG5cbiAgICAgICAgPEJyZWFkY3J1bWJzIHJvdXRlPXt0aGlzLnByb3BzLmN1cnJlbnRSb3V0ZX0gLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MubWVzc2FnZXN9IHJlZj17ZWwgPT4gdGhpcy5tZXNzYWdlQ29udGFpbmVyID0gZWx9PlxuXG4gICAgICAgICAgeyAvKiAobWVzc2FnZUNodW5rcy5sZW5ndGggPiAxICYmIG1lc3NhZ2VDaHVua3MubGVuZ3RoID4gdGhpcy5zdGF0ZS5jdXJyZW50Q2h1bmsgKSA/IDxidXR0b24gY2xhc3NOYW1lPXtjeCgnYnRuJywgJ2J0bi13aGl0ZScsICdidG4tYmxvY2snKX0gb25DbGljaz17dGhpcy5sb2FkTW9yZX0+PEZvcm1hdHRlZE1lc3NhZ2Ugey4uLm1lc3NhZ2VzLmxvYWRNb3JlfS8+PC9idXR0b24+IDogJycgKi8gfVxuICAgICAgICAgIHsgdmlzaWJsZU1lc3NhZ2VzLm1hcChtc2cgPT4gPENoYXRNZXNzYWdlIGtleT17bXNnLmlkfSBtZXNzYWdlPXttc2d9IG93bmVyPXttc2cudXNlciA/IFwidXNlclwiIDogXCJjdXN0b21lclwifSAvPikgfVxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9e3NbXCJjaGF0LWlucHV0c1wiXX0gb25TdWJtaXQ9e3RoaXMuc2VuZE1lc3NhZ2V9PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MuZWxhc3RpY30+XG4gICAgICAgICAgICA8dGV4dGFyZWEgYXV0b0ZvY3VzIGNsYXNzTmFtZT17Y3goXCJmb3JtLWNvbnRyb2xcIiwgc1tcIm1lc3NhZ2UtZmllbGRcIl0pfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVNZXNzYWdlQ2hhbmdlfSB2YWx1ZT17dGhpcy5zdGF0ZS5tZXNzYWdlfSByZWY9e2lucHV0ID0+IHRoaXMubWVzc2FnZSA9IGlucHV0fSBwbGFjZWhvbGRlcj17dGV4dEFyZWFQbGFjZWhvbGRlcn0gLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmFjdGlvbkdyb3VwfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeChzLmFjdGlvbnMsIFwiZHJvcHVwXCIpfT5cblxuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e2N4KFwiZHJvcGRvd24tdG9nZ2xlXCIsIFwibm8tY2FyZXRcIil9IGlkPVwicm9vbS1hY3Rpb25zXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgICAgPFBhcGVyY2xpcCBzaXplPVwiMThcIiBjb2xvcj1cIiNGRkZGRkZcIiAvPlxuICAgICAgICAgICAgICA8L2E+XG5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17Y3goXCJkcm9wZG93bi1tZW51XCIsIFwiZHJvcGRvd24tbWVudS1yaWdodFwiKX0gYXJpYS1sYWJlbGxlZGJ5PVwicm9vbS1hY3Rpb25zXCI+XG5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtcImRyb3Bkb3duLWhlYWRlclwifT48Rm9ybWF0dGVkTWVzc2FnZSB7Li4ubWVzc2FnZXMuZHJvcGRvd25UaXRsZX0gLz48L2xpPlxuICAgICAgICAgICAgICAgIHsgcXVpY2tBY3Rpb25zLm1hcCgoaXRlbSwgaW5kZXgpID0+IDxsaSBjbGFzc05hbWU9e1wiZHJvcGRvd24taXRlbVwifSBrZXk9e2luZGV4fT48YSBocmVmPXtpdGVtLnRvfT57aXRlbS5pY29ufTxGb3JtYXR0ZWRNZXNzYWdlIHsuLi5pdGVtLmxhYmVsfSAvPjwvYT48L2xpPikgfVxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT17Y3goXCJidG5cIiwgKHRoaXMuc3RhdGUubWVzc2FnZS5sZW5ndGgpID8gXCJidG4tc2Vjb25kYXJ5XCIgOiBcImJ0bi1wcmltYXJ5XCIpfT5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLm1lc3NhZ2VzLnNlbmR9IC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCB7IG1lc3NhZ2VzIH0gPSBfLmZpbmQoc3RhdGUuY2hhdC5yb29tcywgeyBpZDogcHJvcHMuaWQgfSk7XG4gIHJldHVybiB7XG4gICAgY29udmVyc2F0aW9uOiBtZXNzYWdlcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCB7IGFkZE1lc3NhZ2UgfSkoaW5qZWN0SW50bCh3aXRoU3R5bGVzKHMpKENoYXRSb29tKSkpO1xuXG4iLCJcbiAgICB2YXIgZG9jID0ge1wia2luZFwiOlwiRG9jdW1lbnRcIixcImRlZmluaXRpb25zXCI6W3tcImtpbmRcIjpcIk9wZXJhdGlvbkRlZmluaXRpb25cIixcIm9wZXJhdGlvblwiOlwibXV0YXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwic2VuZE1lc3NhZ2VcIn0sXCJ2YXJpYWJsZURlZmluaXRpb25zXCI6W3tcImtpbmRcIjpcIlZhcmlhYmxlRGVmaW5pdGlvblwiLFwidmFyaWFibGVcIjp7XCJraW5kXCI6XCJWYXJpYWJsZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJyb29tSWRcIn19LFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIklEXCJ9fX19LHtcImtpbmRcIjpcIlZhcmlhYmxlRGVmaW5pdGlvblwiLFwidmFyaWFibGVcIjp7XCJraW5kXCI6XCJWYXJpYWJsZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJib2R5XCJ9fSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fX1dLFwiZGlyZWN0aXZlc1wiOltdLFwic2VsZWN0aW9uU2V0XCI6e1wia2luZFwiOlwiU2VsZWN0aW9uU2V0XCIsXCJzZWxlY3Rpb25zXCI6W3tcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInNlbmRNZXNzYWdlXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIkFyZ3VtZW50XCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInJvb21JZFwifSxcInZhbHVlXCI6e1wia2luZFwiOlwiVmFyaWFibGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicm9vbUlkXCJ9fX0se1wia2luZFwiOlwiQXJndW1lbnRcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiYm9keVwifSxcInZhbHVlXCI6e1wia2luZFwiOlwiVmFyaWFibGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiYm9keVwifX19XSxcImRpcmVjdGl2ZXNcIjpbXSxcInNlbGVjdGlvblNldFwiOntcImtpbmRcIjpcIlNlbGVjdGlvblNldFwiLFwic2VsZWN0aW9uc1wiOlt7XCJraW5kXCI6XCJGaWVsZFwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpZFwifSxcImFyZ3VtZW50c1wiOltdLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZFwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJib2R5XCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImF1dG9tYXRlZFwifSxcImFyZ3VtZW50c1wiOltdLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZFwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJjbGlfcmVhZFwifSxcImFyZ3VtZW50c1wiOltdLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZFwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJhZHZfcmVhZFwifSxcImFyZ3VtZW50c1wiOltdLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZFwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJjcmVhdGVkX2F0XCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119XX19XX19XSxcImxvY1wiOntcInN0YXJ0XCI6MCxcImVuZFwiOjE2N319O1xuICAgIGRvYy5sb2Muc291cmNlID0ge1wiYm9keVwiOlwibXV0YXRpb24gc2VuZE1lc3NhZ2UoJHJvb21JZDogSUQhLCAkYm9keTogU3RyaW5nISkge1xcbiAgICBzZW5kTWVzc2FnZShyb29tSWQ6ICRyb29tSWQsIGJvZHk6ICRib2R5KSB7XFxuXFx0XFx0aWRcXG5cXHRcXHRib2R5XFxuXFx0XFx0YXV0b21hdGVkXFxuXFx0XFx0Y2xpX3JlYWRcXG5cXHRcXHRhZHZfcmVhZFxcblxcdFxcdGNyZWF0ZWRfYXRcXG4gICAgfVxcbn1cIixcIm5hbWVcIjpcIkdyYXBoUUwgcmVxdWVzdFwiLFwibG9jYXRpb25PZmZzZXRcIjp7XCJsaW5lXCI6MSxcImNvbHVtblwiOjF9fTtcbiAgXG5cbiAgICB2YXIgbmFtZXMgPSB7fTtcbiAgICBmdW5jdGlvbiB1bmlxdWUoZGVmcykge1xuICAgICAgcmV0dXJuIGRlZnMuZmlsdGVyKFxuICAgICAgICBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBpZiAoZGVmLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGRlZi5uYW1lLnZhbHVlXG4gICAgICAgICAgaWYgKG5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgXG5cbiAgICAvLyBDb2xsZWN0IGFueSBmcmFnbWVudC90eXBlIHJlZmVyZW5jZXMgZnJvbSBhIG5vZGUsIGFkZGluZyB0aGVtIHRvIHRoZSByZWZzIFNldFxuICAgIGZ1bmN0aW9uIGNvbGxlY3RGcmFnbWVudFJlZmVyZW5jZXMobm9kZSwgcmVmcykge1xuICAgICAgaWYgKG5vZGUua2luZCA9PT0gXCJGcmFnbWVudFNwcmVhZFwiKSB7XG4gICAgICAgIHJlZnMuYWRkKG5vZGUubmFtZS52YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUua2luZCA9PT0gXCJWYXJpYWJsZURlZmluaXRpb25cIikge1xuICAgICAgICB2YXIgdHlwZSA9IG5vZGUudHlwZTtcbiAgICAgICAgaWYgKHR5cGUua2luZCA9PT0gXCJOYW1lZFR5cGVcIikge1xuICAgICAgICAgIHJlZnMuYWRkKHR5cGUubmFtZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUuc2VsZWN0aW9uU2V0KSB7XG4gICAgICAgIG5vZGUuc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKHNlbGVjdGlvbiwgcmVmcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS52YXJpYWJsZURlZmluaXRpb25zKSB7XG4gICAgICAgIG5vZGUudmFyaWFibGVEZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgICAgIGNvbGxlY3RGcmFnbWVudFJlZmVyZW5jZXMoZGVmLCByZWZzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLmRlZmluaXRpb25zKSB7XG4gICAgICAgIG5vZGUuZGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKGRlZiwgcmVmcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWZpbml0aW9uUmVmcyA9IHt9O1xuICAgIChmdW5jdGlvbiBleHRyYWN0UmVmZXJlbmNlcygpIHtcbiAgICAgIGRvYy5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgICBpZiAoZGVmLm5hbWUpIHtcbiAgICAgICAgICB2YXIgcmVmcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKGRlZiwgcmVmcyk7XG4gICAgICAgICAgZGVmaW5pdGlvblJlZnNbZGVmLm5hbWUudmFsdWVdID0gcmVmcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIGZpbmRPcGVyYXRpb24oZG9jLCBuYW1lKSB7XG4gICAgICByZXR1cm4gZG9jLmRlZmluaXRpb25zLmZpbmQoZnVuY3Rpb24ob3ApIHtcbiAgICAgICAgcmV0dXJuIG9wLm5hbWUgPyBvcC5uYW1lLnZhbHVlID09IG5hbWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uZVF1ZXJ5KGRvYywgb3BlcmF0aW9uTmFtZSkge1xuICAgICAgLy8gQ29weSB0aGUgRG9jdW1lbnROb2RlLCBidXQgY2xlYXIgb3V0IHRoZSBkZWZpbml0aW9uc1xuICAgICAgdmFyIG5ld0RvYyA9IE9iamVjdC5hc3NpZ24oe30sIGRvYyk7XG5cbiAgICAgIHZhciBvcCA9IGZpbmRPcGVyYXRpb24oZG9jLCBvcGVyYXRpb25OYW1lKTtcbiAgICAgIG5ld0RvYy5kZWZpbml0aW9ucyA9IFtvcF07XG5cbiAgICAgIC8vIE5vdywgZm9yIHRoZSBvcGVyYXRpb24gd2UncmUgcnVubmluZywgZmluZCBhbnkgZnJhZ21lbnRzIHJlZmVyZW5jZWQgYnlcbiAgICAgIC8vIGl0IG9yIHRoZSBmcmFnbWVudHMgaXQgcmVmZXJlbmNlc1xuICAgICAgdmFyIG9wUmVmcyA9IGRlZmluaXRpb25SZWZzW29wZXJhdGlvbk5hbWVdIHx8IG5ldyBTZXQoKTtcbiAgICAgIHZhciBhbGxSZWZzID0gbmV3IFNldCgpO1xuICAgICAgdmFyIG5ld1JlZnMgPSBuZXcgU2V0KG9wUmVmcyk7XG4gICAgICB3aGlsZSAobmV3UmVmcy5zaXplID4gMCkge1xuICAgICAgICB2YXIgcHJldlJlZnMgPSBuZXdSZWZzO1xuICAgICAgICBuZXdSZWZzID0gbmV3IFNldCgpO1xuXG4gICAgICAgIHByZXZSZWZzLmZvckVhY2goZnVuY3Rpb24ocmVmTmFtZSkge1xuICAgICAgICAgIGlmICghYWxsUmVmcy5oYXMocmVmTmFtZSkpIHtcbiAgICAgICAgICAgIGFsbFJlZnMuYWRkKHJlZk5hbWUpO1xuICAgICAgICAgICAgdmFyIGNoaWxkUmVmcyA9IGRlZmluaXRpb25SZWZzW3JlZk5hbWVdIHx8IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIGNoaWxkUmVmcy5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkUmVmKSB7XG4gICAgICAgICAgICAgIG5ld1JlZnMuYWRkKGNoaWxkUmVmKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGFsbFJlZnMuZm9yRWFjaChmdW5jdGlvbihyZWZOYW1lKSB7XG4gICAgICAgIHZhciBvcCA9IGZpbmRPcGVyYXRpb24oZG9jLCByZWZOYW1lKTtcbiAgICAgICAgaWYgKG9wKSB7XG4gICAgICAgICAgbmV3RG9jLmRlZmluaXRpb25zLnB1c2gob3ApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG5ld0RvYztcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvYztcbiAgICBcbiAgICAgICAgbW9kdWxlLmV4cG9ydHNbXCJzZW5kTWVzc2FnZVwiXSA9IG9uZVF1ZXJ5KGRvYywgXCJzZW5kTWVzc2FnZVwiKTtcbiAgICAgICAgXG4iLCJcbiAgICB2YXIgZG9jID0ge1wia2luZFwiOlwiRG9jdW1lbnRcIixcImRlZmluaXRpb25zXCI6W3tcImtpbmRcIjpcIk9wZXJhdGlvbkRlZmluaXRpb25cIixcIm9wZXJhdGlvblwiOlwic3Vic2NyaXB0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIm5ld01lc3NhZ2VcIn0sXCJ2YXJpYWJsZURlZmluaXRpb25zXCI6W3tcImtpbmRcIjpcIlZhcmlhYmxlRGVmaW5pdGlvblwiLFwidmFyaWFibGVcIjp7XCJraW5kXCI6XCJWYXJpYWJsZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJyb29tSWRcIn19LFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIklEXCJ9fX19XSxcImRpcmVjdGl2ZXNcIjpbXSxcInNlbGVjdGlvblNldFwiOntcImtpbmRcIjpcIlNlbGVjdGlvblNldFwiLFwic2VsZWN0aW9uc1wiOlt7XCJraW5kXCI6XCJGaWVsZFwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJuZXdNZXNzYWdlXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIkFyZ3VtZW50XCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInJvb21JZFwifSxcInZhbHVlXCI6e1wia2luZFwiOlwiVmFyaWFibGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicm9vbUlkXCJ9fX1dLFwiZGlyZWN0aXZlc1wiOltdLFwic2VsZWN0aW9uU2V0XCI6e1wia2luZFwiOlwiU2VsZWN0aW9uU2V0XCIsXCJzZWxlY3Rpb25zXCI6W3tcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImJvZHlcIn0sXCJhcmd1bWVudHNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGRcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiYXV0b21hdGVkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNsaV9yZWFkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImFkdl9yZWFkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNyZWF0ZWRfYXRcIn0sXCJhcmd1bWVudHNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGRcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXNlclwifSxcImFyZ3VtZW50c1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwic2VsZWN0aW9uU2V0XCI6e1wia2luZFwiOlwiU2VsZWN0aW9uU2V0XCIsXCJzZWxlY3Rpb25zXCI6W3tcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImF2YXRhcl9wYXRoXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119XX19LHtcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImN1c3RvbWVyXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W10sXCJzZWxlY3Rpb25TZXRcIjp7XCJraW5kXCI6XCJTZWxlY3Rpb25TZXRcIixcInNlbGVjdGlvbnNcIjpbe1wia2luZFwiOlwiRmllbGRcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwic2ZpZFwifSxcImFyZ3VtZW50c1wiOltdLFwiZGlyZWN0aXZlc1wiOltdfV19fV19fV19fV0sXCJsb2NcIjp7XCJzdGFydFwiOjAsXCJlbmRcIjoyMjR9fTtcbiAgICBkb2MubG9jLnNvdXJjZSA9IHtcImJvZHlcIjpcInN1YnNjcmlwdGlvbiBuZXdNZXNzYWdlKCRyb29tSWQ6IElEISkge1xcbiAgbmV3TWVzc2FnZShyb29tSWQ6ICRyb29tSWQpIHtcXG4gICAgaWRcXG4gICAgYm9keVxcbiAgICBhdXRvbWF0ZWRcXG4gICAgY2xpX3JlYWRcXG4gICAgYWR2X3JlYWRcXG4gICAgY3JlYXRlZF9hdFxcbiAgICB1c2VyIHtcXG4gICAgICBpZFxcbiAgICAgIGF2YXRhcl9wYXRoXFxuICAgIH1cXG4gICAgY3VzdG9tZXIge1xcbiAgICAgIHNmaWRcXG4gICAgfVxcbiAgfVxcbn1cIixcIm5hbWVcIjpcIkdyYXBoUUwgcmVxdWVzdFwiLFwibG9jYXRpb25PZmZzZXRcIjp7XCJsaW5lXCI6MSxcImNvbHVtblwiOjF9fTtcbiAgXG5cbiAgICB2YXIgbmFtZXMgPSB7fTtcbiAgICBmdW5jdGlvbiB1bmlxdWUoZGVmcykge1xuICAgICAgcmV0dXJuIGRlZnMuZmlsdGVyKFxuICAgICAgICBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBpZiAoZGVmLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGRlZi5uYW1lLnZhbHVlXG4gICAgICAgICAgaWYgKG5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgXG5cbiAgICAvLyBDb2xsZWN0IGFueSBmcmFnbWVudC90eXBlIHJlZmVyZW5jZXMgZnJvbSBhIG5vZGUsIGFkZGluZyB0aGVtIHRvIHRoZSByZWZzIFNldFxuICAgIGZ1bmN0aW9uIGNvbGxlY3RGcmFnbWVudFJlZmVyZW5jZXMobm9kZSwgcmVmcykge1xuICAgICAgaWYgKG5vZGUua2luZCA9PT0gXCJGcmFnbWVudFNwcmVhZFwiKSB7XG4gICAgICAgIHJlZnMuYWRkKG5vZGUubmFtZS52YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUua2luZCA9PT0gXCJWYXJpYWJsZURlZmluaXRpb25cIikge1xuICAgICAgICB2YXIgdHlwZSA9IG5vZGUudHlwZTtcbiAgICAgICAgaWYgKHR5cGUua2luZCA9PT0gXCJOYW1lZFR5cGVcIikge1xuICAgICAgICAgIHJlZnMuYWRkKHR5cGUubmFtZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUuc2VsZWN0aW9uU2V0KSB7XG4gICAgICAgIG5vZGUuc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKHNlbGVjdGlvbiwgcmVmcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS52YXJpYWJsZURlZmluaXRpb25zKSB7XG4gICAgICAgIG5vZGUudmFyaWFibGVEZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgICAgIGNvbGxlY3RGcmFnbWVudFJlZmVyZW5jZXMoZGVmLCByZWZzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLmRlZmluaXRpb25zKSB7XG4gICAgICAgIG5vZGUuZGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKGRlZiwgcmVmcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWZpbml0aW9uUmVmcyA9IHt9O1xuICAgIChmdW5jdGlvbiBleHRyYWN0UmVmZXJlbmNlcygpIHtcbiAgICAgIGRvYy5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgICBpZiAoZGVmLm5hbWUpIHtcbiAgICAgICAgICB2YXIgcmVmcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKGRlZiwgcmVmcyk7XG4gICAgICAgICAgZGVmaW5pdGlvblJlZnNbZGVmLm5hbWUudmFsdWVdID0gcmVmcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIGZpbmRPcGVyYXRpb24oZG9jLCBuYW1lKSB7XG4gICAgICByZXR1cm4gZG9jLmRlZmluaXRpb25zLmZpbmQoZnVuY3Rpb24ob3ApIHtcbiAgICAgICAgcmV0dXJuIG9wLm5hbWUgPyBvcC5uYW1lLnZhbHVlID09IG5hbWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uZVF1ZXJ5KGRvYywgb3BlcmF0aW9uTmFtZSkge1xuICAgICAgLy8gQ29weSB0aGUgRG9jdW1lbnROb2RlLCBidXQgY2xlYXIgb3V0IHRoZSBkZWZpbml0aW9uc1xuICAgICAgdmFyIG5ld0RvYyA9IE9iamVjdC5hc3NpZ24oe30sIGRvYyk7XG5cbiAgICAgIHZhciBvcCA9IGZpbmRPcGVyYXRpb24oZG9jLCBvcGVyYXRpb25OYW1lKTtcbiAgICAgIG5ld0RvYy5kZWZpbml0aW9ucyA9IFtvcF07XG5cbiAgICAgIC8vIE5vdywgZm9yIHRoZSBvcGVyYXRpb24gd2UncmUgcnVubmluZywgZmluZCBhbnkgZnJhZ21lbnRzIHJlZmVyZW5jZWQgYnlcbiAgICAgIC8vIGl0IG9yIHRoZSBmcmFnbWVudHMgaXQgcmVmZXJlbmNlc1xuICAgICAgdmFyIG9wUmVmcyA9IGRlZmluaXRpb25SZWZzW29wZXJhdGlvbk5hbWVdIHx8IG5ldyBTZXQoKTtcbiAgICAgIHZhciBhbGxSZWZzID0gbmV3IFNldCgpO1xuICAgICAgdmFyIG5ld1JlZnMgPSBuZXcgU2V0KG9wUmVmcyk7XG4gICAgICB3aGlsZSAobmV3UmVmcy5zaXplID4gMCkge1xuICAgICAgICB2YXIgcHJldlJlZnMgPSBuZXdSZWZzO1xuICAgICAgICBuZXdSZWZzID0gbmV3IFNldCgpO1xuXG4gICAgICAgIHByZXZSZWZzLmZvckVhY2goZnVuY3Rpb24ocmVmTmFtZSkge1xuICAgICAgICAgIGlmICghYWxsUmVmcy5oYXMocmVmTmFtZSkpIHtcbiAgICAgICAgICAgIGFsbFJlZnMuYWRkKHJlZk5hbWUpO1xuICAgICAgICAgICAgdmFyIGNoaWxkUmVmcyA9IGRlZmluaXRpb25SZWZzW3JlZk5hbWVdIHx8IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIGNoaWxkUmVmcy5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkUmVmKSB7XG4gICAgICAgICAgICAgIG5ld1JlZnMuYWRkKGNoaWxkUmVmKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGFsbFJlZnMuZm9yRWFjaChmdW5jdGlvbihyZWZOYW1lKSB7XG4gICAgICAgIHZhciBvcCA9IGZpbmRPcGVyYXRpb24oZG9jLCByZWZOYW1lKTtcbiAgICAgICAgaWYgKG9wKSB7XG4gICAgICAgICAgbmV3RG9jLmRlZmluaXRpb25zLnB1c2gob3ApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG5ld0RvYztcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvYztcbiAgICBcbiAgICAgICAgbW9kdWxlLmV4cG9ydHNbXCJuZXdNZXNzYWdlXCJdID0gb25lUXVlcnkoZG9jLCBcIm5ld01lc3NhZ2VcIik7XG4gICAgICAgIFxuIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9DdXJyZW50VGFsa3MuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtNCEuL0N1cnJlbnRUYWxrcy5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9DdXJyZW50VGFsa3MuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBkZWZpbmVNZXNzYWdlcywgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9DdXJyZW50VGFsa3MuY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJzsgXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG4vLyBpbXBvcnQgeyB0b2dnbGVDdXJyZW50VGFsayB9IGZyb20gJy4uLy4uLy4uLy4uL3JlZHV4L2FjdGlvbnMvY3VycmVudFRhbGtzJztcblxuaW1wb3J0IGF2YXRhciBmcm9tICcuLi9nZngvYXZhdGFyLnBuZyc7XG5cbmNvbnN0IG1lc3NhZ2VzID0gZGVmaW5lTWVzc2FnZXMoe1xuICBjb252ZXJzYXRpb25zOiB7XG4gICAgaWQ6ICdjdXJyZW50VGFsa3MuY29udGFpbmVyLmhlYWRlcicsXG4gICAgZGVmYXVsdE1lc3NhZ2U6ICdDb252ZXJzYXRpb25zJyxcbiAgICBkZXNjcmlwdGlvbjogJ2N1cnJlbnRUYWxrcy5jb250YWluZXIuaGVhZGVyJyxcbiAgfSxcbn0pO1xuXG5cbmNsYXNzIEN1cnJlbnRUYWxrcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRvZ2dsZUNvbnZlcnNhdGlvbnNXaWR0aCA9IHRoaXMudG9nZ2xlQ29udmVyc2F0aW9uc1dpZHRoLmJpbmQodGhpcyk7XG4gIH1cblxuICB0b2dnbGVDb252ZXJzYXRpb25zV2lkdGgoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyB0aGlzLnByb3BzLnRvZ2dsZUN1cnJlbnRUYWxrKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgY29uc3QgeyBleHBhbmRlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goc1snY29udGFpbmVyJ10sICdjb252ZXJzYXRpb25zJywgKGV4cGFuZGVkKSA/IHMubWF4OiBzLm1pbil9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snY29udGFpbmVyLWhlYWRlciddfT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3NbJ2hlYWRlciddfT48Rm9ybWF0dGVkTWVzc2FnZSB7Li4ubWVzc2FnZXMuY29udmVyc2F0aW9uc30gLz4gPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KCd0YWxrcy1saXN0JyxzWydjdXJyZW50LXRhbGtzJ10pfT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBbMSwyLDMsNF0ubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtzWyd0YWxrJ119PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MudXNlcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17Y3goc1sndGFsay1hdmF0YXInXSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyBhdmF0YXIgKyAnKSAhaW1wb3J0YW50JyB9fT48L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkZlcnJlaXJvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2N4KHMuY291bnQsICdiYWRnZScsICdiYWRnZS1waWxsJywgJ2JhZGdlLWRhbmdlcicpfT4yPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj4gXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInJlc2l6YWJsZS1oYW5kbGVcIn0gZHJhZ2dhYmxlIG9uTW91c2VVcD17dGhpcy50b2dnbGVDb252ZXJzYXRpb25zV2lkdGh9IG9uRHJhZ1N0YXJ0PXt0aGlzLnRvZ2dsZUNvbnZlcnNhdGlvbnNXaWR0aH0+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcbiAgZXhwYW5kZWQ6IHRydWUsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKHdpdGhTdHlsZXMocykoQ3VycmVudFRhbGtzKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvYWRtaW4vY29tcG9uZW50cy9DaGF0L2dmeC9hdmF0YXIucG5nPzk3NzY1ZjkyXCI7IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IExheW91dCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9MYXlvdXRcIjtcbmltcG9ydCBDaGF0IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0NoYXRcIjtcbmltcG9ydCBDaGF0Um9vbSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9DaGF0L0NoYXRSb29tXCI7XG5cbmltcG9ydCB7IGdldENoYXRSb29tcywgZ2V0U2luZ2xlQ2hhdFJvb20sIGdldEFsbE1lc3NhZ2VzRnJvbVJvb20gfSBmcm9tIFwiYWRtaW4vYWN0aW9ucy9jaGF0XCI7XG5cbmltcG9ydCBDb29raWVzIGZyb20gXCJqcy1jb29raWVcIjtcbmltcG9ydCB7IGZpbmQgfSBmcm9tIFwibG9kYXNoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICBwYXRoOiBcIi9jaGF0XCIsXG5cbiAgbmFtZTogXCJjaGF0XCIsXG5cbiAgcm9vdE5hdjogdHJ1ZSxcblxuICBwZXJtaXNzaW9uOiBcIm1hbmFnZV9jaGF0XCIsXG5cbiAgLy8gS2VlcCBpbiBtaW5kLCByb3V0ZXMgYXJlIGV2YWx1YXRlZCBpbiBvcmRlclxuICBjaGlsZHJlbjogW1xuICAgIHtcbiAgICAgIHBhdGg6IFwiXCIsXG5cbiAgICAgIG5hbWU6IFwiY2hhdFwiLFxuXG4gICAgICBuYXY6IHRydWUsXG5cbiAgICAgIGFzeW5jIGFjdGlvbih7IHN0b3JlLCByb3V0ZSwgY2xpZW50IH0pIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJwYXNzZWkgYXF1aSFcIik7XG5cbiAgICAgICAgLy8gc3RvcmUuZGlzcGF0Y2goc2V0Q3VycmVudFRhbGsoKENvb2tpZXMuZ2V0KFwiY2hhdHRhbGtzLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiKSkpO1xuICAgICAgICBhd2FpdCBzdG9yZS5kaXNwYXRjaChnZXRDaGF0Um9vbXMoKSk7XG5cbiAgICAgICAgY29uc3QgeyByb29tcyB9ID0gc3RvcmUuZ2V0U3RhdGUoKS5jaGF0O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGl0bGU6IFwiQ2hhdFwiLFxuICAgICAgICAgIGNodW5rOiBcImNoYXRNYW5hZ2VyXCIsXG4gICAgICAgICAgcGVybWlzc2lvbjogXCJtYW5hZ2VfY2hhdFwiLFxuICAgICAgICAgIGNvbXBvbmVudDogPExheW91dD48Q2hhdCBpc01hbmFnZXIgcm9vbXM9e3Jvb21zfSAvPjwvTGF5b3V0PixcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAvLyBpbnNpZGUgY2hhdCBjb252ZXJzYXRpb25cbiAgICAgIHBhdGg6IFwiLzppZFwiLFxuXG4gICAgICBuYW1lOiBcImNvbnZlcnNhdGlvblwiLFxuXG4gICAgICBuYXY6IHRydWUsXG5cbiAgICAgIHBlcm1pc3Npb246IFwibWFuYWdlX2NoYXRcIixcblxuICAgICAgYXN5bmMgYWN0aW9uKHsgc3RvcmUsIHBhcmFtcywgcm91dGUgfSkge1xuICAgICAgICBjb25zdCB7IHJvb21zIH0gPSBhd2FpdCBzdG9yZS5nZXRTdGF0ZSgpLmNoYXQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHJvb21zLmxlbmd0aCk7XG5cblxuICAgICAgICBpZiAoIXJvb21zLmxlbmd0aCkgeyAvLyAxXG4gICAgICAgICAgYXdhaXQgc3RvcmUuZGlzcGF0Y2goZ2V0U2luZ2xlQ2hhdFJvb20ocGFyYW1zLmlkKSk7IC8vIGFkZCAgICBbe30se31dXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgc3RvcmUuZGlzcGF0Y2goZ2V0QWxsTWVzc2FnZXNGcm9tUm9vbShwYXJhbXMuaWQpKTsgLy8gdXBkYXRlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByb29tID0gYXdhaXQgZmluZChzdG9yZS5nZXRTdGF0ZSgpLmNoYXQucm9vbXMsIHsgaWQ6IHBhcmFtcy5pZCB9KTtcbiAgICAgICAgLy8gaWYgKCFyb29tKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIHsgcmVkaXJlY3Q6IHJvdXRlLnBhcmVudC5wYXRoIHx8ICcvJyB9XG4gICAgICAgIC8vIH1cblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGl0bGU6IFwiQ29udmVyc2F0aW9uXCIsXG4gICAgICAgICAgY2h1bms6IFwiY2hhdFJvb21cIixcblxuICAgICAgICAgIGNvbXBvbmVudDogPExheW91dCByb3V0ZT17cm91dGV9PjxDaGF0IGN1cnJlbnRSb3V0ZT17cm91dGV9IGlzTWFuYWdlcj17ZmFsc2V9IHJvb209e3Jvb219IC8+PC9MYXlvdXQ+LFxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH0sXG5cbiAgXSxcblxuICBhc3luYyBhY3Rpb24oeyBuZXh0IH0pIHtcbiAgICBjb25zdCBjaGlsZCA9IGF3YWl0IG5leHQoKTtcbiAgICAvLyBjaGVjayBpZiB0b2tlbiBpcyBwcmVzZW50IG9yIHJlZGlyZWN0IHRvIC9sb2dpblxuICAgIHJldHVybiBjaGlsZDtcbiAgfSxcblxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQWVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU9BO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFEQTtBQUFBO0FBQUE7QUFPQTtBQURBO0FBQ0E7QUFQQTtBQUFBO0FBTUE7QUEwQkE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFsQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBeUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUE1Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtREE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFBQTtBQUFBO0FBT0E7QUFrQ0E7QUFDQTtBQURBO0FBbkNBO0FBQ0E7QUFQQTtBQUFBO0FBTUE7QUF3Q0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFoREE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBdURBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUExREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpRUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFjQTtBQUNBO0FBQ0E7QUFGQTtBQWZBO0FBQ0E7QUFIQTtBQUFBO0FBRUE7QUFxQkE7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQTlCQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFxQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQXhDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQStDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0E7Ozs7Ozs7QUNyT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUhBO0FBQ0E7QUFNQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQVJBO0FBU0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTs7O0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBTkE7QUFRQTs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBOzs7O0FBckVBO0FBd0VBOzs7Ozs7Ozs7Ozs7OztBQWFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUNBO0FBSUE7Ozs7Ozs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFyQkE7QUFDQTtBQTRCQTs7Ozs7QUFLQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFWQTtBQWdCQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7OztBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFEQTtBQTBCQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFKQTtBQU1BOzs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBOzs7O0FBdktBO0FBMktBO0FBQ0E7QUFDQTtBQUNBO0FBOUtBOzs7O0FBQ0E7QUFBQTtBQUFBOztBQTZLQTtBQUFBO0FBQUE7QUFBQTs7Ozs7OztBQzFOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBekJBO0FBaUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFKQTtBQUNBO0FBT0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFFQTtBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BOzs7O0FBekhBO0FBQ0E7QUEySEE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBR0E7Ozs7Ozs7QUNsTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBREE7QUFDQTtBQVFBOzs7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBOzs7O0FBcENBO0FBQ0E7QUFzQ0E7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBL0JBO0FBc0NBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUhBO0FBQ0E7QUFRQTs7Ozs7QUFLQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBaUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBL0VBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFSQTtBQVNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQURBO0FBSUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBOzs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFUQTtBQVdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFvQkE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBOzs7O0FBdElBO0FBQ0E7QUFEQTs7OztBQUNBO0FBQ0E7QUFDQTtBQUZBOzs7QUF3SUE7QUFBQTtBQUNBO0FBQUE7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7OztBQzdOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBREE7QUFDQTtBQVFBOzs7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUFHQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTs7OztBQXZDQTtBQUNBO0FBeUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUdBOzs7Ozs7O0FDbEVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQVBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQUNBO0FBQ0E7QUFUQTtBQUFBO0FBQ0E7QUFEQTtBQWFBO0FBYkE7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSkE7QUFDQTtBQWhCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXdCQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFWQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFVQTtBQVZBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFXQTtBQUNBO0FBQ0E7QUFiQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQXFCQTtBQUFBO0FBQ0E7QUF0QkE7QUFxQkE7QUFyQkE7QUE0QkE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKQTtBQUNBO0FBNUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBdUNBO0FBMUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwRUE7QUExRUE7QUFBQTtBQUNBO0FBREE7QUEyRUE7QUEzRUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=