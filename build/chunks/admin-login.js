require("source-map-support").install();
exports.ids = ["admin-login"];
exports.modules = {

/***/ "./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/routes/login/Login.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n\n.Login-root-32Dsp {\n  color: white;\n  margin: 260px auto auto;\n  max-width: 280px;\n  width: 100%;\n}\n\n.Login-logo-3vGwZ {\n    display: block;\n    position: relative;\n    margin: 0 auto 60px auto;\n    max-width: 178px;\n}\n\n.Login-logo-3vGwZ object {\n      position: relative;\n      display: inherit;\n      max-width: 100%;\n    }\n\n.Login-container-m3gaj {\n  margin: 0 auto;\n  padding: 0;\n  width: 100%;\n}", "", {"version":3,"sources":["/Volumes/DATA/work/luna-web-server/src/admin/routes/login/Login.css"],"names":[],"mappings":";;AAEA;EACE,aAAa;EACb,wBAAwB;EACxB,iBAAiB;EACjB,YAAY;CACb;;AAED;IACI,eAAe;IACf,mBAAmB;IACnB,yBAAyB;IACzB,iBAAiB;CACpB;;AAED;MACM,mBAAmB;MACnB,iBAAiB;MACjB,gBAAgB;KACjB;;AAEL;EACE,eAAe;EACf,WAAW;EACX,YAAY;CACb","file":"Login.css","sourcesContent":["\n\n.root {\n  color: white;\n  margin: 260px auto auto;\n  max-width: 280px;\n  width: 100%;\n}\n\n.logo {\n    display: block;\n    position: relative;\n    margin: 0 auto 60px auto;\n    max-width: 178px;\n}\n\n.logo object {\n      position: relative;\n      display: inherit;\n      max-width: 100%;\n    }\n\n.container {\n  margin: 0 auto;\n  padding: 0;\n  width: 100%;\n}"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Login-root-32Dsp",
	"logo": "Login-logo-3vGwZ",
	"container": "Login-container-m3gaj"
};

/***/ }),

/***/ "./src/admin/routes/login/Login.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/routes/login/Login.css");
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
      module.hot.accept("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/routes/login/Login.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--6-rules-2!./node_modules/postcss-loader/lib/index.js??ref--6-rules-3!./node_modules/postcss-loader/lib/index.js??ref--6-rules-4!./src/admin/routes/login/Login.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/admin/routes/login/Login.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Login_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/admin/routes/login/Login.css");
/* harmony import */ var _Login_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Login_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/admin/actions/auth.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_feather_dist_icons_user__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("react-feather/dist/icons/user");
/* harmony import */ var react_feather_dist_icons_user__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_user__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_feather_dist_icons_lock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("react-feather/dist/icons/lock");
/* harmony import */ var react_feather_dist_icons_lock__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_feather_dist_icons_lock__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_loaders__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("react-loaders");
/* harmony import */ var react_loaders__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_loaders__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_Logo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/admin/components/Logo/Logo.js");
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("@blueprintjs/core");
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_history__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./src/core/history.js");
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/routes/login/Login.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }















var messages = Object(react_intl__WEBPACK_IMPORTED_MODULE_4__["defineMessages"])({
  loginArea: {
    id: "login.area",
    defaultMessage: "Lunajets Admin area",
    description: "Admin area"
  },
  loginEmail: {
    id: "login.email",
    defaultMessage: "Email",
    description: "Brand name displayed in header"
  },
  loginPassword: {
    id: "login.password",
    defaultMessage: "Password",
    description: "Title in page header"
  },
  resetPassword: {
    id: "login.reset.password",
    defaultMessage: "Reset Password",
    description: "Link reset password"
  }
});
var EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

