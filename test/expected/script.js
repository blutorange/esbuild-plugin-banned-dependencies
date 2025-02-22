"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // banned-dependencies/bare:jquery
  var require_jquery = __commonJS({
    "banned-dependencies/bare:jquery"(exports, module) {
      module.exports = window.jQuery;
    }
  });

  // banned-dependencies/module-path:moment/moment.js
  var require_moment = __commonJS({
    "banned-dependencies/module-path:moment/moment.js"(exports, module) {
      module.exports = window.moment;
    }
  });

  // ../../../.yarn/berry/cache/moment-npm-2.30.1-1c51a5c631-10c0.zip/node_modules/moment/locale/de.js
  var require_de = __commonJS({
    "../../../.yarn/berry/cache/moment-npm-2.30.1-1c51a5c631-10c0.zip/node_modules/moment/locale/de.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" && typeof __require === "function" ? factory(require_moment()) : typeof define === "function" && define.amd ? define(["../moment"], factory) : factory(global.moment);
      })(exports, function(moment2) {
        "use strict";
        function processRelativeTime(number, withoutSuffix, key, isFuture) {
          var format = {
            m: ["eine Minute", "einer Minute"],
            h: ["eine Stunde", "einer Stunde"],
            d: ["ein Tag", "einem Tag"],
            dd: [number + " Tage", number + " Tagen"],
            w: ["eine Woche", "einer Woche"],
            M: ["ein Monat", "einem Monat"],
            MM: [number + " Monate", number + " Monaten"],
            y: ["ein Jahr", "einem Jahr"],
            yy: [number + " Jahre", number + " Jahren"]
          };
          return withoutSuffix ? format[key][0] : format[key][1];
        }
        var de = moment2.defineLocale("de", {
          months: "Januar_Februar_M\xE4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
            "_"
          ),
          monthsShort: "Jan._Feb._M\xE4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
          monthsParseExact: true,
          weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split(
            "_"
          ),
          weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
          weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
          weekdaysParseExact: true,
          longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd, D. MMMM YYYY HH:mm"
          },
          calendar: {
            sameDay: "[heute um] LT [Uhr]",
            sameElse: "L",
            nextDay: "[morgen um] LT [Uhr]",
            nextWeek: "dddd [um] LT [Uhr]",
            lastDay: "[gestern um] LT [Uhr]",
            lastWeek: "[letzten] dddd [um] LT [Uhr]"
          },
          relativeTime: {
            future: "in %s",
            past: "vor %s",
            s: "ein paar Sekunden",
            ss: "%d Sekunden",
            m: processRelativeTime,
            mm: "%d Minuten",
            h: processRelativeTime,
            hh: "%d Stunden",
            d: processRelativeTime,
            dd: processRelativeTime,
            w: processRelativeTime,
            ww: "%d Wochen",
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
          },
          dayOfMonthOrdinalParse: /\d{1,2}\./,
          ordinal: "%d.",
          week: {
            dow: 1,
            // Monday is the first day of the week.
            doy: 4
            // The week that contains Jan 4th is the first week of the year.
          }
        });
        return de;
      });
    }
  });

  // src/script.js
  var import_jquery = __toESM(require_jquery(), 1);
  var import_moment = __toESM(require_moment(), 1);
  var import_de = __toESM(require_de(), 1);
  console.log(import_moment.default.locales());
  console.log(import_jquery.default.map([1, 2, 3], (x) => x ** 2));
})();
