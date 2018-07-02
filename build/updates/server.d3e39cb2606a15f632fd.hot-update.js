require("source-map-support").install();
exports.id = "server";
exports.modules = {

/***/ "./src/themes/lunajets/components/Content/Detail/JetCost/JetCostEstimation/JetCostEstimation.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var themes_lunajets_components_Forms_RequestFlight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/themes/lunajets/components/Forms/RequestFlight/requestFlight.js");
/* harmony import */ var themes_lunajets_components_Layout_SectionTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/themes/lunajets/components/Layout/SectionTitle/SectionTitle.js");
/* harmony import */ var themes_lunajets_components_Primitives_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/themes/lunajets/components/Primitives/Button/Button.js");
/* harmony import */ var themes_lunajets_components_Primitives_Text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/themes/lunajets/components/Primitives/Text/Text.js");
/* harmony import */ var _JetCostEstimationRow_JetCostEstimationRow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/themes/lunajets/components/Content/Detail/JetCost/JetCostEstimationRow/JetCostEstimationRow.js");
/* harmony import */ var themes_lunajets_actions_requestFlight__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/themes/lunajets/actions/requestFlight.js");
/* harmony import */ var _JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/themes/lunajets/components/Content/Detail/JetCost/JetCostEstimation/JetCostEstimation.scss");
/* harmony import */ var _JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11__);
var _jsxFileName = "/Volumes/DATA/work/luna-web-server/src/themes/lunajets/components/Content/Detail/JetCost/JetCostEstimation/JetCostEstimation.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }














var JetCostEstimation =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JetCostEstimation, _React$Component);

  function JetCostEstimation(props) {
    var _this;

    _classCallCheck(this, JetCostEstimation);

    _this = _possibleConstructorReturn(this, (JetCostEstimation.__proto__ || Object.getPrototypeOf(JetCostEstimation)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "requestFlight", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(estimation) {
        var _this$props = _this.props,
            city = _this$props.city,
            goToStep = _this$props.goToStep,
            changeLocation = _this$props.changeLocation,
            index = _this$props.index;

        if (estimation) {
          var fromCityName = estimation.from_airport.city ? estimation.from_airport.city.name : "";
          var fromCountryName = estimation.from_airport.city && estimation.from_airport.city.country ? estimation.from_airport.city.country.name : "";
          var fromCountryCode = estimation.from_airport.city && estimation.from_airport.city.country ? estimation.from_airport.city.country.countryCode : "";
          var toCityName = estimation.to_airport.city ? estimation.to_airport.city.name : "";
          var toCountryName = estimation.to_airport.city && estimation.to_airport.city.country ? estimation.to_airport.city.country.name : "";
          var toCountryCode = estimation.to_airport.city && estimation.to_airport.city.country ? estimation.to_airport.city.country.countryCode : "";
          var flyFromValue = {
            __typename: "LocationType",
            label: fromCityName + ", " + fromCountryName,
            value: fromCityName + ", " + fromCountryName,
            countryCode: fromCountryCode,
            geometry: {
              location: {
                lat: estimation.from_airport.coordinates.split(',')[0],
                lng: estimation.from_airport.coordinates.split(',')[0]
              }
            }
          };
          var flyToValue = {
            __typename: "LocationType",
            label: toCityName + ", " + toCountryName,
            value: toCityName + ", " + toCountryName,
            countryCode: toCountryCode,
            geometry: {
              location: {
                lat: estimation.to_airport.coordinates.split(',')[0],
                lng: estimation.to_airport.coordinates.split(',')[0]
              }
            }
          };
          changeLocation({
            direction: "from",
            value: flyFromValue,
            index: index
          });
          changeLocation({
            direction: "to",
            value: flyToValue,
            index: index
          });
        } else if (city) {
          var cityName = city ? city.name : "";
          var countryName = city && city.country ? city.country.name : "";
          var _flyToValue = {
            __typename: "LocationType",
            label: cityName + ", " + countryName,
            value: cityName + ", " + countryName,
            countryCode: city.country ? city.country.countryCode : "",
            geometry: {
              location: {
                lat: city.coordinates.split(',')[0],
                lng: city.coordinates.split(',')[0]
              }
            }
          };
          changeLocation({
            direction: "to",
            value: _flyToValue,
            index: index
          });
        }

        goToStep({
          step: 1
        });
      }
    });
    return _this;
  }

  _createClass(JetCostEstimation, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {}
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          showEnquire = _props.showEnquire,
          showLength = _props.showLength,
          city = _props.city,
          locale = _props.locale;
      console.log("es-data:", data);
      var seoJson = "";

      if (data) {
        seoJson += "[";
        data.map(function (leg, index) {
          seoJson += "{";
          seoJson += '  "@context": "http://schema.org",';
          seoJson += '  "@type": "FlightReservation",';
          seoJson += '  "reservationId": "' + leg.id + '",';
          seoJson += '  "reservationStatus": "http://schema.org/Confirmed",';
          seoJson += '  "underName": {"@type": "Person", "name": "Eva Green"},';
          seoJson += '  "reservationFor": {';
          seoJson += '      "@type": "Flight",';
          seoJson += '      "flightNumber": "' + leg.id + '",';
          seoJson += '      "airline": { "@type": "Airline", "name": "United", "iataCode": "UA"},';
          seoJson += '      "departureAirport": { "@type": "Airport", "name": "' + leg.from_airport.name + '", "iataCode": "' + leg.from_airport.iata + '" },';
          seoJson += '      "departureTime": "' + leg.from_date + '",';
          seoJson += '      "arrivalAirport": { "@type": "Airport", "name": "' + leg.to_airport.name + '", "iataCode": "' + leg.to_airport.iata + '" },';
          seoJson += "  }";
          seoJson += "}";

          if (index + 1 < data.length) {
            seoJson += ",";
          }
        });
        seoJson += "]";
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("container lj-pad-y-50", _JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a.container),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
        type: "application/ld+json",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      }, seoJson), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(themes_lunajets_components_Primitives_Text__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("text-secondary uppercase", _JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["section-title1"]),
        id: "client.jet-cost-estimation.price-estimation-header",
        defaultMessage: "Price Estimations",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("row my-5", _JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["estimation-table"]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "col",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("row", _JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["table-header"]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["origin"]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(themes_lunajets_components_Primitives_Text__WEBPACK_IMPORTED_MODULE_8__["default"], {
        defaultMessage: "FROM",
        id: "jet-cost-estimation-text-from",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["aircraft"]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["destination"]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(themes_lunajets_components_Primitives_Text__WEBPACK_IMPORTED_MODULE_8__["default"], {
        defaultMessage: "TO",
        id: "jet-cost-estimation-text-to",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["flight-time"]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(themes_lunajets_components_Primitives_Text__WEBPACK_IMPORTED_MODULE_8__["default"], {
        defaultMessage: "FLIGHT TIME",
        id: "jet-cost-estimation-text-flight-time",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["aircraft-wrap"]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(themes_lunajets_components_Primitives_Text__WEBPACK_IMPORTED_MODULE_8__["default"], {
        defaultMessage: "AIRCRAFT",
        id: "jet-cost-estimation-text-aircraft",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["leg-price"], _JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["desktop-only"]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(themes_lunajets_components_Primitives_Text__WEBPACK_IMPORTED_MODULE_8__["default"], {
        defaultMessage: "ESTIMATED PRICE",
        id: "jet-cost-estimation-text-estimated-price",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("d-md-none", _JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a["leg-price"]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(themes_lunajets_components_Primitives_Text__WEBPACK_IMPORTED_MODULE_8__["default"], {
        defaultMessage: "PRICE",
        id: "jet-cost-estimation-text-price",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        },
        __self: this
      }))), data.map(function (estimation, index) {
        return showLength === -1 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_JetCostEstimationRow_JetCostEstimationRow__WEBPACK_IMPORTED_MODULE_9__["default"], {
          key: estimation.id,
          version: 3,
          leg: estimation,
          locale: locale,
          showEnquire: showEnquire,
          onEnquire: function onEnquire(est) {
            return _this2.requestFlight(est);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 165
          },
          __self: this
        }) : index < showLength ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_JetCostEstimationRow_JetCostEstimationRow__WEBPACK_IMPORTED_MODULE_9__["default"], {
          key: estimation.id,
          version: 3,
          leg: estimation,
          locale: locale,
          showEnquire: showEnquire,
          onEnquire: function onEnquire(est) {
            return _this2.requestFlight(est);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 168
          },
          __self: this
        }) : null;
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col d-flex justify-content-center",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(themes_lunajets_components_Primitives_Button__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "btn-outline-primary w-100",
        defaultMessage: "ask us for a quote",
        textId: "client.jetCostDestination.askUsForAQuote",
        id: "quote_request",
        onClick: function onClick() {
          return _this2.requestFlight();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178
        },
        __self: this
      }))));
    }
  }]);

  return JetCostEstimation;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

JetCostEstimation.propTypes = {
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  showEnquire: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  showLength: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};
JetCostEstimation.defaultProps = {
  data: [],
  showEnquire: false,
  showLength: -1
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    index: state.requestFlight.legs.length - 1
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, {
  goToStep: themes_lunajets_actions_requestFlight__WEBPACK_IMPORTED_MODULE_10__["goToStep"],
  changeLocation: themes_lunajets_actions_requestFlight__WEBPACK_IMPORTED_MODULE_10__["changeLocation"],
  updateContact: themes_lunajets_actions_requestFlight__WEBPACK_IMPORTED_MODULE_10__["updateContact"]
})(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_3___default()(_JetCostEstimation_scss__WEBPACK_IMPORTED_MODULE_11___default.a)(JetCostEstimation)));

/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9zZXJ2ZXIuZDNlMzljYjI2MDZhMTVmNjMyZmQuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsiL1ZvbHVtZXMvREFUQS93b3JrL2x1bmEtd2ViLXNlcnZlci9zcmMvdGhlbWVzL2x1bmFqZXRzL2NvbXBvbmVudHMvQ29udGVudC9EZXRhaWwvSmV0Q29zdC9KZXRDb3N0RXN0aW1hdGlvbi9KZXRDb3N0RXN0aW1hdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0IFJlcXVlc3RGbGlnaHQgZnJvbSBcInRoZW1lcy9sdW5hamV0cy9jb21wb25lbnRzL0Zvcm1zL1JlcXVlc3RGbGlnaHRcIjtcbmltcG9ydCBTZWN0aW9uVGl0bGUgZnJvbSBcInRoZW1lcy9sdW5hamV0cy9jb21wb25lbnRzL0xheW91dC9TZWN0aW9uVGl0bGVcIjtcbmltcG9ydCBCdXR0b24gZnJvbSBcInRoZW1lcy9sdW5hamV0cy9jb21wb25lbnRzL1ByaW1pdGl2ZXMvQnV0dG9uXCI7XG5pbXBvcnQgVGV4dCBmcm9tIFwidGhlbWVzL2x1bmFqZXRzL2NvbXBvbmVudHMvUHJpbWl0aXZlcy9UZXh0XCI7XG5pbXBvcnQgSmV0Q29zdEVzdGltYXRpb25Sb3cgZnJvbSBcIi4uL0pldENvc3RFc3RpbWF0aW9uUm93L0pldENvc3RFc3RpbWF0aW9uUm93XCI7XG5pbXBvcnQgeyBnb1RvU3RlcCwgY2hhbmdlTG9jYXRpb24sIHVwZGF0ZUNvbnRhY3QgfSBmcm9tIFwidGhlbWVzL2x1bmFqZXRzL2FjdGlvbnMvcmVxdWVzdEZsaWdodFwiXG5cblxuaW1wb3J0IHMgZnJvbSBcIi4vSmV0Q29zdEVzdGltYXRpb24uc2Nzc1wiO1xuXG5jbGFzcyBKZXRDb3N0RXN0aW1hdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7fVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge31cblxuICByZXF1ZXN0RmxpZ2h0ID0gKGVzdGltYXRpb24pID0+IHtcbiAgICBsZXQgeyBjaXR5LCBnb1RvU3RlcCwgY2hhbmdlTG9jYXRpb24sIGluZGV4fSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoZXN0aW1hdGlvbikge1xuICAgICAgY29uc3QgZnJvbUNpdHlOYW1lID0gZXN0aW1hdGlvbi5mcm9tX2FpcnBvcnQuY2l0eSA/IGVzdGltYXRpb24uZnJvbV9haXJwb3J0LmNpdHkubmFtZSA6IFwiXCI7XG4gICAgICBjb25zdCBmcm9tQ291bnRyeU5hbWUgPSBlc3RpbWF0aW9uLmZyb21fYWlycG9ydC5jaXR5ICYmIGVzdGltYXRpb24uZnJvbV9haXJwb3J0LmNpdHkuY291bnRyeSA/IGVzdGltYXRpb24uZnJvbV9haXJwb3J0LmNpdHkuY291bnRyeS5uYW1lIDogXCJcIjtcbiAgICAgIGNvbnN0IGZyb21Db3VudHJ5Q29kZSA9IGVzdGltYXRpb24uZnJvbV9haXJwb3J0LmNpdHkgJiYgZXN0aW1hdGlvbi5mcm9tX2FpcnBvcnQuY2l0eS5jb3VudHJ5ID8gZXN0aW1hdGlvbi5mcm9tX2FpcnBvcnQuY2l0eS5jb3VudHJ5LmNvdW50cnlDb2RlIDogXCJcIjtcbiAgICAgIGNvbnN0IHRvQ2l0eU5hbWUgPSBlc3RpbWF0aW9uLnRvX2FpcnBvcnQuY2l0eSA/IGVzdGltYXRpb24udG9fYWlycG9ydC5jaXR5Lm5hbWUgOiBcIlwiO1xuICAgICAgY29uc3QgdG9Db3VudHJ5TmFtZSA9IGVzdGltYXRpb24udG9fYWlycG9ydC5jaXR5ICYmIGVzdGltYXRpb24udG9fYWlycG9ydC5jaXR5LmNvdW50cnkgPyBlc3RpbWF0aW9uLnRvX2FpcnBvcnQuY2l0eS5jb3VudHJ5Lm5hbWUgOiBcIlwiO1xuICAgICAgY29uc3QgdG9Db3VudHJ5Q29kZSA9IGVzdGltYXRpb24udG9fYWlycG9ydC5jaXR5ICYmIGVzdGltYXRpb24udG9fYWlycG9ydC5jaXR5LmNvdW50cnkgPyBlc3RpbWF0aW9uLnRvX2FpcnBvcnQuY2l0eS5jb3VudHJ5LmNvdW50cnlDb2RlIDogXCJcIjtcbiAgICBcbiAgICAgIGNvbnN0IGZseUZyb21WYWx1ZT0ge1xuICAgICAgICBfX3R5cGVuYW1lOiBcIkxvY2F0aW9uVHlwZVwiLFxuICAgICAgICBsYWJlbDogZnJvbUNpdHlOYW1lICsgXCIsIFwiICsgZnJvbUNvdW50cnlOYW1lLFxuICAgICAgICB2YWx1ZTogZnJvbUNpdHlOYW1lICsgXCIsIFwiICsgZnJvbUNvdW50cnlOYW1lLFxuICAgICAgICBjb3VudHJ5Q29kZTogZnJvbUNvdW50cnlDb2RlLFxuICAgICAgICBnZW9tZXRyeToge1xuICAgICAgICAgIGxvY2F0aW9uOntcbiAgICAgICAgICAgIGxhdCA6IGVzdGltYXRpb24uZnJvbV9haXJwb3J0LmNvb3JkaW5hdGVzLnNwbGl0KCcsJylbMF0sXG4gICAgICAgICAgICBsbmcgOiBlc3RpbWF0aW9uLmZyb21fYWlycG9ydC5jb29yZGluYXRlcy5zcGxpdCgnLCcpWzBdLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgZmx5VG9WYWx1ZT0ge1xuICAgICAgICBfX3R5cGVuYW1lOiBcIkxvY2F0aW9uVHlwZVwiLFxuICAgICAgICBsYWJlbDogdG9DaXR5TmFtZSArIFwiLCBcIiArIHRvQ291bnRyeU5hbWUsXG4gICAgICAgIHZhbHVlOiB0b0NpdHlOYW1lICsgXCIsIFwiICsgdG9Db3VudHJ5TmFtZSxcbiAgICAgICAgY291bnRyeUNvZGU6IHRvQ291bnRyeUNvZGUsXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgbG9jYXRpb246e1xuICAgICAgICAgICAgbGF0IDogZXN0aW1hdGlvbi50b19haXJwb3J0LmNvb3JkaW5hdGVzLnNwbGl0KCcsJylbMF0sXG4gICAgICAgICAgICBsbmcgOiBlc3RpbWF0aW9uLnRvX2FpcnBvcnQuY29vcmRpbmF0ZXMuc3BsaXQoJywnKVswXSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjaGFuZ2VMb2NhdGlvbih7XG4gICAgICAgIGRpcmVjdGlvbjogXCJmcm9tXCIsXG4gICAgICAgIHZhbHVlOiBmbHlGcm9tVmFsdWUsXG4gICAgICAgIGluZGV4LFxuICAgICAgfSk7XG4gICAgICBjaGFuZ2VMb2NhdGlvbih7XG4gICAgICAgIGRpcmVjdGlvbjogXCJ0b1wiLFxuICAgICAgICB2YWx1ZTogZmx5VG9WYWx1ZSxcbiAgICAgICAgaW5kZXgsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNpdHkpe1xuICAgICAgY29uc3QgY2l0eU5hbWUgPSBjaXR5ID8gY2l0eS5uYW1lIDogXCJcIjtcbiAgICAgIGNvbnN0IGNvdW50cnlOYW1lID0gKGNpdHkgJiYgY2l0eS5jb3VudHJ5KSA/IGNpdHkuY291bnRyeS5uYW1lIDogXCJcIjtcbiAgICBcbiAgICAgIGNvbnN0IGZseVRvVmFsdWU9IHtcbiAgICAgICAgX190eXBlbmFtZTogXCJMb2NhdGlvblR5cGVcIixcbiAgICAgICAgbGFiZWw6IGNpdHlOYW1lICsgXCIsIFwiICsgY291bnRyeU5hbWUsXG4gICAgICAgIHZhbHVlOiBjaXR5TmFtZSArIFwiLCBcIiArIGNvdW50cnlOYW1lLFxuICAgICAgICBjb3VudHJ5Q29kZTogY2l0eS5jb3VudHJ5ID8gY2l0eS5jb3VudHJ5LmNvdW50cnlDb2RlIDogXCJcIixcbiAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICBsb2NhdGlvbjp7XG4gICAgICAgICAgICBsYXQgOiBjaXR5LmNvb3JkaW5hdGVzLnNwbGl0KCcsJylbMF0sXG4gICAgICAgICAgICBsbmcgOiBjaXR5LmNvb3JkaW5hdGVzLnNwbGl0KCcsJylbMF0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hhbmdlTG9jYXRpb24oe1xuICAgICAgICBkaXJlY3Rpb246IFwidG9cIixcbiAgICAgICAgdmFsdWU6IGZseVRvVmFsdWUsXG4gICAgICAgIGluZGV4LFxuICAgICAgfSk7XG4gICAgfVxuICAgIGdvVG9TdGVwKHtzdGVwOjF9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhLCBzaG93RW5xdWlyZSwgc2hvd0xlbmd0aCwgY2l0eSwgbG9jYWxlXG4gICAgfSA9IHRoaXMucHJvcHM7XG5jb25zb2xlLmxvZyhcImVzLWRhdGE6XCIsIGRhdGEpO1xuXG4gICAgbGV0IHNlb0pzb24gPSBcIlwiO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBzZW9Kc29uICs9IFwiW1wiO1xuICAgICAgZGF0YS5tYXAoKGxlZywgaW5kZXgpID0+IHtcbiAgICAgICAgc2VvSnNvbiArPSBcIntcIjtcbiAgICAgICAgc2VvSnNvbiArPSAnICBcIkBjb250ZXh0XCI6IFwiaHR0cDovL3NjaGVtYS5vcmdcIiwnO1xuICAgICAgICBzZW9Kc29uICs9ICcgIFwiQHR5cGVcIjogXCJGbGlnaHRSZXNlcnZhdGlvblwiLCc7XG4gICAgICAgIHNlb0pzb24gKz0gJyAgXCJyZXNlcnZhdGlvbklkXCI6IFwiJyArIGxlZy5pZCArICdcIiwnO1xuICAgICAgICBzZW9Kc29uICs9ICcgIFwicmVzZXJ2YXRpb25TdGF0dXNcIjogXCJodHRwOi8vc2NoZW1hLm9yZy9Db25maXJtZWRcIiwnO1xuICAgICAgICBzZW9Kc29uICs9ICcgIFwidW5kZXJOYW1lXCI6IHtcIkB0eXBlXCI6IFwiUGVyc29uXCIsIFwibmFtZVwiOiBcIkV2YSBHcmVlblwifSwnO1xuICAgICAgICBzZW9Kc29uICs9ICcgIFwicmVzZXJ2YXRpb25Gb3JcIjogeyc7XG4gICAgICAgIHNlb0pzb24gKz0gJyAgICAgIFwiQHR5cGVcIjogXCJGbGlnaHRcIiwnO1xuICAgICAgICBzZW9Kc29uICs9ICcgICAgICBcImZsaWdodE51bWJlclwiOiBcIicgKyBsZWcuaWQgKyAnXCIsJztcbiAgICAgICAgc2VvSnNvbiArPSAnICAgICAgXCJhaXJsaW5lXCI6IHsgXCJAdHlwZVwiOiBcIkFpcmxpbmVcIiwgXCJuYW1lXCI6IFwiVW5pdGVkXCIsIFwiaWF0YUNvZGVcIjogXCJVQVwifSwnO1xuICAgICAgICBzZW9Kc29uICs9XG4gICAgICAgICAgJyAgICAgIFwiZGVwYXJ0dXJlQWlycG9ydFwiOiB7IFwiQHR5cGVcIjogXCJBaXJwb3J0XCIsIFwibmFtZVwiOiBcIicgK1xuICAgICAgICAgIGxlZy5mcm9tX2FpcnBvcnQubmFtZSArXG4gICAgICAgICAgJ1wiLCBcImlhdGFDb2RlXCI6IFwiJyArXG4gICAgICAgICAgbGVnLmZyb21fYWlycG9ydC5pYXRhICtcbiAgICAgICAgICAnXCIgfSwnO1xuICAgICAgICBzZW9Kc29uICs9ICcgICAgICBcImRlcGFydHVyZVRpbWVcIjogXCInICsgbGVnLmZyb21fZGF0ZSArICdcIiwnO1xuICAgICAgICBzZW9Kc29uICs9XG4gICAgICAgICAgJyAgICAgIFwiYXJyaXZhbEFpcnBvcnRcIjogeyBcIkB0eXBlXCI6IFwiQWlycG9ydFwiLCBcIm5hbWVcIjogXCInICtcbiAgICAgICAgICBsZWcudG9fYWlycG9ydC5uYW1lICtcbiAgICAgICAgICAnXCIsIFwiaWF0YUNvZGVcIjogXCInICtcbiAgICAgICAgICBsZWcudG9fYWlycG9ydC5pYXRhICtcbiAgICAgICAgICAnXCIgfSwnO1xuICAgICAgICBzZW9Kc29uICs9IFwiICB9XCI7XG4gICAgICAgIHNlb0pzb24gKz0gXCJ9XCI7XG5cbiAgICAgICAgaWYgKGluZGV4ICsgMSA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgc2VvSnNvbiArPSBcIixcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzZW9Kc29uICs9IFwiXVwiO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KFwiY29udGFpbmVyIGxqLXBhZC15LTUwXCIsIHMuY29udGFpbmVyKX0+XG4gICAgICAgIDxzY3JpcHQgdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIj57c2VvSnNvbn08L3NjcmlwdD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goXCJ0ZXh0LXNlY29uZGFyeSB1cHBlcmNhc2VcIiwgc1tcInNlY3Rpb24tdGl0bGUxXCJdKX1cbiAgICAgICAgICAgICAgICBpZD1cImNsaWVudC5qZXQtY29zdC1lc3RpbWF0aW9uLnByaWNlLWVzdGltYXRpb24taGVhZGVyXCJcbiAgICAgICAgICAgICAgICBkZWZhdWx0TWVzc2FnZT1cIlByaWNlIEVzdGltYXRpb25zXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goXCJyb3cgbXktNVwiLCBzW1wiZXN0aW1hdGlvbi10YWJsZVwiXSl9PlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPXtjeChcInJvd1wiLCBzW1widGFibGUtaGVhZGVyXCJdKX0+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT17Y3goc1tcIm9yaWdpblwiXSl9PjxUZXh0IGRlZmF1bHRNZXNzYWdlPXtcIkZST01cIn0gaWQ9e2BqZXQtY29zdC1lc3RpbWF0aW9uLXRleHQtZnJvbWB9IC8+PC90cj5cbiAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPXtjeChzW1wiYWlyY3JhZnRcIl0pfT48L3RyPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9e2N4KHNbXCJkZXN0aW5hdGlvblwiXSl9PjxUZXh0IGRlZmF1bHRNZXNzYWdlPXtcIlRPXCJ9IGlkPXtgamV0LWNvc3QtZXN0aW1hdGlvbi10ZXh0LXRvYH0gLz48L3RyPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9e2N4KHNbXCJmbGlnaHQtdGltZVwiXSl9PjxUZXh0IGRlZmF1bHRNZXNzYWdlPXtcIkZMSUdIVCBUSU1FXCJ9IGlkPXtgamV0LWNvc3QtZXN0aW1hdGlvbi10ZXh0LWZsaWdodC10aW1lYH0gLz48L3RyPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9e2N4KHNbXCJhaXJjcmFmdC13cmFwXCJdKX0+PFRleHQgZGVmYXVsdE1lc3NhZ2U9e1wiQUlSQ1JBRlRcIn0gaWQ9e2BqZXQtY29zdC1lc3RpbWF0aW9uLXRleHQtYWlyY3JhZnRgfSAvPjwvdHI+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT17Y3goc1tcImxlZy1wcmljZVwiXSwgc1tcImRlc2t0b3Atb25seVwiXSl9PjxUZXh0IGRlZmF1bHRNZXNzYWdlPXtcIkVTVElNQVRFRCBQUklDRVwifSBpZD17YGpldC1jb3N0LWVzdGltYXRpb24tdGV4dC1lc3RpbWF0ZWQtcHJpY2VgfSAvPjwvdHI+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT17Y3goXCJkLW1kLW5vbmVcIiwgc1tcImxlZy1wcmljZVwiXSl9PjxUZXh0IGRlZmF1bHRNZXNzYWdlPXtcIlBSSUNFXCJ9IGlkPXtgamV0LWNvc3QtZXN0aW1hdGlvbi10ZXh0LXByaWNlYH0gLz48L3RyPlxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGVzdGltYXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3dMZW5ndGggPT09IC0xID9cbiAgICAgICAgICAgICAgICAgIDxKZXRDb3N0RXN0aW1hdGlvblJvdyBrZXk9e2VzdGltYXRpb24uaWR9IHZlcnNpb249ezN9IGxlZz17ZXN0aW1hdGlvbn0gbG9jYWxlPXtsb2NhbGV9IHNob3dFbnF1aXJlPXtzaG93RW5xdWlyZX0gb25FbnF1aXJlPXsoZXN0KSA9PiB0aGlzLnJlcXVlc3RGbGlnaHQoZXN0KX0gLz5cbiAgICAgICAgICAgICAgICAgIDogXG4gICAgICAgICAgICAgICAgICBpbmRleCA8IHNob3dMZW5ndGggPyBcbiAgICAgICAgICAgICAgICAgICAgPEpldENvc3RFc3RpbWF0aW9uUm93IGtleT17ZXN0aW1hdGlvbi5pZH0gdmVyc2lvbj17M30gbGVnPXtlc3RpbWF0aW9ufSBsb2NhbGU9e2xvY2FsZX0gc2hvd0VucXVpcmU9e3Nob3dFbnF1aXJlfSAgb25FbnF1aXJlPXsoZXN0KSA9PiB0aGlzLnJlcXVlc3RGbGlnaHQoZXN0KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLW91dGxpbmUtcHJpbWFyeSB3LTEwMFwiXG4gICAgICAgICAgICAgIGRlZmF1bHRNZXNzYWdlPVwiYXNrIHVzIGZvciBhIHF1b3RlXCJcbiAgICAgICAgICAgICAgdGV4dElkPVwiY2xpZW50LmpldENvc3REZXN0aW5hdGlvbi5hc2tVc0ZvckFRdW90ZVwiXG4gICAgICAgICAgICAgIGlkPVwicXVvdGVfcmVxdWVzdFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucmVxdWVzdEZsaWdodCgpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuSmV0Q29zdEVzdGltYXRpb24ucHJvcFR5cGVzID0ge1xuICBkYXRhOiBQcm9wVHlwZXMuYXJyYXksXG4gIHNob3dFbnF1aXJlOiBQcm9wVHlwZXMuYm9vbCxcbiAgc2hvd0xlbmd0aDogUHJvcFR5cGVzLm51bWJlclxufVxuXG5KZXRDb3N0RXN0aW1hdGlvbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGRhdGE6IFtdLFxuICBzaG93RW5xdWlyZTogZmFsc2UsXG4gIHNob3dMZW5ndGg6IC0xXG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+ICh7XG4gIGluZGV4OiBzdGF0ZS5yZXF1ZXN0RmxpZ2h0LmxlZ3MubGVuZ3RoIC0gMSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywge2dvVG9TdGVwLCBjaGFuZ2VMb2NhdGlvbiwgdXBkYXRlQ29udGFjdH0pKHdpdGhTdHlsZXMocykoSmV0Q29zdEVzdGltYXRpb24pKTtcblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBTEE7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBTEE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFMQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUE3RUE7QUFBQTtBQUVBO0FBQ0E7OztBQUNBOzs7QUFFQTs7O0FBeUVBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXQTs7OztBQTdLQTtBQUNBO0FBK0tBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=