var Login =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    var _this;

    _classCallCheck(this, Login);

    _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "refHandlers", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        toaster: function toaster(ref) {
          return _this.toaster = ref;
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleSubmit", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        e.preventDefault();

        _this.toaster.clear();

        _this.props.login({
          login: {
            email: _this.email.value,
            password: _this.password.value
          }
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onToasterSuccessDismiss", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        core_history__WEBPACK_IMPORTED_MODULE_13__["default"].replace('/');
      }
    });
    return _this;
  }

  _createClass(Login, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      if (nextProps.auth.errors && nextProps.auth.errors instanceof Array) {
        this.toaster.show({
          message: nextProps.auth.errors[0].message,
          timeout: 3000,
          intent: _blueprintjs_core__WEBPACK_IMPORTED_MODULE_12__["Intent"].DANGER,
          iconName: "pt-icon-error"
        });
      }

      if (nextProps.auth.token) {
        this.toaster.show({
          message: "Success! Wai't while we redirect you",
          timeout: 3000,
          intent: _blueprintjs_core__WEBPACK_IMPORTED_MODULE_12__["Intent"].SUCCESS,
          onDismiss: this.onToasterSuccessDismiss,
          iconName: "pt-icon-tick-circle",
          action: {
            text: "Let's Go",
            onClick: this.onToasterSuccessDismiss
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props$auth = this.props.auth,
          errors = _props$auth.errors,
          _props$auth$loading = _props$auth.loading,
          loading = _props$auth$loading === void 0 ? false : _props$auth$loading;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_7___default()(_Login_css__WEBPACK_IMPORTED_MODULE_5___default.a.root),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_7___default()(_Login_css__WEBPACK_IMPORTED_MODULE_5___default.a.container),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Login_css__WEBPACK_IMPORTED_MODULE_5___default.a.logo,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Logo__WEBPACK_IMPORTED_MODULE_11__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_12__["Toaster"], {
        position: _blueprintjs_core__WEBPACK_IMPORTED_MODULE_12__["Position"].TOP,
        ref: this.refHandlers.toaster,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: this.handleSubmit,
        ref: function ref(el) {
          return _this2.loginForm = el;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pt-form-group",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pt-input-group",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "pt-icon pt-icon-user",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "pt-input",
        type: "email",
        name: "email",
        id: "email-input",
        placeholder: "Type your Email ...",
        ref: function ref(input) {
          return _this2.email = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pt-form-group",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pt-input-group",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "password",
        name: "password",
        id: "password-input",
        ref: function ref(input) {
          return _this2.password = input;
        },
        className: "pt-input",
        placeholder: "Enter your password...",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "pt-icon pt-icon-lock",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pt-form-group",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        type: "submit",
        className: "pt-button pt-fill pt-ui-text",
        intent: _blueprintjs_core__WEBPACK_IMPORTED_MODULE_12__["Intent"].NONE,
        loading: loading,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        },
        __self: this
      }, "Login")))));
    }
  }]);

  return Login;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Object.defineProperty(Login, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    login: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
  }
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    auth: state.auth
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, {
  login: _actions_auth__WEBPACK_IMPORTED_MODULE_6__["login"]
})(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_Login_css__WEBPACK_IMPORTED_MODULE_5___default.a)(Login)));

/***/ }),

/***/ "./src/admin/routes/login/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/admin/routes/login/Login.js");
/* harmony import */ var admin_components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/admin/components/Layout/Layout.js");
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/admin/routes/login/index.js";




