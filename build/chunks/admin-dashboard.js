require("source-map-support").install();
exports.ids = ["admin-dashboard"];
exports.modules = {

/***/ "./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/routes/dashboard/Dashboard.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n\n  .Dashboard-widgets-3XUM4 {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-direction: row;\n      flex-direction: row;\n  margin: 15px;\n}\n\n  .Dashboard-widgets-3XUM4 > div:nth-child(1) {\n    margin-left: 0;\n  }\n\n  .Dashboard-widgets-3XUM4 > div:nth-last-child(1) {\n    margin-right: 0;\n  }\n", "", {"version":3,"sources":["/Volumes/DATA/work/luna-web-server/src/admin/routes/dashboard/Dashboard.css"],"names":[],"mappings":";;EAEE;EACA,qBAAqB;EACrB,cAAc;EACd,oBAAoB;MAChB,gBAAgB;EACpB,wBAAwB;MACpB,oBAAoB;EACxB,aAAa;CACd;;EAEC;IACE,eAAe;GAChB;;EAED;IACE,gBAAgB;GACjB","file":"Dashboard.css","sourcesContent":["\n\n  .widgets {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-direction: row;\n      flex-direction: row;\n  margin: 15px;\n}\n\n  .widgets > div:nth-child(1) {\n    margin-left: 0;\n  }\n\n  .widgets > div:nth-last-child(1) {\n    margin-right: 0;\n  }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"widgets": "Dashboard-widgets-3XUM4"
};

/***/ }),

/***/ "./src/admin/components/Widgets/QuickNotificationBanner/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var admin_actions_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/admin/actions/settings.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Widget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/admin/components/Widget/Widget.js");
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/components/Widgets/QuickNotificationBanner/index.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }









var QuickBanner =
/*#__PURE__*/
function (_React$Component) {
  _inherits(QuickBanner, _React$Component);

  function QuickBanner() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, QuickBanner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = QuickBanner.__proto__ || Object.getPrototypeOf(QuickBanner)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        active: false
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        // make something to switch
        _this.setState({
          active: !_this.state.active
        });
      }
    }), _temp));
  }

  _createClass(QuickBanner, [{
    key: "submitChanges",
    value: function submitChanges() {// this.props.updateSettings({})
      // this.props.updateGeneralSettings(this.state);
      // const state = [];
      // Object.keys(this.state).map(item => state.push({ option: item, value: this.state[item] }));
      // this.props.updateOption(state);
    }
  }, {
    key: "onChange",
    value: function onChange(toggle) {
      this.setState({
        maintenance: toggle
      });
    }
  }, {
    key: "render",
    value: function render() {
      var toggle = {
        action: this.handleChange,
        state: this.state.active
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Widget__WEBPACK_IMPORTED_MODULE_6__["default"], {
        title: "Quick Notification Banner",
        toggle: toggle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        className: "pt-input pt-fill",
        value: this.state.maintenance_message,
        name: "maintenance_message" // onChange={this.handleChange}
        ,
        placeholder: "Global website notification message ...",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }));
    }
  }]);

  return QuickBanner;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    options: state.options
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, {
  updateOption: admin_actions_settings__WEBPACK_IMPORTED_MODULE_4__["updateOption"]
})(QuickBanner));

/***/ }),

/***/ "./src/admin/routes/dashboard/Dashboard.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/routes/dashboard/Dashboard.css");
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
      module.hot.accept("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/routes/dashboard/Dashboard.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/routes/dashboard/Dashboard.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/admin/routes/dashboard/Dashboard.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Dashboard_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/admin/routes/dashboard/Dashboard.css");
/* harmony import */ var _Dashboard_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Dashboard_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Widgets_QuickNotificationBanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/admin/components/Widgets/QuickNotificationBanner/index.js");
/* harmony import */ var _components_Breadcrumbs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/admin/components/Breadcrumbs/Breadcrumbs.js");
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/routes/dashboard/Dashboard.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var Dashboard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    return _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));
  }

  _createClass(Dashboard, [{
    key: "render",
    value: function render() {
      var currentRoute = this.props.currentRoute;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "wrapper",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "actions",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Breadcrumbs__WEBPACK_IMPORTED_MODULE_5__["default"], {
        route: currentRoute,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Dashboard_css__WEBPACK_IMPORTED_MODULE_3___default.a.widgets,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widgets_QuickNotificationBanner__WEBPACK_IMPORTED_MODULE_4__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: this
      }))));
    }
  }]);

  return Dashboard;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Object.defineProperty(Dashboard, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {}
});
/* harmony default export */ __webpack_exports__["default"] = (isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_Dashboard_css__WEBPACK_IMPORTED_MODULE_3___default.a)(Dashboard));

