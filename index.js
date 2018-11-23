/*!
  Copyright (c) 2018 Nuey San Waldman
  Licensed under the MIT License (MIT)
*/
/* global define */

(function() {
  "use strict";

  function isArray(target) {
    return Object.prototype.toString.call(target) === "[object Array]";
  }

  function isObject(target) {
    return typeof target === "object" && target;
  }

  function toArray(arrayLike) {
    var length = arrayLike.length;
    return length === 0
      ? []
      : length === 1
        ? [arrayLike[0]]
        : Array.apply(null, arrayLike);
  }

  function toCamelCase(classname) {
      return classname
          .replace(/(?:-{2,}|^-)/g, '')
          .replace(/^[A-Z][a-z]/g, function(g) {return g.toLowerCase(); })
          .replace(/-[A-Za-z]/g, function (g) { return g[1].toUpperCase(); });
  }

  function isMods(target) {
    return isObject(target) || isArray(target);
  }

  function bera(block, elem, mods) {
    var identifier = block;

    if (typeof elem === "string") {
      identifier = block + "__" + elem;
    } else if (arguments.length === 2) {
      mods = elem;
    }

    var classes = [identifier];
    var isModsArray = isArray(mods);

    for (var key in mods) {
      var value = mods[key];
      if (mods.hasOwnProperty(key) && value) {
        classes.push(
          "-" + toCamelCase(isModsArray ? value : key)
        );
      }
    }

    return classes.join(" ");
  }

  function bem(block, elem, mods) {
    var length = arguments.length;

    if (length === 0) {
      return bem;
    }

    if (length === 3) {
      return bera.call(this, block, elem, mods);
    }

    if (length === 2 && isMods(elem)) {
      return bera.call(this, block, elem);
    }

    if (length < 3) {
      var args = toArray(arguments);

      return function() {
        var _args = toArray(arguments);
        _args.unshift.apply(_args, args);
        return bera.apply(this, _args);
      };
    }
  }

  bem.join = function join() {
    return toArray(arguments)
      .filter(Boolean)
      .join(" ");
  };

  if (typeof module !== "undefined" && module.exports) {
    bem.default = module.exports = bem;
  } else if (typeof define === "function" && isObject(define.amd)) {
    // register as 'bem', consistent with npm package name
    define("bem", [], function() {
      return bem;
    });
  } else {
    window.bem = bem;
  }
})();