function action(_ref) {
  var route = _ref.route,
      client = _ref.client,
      fetch = _ref.fetch,
      store = _ref.store;
  var user = store.getState().auth.user; // if (user) {
  //   if (route.parent) {
  //     return { redirect: route.parent.path };
  //   }
  //   return { redirect: "" };
  // }

  return {
    title: "Login",
    chunk: 'admin-login',
    component: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(admin_components_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], {
      hideNav: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Login__WEBPACK_IMPORTED_MODULE_1__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    }))
  };
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2FkbWluLWxvZ2luLmpzIiwic291cmNlcyI6WyIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9yb3V0ZXMvbG9naW4vTG9naW4uY3NzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9yb3V0ZXMvbG9naW4vTG9naW4uY3NzPzZiNjIiLCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9yb3V0ZXMvbG9naW4vTG9naW4uanMiLCIvVm9sdW1lcy9EQVRBL3dvcmsvbHVuYS13ZWItc2VydmVyL3NyYy9hZG1pbi9yb3V0ZXMvbG9naW4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcbi5Mb2dpbi1yb290LTMyRHNwIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbjogMjYwcHggYXV0byBhdXRvO1xcbiAgbWF4LXdpZHRoOiAyODBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uTG9naW4tbG9nby0zdkd3WiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbjogMCBhdXRvIDYwcHggYXV0bztcXG4gICAgbWF4LXdpZHRoOiAxNzhweDtcXG59XFxuXFxuLkxvZ2luLWxvZ28tM3ZHd1ogb2JqZWN0IHtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgZGlzcGxheTogaW5oZXJpdDtcXG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIH1cXG5cXG4uTG9naW4tY29udGFpbmVyLW0zZ2FqIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZzogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvYWRtaW4vcm91dGVzL2xvZ2luL0xvZ2luLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHdCQUF3QjtFQUN4QixpQkFBaUI7RUFDakIsWUFBWTtDQUNiOztBQUVEO0lBQ0ksZUFBZTtJQUNmLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsaUJBQWlCO0NBQ3BCOztBQUVEO01BQ00sbUJBQW1CO01BQ25CLGlCQUFpQjtNQUNqQixnQkFBZ0I7S0FDakI7O0FBRUw7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLFlBQVk7Q0FDYlwiLFwiZmlsZVwiOlwiTG9naW4uY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcblxcbi5yb290IHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbjogMjYwcHggYXV0byBhdXRvO1xcbiAgbWF4LXdpZHRoOiAyODBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ubG9nbyB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbjogMCBhdXRvIDYwcHggYXV0bztcXG4gICAgbWF4LXdpZHRoOiAxNzhweDtcXG59XFxuXFxuLmxvZ28gb2JqZWN0IHtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgZGlzcGxheTogaW5oZXJpdDtcXG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIH1cXG5cXG4uY29udGFpbmVyIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZzogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkxvZ2luLXJvb3QtMzJEc3BcIixcblx0XCJsb2dvXCI6IFwiTG9naW4tbG9nby0zdkd3WlwiLFxuXHRcImNvbnRhaW5lclwiOiBcIkxvZ2luLWNvbnRhaW5lci1tM2dhalwiXG59OyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy0zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNi1ydWxlcy00IS4vTG9naW4uY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtNCEuL0xvZ2luLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtNCEuL0xvZ2luLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICAiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tIFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIjtcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmltcG9ydCB7IGRlZmluZU1lc3NhZ2VzLCBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSBcInJlYWN0LWludGxcIjtcbmltcG9ydCBzIGZyb20gXCIuL0xvZ2luLmNzc1wiO1xuaW1wb3J0IHsgbG9naW4gfSBmcm9tIFwiLi4vLi4vYWN0aW9ucy9hdXRoXCI7XG5pbXBvcnQgY3ggZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCBVc2VyIGZyb20gXCJyZWFjdC1mZWF0aGVyL2Rpc3QvaWNvbnMvdXNlclwiO1xuaW1wb3J0IExvY2sgZnJvbSBcInJlYWN0LWZlYXRoZXIvZGlzdC9pY29ucy9sb2NrXCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwicmVhY3QtbG9hZGVyc1wiO1xuaW1wb3J0IExvZ28gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvTG9nb1wiO1xuaW1wb3J0IHsgQnV0dG9uLCBQb3NpdGlvbiwgVG9hc3RlciwgSW50ZW50IH0gZnJvbSBcIkBibHVlcHJpbnRqcy9jb3JlXCI7XG5pbXBvcnQgaGlzdG9yeSBmcm9tIFwiY29yZS9oaXN0b3J5XCI7XG5cbmNvbnN0IG1lc3NhZ2VzID0gZGVmaW5lTWVzc2FnZXMoe1xuICBsb2dpbkFyZWE6IHtcbiAgICBpZDogXCJsb2dpbi5hcmVhXCIsXG4gICAgZGVmYXVsdE1lc3NhZ2U6IFwiTHVuYWpldHMgQWRtaW4gYXJlYVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFkbWluIGFyZWFcIixcbiAgfSxcbiAgbG9naW5FbWFpbDoge1xuICAgIGlkOiBcImxvZ2luLmVtYWlsXCIsXG4gICAgZGVmYXVsdE1lc3NhZ2U6IFwiRW1haWxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJCcmFuZCBuYW1lIGRpc3BsYXllZCBpbiBoZWFkZXJcIixcbiAgfSxcbiAgbG9naW5QYXNzd29yZDoge1xuICAgIGlkOiBcImxvZ2luLnBhc3N3b3JkXCIsXG4gICAgZGVmYXVsdE1lc3NhZ2U6IFwiUGFzc3dvcmRcIixcbiAgICBkZXNjcmlwdGlvbjogXCJUaXRsZSBpbiBwYWdlIGhlYWRlclwiLFxuICB9LFxuICByZXNldFBhc3N3b3JkOiB7XG4gICAgaWQ6IFwibG9naW4ucmVzZXQucGFzc3dvcmRcIixcbiAgICBkZWZhdWx0TWVzc2FnZTogXCJSZXNldCBQYXNzd29yZFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkxpbmsgcmVzZXQgcGFzc3dvcmRcIixcbiAgfSxcbn0pO1xuXG5jb25zdCBFTUFJTF9QQVRURVJOID0gL15bYS16QS1aMC05Ll8tXStAW2EtekEtWjAtOS4tXStcXC5bYS16QS1aXXsyLDR9JC87XG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICByZWZIYW5kbGVycyA9IHtcbiAgICB0b2FzdGVyOiByZWYgPT4gdGhpcy50b2FzdGVyID0gcmVmLFxuICB9O1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbG9naW46IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgaGFuZGxlU3VibWl0ID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLnRvYXN0ZXIuY2xlYXIoKTtcblxuICAgIHRoaXMucHJvcHMubG9naW4oe1xuICAgICAgbG9naW46IHtcbiAgICAgICAgZW1haWw6IHRoaXMuZW1haWwudmFsdWUsXG4gICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLnZhbHVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5hdXRoLmVycm9ycyAmJiBuZXh0UHJvcHMuYXV0aC5lcnJvcnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy50b2FzdGVyLnNob3coe1xuICAgICAgICBtZXNzYWdlOiBuZXh0UHJvcHMuYXV0aC5lcnJvcnNbMF0ubWVzc2FnZSxcbiAgICAgICAgdGltZW91dDogMzAwMCxcbiAgICAgICAgaW50ZW50OiBJbnRlbnQuREFOR0VSLFxuICAgICAgICBpY29uTmFtZTogXCJwdC1pY29uLWVycm9yXCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobmV4dFByb3BzLmF1dGgudG9rZW4pIHtcbiAgICAgIHRoaXMudG9hc3Rlci5zaG93KHtcbiAgICAgICAgbWVzc2FnZTogXCJTdWNjZXNzISBXYWkndCB3aGlsZSB3ZSByZWRpcmVjdCB5b3VcIixcbiAgICAgICAgdGltZW91dDogMzAwMCxcbiAgICAgICAgaW50ZW50OiBJbnRlbnQuU1VDQ0VTUyxcbiAgICAgICAgb25EaXNtaXNzOiB0aGlzLm9uVG9hc3RlclN1Y2Nlc3NEaXNtaXNzLFxuICAgICAgICBpY29uTmFtZTogXCJwdC1pY29uLXRpY2stY2lyY2xlXCIsXG4gICAgICAgIGFjdGlvbjoge1xuICAgICAgICAgIHRleHQ6IFwiTGV0J3MgR29cIixcbiAgICAgICAgICBvbkNsaWNrOiB0aGlzLm9uVG9hc3RlclN1Y2Nlc3NEaXNtaXNzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Ub2FzdGVyU3VjY2Vzc0Rpc21pc3MgPSAoKSA9PiB7XG4gICAgaGlzdG9yeS5yZXBsYWNlKCcvJyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBlcnJvcnMsIGxvYWRpbmcgPSBmYWxzZSB9ID0gdGhpcy5wcm9wcy5hdXRoO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeChzLnJvb3QpfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KHMuY29udGFpbmVyKX0+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5sb2dvfT5cbiAgICAgICAgICAgIDxMb2dvIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8VG9hc3RlciBwb3NpdGlvbj17UG9zaXRpb24uVE9QfSByZWY9e3RoaXMucmVmSGFuZGxlcnMudG9hc3Rlcn0gLz5cblxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0gcmVmPXtlbCA9PiB0aGlzLmxvZ2luRm9ybSA9IGVsfT5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwdC1pY29uIHB0LWljb24tdXNlclwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwdC1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIGlkPVwiZW1haWwtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIHlvdXIgRW1haWwgLi4uXCJcbiAgICAgICAgICAgICAgICAgIHJlZj17aW5wdXQgPT4gdGhpcy5lbWFpbCA9IGlucHV0fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtZm9ybS1ncm91cFwiPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgaWQ9XCJwYXNzd29yZC1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICByZWY9e2lucHV0ID0+IHRoaXMucGFzc3dvcmQgPSBpbnB1dH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB0LWlucHV0XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBwYXNzd29yZC4uLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwdC1pY29uIHB0LWljb24tbG9ja1wiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJwdC1idXR0b24gcHQtZmlsbCBwdC11aS10ZXh0XCIgaW50ZW50PXtJbnRlbnQuTk9ORX0gbG9hZGluZz17bG9hZGluZ30+TG9naW48L0J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKHtcbiAgYXV0aDogc3RhdGUuYXV0aCxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgeyBsb2dpbiB9KSh3aXRoU3R5bGVzKHMpKExvZ2luKSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTG9naW4gZnJvbSBcIi4vTG9naW5cIjtcbmltcG9ydCBMYXlvdXQgZnJvbSBcImFkbWluL2NvbXBvbmVudHMvTGF5b3V0XCI7XG5cbmZ1bmN0aW9uIGFjdGlvbih7XG4gIHJvdXRlLCBjbGllbnQsIGZldGNoLCBzdG9yZSxcbn0pIHtcbiAgY29uc3QgeyB1c2VyIH0gPSBzdG9yZS5nZXRTdGF0ZSgpLmF1dGg7XG5cbiAgLy8gaWYgKHVzZXIpIHtcbiAgLy8gICBpZiAocm91dGUucGFyZW50KSB7XG4gIC8vICAgICByZXR1cm4geyByZWRpcmVjdDogcm91dGUucGFyZW50LnBhdGggfTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIHsgcmVkaXJlY3Q6IFwiXCIgfTtcbiAgLy8gfVxuXG4gIHJldHVybiB7XG4gICAgdGl0bGU6IFwiTG9naW5cIixcbiAgICBjaHVuazogJ2FkbWluLWxvZ2luJyxcbiAgICBjb21wb25lbnQ6IChcbiAgICAgIDxMYXlvdXQgaGlkZU5hdj5cbiAgICAgICAgPExvZ2luIC8+XG4gICAgICA8L0xheW91dD5cbiAgICApLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb247XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWhCQTtBQXVCQTtBQUNBO0FBQ0E7Ozs7O0FBVUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVBBO0FBQUE7QUFBQTtBQURBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFNQTtBQWZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTJDQTtBQUNBO0FBNUNBO0FBQUE7QUFFQTtBQUNBOzs7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFOQTtBQVdBO0FBQ0E7OztBQU1BO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTs7OztBQTVHQTtBQUNBO0FBREE7Ozs7QUFNQTtBQUNBO0FBREE7OztBQXlHQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUxBO0FBU0E7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=