/***/ }),

/***/ "./src/admin/routes/dashboard/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/admin/routes/dashboard/Dashboard.js");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/admin/components/Layout/Layout.js");
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/routes/dashboard/index.js";




function action(_ref) {
  var route = _ref.route;
  return {
    title: "Dashboard",
    component: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], {
      currentRoute: route,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Dashboard__WEBPACK_IMPORTED_MODULE_1__["default"], {
      currentRoute: route,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      },
      __self: this
    }))
  };
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2FkbWluLWRhc2hib2FyZC5qcyIsInNvdXJjZXMiOlsiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vcm91dGVzL2Rhc2hib2FyZC9EYXNoYm9hcmQuY3NzIiwiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vY29tcG9uZW50cy9XaWRnZXRzL1F1aWNrTm90aWZpY2F0aW9uQmFubmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9yb3V0ZXMvZGFzaGJvYXJkL0Rhc2hib2FyZC5jc3M/ZGVmYSIsIi9Wb2x1bWVzL0RBVEEvd29yay9sdW5hLXdlYi1zZXJ2ZXIvc3JjL2FkbWluL3JvdXRlcy9kYXNoYm9hcmQvRGFzaGJvYXJkLmpzIiwiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vcm91dGVzL2Rhc2hib2FyZC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuICAuRGFzaGJvYXJkLXdpZGdldHMtM1hVTTQge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtd3JhcDogd3JhcDtcXG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgbWFyZ2luOiAxNXB4O1xcbn1cXG5cXG4gIC5EYXNoYm9hcmQtd2lkZ2V0cy0zWFVNNCA+IGRpdjpudGgtY2hpbGQoMSkge1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gIH1cXG5cXG4gIC5EYXNoYm9hcmQtd2lkZ2V0cy0zWFVNNCA+IGRpdjpudGgtbGFzdC1jaGlsZCgxKSB7XFxuICAgIG1hcmdpbi1yaWdodDogMDtcXG4gIH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vcm91dGVzL2Rhc2hib2FyZC9EYXNoYm9hcmQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7O0VBRUU7RUFDQSxxQkFBcUI7RUFDckIsY0FBYztFQUNkLG9CQUFvQjtNQUNoQixnQkFBZ0I7RUFDcEIsd0JBQXdCO01BQ3BCLG9CQUFvQjtFQUN4QixhQUFhO0NBQ2Q7O0VBRUM7SUFDRSxlQUFlO0dBQ2hCOztFQUVEO0lBQ0UsZ0JBQWdCO0dBQ2pCXCIsXCJmaWxlXCI6XCJEYXNoYm9hcmQuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcblxcbiAgLndpZGdldHMge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtd3JhcDogd3JhcDtcXG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgbWFyZ2luOiAxNXB4O1xcbn1cXG5cXG4gIC53aWRnZXRzID4gZGl2Om50aC1jaGlsZCgxKSB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgfVxcblxcbiAgLndpZGdldHMgPiBkaXY6bnRoLWxhc3QtY2hpbGQoMSkge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XFxuICB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIndpZGdldHNcIjogXCJEYXNoYm9hcmQtd2lkZ2V0cy0zWFVNNFwiXG59OyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gXCJpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlc1wiO1xuaW1wb3J0IGN4IGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XG5pbXBvcnQgeyB1cGRhdGVPcHRpb24gfSBmcm9tICdhZG1pbi9hY3Rpb25zL3NldHRpbmdzJztcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCBXaWRnZXQgZnJvbSAnLi4vLi4vV2lkZ2V0JztcblxuY2xhc3MgUXVpY2tCYW5uZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRlID0ge1xuICAgIGFjdGl2ZTogZmFsc2UsXG4gIH1cblxuICBzdWJtaXRDaGFuZ2VzKCkge1xuICAgIC8vIHRoaXMucHJvcHMudXBkYXRlU2V0dGluZ3Moe30pXG4gICAgLy8gdGhpcy5wcm9wcy51cGRhdGVHZW5lcmFsU2V0dGluZ3ModGhpcy5zdGF0ZSk7XG4gICAgLy8gY29uc3Qgc3RhdGUgPSBbXTtcbiAgICAvLyBPYmplY3Qua2V5cyh0aGlzLnN0YXRlKS5tYXAoaXRlbSA9PiBzdGF0ZS5wdXNoKHsgb3B0aW9uOiBpdGVtLCB2YWx1ZTogdGhpcy5zdGF0ZVtpdGVtXSB9KSk7XG4gICAgLy8gdGhpcy5wcm9wcy51cGRhdGVPcHRpb24oc3RhdGUpO1xuICB9XG5cbiAgb25DaGFuZ2UodG9nZ2xlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG1haW50ZW5hbmNlOiB0b2dnbGUgfSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UgPSAoKSA9PiB7XG4gICAgLy8gbWFrZSBzb21ldGhpbmcgdG8gc3dpdGNoXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFjdGl2ZTogIXRoaXMuc3RhdGUuYWN0aXZlIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgY29uc3QgdG9nZ2xlID0ge1xuICAgICAgYWN0aW9uOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLmFjdGl2ZSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxXaWRnZXQgdGl0bGU9XCJRdWljayBOb3RpZmljYXRpb24gQmFubmVyXCIgdG9nZ2xlPXt0b2dnbGV9PlxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICBjbGFzc05hbWU9e1wicHQtaW5wdXQgcHQtZmlsbFwifVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm1haW50ZW5hbmNlX21lc3NhZ2V9XG4gICAgICAgICAgbmFtZT1cIm1haW50ZW5hbmNlX21lc3NhZ2VcIlxuICAgICAgICAgIC8vIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkdsb2JhbCB3ZWJzaXRlIG5vdGlmaWNhdGlvbiBtZXNzYWdlIC4uLlwiXG4gICAgICAgIC8+XG4gICAgICA8L1dpZGdldD5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+ICh7XG4gIG9wdGlvbnM6IHN0YXRlLm9wdGlvbnMsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIHsgdXBkYXRlT3B0aW9uIH0pKFF1aWNrQmFubmVyKTtcbiIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy0zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy00IS4vRGFzaGJvYXJkLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTQhLi9EYXNoYm9hcmQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy0zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy00IS4vRGFzaGJvYXJkLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICAiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tIFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIjtcbmltcG9ydCBzIGZyb20gXCIuL0Rhc2hib2FyZC5jc3NcIjtcbmltcG9ydCBRdWlja0Jhbm5lciBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9XaWRnZXRzL1F1aWNrTm90aWZpY2F0aW9uQmFubmVyXCI7XG5pbXBvcnQgQnJlYWRjcnVtYnMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvQnJlYWRjcnVtYnNcIjtcblxuY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGN1cnJlbnRSb3V0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwcGVyXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgPEJyZWFkY3J1bWJzIHJvdXRlPXtjdXJyZW50Um91dGV9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLndpZGdldHN9PlxuICAgICAgICAgICAgPFF1aWNrQmFubmVyIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoRGFzaGJvYXJkKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSBcIi4vRGFzaGJvYXJkXCI7XG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0xheW91dFwiO1xuXG5mdW5jdGlvbiBhY3Rpb24oeyByb3V0ZSB9KSB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IFwiRGFzaGJvYXJkXCIsXG4gICAgY29tcG9uZW50OiAoXG4gICAgICA8TGF5b3V0IGN1cnJlbnRSb3V0ZT17cm91dGV9PlxuICAgICAgICA8RGFzaGJvYXJkIGN1cnJlbnRSb3V0ZT17cm91dGV9IC8+XG4gICAgICA8L0xheW91dD5cbiAgICApLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb247XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFEQTs7Ozs7QUFnQkE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7QUFmQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7OztBQU9BO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBTEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0E7Ozs7QUF6Q0E7QUFDQTtBQTJDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQUE7Ozs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUlBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTs7O0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BOzs7O0FBekJBO0FBQ0E7QUFEQTs7OztBQUNBOztBQTJCQTs7Ozs7Ozs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBUUE7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=