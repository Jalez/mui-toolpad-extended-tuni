var Lh = Object.defineProperty;
var Bh = (e, t, n) => t in e ? Lh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Un = (e, t, n) => Bh(e, typeof t != "symbol" ? t + "" : t, n);
import * as v from "react";
import ue, { Children as Fh, isValidElement as Br, cloneElement as Fr, forwardRef as uo, useRef as or, useCallback as Ri, useEffect as ot, createElement as Vr, Component as vd, useMemo as bd, useState as cn, memo as xd, useContext as Vh, useLayoutEffect as Uh } from "react";
import zh from "@emotion/styled";
import { Global as Wh, ThemeContext as Ed, keyframes as Ca } from "@emotion/react";
import { Snackbar as Hh, Badge as Sd, Alert as qh, SnackbarContent as Gh, Button as ir, IconButton as wd, useMediaQuery as Cd, styled as fo, useTheme as ki, Box as gt, Typography as Qe, createTheme as Yh, MenuItem as Td, ListItemIcon as Kh, Avatar as Xh, ListItemText as Ta, Paper as Oa, MenuList as Jh, Stack as Od, Divider as Dc, ListItem as Rd, List as Zh, Fade as kd, keyframes as Ra, CircularProgress as Qh, Card as em, CardActionArea as tm, CardContent as nm, TextField as rm, Dialog as om, DialogTitle as im, DialogContent as sm, DialogActions as am, Tooltip as cm } from "@mui/material";
import * as lm from "react-dom";
import Io, { createPortal as um } from "react-dom";
function ka(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var zs = { exports: {} }, Cr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lc;
function dm() {
  if (Lc) return Cr;
  Lc = 1;
  var e = ue, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(c, l, u) {
    var d, f = {}, h = null, b = null;
    u !== void 0 && (h = "" + u), l.key !== void 0 && (h = "" + l.key), l.ref !== void 0 && (b = l.ref);
    for (d in l) r.call(l, d) && !i.hasOwnProperty(d) && (f[d] = l[d]);
    if (c && c.defaultProps) for (d in l = c.defaultProps, l) f[d] === void 0 && (f[d] = l[d]);
    return { $$typeof: t, type: c, key: h, ref: b, props: f, _owner: o.current };
  }
  return Cr.Fragment = n, Cr.jsx = a, Cr.jsxs = a, Cr;
}
var Tr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bc;
function fm() {
  return Bc || (Bc = 1, process.env.NODE_ENV !== "production" && function() {
    var e = ue, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), c = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), m = Symbol.iterator, p = "@@iterator";
    function g(k) {
      if (k === null || typeof k != "object")
        return null;
      var z = m && k[m] || k[p];
      return typeof z == "function" ? z : null;
    }
    var C = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function T(k) {
      {
        for (var z = arguments.length, te = new Array(z > 1 ? z - 1 : 0), ae = 1; ae < z; ae++)
          te[ae - 1] = arguments[ae];
        w("error", k, te);
      }
    }
    function w(k, z, te) {
      {
        var ae = C.ReactDebugCurrentFrame, ve = ae.getStackAddendum();
        ve !== "" && (z += "%s", te = te.concat([ve]));
        var je = te.map(function(ge) {
          return String(ge);
        });
        je.unshift("Warning: " + z), Function.prototype.apply.call(console[k], console, je);
      }
    }
    var E = !1, S = !1, O = !1, R = !1, N = !1, j;
    j = Symbol.for("react.module.reference");
    function x(k) {
      return !!(typeof k == "string" || typeof k == "function" || k === r || k === i || N || k === o || k === u || k === d || R || k === b || E || S || O || typeof k == "object" && k !== null && (k.$$typeof === h || k.$$typeof === f || k.$$typeof === a || k.$$typeof === c || k.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      k.$$typeof === j || k.getModuleId !== void 0));
    }
    function P(k, z, te) {
      var ae = k.displayName;
      if (ae)
        return ae;
      var ve = z.displayName || z.name || "";
      return ve !== "" ? te + "(" + ve + ")" : te;
    }
    function L(k) {
      return k.displayName || "Context";
    }
    function _(k) {
      if (k == null)
        return null;
      if (typeof k.tag == "number" && T("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof k == "function")
        return k.displayName || k.name || null;
      if (typeof k == "string")
        return k;
      switch (k) {
        case r:
          return "Fragment";
        case n:
          return "Portal";
        case i:
          return "Profiler";
        case o:
          return "StrictMode";
        case u:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof k == "object")
        switch (k.$$typeof) {
          case c:
            var z = k;
            return L(z) + ".Consumer";
          case a:
            var te = k;
            return L(te._context) + ".Provider";
          case l:
            return P(k, k.render, "ForwardRef");
          case f:
            var ae = k.displayName || null;
            return ae !== null ? ae : _(k.type) || "Memo";
          case h: {
            var ve = k, je = ve._payload, ge = ve._init;
            try {
              return _(ge(je));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var V = Object.assign, M = 0, D, W, H, X, A, U, Q;
    function ee() {
    }
    ee.__reactDisabledLog = !0;
    function q() {
      {
        if (M === 0) {
          D = console.log, W = console.info, H = console.warn, X = console.error, A = console.group, U = console.groupCollapsed, Q = console.groupEnd;
          var k = {
            configurable: !0,
            enumerable: !0,
            value: ee,
            writable: !0
          };
          Object.defineProperties(console, {
            info: k,
            log: k,
            warn: k,
            error: k,
            group: k,
            groupCollapsed: k,
            groupEnd: k
          });
        }
        M++;
      }
    }
    function K() {
      {
        if (M--, M === 0) {
          var k = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: V({}, k, {
              value: D
            }),
            info: V({}, k, {
              value: W
            }),
            warn: V({}, k, {
              value: H
            }),
            error: V({}, k, {
              value: X
            }),
            group: V({}, k, {
              value: A
            }),
            groupCollapsed: V({}, k, {
              value: U
            }),
            groupEnd: V({}, k, {
              value: Q
            })
          });
        }
        M < 0 && T("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var F = C.ReactCurrentDispatcher, J;
    function Z(k, z, te) {
      {
        if (J === void 0)
          try {
            throw Error();
          } catch (ve) {
            var ae = ve.stack.trim().match(/\n( *(at )?)/);
            J = ae && ae[1] || "";
          }
        return `
` + J + k;
      }
    }
    var ne = !1, G;
    {
      var re = typeof WeakMap == "function" ? WeakMap : Map;
      G = new re();
    }
    function B(k, z) {
      if (!k || ne)
        return "";
      {
        var te = G.get(k);
        if (te !== void 0)
          return te;
      }
      var ae;
      ne = !0;
      var ve = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var je;
      je = F.current, F.current = null, q();
      try {
        if (z) {
          var ge = function() {
            throw Error();
          };
          if (Object.defineProperty(ge.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ge, []);
            } catch (at) {
              ae = at;
            }
            Reflect.construct(k, [], ge);
          } else {
            try {
              ge.call();
            } catch (at) {
              ae = at;
            }
            k.call(ge.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (at) {
            ae = at;
          }
          k();
        }
      } catch (at) {
        if (at && ae && typeof at.stack == "string") {
          for (var he = at.stack.split(`
`), rt = ae.stack.split(`
`), Ye = he.length - 1, Je = rt.length - 1; Ye >= 1 && Je >= 0 && he[Ye] !== rt[Je]; )
            Je--;
          for (; Ye >= 1 && Je >= 0; Ye--, Je--)
            if (he[Ye] !== rt[Je]) {
              if (Ye !== 1 || Je !== 1)
                do
                  if (Ye--, Je--, Je < 0 || he[Ye] !== rt[Je]) {
                    var xt = `
` + he[Ye].replace(" at new ", " at ");
                    return k.displayName && xt.includes("<anonymous>") && (xt = xt.replace("<anonymous>", k.displayName)), typeof k == "function" && G.set(k, xt), xt;
                  }
                while (Ye >= 1 && Je >= 0);
              break;
            }
        }
      } finally {
        ne = !1, F.current = je, K(), Error.prepareStackTrace = ve;
      }
      var Vn = k ? k.displayName || k.name : "", xn = Vn ? Z(Vn) : "";
      return typeof k == "function" && G.set(k, xn), xn;
    }
    function pe(k, z, te) {
      return B(k, !1);
    }
    function Y(k) {
      var z = k.prototype;
      return !!(z && z.isReactComponent);
    }
    function ye(k, z, te) {
      if (k == null)
        return "";
      if (typeof k == "function")
        return B(k, Y(k));
      if (typeof k == "string")
        return Z(k);
      switch (k) {
        case u:
          return Z("Suspense");
        case d:
          return Z("SuspenseList");
      }
      if (typeof k == "object")
        switch (k.$$typeof) {
          case l:
            return pe(k.render);
          case f:
            return ye(k.type, z, te);
          case h: {
            var ae = k, ve = ae._payload, je = ae._init;
            try {
              return ye(je(ve), z, te);
            } catch {
            }
          }
        }
      return "";
    }
    var Me = Object.prototype.hasOwnProperty, me = {}, De = C.ReactDebugCurrentFrame;
    function Le(k) {
      if (k) {
        var z = k._owner, te = ye(k.type, k._source, z ? z.type : null);
        De.setExtraStackFrame(te);
      } else
        De.setExtraStackFrame(null);
    }
    function Xe(k, z, te, ae, ve) {
      {
        var je = Function.call.bind(Me);
        for (var ge in k)
          if (je(k, ge)) {
            var he = void 0;
            try {
              if (typeof k[ge] != "function") {
                var rt = Error((ae || "React class") + ": " + te + " type `" + ge + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof k[ge] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw rt.name = "Invariant Violation", rt;
              }
              he = k[ge](z, ge, ae, te, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Ye) {
              he = Ye;
            }
            he && !(he instanceof Error) && (Le(ve), T("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ae || "React class", te, ge, typeof he), Le(null)), he instanceof Error && !(he.message in me) && (me[he.message] = !0, Le(ve), T("Failed %s type: %s", te, he.message), Le(null));
          }
      }
    }
    var $e = Array.isArray;
    function oe(k) {
      return $e(k);
    }
    function Mt(k) {
      {
        var z = typeof Symbol == "function" && Symbol.toStringTag, te = z && k[Symbol.toStringTag] || k.constructor.name || "Object";
        return te;
      }
    }
    function Dt(k) {
      try {
        return Lt(k), !1;
      } catch {
        return !0;
      }
    }
    function Lt(k) {
      return "" + k;
    }
    function Bt(k) {
      if (Dt(k))
        return T("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Mt(k)), Lt(k);
    }
    var Ne = C.ReactCurrentOwner, Ge = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ue, bt;
    function _e(k) {
      if (Me.call(k, "ref")) {
        var z = Object.getOwnPropertyDescriptor(k, "ref").get;
        if (z && z.isReactWarning)
          return !1;
      }
      return k.ref !== void 0;
    }
    function tt(k) {
      if (Me.call(k, "key")) {
        var z = Object.getOwnPropertyDescriptor(k, "key").get;
        if (z && z.isReactWarning)
          return !1;
      }
      return k.key !== void 0;
    }
    function Gt(k, z) {
      typeof k.ref == "string" && Ne.current;
    }
    function pt(k, z) {
      {
        var te = function() {
          Ue || (Ue = !0, T("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", z));
        };
        te.isReactWarning = !0, Object.defineProperty(k, "key", {
          get: te,
          configurable: !0
        });
      }
    }
    function ss(k, z) {
      {
        var te = function() {
          bt || (bt = !0, T("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", z));
        };
        te.isReactWarning = !0, Object.defineProperty(k, "ref", {
          get: te,
          configurable: !0
        });
      }
    }
    var Er = function(k, z, te, ae, ve, je, ge) {
      var he = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: k,
        key: z,
        ref: te,
        props: ge,
        // Record the component responsible for creating this element.
        _owner: je
      };
      return he._store = {}, Object.defineProperty(he._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(he, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ae
      }), Object.defineProperty(he, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ve
      }), Object.freeze && (Object.freeze(he.props), Object.freeze(he)), he;
    };
    function as(k, z, te, ae, ve) {
      {
        var je, ge = {}, he = null, rt = null;
        te !== void 0 && (Bt(te), he = "" + te), tt(z) && (Bt(z.key), he = "" + z.key), _e(z) && (rt = z.ref, Gt(z, ve));
        for (je in z)
          Me.call(z, je) && !Ge.hasOwnProperty(je) && (ge[je] = z[je]);
        if (k && k.defaultProps) {
          var Ye = k.defaultProps;
          for (je in Ye)
            ge[je] === void 0 && (ge[je] = Ye[je]);
        }
        if (he || rt) {
          var Je = typeof k == "function" ? k.displayName || k.name || "Unknown" : k;
          he && pt(ge, Je), rt && ss(ge, Je);
        }
        return Er(k, he, rt, ve, ae, Ne.current, ge);
      }
    }
    var nn = C.ReactCurrentOwner, Po = C.ReactDebugCurrentFrame;
    function rn(k) {
      if (k) {
        var z = k._owner, te = ye(k.type, k._source, z ? z.type : null);
        Po.setExtraStackFrame(te);
      } else
        Po.setExtraStackFrame(null);
    }
    var Sr;
    Sr = !1;
    function wr(k) {
      return typeof k == "object" && k !== null && k.$$typeof === t;
    }
    function No() {
      {
        if (nn.current) {
          var k = _(nn.current.type);
          if (k)
            return `

Check the render method of \`` + k + "`.";
        }
        return "";
      }
    }
    function cs(k) {
      return "";
    }
    var jo = {};
    function ls(k) {
      {
        var z = No();
        if (!z) {
          var te = typeof k == "string" ? k : k.displayName || k.name;
          te && (z = `

Check the top-level render call using <` + te + ">.");
        }
        return z;
      }
    }
    function ce(k, z) {
      {
        if (!k._store || k._store.validated || k.key != null)
          return;
        k._store.validated = !0;
        var te = ls(z);
        if (jo[te])
          return;
        jo[te] = !0;
        var ae = "";
        k && k._owner && k._owner !== nn.current && (ae = " It was passed a child from " + _(k._owner.type) + "."), rn(k), T('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', te, ae), rn(null);
      }
    }
    function st(k, z) {
      {
        if (typeof k != "object")
          return;
        if (oe(k))
          for (var te = 0; te < k.length; te++) {
            var ae = k[te];
            wr(ae) && ce(ae, z);
          }
        else if (wr(k))
          k._store && (k._store.validated = !0);
        else if (k) {
          var ve = g(k);
          if (typeof ve == "function" && ve !== k.entries)
            for (var je = ve.call(k), ge; !(ge = je.next()).done; )
              wr(ge.value) && ce(ge.value, z);
        }
      }
    }
    function Ao(k) {
      {
        var z = k.type;
        if (z == null || typeof z == "string")
          return;
        var te;
        if (typeof z == "function")
          te = z.propTypes;
        else if (typeof z == "object" && (z.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        z.$$typeof === f))
          te = z.propTypes;
        else
          return;
        if (te) {
          var ae = _(z);
          Xe(te, k.props, "prop", ae, k);
        } else if (z.PropTypes !== void 0 && !Sr) {
          Sr = !0;
          var ve = _(z);
          T("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ve || "Unknown");
        }
        typeof z.getDefaultProps == "function" && !z.getDefaultProps.isReactClassApproved && T("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function jh(k) {
      {
        for (var z = Object.keys(k.props), te = 0; te < z.length; te++) {
          var ae = z[te];
          if (ae !== "children" && ae !== "key") {
            rn(k), T("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ae), rn(null);
            break;
          }
        }
        k.ref !== null && (rn(k), T("Invalid attribute `ref` supplied to `React.Fragment`."), rn(null));
      }
    }
    var _c = {};
    function Mc(k, z, te, ae, ve, je) {
      {
        var ge = x(k);
        if (!ge) {
          var he = "";
          (k === void 0 || typeof k == "object" && k !== null && Object.keys(k).length === 0) && (he += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var rt = cs();
          rt ? he += rt : he += No();
          var Ye;
          k === null ? Ye = "null" : oe(k) ? Ye = "array" : k !== void 0 && k.$$typeof === t ? (Ye = "<" + (_(k.type) || "Unknown") + " />", he = " Did you accidentally export a JSX literal instead of a component?") : Ye = typeof k, T("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ye, he);
        }
        var Je = as(k, z, te, ve, je);
        if (Je == null)
          return Je;
        if (ge) {
          var xt = z.children;
          if (xt !== void 0)
            if (ae)
              if (oe(xt)) {
                for (var Vn = 0; Vn < xt.length; Vn++)
                  st(xt[Vn], k);
                Object.freeze && Object.freeze(xt);
              } else
                T("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              st(xt, k);
        }
        if (Me.call(z, "key")) {
          var xn = _(k), at = Object.keys(z).filter(function(Dh) {
            return Dh !== "key";
          }), us = at.length > 0 ? "{key: someKey, " + at.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!_c[xn + us]) {
            var Mh = at.length > 0 ? "{" + at.join(": ..., ") + ": ...}" : "{}";
            T(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, us, xn, Mh, xn), _c[xn + us] = !0;
          }
        }
        return k === r ? jh(Je) : Ao(Je), Je;
      }
    }
    function Ah(k, z, te) {
      return Mc(k, z, te, !0);
    }
    function Ih(k, z, te) {
      return Mc(k, z, te, !1);
    }
    var $h = Ih, _h = Ah;
    Tr.Fragment = r, Tr.jsx = $h, Tr.jsxs = _h;
  }()), Tr;
}
process.env.NODE_ENV === "production" ? zs.exports = dm() : zs.exports = fm();
var y = zs.exports, Ws = { exports: {} }, $o = { exports: {} }, be = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fc;
function pm() {
  if (Fc) return be;
  Fc = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, h = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, p = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, C = e ? Symbol.for("react.responder") : 60118, T = e ? Symbol.for("react.scope") : 60119;
  function w(S) {
    if (typeof S == "object" && S !== null) {
      var O = S.$$typeof;
      switch (O) {
        case t:
          switch (S = S.type, S) {
            case l:
            case u:
            case r:
            case i:
            case o:
            case f:
              return S;
            default:
              switch (S = S && S.$$typeof, S) {
                case c:
                case d:
                case m:
                case b:
                case a:
                  return S;
                default:
                  return O;
              }
          }
        case n:
          return O;
      }
    }
  }
  function E(S) {
    return w(S) === u;
  }
  return be.AsyncMode = l, be.ConcurrentMode = u, be.ContextConsumer = c, be.ContextProvider = a, be.Element = t, be.ForwardRef = d, be.Fragment = r, be.Lazy = m, be.Memo = b, be.Portal = n, be.Profiler = i, be.StrictMode = o, be.Suspense = f, be.isAsyncMode = function(S) {
    return E(S) || w(S) === l;
  }, be.isConcurrentMode = E, be.isContextConsumer = function(S) {
    return w(S) === c;
  }, be.isContextProvider = function(S) {
    return w(S) === a;
  }, be.isElement = function(S) {
    return typeof S == "object" && S !== null && S.$$typeof === t;
  }, be.isForwardRef = function(S) {
    return w(S) === d;
  }, be.isFragment = function(S) {
    return w(S) === r;
  }, be.isLazy = function(S) {
    return w(S) === m;
  }, be.isMemo = function(S) {
    return w(S) === b;
  }, be.isPortal = function(S) {
    return w(S) === n;
  }, be.isProfiler = function(S) {
    return w(S) === i;
  }, be.isStrictMode = function(S) {
    return w(S) === o;
  }, be.isSuspense = function(S) {
    return w(S) === f;
  }, be.isValidElementType = function(S) {
    return typeof S == "string" || typeof S == "function" || S === r || S === u || S === i || S === o || S === f || S === h || typeof S == "object" && S !== null && (S.$$typeof === m || S.$$typeof === b || S.$$typeof === a || S.$$typeof === c || S.$$typeof === d || S.$$typeof === g || S.$$typeof === C || S.$$typeof === T || S.$$typeof === p);
  }, be.typeOf = w, be;
}
var xe = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vc;
function hm() {
  return Vc || (Vc = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, h = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, p = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, C = e ? Symbol.for("react.responder") : 60118, T = e ? Symbol.for("react.scope") : 60119;
    function w(B) {
      return typeof B == "string" || typeof B == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      B === r || B === u || B === i || B === o || B === f || B === h || typeof B == "object" && B !== null && (B.$$typeof === m || B.$$typeof === b || B.$$typeof === a || B.$$typeof === c || B.$$typeof === d || B.$$typeof === g || B.$$typeof === C || B.$$typeof === T || B.$$typeof === p);
    }
    function E(B) {
      if (typeof B == "object" && B !== null) {
        var pe = B.$$typeof;
        switch (pe) {
          case t:
            var Y = B.type;
            switch (Y) {
              case l:
              case u:
              case r:
              case i:
              case o:
              case f:
                return Y;
              default:
                var ye = Y && Y.$$typeof;
                switch (ye) {
                  case c:
                  case d:
                  case m:
                  case b:
                  case a:
                    return ye;
                  default:
                    return pe;
                }
            }
          case n:
            return pe;
        }
      }
    }
    var S = l, O = u, R = c, N = a, j = t, x = d, P = r, L = m, _ = b, V = n, M = i, D = o, W = f, H = !1;
    function X(B) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), A(B) || E(B) === l;
    }
    function A(B) {
      return E(B) === u;
    }
    function U(B) {
      return E(B) === c;
    }
    function Q(B) {
      return E(B) === a;
    }
    function ee(B) {
      return typeof B == "object" && B !== null && B.$$typeof === t;
    }
    function q(B) {
      return E(B) === d;
    }
    function K(B) {
      return E(B) === r;
    }
    function F(B) {
      return E(B) === m;
    }
    function J(B) {
      return E(B) === b;
    }
    function Z(B) {
      return E(B) === n;
    }
    function ne(B) {
      return E(B) === i;
    }
    function G(B) {
      return E(B) === o;
    }
    function re(B) {
      return E(B) === f;
    }
    xe.AsyncMode = S, xe.ConcurrentMode = O, xe.ContextConsumer = R, xe.ContextProvider = N, xe.Element = j, xe.ForwardRef = x, xe.Fragment = P, xe.Lazy = L, xe.Memo = _, xe.Portal = V, xe.Profiler = M, xe.StrictMode = D, xe.Suspense = W, xe.isAsyncMode = X, xe.isConcurrentMode = A, xe.isContextConsumer = U, xe.isContextProvider = Q, xe.isElement = ee, xe.isForwardRef = q, xe.isFragment = K, xe.isLazy = F, xe.isMemo = J, xe.isPortal = Z, xe.isProfiler = ne, xe.isStrictMode = G, xe.isSuspense = re, xe.isValidElementType = w, xe.typeOf = E;
  }()), xe;
}
var Uc;
function Pd() {
  return Uc || (Uc = 1, process.env.NODE_ENV === "production" ? $o.exports = pm() : $o.exports = hm()), $o.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ds, zc;
function mm() {
  if (zc) return ds;
  zc = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var a = {}, c = 0; c < 10; c++)
        a["_" + String.fromCharCode(c)] = c;
      var l = Object.getOwnPropertyNames(a).map(function(d) {
        return a[d];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        u[d] = d;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ds = o() ? Object.assign : function(i, a) {
    for (var c, l = r(i), u, d = 1; d < arguments.length; d++) {
      c = Object(arguments[d]);
      for (var f in c)
        t.call(c, f) && (l[f] = c[f]);
      if (e) {
        u = e(c);
        for (var h = 0; h < u.length; h++)
          n.call(c, u[h]) && (l[u[h]] = c[u[h]]);
      }
    }
    return l;
  }, ds;
}
var fs, Wc;
function Pa() {
  if (Wc) return fs;
  Wc = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return fs = e, fs;
}
var ps, Hc;
function Nd() {
  return Hc || (Hc = 1, ps = Function.call.bind(Object.prototype.hasOwnProperty)), ps;
}
var hs, qc;
function gm() {
  if (qc) return hs;
  qc = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Pa(), n = {}, r = Nd();
    e = function(i) {
      var a = "Warning: " + i;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {
      }
    };
  }
  function o(i, a, c, l, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in i)
        if (r(i, d)) {
          var f;
          try {
            if (typeof i[d] != "function") {
              var h = Error(
                (l || "React class") + ": " + c + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw h.name = "Invariant Violation", h;
            }
            f = i[d](a, d, l, c, null, t);
          } catch (m) {
            f = m;
          }
          if (f && !(f instanceof Error) && e(
            (l || "React class") + ": type specification of " + c + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in n)) {
            n[f.message] = !0;
            var b = u ? u() : "";
            e(
              "Failed " + c + " type: " + f.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, hs = o, hs;
}
var ms, Gc;
function ym() {
  if (Gc) return ms;
  Gc = 1;
  var e = Pd(), t = mm(), n = Pa(), r = Nd(), o = gm(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(c) {
    var l = "Warning: " + c;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function a() {
    return null;
  }
  return ms = function(c, l) {
    var u = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function f(A) {
      var U = A && (u && A[u] || A[d]);
      if (typeof U == "function")
        return U;
    }
    var h = "<<anonymous>>", b = {
      array: C("array"),
      bigint: C("bigint"),
      bool: C("boolean"),
      func: C("function"),
      number: C("number"),
      object: C("object"),
      string: C("string"),
      symbol: C("symbol"),
      any: T(),
      arrayOf: w,
      element: E(),
      elementType: S(),
      instanceOf: O,
      node: x(),
      objectOf: N,
      oneOf: R,
      oneOfType: j,
      shape: L,
      exact: _
    };
    function m(A, U) {
      return A === U ? A !== 0 || 1 / A === 1 / U : A !== A && U !== U;
    }
    function p(A, U) {
      this.message = A, this.data = U && typeof U == "object" ? U : {}, this.stack = "";
    }
    p.prototype = Error.prototype;
    function g(A) {
      if (process.env.NODE_ENV !== "production")
        var U = {}, Q = 0;
      function ee(K, F, J, Z, ne, G, re) {
        if (Z = Z || h, G = G || J, re !== n) {
          if (l) {
            var B = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw B.name = "Invariant Violation", B;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var pe = Z + ":" + J;
            !U[pe] && // Avoid spamming the console because they are often not actionable except for lib authors
            Q < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + G + "` prop on `" + Z + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), U[pe] = !0, Q++);
          }
        }
        return F[J] == null ? K ? F[J] === null ? new p("The " + ne + " `" + G + "` is marked as required " + ("in `" + Z + "`, but its value is `null`.")) : new p("The " + ne + " `" + G + "` is marked as required in " + ("`" + Z + "`, but its value is `undefined`.")) : null : A(F, J, Z, ne, G);
      }
      var q = ee.bind(null, !1);
      return q.isRequired = ee.bind(null, !0), q;
    }
    function C(A) {
      function U(Q, ee, q, K, F, J) {
        var Z = Q[ee], ne = D(Z);
        if (ne !== A) {
          var G = W(Z);
          return new p(
            "Invalid " + K + " `" + F + "` of type " + ("`" + G + "` supplied to `" + q + "`, expected ") + ("`" + A + "`."),
            { expectedType: A }
          );
        }
        return null;
      }
      return g(U);
    }
    function T() {
      return g(a);
    }
    function w(A) {
      function U(Q, ee, q, K, F) {
        if (typeof A != "function")
          return new p("Property `" + F + "` of component `" + q + "` has invalid PropType notation inside arrayOf.");
        var J = Q[ee];
        if (!Array.isArray(J)) {
          var Z = D(J);
          return new p("Invalid " + K + " `" + F + "` of type " + ("`" + Z + "` supplied to `" + q + "`, expected an array."));
        }
        for (var ne = 0; ne < J.length; ne++) {
          var G = A(J, ne, q, K, F + "[" + ne + "]", n);
          if (G instanceof Error)
            return G;
        }
        return null;
      }
      return g(U);
    }
    function E() {
      function A(U, Q, ee, q, K) {
        var F = U[Q];
        if (!c(F)) {
          var J = D(F);
          return new p("Invalid " + q + " `" + K + "` of type " + ("`" + J + "` supplied to `" + ee + "`, expected a single ReactElement."));
        }
        return null;
      }
      return g(A);
    }
    function S() {
      function A(U, Q, ee, q, K) {
        var F = U[Q];
        if (!e.isValidElementType(F)) {
          var J = D(F);
          return new p("Invalid " + q + " `" + K + "` of type " + ("`" + J + "` supplied to `" + ee + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return g(A);
    }
    function O(A) {
      function U(Q, ee, q, K, F) {
        if (!(Q[ee] instanceof A)) {
          var J = A.name || h, Z = X(Q[ee]);
          return new p("Invalid " + K + " `" + F + "` of type " + ("`" + Z + "` supplied to `" + q + "`, expected ") + ("instance of `" + J + "`."));
        }
        return null;
      }
      return g(U);
    }
    function R(A) {
      if (!Array.isArray(A))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function U(Q, ee, q, K, F) {
        for (var J = Q[ee], Z = 0; Z < A.length; Z++)
          if (m(J, A[Z]))
            return null;
        var ne = JSON.stringify(A, function(re, B) {
          var pe = W(B);
          return pe === "symbol" ? String(B) : B;
        });
        return new p("Invalid " + K + " `" + F + "` of value `" + String(J) + "` " + ("supplied to `" + q + "`, expected one of " + ne + "."));
      }
      return g(U);
    }
    function N(A) {
      function U(Q, ee, q, K, F) {
        if (typeof A != "function")
          return new p("Property `" + F + "` of component `" + q + "` has invalid PropType notation inside objectOf.");
        var J = Q[ee], Z = D(J);
        if (Z !== "object")
          return new p("Invalid " + K + " `" + F + "` of type " + ("`" + Z + "` supplied to `" + q + "`, expected an object."));
        for (var ne in J)
          if (r(J, ne)) {
            var G = A(J, ne, q, K, F + "." + ne, n);
            if (G instanceof Error)
              return G;
          }
        return null;
      }
      return g(U);
    }
    function j(A) {
      if (!Array.isArray(A))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var U = 0; U < A.length; U++) {
        var Q = A[U];
        if (typeof Q != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + H(Q) + " at index " + U + "."
          ), a;
      }
      function ee(q, K, F, J, Z) {
        for (var ne = [], G = 0; G < A.length; G++) {
          var re = A[G], B = re(q, K, F, J, Z, n);
          if (B == null)
            return null;
          B.data && r(B.data, "expectedType") && ne.push(B.data.expectedType);
        }
        var pe = ne.length > 0 ? ", expected one of type [" + ne.join(", ") + "]" : "";
        return new p("Invalid " + J + " `" + Z + "` supplied to " + ("`" + F + "`" + pe + "."));
      }
      return g(ee);
    }
    function x() {
      function A(U, Q, ee, q, K) {
        return V(U[Q]) ? null : new p("Invalid " + q + " `" + K + "` supplied to " + ("`" + ee + "`, expected a ReactNode."));
      }
      return g(A);
    }
    function P(A, U, Q, ee, q) {
      return new p(
        (A || "React class") + ": " + U + " type `" + Q + "." + ee + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + q + "`."
      );
    }
    function L(A) {
      function U(Q, ee, q, K, F) {
        var J = Q[ee], Z = D(J);
        if (Z !== "object")
          return new p("Invalid " + K + " `" + F + "` of type `" + Z + "` " + ("supplied to `" + q + "`, expected `object`."));
        for (var ne in A) {
          var G = A[ne];
          if (typeof G != "function")
            return P(q, K, F, ne, W(G));
          var re = G(J, ne, q, K, F + "." + ne, n);
          if (re)
            return re;
        }
        return null;
      }
      return g(U);
    }
    function _(A) {
      function U(Q, ee, q, K, F) {
        var J = Q[ee], Z = D(J);
        if (Z !== "object")
          return new p("Invalid " + K + " `" + F + "` of type `" + Z + "` " + ("supplied to `" + q + "`, expected `object`."));
        var ne = t({}, Q[ee], A);
        for (var G in ne) {
          var re = A[G];
          if (r(A, G) && typeof re != "function")
            return P(q, K, F, G, W(re));
          if (!re)
            return new p(
              "Invalid " + K + " `" + F + "` key `" + G + "` supplied to `" + q + "`.\nBad object: " + JSON.stringify(Q[ee], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(A), null, "  ")
            );
          var B = re(J, G, q, K, F + "." + G, n);
          if (B)
            return B;
        }
        return null;
      }
      return g(U);
    }
    function V(A) {
      switch (typeof A) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !A;
        case "object":
          if (Array.isArray(A))
            return A.every(V);
          if (A === null || c(A))
            return !0;
          var U = f(A);
          if (U) {
            var Q = U.call(A), ee;
            if (U !== A.entries) {
              for (; !(ee = Q.next()).done; )
                if (!V(ee.value))
                  return !1;
            } else
              for (; !(ee = Q.next()).done; ) {
                var q = ee.value;
                if (q && !V(q[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function M(A, U) {
      return A === "symbol" ? !0 : U ? U["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && U instanceof Symbol : !1;
    }
    function D(A) {
      var U = typeof A;
      return Array.isArray(A) ? "array" : A instanceof RegExp ? "object" : M(U, A) ? "symbol" : U;
    }
    function W(A) {
      if (typeof A > "u" || A === null)
        return "" + A;
      var U = D(A);
      if (U === "object") {
        if (A instanceof Date)
          return "date";
        if (A instanceof RegExp)
          return "regexp";
      }
      return U;
    }
    function H(A) {
      var U = W(A);
      switch (U) {
        case "array":
        case "object":
          return "an " + U;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + U;
        default:
          return U;
      }
    }
    function X(A) {
      return !A.constructor || !A.constructor.name ? h : A.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, ms;
}
var gs, Yc;
function vm() {
  if (Yc) return gs;
  Yc = 1;
  var e = Pa();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, gs = function() {
    function r(a, c, l, u, d, f) {
      if (f !== e) {
        var h = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw h.name = "Invariant Violation", h;
      }
    }
    r.isRequired = r;
    function o() {
      return r;
    }
    var i = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: o,
      element: r,
      elementType: r,
      instanceOf: o,
      node: r,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, gs;
}
if (process.env.NODE_ENV !== "production") {
  var bm = Pd(), xm = !0;
  Ws.exports = ym()(bm.isElement, xm);
} else
  Ws.exports = vm()();
var Em = Ws.exports;
const s = /* @__PURE__ */ ka(Em);
function un(e, ...t) {
  const n = new URL(`https://mui.com/production-error/?code=${e}`);
  return t.forEach((r) => n.searchParams.append("args[]", r)), `Minified MUI error #${e}; visit ${n} for the full message.`;
}
const At = "$$material";
function Sm(e) {
  for (var t = 0, n, r = 0, o = e.length; o >= 4; ++r, o -= 4)
    n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, t = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(r) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var wm = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
function Cm(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var Tm = /[A-Z]|^ms/g, Om = /_EMO_([^_]+?)_([^]*?)_EMO_/g, jd = function(t) {
  return t.charCodeAt(1) === 45;
}, Kc = function(t) {
  return t != null && typeof t != "boolean";
}, ys = /* @__PURE__ */ Cm(function(e) {
  return jd(e) ? e : e.replace(Tm, "-$&").toLowerCase();
}), Xc = function(t, n) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(Om, function(r, o, i) {
          return an = {
            name: o,
            styles: i,
            next: an
          }, o;
        });
  }
  return wm[t] !== 1 && !jd(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
};
function li(e, t, n) {
  if (n == null)
    return "";
  var r = n;
  if (r.__emotion_styles !== void 0)
    return r;
  switch (typeof n) {
    case "boolean":
      return "";
    case "object": {
      var o = n;
      if (o.anim === 1)
        return an = {
          name: o.name,
          styles: o.styles,
          next: an
        }, o.name;
      var i = n;
      if (i.styles !== void 0) {
        var a = i.next;
        if (a !== void 0)
          for (; a !== void 0; )
            an = {
              name: a.name,
              styles: a.styles,
              next: an
            }, a = a.next;
        var c = i.styles + ";";
        return c;
      }
      return Rm(e, t, n);
    }
  }
  var l = n;
  return l;
}
function Rm(e, t, n) {
  var r = "";
  if (Array.isArray(n))
    for (var o = 0; o < n.length; o++)
      r += li(e, t, n[o]) + ";";
  else
    for (var i in n) {
      var a = n[i];
      if (typeof a != "object") {
        var c = a;
        Kc(c) && (r += ys(i) + ":" + Xc(i, c) + ";");
      } else if (Array.isArray(a) && typeof a[0] == "string" && t == null)
        for (var l = 0; l < a.length; l++)
          Kc(a[l]) && (r += ys(i) + ":" + Xc(i, a[l]) + ";");
      else {
        var u = li(e, t, a);
        switch (i) {
          case "animation":
          case "animationName": {
            r += ys(i) + ":" + u + ";";
            break;
          }
          default:
            r += i + "{" + u + "}";
        }
      }
    }
  return r;
}
var Jc = /label:\s*([^\s;{]+)\s*(;|$)/g, an;
function km(e, t, n) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var r = !0, o = "";
  an = void 0;
  var i = e[0];
  if (i == null || i.raw === void 0)
    r = !1, o += li(n, t, i);
  else {
    var a = i;
    o += a[0];
  }
  for (var c = 1; c < e.length; c++)
    if (o += li(n, t, e[c]), r) {
      var l = i;
      o += l[c];
    }
  Jc.lastIndex = 0;
  for (var u = "", d; (d = Jc.exec(o)) !== null; )
    u += "-" + d[1];
  var f = Sm(o) + u;
  return {
    name: f,
    styles: o,
    next: an
  };
}
function Pm(e) {
  return e == null || Object.keys(e).length === 0;
}
function Na(e) {
  const {
    styles: t,
    defaultTheme: n = {}
  } = e, r = typeof t == "function" ? (o) => t(Pm(o) ? n : o) : t;
  return /* @__PURE__ */ y.jsx(Wh, {
    styles: r
  });
}
process.env.NODE_ENV !== "production" && (Na.propTypes = {
  defaultTheme: s.object,
  styles: s.oneOfType([s.array, s.string, s.object, s.func])
});
/**
 * @mui/styled-engine v6.3.0
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function Ad(e, t) {
  const n = zh(e, t);
  return process.env.NODE_ENV !== "production" ? (...r) => {
    const o = typeof e == "string" ? `"${e}"` : "component";
    return r.length === 0 ? console.error([`MUI: Seems like you called \`styled(${o})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : r.some((i) => i === void 0) && console.error(`MUI: the styled(${o})(...args) API requires all its args to be defined.`), n(...r);
  } : n;
}
function Nm(e, t) {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
const Zc = [];
function Qc(e) {
  return Zc[0] = e, km(Zc);
}
function Ut(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Id(e) {
  if (/* @__PURE__ */ v.isValidElement(e) || !Ut(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Id(e[n]);
  }), t;
}
function it(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? {
    ...e
  } : e;
  return Ut(e) && Ut(t) && Object.keys(t).forEach((o) => {
    /* @__PURE__ */ v.isValidElement(t[o]) ? r[o] = t[o] : Ut(t[o]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, o) && Ut(e[o]) ? r[o] = it(e[o], t[o], n) : n.clone ? r[o] = Ut(t[o]) ? Id(t[o]) : t[o] : r[o] = t[o];
  }), r;
}
const jm = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => ({
    ...n,
    [r.key]: r.val
  }), {});
};
function Am(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: t = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: n = "px",
    step: r = 5,
    ...o
  } = e, i = jm(t), a = Object.keys(i);
  function c(h) {
    return `@media (min-width:${typeof t[h] == "number" ? t[h] : h}${n})`;
  }
  function l(h) {
    return `@media (max-width:${(typeof t[h] == "number" ? t[h] : h) - r / 100}${n})`;
  }
  function u(h, b) {
    const m = a.indexOf(b);
    return `@media (min-width:${typeof t[h] == "number" ? t[h] : h}${n}) and (max-width:${(m !== -1 && typeof t[a[m]] == "number" ? t[a[m]] : b) - r / 100}${n})`;
  }
  function d(h) {
    return a.indexOf(h) + 1 < a.length ? u(h, a[a.indexOf(h) + 1]) : c(h);
  }
  function f(h) {
    const b = a.indexOf(h);
    return b === 0 ? c(a[1]) : b === a.length - 1 ? l(a[b]) : u(h, a[a.indexOf(h) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: a,
    values: i,
    up: c,
    down: l,
    between: u,
    only: d,
    not: f,
    unit: n,
    ...o
  };
}
function Im(e, t) {
  if (!e.containerQueries)
    return t;
  const n = Object.keys(t).filter((r) => r.startsWith("@container")).sort((r, o) => {
    var a, c;
    const i = /min-width:\s*([0-9.]+)/;
    return +(((a = r.match(i)) == null ? void 0 : a[1]) || 0) - +(((c = o.match(i)) == null ? void 0 : c[1]) || 0);
  });
  return n.length ? n.reduce((r, o) => {
    const i = t[o];
    return delete r[o], r[o] = i, r;
  }, {
    ...t
  }) : t;
}
function $m(e, t) {
  return t === "@" || t.startsWith("@") && (e.some((n) => t.startsWith(`@${n}`)) || !!t.match(/^@\d/));
}
function _m(e, t) {
  const n = t.match(/^@([^/]+)?\/?(.+)?$/);
  if (!n) {
    if (process.env.NODE_ENV !== "production")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The provided shorthand ${`(${t})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.` : un(18, `(${t})`));
    return null;
  }
  const [, r, o] = n, i = Number.isNaN(+r) ? r || 0 : +r;
  return e.containerQueries(o).up(i);
}
function Mm(e) {
  const t = (i, a) => i.replace("@media", a ? `@container ${a}` : "@container");
  function n(i, a) {
    i.up = (...c) => t(e.breakpoints.up(...c), a), i.down = (...c) => t(e.breakpoints.down(...c), a), i.between = (...c) => t(e.breakpoints.between(...c), a), i.only = (...c) => t(e.breakpoints.only(...c), a), i.not = (...c) => {
      const l = t(e.breakpoints.not(...c), a);
      return l.includes("not all and") ? l.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : l;
    };
  }
  const r = {}, o = (i) => (n(r, i), r);
  return n(o), {
    ...e,
    containerQueries: o
  };
}
const Dm = {
  borderRadius: 4
}, gn = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {};
function Ur(e, t) {
  return t ? it(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Pi = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, el = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Pi[e]}px)`
}, Lm = {
  containerQueries: (e) => ({
    up: (t) => {
      let n = typeof t == "number" ? t : Pi[t] || t;
      return typeof n == "number" && (n = `${n}px`), e ? `@container ${e} (min-width:${n})` : `@container (min-width:${n})`;
    }
  })
};
function It(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || el;
    return t.reduce((a, c, l) => (a[i.up(i.keys[l])] = n(t[l]), a), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || el;
    return Object.keys(t).reduce((a, c) => {
      if ($m(i.keys, c)) {
        const l = _m(r.containerQueries ? r : Lm, c);
        l && (a[l] = n(t[c], c));
      } else if (Object.keys(i.values || Pi).includes(c)) {
        const l = i.up(c);
        a[l] = n(t[c], c);
      } else {
        const l = c;
        a[l] = t[l];
      }
      return a;
    }, {});
  }
  return n(t);
}
function $d(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function _d(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function Bm(e, ...t) {
  const n = $d(e), r = [n, ...t].reduce((o, i) => it(o, i), {});
  return _d(Object.keys(n), r);
}
function Fm(e, t) {
  if (typeof e != "object")
    return {};
  const n = {}, r = Object.keys(t);
  return Array.isArray(e) ? r.forEach((o, i) => {
    i < e.length && (n[o] = !0);
  }) : r.forEach((o) => {
    e[o] != null && (n[o] = !0);
  }), n;
}
function vs({
  values: e,
  breakpoints: t,
  base: n
}) {
  const r = n || Fm(e, t), o = Object.keys(r);
  if (o.length === 0)
    return e;
  let i;
  return o.reduce((a, c, l) => (Array.isArray(e) ? (a[c] = e[l] != null ? e[l] : e[i], i = l) : typeof e == "object" ? (a[c] = e[c] != null ? e[c] : e[i], i = c) : a[c] = e, a), {});
}
function le(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : un(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function sr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function ui(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = sr(e, n) || r, t && (o = t(o, r, e)), o;
}
function Ke(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (a) => {
    if (a[t] == null)
      return null;
    const c = a[t], l = a.theme, u = sr(l, r) || {};
    return It(a, c, (f) => {
      let h = ui(u, o, f);
      return f === h && typeof f == "string" && (h = ui(u, o, `${t}${f === "default" ? "" : le(f)}`, f)), n === !1 ? h : {
        [n]: h
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: gn
  } : {}, i.filterProps = [t], i;
}
function Vm(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const Um = {
  m: "margin",
  p: "padding"
}, zm = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, tl = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Wm = Vm((e) => {
  if (e.length > 2)
    if (tl[e])
      e = tl[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Um[t], o = zm[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Ni = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], ji = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Hm = [...Ni, ...ji];
function po(e, t, n, r) {
  const o = sr(e, t, !0) ?? n;
  return typeof o == "number" || typeof o == "string" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), typeof o == "string" ? `calc(${i} * ${o})` : o * i) : Array.isArray(o) ? (i) => {
    if (typeof i == "string")
      return i;
    const a = Math.abs(i);
    process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > o.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(o)}.`, `${a} > ${o.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`)));
    const c = o[a];
    return i >= 0 ? c : typeof c == "number" ? -c : `-${c}`;
  } : typeof o == "function" ? o : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${o}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Ai(e) {
  return po(e, "spacing", 8, "spacing");
}
function An(e, t) {
  return typeof t == "string" || t == null ? t : e(t);
}
function qm(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = An(t, n), r), {});
}
function Gm(e, t, n, r) {
  if (!t.includes(n))
    return null;
  const o = Wm(n), i = qm(o, r), a = e[n];
  return It(e, a, i);
}
function Md(e, t) {
  const n = Ai(e.theme);
  return Object.keys(e).map((r) => Gm(e, t, r, n)).reduce(Ur, {});
}
function ze(e) {
  return Md(e, Ni);
}
ze.propTypes = process.env.NODE_ENV !== "production" ? Ni.reduce((e, t) => (e[t] = gn, e), {}) : {};
ze.filterProps = Ni;
function We(e) {
  return Md(e, ji);
}
We.propTypes = process.env.NODE_ENV !== "production" ? ji.reduce((e, t) => (e[t] = gn, e), {}) : {};
We.filterProps = ji;
process.env.NODE_ENV !== "production" && Hm.reduce((e, t) => (e[t] = gn, e), {});
function Dd(e = 8, t = Ai({
  spacing: e
})) {
  if (e.mui)
    return e;
  const n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const a = t(i);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return n.mui = !0, n;
}
function Ii(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? Ur(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function St(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function kt(e, t) {
  return Ke({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Ym = kt("border", St), Km = kt("borderTop", St), Xm = kt("borderRight", St), Jm = kt("borderBottom", St), Zm = kt("borderLeft", St), Qm = kt("borderColor"), eg = kt("borderTopColor"), tg = kt("borderRightColor"), ng = kt("borderBottomColor"), rg = kt("borderLeftColor"), og = kt("outline", St), ig = kt("outlineColor"), $i = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = po(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: An(t, r)
    });
    return It(e, e.borderRadius, n);
  }
  return null;
};
$i.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: gn
} : {};
$i.filterProps = ["borderRadius"];
Ii(Ym, Km, Xm, Jm, Zm, Qm, eg, tg, ng, rg, $i, og, ig);
const _i = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = po(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: An(t, r)
    });
    return It(e, e.gap, n);
  }
  return null;
};
_i.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: gn
} : {};
_i.filterProps = ["gap"];
const Mi = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = po(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: An(t, r)
    });
    return It(e, e.columnGap, n);
  }
  return null;
};
Mi.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: gn
} : {};
Mi.filterProps = ["columnGap"];
const Di = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = po(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: An(t, r)
    });
    return It(e, e.rowGap, n);
  }
  return null;
};
Di.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: gn
} : {};
Di.filterProps = ["rowGap"];
const sg = Ke({
  prop: "gridColumn"
}), ag = Ke({
  prop: "gridRow"
}), cg = Ke({
  prop: "gridAutoFlow"
}), lg = Ke({
  prop: "gridAutoColumns"
}), ug = Ke({
  prop: "gridAutoRows"
}), dg = Ke({
  prop: "gridTemplateColumns"
}), fg = Ke({
  prop: "gridTemplateRows"
}), pg = Ke({
  prop: "gridTemplateAreas"
}), hg = Ke({
  prop: "gridArea"
});
Ii(_i, Mi, Di, sg, ag, cg, lg, ug, dg, fg, pg, hg);
function nr(e, t) {
  return t === "grey" ? t : e;
}
const mg = Ke({
  prop: "color",
  themeKey: "palette",
  transform: nr
}), gg = Ke({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: nr
}), yg = Ke({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: nr
});
Ii(mg, gg, yg);
function ht(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const vg = Ke({
  prop: "width",
  transform: ht
}), ja = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var o, i, a, c, l;
      const r = ((a = (i = (o = e.theme) == null ? void 0 : o.breakpoints) == null ? void 0 : i.values) == null ? void 0 : a[n]) || Pi[n];
      return r ? ((l = (c = e.theme) == null ? void 0 : c.breakpoints) == null ? void 0 : l.unit) !== "px" ? {
        maxWidth: `${r}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: r
      } : {
        maxWidth: ht(n)
      };
    };
    return It(e, e.maxWidth, t);
  }
  return null;
};
ja.filterProps = ["maxWidth"];
const bg = Ke({
  prop: "minWidth",
  transform: ht
}), xg = Ke({
  prop: "height",
  transform: ht
}), Eg = Ke({
  prop: "maxHeight",
  transform: ht
}), Sg = Ke({
  prop: "minHeight",
  transform: ht
});
Ke({
  prop: "size",
  cssProperty: "width",
  transform: ht
});
Ke({
  prop: "size",
  cssProperty: "height",
  transform: ht
});
const wg = Ke({
  prop: "boxSizing"
});
Ii(vg, ja, bg, xg, Eg, Sg, wg);
const ho = {
  // borders
  border: {
    themeKey: "borders",
    transform: St
  },
  borderTop: {
    themeKey: "borders",
    transform: St
  },
  borderRight: {
    themeKey: "borders",
    transform: St
  },
  borderBottom: {
    themeKey: "borders",
    transform: St
  },
  borderLeft: {
    themeKey: "borders",
    transform: St
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: St
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: $i
  },
  // palette
  color: {
    themeKey: "palette",
    transform: nr
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: nr
  },
  backgroundColor: {
    themeKey: "palette",
    transform: nr
  },
  // spacing
  p: {
    style: We
  },
  pt: {
    style: We
  },
  pr: {
    style: We
  },
  pb: {
    style: We
  },
  pl: {
    style: We
  },
  px: {
    style: We
  },
  py: {
    style: We
  },
  padding: {
    style: We
  },
  paddingTop: {
    style: We
  },
  paddingRight: {
    style: We
  },
  paddingBottom: {
    style: We
  },
  paddingLeft: {
    style: We
  },
  paddingX: {
    style: We
  },
  paddingY: {
    style: We
  },
  paddingInline: {
    style: We
  },
  paddingInlineStart: {
    style: We
  },
  paddingInlineEnd: {
    style: We
  },
  paddingBlock: {
    style: We
  },
  paddingBlockStart: {
    style: We
  },
  paddingBlockEnd: {
    style: We
  },
  m: {
    style: ze
  },
  mt: {
    style: ze
  },
  mr: {
    style: ze
  },
  mb: {
    style: ze
  },
  ml: {
    style: ze
  },
  mx: {
    style: ze
  },
  my: {
    style: ze
  },
  margin: {
    style: ze
  },
  marginTop: {
    style: ze
  },
  marginRight: {
    style: ze
  },
  marginBottom: {
    style: ze
  },
  marginLeft: {
    style: ze
  },
  marginX: {
    style: ze
  },
  marginY: {
    style: ze
  },
  marginInline: {
    style: ze
  },
  marginInlineStart: {
    style: ze
  },
  marginInlineEnd: {
    style: ze
  },
  marginBlock: {
    style: ze
  },
  marginBlockStart: {
    style: ze
  },
  marginBlockEnd: {
    style: ze
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (e) => ({
      "@media print": {
        display: e
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: _i
  },
  rowGap: {
    style: Di
  },
  columnGap: {
    style: Mi
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: ht
  },
  maxWidth: {
    style: ja
  },
  minWidth: {
    transform: ht
  },
  height: {
    transform: ht
  },
  maxHeight: {
    transform: ht
  },
  minHeight: {
    transform: ht
  },
  boxSizing: {},
  // typography
  font: {
    themeKey: "font"
  },
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
};
function Cg(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Tg(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Og() {
  function e(n, r, o, i) {
    const a = {
      [n]: r,
      theme: o
    }, c = i[n];
    if (!c)
      return {
        [n]: r
      };
    const {
      cssProperty: l = n,
      themeKey: u,
      transform: d,
      style: f
    } = c;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const h = sr(o, u) || {};
    return f ? f(a) : It(a, r, (m) => {
      let p = ui(h, d, m);
      return m === p && typeof m == "string" && (p = ui(h, d, `${n}${m === "default" ? "" : le(m)}`, m)), l === !1 ? p : {
        [l]: p
      };
    });
  }
  function t(n) {
    const {
      sx: r,
      theme: o = {}
    } = n || {};
    if (!r)
      return null;
    const i = o.unstable_sxConfig ?? ho;
    function a(c) {
      let l = c;
      if (typeof c == "function")
        l = c(o);
      else if (typeof c != "object")
        return c;
      if (!l)
        return null;
      const u = $d(o.breakpoints), d = Object.keys(u);
      let f = u;
      return Object.keys(l).forEach((h) => {
        const b = Tg(l[h], o);
        if (b != null)
          if (typeof b == "object")
            if (i[h])
              f = Ur(f, e(h, b, o, i));
            else {
              const m = It({
                theme: o
              }, b, (p) => ({
                [h]: p
              }));
              Cg(m, b) ? f[h] = t({
                sx: b,
                theme: o
              }) : f = Ur(f, m);
            }
          else
            f = Ur(f, e(h, b, o, i));
      }), Im(o, _d(d, f));
    }
    return Array.isArray(r) ? r.map(a) : a(r);
  }
  return t;
}
const dn = Og();
dn.filterProps = ["sx"];
function Rg(e, t) {
  var r;
  const n = this;
  if (n.vars) {
    if (!((r = n.colorSchemes) != null && r[e]) || typeof n.getColorSchemeSelector != "function")
      return {};
    let o = n.getColorSchemeSelector(e);
    return o === "&" ? t : ((o.includes("data-") || o.includes(".")) && (o = `*:where(${o.replace(/\s*&$/, "")}) &`), {
      [o]: t
    });
  }
  return n.palette.mode === e ? t : {};
}
function mo(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {},
    ...a
  } = e, c = Am(n), l = Dd(o);
  let u = it({
    breakpoints: c,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...r
    },
    spacing: l,
    shape: {
      ...Dm,
      ...i
    }
  }, a);
  return u = Mm(u), u.applyStyles = Rg, u = t.reduce((d, f) => it(d, f), u), u.unstable_sxConfig = {
    ...ho,
    ...a == null ? void 0 : a.unstable_sxConfig
  }, u.unstable_sx = function(f) {
    return dn({
      sx: f,
      theme: this
    });
  }, u;
}
function kg(e) {
  return Object.keys(e).length === 0;
}
function Aa(e = null) {
  const t = v.useContext(Ed);
  return !t || kg(t) ? e : t;
}
const Pg = mo();
function Li(e = Pg) {
  return Aa(e);
}
function Ld({
  styles: e,
  themeId: t,
  defaultTheme: n = {}
}) {
  const r = Li(n), o = typeof e == "function" ? e(t && r[t] || r) : e;
  return /* @__PURE__ */ y.jsx(Na, {
    styles: o
  });
}
process.env.NODE_ENV !== "production" && (Ld.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  defaultTheme: s.object,
  /**
   * @ignore
   */
  styles: s.oneOfType([s.array, s.func, s.number, s.object, s.string, s.bool]),
  /**
   * @ignore
   */
  themeId: s.string
});
const Ng = (e) => {
  var r;
  const t = {
    systemProps: {},
    otherProps: {}
  }, n = ((r = e == null ? void 0 : e.theme) == null ? void 0 : r.unstable_sxConfig) ?? ho;
  return Object.keys(e).forEach((o) => {
    n[o] ? t.systemProps[o] = e[o] : t.otherProps[o] = e[o];
  }), t;
};
function Ia(e) {
  const {
    sx: t,
    ...n
  } = e, {
    systemProps: r,
    otherProps: o
  } = Ng(n);
  let i;
  return Array.isArray(t) ? i = [r, ...t] : typeof t == "function" ? i = (...a) => {
    const c = t(...a);
    return Ut(c) ? {
      ...r,
      ...c
    } : r;
  } : i = {
    ...r,
    ...t
  }, {
    ...o,
    sx: i
  };
}
const nl = (e) => e, jg = () => {
  let e = nl;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = nl;
    }
  };
}, $a = jg();
function Bd(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Bd(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function ie() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Bd(e)) && (r && (r += " "), r += t);
  return r;
}
function Fd(e = {}) {
  const {
    themeId: t,
    defaultTheme: n,
    defaultClassName: r = "MuiBox-root",
    generateClassName: o
  } = e, i = Ad("div", {
    shouldForwardProp: (c) => c !== "theme" && c !== "sx" && c !== "as"
  })(dn);
  return /* @__PURE__ */ v.forwardRef(function(l, u) {
    const d = Li(n), {
      className: f,
      component: h = "div",
      ...b
    } = Ia(l);
    return /* @__PURE__ */ y.jsx(i, {
      as: h,
      ref: u,
      className: ie(f, o ? o(r) : r),
      theme: t && d[t] || d,
      ...b
    });
  });
}
const Ag = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function we(e, t, n = "Mui") {
  const r = Ag[t];
  return r ? `${n}-${r}` : `${$a.generate(e)}-${t}`;
}
function Te(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = we(e, o, n);
  }), r;
}
const Ig = Te("MuiBox", ["root"]), Vd = Fd({
  defaultClassName: Ig.root,
  generateClassName: $a.generate
});
process.env.NODE_ENV !== "production" && (Vd.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: s.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
var Hs = { exports: {} }, Oe = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rl;
function $g() {
  if (rl) return Oe;
  rl = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.consumer"), a = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), b = Symbol.for("react.client.reference");
  function m(p) {
    if (typeof p == "object" && p !== null) {
      var g = p.$$typeof;
      switch (g) {
        case e:
          switch (p = p.type, p) {
            case n:
            case o:
            case r:
            case l:
            case u:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case a:
                case c:
                case f:
                case d:
                  return p;
                case i:
                  return p;
                default:
                  return g;
              }
          }
        case t:
          return g;
      }
    }
  }
  return Oe.ContextConsumer = i, Oe.ContextProvider = a, Oe.Element = e, Oe.ForwardRef = c, Oe.Fragment = n, Oe.Lazy = f, Oe.Memo = d, Oe.Portal = t, Oe.Profiler = o, Oe.StrictMode = r, Oe.Suspense = l, Oe.SuspenseList = u, Oe.isContextConsumer = function(p) {
    return m(p) === i;
  }, Oe.isContextProvider = function(p) {
    return m(p) === a;
  }, Oe.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === e;
  }, Oe.isForwardRef = function(p) {
    return m(p) === c;
  }, Oe.isFragment = function(p) {
    return m(p) === n;
  }, Oe.isLazy = function(p) {
    return m(p) === f;
  }, Oe.isMemo = function(p) {
    return m(p) === d;
  }, Oe.isPortal = function(p) {
    return m(p) === t;
  }, Oe.isProfiler = function(p) {
    return m(p) === o;
  }, Oe.isStrictMode = function(p) {
    return m(p) === r;
  }, Oe.isSuspense = function(p) {
    return m(p) === l;
  }, Oe.isSuspenseList = function(p) {
    return m(p) === u;
  }, Oe.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === n || p === o || p === r || p === l || p === u || p === h || typeof p == "object" && p !== null && (p.$$typeof === f || p.$$typeof === d || p.$$typeof === a || p.$$typeof === i || p.$$typeof === c || p.$$typeof === b || p.getModuleId !== void 0);
  }, Oe.typeOf = m, Oe;
}
var Re = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ol;
function _g() {
  return ol || (ol = 1, process.env.NODE_ENV !== "production" && function() {
    function e(p) {
      if (typeof p == "object" && p !== null) {
        var g = p.$$typeof;
        switch (g) {
          case t:
            switch (p = p.type, p) {
              case r:
              case i:
              case o:
              case u:
              case d:
                return p;
              default:
                switch (p = p && p.$$typeof, p) {
                  case c:
                  case l:
                  case h:
                  case f:
                    return p;
                  case a:
                    return p;
                  default:
                    return g;
                }
            }
          case n:
            return g;
        }
      }
    }
    var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.consumer"), c = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), m = Symbol.for("react.client.reference");
    Re.ContextConsumer = a, Re.ContextProvider = c, Re.Element = t, Re.ForwardRef = l, Re.Fragment = r, Re.Lazy = h, Re.Memo = f, Re.Portal = n, Re.Profiler = i, Re.StrictMode = o, Re.Suspense = u, Re.SuspenseList = d, Re.isContextConsumer = function(p) {
      return e(p) === a;
    }, Re.isContextProvider = function(p) {
      return e(p) === c;
    }, Re.isElement = function(p) {
      return typeof p == "object" && p !== null && p.$$typeof === t;
    }, Re.isForwardRef = function(p) {
      return e(p) === l;
    }, Re.isFragment = function(p) {
      return e(p) === r;
    }, Re.isLazy = function(p) {
      return e(p) === h;
    }, Re.isMemo = function(p) {
      return e(p) === f;
    }, Re.isPortal = function(p) {
      return e(p) === n;
    }, Re.isProfiler = function(p) {
      return e(p) === i;
    }, Re.isStrictMode = function(p) {
      return e(p) === o;
    }, Re.isSuspense = function(p) {
      return e(p) === u;
    }, Re.isSuspenseList = function(p) {
      return e(p) === d;
    }, Re.isValidElementType = function(p) {
      return typeof p == "string" || typeof p == "function" || p === r || p === i || p === o || p === u || p === d || p === b || typeof p == "object" && p !== null && (p.$$typeof === h || p.$$typeof === f || p.$$typeof === c || p.$$typeof === a || p.$$typeof === l || p.$$typeof === m || p.getModuleId !== void 0);
    }, Re.typeOf = e;
  }()), Re;
}
process.env.NODE_ENV === "production" ? Hs.exports = $g() : Hs.exports = _g();
var qs = Hs.exports;
function Ud(e, t = "") {
  return e.displayName || e.name || t;
}
function il(e, t, n) {
  const r = Ud(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Mg(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Ud(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case qs.ForwardRef:
          return il(e, e.render, "ForwardRef");
        case qs.Memo:
          return il(e, e.type, "memo");
        default:
          return;
      }
  }
}
function zd(e) {
  const {
    variants: t,
    ...n
  } = e, r = {
    variants: t,
    style: Qc(n),
    isProcessed: !0
  };
  return r.style === n || t && t.forEach((o) => {
    typeof o.style != "function" && (o.style = Qc(o.style));
  }), r;
}
const Dg = mo();
function bs(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function Lg(e) {
  return e ? (t, n) => n[e] : null;
}
function Bg(e, t, n) {
  e.theme = Ug(e.theme) ? n : e.theme[t] || e.theme;
}
function Jo(e, t) {
  const n = typeof t == "function" ? t(e) : t;
  if (Array.isArray(n))
    return n.flatMap((r) => Jo(e, r));
  if (Array.isArray(n == null ? void 0 : n.variants)) {
    let r;
    if (n.isProcessed)
      r = n.style;
    else {
      const {
        variants: o,
        ...i
      } = n;
      r = i;
    }
    return Wd(e, n.variants, [r]);
  }
  return n != null && n.isProcessed ? n.style : n;
}
function Wd(e, t, n = []) {
  var o;
  let r;
  e: for (let i = 0; i < t.length; i += 1) {
    const a = t[i];
    if (typeof a.props == "function") {
      if (r ?? (r = {
        ...e,
        ...e.ownerState,
        ownerState: e.ownerState
      }), !a.props(r))
        continue;
    } else
      for (const c in a.props)
        if (e[c] !== a.props[c] && ((o = e.ownerState) == null ? void 0 : o[c]) !== a.props[c])
          continue e;
    typeof a.style == "function" ? (r ?? (r = {
      ...e,
      ...e.ownerState,
      ownerState: e.ownerState
    }), n.push(a.style(r))) : n.push(a.style);
  }
  return n;
}
function Hd(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Dg,
    rootShouldForwardProp: r = bs,
    slotShouldForwardProp: o = bs
  } = e;
  function i(c) {
    Bg(c, t, n);
  }
  return (c, l = {}) => {
    Nm(c, (S) => S.filter((O) => O !== dn));
    const {
      name: u,
      slot: d,
      skipVariantsResolver: f,
      skipSx: h,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: b = Lg(qd(d)),
      ...m
    } = l, p = f !== void 0 ? f : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), g = h || !1;
    let C = bs;
    d === "Root" || d === "root" ? C = r : d ? C = o : zg(c) && (C = void 0);
    const T = Ad(c, {
      shouldForwardProp: C,
      label: Vg(u, d),
      ...m
    }), w = (S) => {
      if (typeof S == "function" && S.__emotion_real !== S)
        return function(R) {
          return Jo(R, S);
        };
      if (Ut(S)) {
        const O = zd(S);
        return O.variants ? function(N) {
          return Jo(N, O);
        } : O.style;
      }
      return S;
    }, E = (...S) => {
      const O = [], R = S.map(w), N = [];
      if (O.push(i), u && b && N.push(function(L) {
        var D, W;
        const V = (W = (D = L.theme.components) == null ? void 0 : D[u]) == null ? void 0 : W.styleOverrides;
        if (!V)
          return null;
        const M = {};
        for (const H in V)
          M[H] = Jo(L, V[H]);
        return b(L, M);
      }), u && !p && N.push(function(L) {
        var M, D;
        const _ = L.theme, V = (D = (M = _ == null ? void 0 : _.components) == null ? void 0 : M[u]) == null ? void 0 : D.variants;
        return V ? Wd(L, V) : null;
      }), g || N.push(dn), Array.isArray(R[0])) {
        const P = R.shift(), L = new Array(O.length).fill(""), _ = new Array(N.length).fill("");
        let V;
        V = [...L, ...P, ..._], V.raw = [...L, ...P.raw, ..._], O.unshift(V);
      }
      const j = [...O, ...R, ...N], x = T(...j);
      return c.muiName && (x.muiName = c.muiName), process.env.NODE_ENV !== "production" && (x.displayName = Fg(u, d, c)), x;
    };
    return T.withConfig && (E.withConfig = T.withConfig), E;
  };
}
function Fg(e, t, n) {
  return e ? `${e}${le(t || "")}` : `Styled(${Mg(n)})`;
}
function Vg(e, t) {
  let n;
  return process.env.NODE_ENV !== "production" && e && (n = `${e}-${qd(t || "Root")}`), n;
}
function Ug(e) {
  for (const t in e)
    return !1;
  return !0;
}
function zg(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function qd(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
const Gd = Hd();
function Gr(e, t) {
  const n = {
    ...t
  };
  for (const r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      const o = r;
      if (o === "components" || o === "slots")
        n[o] = {
          ...e[o],
          ...n[o]
        };
      else if (o === "componentsProps" || o === "slotProps") {
        const i = e[o], a = t[o];
        if (!a)
          n[o] = i || {};
        else if (!i)
          n[o] = a;
        else {
          n[o] = {
            ...a
          };
          for (const c in i)
            if (Object.prototype.hasOwnProperty.call(i, c)) {
              const l = c;
              n[o][l] = Gr(i[l], a[l]);
            }
        }
      } else n[o] === void 0 && (n[o] = e[o]);
    }
  return n;
}
function Yd(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Gr(t.components[n].defaultProps, r);
}
function Kd({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = Li(n);
  return r && (o = o[r] || o), Yd({
    theme: o,
    name: t,
    props: e
  });
}
const In = typeof window < "u" ? v.useLayoutEffect : v.useEffect;
function Wg(e, t, n, r, o) {
  const [i, a] = v.useState(() => o && n ? n(e).matches : r ? r(e).matches : t);
  return In(() => {
    if (!n)
      return;
    const c = n(e), l = () => {
      a(c.matches);
    };
    return l(), c.addEventListener("change", l), () => {
      c.removeEventListener("change", l);
    };
  }, [e, n]), i;
}
const Hg = {
  ...v
}, Xd = Hg.useSyncExternalStore;
function qg(e, t, n, r, o) {
  const i = v.useCallback(() => t, [t]), a = v.useMemo(() => {
    if (o && n)
      return () => n(e).matches;
    if (r !== null) {
      const {
        matches: d
      } = r(e);
      return () => d;
    }
    return i;
  }, [i, e, r, o, n]), [c, l] = v.useMemo(() => {
    if (n === null)
      return [i, () => () => {
      }];
    const d = n(e);
    return [() => d.matches, (f) => (d.addEventListener("change", f), () => {
      d.removeEventListener("change", f);
    })];
  }, [i, n, e]);
  return Xd(l, c, a);
}
function Gg(e = {}) {
  const {
    themeId: t
  } = e;
  return function(r, o = {}) {
    let i = Aa();
    i && t && (i = i[t] || i);
    const a = typeof window < "u" && typeof window.matchMedia < "u", {
      defaultMatches: c = !1,
      matchMedia: l = a ? window.matchMedia : null,
      ssrMatchMedia: u = null,
      noSsr: d = !1
    } = Yd({
      name: "MuiUseMediaQuery",
      props: o,
      theme: i
    });
    process.env.NODE_ENV !== "production" && typeof r == "function" && i === null && console.error(["MUI: The `query` argument provided is invalid.", "You are providing a function without a theme in the context.", "One of the parent elements needs to use a ThemeProvider."].join(`
`));
    let f = typeof r == "function" ? r(i) : r;
    f = f.replace(/^@media( ?)/m, "");
    const b = (Xd !== void 0 ? qg : Wg)(f, c, l, u, d);
    return process.env.NODE_ENV !== "production" && v.useDebugValue({
      query: f,
      match: b
    }), b;
  };
}
function Yg(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function _a(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Yg(e, t, n);
}
function Kg(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), process.env.NODE_ENV !== "production" && e.length !== e.trim().length && console.error(`MUI: The color: "${e}" is invalid. Make sure the color input doesn't contain leading/trailing space.`), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function fn(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return fn(Kg(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(n))
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : un(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(o))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : un(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
const Xg = (e) => {
  const t = fn(e);
  return t.values.slice(0, 3).map((n, r) => t.type.includes("hsl") && r !== 0 ? `${n}%` : n).join(" ");
}, Ir = (e, t) => {
  try {
    return Xg(e);
  } catch {
    return t && process.env.NODE_ENV !== "production" && console.warn(t), e;
  }
};
function Bi(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.includes("rgb") ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.includes("color") ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Jd(e) {
  e = fn(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), a = (u, d = (u + n / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let c = "rgb";
  const l = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (c += "a", l.push(t[3])), Bi({
    type: c,
    values: l
  });
}
function Gs(e) {
  e = fn(e);
  let t = e.type === "hsl" || e.type === "hsla" ? fn(Jd(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function sl(e, t) {
  const n = Gs(e), r = Gs(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Ve(e, t) {
  return e = fn(e), t = _a(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Bi(e);
}
function _o(e, t, n) {
  try {
    return Ve(e, t);
  } catch {
    return e;
  }
}
function Ma(e, t) {
  if (e = fn(e), t = _a(t), e.type.includes("hsl"))
    e.values[2] *= 1 - t;
  else if (e.type.includes("rgb") || e.type.includes("color"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Bi(e);
}
function Ae(e, t, n) {
  try {
    return Ma(e, t);
  } catch {
    return e;
  }
}
function Da(e, t) {
  if (e = fn(e), t = _a(t), e.type.includes("hsl"))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.includes("rgb"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.includes("color"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Bi(e);
}
function Ie(e, t, n) {
  try {
    return Da(e, t);
  } catch {
    return e;
  }
}
function Ys(e, t = 0.15) {
  return Gs(e) > 0.5 ? Ma(e, t) : Da(e, t);
}
function Mo(e, t, n) {
  try {
    return Ys(e, t);
  } catch {
    return e;
  }
}
function tn(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function Jg(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Zd(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  const l = i.type;
  return typeof l == "function" && !Jg(l) && (c = "Did you accidentally use a plain function component for an element instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Dn = tn(s.element, Zd);
Dn.isRequired = tn(s.element.isRequired, Zd);
function Zg(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Qg(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  return typeof i == "function" && !Zg(i) && (c = "Did you accidentally provide a plain function component instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const go = tn(s.elementType, Qg), ey = "exact-prop: ​";
function Fi(e) {
  return process.env.NODE_ENV === "production" ? e : {
    ...e,
    [ey]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  };
}
function Qt(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], a = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Vi = s.oneOfType([s.func, s.object]);
function al(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Qd(e, t = 166) {
  let n;
  function r(...o) {
    const i = () => {
      e.apply(this, o);
    };
    clearTimeout(n), n = setTimeout(i, t);
  }
  return r.clear = () => {
    clearTimeout(n);
  }, r;
}
function ef(e, t) {
  var n, r, o;
  return /* @__PURE__ */ v.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    e.type.muiName ?? ((o = (r = (n = e.type) == null ? void 0 : n._payload) == null ? void 0 : r.value) == null ? void 0 : o.muiName)
  ) !== -1;
}
function $t(e) {
  return e && e.ownerDocument || document;
}
function pn(e) {
  return $t(e).defaultView || window;
}
function Ks(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
let cl = 0;
function ty(e) {
  const [t, n] = v.useState(e), r = e || t;
  return v.useEffect(() => {
    t == null && (cl += 1, n(`mui-${cl}`));
  }, [t]), r;
}
const ny = {
  ...v
}, ll = ny.useId;
function ry(e) {
  if (ll !== void 0) {
    const t = ll();
    return e ?? t;
  }
  return ty(e);
}
function oy({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = v.useRef(e !== void 0), [i, a] = v.useState(t), c = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    v.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: u
    } = v.useRef(t);
    v.useEffect(() => {
      !o && !Object.is(u, t) && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const l = v.useCallback((u) => {
    o || a(u);
  }, []);
  return [c, l];
}
function ln(e) {
  const t = v.useRef(e);
  return In(() => {
    t.current = e;
  }), v.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function et(...e) {
  return v.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Ks(n, t);
    });
  }, e);
}
const ul = {};
function tf(e, t) {
  const n = v.useRef(ul);
  return n.current === ul && (n.current = e(t)), n;
}
const iy = [];
function sy(e) {
  v.useEffect(e, iy);
}
class Ui {
  constructor() {
    Un(this, "currentId", null);
    Un(this, "clear", () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    });
    Un(this, "disposeEffect", () => this.clear);
  }
  static create() {
    return new Ui();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(t, n) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, n();
    }, t);
  }
}
function Tn() {
  const e = tf(Ui.create).current;
  return sy(e.disposeEffect), e;
}
function ar(e) {
  try {
    return e.matches(":focus-visible");
  } catch {
    process.env.NODE_ENV !== "production" && !/jsdom/.test(window.navigator.userAgent) && console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join(`
`));
  }
  return !1;
}
function ay(e = window) {
  const t = e.document.documentElement.clientWidth;
  return e.innerWidth - t;
}
function cy(e) {
  const t = typeof e;
  switch (t) {
    case "number":
      return Number.isNaN(e) ? "NaN" : Number.isFinite(e) ? e !== Math.floor(e) ? "float" : "number" : "Infinity";
    case "object":
      return e === null ? "null" : e.constructor.name;
    default:
      return t;
  }
}
function nf(e, t, n, r) {
  const o = e[t];
  if (o == null || !Number.isInteger(o)) {
    const i = cy(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function rf(e, t, ...n) {
  return e[t] === void 0 ? null : nf(e, t, ...n);
}
function Xs() {
  return null;
}
rf.isRequired = nf;
Xs.isRequired = Xs;
const rr = process.env.NODE_ENV === "production" ? Xs : rf;
function Pe(e, t, n = void 0) {
  const r = {};
  for (const o in e) {
    const i = e[o];
    let a = "", c = !0;
    for (let l = 0; l < i.length; l += 1) {
      const u = i[l];
      u && (a += (c === !0 ? "" : " ") + t(u), c = !1, n && n[u] && (a += " " + n[u]));
    }
    r[o] = a;
  }
  return r;
}
function ly(e) {
  return typeof e == "string";
}
function of(e, t, n) {
  return e === void 0 || ly(e) ? t : {
    ...t,
    ownerState: {
      ...t.ownerState,
      ...n
    }
  };
}
function sf(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function dl(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function af(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = ie(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = {
      ...n == null ? void 0 : n.style,
      ...o == null ? void 0 : o.style,
      ...r == null ? void 0 : r.style
    }, p = {
      ...n,
      ...o,
      ...r
    };
    return b.length > 0 && (p.className = b), Object.keys(m).length > 0 && (p.style = m), {
      props: p,
      internalRef: void 0
    };
  }
  const a = sf({
    ...o,
    ...r
  }), c = dl(r), l = dl(o), u = t(a), d = ie(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = {
    ...u == null ? void 0 : u.style,
    ...n == null ? void 0 : n.style,
    ...o == null ? void 0 : o.style,
    ...r == null ? void 0 : r.style
  }, h = {
    ...u,
    ...n,
    ...l,
    ...c
  };
  return d.length > 0 && (h.className = d), Object.keys(f).length > 0 && (h.style = f), {
    props: h,
    internalRef: u.ref
  };
}
function cf(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function lf(e) {
  var f;
  const {
    elementType: t,
    externalSlotProps: n,
    ownerState: r,
    skipResolvingSlotProps: o = !1,
    ...i
  } = e, a = o ? {} : cf(n, r), {
    props: c,
    internalRef: l
  } = af({
    ...i,
    externalSlotProps: a
  }), u = et(l, a == null ? void 0 : a.ref, (f = e.additionalProps) == null ? void 0 : f.ref);
  return of(t, {
    ...c,
    ref: u
  }, r);
}
function gr(e) {
  var t;
  return parseInt(v.version, 10) >= 19 ? ((t = e == null ? void 0 : e.props) == null ? void 0 : t.ref) || null : (e == null ? void 0 : e.ref) || null;
}
const La = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (La.displayName = "ThemeContext");
function Ba() {
  const e = v.useContext(La);
  return process.env.NODE_ENV !== "production" && v.useDebugValue(e), e;
}
const uy = typeof Symbol == "function" && Symbol.for, dy = uy ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function fy(e, t) {
  if (typeof t == "function") {
    const n = t(e);
    return process.env.NODE_ENV !== "production" && (n || console.error(["MUI: You should return an object from your theme function, i.e.", "<ThemeProvider theme={() => ({})} />"].join(`
`))), n;
  }
  return {
    ...e,
    ...t
  };
}
function di(e) {
  const {
    children: t,
    theme: n
  } = e, r = Ba();
  process.env.NODE_ENV !== "production" && r === null && typeof n == "function" && console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join(`
`));
  const o = v.useMemo(() => {
    const i = r === null ? {
      ...n
    } : fy(r, n);
    return i != null && (i[dy] = r !== null), i;
  }, [n, r]);
  return /* @__PURE__ */ y.jsx(La.Provider, {
    value: o,
    children: t
  });
}
process.env.NODE_ENV !== "production" && (di.propTypes = {
  /**
   * Your component tree.
   */
  children: s.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: s.oneOfType([s.object, s.func]).isRequired
});
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "production" && (di.propTypes = Fi(di.propTypes));
const uf = /* @__PURE__ */ v.createContext();
function df({
  value: e,
  ...t
}) {
  return /* @__PURE__ */ y.jsx(uf.Provider, {
    value: e ?? !0,
    ...t
  });
}
process.env.NODE_ENV !== "production" && (df.propTypes = {
  children: s.node,
  value: s.bool
});
const Fa = () => v.useContext(uf) ?? !1, ff = /* @__PURE__ */ v.createContext(void 0);
function pf({
  value: e,
  children: t
}) {
  return /* @__PURE__ */ y.jsx(ff.Provider, {
    value: e,
    children: t
  });
}
process.env.NODE_ENV !== "production" && (pf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: s.node,
  /**
   * @ignore
   */
  value: s.object
});
function py(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  if (!t || !t.components || !t.components[n])
    return r;
  const o = t.components[n];
  return o.defaultProps ? Gr(o.defaultProps, r) : !o.styleOverrides && !o.variants ? Gr(o, r) : r;
}
function hy({
  props: e,
  name: t
}) {
  const n = v.useContext(ff);
  return py({
    props: e,
    name: t,
    theme: {
      components: n
    }
  });
}
const fl = {};
function pl(e, t, n, r = !1) {
  return v.useMemo(() => {
    const o = e && t[e] || t;
    if (typeof n == "function") {
      const i = n(o), a = e ? {
        ...t,
        [e]: i
      } : i;
      return r ? () => a : a;
    }
    return e ? {
      ...t,
      [e]: n
    } : {
      ...t,
      ...n
    };
  }, [e, t, n, r]);
}
function Yr(e) {
  const {
    children: t,
    theme: n,
    themeId: r
  } = e, o = Aa(fl), i = Ba() || fl;
  process.env.NODE_ENV !== "production" && (o === null && typeof n == "function" || r && o && !o[r] && typeof n == "function") && console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join(`
`));
  const a = pl(r, o, n), c = pl(r, i, n, !0), l = (r ? a[r] : a).direction === "rtl";
  return /* @__PURE__ */ y.jsx(di, {
    theme: c,
    children: /* @__PURE__ */ y.jsx(Ed.Provider, {
      value: a,
      children: /* @__PURE__ */ y.jsx(df, {
        value: l,
        children: /* @__PURE__ */ y.jsx(pf, {
          value: r ? a[r].components : a.components,
          children: t
        })
      })
    })
  });
}
process.env.NODE_ENV !== "production" && (Yr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Your component tree.
   */
  children: s.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: s.oneOfType([s.func, s.object]).isRequired,
  /**
   * The design system's unique id for getting the corresponded theme when there are multiple design systems.
   */
  themeId: s.string
});
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "production" && (Yr.propTypes = Fi(Yr.propTypes));
const hl = {
  theme: void 0
};
function my(e) {
  let t, n;
  return function(o) {
    let i = t;
    return (i === void 0 || o.theme !== n) && (hl.theme = o.theme, i = zd(e(hl)), t = i, n = o.theme), i;
  };
}
const Va = "mode", Ua = "color-scheme", gy = "data-color-scheme";
function hf(e) {
  const {
    defaultMode: t = "system",
    defaultLightColorScheme: n = "light",
    defaultDarkColorScheme: r = "dark",
    modeStorageKey: o = Va,
    colorSchemeStorageKey: i = Ua,
    attribute: a = gy,
    colorSchemeNode: c = "document.documentElement",
    nonce: l
  } = e || {};
  let u = "", d = a;
  if (a === "class" && (d = ".%s"), a === "data" && (d = "[data-%s]"), d.startsWith(".")) {
    const h = d.substring(1);
    u += `${c}.classList.remove('${h}'.replace('%s', light), '${h}'.replace('%s', dark));
      ${c}.classList.add('${h}'.replace('%s', colorScheme));`;
  }
  const f = d.match(/\[([^\]]+)\]/);
  if (f) {
    const [h, b] = f[1].split("=");
    b || (u += `${c}.removeAttribute('${h}'.replace('%s', light));
      ${c}.removeAttribute('${h}'.replace('%s', dark));`), u += `
      ${c}.setAttribute('${h}'.replace('%s', colorScheme), ${b ? `${b}.replace('%s', colorScheme)` : '""'});`;
  } else
    u += `${c}.setAttribute('${d}', colorScheme);`;
  return /* @__PURE__ */ y.jsx("script", {
    suppressHydrationWarning: !0,
    nonce: typeof window > "u" ? l : "",
    dangerouslySetInnerHTML: {
      __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${o}') || '${t}';
  const dark = localStorage.getItem('${i}-dark') || '${r}';
  const light = localStorage.getItem('${i}-light') || '${n}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${u}
  }
} catch(e){}})();`
    }
  }, "mui-color-scheme-init");
}
function ml(e) {
  if (typeof window < "u" && typeof window.matchMedia == "function" && e === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function mf(e, t) {
  if (e.mode === "light" || e.mode === "system" && e.systemMode === "light")
    return t("light");
  if (e.mode === "dark" || e.mode === "system" && e.systemMode === "dark")
    return t("dark");
}
function yy(e) {
  return mf(e, (t) => {
    if (t === "light")
      return e.lightColorScheme;
    if (t === "dark")
      return e.darkColorScheme;
  });
}
function xs(e, t) {
  if (typeof window > "u")
    return;
  let n;
  try {
    n = localStorage.getItem(e) || void 0, n || localStorage.setItem(e, t);
  } catch {
  }
  return n || t;
}
function vy(e) {
  const {
    defaultMode: t = "light",
    defaultLightColorScheme: n,
    defaultDarkColorScheme: r,
    supportedColorSchemes: o = [],
    modeStorageKey: i = Va,
    colorSchemeStorageKey: a = Ua,
    storageWindow: c = typeof window > "u" ? void 0 : window,
    noSsr: l = !1
  } = e, u = o.join(","), d = o.length > 1, [f, h] = v.useState(() => {
    const E = xs(i, t), S = xs(`${a}-light`, n), O = xs(`${a}-dark`, r);
    return {
      mode: E,
      systemMode: ml(E),
      lightColorScheme: S,
      darkColorScheme: O
    };
  }), [b, m] = v.useState(l || !d);
  v.useEffect(() => {
    m(!0);
  }, []);
  const p = yy(f), g = v.useCallback((E) => {
    h((S) => {
      if (E === S.mode)
        return S;
      const O = E ?? t;
      try {
        localStorage.setItem(i, O);
      } catch {
      }
      return {
        ...S,
        mode: O,
        systemMode: ml(O)
      };
    });
  }, [i, t]), C = v.useCallback((E) => {
    E ? typeof E == "string" ? E && !u.includes(E) ? console.error(`\`${E}\` does not exist in \`theme.colorSchemes\`.`) : h((S) => {
      const O = {
        ...S
      };
      return mf(S, (R) => {
        try {
          localStorage.setItem(`${a}-${R}`, E);
        } catch {
        }
        R === "light" && (O.lightColorScheme = E), R === "dark" && (O.darkColorScheme = E);
      }), O;
    }) : h((S) => {
      const O = {
        ...S
      }, R = E.light === null ? n : E.light, N = E.dark === null ? r : E.dark;
      if (R)
        if (!u.includes(R))
          console.error(`\`${R}\` does not exist in \`theme.colorSchemes\`.`);
        else {
          O.lightColorScheme = R;
          try {
            localStorage.setItem(`${a}-light`, R);
          } catch {
          }
        }
      if (N)
        if (!u.includes(N))
          console.error(`\`${N}\` does not exist in \`theme.colorSchemes\`.`);
        else {
          O.darkColorScheme = N;
          try {
            localStorage.setItem(`${a}-dark`, N);
          } catch {
          }
        }
      return O;
    }) : h((S) => {
      try {
        localStorage.setItem(`${a}-light`, n), localStorage.setItem(`${a}-dark`, r);
      } catch {
      }
      return {
        ...S,
        lightColorScheme: n,
        darkColorScheme: r
      };
    });
  }, [u, a, n, r]), T = v.useCallback((E) => {
    f.mode === "system" && h((S) => {
      const O = E != null && E.matches ? "dark" : "light";
      return S.systemMode === O ? S : {
        ...S,
        systemMode: O
      };
    });
  }, [f.mode]), w = v.useRef(T);
  return w.current = T, v.useEffect(() => {
    if (typeof window.matchMedia != "function" || !d)
      return;
    const E = (...O) => w.current(...O), S = window.matchMedia("(prefers-color-scheme: dark)");
    return S.addListener(E), E(S), () => {
      S.removeListener(E);
    };
  }, [d]), v.useEffect(() => {
    if (c && d) {
      const E = (S) => {
        const O = S.newValue;
        typeof S.key == "string" && S.key.startsWith(a) && (!O || u.match(O)) && (S.key.endsWith("light") && C({
          light: O
        }), S.key.endsWith("dark") && C({
          dark: O
        })), S.key === i && (!O || ["light", "dark", "system"].includes(O)) && g(O || t);
      };
      return c.addEventListener("storage", E), () => {
        c.removeEventListener("storage", E);
      };
    }
  }, [C, g, i, a, u, t, c, d]), {
    ...f,
    mode: b ? f.mode : void 0,
    systemMode: b ? f.systemMode : void 0,
    colorScheme: b ? p : void 0,
    setMode: g,
    setColorScheme: C
  };
}
const by = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function xy(e) {
  const {
    themeId: t,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: n = {},
    modeStorageKey: r = Va,
    colorSchemeStorageKey: o = Ua,
    disableTransitionOnChange: i = !1,
    defaultColorScheme: a,
    resolveTheme: c
  } = e, l = {
    allColorSchemes: [],
    colorScheme: void 0,
    darkColorScheme: void 0,
    lightColorScheme: void 0,
    mode: void 0,
    setColorScheme: () => {
    },
    setMode: () => {
    },
    systemMode: void 0
  }, u = /* @__PURE__ */ v.createContext(void 0);
  process.env.NODE_ENV !== "production" && (u.displayName = "ColorSchemeContext");
  const d = () => v.useContext(u) || l, f = {}, h = {};
  function b(C) {
    var Mt, Dt, Lt, Bt;
    const {
      children: T,
      theme: w,
      modeStorageKey: E = r,
      colorSchemeStorageKey: S = o,
      disableTransitionOnChange: O = i,
      storageWindow: R = typeof window > "u" ? void 0 : window,
      documentNode: N = typeof document > "u" ? void 0 : document,
      colorSchemeNode: j = typeof document > "u" ? void 0 : document.documentElement,
      disableNestedContext: x = !1,
      disableStyleSheetGeneration: P = !1,
      defaultMode: L = "system",
      noSsr: _
    } = C, V = v.useRef(!1), M = Ba(), D = v.useContext(u), W = !!D && !x, H = v.useMemo(() => w || (typeof n == "function" ? n() : n), [w]), X = H[t], A = X || H, {
      colorSchemes: U = f,
      components: Q = h,
      cssVarPrefix: ee
    } = A, q = Object.keys(U).filter((Ne) => !!U[Ne]).join(","), K = v.useMemo(() => q.split(","), [q]), F = typeof a == "string" ? a : a.light, J = typeof a == "string" ? a : a.dark, Z = U[F] && U[J] ? L : ((Dt = (Mt = U[A.defaultColorScheme]) == null ? void 0 : Mt.palette) == null ? void 0 : Dt.mode) || ((Lt = A.palette) == null ? void 0 : Lt.mode), {
      mode: ne,
      setMode: G,
      systemMode: re,
      lightColorScheme: B,
      darkColorScheme: pe,
      colorScheme: Y,
      setColorScheme: ye
    } = vy({
      supportedColorSchemes: K,
      defaultLightColorScheme: F,
      defaultDarkColorScheme: J,
      modeStorageKey: E,
      colorSchemeStorageKey: S,
      defaultMode: Z,
      storageWindow: R,
      noSsr: _
    });
    let Me = ne, me = Y;
    W && (Me = D.mode, me = D.colorScheme);
    const De = v.useMemo(() => {
      var bt;
      const Ne = me || A.defaultColorScheme, Ge = ((bt = A.generateThemeVars) == null ? void 0 : bt.call(A)) || A.vars, Ue = {
        ...A,
        components: Q,
        colorSchemes: U,
        cssVarPrefix: ee,
        vars: Ge
      };
      if (typeof Ue.generateSpacing == "function" && (Ue.spacing = Ue.generateSpacing()), Ne) {
        const _e = U[Ne];
        _e && typeof _e == "object" && Object.keys(_e).forEach((tt) => {
          _e[tt] && typeof _e[tt] == "object" ? Ue[tt] = {
            ...Ue[tt],
            ..._e[tt]
          } : Ue[tt] = _e[tt];
        });
      }
      return c ? c(Ue) : Ue;
    }, [A, me, Q, U, ee]), Le = A.colorSchemeSelector;
    v.useEffect(() => {
      if (me && j && Le && Le !== "media") {
        const Ne = Le;
        let Ge = Le;
        if (Ne === "class" && (Ge = ".%s"), Ne === "data" && (Ge = "[data-%s]"), Ne != null && Ne.startsWith("data-") && !Ne.includes("%s") && (Ge = `[${Ne}="%s"]`), Ge.startsWith("."))
          j.classList.remove(...K.map((Ue) => Ge.substring(1).replace("%s", Ue))), j.classList.add(Ge.substring(1).replace("%s", me));
        else {
          const Ue = Ge.replace("%s", me).match(/\[([^\]]+)\]/);
          if (Ue) {
            const [bt, _e] = Ue[1].split("=");
            _e || K.forEach((tt) => {
              j.removeAttribute(bt.replace(me, tt));
            }), j.setAttribute(bt, _e ? _e.replace(/"|'/g, "") : "");
          } else
            j.setAttribute(Ge, me);
        }
      }
    }, [me, Le, j, K]), v.useEffect(() => {
      let Ne;
      if (O && V.current && N) {
        const Ge = N.createElement("style");
        Ge.appendChild(N.createTextNode(by)), N.head.appendChild(Ge), window.getComputedStyle(N.body), Ne = setTimeout(() => {
          N.head.removeChild(Ge);
        }, 1);
      }
      return () => {
        clearTimeout(Ne);
      };
    }, [me, O, N]), v.useEffect(() => (V.current = !0, () => {
      V.current = !1;
    }), []);
    const Xe = v.useMemo(() => ({
      allColorSchemes: K,
      colorScheme: me,
      darkColorScheme: pe,
      lightColorScheme: B,
      mode: Me,
      setColorScheme: ye,
      setMode: process.env.NODE_ENV === "production" ? G : (Ne) => {
        De.colorSchemeSelector === "media" && console.error(["MUI: The `setMode` function has no effect if `colorSchemeSelector` is `media` (`media` is the default value).", "To toggle the mode manually, please configure `colorSchemeSelector` to use a class or data attribute.", "To learn more, visit https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually"].join(`
`)), G(Ne);
      },
      systemMode: re
    }), [K, me, pe, B, Me, ye, G, re, De.colorSchemeSelector]);
    let $e = !0;
    (P || A.cssVariables === !1 || W && (M == null ? void 0 : M.cssVarPrefix) === ee) && ($e = !1);
    const oe = /* @__PURE__ */ y.jsxs(v.Fragment, {
      children: [/* @__PURE__ */ y.jsx(Yr, {
        themeId: X ? t : void 0,
        theme: De,
        children: T
      }), $e && /* @__PURE__ */ y.jsx(Na, {
        styles: ((Bt = De.generateStyleSheets) == null ? void 0 : Bt.call(De)) || []
      })]
    });
    return W ? oe : /* @__PURE__ */ y.jsx(u.Provider, {
      value: Xe,
      children: oe
    });
  }
  process.env.NODE_ENV !== "production" && (b.propTypes = {
    /**
     * The component tree.
     */
    children: s.node,
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: s.any,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: s.string,
    /**
     * The default mode when the storage is empty,
     * require the theme to have `colorSchemes` with light and dark.
     */
    defaultMode: s.string,
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: s.bool,
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: s.bool,
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: s.bool,
    /**
     * The document to attach the attribute to.
     */
    documentNode: s.any,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: s.string,
    /**
     * If `true`, the mode will be the same value as the storage without an extra rerendering after the hydration.
     * You should use this option in conjuction with `InitColorSchemeScript` component.
     */
    noSsr: s.bool,
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: s.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: s.object
  });
  const m = typeof a == "string" ? a : a.light, p = typeof a == "string" ? a : a.dark;
  return {
    CssVarsProvider: b,
    useColorScheme: d,
    getInitColorSchemeScript: (C) => hf({
      colorSchemeStorageKey: o,
      defaultLightColorScheme: m,
      defaultDarkColorScheme: p,
      modeStorageKey: r,
      ...C
    })
  };
}
function Ey(e = "") {
  function t(...r) {
    if (!r.length)
      return "";
    const o = r[0];
    return typeof o == "string" && !o.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${o}${t(...r.slice(1))})` : `, ${o}`;
  }
  return (r, ...o) => `var(--${e ? `${e}-` : ""}${r}${t(...o)})`;
}
const gl = (e, t, n, r = []) => {
  let o = e;
  t.forEach((i, a) => {
    a === t.length - 1 ? Array.isArray(o) ? o[Number(i)] = n : o && typeof o == "object" && (o[i] = n) : o && typeof o == "object" && (o[i] || (o[i] = r.includes(i) ? [] : {}), o = o[i]);
  });
}, Sy = (e, t, n) => {
  function r(o, i = [], a = []) {
    Object.entries(o).forEach(([c, l]) => {
      (!n || !n([...i, c])) && l != null && (typeof l == "object" && Object.keys(l).length > 0 ? r(l, [...i, c], Array.isArray(l) ? [...a, c] : a) : t([...i, c], l, a));
    });
  }
  r(e);
}, wy = (e, t) => typeof t == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((r) => e.includes(r)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function Es(e, t) {
  const {
    prefix: n,
    shouldSkipGeneratingVar: r
  } = t || {}, o = {}, i = {}, a = {};
  return Sy(
    e,
    (c, l, u) => {
      if ((typeof l == "string" || typeof l == "number") && (!r || !r(c, l))) {
        const d = `--${n ? `${n}-` : ""}${c.join("-")}`, f = wy(c, l);
        Object.assign(o, {
          [d]: f
        }), gl(i, c, `var(${d})`, u), gl(a, c, `var(${d}, ${f})`, u);
      }
    },
    (c) => c[0] === "vars"
    // skip 'vars/*' paths
  ), {
    css: o,
    vars: i,
    varsWithDefaults: a
  };
}
function Cy(e, t = {}) {
  const {
    getSelector: n = g,
    disableCssColorScheme: r,
    colorSchemeSelector: o
  } = t, {
    colorSchemes: i = {},
    components: a,
    defaultColorScheme: c = "light",
    ...l
  } = e, {
    vars: u,
    css: d,
    varsWithDefaults: f
  } = Es(l, t);
  let h = f;
  const b = {}, {
    [c]: m,
    ...p
  } = i;
  if (Object.entries(p || {}).forEach(([w, E]) => {
    const {
      vars: S,
      css: O,
      varsWithDefaults: R
    } = Es(E, t);
    h = it(h, R), b[w] = {
      css: O,
      vars: S
    };
  }), m) {
    const {
      css: w,
      vars: E,
      varsWithDefaults: S
    } = Es(m, t);
    h = it(h, S), b[c] = {
      css: w,
      vars: E
    };
  }
  function g(w, E) {
    var O, R;
    let S = o;
    if (o === "class" && (S = ".%s"), o === "data" && (S = "[data-%s]"), o != null && o.startsWith("data-") && !o.includes("%s") && (S = `[${o}="%s"]`), w) {
      if (S === "media")
        return e.defaultColorScheme === w ? ":root" : {
          [`@media (prefers-color-scheme: ${((R = (O = i[w]) == null ? void 0 : O.palette) == null ? void 0 : R.mode) || w})`]: {
            ":root": E
          }
        };
      if (S)
        return e.defaultColorScheme === w ? `:root, ${S.replace("%s", String(w))}` : S.replace("%s", String(w));
    }
    return ":root";
  }
  return {
    vars: h,
    generateThemeVars: () => {
      let w = {
        ...u
      };
      return Object.entries(b).forEach(([, {
        vars: E
      }]) => {
        w = it(w, E);
      }), w;
    },
    generateStyleSheets: () => {
      var N, j;
      const w = [], E = e.defaultColorScheme || "light";
      function S(x, P) {
        Object.keys(P).length && w.push(typeof x == "string" ? {
          [x]: {
            ...P
          }
        } : x);
      }
      S(n(void 0, {
        ...d
      }), d);
      const {
        [E]: O,
        ...R
      } = b;
      if (O) {
        const {
          css: x
        } = O, P = (j = (N = i[E]) == null ? void 0 : N.palette) == null ? void 0 : j.mode, L = !r && P ? {
          colorScheme: P,
          ...x
        } : {
          ...x
        };
        S(n(E, {
          ...L
        }), L);
      }
      return Object.entries(R).forEach(([x, {
        css: P
      }]) => {
        var V, M;
        const L = (M = (V = i[x]) == null ? void 0 : V.palette) == null ? void 0 : M.mode, _ = !r && L ? {
          colorScheme: L,
          ...P
        } : {
          ...P
        };
        S(n(x, {
          ..._
        }), _);
      }), w;
    }
  };
}
function Ty(e) {
  return function(n) {
    return e === "media" ? (process.env.NODE_ENV !== "production" && n !== "light" && n !== "dark" && console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${n}'.`), `@media (prefers-color-scheme: ${n})`) : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${n}"] &` : e === "class" ? `.${n} &` : e === "data" ? `[data-${n}] &` : `${e.replace("%s", n)} &` : "&";
  };
}
const Oy = mo(), Ry = Gd("div", {
  name: "MuiContainer",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[`maxWidth${le(String(n.maxWidth))}`], n.fixed && t.fixed, n.disableGutters && t.disableGutters];
  }
}), ky = (e) => Kd({
  props: e,
  name: "MuiContainer",
  defaultTheme: Oy
}), Py = (e, t) => {
  const n = (l) => we(t, l), {
    classes: r,
    fixed: o,
    disableGutters: i,
    maxWidth: a
  } = e, c = {
    root: ["root", a && `maxWidth${le(String(a))}`, o && "fixed", i && "disableGutters"]
  };
  return Pe(c, n, r);
};
function Ny(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = Ry,
    useThemeProps: n = ky,
    componentName: r = "MuiContainer"
  } = e, o = t(({
    theme: a,
    ownerState: c
  }) => ({
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    ...!c.disableGutters && {
      paddingLeft: a.spacing(2),
      paddingRight: a.spacing(2),
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [a.breakpoints.up("sm")]: {
        paddingLeft: a.spacing(3),
        paddingRight: a.spacing(3)
      }
    }
  }), ({
    theme: a,
    ownerState: c
  }) => c.fixed && Object.keys(a.breakpoints.values).reduce((l, u) => {
    const d = u, f = a.breakpoints.values[d];
    return f !== 0 && (l[a.breakpoints.up(d)] = {
      maxWidth: `${f}${a.breakpoints.unit}`
    }), l;
  }, {}), ({
    theme: a,
    ownerState: c
  }) => ({
    // @ts-ignore module augmentation fails if custom breakpoints are used
    ...c.maxWidth === "xs" && {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [a.breakpoints.up("xs")]: {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        maxWidth: Math.max(a.breakpoints.values.xs, 444)
      }
    },
    ...c.maxWidth && // @ts-ignore module augmentation fails if custom breakpoints are used
    c.maxWidth !== "xs" && {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [a.breakpoints.up(c.maxWidth)]: {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        maxWidth: `${a.breakpoints.values[c.maxWidth]}${a.breakpoints.unit}`
      }
    }
  })), i = /* @__PURE__ */ v.forwardRef(function(c, l) {
    const u = n(c), {
      className: d,
      component: f = "div",
      disableGutters: h = !1,
      fixed: b = !1,
      maxWidth: m = "lg",
      classes: p,
      ...g
    } = u, C = {
      ...u,
      component: f,
      disableGutters: h,
      fixed: b,
      maxWidth: m
    }, T = Py(C, r);
    return (
      // @ts-ignore theme is injected by the styled util
      /* @__PURE__ */ y.jsx(o, {
        as: f,
        ownerState: C,
        className: ie(T.root, d),
        ref: l,
        ...g
      })
    );
  });
  return process.env.NODE_ENV !== "production" && (i.propTypes = {
    children: s.node,
    classes: s.object,
    className: s.string,
    component: s.elementType,
    disableGutters: s.bool,
    fixed: s.bool,
    maxWidth: s.oneOfType([s.oneOf(["xs", "sm", "md", "lg", "xl", !1]), s.string]),
    sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
  }), i;
}
const jy = mo(), Ay = Gd("div", {
  name: "MuiStack",
  slot: "Root",
  overridesResolver: (e, t) => t.root
});
function Iy(e) {
  return Kd({
    props: e,
    name: "MuiStack",
    defaultTheme: jy
  });
}
function $y(e, t) {
  const n = v.Children.toArray(e).filter(Boolean);
  return n.reduce((r, o, i) => (r.push(o), i < n.length - 1 && r.push(/* @__PURE__ */ v.cloneElement(t, {
    key: `separator-${i}`
  })), r), []);
}
const _y = (e) => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
})[e], My = ({
  ownerState: e,
  theme: t
}) => {
  let n = {
    display: "flex",
    flexDirection: "column",
    ...It({
      theme: t
    }, vs({
      values: e.direction,
      breakpoints: t.breakpoints.values
    }), (r) => ({
      flexDirection: r
    }))
  };
  if (e.spacing) {
    const r = Ai(t), o = Object.keys(t.breakpoints.values).reduce((l, u) => ((typeof e.spacing == "object" && e.spacing[u] != null || typeof e.direction == "object" && e.direction[u] != null) && (l[u] = !0), l), {}), i = vs({
      values: e.direction,
      base: o
    }), a = vs({
      values: e.spacing,
      base: o
    });
    typeof i == "object" && Object.keys(i).forEach((l, u, d) => {
      if (!i[l]) {
        const h = u > 0 ? i[d[u - 1]] : "column";
        i[l] = h;
      }
    }), n = it(n, It({
      theme: t
    }, a, (l, u) => e.useFlexGap ? {
      gap: An(r, l)
    } : {
      // The useFlexGap={false} implement relies on each child to give up control of the margin.
      // We need to reset the margin to avoid double spacing.
      "& > :not(style):not(style)": {
        margin: 0
      },
      "& > :not(style) ~ :not(style)": {
        [`margin${_y(u ? i[u] : e.direction)}`]: An(r, l)
      }
    }));
  }
  return n = Bm(t.breakpoints, n), n;
};
function gf(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = Ay,
    useThemeProps: n = Iy,
    componentName: r = "MuiStack"
  } = e, o = () => Pe({
    root: ["root"]
  }, (l) => we(r, l), {}), i = t(My), a = /* @__PURE__ */ v.forwardRef(function(l, u) {
    const d = n(l), f = Ia(d), {
      component: h = "div",
      direction: b = "column",
      spacing: m = 0,
      divider: p,
      children: g,
      className: C,
      useFlexGap: T = !1,
      ...w
    } = f, E = {
      direction: b,
      spacing: m,
      useFlexGap: T
    }, S = o();
    return /* @__PURE__ */ y.jsx(i, {
      as: h,
      ownerState: E,
      ref: u,
      className: ie(S.root, C),
      ...w,
      children: p ? $y(g, p) : g
    });
  });
  return process.env.NODE_ENV !== "production" && (a.propTypes = {
    children: s.node,
    direction: s.oneOfType([s.oneOf(["column-reverse", "column", "row-reverse", "row"]), s.arrayOf(s.oneOf(["column-reverse", "column", "row-reverse", "row"])), s.object]),
    divider: s.node,
    spacing: s.oneOfType([s.arrayOf(s.oneOfType([s.number, s.string])), s.number, s.object, s.string]),
    sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
  }), a;
}
const yf = gf();
process.env.NODE_ENV !== "production" && (yf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: s.oneOfType([s.oneOf(["column-reverse", "column", "row-reverse", "row"]), s.arrayOf(s.oneOf(["column-reverse", "column", "row-reverse", "row"])), s.object]),
  /**
   * Add an element between each child.
   */
  divider: s.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: s.oneOfType([s.arrayOf(s.oneOfType([s.number, s.string])), s.number, s.object, s.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the theme's default props configuration.
   * @default false
   */
  useFlexGap: s.bool
});
const Kr = {
  black: "#000",
  white: "#fff"
}, Dy = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
}, zn = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
}, Wn = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
}, Or = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
}, Hn = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
}, qn = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
}, Gn = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
function vf() {
  return {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: "rgba(0, 0, 0, 0.87)",
      // Secondary text.
      secondary: "rgba(0, 0, 0, 0.6)",
      // Disabled text have even lower visual prominence.
      disabled: "rgba(0, 0, 0, 0.38)"
    },
    // The color used to divide different elements.
    divider: "rgba(0, 0, 0, 0.12)",
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: Kr.white,
      default: Kr.white
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: "rgba(0, 0, 0, 0.54)",
      // The color of an hovered action.
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: "rgba(0, 0, 0, 0.26)",
      // The background color of a disabled action.
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  };
}
const Ly = vf();
function bf() {
  return {
    text: {
      primary: Kr.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)"
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#121212",
      default: "#121212"
    },
    action: {
      active: Kr.white,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    }
  };
}
const yl = bf();
function vl(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Da(e.main, o) : t === "dark" && (e.dark = Ma(e.main, i)));
}
function By(e = "light") {
  return e === "dark" ? {
    main: Hn[200],
    light: Hn[50],
    dark: Hn[400]
  } : {
    main: Hn[700],
    light: Hn[400],
    dark: Hn[800]
  };
}
function Fy(e = "light") {
  return e === "dark" ? {
    main: zn[200],
    light: zn[50],
    dark: zn[400]
  } : {
    main: zn[500],
    light: zn[300],
    dark: zn[700]
  };
}
function Vy(e = "light") {
  return e === "dark" ? {
    main: Wn[500],
    light: Wn[300],
    dark: Wn[700]
  } : {
    main: Wn[700],
    light: Wn[400],
    dark: Wn[800]
  };
}
function Uy(e = "light") {
  return e === "dark" ? {
    main: qn[400],
    light: qn[300],
    dark: qn[700]
  } : {
    main: qn[700],
    light: qn[500],
    dark: qn[900]
  };
}
function zy(e = "light") {
  return e === "dark" ? {
    main: Gn[400],
    light: Gn[300],
    dark: Gn[700]
  } : {
    main: Gn[800],
    light: Gn[500],
    dark: Gn[900]
  };
}
function Wy(e = "light") {
  return e === "dark" ? {
    main: Or[400],
    light: Or[300],
    dark: Or[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Or[500],
    dark: Or[900]
  };
}
function za(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2,
    ...o
  } = e, i = e.primary || By(t), a = e.secondary || Fy(t), c = e.error || Vy(t), l = e.info || Uy(t), u = e.success || zy(t), d = e.warning || Wy(t);
  function f(p) {
    const g = sl(p, yl.text.primary) >= n ? yl.text.primary : Ly.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const C = sl(p, g);
      C < 3 && console.error([`MUI: The contrast ratio of ${C}:1 for ${g} on ${p}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return g;
  }
  const h = ({
    color: p,
    name: g,
    mainShade: C = 500,
    lightShade: T = 300,
    darkShade: w = 700
  }) => {
    if (p = {
      ...p
    }, !p.main && p[C] && (p.main = p[C]), !p.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${C}\` property.` : un(11, g ? ` (${g})` : "", C));
    if (typeof p.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(p.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : un(12, g ? ` (${g})` : "", JSON.stringify(p.main)));
    return vl(p, "light", T, r), vl(p, "dark", w, r), p.contrastText || (p.contrastText = f(p.main)), p;
  };
  let b;
  return t === "light" ? b = vf() : t === "dark" && (b = bf()), process.env.NODE_ENV !== "production" && (b || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), it({
    // A collection of common colors.
    common: {
      ...Kr
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: h({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: h({
      color: a,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: h({
      color: c,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: h({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: h({
      color: l,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: h({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: Dy,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: h,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r,
    // The light and dark mode object.
    ...b
  }, o);
}
function Hy(e) {
  const t = {};
  return Object.entries(e).forEach((r) => {
    const [o, i] = r;
    typeof i == "object" && (t[o] = `${i.fontStyle ? `${i.fontStyle} ` : ""}${i.fontVariant ? `${i.fontVariant} ` : ""}${i.fontWeight ? `${i.fontWeight} ` : ""}${i.fontStretch ? `${i.fontStretch} ` : ""}${i.fontSize || ""}${i.lineHeight ? `/${i.lineHeight} ` : ""}${i.fontFamily || ""}`);
  }), t;
}
function qy(e, t) {
  return {
    toolbar: {
      minHeight: 56,
      [e.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [e.up("sm")]: {
        minHeight: 64
      }
    },
    ...t
  };
}
function Gy(e) {
  return Math.round(e * 1e5) / 1e5;
}
const bl = {
  textTransform: "uppercase"
}, xl = '"Roboto", "Helvetica", "Arial", sans-serif';
function xf(e, t) {
  const {
    fontFamily: n = xl,
    // The default font size of the Material Specification.
    fontSize: r = 14,
    // px
    fontWeightLight: o = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: a = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: l = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: d,
    ...f
  } = typeof t == "function" ? t(e) : t;
  process.env.NODE_ENV !== "production" && (typeof r != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof l != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const h = r / 14, b = d || ((g) => `${g / l * h}rem`), m = (g, C, T, w, E) => ({
    fontFamily: n,
    fontWeight: g,
    fontSize: b(C),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: T,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...n === xl ? {
      letterSpacing: `${Gy(w / C)}em`
    } : {},
    ...E,
    ...u
  }), p = {
    h1: m(o, 96, 1.167, -1.5),
    h2: m(o, 60, 1.2, -0.5),
    h3: m(i, 48, 1.167, 0),
    h4: m(i, 34, 1.235, 0.25),
    h5: m(i, 24, 1.334, 0),
    h6: m(a, 20, 1.6, 0.15),
    subtitle1: m(i, 16, 1.75, 0.15),
    subtitle2: m(a, 14, 1.57, 0.1),
    body1: m(i, 16, 1.5, 0.15),
    body2: m(i, 14, 1.43, 0.15),
    button: m(a, 14, 1.75, 0.4, bl),
    caption: m(i, 12, 1.66, 0.4),
    overline: m(i, 12, 2.66, 1, bl),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return it({
    htmlFontSize: l,
    pxToRem: b,
    fontFamily: n,
    fontSize: r,
    fontWeightLight: o,
    fontWeightRegular: i,
    fontWeightMedium: a,
    fontWeightBold: c,
    ...p
  }, f, {
    clone: !1
    // No need to clone deep
  });
}
const Yy = 0.2, Ky = 0.14, Xy = 0.12;
function Be(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Yy})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ky})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Xy})`].join(",");
}
const Jy = ["none", Be(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), Be(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), Be(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), Be(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), Be(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), Be(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), Be(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), Be(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), Be(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), Be(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), Be(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), Be(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), Be(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), Be(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), Be(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), Be(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), Be(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), Be(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), Be(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), Be(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), Be(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), Be(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), Be(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), Be(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Zy = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Ef = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function El(e) {
  return `${Math.round(e)}ms`;
}
function Qy(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
}
function ev(e) {
  const t = {
    ...Zy,
    ...e.easing
  }, n = {
    ...Ef,
    ...e.duration
  };
  return {
    getAutoHeightDuration: Qy,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = n.standard,
        easing: c = t.easeInOut,
        delay: l = 0,
        ...u
      } = i;
      if (process.env.NODE_ENV !== "production") {
        const d = (h) => typeof h == "string", f = (h) => !Number.isNaN(parseFloat(h));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(a) && !d(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), d(c) || console.error('MUI: Argument "easing" must be a string.'), !f(l) && !d(l) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof a == "string" ? a : El(a)} ${c} ${typeof l == "string" ? l : El(l)}`).join(",");
    },
    ...e,
    easing: t,
    duration: n
  };
}
const tv = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function nv(e) {
  return Ut(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function Sf(e = {}) {
  const t = {
    ...e
  };
  function n(r) {
    const o = Object.entries(r);
    for (let i = 0; i < o.length; i++) {
      const [a, c] = o[i];
      !nv(c) || a.startsWith("unstable_") ? delete r[a] : Ut(c) && (r[a] = {
        ...c
      }, n(r[a]));
    }
  }
  return n(t), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(t, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function Js(e = {}, ...t) {
  const {
    breakpoints: n,
    mixins: r = {},
    spacing: o,
    palette: i = {},
    transitions: a = {},
    typography: c = {},
    shape: l,
    ...u
  } = e;
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : un(20));
  const d = za(i), f = mo(e);
  let h = it(f, {
    mixins: qy(f.breakpoints, r),
    palette: d,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Jy.slice(),
    typography: xf(d, c),
    transitions: ev(a),
    zIndex: {
      ...tv
    }
  });
  if (h = it(h, u), h = t.reduce((b, m) => it(b, m), h), process.env.NODE_ENV !== "production") {
    const b = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], m = (p, g) => {
      let C;
      for (C in p) {
        const T = p[C];
        if (b.includes(C) && Object.keys(T).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const w = we("", C);
            console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${C}\` internal state.`, "You can not override it like this: ", JSON.stringify(p, null, 2), "", `Instead, you need to use the '&.${w}' syntax:`, JSON.stringify({
              root: {
                [`&.${w}`]: T
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          p[C] = {};
        }
      }
    };
    Object.keys(h.components).forEach((p) => {
      const g = h.components[p].styleOverrides;
      g && p.startsWith("Mui") && m(g, p);
    });
  }
  return h.unstable_sxConfig = {
    ...ho,
    ...u == null ? void 0 : u.unstable_sxConfig
  }, h.unstable_sx = function(m) {
    return dn({
      sx: m,
      theme: this
    });
  }, h.toRuntimeSource = Sf, h;
}
function Zs(e) {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
const rv = [...Array(25)].map((e, t) => {
  if (t === 0)
    return "none";
  const n = Zs(t);
  return `linear-gradient(rgba(255 255 255 / ${n}), rgba(255 255 255 / ${n}))`;
});
function wf(e) {
  return {
    inputPlaceholder: e === "dark" ? 0.5 : 0.42,
    inputUnderline: e === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
    switchTrack: e === "dark" ? 0.3 : 0.38
  };
}
function Cf(e) {
  return e === "dark" ? rv : [];
}
function ov(e) {
  const {
    palette: t = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: n,
    overlays: r,
    ...o
  } = e, i = za(t);
  return {
    palette: i,
    opacity: {
      ...wf(i.mode),
      ...n
    },
    overlays: r || Cf(i.mode),
    ...o
  };
}
function iv(e) {
  var t;
  return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || // ends with sxConfig
  e[0] === "palette" && !!((t = e[1]) != null && t.match(/(mode|contrastThreshold|tonalOffset)/));
}
const sv = (e) => [...[...Array(25)].map((t, n) => `--${e ? `${e}-` : ""}overlays-${n}`), `--${e ? `${e}-` : ""}palette-AppBar-darkBg`, `--${e ? `${e}-` : ""}palette-AppBar-darkColor`], av = (e) => (t, n) => {
  const r = e.rootSelector || ":root", o = e.colorSchemeSelector;
  let i = o;
  if (o === "class" && (i = ".%s"), o === "data" && (i = "[data-%s]"), o != null && o.startsWith("data-") && !o.includes("%s") && (i = `[${o}="%s"]`), e.defaultColorScheme === t) {
    if (t === "dark") {
      const a = {};
      return sv(e.cssVarPrefix).forEach((c) => {
        a[c] = n[c], delete n[c];
      }), i === "media" ? {
        [r]: n,
        "@media (prefers-color-scheme: dark)": {
          [r]: a
        }
      } : i ? {
        [i.replace("%s", t)]: a,
        [`${r}, ${i.replace("%s", t)}`]: n
      } : {
        [r]: {
          ...n,
          ...a
        }
      };
    }
    if (i && i !== "media")
      return `${r}, ${i.replace("%s", String(t))}`;
  } else if (t) {
    if (i === "media")
      return {
        [`@media (prefers-color-scheme: ${String(t)})`]: {
          [r]: n
        }
      };
    if (i)
      return i.replace("%s", String(t));
  }
  return r;
};
function cv(e, t) {
  t.forEach((n) => {
    e[n] || (e[n] = {});
  });
}
function $(e, t, n) {
  !e[t] && n && (e[t] = n);
}
function $r(e) {
  return typeof e != "string" || !e.startsWith("hsl") ? e : Jd(e);
}
function Yt(e, t) {
  `${t}Channel` in e || (e[`${t}Channel`] = Ir($r(e[t]), `MUI: Can't create \`palette.${t}Channel\` because \`palette.${t}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${t}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function lv(e) {
  return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
const Ft = (e) => {
  try {
    return e();
  } catch {
  }
}, uv = (e = "mui") => Ey(e);
function Ss(e, t, n, r) {
  if (!t)
    return;
  t = t === !0 ? {} : t;
  const o = r === "dark" ? "dark" : "light";
  if (!n) {
    e[r] = ov({
      ...t,
      palette: {
        mode: o,
        ...t == null ? void 0 : t.palette
      }
    });
    return;
  }
  const {
    palette: i,
    ...a
  } = Js({
    ...n,
    palette: {
      mode: o,
      ...t == null ? void 0 : t.palette
    }
  });
  return e[r] = {
    ...t,
    palette: i,
    opacity: {
      ...wf(o),
      ...t == null ? void 0 : t.opacity
    },
    overlays: (t == null ? void 0 : t.overlays) || Cf(o)
  }, a;
}
function dv(e = {}, ...t) {
  const {
    colorSchemes: n = {
      light: !0
    },
    defaultColorScheme: r,
    disableCssColorScheme: o = !1,
    cssVarPrefix: i = "mui",
    shouldSkipGeneratingVar: a = iv,
    colorSchemeSelector: c = n.light && n.dark ? "media" : void 0,
    rootSelector: l = ":root",
    ...u
  } = e, d = Object.keys(n)[0], f = r || (n.light && d !== "light" ? "light" : d), h = uv(i), {
    [f]: b,
    light: m,
    dark: p,
    ...g
  } = n, C = {
    ...g
  };
  let T = b;
  if ((f === "dark" && !("dark" in n) || f === "light" && !("light" in n)) && (T = !0), !T)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${f}\` option is either missing or invalid.` : un(21, f));
  const w = Ss(C, T, u, f);
  m && !C.light && Ss(C, m, void 0, "light"), p && !C.dark && Ss(C, p, void 0, "dark");
  let E = {
    defaultColorScheme: f,
    ...w,
    cssVarPrefix: i,
    colorSchemeSelector: c,
    rootSelector: l,
    getCssVar: h,
    colorSchemes: C,
    font: {
      ...Hy(w.typography),
      ...w.font
    },
    spacing: lv(u.spacing)
  };
  Object.keys(E.colorSchemes).forEach((j) => {
    const x = E.colorSchemes[j].palette, P = (L) => {
      const _ = L.split("-"), V = _[1], M = _[2];
      return h(L, x[V][M]);
    };
    if (x.mode === "light" && ($(x.common, "background", "#fff"), $(x.common, "onBackground", "#000")), x.mode === "dark" && ($(x.common, "background", "#000"), $(x.common, "onBackground", "#fff")), cv(x, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), x.mode === "light") {
      $(x.Alert, "errorColor", Ae(x.error.light, 0.6)), $(x.Alert, "infoColor", Ae(x.info.light, 0.6)), $(x.Alert, "successColor", Ae(x.success.light, 0.6)), $(x.Alert, "warningColor", Ae(x.warning.light, 0.6)), $(x.Alert, "errorFilledBg", P("palette-error-main")), $(x.Alert, "infoFilledBg", P("palette-info-main")), $(x.Alert, "successFilledBg", P("palette-success-main")), $(x.Alert, "warningFilledBg", P("palette-warning-main")), $(x.Alert, "errorFilledColor", Ft(() => x.getContrastText(x.error.main))), $(x.Alert, "infoFilledColor", Ft(() => x.getContrastText(x.info.main))), $(x.Alert, "successFilledColor", Ft(() => x.getContrastText(x.success.main))), $(x.Alert, "warningFilledColor", Ft(() => x.getContrastText(x.warning.main))), $(x.Alert, "errorStandardBg", Ie(x.error.light, 0.9)), $(x.Alert, "infoStandardBg", Ie(x.info.light, 0.9)), $(x.Alert, "successStandardBg", Ie(x.success.light, 0.9)), $(x.Alert, "warningStandardBg", Ie(x.warning.light, 0.9)), $(x.Alert, "errorIconColor", P("palette-error-main")), $(x.Alert, "infoIconColor", P("palette-info-main")), $(x.Alert, "successIconColor", P("palette-success-main")), $(x.Alert, "warningIconColor", P("palette-warning-main")), $(x.AppBar, "defaultBg", P("palette-grey-100")), $(x.Avatar, "defaultBg", P("palette-grey-400")), $(x.Button, "inheritContainedBg", P("palette-grey-300")), $(x.Button, "inheritContainedHoverBg", P("palette-grey-A100")), $(x.Chip, "defaultBorder", P("palette-grey-400")), $(x.Chip, "defaultAvatarColor", P("palette-grey-700")), $(x.Chip, "defaultIconColor", P("palette-grey-700")), $(x.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), $(x.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), $(x.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), $(x.LinearProgress, "primaryBg", Ie(x.primary.main, 0.62)), $(x.LinearProgress, "secondaryBg", Ie(x.secondary.main, 0.62)), $(x.LinearProgress, "errorBg", Ie(x.error.main, 0.62)), $(x.LinearProgress, "infoBg", Ie(x.info.main, 0.62)), $(x.LinearProgress, "successBg", Ie(x.success.main, 0.62)), $(x.LinearProgress, "warningBg", Ie(x.warning.main, 0.62)), $(x.Skeleton, "bg", `rgba(${P("palette-text-primaryChannel")} / 0.11)`), $(x.Slider, "primaryTrack", Ie(x.primary.main, 0.62)), $(x.Slider, "secondaryTrack", Ie(x.secondary.main, 0.62)), $(x.Slider, "errorTrack", Ie(x.error.main, 0.62)), $(x.Slider, "infoTrack", Ie(x.info.main, 0.62)), $(x.Slider, "successTrack", Ie(x.success.main, 0.62)), $(x.Slider, "warningTrack", Ie(x.warning.main, 0.62));
      const L = Mo(x.background.default, 0.8);
      $(x.SnackbarContent, "bg", L), $(x.SnackbarContent, "color", Ft(() => x.getContrastText(L))), $(x.SpeedDialAction, "fabHoverBg", Mo(x.background.paper, 0.15)), $(x.StepConnector, "border", P("palette-grey-400")), $(x.StepContent, "border", P("palette-grey-400")), $(x.Switch, "defaultColor", P("palette-common-white")), $(x.Switch, "defaultDisabledColor", P("palette-grey-100")), $(x.Switch, "primaryDisabledColor", Ie(x.primary.main, 0.62)), $(x.Switch, "secondaryDisabledColor", Ie(x.secondary.main, 0.62)), $(x.Switch, "errorDisabledColor", Ie(x.error.main, 0.62)), $(x.Switch, "infoDisabledColor", Ie(x.info.main, 0.62)), $(x.Switch, "successDisabledColor", Ie(x.success.main, 0.62)), $(x.Switch, "warningDisabledColor", Ie(x.warning.main, 0.62)), $(x.TableCell, "border", Ie(_o(x.divider, 1), 0.88)), $(x.Tooltip, "bg", _o(x.grey[700], 0.92));
    }
    if (x.mode === "dark") {
      $(x.Alert, "errorColor", Ie(x.error.light, 0.6)), $(x.Alert, "infoColor", Ie(x.info.light, 0.6)), $(x.Alert, "successColor", Ie(x.success.light, 0.6)), $(x.Alert, "warningColor", Ie(x.warning.light, 0.6)), $(x.Alert, "errorFilledBg", P("palette-error-dark")), $(x.Alert, "infoFilledBg", P("palette-info-dark")), $(x.Alert, "successFilledBg", P("palette-success-dark")), $(x.Alert, "warningFilledBg", P("palette-warning-dark")), $(x.Alert, "errorFilledColor", Ft(() => x.getContrastText(x.error.dark))), $(x.Alert, "infoFilledColor", Ft(() => x.getContrastText(x.info.dark))), $(x.Alert, "successFilledColor", Ft(() => x.getContrastText(x.success.dark))), $(x.Alert, "warningFilledColor", Ft(() => x.getContrastText(x.warning.dark))), $(x.Alert, "errorStandardBg", Ae(x.error.light, 0.9)), $(x.Alert, "infoStandardBg", Ae(x.info.light, 0.9)), $(x.Alert, "successStandardBg", Ae(x.success.light, 0.9)), $(x.Alert, "warningStandardBg", Ae(x.warning.light, 0.9)), $(x.Alert, "errorIconColor", P("palette-error-main")), $(x.Alert, "infoIconColor", P("palette-info-main")), $(x.Alert, "successIconColor", P("palette-success-main")), $(x.Alert, "warningIconColor", P("palette-warning-main")), $(x.AppBar, "defaultBg", P("palette-grey-900")), $(x.AppBar, "darkBg", P("palette-background-paper")), $(x.AppBar, "darkColor", P("palette-text-primary")), $(x.Avatar, "defaultBg", P("palette-grey-600")), $(x.Button, "inheritContainedBg", P("palette-grey-800")), $(x.Button, "inheritContainedHoverBg", P("palette-grey-700")), $(x.Chip, "defaultBorder", P("palette-grey-700")), $(x.Chip, "defaultAvatarColor", P("palette-grey-300")), $(x.Chip, "defaultIconColor", P("palette-grey-300")), $(x.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), $(x.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), $(x.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), $(x.LinearProgress, "primaryBg", Ae(x.primary.main, 0.5)), $(x.LinearProgress, "secondaryBg", Ae(x.secondary.main, 0.5)), $(x.LinearProgress, "errorBg", Ae(x.error.main, 0.5)), $(x.LinearProgress, "infoBg", Ae(x.info.main, 0.5)), $(x.LinearProgress, "successBg", Ae(x.success.main, 0.5)), $(x.LinearProgress, "warningBg", Ae(x.warning.main, 0.5)), $(x.Skeleton, "bg", `rgba(${P("palette-text-primaryChannel")} / 0.13)`), $(x.Slider, "primaryTrack", Ae(x.primary.main, 0.5)), $(x.Slider, "secondaryTrack", Ae(x.secondary.main, 0.5)), $(x.Slider, "errorTrack", Ae(x.error.main, 0.5)), $(x.Slider, "infoTrack", Ae(x.info.main, 0.5)), $(x.Slider, "successTrack", Ae(x.success.main, 0.5)), $(x.Slider, "warningTrack", Ae(x.warning.main, 0.5));
      const L = Mo(x.background.default, 0.98);
      $(x.SnackbarContent, "bg", L), $(x.SnackbarContent, "color", Ft(() => x.getContrastText(L))), $(x.SpeedDialAction, "fabHoverBg", Mo(x.background.paper, 0.15)), $(x.StepConnector, "border", P("palette-grey-600")), $(x.StepContent, "border", P("palette-grey-600")), $(x.Switch, "defaultColor", P("palette-grey-300")), $(x.Switch, "defaultDisabledColor", P("palette-grey-600")), $(x.Switch, "primaryDisabledColor", Ae(x.primary.main, 0.55)), $(x.Switch, "secondaryDisabledColor", Ae(x.secondary.main, 0.55)), $(x.Switch, "errorDisabledColor", Ae(x.error.main, 0.55)), $(x.Switch, "infoDisabledColor", Ae(x.info.main, 0.55)), $(x.Switch, "successDisabledColor", Ae(x.success.main, 0.55)), $(x.Switch, "warningDisabledColor", Ae(x.warning.main, 0.55)), $(x.TableCell, "border", Ae(_o(x.divider, 1), 0.68)), $(x.Tooltip, "bg", _o(x.grey[700], 0.92));
    }
    Yt(x.background, "default"), Yt(x.background, "paper"), Yt(x.common, "background"), Yt(x.common, "onBackground"), Yt(x, "divider"), Object.keys(x).forEach((L) => {
      const _ = x[L];
      L !== "tonalOffset" && _ && typeof _ == "object" && (_.main && $(x[L], "mainChannel", Ir($r(_.main))), _.light && $(x[L], "lightChannel", Ir($r(_.light))), _.dark && $(x[L], "darkChannel", Ir($r(_.dark))), _.contrastText && $(x[L], "contrastTextChannel", Ir($r(_.contrastText))), L === "text" && (Yt(x[L], "primary"), Yt(x[L], "secondary")), L === "action" && (_.active && Yt(x[L], "active"), _.selected && Yt(x[L], "selected")));
    });
  }), E = t.reduce((j, x) => it(j, x), E);
  const S = {
    prefix: i,
    disableCssColorScheme: o,
    shouldSkipGeneratingVar: a,
    getSelector: av(E)
  }, {
    vars: O,
    generateThemeVars: R,
    generateStyleSheets: N
  } = Cy(E, S);
  return E.vars = O, Object.entries(E.colorSchemes[E.defaultColorScheme]).forEach(([j, x]) => {
    E[j] = x;
  }), E.generateThemeVars = R, E.generateStyleSheets = N, E.generateSpacing = function() {
    return Dd(u.spacing, Ai(this));
  }, E.getColorSchemeSelector = Ty(c), E.spacing = E.generateSpacing(), E.shouldSkipGeneratingVar = a, E.unstable_sxConfig = {
    ...ho,
    ...u == null ? void 0 : u.unstable_sxConfig
  }, E.unstable_sx = function(x) {
    return dn({
      sx: x,
      theme: this
    });
  }, E.toRuntimeSource = Sf, E;
}
function Sl(e, t, n) {
  e.colorSchemes && n && (e.colorSchemes[t] = {
    ...n !== !0 && n,
    palette: za({
      ...n === !0 ? {} : n.palette,
      mode: t
    })
    // cast type to skip module augmentation test
  });
}
function zi(e = {}, ...t) {
  const {
    palette: n,
    cssVariables: r = !1,
    colorSchemes: o = n ? void 0 : {
      light: !0
    },
    defaultColorScheme: i = n == null ? void 0 : n.mode,
    ...a
  } = e, c = i || "light", l = o == null ? void 0 : o[c], u = {
    ...o,
    ...n ? {
      [c]: {
        ...typeof l != "boolean" && l,
        palette: n
      }
    } : void 0
  };
  if (r === !1) {
    if (!("colorSchemes" in e))
      return Js(e, ...t);
    let d = n;
    "palette" in e || u[c] && (u[c] !== !0 ? d = u[c].palette : c === "dark" && (d = {
      mode: "dark"
    }));
    const f = Js({
      ...e,
      palette: d
    }, ...t);
    return f.defaultColorScheme = c, f.colorSchemes = u, f.palette.mode === "light" && (f.colorSchemes.light = {
      ...u.light !== !0 && u.light,
      palette: f.palette
    }, Sl(f, "dark", u.dark)), f.palette.mode === "dark" && (f.colorSchemes.dark = {
      ...u.dark !== !0 && u.dark,
      palette: f.palette
    }, Sl(f, "light", u.light)), f;
  }
  return !n && !("light" in u) && c === "light" && (u.light = !0), dv({
    ...a,
    colorSchemes: u,
    defaultColorScheme: c,
    ...typeof r != "boolean" && r
  }, ...t);
}
const Wa = zi();
function yn() {
  const e = Li(Wa);
  return process.env.NODE_ENV !== "production" && v.useDebugValue(e), e[At] || e;
}
function fv(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Wi = (e) => fv(e) && e !== "classes", se = Hd({
  themeId: At,
  defaultTheme: Wa,
  rootShouldForwardProp: Wi
});
function wl({
  theme: e,
  ...t
}) {
  const n = At in e ? e[At] : void 0;
  return /* @__PURE__ */ y.jsx(Yr, {
    ...t,
    themeId: n ? At : void 0,
    theme: n || e
  });
}
const _r = {
  attribute: "data-mui-color-scheme",
  colorSchemeStorageKey: "mui-color-scheme",
  defaultLightColorScheme: "light",
  defaultDarkColorScheme: "dark",
  modeStorageKey: "mui-mode"
}, pv = function(t) {
  return /* @__PURE__ */ y.jsx(hf, {
    ..._r,
    ...t
  });
}, {
  CssVarsProvider: hv,
  useColorScheme: mv,
  getInitColorSchemeScript: RO
} = xy({
  themeId: At,
  // @ts-ignore ignore module augmentation tests
  theme: () => zi({
    cssVariables: !0
  }),
  colorSchemeStorageKey: _r.colorSchemeStorageKey,
  modeStorageKey: _r.modeStorageKey,
  defaultColorScheme: {
    light: _r.defaultLightColorScheme,
    dark: _r.defaultDarkColorScheme
  },
  resolveTheme: (e) => {
    const t = {
      ...e,
      typography: xf(e.palette, e.typography)
    };
    return t.unstable_sx = function(r) {
      return dn({
        sx: r,
        theme: this
      });
    }, t;
  }
}), gv = hv;
function Tf({
  theme: e,
  ...t
}) {
  return typeof e == "function" ? /* @__PURE__ */ y.jsx(wl, {
    theme: e,
    ...t
  }) : "colorSchemes" in (At in e ? e[At] : e) ? /* @__PURE__ */ y.jsx(gv, {
    theme: e,
    ...t
  }) : /* @__PURE__ */ y.jsx(wl, {
    theme: e,
    ...t
  });
}
const Of = /* @__PURE__ */ v.createContext(null);
function Rf(e) {
  return /* @__PURE__ */ y.jsx(Ld, {
    ...e,
    defaultTheme: Wa,
    themeId: At
  });
}
process.env.NODE_ENV !== "production" && (Rf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: s.oneOfType([s.array, s.func, s.number, s.object, s.string, s.bool])
});
function kf(e) {
  return function(n) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      /* @__PURE__ */ y.jsx(Rf, {
        styles: typeof e == "function" ? (r) => e({
          theme: r,
          ...n
        }) : e
      })
    );
  };
}
function yv() {
  return Ia;
}
const Fe = my;
process.env.NODE_ENV !== "production" && (s.node, s.object.isRequired);
function Ce(e) {
  return hy(e);
}
function vv(e) {
  return we("MuiSvgIcon", e);
}
Te("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const bv = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${le(t)}`, `fontSize${le(n)}`]
  };
  return Pe(o, vv, r);
}, xv = se("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${le(n.color)}`], t[`fontSize${le(n.fontSize)}`]];
  }
})(Fe(({
  theme: e
}) => {
  var t, n, r, o, i, a, c, l, u, d, f, h, b, m;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    flexShrink: 0,
    transition: (o = (t = e.transitions) == null ? void 0 : t.create) == null ? void 0 : o.call(t, "fill", {
      duration: (r = (n = (e.vars ?? e).transitions) == null ? void 0 : n.duration) == null ? void 0 : r.shorter
    }),
    variants: [
      {
        props: (p) => !p.hasSvgAsChild,
        style: {
          // the <svg> will define the property that has `currentColor`
          // for example heroicons uses fill="none" and stroke="currentColor"
          fill: "currentColor"
        }
      },
      {
        props: {
          fontSize: "inherit"
        },
        style: {
          fontSize: "inherit"
        }
      },
      {
        props: {
          fontSize: "small"
        },
        style: {
          fontSize: ((a = (i = e.typography) == null ? void 0 : i.pxToRem) == null ? void 0 : a.call(i, 20)) || "1.25rem"
        }
      },
      {
        props: {
          fontSize: "medium"
        },
        style: {
          fontSize: ((l = (c = e.typography) == null ? void 0 : c.pxToRem) == null ? void 0 : l.call(c, 24)) || "1.5rem"
        }
      },
      {
        props: {
          fontSize: "large"
        },
        style: {
          fontSize: ((d = (u = e.typography) == null ? void 0 : u.pxToRem) == null ? void 0 : d.call(u, 35)) || "2.1875rem"
        }
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((e.vars ?? e).palette).filter(([, p]) => p && p.main).map(([p]) => {
        var g, C;
        return {
          props: {
            color: p
          },
          style: {
            color: (C = (g = (e.vars ?? e).palette) == null ? void 0 : g[p]) == null ? void 0 : C.main
          }
        };
      }),
      {
        props: {
          color: "action"
        },
        style: {
          color: (h = (f = (e.vars ?? e).palette) == null ? void 0 : f.action) == null ? void 0 : h.active
        }
      },
      {
        props: {
          color: "disabled"
        },
        style: {
          color: (m = (b = (e.vars ?? e).palette) == null ? void 0 : b.action) == null ? void 0 : m.disabled
        }
      },
      {
        props: {
          color: "inherit"
        },
        style: {
          color: void 0
        }
      }
    ]
  };
})), fi = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: a = "inherit",
    component: c = "svg",
    fontSize: l = "medium",
    htmlColor: u,
    inheritViewBox: d = !1,
    titleAccess: f,
    viewBox: h = "0 0 24 24",
    ...b
  } = r, m = /* @__PURE__ */ v.isValidElement(o) && o.type === "svg", p = {
    ...r,
    color: a,
    component: c,
    fontSize: l,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: h,
    hasSvgAsChild: m
  }, g = {};
  d || (g.viewBox = h);
  const C = bv(p);
  return /* @__PURE__ */ y.jsxs(xv, {
    as: c,
    className: ie(C.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n,
    ...g,
    ...b,
    ...m && o.props,
    ownerState: p,
    children: [m ? o.props.children : o, f ? /* @__PURE__ */ y.jsx("title", {
      children: f
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (fi.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: s.oneOfType([s.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: s.oneOfType([s.oneOf(["inherit", "large", "medium", "small"]), s.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: s.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: s.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: s.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: s.string
});
fi.muiName = "SvgIcon";
function qe(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ y.jsx(fi, {
      "data-testid": `${t}Icon`,
      ref: o,
      ...r,
      children: e
    });
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = fi.muiName, /* @__PURE__ */ v.memo(/* @__PURE__ */ v.forwardRef(n));
}
const Pf = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close");
var Ee = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cl;
function Ev() {
  if (Cl) return Ee;
  Cl = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function p(g) {
    if (typeof g == "object" && g !== null) {
      var C = g.$$typeof;
      switch (C) {
        case e:
          switch (g = g.type, g) {
            case n:
            case o:
            case r:
            case u:
            case d:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case c:
                case a:
                case l:
                case h:
                case f:
                case i:
                  return g;
                default:
                  return C;
              }
          }
        case t:
          return C;
      }
    }
  }
  return Ee.ContextConsumer = a, Ee.ContextProvider = i, Ee.Element = e, Ee.ForwardRef = l, Ee.Fragment = n, Ee.Lazy = h, Ee.Memo = f, Ee.Portal = t, Ee.Profiler = o, Ee.StrictMode = r, Ee.Suspense = u, Ee.SuspenseList = d, Ee.isAsyncMode = function() {
    return !1;
  }, Ee.isConcurrentMode = function() {
    return !1;
  }, Ee.isContextConsumer = function(g) {
    return p(g) === a;
  }, Ee.isContextProvider = function(g) {
    return p(g) === i;
  }, Ee.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === e;
  }, Ee.isForwardRef = function(g) {
    return p(g) === l;
  }, Ee.isFragment = function(g) {
    return p(g) === n;
  }, Ee.isLazy = function(g) {
    return p(g) === h;
  }, Ee.isMemo = function(g) {
    return p(g) === f;
  }, Ee.isPortal = function(g) {
    return p(g) === t;
  }, Ee.isProfiler = function(g) {
    return p(g) === o;
  }, Ee.isStrictMode = function(g) {
    return p(g) === r;
  }, Ee.isSuspense = function(g) {
    return p(g) === u;
  }, Ee.isSuspenseList = function(g) {
    return p(g) === d;
  }, Ee.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === n || g === o || g === r || g === u || g === d || g === b || typeof g == "object" && g !== null && (g.$$typeof === h || g.$$typeof === f || g.$$typeof === i || g.$$typeof === a || g.$$typeof === l || g.$$typeof === m || g.getModuleId !== void 0);
  }, Ee.typeOf = p, Ee;
}
var Se = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tl;
function Sv() {
  return Tl || (Tl = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), m = !1, p = !1, g = !1, C = !1, T = !1, w;
    w = Symbol.for("react.module.reference");
    function E(Y) {
      return !!(typeof Y == "string" || typeof Y == "function" || Y === n || Y === o || T || Y === r || Y === u || Y === d || C || Y === b || m || p || g || typeof Y == "object" && Y !== null && (Y.$$typeof === h || Y.$$typeof === f || Y.$$typeof === i || Y.$$typeof === a || Y.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      Y.$$typeof === w || Y.getModuleId !== void 0));
    }
    function S(Y) {
      if (typeof Y == "object" && Y !== null) {
        var ye = Y.$$typeof;
        switch (ye) {
          case e:
            var Me = Y.type;
            switch (Me) {
              case n:
              case o:
              case r:
              case u:
              case d:
                return Me;
              default:
                var me = Me && Me.$$typeof;
                switch (me) {
                  case c:
                  case a:
                  case l:
                  case h:
                  case f:
                  case i:
                    return me;
                  default:
                    return ye;
                }
            }
          case t:
            return ye;
        }
      }
    }
    var O = a, R = i, N = e, j = l, x = n, P = h, L = f, _ = t, V = o, M = r, D = u, W = d, H = !1, X = !1;
    function A(Y) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(Y) {
      return X || (X = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function Q(Y) {
      return S(Y) === a;
    }
    function ee(Y) {
      return S(Y) === i;
    }
    function q(Y) {
      return typeof Y == "object" && Y !== null && Y.$$typeof === e;
    }
    function K(Y) {
      return S(Y) === l;
    }
    function F(Y) {
      return S(Y) === n;
    }
    function J(Y) {
      return S(Y) === h;
    }
    function Z(Y) {
      return S(Y) === f;
    }
    function ne(Y) {
      return S(Y) === t;
    }
    function G(Y) {
      return S(Y) === o;
    }
    function re(Y) {
      return S(Y) === r;
    }
    function B(Y) {
      return S(Y) === u;
    }
    function pe(Y) {
      return S(Y) === d;
    }
    Se.ContextConsumer = O, Se.ContextProvider = R, Se.Element = N, Se.ForwardRef = j, Se.Fragment = x, Se.Lazy = P, Se.Memo = L, Se.Portal = _, Se.Profiler = V, Se.StrictMode = M, Se.Suspense = D, Se.SuspenseList = W, Se.isAsyncMode = A, Se.isConcurrentMode = U, Se.isContextConsumer = Q, Se.isContextProvider = ee, Se.isElement = q, Se.isForwardRef = K, Se.isFragment = F, Se.isLazy = J, Se.isMemo = Z, Se.isPortal = ne, Se.isProfiler = G, Se.isStrictMode = re, Se.isSuspense = B, Se.isSuspenseList = pe, Se.isValidElementType = E, Se.typeOf = S;
  }()), Se;
}
process.env.NODE_ENV === "production" ? Ev() : Sv();
function wv(e, t) {
  const n = v.useContext(e);
  if (n == null)
    throw new Error(`context "${t}" was used without a Provider`);
  return n;
}
function Cv(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function Tv(...e) {
  return v.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Cv(n, t);
    });
  }, e);
}
function Ov(e) {
  return typeof e == "string";
}
function Rv(e, t, n) {
  return e === void 0 || Ov(e) ? t : {
    ...t,
    ownerState: {
      ...t.ownerState,
      ...n
    }
  };
}
function kv(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Ol(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Pv(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = ie(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = {
      ...n == null ? void 0 : n.style,
      ...o == null ? void 0 : o.style,
      ...r == null ? void 0 : r.style
    }, p = {
      ...n,
      ...o,
      ...r
    };
    return b.length > 0 && (p.className = b), Object.keys(m).length > 0 && (p.style = m), {
      props: p,
      internalRef: void 0
    };
  }
  const a = kv({
    ...o,
    ...r
  }), c = Ol(r), l = Ol(o), u = t(a), d = ie(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = {
    ...u == null ? void 0 : u.style,
    ...n == null ? void 0 : n.style,
    ...o == null ? void 0 : o.style,
    ...r == null ? void 0 : r.style
  }, h = {
    ...u,
    ...n,
    ...l,
    ...c
  };
  return d.length > 0 && (h.className = d), Object.keys(f).length > 0 && (h.style = f), {
    props: h,
    internalRef: u.ref
  };
}
function Nv(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Nf(e) {
  var f;
  const {
    elementType: t,
    externalSlotProps: n,
    ownerState: r,
    skipResolvingSlotProps: o = !1,
    ...i
  } = e, a = o ? {} : Nv(n, r), {
    props: c,
    internalRef: l
  } = Pv({
    ...i,
    externalSlotProps: a
  }), u = Tv(l, a == null ? void 0 : a.ref, (f = e.additionalProps) == null ? void 0 : f.ref);
  return Rv(t, {
    ...c,
    ref: u
  }, r);
}
var Rl;
const kl = "Close", jf = /* @__PURE__ */ v.createContext(null);
function jv({
  notificationKey: e,
  open: t,
  message: n,
  options: r,
  badge: o
}) {
  var p, g;
  const {
    close: i
  } = wv(Of), {
    severity: a,
    actionText: c,
    onAction: l,
    autoHideDuration: u
  } = r, d = v.useCallback((C, T) => {
    T !== "clickaway" && i(e);
  }, [e, i]), f = /* @__PURE__ */ y.jsxs(v.Fragment, {
    children: [l ? /* @__PURE__ */ y.jsx(ir, {
      color: "inherit",
      size: "small",
      onClick: l,
      children: c ?? "Action"
    }) : null, /* @__PURE__ */ y.jsx(wd, {
      size: "small",
      "aria-label": kl,
      title: kl,
      color: "inherit",
      onClick: d,
      children: Rl || (Rl = /* @__PURE__ */ y.jsx(Pf, {
        fontSize: "small"
      }))
    })]
  }), h = v.useContext(jf), b = ((p = h == null ? void 0 : h.slots) == null ? void 0 : p.snackbar) ?? Hh, m = Nf({
    elementType: b,
    ownerState: h,
    externalSlotProps: (g = h == null ? void 0 : h.slotProps) == null ? void 0 : g.snackbar,
    additionalProps: {
      open: t,
      autoHideDuration: u,
      onClose: d,
      action: f
    }
  });
  return /* @__PURE__ */ y.jsx(b, {
    ...m,
    children: /* @__PURE__ */ y.jsx(Sd, {
      badgeContent: o,
      color: "primary",
      sx: {
        width: "100%"
      },
      children: a ? /* @__PURE__ */ y.jsx(qh, {
        severity: a,
        sx: {
          width: "100%"
        },
        action: f,
        children: n
      }) : /* @__PURE__ */ y.jsx(Gh, {
        message: n,
        action: f
      })
    })
  }, e);
}
function Av({
  state: e
}) {
  const t = e.queue[0] ?? null;
  return t ? /* @__PURE__ */ y.jsx(jv, {
    ...t,
    badge: e.queue.length > 1 ? String(e.queue.length) : null
  }) : null;
}
let Pl = 0;
const Iv = () => {
  const e = Pl;
  return Pl += 1, e;
};
function $v(e) {
  const {
    children: t
  } = e, [n, r] = v.useState({
    queue: []
  }), o = v.useCallback((c, l = {}) => {
    const u = l.key ?? `::toolpad-internal::notification::${Iv()}`;
    return r((d) => d.queue.some((f) => f.notificationKey === u) ? d : {
      ...d,
      queue: [...d.queue, {
        message: c,
        options: l,
        notificationKey: u,
        open: !0
      }]
    }), u;
  }, []), i = v.useCallback((c) => {
    r((l) => ({
      ...l,
      queue: l.queue.filter((u) => u.notificationKey !== c)
    }));
  }, []), a = v.useMemo(() => ({
    show: o,
    close: i
  }), [o, i]);
  return /* @__PURE__ */ y.jsx(jf.Provider, {
    value: e,
    children: /* @__PURE__ */ y.jsxs(Of.Provider, {
      value: a,
      children: [t, /* @__PURE__ */ y.jsx(Av, {
        state: n
      })]
    })
  });
}
function mt(e, t) {
  const {
    className: n,
    elementType: r,
    ownerState: o,
    externalForwardedProps: i,
    internalForwardedProps: a,
    ...c
  } = t, {
    component: l,
    slots: u = {
      [e]: void 0
    },
    slotProps: d = {
      [e]: void 0
    },
    ...f
  } = i, h = u[e] || r, b = cf(d[e], o), {
    props: {
      component: m,
      ...p
    },
    internalRef: g
  } = af({
    className: n,
    ...c,
    externalForwardedProps: e === "root" ? f : void 0,
    externalSlotProps: b
  }), C = et(g, b == null ? void 0 : b.ref, t.ref), T = e === "root" ? m || l : m, w = of(h, {
    ...e === "root" && !l && !u[e] && a,
    ...e !== "root" && !u[e] && a,
    ...p,
    ...T && {
      as: T
    },
    ref: C
  }, o);
  return [h, w];
}
function _v(e) {
  return typeof e.main == "string";
}
function Mv(e, t = []) {
  if (!_v(e))
    return !1;
  for (const n of t)
    if (!e.hasOwnProperty(n) || typeof e[n] != "string")
      return !1;
  return !0;
}
function cr(e = []) {
  return ([, t]) => t && Mv(t, e);
}
function Dv(e) {
  return we("MuiPaper", e);
}
Te("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Lv = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return Pe(i, Dv, o);
}, Bv = se("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], !n.square && t.rounded, n.variant === "elevation" && t[`elevation${n.elevation}`]];
  }
})(Fe(({
  theme: e
}) => ({
  backgroundColor: (e.vars || e).palette.background.paper,
  color: (e.vars || e).palette.text.primary,
  transition: e.transitions.create("box-shadow"),
  variants: [{
    props: ({
      ownerState: t
    }) => !t.square,
    style: {
      borderRadius: e.shape.borderRadius
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      border: `1px solid ${(e.vars || e).palette.divider}`
    }
  }, {
    props: {
      variant: "elevation"
    },
    style: {
      boxShadow: "var(--Paper-shadow)",
      backgroundImage: "var(--Paper-overlay)"
    }
  }]
}))), Hi = /* @__PURE__ */ v.forwardRef(function(t, n) {
  var b;
  const r = Ce({
    props: t,
    name: "MuiPaper"
  }), o = yn(), {
    className: i,
    component: a = "div",
    elevation: c = 1,
    square: l = !1,
    variant: u = "elevation",
    ...d
  } = r, f = {
    ...r,
    component: a,
    elevation: c,
    square: l,
    variant: u
  }, h = Lv(f);
  return process.env.NODE_ENV !== "production" && o.shadows[c] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${c}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${c}]\` is defined.`].join(`
`)), /* @__PURE__ */ y.jsx(Bv, {
    as: a,
    ownerState: f,
    className: ie(h.root, i),
    ref: n,
    ...d,
    style: {
      ...u === "elevation" && {
        "--Paper-shadow": (o.vars || o).shadows[c],
        ...o.vars && {
          "--Paper-overlay": (b = o.vars.overlays) == null ? void 0 : b[c]
        },
        ...!o.vars && o.palette.mode === "dark" && {
          "--Paper-overlay": `linear-gradient(${Ve("#fff", Zs(c))}, ${Ve("#fff", Zs(c))})`
        }
      },
      ...d.style
    }
  });
});
process.env.NODE_ENV !== "production" && (Hi.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: tn(rr, (e) => {
    const {
      elevation: t,
      variant: n
    } = e;
    return t > 0 && n === "outlined" ? new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: s.bool,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: s.oneOfType([s.oneOf(["elevation", "outlined"]), s.string])
});
class pi {
  constructor() {
    Un(this, "mountEffect", () => {
      this.shouldMount && !this.didMount && this.ref.current !== null && (this.didMount = !0, this.mounted.resolve());
    });
    this.ref = {
      current: null
    }, this.mounted = null, this.didMount = !1, this.shouldMount = !1, this.setShouldMount = null;
  }
  /** React ref to the ripple instance */
  /** If the ripple component should be mounted */
  /** Promise that resolves when the ripple component is mounted */
  /** If the ripple component has been mounted */
  /** React state hook setter */
  static create() {
    return new pi();
  }
  static use() {
    const t = tf(pi.create).current, [n, r] = v.useState(!1);
    return t.shouldMount = n, t.setShouldMount = r, v.useEffect(t.mountEffect, [n]), t;
  }
  mount() {
    return this.mounted || (this.mounted = Vv(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
  }
  /* Ripple API */
  start(...t) {
    this.mount().then(() => {
      var n;
      return (n = this.ref.current) == null ? void 0 : n.start(...t);
    });
  }
  stop(...t) {
    this.mount().then(() => {
      var n;
      return (n = this.ref.current) == null ? void 0 : n.stop(...t);
    });
  }
  pulsate(...t) {
    this.mount().then(() => {
      var n;
      return (n = this.ref.current) == null ? void 0 : n.pulsate(...t);
    });
  }
}
function Fv() {
  return pi.use();
}
function Vv() {
  let e, t;
  const n = new Promise((r, o) => {
    e = r, t = o;
  });
  return n.resolve = e, n.reject = t, n;
}
function Qs() {
  return Qs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Qs.apply(null, arguments);
}
function Af(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.includes(r)) continue;
    n[r] = e[r];
  }
  return n;
}
function ea(e, t) {
  return ea = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, r) {
    return n.__proto__ = r, n;
  }, ea(e, t);
}
function If(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, ea(e, t);
}
const Nl = {
  disabled: !1
};
var Uv = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
  enter: s.number,
  exit: s.number,
  appear: s.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && s.oneOfType([s.string, s.shape({
  enter: s.string,
  exit: s.string,
  active: s.string
}), s.shape({
  enter: s.string,
  enterDone: s.string,
  enterActive: s.string,
  exit: s.string,
  exitDone: s.string,
  exitActive: s.string
})]);
const hi = ue.createContext(null);
var zv = function(t) {
  return t.scrollTop;
}, Mr = "unmounted", En = "exited", Sn = "entering", Qn = "entered", ta = "exiting", Pt = /* @__PURE__ */ function(e) {
  If(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var a = o, c = a && !a.isMounting ? r.enter : r.appear, l;
    return i.appearStatus = null, r.in ? c ? (l = En, i.appearStatus = Sn) : l = Qn : r.unmountOnExit || r.mountOnEnter ? l = Mr : l = En, i.state = {
      status: l
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var a = o.in;
    return a && i.status === Mr ? {
      status: En
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var a = this.state.status;
      this.props.in ? a !== Sn && a !== Qn && (i = Sn) : (a === Sn || a === Qn) && (i = ta);
    }
    this.updateStatus(!1, i);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, i, a, c;
    return i = a = c = o, o != null && typeof o != "number" && (i = o.exit, a = o.enter, c = o.appear !== void 0 ? o.appear : a), {
      exit: i,
      enter: a,
      appear: c
    };
  }, n.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === Sn) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var a = this.props.nodeRef ? this.props.nodeRef.current : Io.findDOMNode(this);
          a && zv(a);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === En && this.setState({
      status: Mr
    });
  }, n.performEnter = function(o) {
    var i = this, a = this.props.enter, c = this.context ? this.context.isMounting : o, l = this.props.nodeRef ? [c] : [Io.findDOMNode(this), c], u = l[0], d = l[1], f = this.getTimeouts(), h = c ? f.appear : f.enter;
    if (!o && !a || Nl.disabled) {
      this.safeSetState({
        status: Qn
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: Sn
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(h, function() {
        i.safeSetState({
          status: Qn
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, a = this.getTimeouts(), c = this.props.nodeRef ? void 0 : Io.findDOMNode(this);
    if (!i || Nl.disabled) {
      this.safeSetState({
        status: En
      }, function() {
        o.props.onExited(c);
      });
      return;
    }
    this.props.onExit(c), this.safeSetState({
      status: ta
    }, function() {
      o.props.onExiting(c), o.onTransitionEnd(a.exit, function() {
        o.safeSetState({
          status: En
        }, function() {
          o.props.onExited(c);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(o, i) {
    i = this.setNextCallback(i), this.setState(o, i);
  }, n.setNextCallback = function(o) {
    var i = this, a = !0;
    return this.nextCallback = function(c) {
      a && (a = !1, i.nextCallback = null, o(c));
    }, this.nextCallback.cancel = function() {
      a = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var a = this.props.nodeRef ? this.props.nodeRef.current : Io.findDOMNode(this), c = o == null && !this.props.addEndListener;
    if (!a || c) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var l = this.props.nodeRef ? [this.nextCallback] : [a, this.nextCallback], u = l[0], d = l[1];
      this.props.addEndListener(u, d);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === Mr)
      return null;
    var i = this.props, a = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var c = Af(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ ue.createElement(hi.Provider, {
        value: null
      }, typeof a == "function" ? a(o, c) : ue.cloneElement(ue.Children.only(a), c))
    );
  }, t;
}(ue.Component);
Pt.contextType = hi;
Pt.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: s.shape({
    current: typeof Element > "u" ? s.any : function(e, t, n, r, o, i) {
      var a = e[t];
      return s.instanceOf(a && "ownerDocument" in a ? a.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, i);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: s.oneOfType([s.func.isRequired, s.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: s.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: s.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: s.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: s.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: s.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: s.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function(t) {
    var n = Uv;
    t.addEndListener || (n = n.isRequired);
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
      o[i - 1] = arguments[i];
    return n.apply(void 0, [t].concat(o));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: s.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: s.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: s.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: s.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: s.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: s.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: s.func
} : {};
function Yn() {
}
Pt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Yn,
  onEntering: Yn,
  onEntered: Yn,
  onExit: Yn,
  onExiting: Yn,
  onExited: Yn
};
Pt.UNMOUNTED = Mr;
Pt.EXITED = En;
Pt.ENTERING = Sn;
Pt.ENTERED = Qn;
Pt.EXITING = ta;
function Wv(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ha(e, t) {
  var n = function(i) {
    return t && Br(i) ? t(i) : i;
  }, r = /* @__PURE__ */ Object.create(null);
  return e && Fh.map(e, function(o) {
    return o;
  }).forEach(function(o) {
    r[o.key] = n(o);
  }), r;
}
function Hv(e, t) {
  e = e || {}, t = t || {};
  function n(d) {
    return d in t ? t[d] : e[d];
  }
  var r = /* @__PURE__ */ Object.create(null), o = [];
  for (var i in e)
    i in t ? o.length && (r[i] = o, o = []) : o.push(i);
  var a, c = {};
  for (var l in t) {
    if (r[l])
      for (a = 0; a < r[l].length; a++) {
        var u = r[l][a];
        c[r[l][a]] = n(u);
      }
    c[l] = n(l);
  }
  for (a = 0; a < o.length; a++)
    c[o[a]] = n(o[a]);
  return c;
}
function On(e, t, n) {
  return n[t] != null ? n[t] : e.props[t];
}
function qv(e, t) {
  return Ha(e.children, function(n) {
    return Fr(n, {
      onExited: t.bind(null, n),
      in: !0,
      appear: On(n, "appear", e),
      enter: On(n, "enter", e),
      exit: On(n, "exit", e)
    });
  });
}
function Gv(e, t, n) {
  var r = Ha(e.children), o = Hv(t, r);
  return Object.keys(o).forEach(function(i) {
    var a = o[i];
    if (Br(a)) {
      var c = i in t, l = i in r, u = t[i], d = Br(u) && !u.props.in;
      l && (!c || d) ? o[i] = Fr(a, {
        onExited: n.bind(null, a),
        in: !0,
        exit: On(a, "exit", e),
        enter: On(a, "enter", e)
      }) : !l && c && !d ? o[i] = Fr(a, {
        in: !1
      }) : l && c && Br(u) && (o[i] = Fr(a, {
        onExited: n.bind(null, a),
        in: u.props.in,
        exit: On(a, "exit", e),
        enter: On(a, "enter", e)
      }));
    }
  }), o;
}
var Yv = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, Kv = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, qa = /* @__PURE__ */ function(e) {
  If(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var a = i.handleExited.bind(Wv(i));
    return i.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: a,
      firstRender: !0
    }, i;
  }
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, n.componentWillUnmount = function() {
    this.mounted = !1;
  }, t.getDerivedStateFromProps = function(o, i) {
    var a = i.children, c = i.handleExited, l = i.firstRender;
    return {
      children: l ? qv(o, c) : Gv(o, a, c),
      firstRender: !1
    };
  }, n.handleExited = function(o, i) {
    var a = Ha(this.props.children);
    o.key in a || (o.props.onExited && o.props.onExited(i), this.mounted && this.setState(function(c) {
      var l = Qs({}, c.children);
      return delete l[o.key], {
        children: l
      };
    }));
  }, n.render = function() {
    var o = this.props, i = o.component, a = o.childFactory, c = Af(o, ["component", "childFactory"]), l = this.state.contextValue, u = Yv(this.state.children).map(a);
    return delete c.appear, delete c.enter, delete c.exit, i === null ? /* @__PURE__ */ ue.createElement(hi.Provider, {
      value: l
    }, u) : /* @__PURE__ */ ue.createElement(hi.Provider, {
      value: l
    }, /* @__PURE__ */ ue.createElement(i, c, u));
  }, t;
}(ue.Component);
qa.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: s.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: s.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: s.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: s.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: s.bool,
  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: s.func
} : {};
qa.defaultProps = Kv;
function $f(e) {
  const {
    className: t,
    classes: n,
    pulsate: r = !1,
    rippleX: o,
    rippleY: i,
    rippleSize: a,
    in: c,
    onExited: l,
    timeout: u
  } = e, [d, f] = v.useState(!1), h = ie(t, n.ripple, n.rippleVisible, r && n.ripplePulsate), b = {
    width: a,
    height: a,
    top: -(a / 2) + i,
    left: -(a / 2) + o
  }, m = ie(n.child, d && n.childLeaving, r && n.childPulsate);
  return !c && !d && f(!0), v.useEffect(() => {
    if (!c && l != null) {
      const p = setTimeout(l, u);
      return () => {
        clearTimeout(p);
      };
    }
  }, [l, c, u]), /* @__PURE__ */ y.jsx("span", {
    className: h,
    style: b,
    children: /* @__PURE__ */ y.jsx("span", {
      className: m
    })
  });
}
process.env.NODE_ENV !== "production" && ($f.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object.isRequired,
  className: s.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: s.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: s.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: s.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: s.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: s.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: s.number,
  /**
   * exit delay
   */
  timeout: s.number.isRequired
});
const Et = Te("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), na = 550, Xv = 80, Jv = Ca`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, Zv = Ca`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, Qv = Ca`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, eb = se("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
}), tb = se($f, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${Et.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${Jv};
    animation-duration: ${na}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  &.${Et.ripplePulsate} {
    animation-duration: ${({
  theme: e
}) => e.transitions.duration.shorter}ms;
  }

  & .${Et.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${Et.childLeaving} {
    opacity: 0;
    animation-name: ${Zv};
    animation-duration: ${na}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  & .${Et.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${Qv};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, _f = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiTouchRipple"
  }), {
    center: o = !1,
    classes: i = {},
    className: a,
    ...c
  } = r, [l, u] = v.useState([]), d = v.useRef(0), f = v.useRef(null);
  v.useEffect(() => {
    f.current && (f.current(), f.current = null);
  }, [l]);
  const h = v.useRef(!1), b = Tn(), m = v.useRef(null), p = v.useRef(null), g = v.useCallback((E) => {
    const {
      pulsate: S,
      rippleX: O,
      rippleY: R,
      rippleSize: N,
      cb: j
    } = E;
    u((x) => [...x, /* @__PURE__ */ y.jsx(tb, {
      classes: {
        ripple: ie(i.ripple, Et.ripple),
        rippleVisible: ie(i.rippleVisible, Et.rippleVisible),
        ripplePulsate: ie(i.ripplePulsate, Et.ripplePulsate),
        child: ie(i.child, Et.child),
        childLeaving: ie(i.childLeaving, Et.childLeaving),
        childPulsate: ie(i.childPulsate, Et.childPulsate)
      },
      timeout: na,
      pulsate: S,
      rippleX: O,
      rippleY: R,
      rippleSize: N
    }, d.current)]), d.current += 1, f.current = j;
  }, [i]), C = v.useCallback((E = {}, S = {}, O = () => {
  }) => {
    const {
      pulsate: R = !1,
      center: N = o || S.pulsate,
      fakeElement: j = !1
      // For test purposes
    } = S;
    if ((E == null ? void 0 : E.type) === "mousedown" && h.current) {
      h.current = !1;
      return;
    }
    (E == null ? void 0 : E.type) === "touchstart" && (h.current = !0);
    const x = j ? null : p.current, P = x ? x.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let L, _, V;
    if (N || E === void 0 || E.clientX === 0 && E.clientY === 0 || !E.clientX && !E.touches)
      L = Math.round(P.width / 2), _ = Math.round(P.height / 2);
    else {
      const {
        clientX: M,
        clientY: D
      } = E.touches && E.touches.length > 0 ? E.touches[0] : E;
      L = Math.round(M - P.left), _ = Math.round(D - P.top);
    }
    if (N)
      V = Math.sqrt((2 * P.width ** 2 + P.height ** 2) / 3), V % 2 === 0 && (V += 1);
    else {
      const M = Math.max(Math.abs((x ? x.clientWidth : 0) - L), L) * 2 + 2, D = Math.max(Math.abs((x ? x.clientHeight : 0) - _), _) * 2 + 2;
      V = Math.sqrt(M ** 2 + D ** 2);
    }
    E != null && E.touches ? m.current === null && (m.current = () => {
      g({
        pulsate: R,
        rippleX: L,
        rippleY: _,
        rippleSize: V,
        cb: O
      });
    }, b.start(Xv, () => {
      m.current && (m.current(), m.current = null);
    })) : g({
      pulsate: R,
      rippleX: L,
      rippleY: _,
      rippleSize: V,
      cb: O
    });
  }, [o, g, b]), T = v.useCallback(() => {
    C({}, {
      pulsate: !0
    });
  }, [C]), w = v.useCallback((E, S) => {
    if (b.clear(), (E == null ? void 0 : E.type) === "touchend" && m.current) {
      m.current(), m.current = null, b.start(0, () => {
        w(E, S);
      });
      return;
    }
    m.current = null, u((O) => O.length > 0 ? O.slice(1) : O), f.current = S;
  }, [b]);
  return v.useImperativeHandle(n, () => ({
    pulsate: T,
    start: C,
    stop: w
  }), [T, C, w]), /* @__PURE__ */ y.jsx(eb, {
    className: ie(Et.root, i.root, a),
    ref: p,
    ...c,
    children: /* @__PURE__ */ y.jsx(qa, {
      component: null,
      exit: !0,
      children: l
    })
  });
});
process.env.NODE_ENV !== "production" && (_f.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: s.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string
});
function nb(e) {
  return we("MuiButtonBase", e);
}
const rb = Te("MuiButtonBase", ["root", "disabled", "focusVisible"]), ob = (e) => {
  const {
    disabled: t,
    focusVisible: n,
    focusVisibleClassName: r,
    classes: o
  } = e, a = Pe({
    root: ["root", t && "disabled", n && "focusVisible"]
  }, nb, o);
  return n && r && (a.root += ` ${r}`), a;
}, ib = se("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  textDecoration: "none",
  // So we take precedent over the style of a native <a /> element.
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
    // Remove Firefox dotted outline.
  },
  [`&.${rb.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), yo = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiButtonBase"
  }), {
    action: o,
    centerRipple: i = !1,
    children: a,
    className: c,
    component: l = "button",
    disabled: u = !1,
    disableRipple: d = !1,
    disableTouchRipple: f = !1,
    focusRipple: h = !1,
    focusVisibleClassName: b,
    LinkComponent: m = "a",
    onBlur: p,
    onClick: g,
    onContextMenu: C,
    onDragLeave: T,
    onFocus: w,
    onFocusVisible: E,
    onKeyDown: S,
    onKeyUp: O,
    onMouseDown: R,
    onMouseLeave: N,
    onMouseUp: j,
    onTouchEnd: x,
    onTouchMove: P,
    onTouchStart: L,
    tabIndex: _ = 0,
    TouchRippleProps: V,
    touchRippleRef: M,
    type: D,
    ...W
  } = r, H = v.useRef(null), X = Fv(), A = et(X.ref, M), [U, Q] = v.useState(!1);
  u && U && Q(!1), v.useImperativeHandle(o, () => ({
    focusVisible: () => {
      Q(!0), H.current.focus();
    }
  }), []);
  const ee = X.shouldMount && !d && !u;
  v.useEffect(() => {
    U && h && !d && X.pulsate();
  }, [d, h, U, X]);
  const q = Kt(X, "start", R, f), K = Kt(X, "stop", C, f), F = Kt(X, "stop", T, f), J = Kt(X, "stop", j, f), Z = Kt(X, "stop", (oe) => {
    U && oe.preventDefault(), N && N(oe);
  }, f), ne = Kt(X, "start", L, f), G = Kt(X, "stop", x, f), re = Kt(X, "stop", P, f), B = Kt(X, "stop", (oe) => {
    ar(oe.target) || Q(!1), p && p(oe);
  }, !1), pe = ln((oe) => {
    H.current || (H.current = oe.currentTarget), ar(oe.target) && (Q(!0), E && E(oe)), w && w(oe);
  }), Y = () => {
    const oe = H.current;
    return l && l !== "button" && !(oe.tagName === "A" && oe.href);
  }, ye = ln((oe) => {
    h && !oe.repeat && U && oe.key === " " && X.stop(oe, () => {
      X.start(oe);
    }), oe.target === oe.currentTarget && Y() && oe.key === " " && oe.preventDefault(), S && S(oe), oe.target === oe.currentTarget && Y() && oe.key === "Enter" && !u && (oe.preventDefault(), g && g(oe));
  }), Me = ln((oe) => {
    h && oe.key === " " && U && !oe.defaultPrevented && X.stop(oe, () => {
      X.pulsate(oe);
    }), O && O(oe), g && oe.target === oe.currentTarget && Y() && oe.key === " " && !oe.defaultPrevented && g(oe);
  });
  let me = l;
  me === "button" && (W.href || W.to) && (me = m);
  const De = {};
  me === "button" ? (De.type = D === void 0 ? "button" : D, De.disabled = u) : (!W.href && !W.to && (De.role = "button"), u && (De["aria-disabled"] = u));
  const Le = et(n, H), Xe = {
    ...r,
    centerRipple: i,
    component: l,
    disabled: u,
    disableRipple: d,
    disableTouchRipple: f,
    focusRipple: h,
    tabIndex: _,
    focusVisible: U
  }, $e = ob(Xe);
  return /* @__PURE__ */ y.jsxs(ib, {
    as: me,
    className: ie($e.root, c),
    ownerState: Xe,
    onBlur: B,
    onClick: g,
    onContextMenu: K,
    onFocus: pe,
    onKeyDown: ye,
    onKeyUp: Me,
    onMouseDown: q,
    onMouseLeave: Z,
    onMouseUp: J,
    onDragLeave: F,
    onTouchEnd: G,
    onTouchMove: re,
    onTouchStart: ne,
    ref: Le,
    tabIndex: u ? -1 : _,
    type: D,
    ...De,
    ...W,
    children: [a, ee ? /* @__PURE__ */ y.jsx(_f, {
      ref: A,
      center: i,
      ...V
    }) : null]
  });
});
function Kt(e, t, n, r = !1) {
  return ln((o) => (n && n(o), r || e[t](o), !0));
}
process.env.NODE_ENV !== "production" && (yo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: Vi,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: s.bool,
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: go,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: s.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: s.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: s.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: s.string,
  /**
   * @ignore
   */
  href: s.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: s.elementType,
  /**
   * @ignore
   */
  onBlur: s.func,
  /**
   * @ignore
   */
  onClick: s.func,
  /**
   * @ignore
   */
  onContextMenu: s.func,
  /**
   * @ignore
   */
  onDragLeave: s.func,
  /**
   * @ignore
   */
  onFocus: s.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: s.func,
  /**
   * @ignore
   */
  onKeyDown: s.func,
  /**
   * @ignore
   */
  onKeyUp: s.func,
  /**
   * @ignore
   */
  onMouseDown: s.func,
  /**
   * @ignore
   */
  onMouseLeave: s.func,
  /**
   * @ignore
   */
  onMouseUp: s.func,
  /**
   * @ignore
   */
  onTouchEnd: s.func,
  /**
   * @ignore
   */
  onTouchMove: s.func,
  /**
   * @ignore
   */
  onTouchStart: s.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * @default 0
   */
  tabIndex: s.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: s.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: s.oneOfType([s.func, s.shape({
    current: s.shape({
      pulsate: s.func.isRequired,
      start: s.func.isRequired,
      stop: s.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  type: s.oneOfType([s.oneOf(["button", "reset", "submit"]), s.string])
});
function sb(e) {
  return we("MuiIconButton", e);
}
const ab = Te("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge"]), cb = (e) => {
  const {
    classes: t,
    disabled: n,
    color: r,
    edge: o,
    size: i
  } = e, a = {
    root: ["root", n && "disabled", r !== "default" && `color${le(r)}`, o && `edge${le(o)}`, `size${le(i)}`]
  };
  return Pe(a, sb, t);
}, lb = se(yo, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "default" && t[`color${le(n.color)}`], n.edge && t[`edge${le(n.edge)}`], t[`size${le(n.size)}`]];
  }
})(Fe(({
  theme: e
}) => ({
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: e.typography.pxToRem(24),
  padding: 8,
  borderRadius: "50%",
  color: (e.vars || e).palette.action.active,
  transition: e.transitions.create("background-color", {
    duration: e.transitions.duration.shortest
  }),
  variants: [{
    props: (t) => !t.disableRipple,
    style: {
      "--IconButton-hoverBg": e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Ve(e.palette.action.active, e.palette.action.hoverOpacity),
      "&:hover": {
        backgroundColor: "var(--IconButton-hoverBg)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }, {
    props: {
      edge: "start"
    },
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: "start",
      size: "small"
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: {
      edge: "end"
    },
    style: {
      marginRight: -12
    }
  }, {
    props: {
      edge: "end",
      size: "small"
    },
    style: {
      marginRight: -3
    }
  }]
})), Fe(({
  theme: e
}) => ({
  variants: [{
    props: {
      color: "inherit"
    },
    style: {
      color: "inherit"
    }
  }, ...Object.entries(e.palette).filter(cr()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  })), ...Object.entries(e.palette).filter(cr()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      "--IconButton-hoverBg": e.vars ? `rgba(${(e.vars || e).palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Ve((e.vars || e).palette[t].main, e.palette.action.hoverOpacity)
    }
  })), {
    props: {
      size: "small"
    },
    style: {
      padding: 5,
      fontSize: e.typography.pxToRem(18)
    }
  }, {
    props: {
      size: "large"
    },
    style: {
      padding: 12,
      fontSize: e.typography.pxToRem(28)
    }
  }],
  [`&.${ab.disabled}`]: {
    backgroundColor: "transparent",
    color: (e.vars || e).palette.action.disabled
  }
}))), Xr = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiIconButton"
  }), {
    edge: o = !1,
    children: i,
    className: a,
    color: c = "default",
    disabled: l = !1,
    disableFocusRipple: u = !1,
    size: d = "medium",
    ...f
  } = r, h = {
    ...r,
    edge: o,
    color: c,
    disabled: l,
    disableFocusRipple: u,
    size: d
  }, b = cb(h);
  return /* @__PURE__ */ y.jsx(lb, {
    className: ie(b.root, a),
    centerRipple: !0,
    focusRipple: !u,
    disabled: l,
    ref: n,
    ...f,
    ownerState: h,
    children: i
  });
});
process.env.NODE_ENV !== "production" && (Xr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The icon to display.
   */
  children: tn(s.node, (e) => v.Children.toArray(e.children).some((n) => /* @__PURE__ */ v.isValidElement(n) && n.props.onClick) ? new Error(["MUI: You are providing an onClick event listener to a child of a button element.", "Prefer applying it to the IconButton directly.", "This guarantees that the whole <button> will be responsive to click events."].join(`
`)) : null),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: s.oneOfType([s.oneOf(["inherit", "default", "primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: s.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: s.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: s.oneOf(["end", "start", !1]),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: s.oneOfType([s.oneOf(["small", "medium", "large"]), s.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
function ub(e) {
  return we("MuiTypography", e);
}
const jl = Te("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]), db = {
  primary: !0,
  secondary: !0,
  error: !0,
  info: !0,
  success: !0,
  warning: !0,
  textPrimary: !0,
  textSecondary: !0,
  textDisabled: !0
}, fb = yv(), pb = (e) => {
  const {
    align: t,
    gutterBottom: n,
    noWrap: r,
    paragraph: o,
    variant: i,
    classes: a
  } = e, c = {
    root: ["root", i, e.align !== "inherit" && `align${le(t)}`, n && "gutterBottom", r && "noWrap", o && "paragraph"]
  };
  return Pe(c, ub, a);
}, hb = se("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.variant && t[n.variant], n.align !== "inherit" && t[`align${le(n.align)}`], n.noWrap && t.noWrap, n.gutterBottom && t.gutterBottom, n.paragraph && t.paragraph];
  }
})(Fe(({
  theme: e
}) => {
  var t;
  return {
    margin: 0,
    variants: [{
      props: {
        variant: "inherit"
      },
      style: {
        // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
        font: "inherit",
        lineHeight: "inherit",
        letterSpacing: "inherit"
      }
    }, ...Object.entries(e.typography).filter(([n, r]) => n !== "inherit" && r && typeof r == "object").map(([n, r]) => ({
      props: {
        variant: n
      },
      style: r
    })), ...Object.entries(e.palette).filter(cr()).map(([n]) => ({
      props: {
        color: n
      },
      style: {
        color: (e.vars || e).palette[n].main
      }
    })), ...Object.entries(((t = e.palette) == null ? void 0 : t.text) || {}).filter(([, n]) => typeof n == "string").map(([n]) => ({
      props: {
        color: `text${le(n)}`
      },
      style: {
        color: (e.vars || e).palette.text[n]
      }
    })), {
      props: ({
        ownerState: n
      }) => n.align !== "inherit",
      style: {
        textAlign: "var(--Typography-textAlign)"
      }
    }, {
      props: ({
        ownerState: n
      }) => n.noWrap,
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, {
      props: ({
        ownerState: n
      }) => n.gutterBottom,
      style: {
        marginBottom: "0.35em"
      }
    }, {
      props: ({
        ownerState: n
      }) => n.paragraph,
      style: {
        marginBottom: 16
      }
    }]
  };
})), Al = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
}, wt = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    color: r,
    ...o
  } = Ce({
    props: t,
    name: "MuiTypography"
  }), i = !db[r], a = fb({
    ...o,
    ...i && {
      color: r
    }
  }), {
    align: c = "inherit",
    className: l,
    component: u,
    gutterBottom: d = !1,
    noWrap: f = !1,
    paragraph: h = !1,
    variant: b = "body1",
    variantMapping: m = Al,
    ...p
  } = a, g = {
    ...a,
    align: c,
    color: r,
    className: l,
    component: u,
    gutterBottom: d,
    noWrap: f,
    paragraph: h,
    variant: b,
    variantMapping: m
  }, C = u || (h ? "p" : m[b] || Al[b]) || "span", T = pb(g);
  return /* @__PURE__ */ y.jsx(hb, {
    as: C,
    ref: n,
    className: ie(T.root, l),
    ...p,
    ownerState: g,
    style: {
      ...c !== "inherit" && {
        "--Typography-textAlign": c
      },
      ...p.style
    }
  });
});
process.env.NODE_ENV !== "production" && (wt.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: s.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: s.oneOfType([s.oneOf(["primary", "secondary", "success", "error", "info", "warning", "textPrimary", "textSecondary", "textDisabled"]), s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: s.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: s.bool,
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   * @deprecated Use the `component` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  paragraph: s.bool,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: s.oneOfType([s.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), s.string]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: s.object
});
var lt = "top", Ot = "bottom", Rt = "right", ut = "left", Ga = "auto", vo = [lt, Ot, Rt, ut], lr = "start", Jr = "end", mb = "clippingParents", Mf = "viewport", Rr = "popper", gb = "reference", Il = /* @__PURE__ */ vo.reduce(function(e, t) {
  return e.concat([t + "-" + lr, t + "-" + Jr]);
}, []), Df = /* @__PURE__ */ [].concat(vo, [Ga]).reduce(function(e, t) {
  return e.concat([t, t + "-" + lr, t + "-" + Jr]);
}, []), yb = "beforeRead", vb = "read", bb = "afterRead", xb = "beforeMain", Eb = "main", Sb = "afterMain", wb = "beforeWrite", Cb = "write", Tb = "afterWrite", Ob = [yb, vb, bb, xb, Eb, Sb, wb, Cb, Tb];
function Ht(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function vt(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function $n(e) {
  var t = vt(e).Element;
  return e instanceof t || e instanceof Element;
}
function Tt(e) {
  var t = vt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ya(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = vt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Rb(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Tt(i) || !Ht(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(a) {
      var c = o[a];
      c === !1 ? i.removeAttribute(a) : i.setAttribute(a, c === !0 ? "" : c);
    }));
  });
}
function kb(e) {
  var t = e.state, n = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var o = t.elements[r], i = t.attributes[r] || {}, a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), c = a.reduce(function(l, u) {
        return l[u] = "", l;
      }, {});
      !Tt(o) || !Ht(o) || (Object.assign(o.style, c), Object.keys(i).forEach(function(l) {
        o.removeAttribute(l);
      }));
    });
  };
}
const Pb = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Rb,
  effect: kb,
  requires: ["computeStyles"]
};
function zt(e) {
  return e.split("-")[0];
}
var kn = Math.max, mi = Math.min, ur = Math.round;
function ra() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Lf() {
  return !/^((?!chrome|android).)*safari/i.test(ra());
}
function dr(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Tt(e) && (o = e.offsetWidth > 0 && ur(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && ur(r.height) / e.offsetHeight || 1);
  var a = $n(e) ? vt(e) : window, c = a.visualViewport, l = !Lf() && n, u = (r.left + (l && c ? c.offsetLeft : 0)) / o, d = (r.top + (l && c ? c.offsetTop : 0)) / i, f = r.width / o, h = r.height / i;
  return {
    width: f,
    height: h,
    top: d,
    right: u + f,
    bottom: d + h,
    left: u,
    x: u,
    y: d
  };
}
function Ka(e) {
  var t = dr(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Bf(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Ya(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function en(e) {
  return vt(e).getComputedStyle(e);
}
function Nb(e) {
  return ["table", "td", "th"].indexOf(Ht(e)) >= 0;
}
function vn(e) {
  return (($n(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function qi(e) {
  return Ht(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Ya(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    vn(e)
  );
}
function $l(e) {
  return !Tt(e) || // https://github.com/popperjs/popper-core/issues/837
  en(e).position === "fixed" ? null : e.offsetParent;
}
function jb(e) {
  var t = /firefox/i.test(ra()), n = /Trident/i.test(ra());
  if (n && Tt(e)) {
    var r = en(e);
    if (r.position === "fixed")
      return null;
  }
  var o = qi(e);
  for (Ya(o) && (o = o.host); Tt(o) && ["html", "body"].indexOf(Ht(o)) < 0; ) {
    var i = en(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function bo(e) {
  for (var t = vt(e), n = $l(e); n && Nb(n) && en(n).position === "static"; )
    n = $l(n);
  return n && (Ht(n) === "html" || Ht(n) === "body" && en(n).position === "static") ? t : n || jb(e) || t;
}
function Xa(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function zr(e, t, n) {
  return kn(e, mi(t, n));
}
function Ab(e, t, n) {
  var r = zr(e, t, n);
  return r > n ? n : r;
}
function Ff() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Vf(e) {
  return Object.assign({}, Ff(), e);
}
function Uf(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Ib = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Vf(typeof t != "number" ? t : Uf(t, vo));
};
function $b(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, a = n.modifiersData.popperOffsets, c = zt(n.placement), l = Xa(c), u = [ut, Rt].indexOf(c) >= 0, d = u ? "height" : "width";
  if (!(!i || !a)) {
    var f = Ib(o.padding, n), h = Ka(i), b = l === "y" ? lt : ut, m = l === "y" ? Ot : Rt, p = n.rects.reference[d] + n.rects.reference[l] - a[l] - n.rects.popper[d], g = a[l] - n.rects.reference[l], C = bo(i), T = C ? l === "y" ? C.clientHeight || 0 : C.clientWidth || 0 : 0, w = p / 2 - g / 2, E = f[b], S = T - h[d] - f[m], O = T / 2 - h[d] / 2 + w, R = zr(E, O, S), N = l;
    n.modifiersData[r] = (t = {}, t[N] = R, t.centerOffset = R - O, t);
  }
}
function _b(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Bf(t.elements.popper, o) && (t.elements.arrow = o));
}
const Mb = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: $b,
  effect: _b,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function fr(e) {
  return e.split("-")[1];
}
var Db = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Lb(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: ur(n * o) / o || 0,
    y: ur(r * o) / o || 0
  };
}
function _l(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, a = e.offsets, c = e.position, l = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, f = e.isFixed, h = a.x, b = h === void 0 ? 0 : h, m = a.y, p = m === void 0 ? 0 : m, g = typeof d == "function" ? d({
    x: b,
    y: p
  }) : {
    x: b,
    y: p
  };
  b = g.x, p = g.y;
  var C = a.hasOwnProperty("x"), T = a.hasOwnProperty("y"), w = ut, E = lt, S = window;
  if (u) {
    var O = bo(n), R = "clientHeight", N = "clientWidth";
    if (O === vt(n) && (O = vn(n), en(O).position !== "static" && c === "absolute" && (R = "scrollHeight", N = "scrollWidth")), O = O, o === lt || (o === ut || o === Rt) && i === Jr) {
      E = Ot;
      var j = f && O === S && S.visualViewport ? S.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        O[R]
      );
      p -= j - r.height, p *= l ? 1 : -1;
    }
    if (o === ut || (o === lt || o === Ot) && i === Jr) {
      w = Rt;
      var x = f && O === S && S.visualViewport ? S.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        O[N]
      );
      b -= x - r.width, b *= l ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: c
  }, u && Db), L = d === !0 ? Lb({
    x: b,
    y: p
  }, vt(n)) : {
    x: b,
    y: p
  };
  if (b = L.x, p = L.y, l) {
    var _;
    return Object.assign({}, P, (_ = {}, _[E] = T ? "0" : "", _[w] = C ? "0" : "", _.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + p + "px)" : "translate3d(" + b + "px, " + p + "px, 0)", _));
  }
  return Object.assign({}, P, (t = {}, t[E] = T ? p + "px" : "", t[w] = C ? b + "px" : "", t.transform = "", t));
}
function Bb(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, a = i === void 0 ? !0 : i, c = n.roundOffsets, l = c === void 0 ? !0 : c, u = {
    placement: zt(t.placement),
    variation: fr(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, _l(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, _l(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Fb = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Bb,
  data: {}
};
var Do = {
  passive: !0
};
function Vb(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, a = r.resize, c = a === void 0 ? !0 : a, l = vt(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, Do);
  }), c && l.addEventListener("resize", n.update, Do), function() {
    i && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, Do);
    }), c && l.removeEventListener("resize", n.update, Do);
  };
}
const Ub = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Vb,
  data: {}
};
var zb = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Zo(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return zb[t];
  });
}
var Wb = {
  start: "end",
  end: "start"
};
function Ml(e) {
  return e.replace(/start|end/g, function(t) {
    return Wb[t];
  });
}
function Ja(e) {
  var t = vt(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Za(e) {
  return dr(vn(e)).left + Ja(e).scrollLeft;
}
function Hb(e, t) {
  var n = vt(e), r = vn(e), o = n.visualViewport, i = r.clientWidth, a = r.clientHeight, c = 0, l = 0;
  if (o) {
    i = o.width, a = o.height;
    var u = Lf();
    (u || !u && t === "fixed") && (c = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: c + Za(e),
    y: l
  };
}
function qb(e) {
  var t, n = vn(e), r = Ja(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = kn(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = kn(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), c = -r.scrollLeft + Za(e), l = -r.scrollTop;
  return en(o || n).direction === "rtl" && (c += kn(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function Qa(e) {
  var t = en(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function zf(e) {
  return ["html", "body", "#document"].indexOf(Ht(e)) >= 0 ? e.ownerDocument.body : Tt(e) && Qa(e) ? e : zf(qi(e));
}
function Wr(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = zf(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = vt(r), a = o ? [i].concat(i.visualViewport || [], Qa(r) ? r : []) : r, c = t.concat(a);
  return o ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(Wr(qi(a)))
  );
}
function oa(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Gb(e, t) {
  var n = dr(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Dl(e, t, n) {
  return t === Mf ? oa(Hb(e, n)) : $n(t) ? Gb(t, n) : oa(qb(vn(e)));
}
function Yb(e) {
  var t = Wr(qi(e)), n = ["absolute", "fixed"].indexOf(en(e).position) >= 0, r = n && Tt(e) ? bo(e) : e;
  return $n(r) ? t.filter(function(o) {
    return $n(o) && Bf(o, r) && Ht(o) !== "body";
  }) : [];
}
function Kb(e, t, n, r) {
  var o = t === "clippingParents" ? Yb(e) : [].concat(t), i = [].concat(o, [n]), a = i[0], c = i.reduce(function(l, u) {
    var d = Dl(e, u, r);
    return l.top = kn(d.top, l.top), l.right = mi(d.right, l.right), l.bottom = mi(d.bottom, l.bottom), l.left = kn(d.left, l.left), l;
  }, Dl(e, a, r));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function Wf(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? zt(r) : null, i = r ? fr(r) : null, a = t.x + t.width / 2 - n.width / 2, c = t.y + t.height / 2 - n.height / 2, l;
  switch (o) {
    case lt:
      l = {
        x: a,
        y: t.y - n.height
      };
      break;
    case Ot:
      l = {
        x: a,
        y: t.y + t.height
      };
      break;
    case Rt:
      l = {
        x: t.x + t.width,
        y: c
      };
      break;
    case ut:
      l = {
        x: t.x - n.width,
        y: c
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var u = o ? Xa(o) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (i) {
      case lr:
        l[u] = l[u] - (t[d] / 2 - n[d] / 2);
        break;
      case Jr:
        l[u] = l[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return l;
}
function Zr(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, a = i === void 0 ? e.strategy : i, c = n.boundary, l = c === void 0 ? mb : c, u = n.rootBoundary, d = u === void 0 ? Mf : u, f = n.elementContext, h = f === void 0 ? Rr : f, b = n.altBoundary, m = b === void 0 ? !1 : b, p = n.padding, g = p === void 0 ? 0 : p, C = Vf(typeof g != "number" ? g : Uf(g, vo)), T = h === Rr ? gb : Rr, w = e.rects.popper, E = e.elements[m ? T : h], S = Kb($n(E) ? E : E.contextElement || vn(e.elements.popper), l, d, a), O = dr(e.elements.reference), R = Wf({
    reference: O,
    element: w,
    strategy: "absolute",
    placement: o
  }), N = oa(Object.assign({}, w, R)), j = h === Rr ? N : O, x = {
    top: S.top - j.top + C.top,
    bottom: j.bottom - S.bottom + C.bottom,
    left: S.left - j.left + C.left,
    right: j.right - S.right + C.right
  }, P = e.modifiersData.offset;
  if (h === Rr && P) {
    var L = P[o];
    Object.keys(x).forEach(function(_) {
      var V = [Rt, Ot].indexOf(_) >= 0 ? 1 : -1, M = [lt, Ot].indexOf(_) >= 0 ? "y" : "x";
      x[_] += L[M] * V;
    });
  }
  return x;
}
function Xb(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, a = n.padding, c = n.flipVariations, l = n.allowedAutoPlacements, u = l === void 0 ? Df : l, d = fr(r), f = d ? c ? Il : Il.filter(function(m) {
    return fr(m) === d;
  }) : vo, h = f.filter(function(m) {
    return u.indexOf(m) >= 0;
  });
  h.length === 0 && (h = f);
  var b = h.reduce(function(m, p) {
    return m[p] = Zr(e, {
      placement: p,
      boundary: o,
      rootBoundary: i,
      padding: a
    })[zt(p)], m;
  }, {});
  return Object.keys(b).sort(function(m, p) {
    return b[m] - b[p];
  });
}
function Jb(e) {
  if (zt(e) === Ga)
    return [];
  var t = Zo(e);
  return [Ml(e), t, Ml(t)];
}
function Zb(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, c = a === void 0 ? !0 : a, l = n.fallbackPlacements, u = n.padding, d = n.boundary, f = n.rootBoundary, h = n.altBoundary, b = n.flipVariations, m = b === void 0 ? !0 : b, p = n.allowedAutoPlacements, g = t.options.placement, C = zt(g), T = C === g, w = l || (T || !m ? [Zo(g)] : Jb(g)), E = [g].concat(w).reduce(function(q, K) {
      return q.concat(zt(K) === Ga ? Xb(t, {
        placement: K,
        boundary: d,
        rootBoundary: f,
        padding: u,
        flipVariations: m,
        allowedAutoPlacements: p
      }) : K);
    }, []), S = t.rects.reference, O = t.rects.popper, R = /* @__PURE__ */ new Map(), N = !0, j = E[0], x = 0; x < E.length; x++) {
      var P = E[x], L = zt(P), _ = fr(P) === lr, V = [lt, Ot].indexOf(L) >= 0, M = V ? "width" : "height", D = Zr(t, {
        placement: P,
        boundary: d,
        rootBoundary: f,
        altBoundary: h,
        padding: u
      }), W = V ? _ ? Rt : ut : _ ? Ot : lt;
      S[M] > O[M] && (W = Zo(W));
      var H = Zo(W), X = [];
      if (i && X.push(D[L] <= 0), c && X.push(D[W] <= 0, D[H] <= 0), X.every(function(q) {
        return q;
      })) {
        j = P, N = !1;
        break;
      }
      R.set(P, X);
    }
    if (N)
      for (var A = m ? 3 : 1, U = function(K) {
        var F = E.find(function(J) {
          var Z = R.get(J);
          if (Z)
            return Z.slice(0, K).every(function(ne) {
              return ne;
            });
        });
        if (F)
          return j = F, "break";
      }, Q = A; Q > 0; Q--) {
        var ee = U(Q);
        if (ee === "break") break;
      }
    t.placement !== j && (t.modifiersData[r]._skip = !0, t.placement = j, t.reset = !0);
  }
}
const Qb = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Zb,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ll(e, t, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - n.y,
    right: e.right - t.width + n.x,
    bottom: e.bottom - t.height + n.y,
    left: e.left - t.width - n.x
  };
}
function Bl(e) {
  return [lt, Rt, Ot, ut].some(function(t) {
    return e[t] >= 0;
  });
}
function e0(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, a = Zr(t, {
    elementContext: "reference"
  }), c = Zr(t, {
    altBoundary: !0
  }), l = Ll(a, r), u = Ll(c, o, i), d = Bl(l), f = Bl(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": f
  });
}
const t0 = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: e0
};
function n0(e, t, n) {
  var r = zt(e), o = [ut, lt].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, a = i[0], c = i[1];
  return a = a || 0, c = (c || 0) * o, [ut, Rt].indexOf(r) >= 0 ? {
    x: c,
    y: a
  } : {
    x: a,
    y: c
  };
}
function r0(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, a = Df.reduce(function(d, f) {
    return d[f] = n0(f, t.rects, i), d;
  }, {}), c = a[t.placement], l = c.x, u = c.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
}
const o0 = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: r0
};
function i0(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Wf({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const s0 = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: i0,
  data: {}
};
function a0(e) {
  return e === "x" ? "y" : "x";
}
function c0(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, c = a === void 0 ? !1 : a, l = n.boundary, u = n.rootBoundary, d = n.altBoundary, f = n.padding, h = n.tether, b = h === void 0 ? !0 : h, m = n.tetherOffset, p = m === void 0 ? 0 : m, g = Zr(t, {
    boundary: l,
    rootBoundary: u,
    padding: f,
    altBoundary: d
  }), C = zt(t.placement), T = fr(t.placement), w = !T, E = Xa(C), S = a0(E), O = t.modifiersData.popperOffsets, R = t.rects.reference, N = t.rects.popper, j = typeof p == "function" ? p(Object.assign({}, t.rects, {
    placement: t.placement
  })) : p, x = typeof j == "number" ? {
    mainAxis: j,
    altAxis: j
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, j), P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, L = {
    x: 0,
    y: 0
  };
  if (O) {
    if (i) {
      var _, V = E === "y" ? lt : ut, M = E === "y" ? Ot : Rt, D = E === "y" ? "height" : "width", W = O[E], H = W + g[V], X = W - g[M], A = b ? -N[D] / 2 : 0, U = T === lr ? R[D] : N[D], Q = T === lr ? -N[D] : -R[D], ee = t.elements.arrow, q = b && ee ? Ka(ee) : {
        width: 0,
        height: 0
      }, K = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ff(), F = K[V], J = K[M], Z = zr(0, R[D], q[D]), ne = w ? R[D] / 2 - A - Z - F - x.mainAxis : U - Z - F - x.mainAxis, G = w ? -R[D] / 2 + A + Z + J + x.mainAxis : Q + Z + J + x.mainAxis, re = t.elements.arrow && bo(t.elements.arrow), B = re ? E === "y" ? re.clientTop || 0 : re.clientLeft || 0 : 0, pe = (_ = P == null ? void 0 : P[E]) != null ? _ : 0, Y = W + ne - pe - B, ye = W + G - pe, Me = zr(b ? mi(H, Y) : H, W, b ? kn(X, ye) : X);
      O[E] = Me, L[E] = Me - W;
    }
    if (c) {
      var me, De = E === "x" ? lt : ut, Le = E === "x" ? Ot : Rt, Xe = O[S], $e = S === "y" ? "height" : "width", oe = Xe + g[De], Mt = Xe - g[Le], Dt = [lt, ut].indexOf(C) !== -1, Lt = (me = P == null ? void 0 : P[S]) != null ? me : 0, Bt = Dt ? oe : Xe - R[$e] - N[$e] - Lt + x.altAxis, Ne = Dt ? Xe + R[$e] + N[$e] - Lt - x.altAxis : Mt, Ge = b && Dt ? Ab(Bt, Xe, Ne) : zr(b ? Bt : oe, Xe, b ? Ne : Mt);
      O[S] = Ge, L[S] = Ge - Xe;
    }
    t.modifiersData[r] = L;
  }
}
const l0 = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: c0,
  requiresIfExists: ["offset"]
};
function u0(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function d0(e) {
  return e === vt(e) || !Tt(e) ? Ja(e) : u0(e);
}
function f0(e) {
  var t = e.getBoundingClientRect(), n = ur(t.width) / e.offsetWidth || 1, r = ur(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function p0(e, t, n) {
  n === void 0 && (n = !1);
  var r = Tt(t), o = Tt(t) && f0(t), i = vn(t), a = dr(e, o, n), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Ht(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Qa(i)) && (c = d0(t)), Tt(t) ? (l = dr(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : i && (l.x = Za(i))), {
    x: a.left + c.scrollLeft - l.x,
    y: a.top + c.scrollTop - l.y,
    width: a.width,
    height: a.height
  };
}
function h0(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var a = [].concat(i.requires || [], i.requiresIfExists || []);
    a.forEach(function(c) {
      if (!n.has(c)) {
        var l = t.get(c);
        l && o(l);
      }
    }), r.push(i);
  }
  return e.forEach(function(i) {
    n.has(i.name) || o(i);
  }), r;
}
function m0(e) {
  var t = h0(e);
  return Ob.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function g0(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function y0(e) {
  var t = e.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, {
      options: Object.assign({}, o.options, r.options),
      data: Object.assign({}, o.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var Fl = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Vl() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function v0(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? Fl : o;
  return function(c, l, u) {
    u === void 0 && (u = i);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Fl, i),
      modifiersData: {},
      elements: {
        reference: c,
        popper: l
      },
      attributes: {},
      styles: {}
    }, f = [], h = !1, b = {
      state: d,
      setOptions: function(C) {
        var T = typeof C == "function" ? C(d.options) : C;
        p(), d.options = Object.assign({}, i, d.options, T), d.scrollParents = {
          reference: $n(c) ? Wr(c) : c.contextElement ? Wr(c.contextElement) : [],
          popper: Wr(l)
        };
        var w = m0(y0([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = w.filter(function(E) {
          return E.enabled;
        }), m(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!h) {
          var C = d.elements, T = C.reference, w = C.popper;
          if (Vl(T, w)) {
            d.rects = {
              reference: p0(T, bo(w), d.options.strategy === "fixed"),
              popper: Ka(w)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(x) {
              return d.modifiersData[x.name] = Object.assign({}, x.data);
            });
            for (var E = 0; E < d.orderedModifiers.length; E++) {
              if (d.reset === !0) {
                d.reset = !1, E = -1;
                continue;
              }
              var S = d.orderedModifiers[E], O = S.fn, R = S.options, N = R === void 0 ? {} : R, j = S.name;
              typeof O == "function" && (d = O({
                state: d,
                options: N,
                name: j,
                instance: b
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: g0(function() {
        return new Promise(function(g) {
          b.forceUpdate(), g(d);
        });
      }),
      destroy: function() {
        p(), h = !0;
      }
    };
    if (!Vl(c, l))
      return b;
    b.setOptions(u).then(function(g) {
      !h && u.onFirstUpdate && u.onFirstUpdate(g);
    });
    function m() {
      d.orderedModifiers.forEach(function(g) {
        var C = g.name, T = g.options, w = T === void 0 ? {} : T, E = g.effect;
        if (typeof E == "function") {
          var S = E({
            state: d,
            name: C,
            instance: b,
            options: w
          }), O = function() {
          };
          f.push(S || O);
        }
      });
    }
    function p() {
      f.forEach(function(g) {
        return g();
      }), f = [];
    }
    return b;
  };
}
var b0 = [Ub, s0, Fb, Pb, o0, Qb, l0, Mb, t0], x0 = /* @__PURE__ */ v0({
  defaultModifiers: b0
});
function E0(e) {
  return typeof e == "function" ? e() : e;
}
const Qr = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [a, c] = v.useState(null), l = et(/* @__PURE__ */ v.isValidElement(r) ? gr(r) : null, n);
  if (In(() => {
    i || c(E0(o) || document.body);
  }, [o, i]), In(() => {
    if (a && !i)
      return Ks(n, a), () => {
        Ks(n, null);
      };
  }, [n, a, i]), i) {
    if (/* @__PURE__ */ v.isValidElement(r)) {
      const u = {
        ref: l
      };
      return /* @__PURE__ */ v.cloneElement(r, u);
    }
    return r;
  }
  return a && /* @__PURE__ */ lm.createPortal(r, a);
});
process.env.NODE_ENV !== "production" && (Qr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: s.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: s.oneOfType([Qt, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && (Qr.propTypes = Fi(Qr.propTypes));
function S0(e) {
  return we("MuiPopper", e);
}
Te("MuiPopper", ["root"]);
function w0(e, t) {
  if (t === "ltr")
    return e;
  switch (e) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return e;
  }
}
function gi(e) {
  return typeof e == "function" ? e() : e;
}
function Gi(e) {
  return e.nodeType !== void 0;
}
function C0(e) {
  return !Gi(e);
}
const T0 = (e) => {
  const {
    classes: t
  } = e;
  return Pe({
    root: ["root"]
  }, S0, t);
}, O0 = {}, R0 = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    direction: i,
    disablePortal: a,
    modifiers: c,
    open: l,
    placement: u,
    popperOptions: d,
    popperRef: f,
    slotProps: h = {},
    slots: b = {},
    TransitionProps: m,
    // @ts-ignore internal logic
    ownerState: p,
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
    ...g
  } = t, C = v.useRef(null), T = et(C, n), w = v.useRef(null), E = et(w, f), S = v.useRef(E);
  In(() => {
    S.current = E;
  }, [E]), v.useImperativeHandle(f, () => w.current, []);
  const O = w0(u, i), [R, N] = v.useState(O), [j, x] = v.useState(gi(r));
  v.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), v.useEffect(() => {
    r && x(gi(r));
  }, [r]), In(() => {
    if (!j || !l)
      return;
    const M = (H) => {
      N(H.placement);
    };
    if (process.env.NODE_ENV !== "production" && j && Gi(j) && j.nodeType === 1) {
      const H = j.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && H.top === 0 && H.left === 0 && H.right === 0 && H.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let D = [{
      name: "preventOverflow",
      options: {
        altBoundary: a
      }
    }, {
      name: "flip",
      options: {
        altBoundary: a
      }
    }, {
      name: "onUpdate",
      enabled: !0,
      phase: "afterWrite",
      fn: ({
        state: H
      }) => {
        M(H);
      }
    }];
    c != null && (D = D.concat(c)), d && d.modifiers != null && (D = D.concat(d.modifiers));
    const W = x0(j, C.current, {
      placement: O,
      ...d,
      modifiers: D
    });
    return S.current(W), () => {
      W.destroy(), S.current(null);
    };
  }, [j, a, c, l, d, O]);
  const P = {
    placement: R
  };
  m !== null && (P.TransitionProps = m);
  const L = T0(t), _ = b.root ?? "div", V = lf({
    elementType: _,
    externalSlotProps: h.root,
    externalForwardedProps: g,
    additionalProps: {
      role: "tooltip",
      ref: T
    },
    ownerState: t,
    className: L.root
  });
  return /* @__PURE__ */ y.jsx(_, {
    ...V,
    children: typeof o == "function" ? o(P) : o
  });
}), Hf = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: a = "ltr",
    disablePortal: c = !1,
    keepMounted: l = !1,
    modifiers: u,
    open: d,
    placement: f = "bottom",
    popperOptions: h = O0,
    popperRef: b,
    style: m,
    transition: p = !1,
    slotProps: g = {},
    slots: C = {},
    ...T
  } = t, [w, E] = v.useState(!0), S = () => {
    E(!1);
  }, O = () => {
    E(!0);
  };
  if (!l && !d && (!p || w))
    return null;
  let R;
  if (i)
    R = i;
  else if (r) {
    const x = gi(r);
    R = x && Gi(x) ? $t(x).body : $t(null).body;
  }
  const N = !d && l && (!p || w) ? "none" : void 0, j = p ? {
    in: d,
    onEnter: S,
    onExited: O
  } : void 0;
  return /* @__PURE__ */ y.jsx(Qr, {
    disablePortal: c,
    container: R,
    children: /* @__PURE__ */ y.jsx(R0, {
      anchorEl: r,
      direction: a,
      disablePortal: c,
      modifiers: u,
      ref: n,
      open: p ? !w : d,
      placement: f,
      popperOptions: h,
      popperRef: b,
      slotProps: g,
      slots: C,
      ...T,
      style: {
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: N,
        ...m
      },
      TransitionProps: j,
      children: o
    })
  });
});
process.env.NODE_ENV !== "production" && (Hf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: tn(s.oneOfType([Qt, s.object, s.func]), (e) => {
    if (e.open) {
      const t = gi(e.anchorEl);
      if (t && Gi(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || C0(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: s.oneOfType([s.node, s.func]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: s.oneOfType([Qt, s.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: s.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: s.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: s.arrayOf(s.shape({
    data: s.object,
    effect: s.func,
    enabled: s.bool,
    fn: s.func,
    name: s.any,
    options: s.object,
    phase: s.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: s.arrayOf(s.string),
    requiresIfExists: s.arrayOf(s.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: s.shape({
    modifiers: s.array,
    onFirstUpdate: s.func,
    placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: s.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: Vi,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: s.shape({
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    root: s.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: s.bool
});
const k0 = se(Hf, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ec = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Fa(), o = Ce({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: a,
    components: c,
    componentsProps: l,
    container: u,
    disablePortal: d,
    keepMounted: f,
    modifiers: h,
    open: b,
    placement: m,
    popperOptions: p,
    popperRef: g,
    transition: C,
    slots: T,
    slotProps: w,
    ...E
  } = o, S = (T == null ? void 0 : T.root) ?? (c == null ? void 0 : c.Root), O = {
    anchorEl: i,
    container: u,
    disablePortal: d,
    keepMounted: f,
    modifiers: h,
    open: b,
    placement: m,
    popperOptions: p,
    popperRef: g,
    transition: C,
    ...E
  };
  return /* @__PURE__ */ y.jsx(k0, {
    as: a,
    direction: r ? "rtl" : "ltr",
    slots: {
      root: S
    },
    slotProps: w ?? l,
    ...O,
    ref: n
  });
});
process.env.NODE_ENV !== "production" && (ec.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: s.oneOfType([Qt, s.object, s.func]),
  /**
   * Popper render function or node.
   */
  children: s.oneOfType([s.node, s.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  components: s.shape({
    Root: s.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  componentsProps: s.shape({
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: s.oneOfType([Qt, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: s.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: s.arrayOf(s.shape({
    data: s.object,
    effect: s.func,
    enabled: s.bool,
    fn: s.func,
    name: s.any,
    options: s.object,
    phase: s.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: s.arrayOf(s.string),
    requiresIfExists: s.arrayOf(s.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: s.shape({
    modifiers: s.array,
    onFirstUpdate: s.func,
    placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: s.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: Vi,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: s.shape({
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: s.bool
});
function P0(e) {
  return we("MuiListSubheader", e);
}
Te("MuiListSubheader", ["root", "colorPrimary", "colorInherit", "gutters", "inset", "sticky"]);
const N0 = (e) => {
  const {
    classes: t,
    color: n,
    disableGutters: r,
    inset: o,
    disableSticky: i
  } = e, a = {
    root: ["root", n !== "default" && `color${le(n)}`, !r && "gutters", o && "inset", !i && "sticky"]
  };
  return Pe(a, P0, t);
}, j0 = se("li", {
  name: "MuiListSubheader",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "default" && t[`color${le(n.color)}`], !n.disableGutters && t.gutters, n.inset && t.inset, !n.disableSticky && t.sticky];
  }
})(Fe(({
  theme: e
}) => ({
  boxSizing: "border-box",
  lineHeight: "48px",
  listStyle: "none",
  color: (e.vars || e).palette.text.secondary,
  fontFamily: e.typography.fontFamily,
  fontWeight: e.typography.fontWeightMedium,
  fontSize: e.typography.pxToRem(14),
  variants: [{
    props: {
      color: "primary"
    },
    style: {
      color: (e.vars || e).palette.primary.main
    }
  }, {
    props: {
      color: "inherit"
    },
    style: {
      color: "inherit"
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState: t
    }) => t.inset,
    style: {
      paddingLeft: 72
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disableSticky,
    style: {
      position: "sticky",
      top: 0,
      zIndex: 1,
      backgroundColor: (e.vars || e).palette.background.paper
    }
  }]
}))), yi = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiListSubheader"
  }), {
    className: o,
    color: i = "default",
    component: a = "li",
    disableGutters: c = !1,
    disableSticky: l = !1,
    inset: u = !1,
    ...d
  } = r, f = {
    ...r,
    color: i,
    component: a,
    disableGutters: c,
    disableSticky: l,
    inset: u
  }, h = N0(f);
  return /* @__PURE__ */ y.jsx(j0, {
    as: a,
    className: ie(h.root, o),
    ref: n,
    ownerState: f,
    ...d
  });
});
yi && (yi.muiSkipListHighlight = !0);
process.env.NODE_ENV !== "production" && (yi.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: s.oneOf(["default", "inherit", "primary"]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, the List Subheader will not have gutters.
   * @default false
   */
  disableGutters: s.bool,
  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   * @default false
   */
  disableSticky: s.bool,
  /**
   * If `true`, the List Subheader is indented.
   * @default false
   */
  inset: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
function ia(e) {
  return typeof e == "string";
}
const A0 = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
}), "Person");
function I0(e) {
  return we("MuiAvatar", e);
}
Te("MuiAvatar", ["root", "colorDefault", "circular", "rounded", "square", "img", "fallback"]);
const $0 = (e) => {
  const {
    classes: t,
    variant: n,
    colorDefault: r
  } = e;
  return Pe({
    root: ["root", n, r && "colorDefault"],
    img: ["img"],
    fallback: ["fallback"]
  }, I0, t);
}, _0 = se("div", {
  name: "MuiAvatar",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], n.colorDefault && t.colorDefault];
  }
})(Fe(({
  theme: e
}) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 40,
  height: 40,
  fontFamily: e.typography.fontFamily,
  fontSize: e.typography.pxToRem(20),
  lineHeight: 1,
  borderRadius: "50%",
  overflow: "hidden",
  userSelect: "none",
  variants: [{
    props: {
      variant: "rounded"
    },
    style: {
      borderRadius: (e.vars || e).shape.borderRadius
    }
  }, {
    props: {
      variant: "square"
    },
    style: {
      borderRadius: 0
    }
  }, {
    props: {
      colorDefault: !0
    },
    style: {
      color: (e.vars || e).palette.background.default,
      ...e.vars ? {
        backgroundColor: e.vars.palette.Avatar.defaultBg
      } : {
        backgroundColor: e.palette.grey[400],
        ...e.applyStyles("dark", {
          backgroundColor: e.palette.grey[600]
        })
      }
    }
  }]
}))), M0 = se("img", {
  name: "MuiAvatar",
  slot: "Img",
  overridesResolver: (e, t) => t.img
})({
  width: "100%",
  height: "100%",
  textAlign: "center",
  // Handle non-square image.
  objectFit: "cover",
  // Hide alt text.
  color: "transparent",
  // Hide the image broken icon, only works on Chrome.
  textIndent: 1e4
}), D0 = se(A0, {
  name: "MuiAvatar",
  slot: "Fallback",
  overridesResolver: (e, t) => t.fallback
})({
  width: "75%",
  height: "75%"
});
function L0({
  crossOrigin: e,
  referrerPolicy: t,
  src: n,
  srcSet: r
}) {
  const [o, i] = v.useState(!1);
  return v.useEffect(() => {
    if (!n && !r)
      return;
    i(!1);
    let a = !0;
    const c = new Image();
    return c.onload = () => {
      a && i("loaded");
    }, c.onerror = () => {
      a && i("error");
    }, c.crossOrigin = e, c.referrerPolicy = t, c.src = n, r && (c.srcset = r), () => {
      a = !1;
    };
  }, [e, t, n, r]), o;
}
const tc = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiAvatar"
  }), {
    alt: o,
    children: i,
    className: a,
    component: c = "div",
    slots: l = {},
    slotProps: u = {},
    imgProps: d,
    sizes: f,
    src: h,
    srcSet: b,
    variant: m = "circular",
    ...p
  } = r;
  let g = null;
  const C = {
    ...r,
    component: c,
    variant: m
  }, T = L0({
    ...d,
    ...typeof u.img == "function" ? u.img(C) : u.img,
    src: h,
    srcSet: b
  }), w = h || b, E = w && T !== "error";
  C.colorDefault = !E, delete C.ownerState;
  const S = $0(C), [O, R] = mt("img", {
    className: S.img,
    elementType: M0,
    externalForwardedProps: {
      slots: l,
      slotProps: {
        img: {
          ...d,
          ...u.img
        }
      }
    },
    additionalProps: {
      alt: o,
      src: h,
      srcSet: b,
      sizes: f
    },
    ownerState: C
  });
  return E ? g = /* @__PURE__ */ y.jsx(O, {
    ...R
  }) : i || i === 0 ? g = i : w && o ? g = o[0] : g = /* @__PURE__ */ y.jsx(D0, {
    ownerState: C,
    className: S.fallback
  }), /* @__PURE__ */ y.jsx(_0, {
    as: c,
    className: ie(S.root, a),
    ref: n,
    ...p,
    ownerState: C,
    children: g
  });
});
process.env.NODE_ENV !== "production" && (tc.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: s.string,
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   * @deprecated Use `slotProps.img` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  imgProps: s.object,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: s.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: s.shape({
    img: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: s.shape({
    img: s.elementType
  }),
  /**
   * The `src` attribute for the `img` element.
   */
  src: s.string,
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant: s.oneOfType([s.oneOf(["circular", "rounded", "square"]), s.string])
});
function B0(e) {
  return we("MuiButton", e);
}
const Kn = Te("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]), qf = /* @__PURE__ */ v.createContext({});
process.env.NODE_ENV !== "production" && (qf.displayName = "ButtonGroupContext");
const Gf = /* @__PURE__ */ v.createContext(void 0);
process.env.NODE_ENV !== "production" && (Gf.displayName = "ButtonGroupButtonContext");
const F0 = (e) => {
  const {
    color: t,
    disableElevation: n,
    fullWidth: r,
    size: o,
    variant: i,
    classes: a
  } = e, c = {
    root: ["root", i, `${i}${le(t)}`, `size${le(o)}`, `${i}Size${le(o)}`, `color${le(t)}`, n && "disableElevation", r && "fullWidth"],
    label: ["label"],
    startIcon: ["icon", "startIcon", `iconSize${le(o)}`],
    endIcon: ["icon", "endIcon", `iconSize${le(o)}`]
  }, l = Pe(c, B0, a);
  return {
    ...a,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...l
  };
}, Yf = [{
  props: {
    size: "small"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 18
    }
  }
}, {
  props: {
    size: "medium"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 20
    }
  }
}, {
  props: {
    size: "large"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 22
    }
  }
}], V0 = se(yo, {
  shouldForwardProp: (e) => Wi(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], t[`${n.variant}${le(n.color)}`], t[`size${le(n.size)}`], t[`${n.variant}Size${le(n.size)}`], n.color === "inherit" && t.colorInherit, n.disableElevation && t.disableElevation, n.fullWidth && t.fullWidth];
  }
})(Fe(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? e.palette.grey[300] : e.palette.grey[800], n = e.palette.mode === "light" ? e.palette.grey.A100 : e.palette.grey[700];
  return {
    ...e.typography.button,
    minWidth: 64,
    padding: "6px 16px",
    border: 0,
    borderRadius: (e.vars || e).shape.borderRadius,
    transition: e.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: e.transitions.duration.short
    }),
    "&:hover": {
      textDecoration: "none"
    },
    [`&.${Kn.disabled}`]: {
      color: (e.vars || e).palette.action.disabled
    },
    variants: [{
      props: {
        variant: "contained"
      },
      style: {
        color: "var(--variant-containedColor)",
        backgroundColor: "var(--variant-containedBg)",
        boxShadow: (e.vars || e).shadows[2],
        "&:hover": {
          boxShadow: (e.vars || e).shadows[4],
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            boxShadow: (e.vars || e).shadows[2]
          }
        },
        "&:active": {
          boxShadow: (e.vars || e).shadows[8]
        },
        [`&.${Kn.focusVisible}`]: {
          boxShadow: (e.vars || e).shadows[6]
        },
        [`&.${Kn.disabled}`]: {
          color: (e.vars || e).palette.action.disabled,
          boxShadow: (e.vars || e).shadows[0],
          backgroundColor: (e.vars || e).palette.action.disabledBackground
        }
      }
    }, {
      props: {
        variant: "outlined"
      },
      style: {
        padding: "5px 15px",
        border: "1px solid currentColor",
        borderColor: "var(--variant-outlinedBorder, currentColor)",
        backgroundColor: "var(--variant-outlinedBg)",
        color: "var(--variant-outlinedColor)",
        [`&.${Kn.disabled}`]: {
          border: `1px solid ${(e.vars || e).palette.action.disabledBackground}`
        }
      }
    }, {
      props: {
        variant: "text"
      },
      style: {
        padding: "6px 8px",
        color: "var(--variant-textColor)",
        backgroundColor: "var(--variant-textBg)"
      }
    }, ...Object.entries(e.palette).filter(cr()).map(([r]) => ({
      props: {
        color: r
      },
      style: {
        "--variant-textColor": (e.vars || e).palette[r].main,
        "--variant-outlinedColor": (e.vars || e).palette[r].main,
        "--variant-outlinedBorder": e.vars ? `rgba(${e.vars.palette[r].mainChannel} / 0.5)` : Ve(e.palette[r].main, 0.5),
        "--variant-containedColor": (e.vars || e).palette[r].contrastText,
        "--variant-containedBg": (e.vars || e).palette[r].main,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": (e.vars || e).palette[r].dark,
            "--variant-textBg": e.vars ? `rgba(${e.vars.palette[r].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Ve(e.palette[r].main, e.palette.action.hoverOpacity),
            "--variant-outlinedBorder": (e.vars || e).palette[r].main,
            "--variant-outlinedBg": e.vars ? `rgba(${e.vars.palette[r].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Ve(e.palette[r].main, e.palette.action.hoverOpacity)
          }
        }
      }
    })), {
      props: {
        color: "inherit"
      },
      style: {
        color: "inherit",
        borderColor: "currentColor",
        "--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedBg : t,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedHoverBg : n,
            "--variant-textBg": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Ve(e.palette.text.primary, e.palette.action.hoverOpacity),
            "--variant-outlinedBg": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Ve(e.palette.text.primary, e.palette.action.hoverOpacity)
          }
        }
      }
    }, {
      props: {
        size: "small",
        variant: "text"
      },
      style: {
        padding: "4px 5px",
        fontSize: e.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "text"
      },
      style: {
        padding: "8px 11px",
        fontSize: e.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "outlined"
      },
      style: {
        padding: "3px 9px",
        fontSize: e.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "outlined"
      },
      style: {
        padding: "7px 21px",
        fontSize: e.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "contained"
      },
      style: {
        padding: "4px 10px",
        fontSize: e.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "contained"
      },
      style: {
        padding: "8px 22px",
        fontSize: e.typography.pxToRem(15)
      }
    }, {
      props: {
        disableElevation: !0
      },
      style: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none"
        },
        [`&.${Kn.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${Kn.disabled}`]: {
          boxShadow: "none"
        }
      }
    }, {
      props: {
        fullWidth: !0
      },
      style: {
        width: "100%"
      }
    }]
  };
})), U0 = se("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.startIcon, t[`iconSize${le(n.size)}`]];
  }
})({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginLeft: -2
    }
  }, ...Yf]
}), z0 = se("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.endIcon, t[`iconSize${le(n.size)}`]];
  }
})({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginRight: -2
    }
  }, ...Yf]
}), nc = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = v.useContext(qf), o = v.useContext(Gf), i = Gr(r, t), a = Ce({
    props: i,
    name: "MuiButton"
  }), {
    children: c,
    color: l = "primary",
    component: u = "button",
    className: d,
    disabled: f = !1,
    disableElevation: h = !1,
    disableFocusRipple: b = !1,
    endIcon: m,
    focusVisibleClassName: p,
    fullWidth: g = !1,
    size: C = "medium",
    startIcon: T,
    type: w,
    variant: E = "text",
    ...S
  } = a, O = {
    ...a,
    color: l,
    component: u,
    disabled: f,
    disableElevation: h,
    disableFocusRipple: b,
    fullWidth: g,
    size: C,
    type: w,
    variant: E
  }, R = F0(O), N = T && /* @__PURE__ */ y.jsx(U0, {
    className: R.startIcon,
    ownerState: O,
    children: T
  }), j = m && /* @__PURE__ */ y.jsx(z0, {
    className: R.endIcon,
    ownerState: O,
    children: m
  }), x = o || "";
  return /* @__PURE__ */ y.jsxs(V0, {
    ownerState: O,
    className: ie(r.className, R.root, d, x),
    component: u,
    disabled: f,
    focusRipple: !b,
    focusVisibleClassName: ie(R.focusVisible, p),
    ref: n,
    type: w,
    ...S,
    classes: R,
    children: [N, c, j]
  });
});
process.env.NODE_ENV !== "production" && (nc.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: s.oneOfType([s.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: s.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: s.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: s.bool,
  /**
   * Element placed after the children.
   */
  endIcon: s.node,
  /**
   * @ignore
   */
  focusVisibleClassName: s.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: s.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: s.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: s.oneOfType([s.oneOf(["small", "medium", "large"]), s.string]),
  /**
   * Element placed before the children.
   */
  startIcon: s.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * @ignore
   */
  type: s.oneOfType([s.oneOf(["button", "reset", "submit"]), s.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: s.oneOfType([s.oneOf(["contained", "outlined", "text"]), s.string])
});
const rc = (e) => e.scrollTop;
function hn(e, t) {
  const {
    timeout: n,
    easing: r,
    style: o = {}
  } = e;
  return {
    duration: o.transitionDuration ?? (typeof n == "number" ? n : n[t.mode] || 0),
    easing: o.transitionTimingFunction ?? (typeof r == "object" ? r[t.mode] : r),
    delay: o.transitionDelay
  };
}
function sa(e) {
  return `scale(${e}, ${e ** 2})`;
}
const W0 = {
  entering: {
    opacity: 1,
    transform: sa(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, ws = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), eo = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: a,
    in: c,
    onEnter: l,
    onEntered: u,
    onEntering: d,
    onExit: f,
    onExited: h,
    onExiting: b,
    style: m,
    timeout: p = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: g = Pt,
    ...C
  } = t, T = Tn(), w = v.useRef(), E = yn(), S = v.useRef(null), O = et(S, gr(i), n), R = (M) => (D) => {
    if (M) {
      const W = S.current;
      D === void 0 ? M(W) : M(W, D);
    }
  }, N = R(d), j = R((M, D) => {
    rc(M);
    const {
      duration: W,
      delay: H,
      easing: X
    } = hn({
      style: m,
      timeout: p,
      easing: a
    }, {
      mode: "enter"
    });
    let A;
    p === "auto" ? (A = E.transitions.getAutoHeightDuration(M.clientHeight), w.current = A) : A = W, M.style.transition = [E.transitions.create("opacity", {
      duration: A,
      delay: H
    }), E.transitions.create("transform", {
      duration: ws ? A : A * 0.666,
      delay: H,
      easing: X
    })].join(","), l && l(M, D);
  }), x = R(u), P = R(b), L = R((M) => {
    const {
      duration: D,
      delay: W,
      easing: H
    } = hn({
      style: m,
      timeout: p,
      easing: a
    }, {
      mode: "exit"
    });
    let X;
    p === "auto" ? (X = E.transitions.getAutoHeightDuration(M.clientHeight), w.current = X) : X = D, M.style.transition = [E.transitions.create("opacity", {
      duration: X,
      delay: W
    }), E.transitions.create("transform", {
      duration: ws ? X : X * 0.666,
      delay: ws ? W : W || X * 0.333,
      easing: H
    })].join(","), M.style.opacity = 0, M.style.transform = sa(0.75), f && f(M);
  }), _ = R(h), V = (M) => {
    p === "auto" && T.start(w.current || 0, M), r && r(S.current, M);
  };
  return /* @__PURE__ */ y.jsx(g, {
    appear: o,
    in: c,
    nodeRef: S,
    onEnter: j,
    onEntered: x,
    onEntering: N,
    onExit: L,
    onExited: _,
    onExiting: P,
    addEndListener: V,
    timeout: p === "auto" ? null : p,
    ...C,
    children: (M, {
      ownerState: D,
      ...W
    }) => /* @__PURE__ */ v.cloneElement(i, {
      style: {
        opacity: 0,
        transform: sa(0.75),
        visibility: M === "exited" && !c ? "hidden" : void 0,
        ...W0[M],
        ...m,
        ...i.props.style
      },
      ref: O,
      ...W
    })
  });
});
process.env.NODE_ENV !== "production" && (eo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: s.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: s.bool,
  /**
   * A single child content element.
   */
  children: Dn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: s.oneOfType([s.shape({
    enter: s.string,
    exit: s.string
  }), s.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: s.bool,
  /**
   * @ignore
   */
  onEnter: s.func,
  /**
   * @ignore
   */
  onEntered: s.func,
  /**
   * @ignore
   */
  onEntering: s.func,
  /**
   * @ignore
   */
  onExit: s.func,
  /**
   * @ignore
   */
  onExited: s.func,
  /**
   * @ignore
   */
  onExiting: s.func,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
eo && (eo.muiSupportAuto = !0);
function H0(e) {
  return we("MuiTooltip", e);
}
const He = Te("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]);
function q0(e) {
  return Math.round(e * 1e5) / 1e5;
}
const G0 = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, a = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${le(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Pe(a, H0, t);
}, Y0 = se(ec, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.popper, !n.disableInteractive && t.popperInteractive, n.arrow && t.popperArrow, !n.open && t.popperClose];
  }
})(Fe(({
  theme: e
}) => ({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none",
  variants: [{
    props: ({
      ownerState: t
    }) => !t.disableInteractive,
    style: {
      pointerEvents: "auto"
    }
  }, {
    props: ({
      open: t
    }) => !t,
    style: {
      pointerEvents: "none"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.arrow,
    style: {
      [`&[data-popper-placement*="bottom"] .${He.arrow}`]: {
        top: 0,
        marginTop: "-0.71em",
        "&::before": {
          transformOrigin: "0 100%"
        }
      },
      [`&[data-popper-placement*="top"] .${He.arrow}`]: {
        bottom: 0,
        marginBottom: "-0.71em",
        "&::before": {
          transformOrigin: "100% 0"
        }
      },
      [`&[data-popper-placement*="right"] .${He.arrow}`]: {
        height: "1em",
        width: "0.71em",
        "&::before": {
          transformOrigin: "100% 100%"
        }
      },
      [`&[data-popper-placement*="left"] .${He.arrow}`]: {
        height: "1em",
        width: "0.71em",
        "&::before": {
          transformOrigin: "0 0"
        }
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.arrow && !t.isRtl,
    style: {
      [`&[data-popper-placement*="right"] .${He.arrow}`]: {
        left: 0,
        marginLeft: "-0.71em"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.arrow && !!t.isRtl,
    style: {
      [`&[data-popper-placement*="right"] .${He.arrow}`]: {
        right: 0,
        marginRight: "-0.71em"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.arrow && !t.isRtl,
    style: {
      [`&[data-popper-placement*="left"] .${He.arrow}`]: {
        right: 0,
        marginRight: "-0.71em"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.arrow && !!t.isRtl,
    style: {
      [`&[data-popper-placement*="left"] .${He.arrow}`]: {
        left: 0,
        marginLeft: "-0.71em"
      }
    }
  }]
}))), K0 = se("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${le(n.placement.split("-")[0])}`]];
  }
})(Fe(({
  theme: e
}) => ({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Ve(e.palette.grey[700], 0.92),
  borderRadius: (e.vars || e).shape.borderRadius,
  color: (e.vars || e).palette.common.white,
  fontFamily: e.typography.fontFamily,
  padding: "4px 8px",
  fontSize: e.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: e.typography.fontWeightMedium,
  [`.${He.popper}[data-popper-placement*="left"] &`]: {
    transformOrigin: "right center"
  },
  [`.${He.popper}[data-popper-placement*="right"] &`]: {
    transformOrigin: "left center"
  },
  [`.${He.popper}[data-popper-placement*="top"] &`]: {
    transformOrigin: "center bottom",
    marginBottom: "14px"
  },
  [`.${He.popper}[data-popper-placement*="bottom"] &`]: {
    transformOrigin: "center top",
    marginTop: "14px"
  },
  variants: [{
    props: ({
      ownerState: t
    }) => t.arrow,
    style: {
      position: "relative",
      margin: 0
    }
  }, {
    props: ({
      ownerState: t
    }) => t.touch,
    style: {
      padding: "8px 16px",
      fontSize: e.typography.pxToRem(14),
      lineHeight: `${q0(16 / 14)}em`,
      fontWeight: e.typography.fontWeightRegular
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.isRtl,
    style: {
      [`.${He.popper}[data-popper-placement*="left"] &`]: {
        marginRight: "14px"
      },
      [`.${He.popper}[data-popper-placement*="right"] &`]: {
        marginLeft: "14px"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.isRtl && t.touch,
    style: {
      [`.${He.popper}[data-popper-placement*="left"] &`]: {
        marginRight: "24px"
      },
      [`.${He.popper}[data-popper-placement*="right"] &`]: {
        marginLeft: "24px"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => !!t.isRtl,
    style: {
      [`.${He.popper}[data-popper-placement*="left"] &`]: {
        marginLeft: "14px"
      },
      [`.${He.popper}[data-popper-placement*="right"] &`]: {
        marginRight: "14px"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => !!t.isRtl && t.touch,
    style: {
      [`.${He.popper}[data-popper-placement*="left"] &`]: {
        marginLeft: "24px"
      },
      [`.${He.popper}[data-popper-placement*="right"] &`]: {
        marginRight: "24px"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.touch,
    style: {
      [`.${He.popper}[data-popper-placement*="top"] &`]: {
        marginBottom: "24px"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.touch,
    style: {
      [`.${He.popper}[data-popper-placement*="bottom"] &`]: {
        marginTop: "24px"
      }
    }
  }]
}))), X0 = se("span", {
  name: "MuiTooltip",
  slot: "Arrow",
  overridesResolver: (e, t) => t.arrow
})(Fe(({
  theme: e
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: e.vars ? e.vars.palette.Tooltip.bg : Ve(e.palette.grey[700], 0.9),
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)"
  }
})));
let Lo = !1;
const Ul = new Ui();
let kr = {
  x: 0,
  y: 0
};
function Bo(e, t) {
  return (n, ...r) => {
    t && t(n, ...r), e(n, ...r);
  };
}
const xo = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: o = !1,
    children: i,
    classes: a,
    components: c = {},
    componentsProps: l = {},
    describeChild: u = !1,
    disableFocusListener: d = !1,
    disableHoverListener: f = !1,
    disableInteractive: h = !1,
    disableTouchListener: b = !1,
    enterDelay: m = 100,
    enterNextDelay: p = 0,
    enterTouchDelay: g = 700,
    followCursor: C = !1,
    id: T,
    leaveDelay: w = 0,
    leaveTouchDelay: E = 1500,
    onClose: S,
    onOpen: O,
    open: R,
    placement: N = "bottom",
    PopperComponent: j,
    PopperProps: x = {},
    slotProps: P = {},
    slots: L = {},
    title: _,
    TransitionComponent: V,
    TransitionProps: M,
    ...D
  } = r, W = /* @__PURE__ */ v.isValidElement(i) ? i : /* @__PURE__ */ y.jsx("span", {
    children: i
  }), H = yn(), X = Fa(), [A, U] = v.useState(), [Q, ee] = v.useState(null), q = v.useRef(!1), K = h || C, F = Tn(), J = Tn(), Z = Tn(), ne = Tn(), [G, re] = oy({
    controlled: R,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let B = G;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ce
    } = v.useRef(R !== void 0);
    v.useEffect(() => {
      A && A.disabled && !ce && _ !== "" && A.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [_, A, ce]);
  }
  const pe = ry(T), Y = v.useRef(), ye = ln(() => {
    Y.current !== void 0 && (document.body.style.WebkitUserSelect = Y.current, Y.current = void 0), ne.clear();
  });
  v.useEffect(() => ye, [ye]);
  const Me = (ce) => {
    Ul.clear(), Lo = !0, re(!0), O && !B && O(ce);
  }, me = ln(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ce) => {
      Ul.start(800 + w, () => {
        Lo = !1;
      }), re(!1), S && B && S(ce), F.start(H.transitions.duration.shortest, () => {
        q.current = !1;
      });
    }
  ), De = (ce) => {
    q.current && ce.type !== "touchstart" || (A && A.removeAttribute("title"), J.clear(), Z.clear(), m || Lo && p ? J.start(Lo ? p : m, () => {
      Me(ce);
    }) : Me(ce));
  }, Le = (ce) => {
    J.clear(), Z.start(w, () => {
      me(ce);
    });
  }, [, Xe] = v.useState(!1), $e = (ce) => {
    ar(ce.target) || (Xe(!1), Le(ce));
  }, oe = (ce) => {
    A || U(ce.currentTarget), ar(ce.target) && (Xe(!0), De(ce));
  }, Mt = (ce) => {
    q.current = !0;
    const st = W.props;
    st.onTouchStart && st.onTouchStart(ce);
  }, Dt = (ce) => {
    Mt(ce), Z.clear(), F.clear(), ye(), Y.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", ne.start(g, () => {
      document.body.style.WebkitUserSelect = Y.current, De(ce);
    });
  }, Lt = (ce) => {
    W.props.onTouchEnd && W.props.onTouchEnd(ce), ye(), Z.start(E, () => {
      me(ce);
    });
  };
  v.useEffect(() => {
    if (!B)
      return;
    function ce(st) {
      st.key === "Escape" && me(st);
    }
    return document.addEventListener("keydown", ce), () => {
      document.removeEventListener("keydown", ce);
    };
  }, [me, B]);
  const Bt = et(gr(W), U, n);
  !_ && _ !== 0 && (B = !1);
  const Ne = v.useRef(), Ge = (ce) => {
    const st = W.props;
    st.onMouseMove && st.onMouseMove(ce), kr = {
      x: ce.clientX,
      y: ce.clientY
    }, Ne.current && Ne.current.update();
  }, Ue = {}, bt = typeof _ == "string";
  u ? (Ue.title = !B && bt && !f ? _ : null, Ue["aria-describedby"] = B ? pe : null) : (Ue["aria-label"] = bt ? _ : null, Ue["aria-labelledby"] = B && !bt ? pe : null);
  const _e = {
    ...Ue,
    ...D,
    ...W.props,
    className: ie(D.className, W.props.className),
    onTouchStart: Mt,
    ref: Bt,
    ...C ? {
      onMouseMove: Ge
    } : {}
  };
  process.env.NODE_ENV !== "production" && (_e["data-mui-internal-clone-element"] = !0, v.useEffect(() => {
    A && !A.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [A]));
  const tt = {};
  b || (_e.onTouchStart = Dt, _e.onTouchEnd = Lt), f || (_e.onMouseOver = Bo(De, _e.onMouseOver), _e.onMouseLeave = Bo(Le, _e.onMouseLeave), K || (tt.onMouseOver = De, tt.onMouseLeave = Le)), d || (_e.onFocus = Bo(oe, _e.onFocus), _e.onBlur = Bo($e, _e.onBlur), K || (tt.onFocus = oe, tt.onBlur = $e)), process.env.NODE_ENV !== "production" && W.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${W.props.title}\` or the Tooltip component.`].join(`
`));
  const Gt = {
    ...r,
    isRtl: X,
    arrow: o,
    disableInteractive: K,
    placement: N,
    PopperComponentProp: j,
    touch: q.current
  }, pt = typeof P.popper == "function" ? P.popper(Gt) : P.popper, ss = v.useMemo(() => {
    var st, Ao;
    let ce = [{
      name: "arrow",
      enabled: !!Q,
      options: {
        element: Q,
        padding: 4
      }
    }];
    return (st = x.popperOptions) != null && st.modifiers && (ce = ce.concat(x.popperOptions.modifiers)), (Ao = pt == null ? void 0 : pt.popperOptions) != null && Ao.modifiers && (ce = ce.concat(pt.popperOptions.modifiers)), {
      ...x.popperOptions,
      ...pt == null ? void 0 : pt.popperOptions,
      modifiers: ce
    };
  }, [Q, x.popperOptions, pt == null ? void 0 : pt.popperOptions]), Er = G0(Gt), as = typeof P.transition == "function" ? P.transition(Gt) : P.transition, nn = {
    slots: {
      popper: c.Popper,
      transition: c.Transition ?? V,
      tooltip: c.Tooltip,
      arrow: c.Arrow,
      ...L
    },
    slotProps: {
      arrow: P.arrow ?? l.arrow,
      popper: {
        ...x,
        ...pt ?? l.popper
      },
      // resolvedPopperProps can be spread because it's already an object
      tooltip: P.tooltip ?? l.tooltip,
      transition: {
        ...M,
        ...as ?? l.transition
      }
    }
  }, [Po, rn] = mt("popper", {
    elementType: Y0,
    externalForwardedProps: nn,
    ownerState: Gt,
    className: ie(Er.popper, x == null ? void 0 : x.className)
  }), [Sr, wr] = mt("transition", {
    elementType: eo,
    externalForwardedProps: nn,
    ownerState: Gt
  }), [No, cs] = mt("tooltip", {
    elementType: K0,
    className: Er.tooltip,
    externalForwardedProps: nn,
    ownerState: Gt
  }), [jo, ls] = mt("arrow", {
    elementType: X0,
    className: Er.arrow,
    externalForwardedProps: nn,
    ownerState: Gt,
    ref: ee
  });
  return /* @__PURE__ */ y.jsxs(v.Fragment, {
    children: [/* @__PURE__ */ v.cloneElement(W, _e), /* @__PURE__ */ y.jsx(Po, {
      as: j ?? ec,
      placement: N,
      anchorEl: C ? {
        getBoundingClientRect: () => ({
          top: kr.y,
          left: kr.x,
          right: kr.x,
          bottom: kr.y,
          width: 0,
          height: 0
        })
      } : A,
      popperRef: Ne,
      open: A ? B : !1,
      id: pe,
      transition: !0,
      ...tt,
      ...rn,
      popperOptions: ss,
      children: ({
        TransitionProps: ce
      }) => /* @__PURE__ */ y.jsx(Sr, {
        timeout: H.transitions.duration.shorter,
        ...ce,
        ...wr,
        children: /* @__PURE__ */ y.jsxs(No, {
          ...cs,
          children: [_, o ? /* @__PURE__ */ y.jsx(jo, {
            ...ls
          }) : null]
        })
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (xo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: s.bool,
  /**
   * Tooltip reference element.
   */
  children: Dn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: s.shape({
    Arrow: s.elementType,
    Popper: s.elementType,
    Tooltip: s.elementType,
    Transition: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: s.shape({
    arrow: s.object,
    popper: s.object,
    tooltip: s.object,
    transition: s.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: s.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: s.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: s.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: s.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: s.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: s.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: s.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: s.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: s.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: s.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: s.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: s.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: s.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: s.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @deprecated use the `slots.popper` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  PopperComponent: s.elementType,
  /**
   * Props applied to the [`Popper`](https://mui.com/material-ui/api/popper/) element.
   * @deprecated use the `slotProps.popper` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  PopperProps: s.object,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: s.shape({
    arrow: s.oneOfType([s.func, s.object]),
    popper: s.oneOfType([s.func, s.object]),
    tooltip: s.oneOfType([s.func, s.object]),
    transition: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: s.shape({
    arrow: s.elementType,
    popper: s.elementType,
    tooltip: s.elementType,
    transition: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: s.node,
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @deprecated use the `slots.transition` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionComponent: s.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated use the `slotProps.transition` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  TransitionProps: s.object
});
var J0 = function(e, t, n, r, o, i, a, c) {
  if (process.env.NODE_ENV !== "production" && t === void 0)
    throw new Error("invariant requires an error message argument");
  if (!e) {
    var l;
    if (t === void 0)
      l = new Error(
        "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
      );
    else {
      var u = [n, r, o, i, a, c], d = 0;
      l = new Error(
        t.replace(/%s/g, function() {
          return u[d++];
        })
      ), l.name = "Invariant Violation";
    }
    throw l.framesToPop = 1, l;
  }
}, Z0 = J0;
const to = /* @__PURE__ */ ka(Z0), Q0 = /* @__PURE__ */ v.createContext(null);
function ex(e) {
  const {
    children: t,
    unmountAfter: n = 1e3
  } = e, [r, o] = v.useState([]), i = v.useId(), a = v.useRef(0), c = v.useCallback(function(h, b, m = {}) {
    const {
      onClose: p = async () => {
      }
    } = m;
    let g;
    const C = new Promise((E) => {
      g = E;
    });
    to(g, "resolve not set");
    const T = `${i}-${a.current}`;
    a.current += 1;
    const w = {
      key: T,
      open: !0,
      promise: C,
      Component: h,
      payload: b,
      onClose: p,
      resolve: g
    };
    return o((E) => [...E, w]), C;
  }, [i]), l = v.useCallback(function(h) {
    o((b) => b.map((m) => m.promise === h ? {
      ...m,
      open: !1
    } : m)), setTimeout(() => {
      o((b) => b.filter((m) => m.promise !== h));
    }, n);
  }, [n]), u = v.useCallback(async function(h, b) {
    const m = r.find((p) => p.promise === h);
    return to(m, "dialog not found"), await m.onClose(b), m.resolve(b), l(h), h;
  }, [r, l]), d = v.useMemo(() => ({
    open: c,
    close: u
  }), [c, u]);
  return /* @__PURE__ */ y.jsxs(Q0.Provider, {
    value: d,
    children: [t, r.map(({
      key: f,
      open: h,
      Component: b,
      payload: m,
      promise: p
    }) => /* @__PURE__ */ y.jsx(b, {
      payload: m,
      open: h,
      onClose: async (g) => {
        await u(p, g);
      }
    }, f))]
  });
}
const oc = /* @__PURE__ */ v.createContext(null), ic = /* @__PURE__ */ v.createContext([]), sc = /* @__PURE__ */ v.createContext({
  paletteMode: "light",
  setPaletteMode: () => {
  },
  isDualTheme: !1
}), Yi = /* @__PURE__ */ v.createContext(null), Kf = /* @__PURE__ */ v.createContext(void 0), aa = typeof kf({}) == "function", tx = (e, t) => ({
  WebkitFontSmoothing: "antialiased",
  // Antialiasing.
  MozOsxFontSmoothing: "grayscale",
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: "border-box",
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: "100%",
  // When used under CssVarsProvider, colorScheme should not be applied dynamically because it will generate the stylesheet twice for server-rendered applications.
  ...t && !e.vars && {
    colorScheme: e.palette.mode
  }
}), nx = (e) => ({
  color: (e.vars || e).palette.text.primary,
  ...e.typography.body1,
  backgroundColor: (e.vars || e).palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: (e.vars || e).palette.common.white
  }
}), Xf = (e, t = !1) => {
  var i, a;
  const n = {};
  t && e.colorSchemes && typeof e.getColorSchemeSelector == "function" && Object.entries(e.colorSchemes).forEach(([c, l]) => {
    var d, f;
    const u = e.getColorSchemeSelector(c);
    u.startsWith("@") ? n[u] = {
      ":root": {
        colorScheme: (d = l.palette) == null ? void 0 : d.mode
      }
    } : n[u.replace(/\s*&/, "")] = {
      colorScheme: (f = l.palette) == null ? void 0 : f.mode
    };
  });
  let r = {
    html: tx(e, t),
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "strong, b": {
      fontWeight: e.typography.fontWeightBold
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      ...nx(e),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      "&::backdrop": {
        backgroundColor: (e.vars || e).palette.background.default
      }
    },
    ...n
  };
  const o = (a = (i = e.components) == null ? void 0 : i.MuiCssBaseline) == null ? void 0 : a.styleOverrides;
  return o && (r = [r, o]), r;
}, Qo = "mui-ecs", rx = (e) => {
  const t = Xf(e, !1), n = Array.isArray(t) ? t[0] : t;
  return !e.vars && n && (n.html[`:root:has(${Qo})`] = {
    colorScheme: e.palette.mode
  }), e.colorSchemes && Object.entries(e.colorSchemes).forEach(([r, o]) => {
    var a, c;
    const i = e.getColorSchemeSelector(r);
    i.startsWith("@") ? n[i] = {
      [`:root:not(:has(.${Qo}))`]: {
        colorScheme: (a = o.palette) == null ? void 0 : a.mode
      }
    } : n[i.replace(/\s*&/, "")] = {
      [`&:not(:has(.${Qo}))`]: {
        colorScheme: (c = o.palette) == null ? void 0 : c.mode
      }
    };
  }), t;
}, ox = kf(aa ? ({
  theme: e,
  enableColorScheme: t
}) => Xf(e, t) : ({
  theme: e
}) => rx(e));
function ac(e) {
  const t = Ce({
    props: e,
    name: "MuiCssBaseline"
  }), {
    children: n,
    enableColorScheme: r = !1
  } = t;
  return /* @__PURE__ */ y.jsxs(v.Fragment, {
    children: [aa && /* @__PURE__ */ y.jsx(ox, {
      enableColorScheme: r
    }), !aa && !r && /* @__PURE__ */ y.jsx("span", {
      className: Qo,
      style: {
        display: "none"
      }
    }), n]
  });
}
process.env.NODE_ENV !== "production" && (ac.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * You can wrap a node.
   */
  children: s.node,
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  enableColorScheme: s.bool
});
const ix = {
  parse: (e) => e,
  stringify: (e) => e
}, no = /* @__PURE__ */ new Map();
function sx(e, t) {
  let n = no.get(e);
  n || (n = /* @__PURE__ */ new Set(), no.set(e, n)), n.add(t);
}
function ax(e, t) {
  const n = no.get(e);
  n && (n.delete(t), n.size === 0 && no.delete(e));
}
function Jf(e) {
  const t = no.get(e);
  t && t.forEach((n) => n());
}
if (typeof window < "u") {
  const e = window.localStorage.setItem;
  window.localStorage.setItem = function(n, r) {
    const o = e.call(this, n, r);
    return Jf(n), o;
  };
}
function cx(e, t, n) {
  if (!t)
    return () => {
    };
  const r = (o) => {
    o.storageArea === e && o.key === t && n();
  };
  return window.addEventListener("storage", r), sx(t, n), () => {
    window.removeEventListener("storage", r), ax(t, n);
  };
}
function lx(e, t) {
  if (!t)
    return null;
  try {
    return e.getItem(t);
  } catch {
    return null;
  }
}
function ux(e, t, n) {
  if (t) {
    try {
      n === null ? e.removeItem(t) : e.setItem(t, String(n));
    } catch {
      return;
    }
    Jf(t);
  }
}
const dx = [null, () => {
}];
function fx() {
  return dx;
}
function zl(e, t) {
  return t === null ? null : e.stringify(t);
}
function px(e, t) {
  return t === null ? null : e.parse(t);
}
const hx = () => null;
function mx(e, t, n = null, r) {
  const o = (r == null ? void 0 : r.codec) ?? ix, [i] = v.useState(n), a = v.useMemo(() => zl(o, i), [o, i]), c = v.useCallback((m) => cx(e, t, m), [e, t]), l = v.useCallback(() => lx(e, t) ?? a, [e, a, t]), u = v.useSyncExternalStore(c, l, hx), d = v.useMemo(() => px(o, u), [o, u]), f = v.useCallback((m) => {
    const p = m instanceof Function ? m(d) : m, g = zl(o, p);
    ux(e, t, g);
  }, [e, o, d, t]), [h, b] = v.useState(i);
  return t ? [d, f] : [h, b];
}
const gx = (...e) => mx(window.localStorage, ...e), yx = typeof window > "u" ? fx : gx;
var Wl, Hl, ql;
const vx = "data-toolpad-color-scheme", Gl = "toolpad-color-scheme", ca = "toolpad-mode";
function Zf(e) {
  return Cd("(prefers-color-scheme: dark)", e && {
    matchMedia: e.matchMedia
  }) ? "dark" : "light";
}
function cc(e) {
  return "vars" in e;
}
function bx(e) {
  const {
    children: t,
    theme: n,
    window: r
  } = e;
  to(!cc(n), "This provider only accepts legacy themes.");
  const o = "light" in n || "dark" in n, i = Zf(r), [a, c] = yx(ca, "system"), l = !a || a === "system" ? i : a, u = v.useMemo(() => o ? n[l === "dark" ? "dark" : "light"] ?? n[l === "dark" ? "light" : "dark"] : n, [o, l, n]), d = v.useMemo(() => ({
    paletteMode: l,
    setPaletteMode: c,
    isDualTheme: o
  }), [o, l, c]);
  return /* @__PURE__ */ y.jsx(Tf, {
    theme: u,
    children: /* @__PURE__ */ y.jsxs(sc.Provider, {
      value: d,
      children: [Wl || (Wl = /* @__PURE__ */ y.jsx(ac, {
        enableColorScheme: !0
      })), t]
    })
  });
}
function xx(e) {
  const {
    children: t,
    window: n
  } = e, r = Zf(n), {
    mode: o,
    setMode: i,
    allColorSchemes: a
  } = mv(), c = v.useMemo(() => ({
    paletteMode: !o || o === "system" ? r : o,
    setPaletteMode: i,
    isDualTheme: a.length > 1
  }), [a, o, r, i]);
  return /* @__PURE__ */ y.jsx(sc.Provider, {
    value: c,
    children: t
  });
}
function Ex(e) {
  const {
    children: t,
    theme: n,
    window: r
  } = e;
  return to(cc(n), "This provider only accepts CSS vars themes."), /* @__PURE__ */ y.jsxs(Tf, {
    theme: n,
    documentNode: r == null ? void 0 : r.document,
    colorSchemeNode: r == null ? void 0 : r.document.documentElement,
    disableNestedContext: !0,
    colorSchemeStorageKey: Gl,
    modeStorageKey: ca,
    children: [Hl || (Hl = /* @__PURE__ */ y.jsx(pv, {
      attribute: vx,
      colorSchemeStorageKey: Gl,
      modeStorageKey: ca
    })), /* @__PURE__ */ y.jsxs(xx, {
      window: r,
      children: [ql || (ql = /* @__PURE__ */ y.jsx(ac, {
        enableColorScheme: !0
      })), t]
    })]
  });
}
function Sx(e) {
  const {
    children: t,
    theme: n,
    ...r
  } = e;
  return cc(n) ? /* @__PURE__ */ y.jsx(Ex, {
    theme: n,
    ...r,
    children: t
  }) : /* @__PURE__ */ y.jsx(bx, {
    theme: n,
    ...r,
    children: t
  });
}
const Ki = /* @__PURE__ */ v.createContext(null), lc = /* @__PURE__ */ v.createContext(null);
function wx() {
  return zi({
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme"
    },
    colorSchemes: {
      dark: !0
    }
  });
}
function Qf(e) {
  const {
    children: t,
    theme: n = wx(),
    branding: r = null,
    navigation: o = [],
    router: i = null,
    authentication: a = null,
    session: c = null,
    window: l
  } = e;
  return /* @__PURE__ */ y.jsx(Kf.Provider, {
    value: l,
    children: /* @__PURE__ */ y.jsx(Ki.Provider, {
      value: a,
      children: /* @__PURE__ */ y.jsx(lc.Provider, {
        value: c,
        children: /* @__PURE__ */ y.jsx(Yi.Provider, {
          value: i,
          children: /* @__PURE__ */ y.jsx(Sx, {
            theme: n,
            window: l,
            children: /* @__PURE__ */ y.jsx($v, {
              children: /* @__PURE__ */ y.jsx(ex, {
                children: /* @__PURE__ */ y.jsx(oc.Provider, {
                  value: r,
                  children: /* @__PURE__ */ y.jsx(ic.Provider, {
                    value: o,
                    children: t
                  })
                })
              })
            })
          })
        })
      })
    })
  });
}
process.env.NODE_ENV !== "production" && (Qf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Authentication methods.
   * @default null
   */
  authentication: s.shape({
    signIn: s.func.isRequired,
    signOut: s.func.isRequired
  }),
  /**
   * Branding options for the app.
   * @default null
   */
  branding: s.shape({
    logo: s.node,
    title: s.string
  }),
  /**
   * The content of the app provider.
   */
  children: s.node,
  /**
   * Navigation definition for the app.
   * @default []
   */
  navigation: s.arrayOf(s.oneOfType([s.shape({
    action: s.node,
    children: s.arrayOf(s.oneOfType([s.object, s.shape({
      kind: s.oneOf(["header"]).isRequired,
      title: s.string.isRequired
    }), s.shape({
      kind: s.oneOf(["divider"]).isRequired
    })]).isRequired),
    icon: s.node,
    kind: s.oneOf(["page"]),
    pattern: s.string,
    segment: s.string,
    title: s.string
  }), s.shape({
    kind: s.oneOf(["header"]).isRequired,
    title: s.string.isRequired
  }), s.shape({
    kind: s.oneOf(["divider"]).isRequired
  })]).isRequired),
  /**
   * Router implementation used inside Toolpad components.
   * @default null
   */
  router: s.shape({
    navigate: s.func.isRequired,
    pathname: s.string.isRequired,
    searchParams: s.instanceOf(URLSearchParams).isRequired
  }),
  /**
   * Session info about the current user.
   * @default null
   */
  session: s.shape({
    user: s.shape({
      email: s.string,
      id: s.string,
      image: s.string,
      name: s.string
    })
  }),
  /**
   * [Theme or themes](https://mui.com/toolpad/core/react-app-provider/#theming) to be used by the app in light/dark mode. A [CSS variables theme](https://mui.com/material-ui/customization/css-theme-variables/overview/) is recommended.
   * @default createTheme()
   */
  theme: s.object,
  /**
   * The window where the application is rendered.
   * This is needed when rendering the app inside an iframe, for example.
   * @default window
   */
  window: s.object
});
function Cx(e) {
  return we("MuiAppBar", e);
}
Te("MuiAppBar", ["root", "positionFixed", "positionAbsolute", "positionSticky", "positionStatic", "positionRelative", "colorDefault", "colorPrimary", "colorSecondary", "colorInherit", "colorTransparent", "colorError", "colorInfo", "colorSuccess", "colorWarning"]);
const Tx = (e) => {
  const {
    color: t,
    position: n,
    classes: r
  } = e, o = {
    root: ["root", `color${le(t)}`, `position${le(n)}`]
  };
  return Pe(o, Cx, r);
}, Yl = (e, t) => e ? `${e == null ? void 0 : e.replace(")", "")}, ${t})` : t, Ox = se(Hi, {
  name: "MuiAppBar",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[`position${le(n.position)}`], t[`color${le(n.color)}`]];
  }
})(Fe(({
  theme: e
}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  boxSizing: "border-box",
  // Prevent padding issue with the Modal and fixed positioned AppBar.
  flexShrink: 0,
  variants: [{
    props: {
      position: "fixed"
    },
    style: {
      position: "fixed",
      zIndex: (e.vars || e).zIndex.appBar,
      top: 0,
      left: "auto",
      right: 0,
      "@media print": {
        // Prevent the app bar to be visible on each printed page.
        position: "absolute"
      }
    }
  }, {
    props: {
      position: "absolute"
    },
    style: {
      position: "absolute",
      zIndex: (e.vars || e).zIndex.appBar,
      top: 0,
      left: "auto",
      right: 0
    }
  }, {
    props: {
      position: "sticky"
    },
    style: {
      position: "sticky",
      zIndex: (e.vars || e).zIndex.appBar,
      top: 0,
      left: "auto",
      right: 0
    }
  }, {
    props: {
      position: "static"
    },
    style: {
      position: "static"
    }
  }, {
    props: {
      position: "relative"
    },
    style: {
      position: "relative"
    }
  }, {
    props: {
      color: "inherit"
    },
    style: {
      "--AppBar-color": "inherit"
    }
  }, {
    props: {
      color: "default"
    },
    style: {
      "--AppBar-background": e.vars ? e.vars.palette.AppBar.defaultBg : e.palette.grey[100],
      "--AppBar-color": e.vars ? e.vars.palette.text.primary : e.palette.getContrastText(e.palette.grey[100]),
      ...e.applyStyles("dark", {
        "--AppBar-background": e.vars ? e.vars.palette.AppBar.defaultBg : e.palette.grey[900],
        "--AppBar-color": e.vars ? e.vars.palette.text.primary : e.palette.getContrastText(e.palette.grey[900])
      })
    }
  }, ...Object.entries(e.palette).filter(cr(["contrastText"])).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      "--AppBar-background": (e.vars ?? e).palette[t].main,
      "--AppBar-color": (e.vars ?? e).palette[t].contrastText
    }
  })), {
    props: (t) => t.enableColorOnDark === !0 && !["inherit", "transparent"].includes(t.color),
    style: {
      backgroundColor: "var(--AppBar-background)",
      color: "var(--AppBar-color)"
    }
  }, {
    props: (t) => t.enableColorOnDark === !1 && !["inherit", "transparent"].includes(t.color),
    style: {
      backgroundColor: "var(--AppBar-background)",
      color: "var(--AppBar-color)",
      ...e.applyStyles("dark", {
        backgroundColor: e.vars ? Yl(e.vars.palette.AppBar.darkBg, "var(--AppBar-background)") : null,
        color: e.vars ? Yl(e.vars.palette.AppBar.darkColor, "var(--AppBar-color)") : null
      })
    }
  }, {
    props: {
      color: "transparent"
    },
    style: {
      "--AppBar-background": "transparent",
      "--AppBar-color": "inherit",
      backgroundColor: "var(--AppBar-background)",
      color: "var(--AppBar-color)",
      ...e.applyStyles("dark", {
        backgroundImage: "none"
      })
    }
  }]
}))), ep = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiAppBar"
  }), {
    className: o,
    color: i = "primary",
    enableColorOnDark: a = !1,
    position: c = "fixed",
    ...l
  } = r, u = {
    ...r,
    color: i,
    position: c,
    enableColorOnDark: a
  }, d = Tx(u);
  return /* @__PURE__ */ y.jsx(Ox, {
    square: !0,
    component: "header",
    ownerState: u,
    elevation: 4,
    className: ie(d.root, o, c === "fixed" && "mui-fixed"),
    ref: n,
    ...l
  });
});
process.env.NODE_ENV !== "production" && (ep.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: s.oneOfType([s.oneOf(["default", "inherit", "primary", "secondary", "transparent", "error", "info", "success", "warning"]), s.string]),
  /**
   * If true, the `color` prop is applied in dark mode.
   * @default false
   */
  enableColorOnDark: s.bool,
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position: s.oneOf(["absolute", "fixed", "relative", "static", "sticky"]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const Rx = Te("MuiBox", ["root"]), kx = zi(), on = Fd({
  themeId: At,
  defaultTheme: kx,
  defaultClassName: Rx.root,
  generateClassName: $a.generate
});
process.env.NODE_ENV !== "production" && (on.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: s.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
function Px(e) {
  const t = $t(e);
  return t.body === e ? pn(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Hr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Kl(e) {
  return parseInt(pn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Nx(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].includes(e.tagName), r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Xl(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (a) => {
    const c = !i.includes(a), l = !Nx(a);
    c && l && Hr(a, o);
  });
}
function Cs(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function jx(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Px(r)) {
      const a = ay(pn(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Kl(r) + a}px`;
      const c = $t(r).querySelectorAll(".mui-fixed");
      [].forEach.call(c, (l) => {
        n.push({
          value: l.style.paddingRight,
          property: "padding-right",
          el: l
        }), l.style.paddingRight = `${Kl(l) + a}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = $t(r).body;
    else {
      const a = r.parentElement, c = pn(r);
      i = (a == null ? void 0 : a.nodeName) === "HTML" && c.getComputedStyle(a).overflowY === "scroll" ? a : r;
    }
    n.push({
      value: i.style.overflow,
      property: "overflow",
      el: i
    }, {
      value: i.style.overflowX,
      property: "overflow-x",
      el: i
    }, {
      value: i.style.overflowY,
      property: "overflow-y",
      el: i
    }), i.style.overflow = "hidden";
  }
  return () => {
    n.forEach(({
      value: i,
      el: a,
      property: c
    }) => {
      i ? a.style.setProperty(c, i) : a.style.removeProperty(c);
    });
  };
}
function Ax(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Ix {
  constructor() {
    this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && Hr(t.modalRef, !1);
    const o = Ax(n);
    Xl(n, t.mount, t.modalRef, o, !0);
    const i = Cs(this.containers, (a) => a.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Cs(this.containers, (i) => i.modals.includes(t)), o = this.containers[r];
    o.restore || (o.restore = jx(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Cs(this.containers, (a) => a.modals.includes(t)), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && Hr(t.modalRef, n), Xl(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const a = i.modals[i.modals.length - 1];
      a.modalRef && Hr(a.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
const $x = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function _x(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Mx(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Dx(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Mx(e));
}
function Lx(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll($x)).forEach((r, o) => {
    const i = _x(r);
    i === -1 || !Dx(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Bx() {
  return !0;
}
function vi(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Lx,
    isEnabled: a = Bx,
    open: c
  } = e, l = v.useRef(!1), u = v.useRef(null), d = v.useRef(null), f = v.useRef(null), h = v.useRef(null), b = v.useRef(!1), m = v.useRef(null), p = et(gr(t), m), g = v.useRef(null);
  v.useEffect(() => {
    !c || !m.current || (b.current = !n);
  }, [n, c]), v.useEffect(() => {
    if (!c || !m.current)
      return;
    const w = $t(m.current);
    return m.current.contains(w.activeElement) || (m.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), m.current.setAttribute("tabIndex", "-1")), b.current && m.current.focus()), () => {
      o || (f.current && f.current.focus && (l.current = !0, f.current.focus()), f.current = null);
    };
  }, [c]), v.useEffect(() => {
    if (!c || !m.current)
      return;
    const w = $t(m.current), E = (R) => {
      g.current = R, !(r || !a() || R.key !== "Tab") && w.activeElement === m.current && R.shiftKey && (l.current = !0, d.current && d.current.focus());
    }, S = () => {
      var j, x;
      const R = m.current;
      if (R === null)
        return;
      if (!w.hasFocus() || !a() || l.current) {
        l.current = !1;
        return;
      }
      if (R.contains(w.activeElement) || r && w.activeElement !== u.current && w.activeElement !== d.current)
        return;
      if (w.activeElement !== h.current)
        h.current = null;
      else if (h.current !== null)
        return;
      if (!b.current)
        return;
      let N = [];
      if ((w.activeElement === u.current || w.activeElement === d.current) && (N = i(m.current)), N.length > 0) {
        const P = !!((j = g.current) != null && j.shiftKey && ((x = g.current) == null ? void 0 : x.key) === "Tab"), L = N[0], _ = N[N.length - 1];
        typeof L != "string" && typeof _ != "string" && (P ? _.focus() : L.focus());
      } else
        R.focus();
    };
    w.addEventListener("focusin", S), w.addEventListener("keydown", E, !0);
    const O = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && S();
    }, 50);
    return () => {
      clearInterval(O), w.removeEventListener("focusin", S), w.removeEventListener("keydown", E, !0);
    };
  }, [n, r, o, a, c, i]);
  const C = (w) => {
    f.current === null && (f.current = w.relatedTarget), b.current = !0, h.current = w.target;
    const E = t.props.onFocus;
    E && E(w);
  }, T = (w) => {
    f.current === null && (f.current = w.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ y.jsxs(v.Fragment, {
    children: [/* @__PURE__ */ y.jsx("div", {
      tabIndex: c ? 0 : -1,
      onFocus: T,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ v.cloneElement(t, {
      ref: p,
      onFocus: C
    }), /* @__PURE__ */ y.jsx("div", {
      tabIndex: c ? 0 : -1,
      onFocus: T,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (vi.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: Dn,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: s.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: s.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: s.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: s.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: s.func,
  /**
   * If `true`, focus is locked.
   */
  open: s.bool.isRequired
});
process.env.NODE_ENV !== "production" && (vi.propTypes = Fi(vi.propTypes));
const Fx = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, tp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = yn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: a = !0,
    children: c,
    easing: l,
    in: u,
    onEnter: d,
    onEntered: f,
    onEntering: h,
    onExit: b,
    onExited: m,
    onExiting: p,
    style: g,
    timeout: C = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: T = Pt,
    ...w
  } = t, E = v.useRef(null), S = et(E, gr(c), n), O = (V) => (M) => {
    if (V) {
      const D = E.current;
      M === void 0 ? V(D) : V(D, M);
    }
  }, R = O(h), N = O((V, M) => {
    rc(V);
    const D = hn({
      style: g,
      timeout: C,
      easing: l
    }, {
      mode: "enter"
    });
    V.style.webkitTransition = r.transitions.create("opacity", D), V.style.transition = r.transitions.create("opacity", D), d && d(V, M);
  }), j = O(f), x = O(p), P = O((V) => {
    const M = hn({
      style: g,
      timeout: C,
      easing: l
    }, {
      mode: "exit"
    });
    V.style.webkitTransition = r.transitions.create("opacity", M), V.style.transition = r.transitions.create("opacity", M), b && b(V);
  }), L = O(m), _ = (V) => {
    i && i(E.current, V);
  };
  return /* @__PURE__ */ y.jsx(T, {
    appear: a,
    in: u,
    nodeRef: E,
    onEnter: N,
    onEntered: j,
    onEntering: R,
    onExit: P,
    onExited: L,
    onExiting: x,
    addEndListener: _,
    timeout: C,
    ...w,
    children: (V, {
      ownerState: M,
      ...D
    }) => /* @__PURE__ */ v.cloneElement(c, {
      style: {
        opacity: 0,
        visibility: V === "exited" && !u ? "hidden" : void 0,
        ...Fx[V],
        ...g,
        ...c.props.style
      },
      ref: S,
      ...D
    })
  });
});
process.env.NODE_ENV !== "production" && (tp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: s.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: s.bool,
  /**
   * A single child content element.
   */
  children: Dn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: s.oneOfType([s.shape({
    enter: s.string,
    exit: s.string
  }), s.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: s.bool,
  /**
   * @ignore
   */
  onEnter: s.func,
  /**
   * @ignore
   */
  onEntered: s.func,
  /**
   * @ignore
   */
  onEntering: s.func,
  /**
   * @ignore
   */
  onExit: s.func,
  /**
   * @ignore
   */
  onExited: s.func,
  /**
   * @ignore
   */
  onExiting: s.func,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: s.oneOfType([s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
function Vx(e) {
  return we("MuiBackdrop", e);
}
Te("MuiBackdrop", ["root", "invisible"]);
const Ux = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return Pe({
    root: ["root", n && "invisible"]
  }, Vx, t);
}, zx = se("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.invisible && t.invisible];
  }
})({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent",
  variants: [{
    props: {
      invisible: !0
    },
    style: {
      backgroundColor: "transparent"
    }
  }]
}), np = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: o,
    className: i,
    component: a = "div",
    invisible: c = !1,
    open: l,
    components: u = {},
    componentsProps: d = {},
    slotProps: f = {},
    slots: h = {},
    TransitionComponent: b,
    transitionDuration: m,
    ...p
  } = r, g = {
    ...r,
    component: a,
    invisible: c
  }, C = Ux(g), T = {
    transition: b,
    root: u.Root,
    ...h
  }, w = {
    ...d,
    ...f
  }, E = {
    slots: T,
    slotProps: w
  }, [S, O] = mt("root", {
    elementType: zx,
    externalForwardedProps: E,
    className: ie(C.root, i),
    ownerState: g
  }), [R, N] = mt("transition", {
    elementType: tp,
    externalForwardedProps: E,
    ownerState: g
  });
  return /* @__PURE__ */ y.jsx(R, {
    in: l,
    timeout: m,
    ...p,
    ...N,
    children: /* @__PURE__ */ y.jsx(S, {
      "aria-hidden": !0,
      ...O,
      classes: C,
      ref: n,
      children: o
    })
  });
});
process.env.NODE_ENV !== "production" && (np.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside.
   *
   * @deprecated Use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: s.shape({
    Root: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: s.shape({
    root: s.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: s.bool,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: s.shape({
    root: s.oneOfType([s.func, s.object]),
    transition: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: s.shape({
    root: s.elementType,
    transition: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   * @deprecated Use `slots.transition` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionComponent: s.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: s.oneOfType([s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
function Wx(e) {
  return typeof e == "function" ? e() : e;
}
function Hx(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Jl = () => {
}, Fo = new Ix();
function qx(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    closeAfterTransition: o = !1,
    onTransitionEnter: i,
    onTransitionExited: a,
    children: c,
    onClose: l,
    open: u,
    rootRef: d
  } = e, f = v.useRef({}), h = v.useRef(null), b = v.useRef(null), m = et(b, d), [p, g] = v.useState(!u), C = Hx(c);
  let T = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (T = !1);
  const w = () => $t(h.current), E = () => (f.current.modalRef = b.current, f.current.mount = h.current, f.current), S = () => {
    Fo.mount(E(), {
      disableScrollLock: r
    }), b.current && (b.current.scrollTop = 0);
  }, O = ln(() => {
    const M = Wx(t) || w().body;
    Fo.add(E(), M), b.current && S();
  }), R = () => Fo.isTopModal(E()), N = ln((M) => {
    h.current = M, M && (u && R() ? S() : b.current && Hr(b.current, T));
  }), j = v.useCallback(() => {
    Fo.remove(E(), T);
  }, [T]);
  v.useEffect(() => () => {
    j();
  }, [j]), v.useEffect(() => {
    u ? O() : (!C || !o) && j();
  }, [u, j, C, o, O]);
  const x = (M) => (D) => {
    var W;
    (W = M.onKeyDown) == null || W.call(M, D), !(D.key !== "Escape" || D.which === 229 || // Wait until IME is settled.
    !R()) && (n || (D.stopPropagation(), l && l(D, "escapeKeyDown")));
  }, P = (M) => (D) => {
    var W;
    (W = M.onClick) == null || W.call(M, D), D.target === D.currentTarget && l && l(D, "backdropClick");
  };
  return {
    getRootProps: (M = {}) => {
      const D = sf(e);
      delete D.onTransitionEnter, delete D.onTransitionExited;
      const W = {
        ...D,
        ...M
      };
      return {
        /*
         * Marking an element with the role presentation indicates to assistive technology
         * that this element should be ignored; it exists to support the web application and
         * is not meant for humans to interact with directly.
         * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
         */
        role: "presentation",
        ...W,
        onKeyDown: x(W),
        ref: m
      };
    },
    getBackdropProps: (M = {}) => {
      const D = M;
      return {
        "aria-hidden": !0,
        ...D,
        onClick: P(D),
        open: u
      };
    },
    getTransitionProps: () => {
      const M = () => {
        g(!1), i && i();
      }, D = () => {
        g(!0), a && a(), o && j();
      };
      return {
        onEnter: al(M, (c == null ? void 0 : c.props.onEnter) ?? Jl),
        onExited: al(D, (c == null ? void 0 : c.props.onExited) ?? Jl)
      };
    },
    rootRef: m,
    portalRef: N,
    isTopModal: R,
    exited: p,
    hasTransition: C
  };
}
function Gx(e) {
  return we("MuiModal", e);
}
Te("MuiModal", ["root", "hidden", "backdrop"]);
const Yx = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return Pe({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, Gx, r);
}, Kx = se("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.open && n.exited && t.hidden];
  }
})(Fe(({
  theme: e
}) => ({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  variants: [{
    props: ({
      ownerState: t
    }) => !t.open && t.exited,
    style: {
      visibility: "hidden"
    }
  }]
}))), Xx = se(np, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), uc = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: o = Xx,
    BackdropProps: i,
    classes: a,
    className: c,
    closeAfterTransition: l = !1,
    children: u,
    container: d,
    component: f,
    components: h = {},
    componentsProps: b = {},
    disableAutoFocus: m = !1,
    disableEnforceFocus: p = !1,
    disableEscapeKeyDown: g = !1,
    disablePortal: C = !1,
    disableRestoreFocus: T = !1,
    disableScrollLock: w = !1,
    hideBackdrop: E = !1,
    keepMounted: S = !1,
    onBackdropClick: O,
    onClose: R,
    onTransitionEnter: N,
    onTransitionExited: j,
    open: x,
    slotProps: P = {},
    slots: L = {},
    // eslint-disable-next-line react/prop-types
    theme: _,
    ...V
  } = r, M = {
    ...r,
    closeAfterTransition: l,
    disableAutoFocus: m,
    disableEnforceFocus: p,
    disableEscapeKeyDown: g,
    disablePortal: C,
    disableRestoreFocus: T,
    disableScrollLock: w,
    hideBackdrop: E,
    keepMounted: S
  }, {
    getRootProps: D,
    getBackdropProps: W,
    getTransitionProps: H,
    portalRef: X,
    isTopModal: A,
    exited: U,
    hasTransition: Q
  } = qx({
    ...M,
    rootRef: n
  }), ee = {
    ...M,
    exited: U
  }, q = Yx(ee), K = {};
  if (u.props.tabIndex === void 0 && (K.tabIndex = "-1"), Q) {
    const {
      onEnter: B,
      onExited: pe
    } = H();
    K.onEnter = B, K.onExited = pe;
  }
  const F = {
    ...V,
    slots: {
      root: h.Root,
      backdrop: h.Backdrop,
      ...L
    },
    slotProps: {
      ...b,
      ...P
    }
  }, [J, Z] = mt("root", {
    elementType: Kx,
    externalForwardedProps: F,
    getSlotProps: D,
    additionalProps: {
      ref: n,
      as: f
    },
    ownerState: ee,
    className: ie(c, q == null ? void 0 : q.root, !ee.open && ee.exited && (q == null ? void 0 : q.hidden))
  }), [ne, G] = mt("backdrop", {
    elementType: o,
    externalForwardedProps: F,
    additionalProps: i,
    getSlotProps: (B) => W({
      ...B,
      onClick: (pe) => {
        O && O(pe), B != null && B.onClick && B.onClick(pe);
      }
    }),
    className: ie(i == null ? void 0 : i.className, q == null ? void 0 : q.backdrop),
    ownerState: ee
  }), re = et(i == null ? void 0 : i.ref, G.ref);
  return !S && !x && (!Q || U) ? null : /* @__PURE__ */ y.jsx(Qr, {
    ref: X,
    container: d,
    disablePortal: C,
    children: /* @__PURE__ */ y.jsxs(J, {
      ...Z,
      children: [!E && o ? /* @__PURE__ */ y.jsx(ne, {
        ...G,
        ref: re
      }) : null, /* @__PURE__ */ y.jsx(vi, {
        disableEnforceFocus: p,
        disableAutoFocus: m,
        disableRestoreFocus: T,
        isEnabled: A,
        open: x,
        children: /* @__PURE__ */ v.cloneElement(u, K)
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (uc.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: s.elementType,
  /**
   * Props applied to the [`Backdrop`](https://mui.com/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: s.object,
  /**
   * A single child content element.
   */
  children: Dn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: s.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside.
   *
   * @deprecated Use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: s.shape({
    Backdrop: s.elementType,
    Root: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: s.shape({
    backdrop: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: s.oneOfType([Qt, s.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: s.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: s.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: s.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: s.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: s.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: s.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: s.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: s.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: s.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: s.shape({
    backdrop: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    backdrop: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
function Jx(e, t, n) {
  const r = t.getBoundingClientRect(), o = n && n.getBoundingClientRect(), i = pn(t);
  let a;
  if (t.fakeTransform)
    a = t.fakeTransform;
  else {
    const u = i.getComputedStyle(t);
    a = u.getPropertyValue("-webkit-transform") || u.getPropertyValue("transform");
  }
  let c = 0, l = 0;
  if (a && a !== "none" && typeof a == "string") {
    const u = a.split("(")[1].split(")")[0].split(",");
    c = parseInt(u[4], 10), l = parseInt(u[5], 10);
  }
  return e === "left" ? o ? `translateX(${o.right + c - r.left}px)` : `translateX(${i.innerWidth + c - r.left}px)` : e === "right" ? o ? `translateX(-${r.right - o.left - c}px)` : `translateX(-${r.left + r.width - c}px)` : e === "up" ? o ? `translateY(${o.bottom + l - r.top}px)` : `translateY(${i.innerHeight + l - r.top}px)` : o ? `translateY(-${r.top - o.top + r.height - l}px)` : `translateY(-${r.top + r.height - l}px)`;
}
function rp(e) {
  return typeof e == "function" ? e() : e;
}
function Vo(e, t, n) {
  const r = rp(n), o = Jx(e, t, r);
  o && (t.style.webkitTransform = o, t.style.transform = o);
}
const op = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = yn(), o = {
    enter: r.transitions.easing.easeOut,
    exit: r.transitions.easing.sharp
  }, i = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: a,
    appear: c = !0,
    children: l,
    container: u,
    direction: d = "down",
    easing: f = o,
    in: h,
    onEnter: b,
    onEntered: m,
    onEntering: p,
    onExit: g,
    onExited: C,
    onExiting: T,
    style: w,
    timeout: E = i,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: S = Pt,
    ...O
  } = t, R = v.useRef(null), N = et(gr(l), R, n), j = (H) => (X) => {
    H && (X === void 0 ? H(R.current) : H(R.current, X));
  }, x = j((H, X) => {
    Vo(d, H, u), rc(H), b && b(H, X);
  }), P = j((H, X) => {
    const A = hn({
      timeout: E,
      style: w,
      easing: f
    }, {
      mode: "enter"
    });
    H.style.webkitTransition = r.transitions.create("-webkit-transform", {
      ...A
    }), H.style.transition = r.transitions.create("transform", {
      ...A
    }), H.style.webkitTransform = "none", H.style.transform = "none", p && p(H, X);
  }), L = j(m), _ = j(T), V = j((H) => {
    const X = hn({
      timeout: E,
      style: w,
      easing: f
    }, {
      mode: "exit"
    });
    H.style.webkitTransition = r.transitions.create("-webkit-transform", X), H.style.transition = r.transitions.create("transform", X), Vo(d, H, u), g && g(H);
  }), M = j((H) => {
    H.style.webkitTransition = "", H.style.transition = "", C && C(H);
  }), D = (H) => {
    a && a(R.current, H);
  }, W = v.useCallback(() => {
    R.current && Vo(d, R.current, u);
  }, [d, u]);
  return v.useEffect(() => {
    if (h || d === "down" || d === "right")
      return;
    const H = Qd(() => {
      R.current && Vo(d, R.current, u);
    }), X = pn(R.current);
    return X.addEventListener("resize", H), () => {
      H.clear(), X.removeEventListener("resize", H);
    };
  }, [d, h, u]), v.useEffect(() => {
    h || W();
  }, [h, W]), /* @__PURE__ */ y.jsx(S, {
    nodeRef: R,
    onEnter: x,
    onEntered: L,
    onEntering: P,
    onExit: V,
    onExited: M,
    onExiting: _,
    addEndListener: D,
    appear: c,
    in: h,
    timeout: E,
    ...O,
    children: (H, {
      ownerState: X,
      ...A
    }) => /* @__PURE__ */ v.cloneElement(l, {
      ref: N,
      style: {
        visibility: H === "exited" && !h ? "hidden" : void 0,
        ...w,
        ...l.props.style
      },
      ...A
    })
  });
});
process.env.NODE_ENV !== "production" && (op.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: s.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: s.bool,
  /**
   * A single child content element.
   */
  children: Dn.isRequired,
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the container the Slide is transitioning from.
   */
  container: tn(s.oneOfType([Qt, s.func]), (e) => {
    if (e.open) {
      const t = rp(e.container);
      if (t && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `container` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `container` prop provided to the component is invalid.", "It should be an HTML element instance."].join(`
`));
    }
    return null;
  }),
  /**
   * Direction the child node will enter from.
   * @default 'down'
   */
  direction: s.oneOf(["down", "left", "right", "up"]),
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   * @default {
   *   enter: theme.transitions.easing.easeOut,
   *   exit: theme.transitions.easing.sharp,
   * }
   */
  easing: s.oneOfType([s.shape({
    enter: s.string,
    exit: s.string
  }), s.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: s.bool,
  /**
   * @ignore
   */
  onEnter: s.func,
  /**
   * @ignore
   */
  onEntered: s.func,
  /**
   * @ignore
   */
  onEntering: s.func,
  /**
   * @ignore
   */
  onExit: s.func,
  /**
   * @ignore
   */
  onExited: s.func,
  /**
   * @ignore
   */
  onExiting: s.func,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: s.oneOfType([s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
function Zx(e) {
  return we("MuiDrawer", e);
}
Te("MuiDrawer", ["root", "docked", "paper", "paperAnchorLeft", "paperAnchorRight", "paperAnchorTop", "paperAnchorBottom", "paperAnchorDockedLeft", "paperAnchorDockedRight", "paperAnchorDockedTop", "paperAnchorDockedBottom", "modal"]);
const ip = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, (n.variant === "permanent" || n.variant === "persistent") && t.docked, t.modal];
}, Qx = (e) => {
  const {
    classes: t,
    anchor: n,
    variant: r
  } = e, o = {
    root: ["root"],
    docked: [(r === "permanent" || r === "persistent") && "docked"],
    modal: ["modal"],
    paper: ["paper", `paperAnchor${le(n)}`, r !== "temporary" && `paperAnchorDocked${le(n)}`]
  };
  return Pe(o, Zx, t);
}, eE = se(uc, {
  name: "MuiDrawer",
  slot: "Root",
  overridesResolver: ip
})(Fe(({
  theme: e
}) => ({
  zIndex: (e.vars || e).zIndex.drawer
}))), Zl = se("div", {
  shouldForwardProp: Wi,
  name: "MuiDrawer",
  slot: "Docked",
  skipVariantsResolver: !1,
  overridesResolver: ip
})({
  flex: "0 0 auto"
}), tE = se(Hi, {
  name: "MuiDrawer",
  slot: "Paper",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.paper, t[`paperAnchor${le(n.anchor)}`], n.variant !== "temporary" && t[`paperAnchorDocked${le(n.anchor)}`]];
  }
})(Fe(({
  theme: e
}) => ({
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  flex: "1 0 auto",
  zIndex: (e.vars || e).zIndex.drawer,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch",
  // temporary style
  position: "fixed",
  top: 0,
  // We disable the focus ring for mouse, touch and keyboard users.
  // At some point, it would be better to keep it for keyboard users.
  // :focus-ring CSS pseudo-class will help.
  outline: 0,
  variants: [{
    props: {
      anchor: "left"
    },
    style: {
      left: 0
    }
  }, {
    props: {
      anchor: "top"
    },
    style: {
      top: 0,
      left: 0,
      right: 0,
      height: "auto",
      maxHeight: "100%"
    }
  }, {
    props: {
      anchor: "right"
    },
    style: {
      right: 0
    }
  }, {
    props: {
      anchor: "bottom"
    },
    style: {
      top: "auto",
      left: 0,
      bottom: 0,
      right: 0,
      height: "auto",
      maxHeight: "100%"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.anchor === "left" && t.variant !== "temporary",
    style: {
      borderRight: `1px solid ${(e.vars || e).palette.divider}`
    }
  }, {
    props: ({
      ownerState: t
    }) => t.anchor === "top" && t.variant !== "temporary",
    style: {
      borderBottom: `1px solid ${(e.vars || e).palette.divider}`
    }
  }, {
    props: ({
      ownerState: t
    }) => t.anchor === "right" && t.variant !== "temporary",
    style: {
      borderLeft: `1px solid ${(e.vars || e).palette.divider}`
    }
  }, {
    props: ({
      ownerState: t
    }) => t.anchor === "bottom" && t.variant !== "temporary",
    style: {
      borderTop: `1px solid ${(e.vars || e).palette.divider}`
    }
  }]
}))), sp = {
  left: "right",
  right: "left",
  top: "down",
  bottom: "up"
};
function nE(e) {
  return ["left", "right"].includes(e);
}
function rE({
  direction: e
}, t) {
  return e === "rtl" && nE(t) ? sp[t] : t;
}
const ei = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiDrawer"
  }), o = yn(), i = Fa(), a = {
    enter: o.transitions.duration.enteringScreen,
    exit: o.transitions.duration.leavingScreen
  }, {
    anchor: c = "left",
    BackdropProps: l,
    children: u,
    className: d,
    elevation: f = 16,
    hideBackdrop: h = !1,
    ModalProps: {
      BackdropProps: b,
      ...m
    } = {},
    onClose: p,
    open: g = !1,
    PaperProps: C = {},
    SlideProps: T,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: w = op,
    transitionDuration: E = a,
    variant: S = "temporary",
    ...O
  } = r, R = v.useRef(!1);
  v.useEffect(() => {
    R.current = !0;
  }, []);
  const N = rE({
    direction: i ? "rtl" : "ltr"
  }, c), x = {
    ...r,
    anchor: c,
    elevation: f,
    open: g,
    variant: S,
    ...O
  }, P = Qx(x), L = /* @__PURE__ */ y.jsx(tE, {
    elevation: S === "temporary" ? f : 0,
    square: !0,
    ...C,
    className: ie(P.paper, C.className),
    ownerState: x,
    children: u
  });
  if (S === "permanent")
    return /* @__PURE__ */ y.jsx(Zl, {
      className: ie(P.root, P.docked, d),
      ownerState: x,
      ref: n,
      ...O,
      children: L
    });
  const _ = /* @__PURE__ */ y.jsx(w, {
    in: g,
    direction: sp[N],
    timeout: E,
    appear: R.current,
    ...T,
    children: L
  });
  return S === "persistent" ? /* @__PURE__ */ y.jsx(Zl, {
    className: ie(P.root, P.docked, d),
    ownerState: x,
    ref: n,
    ...O,
    children: _
  }) : /* @__PURE__ */ y.jsx(eE, {
    BackdropProps: {
      ...l,
      ...b,
      transitionDuration: E
    },
    className: ie(P.root, P.modal, d),
    open: g,
    ownerState: x,
    onClose: p,
    hideBackdrop: h,
    ref: n,
    ...O,
    ...m,
    children: _
  });
});
process.env.NODE_ENV !== "production" && (ei.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor: s.oneOf(["bottom", "left", "right", "top"]),
  /**
   * @ignore
   */
  BackdropProps: s.object,
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The elevation of the drawer.
   * @default 16
   */
  elevation: rr,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: s.bool,
  /**
   * Props applied to the [`Modal`](https://mui.com/material-ui/api/modal/) element.
   * @default {}
   */
  ModalProps: s.object,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: s.func,
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: s.bool,
  /**
   * Props applied to the [`Paper`](https://mui.com/material-ui/api/paper/) element.
   * @default {}
   */
  PaperProps: s.object,
  /**
   * Props applied to the [`Slide`](https://mui.com/material-ui/api/slide/) element.
   */
  SlideProps: s.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: s.oneOfType([s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })]),
  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant: s.oneOf(["permanent", "persistent", "temporary"])
});
const ct = gf({
  createStyledComponent: se("div", {
    name: "MuiStack",
    slot: "Root",
    overridesResolver: (e, t) => t.root
  }),
  useThemeProps: (e) => Ce({
    props: e,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" && (ct.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: s.oneOfType([s.oneOf(["column-reverse", "column", "row-reverse", "row"]), s.arrayOf(s.oneOf(["column-reverse", "column", "row-reverse", "row"])), s.object]),
  /**
   * Add an element between each child.
   */
  divider: s.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: s.oneOfType([s.arrayOf(s.oneOfType([s.number, s.string])), s.number, s.object, s.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: s.bool
});
function oE(e) {
  return we("MuiToolbar", e);
}
Te("MuiToolbar", ["root", "gutters", "regular", "dense"]);
const iE = (e) => {
  const {
    classes: t,
    disableGutters: n,
    variant: r
  } = e;
  return Pe({
    root: ["root", !n && "gutters", r]
  }, oE, t);
}, sE = se("div", {
  name: "MuiToolbar",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.disableGutters && t.gutters, t[n.variant]];
  }
})(Fe(({
  theme: e
}) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  variants: [{
    props: ({
      ownerState: t
    }) => !t.disableGutters,
    style: {
      paddingLeft: e.spacing(2),
      paddingRight: e.spacing(2),
      [e.breakpoints.up("sm")]: {
        paddingLeft: e.spacing(3),
        paddingRight: e.spacing(3)
      }
    }
  }, {
    props: {
      variant: "dense"
    },
    style: {
      minHeight: 48
    }
  }, {
    props: {
      variant: "regular"
    },
    style: e.mixins.toolbar
  }]
}))), ti = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiToolbar"
  }), {
    className: o,
    component: i = "div",
    disableGutters: a = !1,
    variant: c = "regular",
    ...l
  } = r, u = {
    ...r,
    component: i,
    disableGutters: a,
    variant: c
  }, d = iE(u);
  return /* @__PURE__ */ y.jsx(sE, {
    as: i,
    className: ie(d.root, o),
    ref: n,
    ownerState: u,
    ...l
  });
});
process.env.NODE_ENV !== "production" && (ti.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   * The Toolbar is a flex container, allowing flex item properties to be used to lay out the children.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, disables gutter padding.
   * @default false
   */
  disableGutters: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The variant to use.
   * @default 'regular'
   */
  variant: s.oneOfType([s.oneOf(["dense", "regular"]), s.string])
});
const Ql = Gg({
  themeId: At
}), aE = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu"), cE = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M3 18h13v-2H3zm0-5h10v-2H3zm0-7v2h13V6zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5z"
}), "MenuOpen"), dc = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    children: r,
    href: o,
    onClick: i,
    history: a,
    ...c
  } = t, l = v.useContext(Yi), u = v.useMemo(() => l ? (d) => {
    d.preventDefault();
    const f = new URL(d.currentTarget.href);
    l.navigate(f.pathname, {
      history: a
    }), i == null || i(d);
  } : i, [l, i, a]);
  return /* @__PURE__ */ y.jsx("a", {
    ref: n,
    href: o,
    ...c,
    onClick: u,
    children: r
  });
});
function lE(e) {
  return we("MuiPopover", e);
}
Te("MuiPopover", ["root", "paper"]);
function eu(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function tu(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function nu(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function ni(e) {
  return typeof e == "function" ? e() : e;
}
const uE = (e) => {
  const {
    classes: t
  } = e;
  return Pe({
    root: ["root"],
    paper: ["paper"]
  }, lE, t);
}, dE = se(uc, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), fE = se(Hi, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (e, t) => t.paper
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), ap = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiPopover"
  }), {
    action: o,
    anchorEl: i,
    anchorOrigin: a = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: c,
    anchorReference: l = "anchorEl",
    children: u,
    className: d,
    container: f,
    elevation: h = 8,
    marginThreshold: b = 16,
    open: m,
    PaperProps: p = {},
    slots: g = {},
    slotProps: C = {},
    transformOrigin: T = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: w = eo,
    transitionDuration: E = "auto",
    TransitionProps: {
      onEntering: S,
      ...O
    } = {},
    disableScrollLock: R = !1,
    ...N
  } = r, j = (C == null ? void 0 : C.paper) ?? p, x = v.useRef(), P = {
    ...r,
    anchorOrigin: a,
    anchorReference: l,
    elevation: h,
    marginThreshold: b,
    externalPaperSlotProps: j,
    transformOrigin: T,
    TransitionComponent: w,
    transitionDuration: E,
    TransitionProps: O
  }, L = uE(P), _ = v.useCallback(() => {
    if (l === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (c || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), c;
    const G = ni(i), re = G && G.nodeType === 1 ? G : $t(x.current).body, B = re.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const pe = re.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && pe.top === 0 && pe.left === 0 && pe.right === 0 && pe.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: B.top + eu(B, a.vertical),
      left: B.left + tu(B, a.horizontal)
    };
  }, [i, a.horizontal, a.vertical, c, l]), V = v.useCallback((G) => ({
    vertical: eu(G, T.vertical),
    horizontal: tu(G, T.horizontal)
  }), [T.horizontal, T.vertical]), M = v.useCallback((G) => {
    const re = {
      width: G.offsetWidth,
      height: G.offsetHeight
    }, B = V(re);
    if (l === "none")
      return {
        top: null,
        left: null,
        transformOrigin: nu(B)
      };
    const pe = _();
    let Y = pe.top - B.vertical, ye = pe.left - B.horizontal;
    const Me = Y + re.height, me = ye + re.width, De = pn(ni(i)), Le = De.innerHeight - b, Xe = De.innerWidth - b;
    if (b !== null && Y < b) {
      const $e = Y - b;
      Y -= $e, B.vertical += $e;
    } else if (b !== null && Me > Le) {
      const $e = Me - Le;
      Y -= $e, B.vertical += $e;
    }
    if (process.env.NODE_ENV !== "production" && re.height > Le && re.height && Le && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${re.height - Le}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), b !== null && ye < b) {
      const $e = ye - b;
      ye -= $e, B.horizontal += $e;
    } else if (me > Xe) {
      const $e = me - Xe;
      ye -= $e, B.horizontal += $e;
    }
    return {
      top: `${Math.round(Y)}px`,
      left: `${Math.round(ye)}px`,
      transformOrigin: nu(B)
    };
  }, [i, l, _, V, b]), [D, W] = v.useState(m), H = v.useCallback(() => {
    const G = x.current;
    if (!G)
      return;
    const re = M(G);
    re.top !== null && G.style.setProperty("top", re.top), re.left !== null && (G.style.left = re.left), G.style.transformOrigin = re.transformOrigin, W(!0);
  }, [M]);
  v.useEffect(() => (R && window.addEventListener("scroll", H), () => window.removeEventListener("scroll", H)), [i, R, H]);
  const X = (G, re) => {
    S && S(G, re), H();
  }, A = () => {
    W(!1);
  };
  v.useEffect(() => {
    m && H();
  }), v.useImperativeHandle(o, () => m ? {
    updatePosition: () => {
      H();
    }
  } : null, [m, H]), v.useEffect(() => {
    if (!m)
      return;
    const G = Qd(() => {
      H();
    }), re = pn(i);
    return re.addEventListener("resize", G), () => {
      G.clear(), re.removeEventListener("resize", G);
    };
  }, [i, m, H]);
  let U = E;
  E === "auto" && !w.muiSupportAuto && (U = void 0);
  const Q = f || (i ? $t(ni(i)).body : void 0), ee = {
    slots: g,
    slotProps: {
      ...C,
      paper: j
    }
  }, [q, K] = mt("paper", {
    elementType: fE,
    externalForwardedProps: ee,
    additionalProps: {
      elevation: h,
      className: ie(L.paper, j == null ? void 0 : j.className),
      style: D ? j.style : {
        ...j.style,
        opacity: 0
      }
    },
    ownerState: P
  }), [F, {
    slotProps: J,
    ...Z
  }] = mt("root", {
    elementType: dE,
    externalForwardedProps: ee,
    additionalProps: {
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: Q,
      open: m
    },
    ownerState: P,
    className: ie(L.root, d)
  }), ne = et(x, K.ref);
  return /* @__PURE__ */ y.jsx(F, {
    ...Z,
    ...!ia(F) && {
      slotProps: J,
      disableScrollLock: R
    },
    ...N,
    ref: n,
    children: /* @__PURE__ */ y.jsx(w, {
      appear: !0,
      in: m,
      onEntering: X,
      onExited: A,
      timeout: U,
      ...O,
      children: /* @__PURE__ */ y.jsx(q, {
        ...K,
        ref: ne,
        children: u
      })
    })
  });
});
process.env.NODE_ENV !== "production" && (ap.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Vi,
  /**
   * An HTML element, [PopoverVirtualElement](https://mui.com/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: tn(s.oneOfType([Qt, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = ni(e.anchorEl);
      if (t && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", `It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`));
    }
    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: s.shape({
    horizontal: s.oneOfType([s.oneOf(["center", "left", "right"]), s.number]).isRequired,
    vertical: s.oneOfType([s.oneOf(["bottom", "center", "top"]), s.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: s.shape({
    left: s.number.isRequired,
    top: s.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: s.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slotProps.root.slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slotProps.root.slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: s.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.root.slotProps.backdrop` instead.
   */
  BackdropProps: s.object,
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: s.oneOfType([Qt, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: rr,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: s.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * Props applied to the [`Paper`](https://mui.com/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: s.shape({
    component: go
  }),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: s.shape({
    paper: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: s.shape({
    paper: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: s.shape({
    horizontal: s.oneOfType([s.oneOf(["center", "left", "right"]), s.number]).isRequired,
    vertical: s.oneOfType([s.oneOf(["bottom", "center", "top"]), s.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: s.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object
});
function pE(e) {
  return we("MuiDivider", e);
}
Te("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
const hE = (e) => {
  const {
    absolute: t,
    children: n,
    classes: r,
    flexItem: o,
    light: i,
    orientation: a,
    textAlign: c,
    variant: l
  } = e;
  return Pe({
    root: ["root", t && "absolute", l, i && "light", a === "vertical" && "vertical", o && "flexItem", n && "withChildren", n && a === "vertical" && "withChildrenVertical", c === "right" && a !== "vertical" && "textAlignRight", c === "left" && a !== "vertical" && "textAlignLeft"],
    wrapper: ["wrapper", a === "vertical" && "wrapperVertical"]
  }, pE, r);
}, mE = se("div", {
  name: "MuiDivider",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.absolute && t.absolute, t[n.variant], n.light && t.light, n.orientation === "vertical" && t.vertical, n.flexItem && t.flexItem, n.children && t.withChildren, n.children && n.orientation === "vertical" && t.withChildrenVertical, n.textAlign === "right" && n.orientation !== "vertical" && t.textAlignRight, n.textAlign === "left" && n.orientation !== "vertical" && t.textAlignLeft];
  }
})(Fe(({
  theme: e
}) => ({
  margin: 0,
  // Reset browser default style.
  flexShrink: 0,
  borderWidth: 0,
  borderStyle: "solid",
  borderColor: (e.vars || e).palette.divider,
  borderBottomWidth: "thin",
  variants: [{
    props: {
      absolute: !0
    },
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%"
    }
  }, {
    props: {
      light: !0
    },
    style: {
      borderColor: e.vars ? `rgba(${e.vars.palette.dividerChannel} / 0.08)` : Ve(e.palette.divider, 0.08)
    }
  }, {
    props: {
      variant: "inset"
    },
    style: {
      marginLeft: 72
    }
  }, {
    props: {
      variant: "middle",
      orientation: "horizontal"
    },
    style: {
      marginLeft: e.spacing(2),
      marginRight: e.spacing(2)
    }
  }, {
    props: {
      variant: "middle",
      orientation: "vertical"
    },
    style: {
      marginTop: e.spacing(1),
      marginBottom: e.spacing(1)
    }
  }, {
    props: {
      orientation: "vertical"
    },
    style: {
      height: "100%",
      borderBottomWidth: 0,
      borderRightWidth: "thin"
    }
  }, {
    props: {
      flexItem: !0
    },
    style: {
      alignSelf: "stretch",
      height: "auto"
    }
  }, {
    props: ({
      ownerState: t
    }) => !!t.children,
    style: {
      display: "flex",
      textAlign: "center",
      border: 0,
      borderTopStyle: "solid",
      borderLeftStyle: "solid",
      "&::before, &::after": {
        content: '""',
        alignSelf: "center"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.children && t.orientation !== "vertical",
    style: {
      "&::before, &::after": {
        width: "100%",
        borderTop: `thin solid ${(e.vars || e).palette.divider}`,
        borderTopStyle: "inherit"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.orientation === "vertical" && t.children,
    style: {
      flexDirection: "column",
      "&::before, &::after": {
        height: "100%",
        borderLeft: `thin solid ${(e.vars || e).palette.divider}`,
        borderLeftStyle: "inherit"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.textAlign === "right" && t.orientation !== "vertical",
    style: {
      "&::before": {
        width: "90%"
      },
      "&::after": {
        width: "10%"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.textAlign === "left" && t.orientation !== "vertical",
    style: {
      "&::before": {
        width: "10%"
      },
      "&::after": {
        width: "90%"
      }
    }
  }]
}))), gE = se("span", {
  name: "MuiDivider",
  slot: "Wrapper",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.wrapper, n.orientation === "vertical" && t.wrapperVertical];
  }
})(Fe(({
  theme: e
}) => ({
  display: "inline-block",
  paddingLeft: `calc(${e.spacing(1)} * 1.2)`,
  paddingRight: `calc(${e.spacing(1)} * 1.2)`,
  whiteSpace: "nowrap",
  variants: [{
    props: {
      orientation: "vertical"
    },
    style: {
      paddingTop: `calc(${e.spacing(1)} * 1.2)`,
      paddingBottom: `calc(${e.spacing(1)} * 1.2)`
    }
  }]
}))), ro = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiDivider"
  }), {
    absolute: o = !1,
    children: i,
    className: a,
    orientation: c = "horizontal",
    component: l = i || c === "vertical" ? "div" : "hr",
    flexItem: u = !1,
    light: d = !1,
    role: f = l !== "hr" ? "separator" : void 0,
    textAlign: h = "center",
    variant: b = "fullWidth",
    ...m
  } = r, p = {
    ...r,
    absolute: o,
    component: l,
    flexItem: u,
    light: d,
    orientation: c,
    role: f,
    textAlign: h,
    variant: b
  }, g = hE(p);
  return /* @__PURE__ */ y.jsx(mE, {
    as: l,
    className: ie(g.root, a),
    role: f,
    ref: n,
    ownerState: p,
    "aria-orientation": f === "separator" && (l !== "hr" || c === "vertical") ? c : void 0,
    ...m,
    children: i ? /* @__PURE__ */ y.jsx(gE, {
      className: g.wrapper,
      ownerState: p,
      children: i
    }) : null
  });
});
ro && (ro.muiSkipListHighlight = !0);
process.env.NODE_ENV !== "production" && (ro.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: s.bool,
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: s.bool,
  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   * @deprecated Use <Divider sx={{ opacity: 0.6 }} /> (or any opacity or color) instead. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  light: s.bool,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: s.oneOf(["horizontal", "vertical"]),
  /**
   * @ignore
   */
  role: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: s.oneOf(["center", "left", "right"]),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: s.oneOfType([s.oneOf(["fullWidth", "inset", "middle"]), s.string])
});
const cp = {
  // Account
  signInLabel: "Sign In",
  signOutLabel: "Sign Out",
  // Account Preview
  iconButtonAriaLabel: "Current User"
}, lp = /* @__PURE__ */ v.createContext(cp);
function ru({
  localeText: e,
  children: t
}) {
  const n = v.useMemo(() => ({
    ...cp,
    ...e
  }), [e]);
  return /* @__PURE__ */ y.jsx(lp.Provider, {
    value: n,
    children: t
  });
}
function fc() {
  return v.useContext(lp);
}
function yE(e) {
  const t = v.useContext(Ki), n = fc();
  return /* @__PURE__ */ y.jsx(nc, {
    disableElevation: !0,
    variant: "contained",
    size: "small",
    onClick: t == null ? void 0 : t.signIn,
    sx: {
      textTransform: "capitalize",
      filter: "opacity(0.9)",
      width: "50%",
      margin: (r) => `${r.spacing(1)} auto`,
      transition: "filter 0.2s ease-in",
      "&:hover": {
        filter: "opacity(1)"
      }
    },
    ...e,
    children: (n == null ? void 0 : n.signInLabel) || "Sign In"
  });
}
const up = qe(/* @__PURE__ */ y.jsx("path", {
  d: "m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
}), "Logout");
var ou;
function dp(e) {
  const t = v.useContext(Ki), n = fc();
  return /* @__PURE__ */ y.jsx(nc, {
    disabled: !t,
    variant: "outlined",
    size: "small",
    disableElevation: !0,
    onClick: t == null ? void 0 : t.signOut,
    sx: {
      textTransform: "capitalize",
      fontWeight: "normal",
      filter: "opacity(0.9)",
      transition: "filter 0.2s ease-in",
      "&:hover": {
        filter: "opacity(1)"
      }
    },
    startIcon: ou || (ou = /* @__PURE__ */ y.jsx(up, {})),
    ...e,
    children: n.signOutLabel
  });
}
const vE = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
}), "MoreVert");
var iu;
function bi(e) {
  var d, f, h, b, m, p, g;
  const {
    slots: t,
    variant: n = "condensed",
    slotProps: r,
    open: o,
    handleClick: i,
    sx: a
  } = e, c = v.useContext(lc), l = fc();
  if (!c || !c.user)
    return null;
  const u = t != null && t.avatar ? /* @__PURE__ */ y.jsx(t.avatar, {}) : /* @__PURE__ */ y.jsx(tc, {
    src: ((d = c.user) == null ? void 0 : d.image) || "",
    alt: ((f = c.user) == null ? void 0 : f.name) || ((h = c.user) == null ? void 0 : h.email) || "",
    sx: {
      height: n === "expanded" ? 48 : 32,
      width: n === "expanded" ? 48 : 32
    },
    ...r == null ? void 0 : r.avatar
  });
  return n === "expanded" ? /* @__PURE__ */ y.jsxs(ct, {
    direction: "row",
    justifyContent: "space-between",
    sx: {
      py: 1,
      px: 2,
      gap: 2,
      ...a
    },
    children: [/* @__PURE__ */ y.jsxs(ct, {
      direction: "row",
      justifyContent: "flex-start",
      spacing: 2,
      children: [u, /* @__PURE__ */ y.jsxs(ct, {
        direction: "column",
        justifyContent: "space-evenly",
        children: [/* @__PURE__ */ y.jsx(wt, {
          variant: "body2",
          fontWeight: "bolder",
          noWrap: !0,
          children: (b = c.user) == null ? void 0 : b.name
        }), /* @__PURE__ */ y.jsx(wt, {
          variant: "caption",
          noWrap: !0,
          children: (m = c.user) == null ? void 0 : m.email
        })]
      })]
    }), i && (t != null && t.moreIconButton ? /* @__PURE__ */ y.jsx(t.moreIconButton, {}) : /* @__PURE__ */ y.jsx(Xr, {
      size: "small",
      onClick: i,
      ...r == null ? void 0 : r.moreIconButton,
      sx: {
        alignSelf: "center",
        ...(p = r == null ? void 0 : r.moreIconButton) == null ? void 0 : p.sx
      },
      children: iu || (iu = /* @__PURE__ */ y.jsx(vE, {
        fontSize: "small"
      }))
    }))]
  }) : /* @__PURE__ */ y.jsx(xo, {
    title: c.user.name ?? "Account",
    children: t != null && t.avatarIconButton ? /* @__PURE__ */ y.jsx(t.avatarIconButton, {
      ...r == null ? void 0 : r.avatarIconButton
    }) : /* @__PURE__ */ y.jsx(ct, {
      sx: {
        py: 0.5,
        ...a
      },
      children: /* @__PURE__ */ y.jsx(Xr, {
        onClick: i,
        "aria-label": l.iconButtonAriaLabel || "Current User",
        size: "small",
        "aria-controls": o ? "account-menu" : void 0,
        "aria-haspopup": "true",
        "aria-expanded": o ? "true" : void 0,
        ...r == null ? void 0 : r.avatarIconButton,
        sx: {
          width: "fit-content",
          margin: "0 auto",
          ...(g = r == null ? void 0 : r.avatarIconButton) == null ? void 0 : g.sx
        },
        children: u
      })
    })
  });
}
process.env.NODE_ENV !== "production" && (bi.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The handler used when the preview is expanded
   */
  handleClick: s.func,
  /**
   * The state of the Account popover
   * @default false
   */
  open: s.bool,
  /**
   * The props used for each slot inside.
   */
  slotProps: s.shape({
    avatar: s.object,
    avatarIconButton: s.object,
    moreIconButton: s.object
  }),
  /**
   * The components used for each slot inside.
   */
  slots: s.shape({
    avatar: s.elementType,
    avatarIconButton: s.elementType,
    moreIconButton: s.elementType
  }),
  /**
   * The prop used to customize the styling of the preview
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The type of account details to display.
   * @property {'condensed'} condensed - Shows only the user's avatar.
   * @property {'expanded'} expanded - Displays the user's avatar, name, and email if available.
   * @default 'condensed'
   */
  variant: s.oneOf(["condensed", "expanded"])
});
function bE(e) {
  const {
    children: t,
    ...n
  } = e;
  return /* @__PURE__ */ y.jsx(ct, {
    ...n,
    children: t
  });
}
function fp(e) {
  const {
    children: t,
    ...n
  } = e;
  return /* @__PURE__ */ y.jsx(on, {
    ...n,
    sx: {
      display: "flex",
      flexDirection: "row",
      p: 1,
      justifyContent: "flex-end",
      ...n.sx
    },
    children: t
  });
}
var su, au;
function pc(e) {
  var f;
  const {
    localeText: t
  } = e, {
    slots: n,
    slotProps: r
  } = e, [o, i] = v.useState(null), a = v.useContext(lc), c = v.useContext(Ki), l = !!o, u = (h) => {
    i(h.currentTarget);
  }, d = () => {
    i(null);
  };
  return c ? a != null && a.user ? /* @__PURE__ */ y.jsxs(ru, {
    localeText: t,
    children: [n != null && n.preview ? /* @__PURE__ */ y.jsx(n.preview, {
      handleClick: u,
      open: l
    }) : /* @__PURE__ */ y.jsx(bi, {
      variant: "condensed",
      handleClick: u,
      open: l,
      ...r == null ? void 0 : r.preview
    }), n != null && n.popover ? /* @__PURE__ */ y.jsx(n.popover, {
      open: l,
      onClick: u,
      onClose: d,
      ...r == null ? void 0 : r.popover
    }) : /* @__PURE__ */ y.jsx(ap, {
      anchorEl: o,
      id: "account-menu",
      open: l,
      onClose: d,
      onClick: d,
      transformOrigin: {
        horizontal: "right",
        vertical: "top"
      },
      anchorOrigin: {
        horizontal: "right",
        vertical: "bottom"
      },
      ...r == null ? void 0 : r.popover,
      slotProps: {
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: (h) => `drop-shadow(0px 2px 8px ${h.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"})`,
            mt: 1,
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        },
        ...(f = r == null ? void 0 : r.popover) == null ? void 0 : f.slotProps
      },
      children: n != null && n.popoverContent ? /* @__PURE__ */ y.jsx(n.popoverContent, {
        ...r == null ? void 0 : r.popoverContent
      }) : /* @__PURE__ */ y.jsxs(ct, {
        direction: "column",
        ...r == null ? void 0 : r.popoverContent,
        children: [su || (su = /* @__PURE__ */ y.jsx(bE, {
          children: /* @__PURE__ */ y.jsx(bi, {
            variant: "expanded"
          })
        })), au || (au = /* @__PURE__ */ y.jsx(ro, {})), /* @__PURE__ */ y.jsx(fp, {
          children: /* @__PURE__ */ y.jsx(dp, {
            ...r == null ? void 0 : r.signOutButton
          })
        })]
      })
    })]
  }) : /* @__PURE__ */ y.jsx(ru, {
    localeText: t,
    children: n != null && n.signInButton ? /* @__PURE__ */ y.jsx(n.signInButton, {
      onClick: c.signIn
    }) : /* @__PURE__ */ y.jsx(yE, {
      ...r == null ? void 0 : r.signInButton
    })
  }) : null;
}
process.env.NODE_ENV !== "production" && (pc.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The labels for the account component.
   */
  localeText: s.shape({
    iconButtonAriaLabel: s.string,
    signInLabel: s.string,
    signOutLabel: s.string
  }),
  /**
   * The props used for each slot inside.
   */
  slotProps: s.shape({
    popover: s.object,
    popoverContent: s.object,
    preview: s.shape({
      handleClick: s.func,
      open: s.bool,
      slotProps: s.shape({
        avatar: s.object,
        avatarIconButton: s.object,
        moreIconButton: s.object
      }),
      slots: s.shape({
        avatar: s.elementType,
        avatarIconButton: s.elementType,
        moreIconButton: s.elementType
      }),
      sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
      variant: s.oneOf(["condensed", "expanded"])
    }),
    signInButton: s.object,
    signOutButton: s.object
  }),
  /**
   * The components used for each slot inside.
   */
  slots: s.shape({
    popover: s.elementType,
    popoverContent: s.elementType,
    preview: s.elementType,
    signInButton: s.elementType,
    signOutButton: s.elementType
  })
});
function xE() {
  const e = v.useContext(oc);
  return (e == null ? void 0 : e.title) ?? "Toolpad";
}
function EE(e) {
  return we("MuiCollapse", e);
}
Te("MuiCollapse", ["root", "horizontal", "vertical", "entered", "hidden", "wrapper", "wrapperInner"]);
const SE = (e) => {
  const {
    orientation: t,
    classes: n
  } = e, r = {
    root: ["root", `${t}`],
    entered: ["entered"],
    hidden: ["hidden"],
    wrapper: ["wrapper", `${t}`],
    wrapperInner: ["wrapperInner", `${t}`]
  };
  return Pe(r, EE, n);
}, wE = se("div", {
  name: "MuiCollapse",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.orientation], n.state === "entered" && t.entered, n.state === "exited" && !n.in && n.collapsedSize === "0px" && t.hidden];
  }
})(Fe(({
  theme: e
}) => ({
  height: 0,
  overflow: "hidden",
  transition: e.transitions.create("height"),
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      height: "auto",
      width: 0,
      transition: e.transitions.create("width")
    }
  }, {
    props: {
      state: "entered"
    },
    style: {
      height: "auto",
      overflow: "visible"
    }
  }, {
    props: {
      state: "entered",
      orientation: "horizontal"
    },
    style: {
      width: "auto"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.state === "exited" && !t.in && t.collapsedSize === "0px",
    style: {
      visibility: "hidden"
    }
  }]
}))), CE = se("div", {
  name: "MuiCollapse",
  slot: "Wrapper",
  overridesResolver: (e, t) => t.wrapper
})({
  // Hack to get children with a negative margin to not falsify the height computation.
  display: "flex",
  width: "100%",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      width: "auto",
      height: "100%"
    }
  }]
}), TE = se("div", {
  name: "MuiCollapse",
  slot: "WrapperInner",
  overridesResolver: (e, t) => t.wrapperInner
})({
  width: "100%",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      width: "auto",
      height: "100%"
    }
  }]
}), xi = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiCollapse"
  }), {
    addEndListener: o,
    children: i,
    className: a,
    collapsedSize: c = "0px",
    component: l,
    easing: u,
    in: d,
    onEnter: f,
    onEntered: h,
    onEntering: b,
    onExit: m,
    onExited: p,
    onExiting: g,
    orientation: C = "vertical",
    style: T,
    timeout: w = Ef.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: E = Pt,
    ...S
  } = r, O = {
    ...r,
    orientation: C,
    collapsedSize: c
  }, R = SE(O), N = yn(), j = Tn(), x = v.useRef(null), P = v.useRef(), L = typeof c == "number" ? `${c}px` : c, _ = C === "horizontal", V = _ ? "width" : "height", M = v.useRef(null), D = et(n, M), W = (F) => (J) => {
    if (F) {
      const Z = M.current;
      J === void 0 ? F(Z) : F(Z, J);
    }
  }, H = () => x.current ? x.current[_ ? "clientWidth" : "clientHeight"] : 0, X = W((F, J) => {
    x.current && _ && (x.current.style.position = "absolute"), F.style[V] = L, f && f(F, J);
  }), A = W((F, J) => {
    const Z = H();
    x.current && _ && (x.current.style.position = "");
    const {
      duration: ne,
      easing: G
    } = hn({
      style: T,
      timeout: w,
      easing: u
    }, {
      mode: "enter"
    });
    if (w === "auto") {
      const re = N.transitions.getAutoHeightDuration(Z);
      F.style.transitionDuration = `${re}ms`, P.current = re;
    } else
      F.style.transitionDuration = typeof ne == "string" ? ne : `${ne}ms`;
    F.style[V] = `${Z}px`, F.style.transitionTimingFunction = G, b && b(F, J);
  }), U = W((F, J) => {
    F.style[V] = "auto", h && h(F, J);
  }), Q = W((F) => {
    F.style[V] = `${H()}px`, m && m(F);
  }), ee = W(p), q = W((F) => {
    const J = H(), {
      duration: Z,
      easing: ne
    } = hn({
      style: T,
      timeout: w,
      easing: u
    }, {
      mode: "exit"
    });
    if (w === "auto") {
      const G = N.transitions.getAutoHeightDuration(J);
      F.style.transitionDuration = `${G}ms`, P.current = G;
    } else
      F.style.transitionDuration = typeof Z == "string" ? Z : `${Z}ms`;
    F.style[V] = L, F.style.transitionTimingFunction = ne, g && g(F);
  }), K = (F) => {
    w === "auto" && j.start(P.current || 0, F), o && o(M.current, F);
  };
  return /* @__PURE__ */ y.jsx(E, {
    in: d,
    onEnter: X,
    onEntered: U,
    onEntering: A,
    onExit: Q,
    onExited: ee,
    onExiting: q,
    addEndListener: K,
    nodeRef: M,
    timeout: w === "auto" ? null : w,
    ...S,
    children: (F, {
      ownerState: J,
      ...Z
    }) => /* @__PURE__ */ y.jsx(wE, {
      as: l,
      className: ie(R.root, a, {
        entered: R.entered,
        exited: !d && L === "0px" && R.hidden
      }[F]),
      style: {
        [_ ? "minWidth" : "minHeight"]: L,
        ...T
      },
      ref: D,
      ownerState: {
        ...O,
        state: F
      },
      ...Z,
      children: /* @__PURE__ */ y.jsx(CE, {
        ownerState: {
          ...O,
          state: F
        },
        className: R.wrapper,
        ref: x,
        children: /* @__PURE__ */ y.jsx(TE, {
          ownerState: {
            ...O,
            state: F
          },
          className: R.wrapperInner,
          children: i
        })
      })
    })
  });
});
process.env.NODE_ENV !== "production" && (xi.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: s.func,
  /**
   * The content node to be collapsed.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: s.oneOfType([s.number, s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: go,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: s.oneOfType([s.shape({
    enter: s.string,
    exit: s.string
  }), s.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: s.bool,
  /**
   * @ignore
   */
  onEnter: s.func,
  /**
   * @ignore
   */
  onEntered: s.func,
  /**
   * @ignore
   */
  onEntering: s.func,
  /**
   * @ignore
   */
  onExit: s.func,
  /**
   * @ignore
   */
  onExited: s.func,
  /**
   * @ignore
   */
  onExiting: s.func,
  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: s.oneOf(["horizontal", "vertical"]),
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
xi && (xi.muiSupportAuto = !0);
const Wt = /* @__PURE__ */ v.createContext({});
process.env.NODE_ENV !== "production" && (Wt.displayName = "ListContext");
function OE(e) {
  return we("MuiList", e);
}
Te("MuiList", ["root", "padding", "dense", "subheader"]);
const RE = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return Pe({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, OE, t);
}, kE = se("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.disablePadding && t.padding, n.dense && t.dense, n.subheader && t.subheader];
  }
})({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative",
  variants: [{
    props: ({
      ownerState: e
    }) => !e.disablePadding,
    style: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }, {
    props: ({
      ownerState: e
    }) => e.subheader,
    style: {
      paddingTop: 0
    }
  }]
}), pp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: a = "ul",
    dense: c = !1,
    disablePadding: l = !1,
    subheader: u,
    ...d
  } = r, f = v.useMemo(() => ({
    dense: c
  }), [c]), h = {
    ...r,
    component: a,
    dense: c,
    disablePadding: l
  }, b = RE(h);
  return /* @__PURE__ */ y.jsx(Wt.Provider, {
    value: f,
    children: /* @__PURE__ */ y.jsxs(kE, {
      as: a,
      className: ie(b.root, i),
      ref: n,
      ownerState: h,
      ...d,
      children: [u, o]
    })
  });
});
process.env.NODE_ENV !== "production" && (pp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: s.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: s.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: s.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
function PE(e) {
  return we("MuiListItem", e);
}
Te("MuiListItem", ["root", "container", "dense", "alignItemsFlexStart", "divider", "gutters", "padding", "secondaryAction"]);
function NE(e) {
  return we("MuiListItemButton", e);
}
const er = Te("MuiListItemButton", ["root", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "selected"]), jE = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, n.dense && t.dense, n.alignItems === "flex-start" && t.alignItemsFlexStart, n.divider && t.divider, !n.disableGutters && t.gutters];
}, AE = (e) => {
  const {
    alignItems: t,
    classes: n,
    dense: r,
    disabled: o,
    disableGutters: i,
    divider: a,
    selected: c
  } = e, u = Pe({
    root: ["root", r && "dense", !i && "gutters", a && "divider", o && "disabled", t === "flex-start" && "alignItemsFlexStart", c && "selected"]
  }, NE, n);
  return {
    ...n,
    ...u
  };
}, IE = se(yo, {
  shouldForwardProp: (e) => Wi(e) || e === "classes",
  name: "MuiListItemButton",
  slot: "Root",
  overridesResolver: jE
})(Fe(({
  theme: e
}) => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minWidth: 0,
  boxSizing: "border-box",
  textAlign: "left",
  paddingTop: 8,
  paddingBottom: 8,
  transition: e.transitions.create("background-color", {
    duration: e.transitions.duration.shortest
  }),
  "&:hover": {
    textDecoration: "none",
    backgroundColor: (e.vars || e).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${er.selected}`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Ve(e.palette.primary.main, e.palette.action.selectedOpacity),
    [`&.${er.focusVisible}`]: {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))` : Ve(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.focusOpacity)
    }
  },
  [`&.${er.selected}:hover`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))` : Ve(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Ve(e.palette.primary.main, e.palette.action.selectedOpacity)
    }
  },
  [`&.${er.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${er.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  },
  variants: [{
    props: ({
      ownerState: t
    }) => t.divider,
    style: {
      borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
      backgroundClip: "padding-box"
    }
  }, {
    props: {
      alignItems: "flex-start"
    },
    style: {
      alignItems: "flex-start"
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState: t
    }) => t.dense,
    style: {
      paddingTop: 4,
      paddingBottom: 4
    }
  }]
}))), hp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiListItemButton"
  }), {
    alignItems: o = "center",
    autoFocus: i = !1,
    component: a = "div",
    children: c,
    dense: l = !1,
    disableGutters: u = !1,
    divider: d = !1,
    focusVisibleClassName: f,
    selected: h = !1,
    className: b,
    ...m
  } = r, p = v.useContext(Wt), g = v.useMemo(() => ({
    dense: l || p.dense || !1,
    alignItems: o,
    disableGutters: u
  }), [o, p.dense, l, u]), C = v.useRef(null);
  In(() => {
    i && (C.current ? C.current.focus() : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a ListItemButton whose component has not been rendered."));
  }, [i]);
  const T = {
    ...r,
    alignItems: o,
    dense: g.dense,
    disableGutters: u,
    divider: d,
    selected: h
  }, w = AE(T), E = et(C, n);
  return /* @__PURE__ */ y.jsx(Wt.Provider, {
    value: g,
    children: /* @__PURE__ */ y.jsx(IE, {
      ref: E,
      href: m.href || m.to,
      component: (m.href || m.to) && a === "div" ? "button" : a,
      focusVisibleClassName: ie(w.focusVisible, f),
      ownerState: T,
      className: ie(w.root, b),
      ...m,
      classes: w,
      children: c
    })
  });
});
process.env.NODE_ENV !== "production" && (hp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: s.oneOf(["center", "flex-start"]),
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: s.bool,
  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: s.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: s.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: s.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: s.string,
  /**
   * @ignore
   */
  href: s.string,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
function $E(e) {
  return we("MuiListItemSecondaryAction", e);
}
Te("MuiListItemSecondaryAction", ["root", "disableGutters"]);
const _E = (e) => {
  const {
    disableGutters: t,
    classes: n
  } = e;
  return Pe({
    root: ["root", t && "disableGutters"]
  }, $E, n);
}, ME = se("div", {
  name: "MuiListItemSecondaryAction",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.disableGutters && t.disableGutters];
  }
})({
  position: "absolute",
  right: 16,
  top: "50%",
  transform: "translateY(-50%)",
  variants: [{
    props: ({
      ownerState: e
    }) => e.disableGutters,
    style: {
      right: 0
    }
  }]
}), hc = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiListItemSecondaryAction"
  }), {
    className: o,
    ...i
  } = r, a = v.useContext(Wt), c = {
    ...r,
    disableGutters: a.disableGutters
  }, l = _E(c);
  return /* @__PURE__ */ y.jsx(ME, {
    className: ie(l.root, o),
    ownerState: c,
    ref: n,
    ...i
  });
});
process.env.NODE_ENV !== "production" && (hc.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
hc.muiName = "ListItemSecondaryAction";
const DE = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, n.dense && t.dense, n.alignItems === "flex-start" && t.alignItemsFlexStart, n.divider && t.divider, !n.disableGutters && t.gutters, !n.disablePadding && t.padding, n.hasSecondaryAction && t.secondaryAction];
}, LE = (e) => {
  const {
    alignItems: t,
    classes: n,
    dense: r,
    disableGutters: o,
    disablePadding: i,
    divider: a,
    hasSecondaryAction: c
  } = e;
  return Pe({
    root: ["root", r && "dense", !o && "gutters", !i && "padding", a && "divider", t === "flex-start" && "alignItemsFlexStart", c && "secondaryAction"],
    container: ["container"]
  }, PE, n);
}, BE = se("div", {
  name: "MuiListItem",
  slot: "Root",
  overridesResolver: DE
})(Fe(({
  theme: e
}) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "left",
  variants: [{
    props: ({
      ownerState: t
    }) => !t.disablePadding,
    style: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disablePadding && t.dense,
    style: {
      paddingTop: 4,
      paddingBottom: 4
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disablePadding && !t.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disablePadding && !!t.secondaryAction,
    style: {
      // Add some space to avoid collision as `ListItemSecondaryAction`
      // is absolutely positioned.
      paddingRight: 48
    }
  }, {
    props: ({
      ownerState: t
    }) => !!t.secondaryAction,
    style: {
      [`& > .${er.root}`]: {
        paddingRight: 48
      }
    }
  }, {
    props: {
      alignItems: "flex-start"
    },
    style: {
      alignItems: "flex-start"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.divider,
    style: {
      borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
      backgroundClip: "padding-box"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.button,
    style: {
      transition: e.transitions.create("background-color", {
        duration: e.transitions.duration.shortest
      }),
      "&:hover": {
        textDecoration: "none",
        backgroundColor: (e.vars || e).palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.hasSecondaryAction,
    style: {
      // Add some space to avoid collision as `ListItemSecondaryAction`
      // is absolutely positioned.
      paddingRight: 48
    }
  }]
}))), FE = se("li", {
  name: "MuiListItem",
  slot: "Container",
  overridesResolver: (e, t) => t.container
})({
  position: "relative"
}), mp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiListItem"
  }), {
    alignItems: o = "center",
    children: i,
    className: a,
    component: c,
    components: l = {},
    componentsProps: u = {},
    ContainerComponent: d = "li",
    ContainerProps: {
      className: f,
      ...h
    } = {},
    dense: b = !1,
    disableGutters: m = !1,
    disablePadding: p = !1,
    divider: g = !1,
    secondaryAction: C,
    slotProps: T = {},
    slots: w = {},
    ...E
  } = r, S = v.useContext(Wt), O = v.useMemo(() => ({
    dense: b || S.dense || !1,
    alignItems: o,
    disableGutters: m
  }), [o, S.dense, b, m]), R = v.useRef(null), N = v.Children.toArray(i), j = N.length && ef(N[N.length - 1], ["ListItemSecondaryAction"]), x = {
    ...r,
    alignItems: o,
    dense: O.dense,
    disableGutters: m,
    disablePadding: p,
    divider: g,
    hasSecondaryAction: j
  }, P = LE(x), L = et(R, n), _ = w.root || l.Root || BE, V = T.root || u.root || {}, M = {
    className: ie(P.root, V.className, a),
    ...E
  };
  let D = c || "li";
  return j ? (D = !M.component && !c ? "div" : D, d === "li" && (D === "li" ? D = "div" : M.component === "li" && (M.component = "div")), /* @__PURE__ */ y.jsx(Wt.Provider, {
    value: O,
    children: /* @__PURE__ */ y.jsxs(FE, {
      as: d,
      className: ie(P.container, f),
      ref: L,
      ownerState: x,
      ...h,
      children: [/* @__PURE__ */ y.jsx(_, {
        ...V,
        ...!ia(_) && {
          as: D,
          ownerState: {
            ...x,
            ...V.ownerState
          }
        },
        ...M,
        children: N
      }), N.pop()]
    })
  })) : /* @__PURE__ */ y.jsx(Wt.Provider, {
    value: O,
    children: /* @__PURE__ */ y.jsxs(_, {
      ...V,
      as: D,
      ref: L,
      ...!ia(_) && {
        ownerState: {
          ...x,
          ...V.ownerState
        }
      },
      ...M,
      children: [N, C && /* @__PURE__ */ y.jsx(hc, {
        children: C
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (mp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: s.oneOf(["center", "flex-start"]),
  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: tn(s.node, (e) => {
    const t = v.Children.toArray(e.children);
    let n = -1;
    for (let r = t.length - 1; r >= 0; r -= 1) {
      const o = t[r];
      if (ef(o, ["ListItemSecondaryAction"])) {
        n = r;
        break;
      }
    }
    return n !== -1 && n !== t.length - 1 ? new Error("MUI: You used an element after ListItemSecondaryAction. For ListItem to detect that it has a secondary action you must pass it as the last child to ListItem.") : null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside.
   *
   * @deprecated Use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  components: s.shape({
    Root: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  componentsProps: s.shape({
    root: s.object
  }),
  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   * @deprecated Use the `component` or `slots.root` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ContainerComponent: go,
  /**
   * Props applied to the container component if used.
   * @default {}
   * @deprecated Use the `slotProps.root` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ContainerProps: s.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: s.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: s.bool,
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: s.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: s.bool,
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: s.node,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: s.shape({
    root: s.object
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: s.shape({
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
function VE(e) {
  return we("MuiListItemIcon", e);
}
Te("MuiListItemIcon", ["root", "alignItemsFlexStart"]);
const UE = (e) => {
  const {
    alignItems: t,
    classes: n
  } = e;
  return Pe({
    root: ["root", t === "flex-start" && "alignItemsFlexStart"]
  }, VE, n);
}, zE = se("div", {
  name: "MuiListItemIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.alignItems === "flex-start" && t.alignItemsFlexStart];
  }
})(Fe(({
  theme: e
}) => ({
  minWidth: 56,
  color: (e.vars || e).palette.action.active,
  flexShrink: 0,
  display: "inline-flex",
  variants: [{
    props: {
      alignItems: "flex-start"
    },
    style: {
      marginTop: 8
    }
  }]
}))), gp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiListItemIcon"
  }), {
    className: o,
    ...i
  } = r, a = v.useContext(Wt), c = {
    ...r,
    alignItems: a.alignItems
  }, l = UE(c);
  return /* @__PURE__ */ y.jsx(zE, {
    className: ie(l.root, o),
    ownerState: c,
    ref: n,
    ...i
  });
});
process.env.NODE_ENV !== "production" && (gp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@mui/icons-material` SVG icon element.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
function WE(e) {
  return we("MuiListItemText", e);
}
const Uo = Te("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]), HE = (e) => {
  const {
    classes: t,
    inset: n,
    primary: r,
    secondary: o,
    dense: i
  } = e;
  return Pe({
    root: ["root", n && "inset", i && "dense", r && o && "multiline"],
    primary: ["primary"],
    secondary: ["secondary"]
  }, WE, t);
}, qE = se("div", {
  name: "MuiListItemText",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [{
      [`& .${Uo.primary}`]: t.primary
    }, {
      [`& .${Uo.secondary}`]: t.secondary
    }, t.root, n.inset && t.inset, n.primary && n.secondary && t.multiline, n.dense && t.dense];
  }
})({
  flex: "1 1 auto",
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4,
  [`.${jl.root}:where(& .${Uo.primary})`]: {
    display: "block"
  },
  [`.${jl.root}:where(& .${Uo.secondary})`]: {
    display: "block"
  },
  variants: [{
    props: ({
      ownerState: e
    }) => e.primary && e.secondary,
    style: {
      marginTop: 6,
      marginBottom: 6
    }
  }, {
    props: ({
      ownerState: e
    }) => e.inset,
    style: {
      paddingLeft: 56
    }
  }]
}), yp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiListItemText"
  }), {
    children: o,
    className: i,
    disableTypography: a = !1,
    inset: c = !1,
    primary: l,
    primaryTypographyProps: u,
    secondary: d,
    secondaryTypographyProps: f,
    slots: h = {},
    slotProps: b = {},
    ...m
  } = r, {
    dense: p
  } = v.useContext(Wt);
  let g = l ?? o, C = d;
  const T = {
    ...r,
    disableTypography: a,
    inset: c,
    primary: !!g,
    secondary: !!C,
    dense: p
  }, w = HE(T), E = {
    slots: h,
    slotProps: {
      primary: u,
      secondary: f,
      ...b
    }
  }, [S, O] = mt("primary", {
    className: w.primary,
    elementType: wt,
    externalForwardedProps: E,
    ownerState: T
  }), [R, N] = mt("secondary", {
    className: w.secondary,
    elementType: wt,
    externalForwardedProps: E,
    ownerState: T
  });
  return g != null && g.type !== wt && !a && (g = /* @__PURE__ */ y.jsx(S, {
    variant: p ? "body2" : "body1",
    component: O != null && O.variant ? void 0 : "span",
    ...O,
    children: g
  })), C != null && C.type !== wt && !a && (C = /* @__PURE__ */ y.jsx(R, {
    variant: "body2",
    color: "textSecondary",
    ...N,
    children: C
  })), /* @__PURE__ */ y.jsxs(qE, {
    className: ie(w.root, i),
    ownerState: T,
    ref: n,
    ...m,
    children: [g, C]
  });
});
process.env.NODE_ENV !== "production" && (yp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Alias for the `primary` prop.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: s.bool,
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: s.bool,
  /**
   * The main content element.
   */
  primary: s.node,
  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   * @deprecated Use `slotProps.primary` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  primaryTypographyProps: s.object,
  /**
   * The secondary content element.
   */
  secondary: s.node,
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   * @deprecated Use `slotProps.secondary` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  secondaryTypographyProps: s.object,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: s.shape({
    primary: s.oneOfType([s.func, s.object]),
    secondary: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: s.shape({
    primary: s.elementType,
    secondary: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const GE = qe(/* @__PURE__ */ y.jsx("path", {
  d: "m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
}), "ExpandLess"), YE = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), "ExpandMore");
function KE(e) {
  for (var t = [], n = 0; n < e.length; ) {
    var r = e[n];
    if (r === "*" || r === "+" || r === "?") {
      t.push({ type: "MODIFIER", index: n, value: e[n++] });
      continue;
    }
    if (r === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: n++, value: e[n++] });
      continue;
    }
    if (r === "{") {
      t.push({ type: "OPEN", index: n, value: e[n++] });
      continue;
    }
    if (r === "}") {
      t.push({ type: "CLOSE", index: n, value: e[n++] });
      continue;
    }
    if (r === ":") {
      for (var o = "", i = n + 1; i < e.length; ) {
        var a = e.charCodeAt(i);
        if (
          // `0-9`
          a >= 48 && a <= 57 || // `A-Z`
          a >= 65 && a <= 90 || // `a-z`
          a >= 97 && a <= 122 || // `_`
          a === 95
        ) {
          o += e[i++];
          continue;
        }
        break;
      }
      if (!o)
        throw new TypeError("Missing parameter name at ".concat(n));
      t.push({ type: "NAME", index: n, value: o }), n = i;
      continue;
    }
    if (r === "(") {
      var c = 1, l = "", i = n + 1;
      if (e[i] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(i));
      for (; i < e.length; ) {
        if (e[i] === "\\") {
          l += e[i++] + e[i++];
          continue;
        }
        if (e[i] === ")") {
          if (c--, c === 0) {
            i++;
            break;
          }
        } else if (e[i] === "(" && (c++, e[i + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(i));
        l += e[i++];
      }
      if (c)
        throw new TypeError("Unbalanced pattern at ".concat(n));
      if (!l)
        throw new TypeError("Missing pattern at ".concat(n));
      t.push({ type: "PATTERN", index: n, value: l }), n = i;
      continue;
    }
    t.push({ type: "CHAR", index: n, value: e[n++] });
  }
  return t.push({ type: "END", index: n, value: "" }), t;
}
function XE(e, t) {
  t === void 0 && (t = {});
  for (var n = KE(e), r = t.prefixes, o = r === void 0 ? "./" : r, i = t.delimiter, a = i === void 0 ? "/#?" : i, c = [], l = 0, u = 0, d = "", f = function(j) {
    if (u < n.length && n[u].type === j)
      return n[u++].value;
  }, h = function(j) {
    var x = f(j);
    if (x !== void 0)
      return x;
    var P = n[u], L = P.type, _ = P.index;
    throw new TypeError("Unexpected ".concat(L, " at ").concat(_, ", expected ").concat(j));
  }, b = function() {
    for (var j = "", x; x = f("CHAR") || f("ESCAPED_CHAR"); )
      j += x;
    return j;
  }, m = function(j) {
    for (var x = 0, P = a; x < P.length; x++) {
      var L = P[x];
      if (j.indexOf(L) > -1)
        return !0;
    }
    return !1;
  }, p = function(j) {
    var x = c[c.length - 1], P = j || (x && typeof x == "string" ? x : "");
    if (x && !P)
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(x.name, '"'));
    return !P || m(P) ? "[^".concat(sn(a), "]+?") : "(?:(?!".concat(sn(P), ")[^").concat(sn(a), "])+?");
  }; u < n.length; ) {
    var g = f("CHAR"), C = f("NAME"), T = f("PATTERN");
    if (C || T) {
      var w = g || "";
      o.indexOf(w) === -1 && (d += w, w = ""), d && (c.push(d), d = ""), c.push({
        name: C || l++,
        prefix: w,
        suffix: "",
        pattern: T || p(w),
        modifier: f("MODIFIER") || ""
      });
      continue;
    }
    var E = g || f("ESCAPED_CHAR");
    if (E) {
      d += E;
      continue;
    }
    d && (c.push(d), d = "");
    var S = f("OPEN");
    if (S) {
      var w = b(), O = f("NAME") || "", R = f("PATTERN") || "", N = b();
      h("CLOSE"), c.push({
        name: O || (R ? l++ : ""),
        pattern: O && !R ? p(w) : R,
        prefix: w,
        suffix: N,
        modifier: f("MODIFIER") || ""
      });
      continue;
    }
    h("END");
  }
  return c;
}
function sn(e) {
  return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function vp(e) {
  return e && e.sensitive ? "" : "i";
}
function JE(e, t) {
  return e;
}
function ZE(e, t, n) {
  var r = e.map(function(o) {
    return mc(o, t, n).source;
  });
  return new RegExp("(?:".concat(r.join("|"), ")"), vp(n));
}
function QE(e, t, n) {
  return eS(XE(e, n), t, n);
}
function eS(e, t, n) {
  n === void 0 && (n = {});
  for (var r = n.strict, o = r === void 0 ? !1 : r, i = n.start, a = i === void 0 ? !0 : i, c = n.end, l = c === void 0 ? !0 : c, u = n.encode, d = u === void 0 ? function(x) {
    return x;
  } : u, f = n.delimiter, h = f === void 0 ? "/#?" : f, b = n.endsWith, m = b === void 0 ? "" : b, p = "[".concat(sn(m), "]|$"), g = "[".concat(sn(h), "]"), C = a ? "^" : "", T = 0, w = e; T < w.length; T++) {
    var E = w[T];
    if (typeof E == "string")
      C += sn(d(E));
    else {
      var S = sn(d(E.prefix)), O = sn(d(E.suffix));
      if (E.pattern)
        if (S || O)
          if (E.modifier === "+" || E.modifier === "*") {
            var R = E.modifier === "*" ? "?" : "";
            C += "(?:".concat(S, "((?:").concat(E.pattern, ")(?:").concat(O).concat(S, "(?:").concat(E.pattern, "))*)").concat(O, ")").concat(R);
          } else
            C += "(?:".concat(S, "(").concat(E.pattern, ")").concat(O, ")").concat(E.modifier);
        else {
          if (E.modifier === "+" || E.modifier === "*")
            throw new TypeError('Can not repeat "'.concat(E.name, '" without a prefix and suffix'));
          C += "(".concat(E.pattern, ")").concat(E.modifier);
        }
      else
        C += "(?:".concat(S).concat(O, ")").concat(E.modifier);
    }
  }
  if (l)
    o || (C += "".concat(g, "?")), C += n.endsWith ? "(?=".concat(p, ")") : "$";
  else {
    var N = e[e.length - 1], j = typeof N == "string" ? g.indexOf(N[N.length - 1]) > -1 : N === void 0;
    o || (C += "(?:".concat(g, "(?=").concat(p, "))?")), j || (C += "(?=".concat(g, "|").concat(p, ")"));
  }
  return new RegExp(C, vp(n));
}
function mc(e, t, n) {
  return e instanceof RegExp ? JE(e) : Array.isArray(e) ? ZE(e, t, n) : QE(e, t, n);
}
const tS = (e) => e.kind ?? "page", oo = (e) => tS(e) === "page", Pn = (e) => oo(e) ? e.title ?? e.segment ?? "" : e.title;
function gc(e, t) {
  return `${e}${e && !t.segment ? "" : "/"}${t.segment ?? ""}`;
}
function bp(e, t, n) {
  return e.pattern ? mc(`${t}/${e.pattern}`).test(n) : gc(t, e) === n;
}
function xp(e, t, n) {
  if (oo(e) && e.children) {
    const r = gc(t, e);
    return e.children.some((o) => oo(o) ? o.children ? xp(o, r, n) : bp(o, r, n) : !1);
  }
  return !1;
}
function nS(e) {
  const t = /* @__PURE__ */ new Map(), n = (r, o) => {
    if (oo(r)) {
      const i = `${o}${r.segment ? `/${r.segment}` : ""}` || "/";
      if (t.set(r, i), r.children)
        for (const a of r.children)
          n(a, i);
    }
  };
  for (const r of e)
    n(r, "");
  return t;
}
const cu = /* @__PURE__ */ new WeakMap();
function rS(e) {
  let t = cu.get(e);
  return t || (t = nS(e), cu.set(e, t)), t;
}
function oS(e) {
  const t = /* @__PURE__ */ new Map(), n = (r) => {
    if (oo(r)) {
      const o = la(e, r);
      if (t.has(o) && console.warn(`Duplicate path in navigation: ${o}`), t.set(o, r), r.pattern) {
        const i = r.segment ? o.slice(0, -r.segment.length) : o;
        t.set(mc(i + r.pattern), r);
      }
      if (r.children)
        for (const i of r.children)
          n(i);
    }
  };
  for (const r of e)
    n(r);
  return t;
}
const lu = /* @__PURE__ */ new WeakMap();
function iS(e) {
  let t = lu.get(e);
  return t || (t = oS(e), lu.set(e, t)), t;
}
function Ts(e, t) {
  const n = iS(e);
  for (const [r, o] of n.entries())
    if (typeof r == "string" && r === t || r instanceof RegExp && r.test(t))
      return o;
  return null;
}
function la(e, t) {
  const r = rS(e).get(t);
  return to(r, `Item not found in navigation: ${t.title}`), r;
}
function Ei(e, t) {
  return {
    transition: (n) => n.transitions.create(t, {
      easing: n.transitions.easing.sharp,
      duration: e ? n.transitions.duration.enteringScreen : n.transitions.duration.leavingScreen
    })
  };
}
function uu(e) {
  return {
    ...Ei(e, "width"),
    overflowX: "hidden"
  };
}
var du, fu;
const sS = fo(hp)(({
  theme: e
}) => ({
  borderRadius: 8,
  "&.Mui-selected": {
    "& .MuiListItemIcon-root": {
      color: (e.vars ?? e).palette.primary.dark
    },
    "& .MuiTypography-root": {
      color: (e.vars ?? e).palette.text.primary
    },
    "& .MuiSvgIcon-root": {
      color: (e.vars ?? e).palette.primary.dark
    },
    "& .MuiAvatar-root": {
      backgroundColor: (e.vars ?? e).palette.primary.dark
    },
    "& .MuiTouchRipple-child": {
      backgroundColor: (e.vars ?? e).palette.primary.dark
    }
  },
  "& .MuiSvgIcon-root": {
    color: (e.vars ?? e).palette.action.active
  },
  "& .MuiAvatar-root": {
    backgroundColor: (e.vars ?? e).palette.action.active
  }
}));
function Ep({
  subNavigation: e,
  basePath: t = "",
  depth: n = 0,
  onLinkClick: r,
  isMini: o = !1,
  isFullyExpanded: i = !0,
  hasDrawerTransitions: a = !1,
  selectedItemId: c
}) {
  const l = v.useContext(Yi), u = (l == null ? void 0 : l.pathname) ?? "/", d = v.useMemo(() => e.map((m, p) => ({
    navigationItem: m,
    originalIndex: p
  })).filter(({
    navigationItem: m
  }) => xp(m, t, u)).map(({
    originalIndex: m
  }) => `${n}-${m}`), [t, n, u, e]), [f, h] = v.useState(d), b = v.useCallback((m) => () => {
    h((p) => p.includes(m) ? p.filter((g) => g !== m) : [...p, m]);
  }, []);
  return /* @__PURE__ */ y.jsx(pp, {
    sx: {
      padding: 0,
      mb: n === 0 ? 4 : 1,
      pl: 2 * n
    },
    children: e.map((m, p) => {
      if (m.kind === "header")
        return /* @__PURE__ */ y.jsx(yi, {
          component: "div",
          sx: {
            fontSize: 12,
            fontWeight: "700",
            height: o ? 0 : 40,
            ...a ? Ei(i, "height") : {},
            px: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            zIndex: 2
          },
          children: Pn(m)
        }, `subheader-${n}-${p}`);
      if (m.kind === "divider") {
        const N = e[p + 1];
        return /* @__PURE__ */ y.jsx(ro, {
          sx: {
            borderBottomWidth: 2,
            mx: 1,
            mt: 1,
            mb: (N == null ? void 0 : N.kind) === "header" && !o ? 0 : 1,
            ...a ? Ei(i, "margin") : {}
          }
        }, `divider-${n}-${p}`);
      }
      const g = gc(t, m), C = `${n}-${p}`, T = Pn(m), w = f.includes(C), E = w ? du || (du = /* @__PURE__ */ y.jsx(GE, {})) : fu || (fu = /* @__PURE__ */ y.jsx(YE, {})), S = 34, O = bp(m, t, u);
      process.env.NODE_ENV !== "production" && O && c && console.warn(`Duplicate selected path in navigation: ${g}`), O && !c && (c = C);
      const R = /* @__PURE__ */ y.jsx(mp, {
        sx: {
          py: 0,
          px: 1,
          overflowX: "hidden"
        },
        children: /* @__PURE__ */ y.jsxs(sS, {
          selected: O && (!m.children || o),
          sx: {
            px: 1.4,
            height: 48
          },
          ...m.children && !o ? {
            onClick: b(C)
          } : {
            LinkComponent: dc,
            href: g,
            onClick: r
          },
          children: [m.icon || o ? /* @__PURE__ */ y.jsxs(gp, {
            sx: {
              minWidth: S,
              mr: 1.2
            },
            children: [m.icon ?? null, !m.icon && o ? /* @__PURE__ */ y.jsx(tc, {
              sx: {
                width: S - 7,
                height: S - 7,
                fontSize: 12,
                ml: "-2px"
              },
              children: T.split(" ").slice(0, 2).map((N) => N.charAt(0).toUpperCase())
            }) : null]
          }) : null, /* @__PURE__ */ y.jsx(yp, {
            primary: T,
            sx: {
              whiteSpace: "nowrap",
              zIndex: 1,
              "& .MuiTypography-root": {
                fontWeight: "500"
              }
            }
          }), m.action && !o && i ? m.action : null, m.children && !o && i ? E : null]
        })
      });
      return /* @__PURE__ */ y.jsxs(v.Fragment, {
        children: [o ? /* @__PURE__ */ y.jsx(xo, {
          title: T,
          placement: "right",
          children: R
        }) : R, m.children && !o ? /* @__PURE__ */ y.jsx(xi, {
          in: w,
          timeout: "auto",
          unmountOnExit: !0,
          children: /* @__PURE__ */ y.jsx(Ep, {
            subNavigation: m.children,
            basePath: g,
            depth: n + 1,
            onLinkClick: r,
            selectedItemId: c
          })
        }) : null]
      }, C);
    })
  });
}
const pu = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1"
}), "DarkMode"), hu = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z"
}), "LightMode");
function aS() {
  return () => {
  };
}
function cS() {
  return !1;
}
function lS() {
  return !0;
}
function uS() {
  return v.useSyncExternalStore(aS, cS, lS);
}
var mu, gu;
function dS() {
  const e = uS(), t = ki(), {
    paletteMode: n,
    setPaletteMode: r,
    isDualTheme: o
  } = v.useContext(sc), i = v.useCallback(() => {
    r(n === "dark" ? "light" : "dark");
  }, [n, r]);
  return o ? /* @__PURE__ */ y.jsx(xo, {
    title: e ? "Switch mode" : `${n === "dark" ? "Light" : "Dark"} mode`,
    enterDelay: 1e3,
    children: /* @__PURE__ */ y.jsx("div", {
      children: /* @__PURE__ */ y.jsx(Xr, {
        "aria-label": e ? "Switch theme mode" : `Switch to ${n === "dark" ? "light" : "dark"} mode`,
        onClick: i,
        sx: {
          color: (t.vars ?? t).palette.primary.dark
        },
        children: t.getColorSchemeSelector ? /* @__PURE__ */ y.jsxs(v.Fragment, {
          children: [/* @__PURE__ */ y.jsx(pu, {
            sx: {
              display: "inline",
              [t.getColorSchemeSelector("dark")]: {
                display: "none"
              }
            }
          }), /* @__PURE__ */ y.jsx(hu, {
            sx: {
              display: "none",
              [t.getColorSchemeSelector("dark")]: {
                display: "inline"
              }
            }
          })]
        }) : /* @__PURE__ */ y.jsx(v.Fragment, {
          children: e || n !== "dark" ? mu || (mu = /* @__PURE__ */ y.jsx(pu, {})) : gu || (gu = /* @__PURE__ */ y.jsx(hu, {}))
        })
      })
    })
  }) : null;
}
var yu;
function Sp() {
  return yu || (yu = /* @__PURE__ */ y.jsx(ct, {
    direction: "row",
    alignItems: "center",
    children: /* @__PURE__ */ y.jsx(dS, {})
  }));
}
var vu, bu, xu, Eu, Su;
function fS({
  size: e = 40
}) {
  return /* @__PURE__ */ y.jsxs("svg", {
    width: e,
    height: e,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [vu || (vu = /* @__PURE__ */ y.jsxs("g", {
      mask: "url(#a)",
      children: [/* @__PURE__ */ y.jsx("path", {
        d: "M22.74 27.73v-7.6l6.64-3.79v7.6l-6.64 3.79Z",
        fill: "#007FFF"
      }), /* @__PURE__ */ y.jsx("path", {
        d: "M16.1 23.93v-7.59l6.64 3.8v7.59l-6.65-3.8Z",
        fill: "#39F"
      }), /* @__PURE__ */ y.jsx("path", {
        d: "m16.1 16.34 6.64-3.8 6.64 3.8-6.64 3.8-6.65-3.8Z",
        fill: "#A5D8FF"
      })]
    })), /* @__PURE__ */ y.jsx("mask", {
      id: "b",
      style: {
        maskType: "alpha"
      },
      maskUnits: "userSpaceOnUse",
      x: "8",
      y: "17",
      width: "14",
      height: "15",
      children: bu || (bu = /* @__PURE__ */ y.jsx("path", {
        d: "M8.5 22.3c0-1.05.56-2 1.46-2.53l3.75-2.14c.89-.5 1.98-.5 2.87 0l3.75 2.14a2.9 2.9 0 0 1 1.46 2.52v4.23c0 1.04-.56 2-1.46 2.52l-3.75 2.14c-.89.5-1.98.5-2.87 0l-3.75-2.14a2.9 2.9 0 0 1-1.46-2.52v-4.23Z",
        fill: "#D7DCE1"
      }))
    }), xu || (xu = /* @__PURE__ */ y.jsxs("g", {
      mask: "url(#b)",
      children: [/* @__PURE__ */ y.jsx("path", {
        d: "M15.14 32v-7.6l6.65-3.8v7.6L15.14 32Z",
        fill: "#007FFF"
      }), /* @__PURE__ */ y.jsx("path", {
        d: "M8.5 28.2v-7.6l6.64 3.8V32L8.5 28.2Z",
        fill: "#39F"
      }), /* @__PURE__ */ y.jsx("path", {
        d: "m8.5 20.6 6.64-3.79 6.65 3.8-6.65 3.8-6.64-3.8Z",
        fill: "#A5D8FF"
      })]
    })), /* @__PURE__ */ y.jsx("mask", {
      id: "c",
      style: {
        maskType: "alpha"
      },
      maskUnits: "userSpaceOnUse",
      x: "8",
      y: "4",
      width: "22",
      height: "20",
      children: Eu || (Eu = /* @__PURE__ */ y.jsx("path", {
        d: "M24.17 4.82a2.9 2.9 0 0 0-2.87 0L9.97 11.22a2.9 2.9 0 0 0-1.47 2.53v4.22c0 1.04.56 2 1.46 2.52l3.75 2.14c.89.5 1.98.5 2.87 0l11.33-6.42a2.9 2.9 0 0 0 1.47-2.52V9.48c0-1.04-.56-2-1.46-2.52l-3.75-2.14Z",
        fill: "#D7DCE1"
      }))
    }), Su || (Su = /* @__PURE__ */ y.jsxs("g", {
      mask: "url(#c)",
      children: [/* @__PURE__ */ y.jsx("path", {
        d: "M15.14 23.46v-7.6L29.38 7.8v7.59l-14.24 8.07Z",
        fill: "#007FFF"
      }), /* @__PURE__ */ y.jsx("path", {
        d: "M8.5 19.66v-7.6l6.64 3.8v7.6l-6.64-3.8Z",
        fill: "#39F"
      }), /* @__PURE__ */ y.jsx("path", {
        d: "M8.5 12.07 22.74 4l6.64 3.8-14.24 8.06-6.64-3.8Z",
        fill: "#A5D8FF"
      })]
    }))]
  });
}
var wu, Cu, Tu, Ou;
const pS = fo(ep)(({
  theme: e
}) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: (e.vars ?? e).palette.divider,
  boxShadow: "none",
  zIndex: e.zIndex.drawer + 1
})), hS = fo("div")({
  position: "relative",
  height: 40,
  "& img": {
    maxHeight: 40
  }
});
function wp(e) {
  const {
    children: t,
    branding: n,
    disableCollapsibleSidebar: r = !1,
    defaultSidebarCollapsed: o = !1,
    hideNavigation: i = !1,
    sidebarExpandedWidth: a = 320,
    slots: c,
    slotProps: l,
    sx: u
  } = e, d = ki(), f = v.useContext(oc), h = v.useContext(ic), b = v.useContext(Kf), m = xE(), p = n ?? f, [g, C] = v.useState(!o), [T, w] = v.useState(!1), E = Ql(d.breakpoints.down("md"), b && {
    matchMedia: b.matchMedia
  }), S = Ql(d.breakpoints.up("sm"), b && {
    matchMedia: b.matchMedia
  }), O = E ? T : g, R = v.useCallback((q) => {
    E ? w(q) : C(q);
  }, [E]), [N, j] = v.useState(O);
  v.useEffect(() => {
    if (O) {
      const q = setTimeout(() => {
        j(!0);
      }, d.transitions.duration.enteringScreen);
      return () => clearTimeout(q);
    }
    return j(!1), () => {
    };
  }, [O, d]);
  const x = v.useRef(""), P = v.useCallback((q) => () => {
    R(q);
  }, [R]), L = v.useCallback(() => {
    R(!O);
  }, [O, R]), _ = v.useCallback(() => {
    x.current = "", w(!1);
  }, [w]);
  v.useMemo(() => {
    h && (x.current = "");
  }, [h]);
  const V = !r && !g, M = !r && !T, D = v.useCallback((q) => {
    const K = "Expand", F = "Collapse";
    return /* @__PURE__ */ y.jsx(xo, {
      title: `${q ? F : K} menu`,
      enterDelay: 1e3,
      children: /* @__PURE__ */ y.jsx("div", {
        children: /* @__PURE__ */ y.jsx(Xr, {
          "aria-label": `${q ? F : K} navigation menu`,
          onClick: L,
          children: q ? wu || (wu = /* @__PURE__ */ y.jsx(cE, {})) : Cu || (Cu = /* @__PURE__ */ y.jsx(aE, {}))
        })
      })
    });
  }, [L]), W = S && (r || !E), H = (c == null ? void 0 : c.toolbarActions) ?? Sp, X = (c == null ? void 0 : c.toolbarAccount) ?? pc, A = (c == null ? void 0 : c.sidebarFooter) ?? null, U = v.useCallback((q, K) => {
    var F;
    return /* @__PURE__ */ y.jsxs(v.Fragment, {
      children: [Tu || (Tu = /* @__PURE__ */ y.jsx(ti, {})), /* @__PURE__ */ y.jsxs(on, {
        component: "nav",
        "aria-label": `${K.charAt(0).toUpperCase()}${K.slice(1)}`,
        sx: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "auto",
          pt: ((F = h[0]) == null ? void 0 : F.kind) === "header" && !q ? 0 : 2,
          ...W ? Ei(N, "padding") : {}
        },
        children: [/* @__PURE__ */ y.jsx(Ep, {
          subNavigation: h,
          onLinkClick: _,
          isMini: q,
          isFullyExpanded: N,
          hasDrawerTransitions: W,
          selectedItemId: x.current
        }), A ? /* @__PURE__ */ y.jsx(A, {
          mini: q,
          ...l == null ? void 0 : l.sidebarFooter
        }) : null]
      })]
    });
  }, [A, _, W, N, h, l == null ? void 0 : l.sidebarFooter]), Q = v.useCallback((q, K) => {
    const F = q ? 64 : a;
    return {
      displayPrint: "none",
      width: F,
      flexShrink: 0,
      ...uu(O),
      ...K ? {
        position: "absolute"
      } : {},
      "& .MuiDrawer-paper": {
        position: "absolute",
        width: F,
        boxSizing: "border-box",
        backgroundImage: "none",
        ...uu(O)
      }
    };
  }, [O, a]), ee = v.useRef(null);
  return /* @__PURE__ */ y.jsxs(on, {
    ref: ee,
    sx: {
      position: "relative",
      display: "flex",
      overflow: "hidden",
      height: "100vh",
      width: "100vw",
      ...u
    },
    children: [/* @__PURE__ */ y.jsx(pS, {
      color: "inherit",
      position: "absolute",
      sx: {
        displayPrint: "none"
      },
      children: /* @__PURE__ */ y.jsx(ti, {
        sx: {
          backgroundColor: "inherit",
          mx: {
            xs: -0.75,
            sm: -1.5
          }
        },
        children: /* @__PURE__ */ y.jsxs(ct, {
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          sx: {
            flexWrap: "wrap",
            width: "100%"
          },
          children: [/* @__PURE__ */ y.jsxs(ct, {
            direction: "row",
            children: [i ? null : /* @__PURE__ */ y.jsxs(v.Fragment, {
              children: [/* @__PURE__ */ y.jsx(on, {
                sx: {
                  mr: {
                    sm: r ? 0 : 1
                  },
                  display: {
                    md: "none"
                  }
                },
                children: D(T)
              }), /* @__PURE__ */ y.jsx(on, {
                sx: {
                  display: {
                    xs: "none",
                    md: r ? "none" : "block"
                  },
                  mr: r ? 0 : 1
                },
                children: D(g)
              })]
            }), /* @__PURE__ */ y.jsx(dc, {
              href: "/",
              style: {
                color: "inherit",
                textDecoration: "none"
              },
              children: /* @__PURE__ */ y.jsxs(ct, {
                direction: "row",
                alignItems: "center",
                children: [/* @__PURE__ */ y.jsx(hS, {
                  children: (p == null ? void 0 : p.logo) ?? (Ou || (Ou = /* @__PURE__ */ y.jsx(fS, {
                    size: 40
                  })))
                }), /* @__PURE__ */ y.jsx(wt, {
                  variant: "h6",
                  sx: {
                    color: (d.vars ?? d).palette.primary.main,
                    fontWeight: "700",
                    ml: 1,
                    whiteSpace: "nowrap"
                  },
                  children: m
                })]
              })
            })]
          }), /* @__PURE__ */ y.jsxs(ct, {
            direction: "row",
            alignItems: "center",
            spacing: 1,
            sx: {
              marginLeft: "auto"
            },
            children: [/* @__PURE__ */ y.jsx(H, {
              ...l == null ? void 0 : l.toolbarActions
            }), /* @__PURE__ */ y.jsx(X, {
              ...l == null ? void 0 : l.toolbarAccount
            })]
          })]
        })
      })
    }), i ? null : /* @__PURE__ */ y.jsxs(v.Fragment, {
      children: [/* @__PURE__ */ y.jsx(ei, {
        container: ee.current,
        variant: "temporary",
        open: T,
        onClose: P(!1),
        ModalProps: {
          keepMounted: !0
          // Better open performance on mobile.
        },
        sx: {
          display: {
            xs: "block",
            sm: r ? "block" : "none",
            md: "none"
          },
          ...Q(!1, !0)
        },
        children: U(!1, "phone")
      }), /* @__PURE__ */ y.jsx(ei, {
        variant: "permanent",
        sx: {
          display: {
            xs: "none",
            sm: r ? "none" : "block",
            md: "none"
          },
          ...Q(M, !1)
        },
        children: U(M, "tablet")
      }), /* @__PURE__ */ y.jsx(ei, {
        variant: "permanent",
        sx: {
          display: {
            xs: "none",
            md: "block"
          },
          ...Q(V, !1)
        },
        children: U(V, "desktop")
      })]
    }), /* @__PURE__ */ y.jsxs(on, {
      sx: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0
      },
      children: [/* @__PURE__ */ y.jsx(ti, {
        sx: {
          displayPrint: "none"
        }
      }), /* @__PURE__ */ y.jsx(on, {
        component: "main",
        sx: {
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "auto"
        },
        children: t
      })]
    })]
  });
}
process.env.NODE_ENV !== "production" && (wp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Branding options for the dashboard.
   * @default null
   */
  branding: s.shape({
    logo: s.node,
    title: s.string
  }),
  /**
   * The content of the dashboard.
   */
  children: s.node,
  /**
   * Whether the sidebar should start collapsed in desktop size screens.
   * @default false
   */
  defaultSidebarCollapsed: s.bool,
  /**
   * Whether the sidebar should not be collapsible to a mini variant in desktop and tablet viewports.
   * @default false
   */
  disableCollapsibleSidebar: s.bool,
  /**
   * Whether the navigation bar and menu icon should be hidden
   * @default false
   */
  hideNavigation: s.bool,
  /**
   * Width of the sidebar when expanded.
   * @default 320
   */
  sidebarExpandedWidth: s.oneOfType([s.number, s.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: s.shape({
    sidebarFooter: s.shape({
      mini: s.bool.isRequired
    }),
    toolbarAccount: s.shape({
      localeText: s.shape({
        iconButtonAriaLabel: s.string,
        signInLabel: s.string,
        signOutLabel: s.string
      }),
      slotProps: s.shape({
        popover: s.object,
        popoverContent: s.object,
        preview: s.object,
        signInButton: s.object,
        signOutButton: s.object
      }),
      slots: s.shape({
        popover: s.elementType,
        popoverContent: s.elementType,
        preview: s.elementType,
        signInButton: s.elementType,
        signOutButton: s.elementType
      })
    }),
    toolbarActions: s.object
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: s.shape({
    sidebarFooter: s.elementType,
    toolbarAccount: s.elementType,
    toolbarActions: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const Cp = Ny({
  createStyledComponent: se("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (e, t) => {
      const {
        ownerState: n
      } = e;
      return [t.root, t[`maxWidth${le(String(n.maxWidth))}`], n.fixed && t.fixed, n.disableGutters && t.disableGutters];
    }
  }),
  useThemeProps: (e) => Ce({
    props: e,
    name: "MuiContainer"
  })
});
process.env.NODE_ENV !== "production" && (Cp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: s.bool,
  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   * @default false
   */
  fixed: s.bool,
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth: s.oneOfType([s.oneOf(["xs", "sm", "md", "lg", "xl", !1]), s.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
var Ru = /* @__PURE__ */ new Set();
function mS(e) {
  Ru.has(e) || (Ru.add(e), console.warn(e));
}
const gS = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
}), "MoreHoriz"), yS = se(yo)(Fe(({
  theme: e
}) => ({
  display: "flex",
  marginLeft: `calc(${e.spacing(1)} * 0.5)`,
  marginRight: `calc(${e.spacing(1)} * 0.5)`,
  ...e.palette.mode === "light" ? {
    backgroundColor: e.palette.grey[100],
    color: e.palette.grey[700]
  } : {
    backgroundColor: e.palette.grey[700],
    color: e.palette.grey[100]
  },
  borderRadius: 2,
  "&:hover, &:focus": {
    ...e.palette.mode === "light" ? {
      backgroundColor: e.palette.grey[200]
    } : {
      backgroundColor: e.palette.grey[600]
    }
  },
  "&:active": {
    boxShadow: e.shadows[0],
    ...e.palette.mode === "light" ? {
      backgroundColor: Ys(e.palette.grey[200], 0.12)
    } : {
      backgroundColor: Ys(e.palette.grey[600], 0.12)
    }
  }
}))), vS = se(gS)({
  width: 24,
  height: 16
});
function Tp(e) {
  const {
    slots: t = {},
    slotProps: n = {},
    ...r
  } = e, o = e;
  return /* @__PURE__ */ y.jsx("li", {
    children: /* @__PURE__ */ y.jsx(yS, {
      focusRipple: !0,
      ...r,
      ownerState: o,
      children: /* @__PURE__ */ y.jsx(vS, {
        as: t.CollapsedIcon,
        ownerState: o,
        ...n.collapsedIcon
      })
    })
  });
}
process.env.NODE_ENV !== "production" && (Tp.propTypes = {
  /**
   * The props used for the CollapsedIcon slot.
   * @default {}
   */
  slotProps: s.shape({
    collapsedIcon: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the BreadcumbCollapsed.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    CollapsedIcon: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.object
});
function bS(e) {
  return we("MuiBreadcrumbs", e);
}
const xS = Te("MuiBreadcrumbs", ["root", "ol", "li", "separator"]), ES = (e) => {
  const {
    classes: t
  } = e;
  return Pe({
    root: ["root"],
    li: ["li"],
    ol: ["ol"],
    separator: ["separator"]
  }, bS, t);
}, SS = se(wt, {
  name: "MuiBreadcrumbs",
  slot: "Root",
  overridesResolver: (e, t) => [{
    [`& .${xS.li}`]: t.li
  }, t.root]
})({}), wS = se("ol", {
  name: "MuiBreadcrumbs",
  slot: "Ol",
  overridesResolver: (e, t) => t.ol
})({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  padding: 0,
  margin: 0,
  listStyle: "none"
}), CS = se("li", {
  name: "MuiBreadcrumbs",
  slot: "Separator",
  overridesResolver: (e, t) => t.separator
})({
  display: "flex",
  userSelect: "none",
  marginLeft: 8,
  marginRight: 8
});
function TS(e, t, n, r) {
  return e.reduce((o, i, a) => (a < e.length - 1 ? o = o.concat(i, /* @__PURE__ */ y.jsx(CS, {
    "aria-hidden": !0,
    className: t,
    ownerState: r,
    children: n
  }, `separator-${a}`)) : o.push(i), o), []);
}
const Op = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiBreadcrumbs"
  }), {
    children: o,
    className: i,
    component: a = "nav",
    slots: c = {},
    slotProps: l = {},
    expandText: u = "Show path",
    itemsAfterCollapse: d = 1,
    itemsBeforeCollapse: f = 1,
    maxItems: h = 8,
    separator: b = "/",
    ...m
  } = r, [p, g] = v.useState(!1), C = {
    ...r,
    component: a,
    expanded: p,
    expandText: u,
    itemsAfterCollapse: d,
    itemsBeforeCollapse: f,
    maxItems: h,
    separator: b
  }, T = ES(C), w = lf({
    elementType: c.CollapsedIcon,
    externalSlotProps: l.collapsedIcon,
    ownerState: C
  }), E = v.useRef(null), S = (R) => {
    const N = () => {
      g(!0);
      const j = E.current.querySelector("a[href],button,[tabindex]");
      j && j.focus();
    };
    return f + d >= R.length ? (process.env.NODE_ENV !== "production" && console.error(["MUI: You have provided an invalid combination of props to the Breadcrumbs.", `itemsAfterCollapse={${d}} + itemsBeforeCollapse={${f}} >= maxItems={${h}}`].join(`
`)), R) : [...R.slice(0, f), /* @__PURE__ */ y.jsx(Tp, {
      "aria-label": u,
      slots: {
        CollapsedIcon: c.CollapsedIcon
      },
      slotProps: {
        collapsedIcon: w
      },
      onClick: N
    }, "ellipsis"), ...R.slice(R.length - d, R.length)];
  }, O = v.Children.toArray(o).filter((R) => (process.env.NODE_ENV !== "production" && qs.isFragment(R) && console.error(["MUI: The Breadcrumbs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), /* @__PURE__ */ v.isValidElement(R))).map((R, N) => /* @__PURE__ */ y.jsx("li", {
    className: T.li,
    children: R
  }, `child-${N}`));
  return /* @__PURE__ */ y.jsx(SS, {
    ref: n,
    component: a,
    color: "textSecondary",
    className: ie(T.root, i),
    ownerState: C,
    ...m,
    children: /* @__PURE__ */ y.jsx(wS, {
      className: T.ol,
      ref: E,
      ownerState: C,
      children: TS(p || h && O.length <= h ? O : S(O), T.separator, b, C)
    })
  });
});
process.env.NODE_ENV !== "production" && (Op.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Show path'
   */
  expandText: s.string,
  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   * @default 1
   */
  itemsAfterCollapse: rr,
  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse: rr,
  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   * @default 8
   */
  maxItems: rr,
  /**
   * Custom separator node.
   * @default '/'
   */
  separator: s.node,
  /**
   * The props used for each slot inside the Breadcumb.
   * @default {}
   */
  slotProps: s.shape({
    collapsedIcon: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Breadcumb.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    CollapsedIcon: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
function OS(e) {
  return we("MuiLink", e);
}
const RS = Te("MuiLink", ["root", "underlineNone", "underlineHover", "underlineAlways", "button", "focusVisible"]), kS = ({
  theme: e,
  ownerState: t
}) => {
  const n = t.color, r = sr(e, `palette.${n}`, !1) || t.color, o = sr(e, `palette.${n}Channel`);
  return "vars" in e && o ? `rgba(${o} / 0.4)` : Ve(r, 0.4);
}, ku = {
  primary: !0,
  secondary: !0,
  error: !0,
  info: !0,
  success: !0,
  warning: !0,
  textPrimary: !0,
  textSecondary: !0,
  textDisabled: !0
}, PS = (e) => {
  const {
    classes: t,
    component: n,
    focusVisible: r,
    underline: o
  } = e, i = {
    root: ["root", `underline${le(o)}`, n === "button" && "button", r && "focusVisible"]
  };
  return Pe(i, OS, t);
}, NS = se(wt, {
  name: "MuiLink",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[`underline${le(n.underline)}`], n.component === "button" && t.button];
  }
})(Fe(({
  theme: e
}) => ({
  variants: [{
    props: {
      underline: "none"
    },
    style: {
      textDecoration: "none"
    }
  }, {
    props: {
      underline: "hover"
    },
    style: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline"
      }
    }
  }, {
    props: {
      underline: "always"
    },
    style: {
      textDecoration: "underline",
      "&:hover": {
        textDecorationColor: "inherit"
      }
    }
  }, {
    props: ({
      underline: t,
      ownerState: n
    }) => t === "always" && n.color !== "inherit",
    style: {
      textDecorationColor: "var(--Link-underlineColor)"
    }
  }, ...Object.entries(e.palette).filter(cr()).map(([t]) => ({
    props: {
      underline: "always",
      color: t
    },
    style: {
      "--Link-underlineColor": e.vars ? `rgba(${e.vars.palette[t].mainChannel} / 0.4)` : Ve(e.palette[t].main, 0.4)
    }
  })), {
    props: {
      underline: "always",
      color: "textPrimary"
    },
    style: {
      "--Link-underlineColor": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.4)` : Ve(e.palette.text.primary, 0.4)
    }
  }, {
    props: {
      underline: "always",
      color: "textSecondary"
    },
    style: {
      "--Link-underlineColor": e.vars ? `rgba(${e.vars.palette.text.secondaryChannel} / 0.4)` : Ve(e.palette.text.secondary, 0.4)
    }
  }, {
    props: {
      underline: "always",
      color: "textDisabled"
    },
    style: {
      "--Link-underlineColor": (e.vars || e).palette.text.disabled
    }
  }, {
    props: {
      component: "button"
    },
    style: {
      position: "relative",
      WebkitTapHighlightColor: "transparent",
      backgroundColor: "transparent",
      // Reset default value
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      border: 0,
      margin: 0,
      // Remove the margin in Safari
      borderRadius: 0,
      padding: 0,
      // Remove the padding in Firefox
      cursor: "pointer",
      userSelect: "none",
      verticalAlign: "middle",
      MozAppearance: "none",
      // Reset
      WebkitAppearance: "none",
      // Reset
      "&::-moz-focus-inner": {
        borderStyle: "none"
        // Remove Firefox dotted outline.
      },
      [`&.${RS.focusVisible}`]: {
        outline: "auto"
      }
    }
  }]
}))), Rp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Ce({
    props: t,
    name: "MuiLink"
  }), o = yn(), {
    className: i,
    color: a = "primary",
    component: c = "a",
    onBlur: l,
    onFocus: u,
    TypographyClasses: d,
    underline: f = "always",
    variant: h = "inherit",
    sx: b,
    ...m
  } = r, [p, g] = v.useState(!1), C = (S) => {
    ar(S.target) || g(!1), l && l(S);
  }, T = (S) => {
    ar(S.target) && g(!0), u && u(S);
  }, w = {
    ...r,
    color: a,
    component: c,
    focusVisible: p,
    underline: f,
    variant: h
  }, E = PS(w);
  return /* @__PURE__ */ y.jsx(NS, {
    color: a,
    className: ie(E.root, i),
    classes: d,
    component: c,
    onBlur: C,
    onFocus: T,
    ref: n,
    ownerState: w,
    variant: h,
    ...m,
    sx: [...ku[a] === void 0 ? [{
      color: a
    }] : [], ...Array.isArray(b) ? b : [b]],
    style: {
      ...m.style,
      ...f === "always" && a !== "inherit" && !ku[a] && {
        "--Link-underlineColor": kS({
          theme: o,
          ownerState: w
        })
      }
    }
  });
});
process.env.NODE_ENV !== "production" && (Rp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the link.
   * @default 'primary'
   */
  color: s.oneOfType([s.oneOf(["primary", "secondary", "success", "error", "info", "warning", "textPrimary", "textSecondary", "textDisabled"]), s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: go,
  /**
   * @ignore
   */
  onBlur: s.func,
  /**
   * @ignore
   */
  onFocus: s.func,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * `classes` prop applied to the [`Typography`](https://mui.com/material-ui/api/typography/) element.
   */
  TypographyClasses: s.object,
  /**
   * Controls when the link should have an underline.
   * @default 'always'
   */
  underline: s.oneOf(["always", "hover", "none"]),
  /**
   * Applies the theme typography styles.
   * @default 'inherit'
   */
  variant: s.oneOfType([s.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), s.string])
});
const jS = fo("div")(({
  theme: e
}) => ({
  display: "flex",
  flexDirection: "row",
  gap: e.spacing(1),
  // Ensure the toolbar is always on the right side, even after wrapping
  marginLeft: "auto"
}));
function kp(e) {
  return /* @__PURE__ */ y.jsx(jS, {
    ...e
  });
}
function Pp() {
  const e = v.useContext(ic), t = v.useContext(Yi), n = (t == null ? void 0 : t.pathname) ?? "/", r = Ts(e, n), o = Ts(e, "/");
  return v.useMemo(() => {
    if (!r)
      return null;
    const i = [];
    o && i.push({
      title: Pn(o),
      path: "/"
    });
    const a = n.split("/").filter(Boolean);
    let c = "";
    for (const l of a) {
      const u = `${c}/${l}`;
      c = u;
      const d = Ts(e, u);
      if (!d)
        continue;
      const f = la(e, d), h = i[i.length - 1];
      (h == null ? void 0 : h.path) !== f && i.push({
        title: Pn(d),
        path: f
      });
    }
    return {
      title: Pn(r),
      path: la(e, r),
      breadcrumbs: i,
      // TODO: Remove in the next major version
      breadCrumbs: i
    };
  }, [r, o, n, e]);
}
const AS = fo("div")(({
  theme: e
}) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: e.spacing(2)
}));
function Np(e) {
  var h, b;
  const {
    children: t,
    slots: n,
    slotProps: r,
    breadcrumbs: o,
    breadCrumbs: i,
    ...a
  } = e;
  process.env.NODE_ENV !== "production" && i && mS("The PageContainer `breadCrumbs` prop is deprecated. Use `breadcrumbs` instead.");
  const c = Pp(), l = o ?? i ?? (c == null ? void 0 : c.breadcrumbs) ?? [], u = e.title ?? (c == null ? void 0 : c.title) ?? "", d = ((h = e == null ? void 0 : e.slots) == null ? void 0 : h.toolbar) ?? kp, f = Nf({
    elementType: d,
    ownerState: e,
    externalSlotProps: (b = e == null ? void 0 : e.slotProps) == null ? void 0 : b.toolbar,
    additionalProps: {}
  });
  return /* @__PURE__ */ y.jsx(Cp, {
    ...a,
    children: /* @__PURE__ */ y.jsxs(ct, {
      sx: {
        my: 2
      },
      spacing: 2,
      children: [/* @__PURE__ */ y.jsxs(ct, {
        children: [/* @__PURE__ */ y.jsx(Op, {
          "aria-label": "breadcrumb",
          children: l ? l.map((m, p) => p < l.length - 1 ? /* @__PURE__ */ y.jsx(Rp, {
            component: dc,
            underline: "hover",
            color: "inherit",
            href: m.path,
            children: Pn(m)
          }, m.path) : /* @__PURE__ */ y.jsx(wt, {
            color: "text.primary",
            children: Pn(m)
          }, m.path)) : null
        }), /* @__PURE__ */ y.jsxs(AS, {
          children: [u ? /* @__PURE__ */ y.jsx(wt, {
            variant: "h4",
            children: u
          }) : null, /* @__PURE__ */ y.jsx(d, {
            ...f
          })]
        })]
      }), /* @__PURE__ */ y.jsx("div", {
        children: t
      })]
    })
  });
}
process.env.NODE_ENV !== "production" && (Np.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The breadcrumbs of the page. Leave blank to use the active page breadcrumbs.
   */
  breadcrumbs: s.arrayOf(s.shape({
    path: s.string.isRequired,
    title: s.string.isRequired
  })),
  /**
   * @deprecated Use `breadcrumbs` instead.
   */
  breadCrumbs: s.arrayOf(s.shape({
    path: s.string.isRequired,
    title: s.string.isRequired
  })),
  /**
   * @ignore
   */
  children: s.node,
  /**
   * The props used for each slot inside.
   */
  slotProps: s.shape({
    toolbar: s.shape({
      children: s.node
    }).isRequired
  }),
  /**
   * The components used for each slot inside.
   */
  slots: s.shape({
    toolbar: s.elementType
  }),
  /**
   * The title of the page. Leave blank to use the active page title.
   */
  title: s.string
});
/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function io() {
  return io = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, io.apply(this, arguments);
}
var Ct;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Ct || (Ct = {}));
const Pu = "popstate";
function IS(e) {
  e === void 0 && (e = {});
  let {
    initialEntries: t = ["/"],
    initialIndex: n,
    v5Compat: r = !1
  } = e, o;
  o = t.map((b, m) => d(b, typeof b == "string" ? null : b.state, m === 0 ? "default" : void 0));
  let i = l(n ?? o.length - 1), a = Ct.Pop, c = null;
  function l(b) {
    return Math.min(Math.max(b, 0), o.length - 1);
  }
  function u() {
    return o[i];
  }
  function d(b, m, p) {
    m === void 0 && (m = null);
    let g = so(o ? u().pathname : "/", b, m, p);
    return ft(g.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(b)), g;
  }
  function f(b) {
    return typeof b == "string" ? b : _n(b);
  }
  return {
    get index() {
      return i;
    },
    get action() {
      return a;
    },
    get location() {
      return u();
    },
    createHref: f,
    createURL(b) {
      return new URL(f(b), "http://localhost");
    },
    encodeLocation(b) {
      let m = typeof b == "string" ? bn(b) : b;
      return {
        pathname: m.pathname || "",
        search: m.search || "",
        hash: m.hash || ""
      };
    },
    push(b, m) {
      a = Ct.Push;
      let p = d(b, m);
      i += 1, o.splice(i, o.length, p), r && c && c({
        action: a,
        location: p,
        delta: 1
      });
    },
    replace(b, m) {
      a = Ct.Replace;
      let p = d(b, m);
      o[i] = p, r && c && c({
        action: a,
        location: p,
        delta: 0
      });
    },
    go(b) {
      a = Ct.Pop;
      let m = l(i + b), p = o[m];
      i = m, c && c({
        action: a,
        location: p,
        delta: b
      });
    },
    listen(b) {
      return c = b, () => {
        c = null;
      };
    }
  };
}
function $S(e) {
  e === void 0 && (e = {});
  function t(r, o) {
    let {
      pathname: i,
      search: a,
      hash: c
    } = r.location;
    return so(
      "",
      {
        pathname: i,
        search: a,
        hash: c
      },
      // state defaults to `null` because `window.history.state` does
      o.state && o.state.usr || null,
      o.state && o.state.key || "default"
    );
  }
  function n(r, o) {
    return typeof o == "string" ? o : _n(o);
  }
  return jp(t, n, null, e);
}
function _S(e) {
  e === void 0 && (e = {});
  function t(o, i) {
    let {
      pathname: a = "/",
      search: c = "",
      hash: l = ""
    } = bn(o.location.hash.substr(1));
    return !a.startsWith("/") && !a.startsWith(".") && (a = "/" + a), so(
      "",
      {
        pathname: a,
        search: c,
        hash: l
      },
      // state defaults to `null` because `window.history.state` does
      i.state && i.state.usr || null,
      i.state && i.state.key || "default"
    );
  }
  function n(o, i) {
    let a = o.document.querySelector("base"), c = "";
    if (a && a.getAttribute("href")) {
      let l = o.location.href, u = l.indexOf("#");
      c = u === -1 ? l : l.slice(0, u);
    }
    return c + "#" + (typeof i == "string" ? i : _n(i));
  }
  function r(o, i) {
    ft(o.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(i) + ")");
  }
  return jp(t, n, r, e);
}
function fe(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function ft(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function MS() {
  return Math.random().toString(36).substr(2, 8);
}
function Nu(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t
  };
}
function so(e, t, n, r) {
  return n === void 0 && (n = null), io({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? bn(t) : t, {
    state: n,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: t && t.key || r || MS()
  });
}
function _n(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: r = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r), t;
}
function bn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let r = e.indexOf("?");
    r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e);
  }
  return t;
}
function jp(e, t, n, r) {
  r === void 0 && (r = {});
  let {
    window: o = document.defaultView,
    v5Compat: i = !1
  } = r, a = o.history, c = Ct.Pop, l = null, u = d();
  u == null && (u = 0, a.replaceState(io({}, a.state, {
    idx: u
  }), ""));
  function d() {
    return (a.state || {
      idx: null
    }).idx;
  }
  function f() {
    c = Ct.Pop;
    let g = d(), C = g == null ? null : g - u;
    u = g, l && l({
      action: c,
      location: p.location,
      delta: C
    });
  }
  function h(g, C) {
    c = Ct.Push;
    let T = so(p.location, g, C);
    n && n(T, g), u = d() + 1;
    let w = Nu(T, u), E = p.createHref(T);
    try {
      a.pushState(w, "", E);
    } catch (S) {
      if (S instanceof DOMException && S.name === "DataCloneError")
        throw S;
      o.location.assign(E);
    }
    i && l && l({
      action: c,
      location: p.location,
      delta: 1
    });
  }
  function b(g, C) {
    c = Ct.Replace;
    let T = so(p.location, g, C);
    n && n(T, g), u = d();
    let w = Nu(T, u), E = p.createHref(T);
    a.replaceState(w, "", E), i && l && l({
      action: c,
      location: p.location,
      delta: 0
    });
  }
  function m(g) {
    let C = o.location.origin !== "null" ? o.location.origin : o.location.href, T = typeof g == "string" ? g : _n(g);
    return T = T.replace(/ $/, "%20"), fe(C, "No window.location.(origin|href) available to create URL for href: " + T), new URL(T, C);
  }
  let p = {
    get action() {
      return c;
    },
    get location() {
      return e(o, a);
    },
    listen(g) {
      if (l)
        throw new Error("A history only accepts one active listener");
      return o.addEventListener(Pu, f), l = g, () => {
        o.removeEventListener(Pu, f), l = null;
      };
    },
    createHref(g) {
      return t(o, g);
    },
    createURL: m,
    encodeLocation(g) {
      let C = m(g);
      return {
        pathname: C.pathname,
        search: C.search,
        hash: C.hash
      };
    },
    push: h,
    replace: b,
    go(g) {
      return a.go(g);
    }
  };
  return p;
}
var ju;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(ju || (ju = {}));
function DS(e, t, n) {
  return n === void 0 && (n = "/"), LS(e, t, n);
}
function LS(e, t, n, r) {
  let o = typeof t == "string" ? bn(t) : t, i = mn(o.pathname || "/", n);
  if (i == null)
    return null;
  let a = Ap(e);
  BS(a);
  let c = null;
  for (let l = 0; c == null && l < a.length; ++l) {
    let u = XS(i);
    c = YS(a[l], u);
  }
  return c;
}
function Ap(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let o = (i, a, c) => {
    let l = {
      relativePath: c === void 0 ? i.path || "" : c,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: a,
      route: i
    };
    l.relativePath.startsWith("/") && (fe(l.relativePath.startsWith(r), 'Absolute route path "' + l.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), l.relativePath = l.relativePath.slice(r.length));
    let u = Zt([r, l.relativePath]), d = n.concat(l);
    i.children && i.children.length > 0 && (fe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      i.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + u + '".')
    ), Ap(i.children, t, d, u)), !(i.path == null && !i.index) && t.push({
      path: u,
      score: qS(u, i.index),
      routesMeta: d
    });
  };
  return e.forEach((i, a) => {
    var c;
    if (i.path === "" || !((c = i.path) != null && c.includes("?")))
      o(i, a);
    else
      for (let l of Ip(i.path))
        o(i, a, l);
  }), t;
}
function Ip(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t, o = n.endsWith("?"), i = n.replace(/\?$/, "");
  if (r.length === 0)
    return o ? [i, ""] : [i];
  let a = Ip(r.join("/")), c = [];
  return c.push(...a.map((l) => l === "" ? i : [i, l].join("/"))), o && c.push(...a), c.map((l) => e.startsWith("/") && l === "" ? "/" : l);
}
function BS(e) {
  e.sort((t, n) => t.score !== n.score ? n.score - t.score : GS(t.routesMeta.map((r) => r.childrenIndex), n.routesMeta.map((r) => r.childrenIndex)));
}
const FS = /^:[\w-]+$/, VS = 3, US = 2, zS = 1, WS = 10, HS = -2, Au = (e) => e === "*";
function qS(e, t) {
  let n = e.split("/"), r = n.length;
  return n.some(Au) && (r += HS), t && (r += US), n.filter((o) => !Au(o)).reduce((o, i) => o + (FS.test(i) ? VS : i === "" ? zS : WS), r);
}
function GS(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function YS(e, t, n) {
  let {
    routesMeta: r
  } = e, o = {}, i = "/", a = [];
  for (let c = 0; c < r.length; ++c) {
    let l = r[c], u = c === r.length - 1, d = i === "/" ? t : t.slice(i.length) || "/", f = ua({
      path: l.relativePath,
      caseSensitive: l.caseSensitive,
      end: u
    }, d), h = l.route;
    if (!f)
      return null;
    Object.assign(o, f.params), a.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: Zt([i, f.pathname]),
      pathnameBase: ew(Zt([i, f.pathnameBase])),
      route: h
    }), f.pathnameBase !== "/" && (i = Zt([i, f.pathnameBase]));
  }
  return a;
}
function ua(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [n, r] = KS(e.path, e.caseSensitive, e.end), o = t.match(n);
  if (!o) return null;
  let i = o[0], a = i.replace(/(.)\/+$/, "$1"), c = o.slice(1);
  return {
    params: r.reduce((u, d, f) => {
      let {
        paramName: h,
        isOptional: b
      } = d;
      if (h === "*") {
        let p = c[f] || "";
        a = i.slice(0, i.length - p.length).replace(/(.)\/+$/, "$1");
      }
      const m = c[f];
      return b && !m ? u[h] = void 0 : u[h] = (m || "").replace(/%2F/g, "/"), u;
    }, {}),
    pathname: i,
    pathnameBase: a,
    pattern: e
  };
}
function KS(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), ft(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let r = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (a, c, l) => (r.push({
    paramName: c,
    isOptional: l != null
  }), l ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (r.push({
    paramName: "*"
  }), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), r];
}
function XS(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return ft(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function mn(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function JS(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: o = ""
  } = typeof e == "string" ? bn(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : ZS(n, t) : t,
    search: tw(r),
    hash: nw(o)
  };
}
function ZS(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? n.length > 1 && n.pop() : o !== "." && n.push(o);
  }), n.length > 1 ? n.join("/") : "/";
}
function Os(e, t, n, r) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function QS(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function yc(e, t) {
  let n = QS(e);
  return t ? n.map((r, o) => o === n.length - 1 ? r.pathname : r.pathnameBase) : n.map((r) => r.pathnameBase);
}
function vc(e, t, n, r) {
  r === void 0 && (r = !1);
  let o;
  typeof e == "string" ? o = bn(e) : (o = io({}, e), fe(!o.pathname || !o.pathname.includes("?"), Os("?", "pathname", "search", o)), fe(!o.pathname || !o.pathname.includes("#"), Os("#", "pathname", "hash", o)), fe(!o.search || !o.search.includes("#"), Os("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "", a = i ? "/" : o.pathname, c;
  if (a == null)
    c = n;
  else {
    let f = t.length - 1;
    if (!r && a.startsWith("..")) {
      let h = a.split("/");
      for (; h[0] === ".."; )
        h.shift(), f -= 1;
      o.pathname = h.join("/");
    }
    c = f >= 0 ? t[f] : "/";
  }
  let l = JS(o, c), u = a && a !== "/" && a.endsWith("/"), d = (i || a === ".") && n.endsWith("/");
  return !l.pathname.endsWith("/") && (u || d) && (l.pathname += "/"), l;
}
const Zt = (e) => e.join("/").replace(/\/\/+/g, "/"), ew = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), tw = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, nw = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function rw(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
const $p = ["post", "put", "patch", "delete"];
new Set($p);
const ow = ["get", ...$p];
new Set(ow);
/**
 * React Router v6.28.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ao() {
  return ao = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ao.apply(this, arguments);
}
const Eo = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (Eo.displayName = "DataRouter");
const bc = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (bc.displayName = "DataRouterState");
const iw = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (iw.displayName = "Await");
const Nt = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (Nt.displayName = "Navigation");
const So = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (So.displayName = "Location");
const jt = /* @__PURE__ */ v.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (jt.displayName = "Route");
const xc = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (xc.displayName = "RouteError");
function sw(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  yr() || (process.env.NODE_ENV !== "production" ? fe(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : fe(!1));
  let {
    basename: r,
    navigator: o
  } = v.useContext(Nt), {
    hash: i,
    pathname: a,
    search: c
  } = wo(e, {
    relative: n
  }), l = a;
  return r !== "/" && (l = a === "/" ? r : Zt([r, a])), o.createHref({
    pathname: l,
    search: c,
    hash: i
  });
}
function yr() {
  return v.useContext(So) != null;
}
function qt() {
  return yr() || (process.env.NODE_ENV !== "production" ? fe(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : fe(!1)), v.useContext(So).location;
}
const _p = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Mp(e) {
  v.useContext(Nt).static || v.useLayoutEffect(e);
}
function Ln() {
  let {
    isDataRoute: e
  } = v.useContext(jt);
  return e ? ww() : aw();
}
function aw() {
  yr() || (process.env.NODE_ENV !== "production" ? fe(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : fe(!1));
  let e = v.useContext(Eo), {
    basename: t,
    future: n,
    navigator: r
  } = v.useContext(Nt), {
    matches: o
  } = v.useContext(jt), {
    pathname: i
  } = qt(), a = JSON.stringify(yc(o, n.v7_relativeSplatPath)), c = v.useRef(!1);
  return Mp(() => {
    c.current = !0;
  }), v.useCallback(function(u, d) {
    if (d === void 0 && (d = {}), process.env.NODE_ENV !== "production" && ft(c.current, _p), !c.current) return;
    if (typeof u == "number") {
      r.go(u);
      return;
    }
    let f = vc(u, JSON.parse(a), i, d.relative === "path");
    e == null && t !== "/" && (f.pathname = f.pathname === "/" ? t : Zt([t, f.pathname])), (d.replace ? r.replace : r.push)(f, d.state, d);
  }, [t, r, a, i, e]);
}
const cw = /* @__PURE__ */ v.createContext(null);
function lw(e) {
  let t = v.useContext(jt).outlet;
  return t && /* @__PURE__ */ v.createElement(cw.Provider, {
    value: e
  }, t);
}
function uw() {
  let {
    matches: e
  } = v.useContext(jt), t = e[e.length - 1];
  return t ? t.params : {};
}
function wo(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: r
  } = v.useContext(Nt), {
    matches: o
  } = v.useContext(jt), {
    pathname: i
  } = qt(), a = JSON.stringify(yc(o, r.v7_relativeSplatPath));
  return v.useMemo(() => vc(e, JSON.parse(a), i, n === "path"), [e, a, i, n]);
}
function dw(e, t) {
  return fw(e, t);
}
function fw(e, t, n, r) {
  yr() || (process.env.NODE_ENV !== "production" ? fe(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  ) : fe(!1));
  let {
    navigator: o
  } = v.useContext(Nt), {
    matches: i
  } = v.useContext(jt), a = i[i.length - 1], c = a ? a.params : {}, l = a ? a.pathname : "/", u = a ? a.pathnameBase : "/", d = a && a.route;
  if (process.env.NODE_ENV !== "production") {
    let T = d && d.path || "";
    Lp(l, !d || T.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + l + '" (under <Route path="' + T + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + T + '"> to <Route ') + ('path="' + (T === "/" ? "*" : T + "/*") + '">.'));
  }
  let f = qt(), h;
  if (t) {
    var b;
    let T = typeof t == "string" ? bn(t) : t;
    u === "/" || (b = T.pathname) != null && b.startsWith(u) || (process.env.NODE_ENV !== "production" ? fe(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + u + '" ') + ('but pathname "' + T.pathname + '" was given in the `location` prop.')) : fe(!1)), h = T;
  } else
    h = f;
  let m = h.pathname || "/", p = m;
  if (u !== "/") {
    let T = u.replace(/^\//, "").split("/");
    p = "/" + m.replace(/^\//, "").split("/").slice(T.length).join("/");
  }
  let g = DS(e, {
    pathname: p
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && ft(d || g != null, 'No routes matched location "' + h.pathname + h.search + h.hash + '" '), process.env.NODE_ENV !== "production" && ft(g == null || g[g.length - 1].route.element !== void 0 || g[g.length - 1].route.Component !== void 0 || g[g.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + h.pathname + h.search + h.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let C = yw(g && g.map((T) => Object.assign({}, T, {
    params: Object.assign({}, c, T.params),
    pathname: Zt([
      u,
      // Re-encode pathnames that were decoded inside matchRoutes
      o.encodeLocation ? o.encodeLocation(T.pathname).pathname : T.pathname
    ]),
    pathnameBase: T.pathnameBase === "/" ? u : Zt([
      u,
      // Re-encode pathnames that were decoded inside matchRoutes
      o.encodeLocation ? o.encodeLocation(T.pathnameBase).pathname : T.pathnameBase
    ])
  })), i, n, r);
  return t && C ? /* @__PURE__ */ v.createElement(So.Provider, {
    value: {
      location: ao({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, h),
      navigationType: Ct.Pop
    }
  }, C) : C;
}
function pw() {
  let e = Sw(), t = rw(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), n = e instanceof Error ? e.stack : null, r = "rgba(200,200,200, 0.5)", o = {
    padding: "0.5rem",
    backgroundColor: r
  }, i = {
    padding: "2px 4px",
    backgroundColor: r
  }, a = null;
  return process.env.NODE_ENV !== "production" && (console.error("Error handled by React Router default ErrorBoundary:", e), a = /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ v.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ v.createElement("code", {
    style: i
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ v.createElement("code", {
    style: i
  }, "errorElement"), " prop on your route."))), /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ v.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, t), n ? /* @__PURE__ */ v.createElement("pre", {
    style: o
  }, n) : null, a);
}
const hw = /* @__PURE__ */ v.createElement(pw, null);
class mw extends v.Component {
  constructor(t) {
    super(t), this.state = {
      location: t.location,
      revalidation: t.revalidation,
      error: t.error
    };
  }
  static getDerivedStateFromError(t) {
    return {
      error: t
    };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? {
      error: t.error,
      location: t.location,
      revalidation: t.revalidation
    } : {
      error: t.error !== void 0 ? t.error : n.error,
      location: n.location,
      revalidation: t.revalidation || n.revalidation
    };
  }
  componentDidCatch(t, n) {
    console.error("React Router caught the following error during render", t, n);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ v.createElement(jt.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ v.createElement(xc.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function gw(e) {
  let {
    routeContext: t,
    match: n,
    children: r
  } = e, o = v.useContext(Eo);
  return o && o.static && o.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = n.route.id), /* @__PURE__ */ v.createElement(jt.Provider, {
    value: t
  }, r);
}
function yw(e, t, n, r) {
  var o;
  if (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null) {
    var i;
    if (!n)
      return null;
    if (n.errors)
      e = n.matches;
    else if ((i = r) != null && i.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0)
      e = n.matches;
    else
      return null;
  }
  let a = e, c = (o = n) == null ? void 0 : o.errors;
  if (c != null) {
    let d = a.findIndex((f) => f.route.id && (c == null ? void 0 : c[f.route.id]) !== void 0);
    d >= 0 || (process.env.NODE_ENV !== "production" ? fe(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(c).join(",")) : fe(!1)), a = a.slice(0, Math.min(a.length, d + 1));
  }
  let l = !1, u = -1;
  if (n && r && r.v7_partialHydration)
    for (let d = 0; d < a.length; d++) {
      let f = a[d];
      if ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (u = d), f.route.id) {
        let {
          loaderData: h,
          errors: b
        } = n, m = f.route.loader && h[f.route.id] === void 0 && (!b || b[f.route.id] === void 0);
        if (f.route.lazy || m) {
          l = !0, u >= 0 ? a = a.slice(0, u + 1) : a = [a[0]];
          break;
        }
      }
    }
  return a.reduceRight((d, f, h) => {
    let b, m = !1, p = null, g = null;
    n && (b = c && f.route.id ? c[f.route.id] : void 0, p = f.route.errorElement || hw, l && (u < 0 && h === 0 ? (Lp("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), m = !0, g = null) : u === h && (m = !0, g = f.route.hydrateFallbackElement || null)));
    let C = t.concat(a.slice(0, h + 1)), T = () => {
      let w;
      return b ? w = p : m ? w = g : f.route.Component ? w = /* @__PURE__ */ v.createElement(f.route.Component, null) : f.route.element ? w = f.route.element : w = d, /* @__PURE__ */ v.createElement(gw, {
        match: f,
        routeContext: {
          outlet: d,
          matches: C,
          isDataRoute: n != null
        },
        children: w
      });
    };
    return n && (f.route.ErrorBoundary || f.route.errorElement || h === 0) ? /* @__PURE__ */ v.createElement(mw, {
      location: n.location,
      revalidation: n.revalidation,
      component: p,
      error: b,
      children: T(),
      routeContext: {
        outlet: null,
        matches: C,
        isDataRoute: !0
      }
    }) : T();
  }, null);
}
var Dp = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(Dp || {}), co = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(co || {});
function Ec(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function vw(e) {
  let t = v.useContext(Eo);
  return t || (process.env.NODE_ENV !== "production" ? fe(!1, Ec(e)) : fe(!1)), t;
}
function bw(e) {
  let t = v.useContext(bc);
  return t || (process.env.NODE_ENV !== "production" ? fe(!1, Ec(e)) : fe(!1)), t;
}
function xw(e) {
  let t = v.useContext(jt);
  return t || (process.env.NODE_ENV !== "production" ? fe(!1, Ec(e)) : fe(!1)), t;
}
function Sc(e) {
  let t = xw(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? fe(!1, e + ' can only be used on routes that contain a unique "id"') : fe(!1)), n.route.id;
}
function Ew() {
  return Sc(co.UseRouteId);
}
function Sw() {
  var e;
  let t = v.useContext(xc), n = bw(co.UseRouteError), r = Sc(co.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function ww() {
  let {
    router: e
  } = vw(Dp.UseNavigateStable), t = Sc(co.UseNavigateStable), n = v.useRef(!1);
  return Mp(() => {
    n.current = !0;
  }), v.useCallback(function(o, i) {
    i === void 0 && (i = {}), process.env.NODE_ENV !== "production" && ft(n.current, _p), n.current && (typeof o == "number" ? e.navigate(o) : e.navigate(o, ao({
      fromRouteId: t
    }, i)));
  }, [e, t]);
}
const Iu = {};
function Lp(e, t, n) {
  !t && !Iu[e] && (Iu[e] = !0, process.env.NODE_ENV !== "production" && ft(!1, n));
}
const $u = {};
function Cw(e, t) {
  $u[t] || ($u[t] = !0, console.warn(t));
}
const _u = (e, t, n) => Cw(e, "⚠️ React Router Future Flag Warning: " + t + ". " + ("You can use the `" + e + "` future flag to opt-in early. ") + ("For more information, see " + n + "."));
function wc(e, t) {
  (e == null ? void 0 : e.v7_startTransition) === void 0 && _u("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (e == null ? void 0 : e.v7_relativeSplatPath) === void 0 && !t && _u("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
const Tw = "startTransition", Mu = v[Tw];
function kO(e) {
  let {
    basename: t,
    children: n,
    initialEntries: r,
    initialIndex: o,
    future: i
  } = e, a = v.useRef();
  a.current == null && (a.current = IS({
    initialEntries: r,
    initialIndex: o,
    v5Compat: !0
  }));
  let c = a.current, [l, u] = v.useState({
    action: c.action,
    location: c.location
  }), {
    v7_startTransition: d
  } = i || {}, f = v.useCallback((h) => {
    d && Mu ? Mu(() => u(h)) : u(h);
  }, [u, d]);
  return v.useLayoutEffect(() => c.listen(f), [c, f]), v.useEffect(() => wc(i), [i]), /* @__PURE__ */ v.createElement(Cc, {
    basename: t,
    children: n,
    location: l.location,
    navigationType: l.action,
    navigator: c,
    future: i
  });
}
function PO(e) {
  let {
    to: t,
    replace: n,
    state: r,
    relative: o
  } = e;
  yr() || (process.env.NODE_ENV !== "production" ? fe(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  ) : fe(!1));
  let {
    future: i,
    static: a
  } = v.useContext(Nt);
  process.env.NODE_ENV !== "production" && ft(!a, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: c
  } = v.useContext(jt), {
    pathname: l
  } = qt(), u = Ln(), d = vc(t, yc(c, i.v7_relativeSplatPath), l, o === "path"), f = JSON.stringify(d);
  return v.useEffect(() => u(JSON.parse(f), {
    replace: n,
    state: r,
    relative: o
  }), [u, f, o, n, r]), null;
}
function NO(e) {
  return lw(e.context);
}
function Ow(e) {
  process.env.NODE_ENV !== "production" ? fe(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : fe(!1);
}
function Cc(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: o = Ct.Pop,
    navigator: i,
    static: a = !1,
    future: c
  } = e;
  yr() && (process.env.NODE_ENV !== "production" ? fe(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : fe(!1));
  let l = t.replace(/^\/*/, "/"), u = v.useMemo(() => ({
    basename: l,
    navigator: i,
    static: a,
    future: ao({
      v7_relativeSplatPath: !1
    }, c)
  }), [l, c, i, a]);
  typeof r == "string" && (r = bn(r));
  let {
    pathname: d = "/",
    search: f = "",
    hash: h = "",
    state: b = null,
    key: m = "default"
  } = r, p = v.useMemo(() => {
    let g = mn(d, l);
    return g == null ? null : {
      location: {
        pathname: g,
        search: f,
        hash: h,
        state: b,
        key: m
      },
      navigationType: o
    };
  }, [l, d, f, h, b, m, o]);
  return process.env.NODE_ENV !== "production" && ft(p != null, '<Router basename="' + l + '"> is not able to match the URL ' + ('"' + d + f + h + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), p == null ? null : /* @__PURE__ */ v.createElement(Nt.Provider, {
    value: u
  }, /* @__PURE__ */ v.createElement(So.Provider, {
    children: n,
    value: p
  }));
}
function jO(e) {
  let {
    children: t,
    location: n
  } = e;
  return dw(da(t), n);
}
new Promise(() => {
});
function da(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return v.Children.forEach(e, (r, o) => {
    if (!/* @__PURE__ */ v.isValidElement(r))
      return;
    let i = [...t, o];
    if (r.type === v.Fragment) {
      n.push.apply(n, da(r.props.children, i));
      return;
    }
    r.type !== Ow && (process.env.NODE_ENV !== "production" ? fe(!1, "[" + (typeof r.type == "string" ? r.type : r.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : fe(!1)), !r.props.index || !r.props.children || (process.env.NODE_ENV !== "production" ? fe(!1, "An index route cannot have child routes.") : fe(!1));
    let a = {
      id: r.props.id || i.join("-"),
      caseSensitive: r.props.caseSensitive,
      element: r.props.element,
      Component: r.props.Component,
      index: r.props.index,
      path: r.props.path,
      loader: r.props.loader,
      action: r.props.action,
      errorElement: r.props.errorElement,
      ErrorBoundary: r.props.ErrorBoundary,
      hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
      shouldRevalidate: r.props.shouldRevalidate,
      handle: r.props.handle,
      lazy: r.props.lazy
    };
    r.props.children && (a.children = da(r.props.children, i)), n.push(a);
  }), n;
}
/**
 * React Router DOM v6.28.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function pr() {
  return pr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, pr.apply(this, arguments);
}
function Tc(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const ri = "get", oi = "application/x-www-form-urlencoded";
function Xi(e) {
  return e != null && typeof e.tagName == "string";
}
function Rw(e) {
  return Xi(e) && e.tagName.toLowerCase() === "button";
}
function kw(e) {
  return Xi(e) && e.tagName.toLowerCase() === "form";
}
function Pw(e) {
  return Xi(e) && e.tagName.toLowerCase() === "input";
}
function Nw(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function jw(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !Nw(e);
}
function fa(e) {
  return e === void 0 && (e = ""), new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, n) => {
    let r = e[n];
    return t.concat(Array.isArray(r) ? r.map((o) => [n, o]) : [[n, r]]);
  }, []));
}
function Aw(e, t) {
  let n = fa(e);
  return t && t.forEach((r, o) => {
    n.has(o) || t.getAll(o).forEach((i) => {
      n.append(o, i);
    });
  }), n;
}
let zo = null;
function Iw() {
  if (zo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), zo = !1;
    } catch {
      zo = !0;
    }
  return zo;
}
const $w = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Rs(e) {
  return e != null && !$w.has(e) ? (process.env.NODE_ENV !== "production" && ft(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + oi + '"')), null) : e;
}
function _w(e, t) {
  let n, r, o, i, a;
  if (kw(e)) {
    let c = e.getAttribute("action");
    r = c ? mn(c, t) : null, n = e.getAttribute("method") || ri, o = Rs(e.getAttribute("enctype")) || oi, i = new FormData(e);
  } else if (Rw(e) || Pw(e) && (e.type === "submit" || e.type === "image")) {
    let c = e.form;
    if (c == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let l = e.getAttribute("formaction") || c.getAttribute("action");
    if (r = l ? mn(l, t) : null, n = e.getAttribute("formmethod") || c.getAttribute("method") || ri, o = Rs(e.getAttribute("formenctype")) || Rs(c.getAttribute("enctype")) || oi, i = new FormData(c, e), !Iw()) {
      let {
        name: u,
        type: d,
        value: f
      } = e;
      if (d === "image") {
        let h = u ? u + "." : "";
        i.append(h + "x", "0"), i.append(h + "y", "0");
      } else u && i.append(u, f);
    }
  } else {
    if (Xi(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = ri, r = null, o = oi, a = e;
  }
  return i && o === "text/plain" && (a = i, i = void 0), {
    action: r,
    method: n.toLowerCase(),
    encType: o,
    formData: i,
    body: a
  };
}
const Mw = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Dw = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Lw = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], Bw = "6";
try {
  window.__reactRouterVersion = Bw;
} catch {
}
const Bp = /* @__PURE__ */ v.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (Bp.displayName = "ViewTransition");
const Fw = /* @__PURE__ */ v.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (Fw.displayName = "Fetchers");
const Vw = "startTransition", Si = v[Vw];
function AO(e) {
  let {
    basename: t,
    children: n,
    future: r,
    window: o
  } = e, i = v.useRef();
  i.current == null && (i.current = $S({
    window: o,
    v5Compat: !0
  }));
  let a = i.current, [c, l] = v.useState({
    action: a.action,
    location: a.location
  }), {
    v7_startTransition: u
  } = r || {}, d = v.useCallback((f) => {
    u && Si ? Si(() => l(f)) : l(f);
  }, [l, u]);
  return v.useLayoutEffect(() => a.listen(d), [a, d]), v.useEffect(() => wc(r), [r]), /* @__PURE__ */ v.createElement(Cc, {
    basename: t,
    children: n,
    location: c.location,
    navigationType: c.action,
    navigator: a,
    future: r
  });
}
function IO(e) {
  let {
    basename: t,
    children: n,
    future: r,
    window: o
  } = e, i = v.useRef();
  i.current == null && (i.current = _S({
    window: o,
    v5Compat: !0
  }));
  let a = i.current, [c, l] = v.useState({
    action: a.action,
    location: a.location
  }), {
    v7_startTransition: u
  } = r || {}, d = v.useCallback((f) => {
    u && Si ? Si(() => l(f)) : l(f);
  }, [l, u]);
  return v.useLayoutEffect(() => a.listen(d), [a, d]), v.useEffect(() => wc(r), [r]), /* @__PURE__ */ v.createElement(Cc, {
    basename: t,
    children: n,
    location: c.location,
    navigationType: c.action,
    navigator: a,
    future: r
  });
}
process.env.NODE_ENV;
const Uw = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", zw = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Fp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  let {
    onClick: r,
    relative: o,
    reloadDocument: i,
    replace: a,
    state: c,
    target: l,
    to: u,
    preventScrollReset: d,
    viewTransition: f
  } = t, h = Tc(t, Mw), {
    basename: b
  } = v.useContext(Nt), m, p = !1;
  if (typeof u == "string" && zw.test(u) && (m = u, Uw))
    try {
      let w = new URL(window.location.href), E = u.startsWith("//") ? new URL(w.protocol + u) : new URL(u), S = mn(E.pathname, b);
      E.origin === w.origin && S != null ? u = S + E.search + E.hash : p = !0;
    } catch {
      process.env.NODE_ENV !== "production" && ft(!1, '<Link to="' + u + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let g = sw(u, {
    relative: o
  }), C = Gw(u, {
    replace: a,
    state: c,
    target: l,
    preventScrollReset: d,
    relative: o,
    viewTransition: f
  });
  function T(w) {
    r && r(w), w.defaultPrevented || C(w);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ v.createElement("a", pr({}, h, {
      href: m || g,
      onClick: p || i ? r : T,
      ref: n,
      target: l
    }))
  );
});
process.env.NODE_ENV !== "production" && (Fp.displayName = "Link");
const Ww = /* @__PURE__ */ v.forwardRef(function(t, n) {
  let {
    "aria-current": r = "page",
    caseSensitive: o = !1,
    className: i = "",
    end: a = !1,
    style: c,
    to: l,
    viewTransition: u,
    children: d
  } = t, f = Tc(t, Dw), h = wo(l, {
    relative: f.relative
  }), b = qt(), m = v.useContext(bc), {
    navigator: p,
    basename: g
  } = v.useContext(Nt), C = m != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  eC(h) && u === !0, T = p.encodeLocation ? p.encodeLocation(h).pathname : h.pathname, w = b.pathname, E = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
  o || (w = w.toLowerCase(), E = E ? E.toLowerCase() : null, T = T.toLowerCase()), E && g && (E = mn(E, g) || E);
  const S = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
  let O = w === T || !a && w.startsWith(T) && w.charAt(S) === "/", R = E != null && (E === T || !a && E.startsWith(T) && E.charAt(T.length) === "/"), N = {
    isActive: O,
    isPending: R,
    isTransitioning: C
  }, j = O ? r : void 0, x;
  typeof i == "function" ? x = i(N) : x = [i, O ? "active" : null, R ? "pending" : null, C ? "transitioning" : null].filter(Boolean).join(" ");
  let P = typeof c == "function" ? c(N) : c;
  return /* @__PURE__ */ v.createElement(Fp, pr({}, f, {
    "aria-current": j,
    className: x,
    ref: n,
    style: P,
    to: l,
    viewTransition: u
  }), typeof d == "function" ? d(N) : d);
});
process.env.NODE_ENV !== "production" && (Ww.displayName = "NavLink");
const Hw = /* @__PURE__ */ v.forwardRef((e, t) => {
  let {
    fetcherKey: n,
    navigate: r,
    reloadDocument: o,
    replace: i,
    state: a,
    method: c = ri,
    action: l,
    onSubmit: u,
    relative: d,
    preventScrollReset: f,
    viewTransition: h
  } = e, b = Tc(e, Lw), m = Zw(), p = Qw(l, {
    relative: d
  }), g = c.toLowerCase() === "get" ? "get" : "post", C = (T) => {
    if (u && u(T), T.defaultPrevented) return;
    T.preventDefault();
    let w = T.nativeEvent.submitter, E = (w == null ? void 0 : w.getAttribute("formmethod")) || c;
    m(w || T.currentTarget, {
      fetcherKey: n,
      method: E,
      navigate: r,
      replace: i,
      state: a,
      relative: d,
      preventScrollReset: f,
      viewTransition: h
    });
  };
  return /* @__PURE__ */ v.createElement("form", pr({
    ref: t,
    method: g,
    action: p,
    onSubmit: o ? u : C
  }, b));
});
process.env.NODE_ENV !== "production" && (Hw.displayName = "Form");
process.env.NODE_ENV;
var wi;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(wi || (wi = {}));
var Du;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Du || (Du = {}));
function qw(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Vp(e) {
  let t = v.useContext(Eo);
  return t || (process.env.NODE_ENV !== "production" ? fe(!1, qw(e)) : fe(!1)), t;
}
function Gw(e, t) {
  let {
    target: n,
    replace: r,
    state: o,
    preventScrollReset: i,
    relative: a,
    viewTransition: c
  } = t === void 0 ? {} : t, l = Ln(), u = qt(), d = wo(e, {
    relative: a
  });
  return v.useCallback((f) => {
    if (jw(f, n)) {
      f.preventDefault();
      let h = r !== void 0 ? r : _n(u) === _n(d);
      l(e, {
        replace: h,
        state: o,
        preventScrollReset: i,
        relative: a,
        viewTransition: c
      });
    }
  }, [u, l, d, r, o, n, e, i, a, c]);
}
function Yw(e) {
  process.env.NODE_ENV !== "production" && ft(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");
  let t = v.useRef(fa(e)), n = v.useRef(!1), r = qt(), o = v.useMemo(() => (
    // Only merge in the defaults if we haven't yet called setSearchParams.
    // Once we call that we want those to take precedence, otherwise you can't
    // remove a param with setSearchParams({}) if it has an initial value
    Aw(r.search, n.current ? null : t.current)
  ), [r.search]), i = Ln(), a = v.useCallback((c, l) => {
    const u = fa(typeof c == "function" ? c(o) : c);
    n.current = !0, i("?" + u, l);
  }, [i, o]);
  return [o, a];
}
function Kw() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let Xw = 0, Jw = () => "__" + String(++Xw) + "__";
function Zw() {
  let {
    router: e
  } = Vp(wi.UseSubmit), {
    basename: t
  } = v.useContext(Nt), n = Ew();
  return v.useCallback(function(r, o) {
    o === void 0 && (o = {}), Kw();
    let {
      action: i,
      method: a,
      encType: c,
      formData: l,
      body: u
    } = _w(r, t);
    if (o.navigate === !1) {
      let d = o.fetcherKey || Jw();
      e.fetch(d, n, o.action || i, {
        preventScrollReset: o.preventScrollReset,
        formData: l,
        body: u,
        formMethod: o.method || a,
        formEncType: o.encType || c,
        flushSync: o.flushSync
      });
    } else
      e.navigate(o.action || i, {
        preventScrollReset: o.preventScrollReset,
        formData: l,
        body: u,
        formMethod: o.method || a,
        formEncType: o.encType || c,
        replace: o.replace,
        state: o.state,
        fromRouteId: n,
        flushSync: o.flushSync,
        viewTransition: o.viewTransition
      });
  }, [e, t, n]);
}
function Qw(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: r
  } = v.useContext(Nt), o = v.useContext(jt);
  o || (process.env.NODE_ENV !== "production" ? fe(!1, "useFormAction must be used inside a RouteContext") : fe(!1));
  let [i] = o.matches.slice(-1), a = pr({}, wo(e || ".", {
    relative: n
  })), c = qt();
  if (e == null) {
    a.search = c.search;
    let l = new URLSearchParams(a.search), u = l.getAll("index");
    if (u.some((f) => f === "")) {
      l.delete("index"), u.filter((h) => h).forEach((h) => l.append("index", h));
      let f = l.toString();
      a.search = f ? "?" + f : "";
    }
  }
  return (!e || e === ".") && i.route.index && (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (a.pathname = a.pathname === "/" ? r : Zt([r, a.pathname])), _n(a);
}
function eC(e, t) {
  t === void 0 && (t = {});
  let n = v.useContext(Bp);
  n == null && (process.env.NODE_ENV !== "production" ? fe(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : fe(!1));
  let {
    basename: r
  } = Vp(wi.useViewTransitionState), o = wo(e, {
    relative: t.relative
  });
  if (!n.isTransitioning)
    return !1;
  let i = mn(n.currentLocation.pathname, r) || n.currentLocation.pathname, a = mn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return ua(o.pathname, a) != null || ua(o.pathname, i) != null;
}
function tC(e) {
  const {
    pathname: t
  } = qt(), [n] = Yw(), r = Ln(), o = v.useCallback((a, {
    history: c = "auto"
  } = {}) => {
    if (c === "auto" || c === "push")
      return r(a);
    if (c === "replace")
      return r(a, {
        replace: !0
      });
    throw new Error(`Invalid history option: ${c}`);
  }, [r]), i = v.useMemo(() => ({
    pathname: t,
    searchParams: n,
    navigate: o
  }), [t, n, o]);
  return /* @__PURE__ */ y.jsx(Qf, {
    router: i,
    ...e
  });
}
const Lu = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (d, f) => {
    const h = typeof d == "function" ? d(t) : d;
    if (!Object.is(h, t)) {
      const b = t;
      t = f ?? (typeof h != "object" || h === null) ? h : Object.assign({}, t, h), n.forEach((m) => m(t, b));
    }
  }, o = () => t, l = { setState: r, getState: o, getInitialState: () => u, subscribe: (d) => (n.add(d), () => n.delete(d)), destroy: () => {
    n.clear();
  } }, u = t = e(r, o, l);
  return l;
}, nC = (e) => e ? Lu(e) : Lu;
var pa = { exports: {} }, ks = {}, Wo = { exports: {} }, Ps = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bu;
function rC() {
  if (Bu) return Ps;
  Bu = 1;
  var e = ue;
  function t(f, h) {
    return f === h && (f !== 0 || 1 / f === 1 / h) || f !== f && h !== h;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, o = e.useEffect, i = e.useLayoutEffect, a = e.useDebugValue;
  function c(f, h) {
    var b = h(), m = r({ inst: { value: b, getSnapshot: h } }), p = m[0].inst, g = m[1];
    return i(function() {
      p.value = b, p.getSnapshot = h, l(p) && g({ inst: p });
    }, [f, b, h]), o(function() {
      return l(p) && g({ inst: p }), f(function() {
        l(p) && g({ inst: p });
      });
    }, [f]), a(b), b;
  }
  function l(f) {
    var h = f.getSnapshot;
    f = f.value;
    try {
      var b = h();
      return !n(f, b);
    } catch {
      return !0;
    }
  }
  function u(f, h) {
    return h();
  }
  var d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? u : c;
  return Ps.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : d, Ps;
}
var Ns = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fu;
function oC() {
  return Fu || (Fu = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = ue, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function n(w) {
      {
        for (var E = arguments.length, S = new Array(E > 1 ? E - 1 : 0), O = 1; O < E; O++)
          S[O - 1] = arguments[O];
        r("error", w, S);
      }
    }
    function r(w, E, S) {
      {
        var O = t.ReactDebugCurrentFrame, R = O.getStackAddendum();
        R !== "" && (E += "%s", S = S.concat([R]));
        var N = S.map(function(j) {
          return String(j);
        });
        N.unshift("Warning: " + E), Function.prototype.apply.call(console[w], console, N);
      }
    }
    function o(w, E) {
      return w === E && (w !== 0 || 1 / w === 1 / E) || w !== w && E !== E;
    }
    var i = typeof Object.is == "function" ? Object.is : o, a = e.useState, c = e.useEffect, l = e.useLayoutEffect, u = e.useDebugValue, d = !1, f = !1;
    function h(w, E, S) {
      d || e.startTransition !== void 0 && (d = !0, n("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var O = E();
      if (!f) {
        var R = E();
        i(O, R) || (n("The result of getSnapshot should be cached to avoid an infinite loop"), f = !0);
      }
      var N = a({
        inst: {
          value: O,
          getSnapshot: E
        }
      }), j = N[0].inst, x = N[1];
      return l(function() {
        j.value = O, j.getSnapshot = E, b(j) && x({
          inst: j
        });
      }, [w, O, E]), c(function() {
        b(j) && x({
          inst: j
        });
        var P = function() {
          b(j) && x({
            inst: j
          });
        };
        return w(P);
      }, [w]), u(O), O;
    }
    function b(w) {
      var E = w.getSnapshot, S = w.value;
      try {
        var O = E();
        return !i(S, O);
      } catch {
        return !0;
      }
    }
    function m(w, E, S) {
      return E();
    }
    var p = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", g = !p, C = g ? m : h, T = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : C;
    Ns.useSyncExternalStore = T, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ns;
}
var Vu;
function Up() {
  return Vu || (Vu = 1, process.env.NODE_ENV === "production" ? Wo.exports = rC() : Wo.exports = oC()), Wo.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uu;
function iC() {
  if (Uu) return ks;
  Uu = 1;
  var e = ue, t = Up();
  function n(u, d) {
    return u === d && (u !== 0 || 1 / u === 1 / d) || u !== u && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : n, o = t.useSyncExternalStore, i = e.useRef, a = e.useEffect, c = e.useMemo, l = e.useDebugValue;
  return ks.useSyncExternalStoreWithSelector = function(u, d, f, h, b) {
    var m = i(null);
    if (m.current === null) {
      var p = { hasValue: !1, value: null };
      m.current = p;
    } else p = m.current;
    m = c(function() {
      function C(O) {
        if (!T) {
          if (T = !0, w = O, O = h(O), b !== void 0 && p.hasValue) {
            var R = p.value;
            if (b(R, O)) return E = R;
          }
          return E = O;
        }
        if (R = E, r(w, O)) return R;
        var N = h(O);
        return b !== void 0 && b(R, N) ? R : (w = O, E = N);
      }
      var T = !1, w, E, S = f === void 0 ? null : f;
      return [function() {
        return C(d());
      }, S === null ? void 0 : function() {
        return C(S());
      }];
    }, [d, f, h, b]);
    var g = o(u, m[0], m[1]);
    return a(function() {
      p.hasValue = !0, p.value = g;
    }, [g]), l(g), g;
  }, ks;
}
var js = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zu;
function sC() {
  return zu || (zu = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = ue, t = Up();
    function n(d, f) {
      return d === f && (d !== 0 || 1 / d === 1 / f) || d !== d && f !== f;
    }
    var r = typeof Object.is == "function" ? Object.is : n, o = t.useSyncExternalStore, i = e.useRef, a = e.useEffect, c = e.useMemo, l = e.useDebugValue;
    function u(d, f, h, b, m) {
      var p = i(null), g;
      p.current === null ? (g = {
        hasValue: !1,
        value: null
      }, p.current = g) : g = p.current;
      var C = c(function() {
        var S = !1, O, R, N = function(L) {
          if (!S) {
            S = !0, O = L;
            var _ = b(L);
            if (m !== void 0 && g.hasValue) {
              var V = g.value;
              if (m(V, _))
                return R = V, V;
            }
            return R = _, _;
          }
          var M = O, D = R;
          if (r(M, L))
            return D;
          var W = b(L);
          return m !== void 0 && m(D, W) ? D : (O = L, R = W, W);
        }, j = h === void 0 ? null : h, x = function() {
          return N(f());
        }, P = j === null ? void 0 : function() {
          return N(j());
        };
        return [x, P];
      }, [f, h, b, m]), T = C[0], w = C[1], E = o(d, T, w);
      return a(function() {
        g.hasValue = !0, g.value = E;
      }, [E]), l(E), E;
    }
    js.useSyncExternalStoreWithSelector = u, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), js;
}
process.env.NODE_ENV === "production" ? pa.exports = iC() : pa.exports = sC();
var aC = pa.exports;
const cC = /* @__PURE__ */ ka(aC), { useDebugValue: lC } = ue, { useSyncExternalStoreWithSelector: uC } = cC, dC = (e) => e;
function fC(e, t = dC, n) {
  const r = uC(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return lC(r), r;
}
const Wu = (e) => {
  const t = typeof e == "function" ? nC(e) : e, n = (r, o) => fC(t, r, o);
  return Object.assign(n, t), n;
}, Co = (e) => e ? Wu(e) : Wu, Oc = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 17h-2v-2h2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25"
}), "Help"), Rc = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm-2 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m4 8H8v-.57c0-.81.48-1.53 1.22-1.85.85-.37 1.79-.58 2.78-.58s1.93.21 2.78.58c.74.32 1.22 1.04 1.22 1.85z"
}), "ContactPage"), pC = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M5 13.18v4L12 21l7-3.82v-4L12 17zM12 3 1 9l11 6 9-4.91V17h2V9z"
}), "School"), zp = (e) => e.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""), ii = [
  { kind: "header", title: "Other" },
  {
    segment: "help",
    title: "Help",
    iconFC: Oc,
    kind: "page"
    // metadata: {
    //   description: "Get help and documentation",
    //   forRoles: ["student", "teacher", "guest"],
    //   isRootTool: true
    // }
  },
  {
    segment: "contact",
    title: "Contact",
    iconFC: Rc,
    kind: "page"
  }
], Wp = Co((e) => ({
  navigation: ii,
  baseSections: {
    header: { kind: "header", title: "Other" },
    contact: {
      segment: "contact",
      title: "Contact",
      iconFC: Rc,
      kind: "page"
    },
    help: {
      segment: "help",
      title: "Help",
      iconFC: Oc,
      kind: "page"
    }
  },
  sections: {},
  setNavigation: (t) => e({ navigation: t }),
  updateSection: (t, n, r) => e((o) => {
    console.log("Updating section: ", t, n, r);
    const i = zp(t.title), c = o.sections[i] || {
      kind: "page",
      segment: i,
      title: t.title,
      iconFC: pC,
      metadata: {
        description: t.description,
        forRoles: ["student", "teacher"],
        isRootTool: !0
      },
      children: []
    };
    c.children = [...r];
    const l = {
      ...o.sections,
      [i]: c
    }, u = [];
    for (const d in o.baseSections)
      u.push(o.baseSections[d]);
    for (const d in l)
      console.log("Item: ", l[d]), u.push(l[d]);
    return {
      sections: l,
      navigation: u
    };
  })
})), $O = (e) => ({
  teacher: ii,
  student: ii.filter(
    (n) => n.kind !== "header" || n.title !== "Exercise Session manager"
  ),
  guest: ii.filter(
    (n) => n.kind !== "header" || n.title !== "Exercise statistics"
  )
})[e] || [];
function Hp(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: hC } = Object.prototype, { getPrototypeOf: kc } = Object, Ji = /* @__PURE__ */ ((e) => (t) => {
  const n = hC.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), _t = (e) => (e = e.toLowerCase(), (t) => Ji(t) === e), Zi = (e) => (t) => typeof t === e, { isArray: vr } = Array, lo = Zi("undefined");
function mC(e) {
  return e !== null && !lo(e) && e.constructor !== null && !lo(e.constructor) && yt(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const qp = _t("ArrayBuffer");
function gC(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && qp(e.buffer), t;
}
const yC = Zi("string"), yt = Zi("function"), Gp = Zi("number"), Qi = (e) => e !== null && typeof e == "object", vC = (e) => e === !0 || e === !1, si = (e) => {
  if (Ji(e) !== "object")
    return !1;
  const t = kc(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, bC = _t("Date"), xC = _t("File"), EC = _t("Blob"), SC = _t("FileList"), wC = (e) => Qi(e) && yt(e.pipe), CC = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || yt(e.append) && ((t = Ji(e)) === "formdata" || // detect form-data instance
  t === "object" && yt(e.toString) && e.toString() === "[object FormData]"));
}, TC = _t("URLSearchParams"), [OC, RC, kC, PC] = ["ReadableStream", "Request", "Response", "Headers"].map(_t), NC = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function To(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, o;
  if (typeof e != "object" && (e = [e]), vr(e))
    for (r = 0, o = e.length; r < o; r++)
      t.call(null, e[r], r, e);
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length;
    let c;
    for (r = 0; r < a; r++)
      c = i[r], t.call(null, e[c], c, e);
  }
}
function Yp(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, o;
  for (; r-- > 0; )
    if (o = n[r], t === o.toLowerCase())
      return o;
  return null;
}
const Rn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Kp = (e) => !lo(e) && e !== Rn;
function ha() {
  const { caseless: e } = Kp(this) && this || {}, t = {}, n = (r, o) => {
    const i = e && Yp(t, o) || o;
    si(t[i]) && si(r) ? t[i] = ha(t[i], r) : si(r) ? t[i] = ha({}, r) : vr(r) ? t[i] = r.slice() : t[i] = r;
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && To(arguments[r], n);
  return t;
}
const jC = (e, t, n, { allOwnKeys: r } = {}) => (To(t, (o, i) => {
  n && yt(o) ? e[i] = Hp(o, n) : e[i] = o;
}, { allOwnKeys: r }), e), AC = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), IC = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, $C = (e, t, n, r) => {
  let o, i, a;
  const c = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      a = o[i], (!r || r(a, e, t)) && !c[a] && (t[a] = e[a], c[a] = !0);
    e = n !== !1 && kc(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, _C = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, MC = (e) => {
  if (!e) return null;
  if (vr(e)) return e;
  let t = e.length;
  if (!Gp(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, DC = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && kc(Uint8Array)), LC = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = r.next()) && !o.done; ) {
    const i = o.value;
    t.call(e, i[0], i[1]);
  }
}, BC = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, FC = _t("HTMLFormElement"), VC = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, o) {
    return r.toUpperCase() + o;
  }
), Hu = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), UC = _t("RegExp"), Xp = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  To(n, (o, i) => {
    let a;
    (a = t(o, i, e)) !== !1 && (r[i] = a || o);
  }), Object.defineProperties(e, r);
}, zC = (e) => {
  Xp(e, (t, n) => {
    if (yt(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (yt(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, WC = (e, t) => {
  const n = {}, r = (o) => {
    o.forEach((i) => {
      n[i] = !0;
    });
  };
  return vr(e) ? r(e) : r(String(e).split(t)), n;
}, HC = () => {
}, qC = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, As = "abcdefghijklmnopqrstuvwxyz", qu = "0123456789", Jp = {
  DIGIT: qu,
  ALPHA: As,
  ALPHA_DIGIT: As + As.toUpperCase() + qu
}, GC = (e = 16, t = Jp.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function YC(e) {
  return !!(e && yt(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const KC = (e) => {
  const t = new Array(10), n = (r, o) => {
    if (Qi(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[o] = r;
        const i = vr(r) ? [] : {};
        return To(r, (a, c) => {
          const l = n(a, o + 1);
          !lo(l) && (i[c] = l);
        }), t[o] = void 0, i;
      }
    }
    return r;
  };
  return n(e, 0);
}, XC = _t("AsyncFunction"), JC = (e) => e && (Qi(e) || yt(e)) && yt(e.then) && yt(e.catch), Zp = ((e, t) => e ? setImmediate : t ? ((n, r) => (Rn.addEventListener("message", ({ source: o, data: i }) => {
  o === Rn && i === n && r.length && r.shift()();
}, !1), (o) => {
  r.push(o), Rn.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  yt(Rn.postMessage)
), ZC = typeof queueMicrotask < "u" ? queueMicrotask.bind(Rn) : typeof process < "u" && process.nextTick || Zp, I = {
  isArray: vr,
  isArrayBuffer: qp,
  isBuffer: mC,
  isFormData: CC,
  isArrayBufferView: gC,
  isString: yC,
  isNumber: Gp,
  isBoolean: vC,
  isObject: Qi,
  isPlainObject: si,
  isReadableStream: OC,
  isRequest: RC,
  isResponse: kC,
  isHeaders: PC,
  isUndefined: lo,
  isDate: bC,
  isFile: xC,
  isBlob: EC,
  isRegExp: UC,
  isFunction: yt,
  isStream: wC,
  isURLSearchParams: TC,
  isTypedArray: DC,
  isFileList: SC,
  forEach: To,
  merge: ha,
  extend: jC,
  trim: NC,
  stripBOM: AC,
  inherits: IC,
  toFlatObject: $C,
  kindOf: Ji,
  kindOfTest: _t,
  endsWith: _C,
  toArray: MC,
  forEachEntry: LC,
  matchAll: BC,
  isHTMLForm: FC,
  hasOwnProperty: Hu,
  hasOwnProp: Hu,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Xp,
  freezeMethods: zC,
  toObjectSet: WC,
  toCamelCase: VC,
  noop: HC,
  toFiniteNumber: qC,
  findKey: Yp,
  global: Rn,
  isContextDefined: Kp,
  ALPHABET: Jp,
  generateString: GC,
  isSpecCompliantForm: YC,
  toJSONObject: KC,
  isAsyncFn: XC,
  isThenable: JC,
  setImmediate: Zp,
  asap: ZC
};
function de(e, t, n, r, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o, this.status = o.status ? o.status : null);
}
I.inherits(de, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: I.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Qp = de.prototype, eh = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  eh[e] = { value: e };
});
Object.defineProperties(de, eh);
Object.defineProperty(Qp, "isAxiosError", { value: !0 });
de.from = (e, t, n, r, o, i) => {
  const a = Object.create(Qp);
  return I.toFlatObject(e, a, function(l) {
    return l !== Error.prototype;
  }, (c) => c !== "isAxiosError"), de.call(a, e.message, t, n, r, o), a.cause = e, a.name = e.name, i && Object.assign(a, i), a;
};
const QC = null;
function ma(e) {
  return I.isPlainObject(e) || I.isArray(e);
}
function th(e) {
  return I.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Gu(e, t, n) {
  return e ? e.concat(t).map(function(o, i) {
    return o = th(o), !n && i ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function eT(e) {
  return I.isArray(e) && !e.some(ma);
}
const tT = I.toFlatObject(I, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function es(e, t, n) {
  if (!I.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = I.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, g) {
    return !I.isUndefined(g[p]);
  });
  const r = n.metaTokens, o = n.visitor || d, i = n.dots, a = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && I.isSpecCompliantForm(t);
  if (!I.isFunction(o))
    throw new TypeError("visitor must be a function");
  function u(m) {
    if (m === null) return "";
    if (I.isDate(m))
      return m.toISOString();
    if (!l && I.isBlob(m))
      throw new de("Blob is not supported. Use a Buffer instead.");
    return I.isArrayBuffer(m) || I.isTypedArray(m) ? l && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function d(m, p, g) {
    let C = m;
    if (m && !g && typeof m == "object") {
      if (I.endsWith(p, "{}"))
        p = r ? p : p.slice(0, -2), m = JSON.stringify(m);
      else if (I.isArray(m) && eT(m) || (I.isFileList(m) || I.endsWith(p, "[]")) && (C = I.toArray(m)))
        return p = th(p), C.forEach(function(w, E) {
          !(I.isUndefined(w) || w === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? Gu([p], E, i) : a === null ? p : p + "[]",
            u(w)
          );
        }), !1;
    }
    return ma(m) ? !0 : (t.append(Gu(g, p, i), u(m)), !1);
  }
  const f = [], h = Object.assign(tT, {
    defaultVisitor: d,
    convertValue: u,
    isVisitable: ma
  });
  function b(m, p) {
    if (!I.isUndefined(m)) {
      if (f.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      f.push(m), I.forEach(m, function(C, T) {
        (!(I.isUndefined(C) || C === null) && o.call(
          t,
          C,
          I.isString(T) ? T.trim() : T,
          p,
          h
        )) === !0 && b(C, p ? p.concat(T) : [T]);
      }), f.pop();
    }
  }
  if (!I.isObject(e))
    throw new TypeError("data must be an object");
  return b(e), t;
}
function Yu(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Pc(e, t) {
  this._pairs = [], e && es(e, this, t);
}
const nh = Pc.prototype;
nh.append = function(t, n) {
  this._pairs.push([t, n]);
};
nh.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Yu);
  } : Yu;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function nT(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function rh(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || nT;
  I.isFunction(n) && (n = {
    serialize: n
  });
  const o = n && n.serialize;
  let i;
  if (o ? i = o(t, n) : i = I.isURLSearchParams(t) ? t.toString() : new Pc(t, n).toString(r), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class Ku {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    I.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const oh = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, rT = typeof URLSearchParams < "u" ? URLSearchParams : Pc, oT = typeof FormData < "u" ? FormData : null, iT = typeof Blob < "u" ? Blob : null, sT = {
  isBrowser: !0,
  classes: {
    URLSearchParams: rT,
    FormData: oT,
    Blob: iT
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Nc = typeof window < "u" && typeof document < "u", ga = typeof navigator == "object" && navigator || void 0, aT = Nc && (!ga || ["ReactNative", "NativeScript", "NS"].indexOf(ga.product) < 0), cT = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", lT = Nc && window.location.href || "http://localhost", uT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Nc,
  hasStandardBrowserEnv: aT,
  hasStandardBrowserWebWorkerEnv: cT,
  navigator: ga,
  origin: lT
}, Symbol.toStringTag, { value: "Module" })), nt = {
  ...uT,
  ...sT
};
function dT(e, t) {
  return es(e, new nt.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, o, i) {
      return nt.isNode && I.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function fT(e) {
  return I.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function pT(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const o = n.length;
  let i;
  for (r = 0; r < o; r++)
    i = n[r], t[i] = e[i];
  return t;
}
function ih(e) {
  function t(n, r, o, i) {
    let a = n[i++];
    if (a === "__proto__") return !0;
    const c = Number.isFinite(+a), l = i >= n.length;
    return a = !a && I.isArray(o) ? o.length : a, l ? (I.hasOwnProp(o, a) ? o[a] = [o[a], r] : o[a] = r, !c) : ((!o[a] || !I.isObject(o[a])) && (o[a] = []), t(n, r, o[a], i) && I.isArray(o[a]) && (o[a] = pT(o[a])), !c);
  }
  if (I.isFormData(e) && I.isFunction(e.entries)) {
    const n = {};
    return I.forEachEntry(e, (r, o) => {
      t(fT(r), o, n, 0);
    }), n;
  }
  return null;
}
function hT(e, t, n) {
  if (I.isString(e))
    try {
      return (t || JSON.parse)(e), I.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (0, JSON.stringify)(e);
}
const Oo = {
  transitional: oh,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", o = r.indexOf("application/json") > -1, i = I.isObject(t);
    if (i && I.isHTMLForm(t) && (t = new FormData(t)), I.isFormData(t))
      return o ? JSON.stringify(ih(t)) : t;
    if (I.isArrayBuffer(t) || I.isBuffer(t) || I.isStream(t) || I.isFile(t) || I.isBlob(t) || I.isReadableStream(t))
      return t;
    if (I.isArrayBufferView(t))
      return t.buffer;
    if (I.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let c;
    if (i) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return dT(t, this.formSerializer).toString();
      if ((c = I.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return es(
          c ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return i || o ? (n.setContentType("application/json", !1), hT(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Oo.transitional, r = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (I.isResponse(t) || I.isReadableStream(t))
      return t;
    if (t && I.isString(t) && (r && !this.responseType || o)) {
      const a = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (c) {
        if (a)
          throw c.name === "SyntaxError" ? de.from(c, de.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: nt.classes.FormData,
    Blob: nt.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
I.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Oo.headers[e] = {};
});
const mT = I.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), gT = (e) => {
  const t = {};
  let n, r, o;
  return e && e.split(`
`).forEach(function(a) {
    o = a.indexOf(":"), n = a.substring(0, o).trim().toLowerCase(), r = a.substring(o + 1).trim(), !(!n || t[n] && mT[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Xu = Symbol("internals");
function Pr(e) {
  return e && String(e).trim().toLowerCase();
}
function ai(e) {
  return e === !1 || e == null ? e : I.isArray(e) ? e.map(ai) : String(e);
}
function yT(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const vT = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Is(e, t, n, r, o) {
  if (I.isFunction(r))
    return r.call(this, t, n);
  if (o && (t = n), !!I.isString(t)) {
    if (I.isString(r))
      return t.indexOf(r) !== -1;
    if (I.isRegExp(r))
      return r.test(t);
  }
}
function bT(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function xT(e, t) {
  const n = I.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(o, i, a) {
        return this[r].call(this, t, o, i, a);
      },
      configurable: !0
    });
  });
}
class dt {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function i(c, l, u) {
      const d = Pr(l);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const f = I.findKey(o, d);
      (!f || o[f] === void 0 || u === !0 || u === void 0 && o[f] !== !1) && (o[f || l] = ai(c));
    }
    const a = (c, l) => I.forEach(c, (u, d) => i(u, d, l));
    if (I.isPlainObject(t) || t instanceof this.constructor)
      a(t, n);
    else if (I.isString(t) && (t = t.trim()) && !vT(t))
      a(gT(t), n);
    else if (I.isHeaders(t))
      for (const [c, l] of t.entries())
        i(l, c, r);
    else
      t != null && i(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Pr(t), t) {
      const r = I.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n)
          return o;
        if (n === !0)
          return yT(o);
        if (I.isFunction(n))
          return n.call(this, o, r);
        if (I.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Pr(t), t) {
      const r = I.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Is(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function i(a) {
      if (a = Pr(a), a) {
        const c = I.findKey(r, a);
        c && (!n || Is(r, r[c], c, n)) && (delete r[c], o = !0);
      }
    }
    return I.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, o = !1;
    for (; r--; ) {
      const i = n[r];
      (!t || Is(this, this[i], i, t, !0)) && (delete this[i], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, r = {};
    return I.forEach(this, (o, i) => {
      const a = I.findKey(r, i);
      if (a) {
        n[a] = ai(o), delete n[i];
        return;
      }
      const c = t ? bT(i) : String(i).trim();
      c !== i && delete n[i], n[c] = ai(o), r[c] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return I.forEach(this, (r, o) => {
      r != null && r !== !1 && (n[o] = t && I.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[Xu] = this[Xu] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(a) {
      const c = Pr(a);
      r[c] || (xT(o, a), r[c] = !0);
    }
    return I.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
dt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
I.reduceDescriptors(dt.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
I.freezeMethods(dt);
function $s(e, t) {
  const n = this || Oo, r = t || n, o = dt.from(r.headers);
  let i = r.data;
  return I.forEach(e, function(c) {
    i = c.call(n, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function sh(e) {
  return !!(e && e.__CANCEL__);
}
function br(e, t, n) {
  de.call(this, e ?? "canceled", de.ERR_CANCELED, t, n), this.name = "CanceledError";
}
I.inherits(br, de, {
  __CANCEL__: !0
});
function ah(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new de(
    "Request failed with status code " + n.status,
    [de.ERR_BAD_REQUEST, de.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function ET(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function ST(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let o = 0, i = 0, a;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const u = Date.now(), d = r[i];
    a || (a = u), n[o] = l, r[o] = u;
    let f = i, h = 0;
    for (; f !== o; )
      h += n[f++], f = f % e;
    if (o = (o + 1) % e, o === i && (i = (i + 1) % e), u - a < t)
      return;
    const b = d && u - d;
    return b ? Math.round(h * 1e3 / b) : void 0;
  };
}
function wT(e, t) {
  let n = 0, r = 1e3 / t, o, i;
  const a = (u, d = Date.now()) => {
    n = d, o = null, i && (clearTimeout(i), i = null), e.apply(null, u);
  };
  return [(...u) => {
    const d = Date.now(), f = d - n;
    f >= r ? a(u, d) : (o = u, i || (i = setTimeout(() => {
      i = null, a(o);
    }, r - f)));
  }, () => o && a(o)];
}
const Ci = (e, t, n = 3) => {
  let r = 0;
  const o = ST(50, 250);
  return wT((i) => {
    const a = i.loaded, c = i.lengthComputable ? i.total : void 0, l = a - r, u = o(l), d = a <= c;
    r = a;
    const f = {
      loaded: a,
      total: c,
      progress: c ? a / c : void 0,
      bytes: l,
      rate: u || void 0,
      estimated: u && c && d ? (c - a) / u : void 0,
      event: i,
      lengthComputable: c != null,
      [t ? "download" : "upload"]: !0
    };
    e(f);
  }, n);
}, Ju = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, Zu = (e) => (...t) => I.asap(() => e(...t)), CT = nt.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, nt.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(nt.origin),
  nt.navigator && /(msie|trident)/i.test(nt.navigator.userAgent)
) : () => !0, TT = nt.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, o, i) {
      const a = [e + "=" + encodeURIComponent(t)];
      I.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), I.isString(r) && a.push("path=" + r), I.isString(o) && a.push("domain=" + o), i === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function OT(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function RT(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ch(e, t) {
  return e && !OT(t) ? RT(e, t) : t;
}
const Qu = (e) => e instanceof dt ? { ...e } : e;
function Mn(e, t) {
  t = t || {};
  const n = {};
  function r(u, d, f, h) {
    return I.isPlainObject(u) && I.isPlainObject(d) ? I.merge.call({ caseless: h }, u, d) : I.isPlainObject(d) ? I.merge({}, d) : I.isArray(d) ? d.slice() : d;
  }
  function o(u, d, f, h) {
    if (I.isUndefined(d)) {
      if (!I.isUndefined(u))
        return r(void 0, u, f, h);
    } else return r(u, d, f, h);
  }
  function i(u, d) {
    if (!I.isUndefined(d))
      return r(void 0, d);
  }
  function a(u, d) {
    if (I.isUndefined(d)) {
      if (!I.isUndefined(u))
        return r(void 0, u);
    } else return r(void 0, d);
  }
  function c(u, d, f) {
    if (f in t)
      return r(u, d);
    if (f in e)
      return r(void 0, u);
  }
  const l = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: c,
    headers: (u, d, f) => o(Qu(u), Qu(d), f, !0)
  };
  return I.forEach(Object.keys(Object.assign({}, e, t)), function(d) {
    const f = l[d] || o, h = f(e[d], t[d], d);
    I.isUndefined(h) && f !== c || (n[d] = h);
  }), n;
}
const lh = (e) => {
  const t = Mn({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: i, headers: a, auth: c } = t;
  t.headers = a = dt.from(a), t.url = rh(ch(t.baseURL, t.url), e.params, e.paramsSerializer), c && a.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  );
  let l;
  if (I.isFormData(n)) {
    if (nt.hasStandardBrowserEnv || nt.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if ((l = a.getContentType()) !== !1) {
      const [u, ...d] = l ? l.split(";").map((f) => f.trim()).filter(Boolean) : [];
      a.setContentType([u || "multipart/form-data", ...d].join("; "));
    }
  }
  if (nt.hasStandardBrowserEnv && (r && I.isFunction(r) && (r = r(t)), r || r !== !1 && CT(t.url))) {
    const u = o && i && TT.read(i);
    u && a.set(o, u);
  }
  return t;
}, kT = typeof XMLHttpRequest < "u", PT = kT && function(e) {
  return new Promise(function(n, r) {
    const o = lh(e);
    let i = o.data;
    const a = dt.from(o.headers).normalize();
    let { responseType: c, onUploadProgress: l, onDownloadProgress: u } = o, d, f, h, b, m;
    function p() {
      b && b(), m && m(), o.cancelToken && o.cancelToken.unsubscribe(d), o.signal && o.signal.removeEventListener("abort", d);
    }
    let g = new XMLHttpRequest();
    g.open(o.method.toUpperCase(), o.url, !0), g.timeout = o.timeout;
    function C() {
      if (!g)
        return;
      const w = dt.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), S = {
        data: !c || c === "text" || c === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: w,
        config: e,
        request: g
      };
      ah(function(R) {
        n(R), p();
      }, function(R) {
        r(R), p();
      }, S), g = null;
    }
    "onloadend" in g ? g.onloadend = C : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(C);
    }, g.onabort = function() {
      g && (r(new de("Request aborted", de.ECONNABORTED, e, g)), g = null);
    }, g.onerror = function() {
      r(new de("Network Error", de.ERR_NETWORK, e, g)), g = null;
    }, g.ontimeout = function() {
      let E = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const S = o.transitional || oh;
      o.timeoutErrorMessage && (E = o.timeoutErrorMessage), r(new de(
        E,
        S.clarifyTimeoutError ? de.ETIMEDOUT : de.ECONNABORTED,
        e,
        g
      )), g = null;
    }, i === void 0 && a.setContentType(null), "setRequestHeader" in g && I.forEach(a.toJSON(), function(E, S) {
      g.setRequestHeader(S, E);
    }), I.isUndefined(o.withCredentials) || (g.withCredentials = !!o.withCredentials), c && c !== "json" && (g.responseType = o.responseType), u && ([h, m] = Ci(u, !0), g.addEventListener("progress", h)), l && g.upload && ([f, b] = Ci(l), g.upload.addEventListener("progress", f), g.upload.addEventListener("loadend", b)), (o.cancelToken || o.signal) && (d = (w) => {
      g && (r(!w || w.type ? new br(null, e, g) : w), g.abort(), g = null);
    }, o.cancelToken && o.cancelToken.subscribe(d), o.signal && (o.signal.aborted ? d() : o.signal.addEventListener("abort", d)));
    const T = ET(o.url);
    if (T && nt.protocols.indexOf(T) === -1) {
      r(new de("Unsupported protocol " + T + ":", de.ERR_BAD_REQUEST, e));
      return;
    }
    g.send(i || null);
  });
}, NT = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), o;
    const i = function(u) {
      if (!o) {
        o = !0, c();
        const d = u instanceof Error ? u : this.reason;
        r.abort(d instanceof de ? d : new br(d instanceof Error ? d.message : d));
      }
    };
    let a = t && setTimeout(() => {
      a = null, i(new de(`timeout ${t} of ms exceeded`, de.ETIMEDOUT));
    }, t);
    const c = () => {
      e && (a && clearTimeout(a), a = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(i) : u.removeEventListener("abort", i);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", i));
    const { signal: l } = r;
    return l.unsubscribe = () => I.asap(c), l;
  }
}, jT = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, o;
  for (; r < n; )
    o = r + t, yield e.slice(r, o), r = o;
}, AT = async function* (e, t) {
  for await (const n of IT(e))
    yield* jT(n, t);
}, IT = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, ed = (e, t, n, r) => {
  const o = AT(e, t);
  let i = 0, a, c = (l) => {
    a || (a = !0, r && r(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: u, value: d } = await o.next();
        if (u) {
          c(), l.close();
          return;
        }
        let f = d.byteLength;
        if (n) {
          let h = i += f;
          n(h);
        }
        l.enqueue(new Uint8Array(d));
      } catch (u) {
        throw c(u), u;
      }
    },
    cancel(l) {
      return c(l), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, ts = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", uh = ts && typeof ReadableStream == "function", $T = ts && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), dh = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, _T = uh && dh(() => {
  let e = !1;
  const t = new Request(nt.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), td = 64 * 1024, ya = uh && dh(() => I.isReadableStream(new Response("").body)), Ti = {
  stream: ya && ((e) => e.body)
};
ts && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Ti[t] && (Ti[t] = I.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new de(`Response type '${t}' is not supported`, de.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const MT = async (e) => {
  if (e == null)
    return 0;
  if (I.isBlob(e))
    return e.size;
  if (I.isSpecCompliantForm(e))
    return (await new Request(nt.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (I.isArrayBufferView(e) || I.isArrayBuffer(e))
    return e.byteLength;
  if (I.isURLSearchParams(e) && (e = e + ""), I.isString(e))
    return (await $T(e)).byteLength;
}, DT = async (e, t) => {
  const n = I.toFiniteNumber(e.getContentLength());
  return n ?? MT(t);
}, LT = ts && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: o,
    cancelToken: i,
    timeout: a,
    onDownloadProgress: c,
    onUploadProgress: l,
    responseType: u,
    headers: d,
    withCredentials: f = "same-origin",
    fetchOptions: h
  } = lh(e);
  u = u ? (u + "").toLowerCase() : "text";
  let b = NT([o, i && i.toAbortSignal()], a), m;
  const p = b && b.unsubscribe && (() => {
    b.unsubscribe();
  });
  let g;
  try {
    if (l && _T && n !== "get" && n !== "head" && (g = await DT(d, r)) !== 0) {
      let S = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), O;
      if (I.isFormData(r) && (O = S.headers.get("content-type")) && d.setContentType(O), S.body) {
        const [R, N] = Ju(
          g,
          Ci(Zu(l))
        );
        r = ed(S.body, td, R, N);
      }
    }
    I.isString(f) || (f = f ? "include" : "omit");
    const C = "credentials" in Request.prototype;
    m = new Request(t, {
      ...h,
      signal: b,
      method: n.toUpperCase(),
      headers: d.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: C ? f : void 0
    });
    let T = await fetch(m);
    const w = ya && (u === "stream" || u === "response");
    if (ya && (c || w && p)) {
      const S = {};
      ["status", "statusText", "headers"].forEach((j) => {
        S[j] = T[j];
      });
      const O = I.toFiniteNumber(T.headers.get("content-length")), [R, N] = c && Ju(
        O,
        Ci(Zu(c), !0)
      ) || [];
      T = new Response(
        ed(T.body, td, R, () => {
          N && N(), p && p();
        }),
        S
      );
    }
    u = u || "text";
    let E = await Ti[I.findKey(Ti, u) || "text"](T, e);
    return !w && p && p(), await new Promise((S, O) => {
      ah(S, O, {
        data: E,
        headers: dt.from(T.headers),
        status: T.status,
        statusText: T.statusText,
        config: e,
        request: m
      });
    });
  } catch (C) {
    throw p && p(), C && C.name === "TypeError" && /fetch/i.test(C.message) ? Object.assign(
      new de("Network Error", de.ERR_NETWORK, e, m),
      {
        cause: C.cause || C
      }
    ) : de.from(C, C && C.code, e, m);
  }
}), va = {
  http: QC,
  xhr: PT,
  fetch: LT
};
I.forEach(va, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const nd = (e) => `- ${e}`, BT = (e) => I.isFunction(e) || e === null || e === !1, fh = {
  getAdapter: (e) => {
    e = I.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const o = {};
    for (let i = 0; i < t; i++) {
      n = e[i];
      let a;
      if (r = n, !BT(n) && (r = va[(a = String(n)).toLowerCase()], r === void 0))
        throw new de(`Unknown adapter '${a}'`);
      if (r)
        break;
      o[a || "#" + i] = r;
    }
    if (!r) {
      const i = Object.entries(o).map(
        ([c, l]) => `adapter ${c} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = t ? i.length > 1 ? `since :
` + i.map(nd).join(`
`) : " " + nd(i[0]) : "as no adapter specified";
      throw new de(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: va
};
function _s(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new br(null, e);
}
function rd(e) {
  return _s(e), e.headers = dt.from(e.headers), e.data = $s.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), fh.getAdapter(e.adapter || Oo.adapter)(e).then(function(r) {
    return _s(e), r.data = $s.call(
      e,
      e.transformResponse,
      r
    ), r.headers = dt.from(r.headers), r;
  }, function(r) {
    return sh(r) || (_s(e), r && r.response && (r.response.data = $s.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = dt.from(r.response.headers))), Promise.reject(r);
  });
}
const ph = "1.7.9", ns = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  ns[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const od = {};
ns.transitional = function(t, n, r) {
  function o(i, a) {
    return "[Axios v" + ph + "] Transitional option '" + i + "'" + a + (r ? ". " + r : "");
  }
  return (i, a, c) => {
    if (t === !1)
      throw new de(
        o(a, " has been removed" + (n ? " in " + n : "")),
        de.ERR_DEPRECATED
      );
    return n && !od[a] && (od[a] = !0, console.warn(
      o(
        a,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(i, a, c) : !0;
  };
};
ns.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function FT(e, t, n) {
  if (typeof e != "object")
    throw new de("options must be an object", de.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const i = r[o], a = t[i];
    if (a) {
      const c = e[i], l = c === void 0 || a(c, i, e);
      if (l !== !0)
        throw new de("option " + i + " must be " + l, de.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new de("Unknown option " + i, de.ERR_BAD_OPTION);
  }
}
const ci = {
  assertOptions: FT,
  validators: ns
}, Vt = ci.validators;
class Nn {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Ku(),
      response: new Ku()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const i = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? i && !String(r.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + i) : r.stack = i;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Mn(this.defaults, n);
    const { transitional: r, paramsSerializer: o, headers: i } = n;
    r !== void 0 && ci.assertOptions(r, {
      silentJSONParsing: Vt.transitional(Vt.boolean),
      forcedJSONParsing: Vt.transitional(Vt.boolean),
      clarifyTimeoutError: Vt.transitional(Vt.boolean)
    }, !1), o != null && (I.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : ci.assertOptions(o, {
      encode: Vt.function,
      serialize: Vt.function
    }, !0)), ci.assertOptions(n, {
      baseUrl: Vt.spelling("baseURL"),
      withXsrfToken: Vt.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let a = i && I.merge(
      i.common,
      i[n.method]
    );
    i && I.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete i[m];
      }
    ), n.headers = dt.concat(a, i);
    const c = [];
    let l = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(n) === !1 || (l = l && p.synchronous, c.unshift(p.fulfilled, p.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(p) {
      u.push(p.fulfilled, p.rejected);
    });
    let d, f = 0, h;
    if (!l) {
      const m = [rd.bind(this), void 0];
      for (m.unshift.apply(m, c), m.push.apply(m, u), h = m.length, d = Promise.resolve(n); f < h; )
        d = d.then(m[f++], m[f++]);
      return d;
    }
    h = c.length;
    let b = n;
    for (f = 0; f < h; ) {
      const m = c[f++], p = c[f++];
      try {
        b = m(b);
      } catch (g) {
        p.call(this, g);
        break;
      }
    }
    try {
      d = rd.call(this, b);
    } catch (m) {
      return Promise.reject(m);
    }
    for (f = 0, h = u.length; f < h; )
      d = d.then(u[f++], u[f++]);
    return d;
  }
  getUri(t) {
    t = Mn(this.defaults, t);
    const n = ch(t.baseURL, t.url);
    return rh(n, t.params, t.paramsSerializer);
  }
}
I.forEach(["delete", "get", "head", "options"], function(t) {
  Nn.prototype[t] = function(n, r) {
    return this.request(Mn(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
I.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(i, a, c) {
      return this.request(Mn(c || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: a
      }));
    };
  }
  Nn.prototype[t] = n(), Nn.prototype[t + "Form"] = n(!0);
});
class jc {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(i) {
      n = i;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; )
        r._listeners[i](o);
      r._listeners = null;
    }), this.promise.then = (o) => {
      let i;
      const a = new Promise((c) => {
        r.subscribe(c), i = c;
      }).then(o);
      return a.cancel = function() {
        r.unsubscribe(i);
      }, a;
    }, t(function(i, a, c) {
      r.reason || (r.reason = new br(i, a, c), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new jc(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
function VT(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function UT(e) {
  return I.isObject(e) && e.isAxiosError === !0;
}
const ba = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(ba).forEach(([e, t]) => {
  ba[t] = e;
});
function hh(e) {
  const t = new Nn(e), n = Hp(Nn.prototype.request, t);
  return I.extend(n, Nn.prototype, t, { allOwnKeys: !0 }), I.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return hh(Mn(e, o));
  }, n;
}
const Ze = hh(Oo);
Ze.Axios = Nn;
Ze.CanceledError = br;
Ze.CancelToken = jc;
Ze.isCancel = sh;
Ze.VERSION = ph;
Ze.toFormData = es;
Ze.AxiosError = de;
Ze.Cancel = Ze.CanceledError;
Ze.all = function(t) {
  return Promise.all(t);
};
Ze.spread = VT;
Ze.isAxiosError = UT;
Ze.mergeConfig = Mn;
Ze.AxiosHeaders = dt;
Ze.formToJSON = (e) => ih(I.isHTMLForm(e) ? new FormData(e) : e);
Ze.getAdapter = fh.getAdapter;
Ze.HttpStatusCode = ba;
Ze.default = Ze;
const zT = "/";
function WT(e) {
  let t = null;
  if (document.cookie && document.cookie !== "") {
    const n = document.cookie.split(";");
    for (let r = 0; r < n.length; r++) {
      const o = n[r].trim();
      if (o.substring(0, e.length + 1) === e + "=") {
        t = decodeURIComponent(o.substring(e.length + 1));
        break;
      }
    }
  }
  return t;
}
const HT = WT("csrftoken"), Bn = Ze.create({
  baseURL: zT,
  withCredentials: !0,
  // for CSRF tokens, if needed
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": HT
  }
}), qT = async (e) => {
  try {
    return (await Bn.get(
      `api/users/current/${e ? `?course_id=${e}` : ""}`
    )).data;
  } catch (t) {
    throw console.error("Error getting current user", t), t;
  }
}, GT = async (e) => {
  try {
    const t = await Bn.get(
      `api/users/${e ? `?course_id=${e}` : ""}`
    );
    return console.log("response", t), t.data;
  } catch (t) {
    throw console.error("Error getting users", t), t;
  }
}, YT = async () => {
  try {
    await Bn.post("/auth/lti_logout/");
  } catch (e) {
    throw console.error("Error logging out user", e), e;
  }
}, Dr = "/static/images/student.png", Lr = "/static/images/teacher.png", xa = "/static/images/guest.png", Ms = [
  {
    id: "1",
    name: "Teacher User",
    email: "teacher@edu.com",
    role: "teacher",
    image: Lr,
    color: "#3f51b5"
  },
  {
    id: "2",
    name: "Student User",
    email: "student@edu.com",
    role: "student",
    image: Dr,
    color: "#f50057"
  },
  {
    id: "3",
    name: "Guest User",
    email: "",
    role: "guest",
    image: xa,
    color: "#f50057"
  }
], rs = Co((e) => ({
  fetchState: "idle",
  user: null,
  testUsers: Ms,
  users: [],
  setTestUsers: (t) => e({ testUsers: t }),
  setUser: (t) => e({ user: t }),
  getUser: async (t) => {
    try {
      e({ fetchState: "loading" }), e({ testUsers: Ms });
      const n = await qT(t);
      if (n.image = n.role === "student" ? Dr : Lr, n) {
        let r;
        n.role === "student" ? r = Dr : n.role === "teacher" ? r = Lr : r = xa, e({
          user: { ...n, image: r },
          fetchState: "idle",
          testUsers: Ms.filter((o) => o.role !== n.role)
        });
      }
    } catch (n) {
      console.log("Error getting user", n), e({ fetchState: "error" });
    }
  },
  getUsers: async () => {
    try {
      e({ fetchState: "loading" });
      const t = await GT();
      t.forEach((n) => {
        n.image = n.role === "student" ? Dr : Lr;
      }), e(t ? { users: t, fetchState: "idle" } : { fetchState: "error" });
    } catch {
      e({ fetchState: "error" });
    }
  },
  changeRole: (t) => e((n) => {
    if (n.user) {
      let r;
      return t === "student" ? r = Dr : t === "teacher" ? r = Lr : r = xa, { user: { ...n.user, role: t, image: r } };
    }
    return n;
  }),
  clearUser: () => e({ user: null }),
  logout: async () => {
    try {
      return await YT(), e({ user: null }), Promise.resolve();
    } catch (t) {
      return Promise.reject(t);
    }
  }
})), KT = (e) => e.replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, ""), XT = (e) => e.toLowerCase().replace(/_([a-z])/g, (t, n) => n.toUpperCase()), hr = (e) => {
  if (e == null) return e;
  if (Array.isArray(e))
    return e.map((n) => hr(n));
  if (typeof e != "object") return e;
  const t = {};
  return Object.entries(e).forEach(([n, r]) => {
    const o = XT(n);
    t[o] = hr(r);
  }), t;
}, Ea = (e) => {
  if (e == null) return e;
  if (Array.isArray(e))
    return e.map((n) => Ea(n));
  if (typeof e != "object") return e;
  const t = {};
  return Object.entries(e).forEach(([n, r]) => {
    const o = KT(n);
    t[o] = Ea(r);
  }), t;
};
async function JT() {
  try {
    const e = await Bn.get("api/courses/current/");
    return hr(e.data);
  } catch (e) {
    throw new Error("Failed to retrieve current course: " + e);
  }
}
async function ZT() {
  try {
    const e = await Bn.get("api/courses/");
    return hr(e.data);
  } catch (e) {
    throw new Error("Failed to retrieve courses: " + e);
  }
}
async function QT(e) {
  try {
    const t = btoa(e), n = await Bn.get(`api/courses/?encoded_url=${t}`);
    return hr(n.data[0]);
  } catch (t) {
    throw new Error("Failed to retrieve course by URL: " + t);
  }
}
async function e1(e) {
  try {
    const t = await Bn.put(
      `api/courses/${e.id}/`,
      Ea(e)
    ), n = hr(t.data);
    if (n.ltiLoginUrl !== e.ltiLoginUrl)
      throw new Error("Update verification failed");
    return n;
  } catch (t) {
    throw new Error(`Failed to update the course: ${t}`);
  }
}
const xr = Co((e) => ({
  fetchState: "loading",
  currentCourseUrl: "",
  currentCourse: null,
  courses: [],
  getCourseByUrl: async (t) => {
    try {
      const n = await QT(t);
      e({ currentCourse: n });
    } catch (n) {
      console.error("Failed to fetch course by URL:", n);
    }
  },
  setCurrentCourseUrl: (t) => e({ currentCourseUrl: t }),
  setCurrentCourse: (t) => e({ currentCourse: t }),
  updateCurrentCourse: async (t) => {
    try {
      const n = await e1(t);
      if (n && n.id === t.id)
        return e({ currentCourse: n }), n;
      throw new Error("Invalid response from server");
    } catch (n) {
      throw console.error("Failed to update the course:", n), n;
    }
  },
  getCurrentCourse: async () => {
    try {
      const t = await JT();
      e({ currentCourse: t });
    } catch (t) {
      console.error("Failed to fetch current course:", t);
    }
  },
  getCourses: async () => {
    try {
      e({ fetchState: "loading" });
      const n = await ZT();
      e({ fetchState: "idle" }), e({ courses: n });
    } catch (t) {
      e({ fetchState: "error" }), console.error("Failed to fetch courses:", t);
    }
  }
}));
function t1() {
  const e = Ln(), t = qt();
  return console.log("location", t, e), {
    pathname: t.pathname,
    searchParams: new URLSearchParams(t.search),
    navigate: e
    // navigate: (url: string, options: { history?: "replace" } = {}) => {
    //   const method = options?.history === "replace" ? "replace" : "push";
    //   navigate(url, { replace: method === "replace" });
    // },
  };
}
const n1 = () => {
  const { setCurrentCourse: e } = xr((t) => t);
  return /* @__PURE__ */ y.jsx(
    gt,
    {
      onClick: () => e(null),
      sx: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1"
        // gap: '0.5rem',
      },
      children: /* @__PURE__ */ y.jsx(Qe, { variant: "h1", component: "h1", children: "EduML" })
    }
  );
}, r1 = Yh({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme"
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.2
    },
    h2: { fontSize: "1.25rem", fontWeight: 600 },
    h3: { fontSize: "1.1rem", fontWeight: 500 },
    h4: { fontSize: "1rem", fontWeight: 500 },
    h5: { fontSize: "0.875rem", fontWeight: 500 },
    h6: { fontSize: "0.75rem", fontWeight: 500 },
    subtitle1: { fontSize: "0.875rem", lineHeight: 1.5 },
    subtitle2: { fontSize: "0.75rem", lineHeight: 1.5 },
    body1: { fontSize: "0.875rem", lineHeight: 1.5 },
    body2: { fontSize: "0.75rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 500 },
    caption: { fontSize: "0.75rem", lineHeight: 1.66 },
    overline: { fontSize: "0.75rem", textTransform: "uppercase" }
  },
  shape: {
    borderRadius: 8
  },
  spacing: 8,
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        background: {
          default: "#f5f5f5",
          paper: "#ffffff"
        },
        primary: {
          main: "#6a1b9a",
          light: "#9c4dcc",
          dark: "#38006b",
          contrastText: "#ffffff"
        },
        secondary: {
          main: "#ff4081",
          light: "#ff79b0",
          dark: "#c60055",
          contrastText: "#000000"
        },
        error: {
          main: "#e57373",
          light: "#ff8a80",
          dark: "#d32f2f",
          contrastText: "#ffffff"
        },
        warning: {
          main: "#ffb74d",
          light: "#ffe97d",
          dark: "#f57c00",
          contrastText: "#000000"
        },
        info: {
          main: "#64b5f6",
          light: "#9be7ff",
          dark: "#2286c3",
          contrastText: "#000000"
        },
        success: {
          main: "#81c784",
          light: "#b2fab4",
          dark: "#519657",
          contrastText: "#000000"
        },
        text: {
          primary: "rgba(0, 0, 0, 0.87)",
          secondary: "rgba(0, 0, 0, 0.6)",
          disabled: "rgba(0, 0, 0, 0.38)"
        },
        divider: "rgba(0, 0, 0, 0.12)"
      }
    },
    dark: {
      palette: {
        mode: "dark",
        background: {
          default: "#303030",
          paper: "#424242"
        },
        primary: {
          main: "#9575cd",
          light: "#c7a4ff",
          dark: "#65499c",
          contrastText: "#ffffff"
        },
        secondary: {
          main: "#ff4081",
          light: "#ff79b0",
          dark: "#c60055",
          contrastText: "#ffffff"
        },
        error: {
          main: "#ef9a9a",
          light: "#ffcccb",
          dark: "#ba6b6c",
          contrastText: "#000000"
        },
        warning: {
          main: "#ffb74d",
          light: "#ffe97d",
          dark: "#f57c00",
          contrastText: "#000000"
        },
        info: {
          main: "#64b5f6",
          light: "#9be7ff",
          dark: "#2286c3",
          contrastText: "#000000"
        },
        success: {
          main: "#81c784",
          light: "#b2fab4",
          dark: "#519657",
          contrastText: "#000000"
        },
        text: {
          primary: "#ffffff",
          secondary: "rgba(255, 255, 255, 0.7)",
          disabled: "rgba(255, 255, 255, 0.5)"
        },
        divider: "rgba(255, 255, 255, 0.12)"
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    }
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    }
  },
  zIndex: {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  }
}), o1 = ({ IconFC: e }) => {
  const t = (n) => {
    n.preventDefault();
  };
  return e ? /* @__PURE__ */ y.jsx(gt, { onClick: t, children: /* @__PURE__ */ y.jsx(e, { fontSize: "small" }) }) : null;
}, mh = (e) => e.map((t) => {
  if (t.kind === "page") {
    const n = t.iconFC ? /* @__PURE__ */ y.jsx(o1, { IconFC: t.iconFC }) : void 0, r = t.children ? mh(t.children).filter(
      (o) => o.kind === "page"
    ) : void 0;
    return { ...t, icon: n, children: r };
  }
  return t;
}), i1 = ({
  ActionHandler: e,
  props: t
}) => {
  const n = (r) => (r.preventDefault(), /* @__PURE__ */ y.jsx(e, { ...t }));
  return /* @__PURE__ */ y.jsx(
    Vd,
    {
      onClick: n,
      "data-testid": "action-fc-wrapper",
      sx: {
        width: "100%"
        // display: 'flex',
        //make it relative to the parent
        // position: 'relative',
      },
      children: /* @__PURE__ */ y.jsx(e, { ...t })
    }
  );
}, gh = (e, t) => {
  var r;
  if (e.kind !== "page") return e;
  const n = (r = e.children) == null ? void 0 : r.map(
    (o) => gh(o)
  ).filter((o) => o.kind === "page");
  return e != null && e.actionFC ? {
    ...e,
    action: /* @__PURE__ */ y.jsx(i1, { ActionHandler: e.actionFC, props: {} }),
    children: n
  } : { ...e, children: n };
}, s1 = (e, t) => e.map((n) => gh(n));
function yh(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (n = yh(e[t])) && (r && (r += " "), r += n);
  else for (t in e) e[t] && (r && (r += " "), r += t);
  return r;
}
function Fn() {
  for (var e, t, n = 0, r = ""; n < arguments.length; ) (e = arguments[n++]) && (t = yh(e)) && (r && (r += " "), r += t);
  return r;
}
let a1 = { data: "" }, c1 = (e) => typeof window == "object" ? ((e ? e.querySelector("#_goober") : window._goober) || Object.assign((e || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : e || a1, l1 = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, u1 = /\/\*[^]*?\*\/|  +/g, id = /\n+/g, Cn = (e, t) => {
  let n = "", r = "", o = "";
  for (let i in e) {
    let a = e[i];
    i[0] == "@" ? i[1] == "i" ? n = i + " " + a + ";" : r += i[1] == "f" ? Cn(a, i) : i + "{" + Cn(a, i[1] == "k" ? "" : t) + "}" : typeof a == "object" ? r += Cn(a, t ? t.replace(/([^,])+/g, (c) => i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (l) => /&/.test(l) ? l.replace(/&/g, c) : c ? c + " " + l : l)) : i) : a != null && (i = /^--/.test(i) ? i : i.replace(/[A-Z]/g, "-$&").toLowerCase(), o += Cn.p ? Cn.p(i, a) : i + ":" + a + ";");
  }
  return n + (t && o ? t + "{" + o + "}" : o) + r;
}, Xt = {}, vh = (e) => {
  if (typeof e == "object") {
    let t = "";
    for (let n in e) t += n + vh(e[n]);
    return t;
  }
  return e;
}, d1 = (e, t, n, r, o) => {
  let i = vh(e), a = Xt[i] || (Xt[i] = ((l) => {
    let u = 0, d = 11;
    for (; u < l.length; ) d = 101 * d + l.charCodeAt(u++) >>> 0;
    return "go" + d;
  })(i));
  if (!Xt[a]) {
    let l = i !== e ? e : ((u) => {
      let d, f, h = [{}];
      for (; d = l1.exec(u.replace(u1, "")); ) d[4] ? h.shift() : d[3] ? (f = d[3].replace(id, " ").trim(), h.unshift(h[0][f] = h[0][f] || {})) : h[0][d[1]] = d[2].replace(id, " ").trim();
      return h[0];
    })(e);
    Xt[a] = Cn(o ? { ["@keyframes " + a]: l } : l, n ? "" : "." + a);
  }
  let c = n && Xt.g ? Xt.g : null;
  return n && (Xt.g = Xt[a]), ((l, u, d, f) => {
    f ? u.data = u.data.replace(f, l) : u.data.indexOf(l) === -1 && (u.data = d ? l + u.data : u.data + l);
  })(Xt[a], t, r, c), a;
}, f1 = (e, t, n) => e.reduce((r, o, i) => {
  let a = t[i];
  if (a && a.call) {
    let c = a(n), l = c && c.props && c.props.className || /^go/.test(c) && c;
    a = l ? "." + l : c && typeof c == "object" ? c.props ? "" : Cn(c, "") : c === !1 ? "" : c;
  }
  return r + o + (a ?? "");
}, "");
function Ac(e) {
  let t = this || {}, n = e.call ? e(t.p) : e;
  return d1(n.unshift ? n.raw ? f1(n, [].slice.call(arguments, 1), t.p) : n.reduce((r, o) => Object.assign(r, o && o.call ? o(t.p) : o), {}) : n, c1(t.target), t.g, t.o, t.k);
}
Ac.bind({ g: 1 });
Ac.bind({ k: 1 });
function p1(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function bh(e, t, n) {
  return t && p1(e.prototype, t), e;
}
function ke() {
  return ke = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ke.apply(this, arguments);
}
function xh(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}
function Ro(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function sd(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
var ad = function() {
  return "";
}, Eh = /* @__PURE__ */ ue.createContext({
  enqueueSnackbar: ad,
  closeSnackbar: ad
}), wn = {
  downXs: "@media (max-width:599.95px)",
  upSm: "@media (min-width:600px)"
}, cd = function(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Ic = function(t) {
  return "" + cd(t.vertical) + cd(t.horizontal);
}, Ho = function(t) {
  return !!t || t === 0;
}, qo = "unmounted", Xn = "exited", Jn = "entering", Nr = "entered", ld = "exiting", $c = /* @__PURE__ */ function(e) {
  xh(t, e);
  function t(r) {
    var o;
    o = e.call(this, r) || this;
    var i = r.appear, a;
    return o.appearStatus = null, r.in ? i ? (a = Xn, o.appearStatus = Jn) : a = Nr : r.unmountOnExit || r.mountOnEnter ? a = qo : a = Xn, o.state = {
      status: a
    }, o.nextCallback = null, o;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var a = o.in;
    return a && i.status === qo ? {
      status: Xn
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var a = this.state.status;
      this.props.in ? a !== Jn && a !== Nr && (i = Jn) : (a === Jn || a === Nr) && (i = ld);
    }
    this.updateStatus(!1, i);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, i = o, a = o;
    return o != null && typeof o != "number" && typeof o != "string" && (a = o.exit, i = o.enter), {
      exit: a,
      enter: i
    };
  }, n.updateStatus = function(o, i) {
    o === void 0 && (o = !1), i !== null ? (this.cancelNextCallback(), i === Jn ? this.performEnter(o) : this.performExit()) : this.props.unmountOnExit && this.state.status === Xn && this.setState({
      status: qo
    });
  }, n.performEnter = function(o) {
    var i = this, a = this.props.enter, c = o, l = this.getTimeouts();
    if (!o && !a) {
      this.safeSetState({
        status: Nr
      }, function() {
        i.props.onEntered && i.props.onEntered(i.node, c);
      });
      return;
    }
    this.props.onEnter && this.props.onEnter(this.node, c), this.safeSetState({
      status: Jn
    }, function() {
      i.props.onEntering && i.props.onEntering(i.node, c), i.onTransitionEnd(l.enter, function() {
        i.safeSetState({
          status: Nr
        }, function() {
          i.props.onEntered && i.props.onEntered(i.node, c);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, a = this.getTimeouts();
    if (!i) {
      this.safeSetState({
        status: Xn
      }, function() {
        o.props.onExited && o.props.onExited(o.node);
      });
      return;
    }
    this.props.onExit && this.props.onExit(this.node), this.safeSetState({
      status: ld
    }, function() {
      o.props.onExiting && o.props.onExiting(o.node), o.onTransitionEnd(a.exit, function() {
        o.safeSetState({
          status: Xn
        }, function() {
          o.props.onExited && o.props.onExited(o.node);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && this.nextCallback.cancel && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(o, i) {
    i = this.setNextCallback(i), this.setState(o, i);
  }, n.setNextCallback = function(o) {
    var i = this, a = !0;
    return this.nextCallback = function() {
      a && (a = !1, i.nextCallback = null, o());
    }, this.nextCallback.cancel = function() {
      a = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var a = o == null && !this.props.addEndListener;
    if (!this.node || a) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    this.props.addEndListener && this.props.addEndListener(this.node, this.nextCallback), o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === qo)
      return null;
    var i = this.props, a = i.children, c = Ro(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return a(o, c);
  }, bh(t, [{
    key: "node",
    get: function() {
      var o, i = (o = this.props.nodeRef) === null || o === void 0 ? void 0 : o.current;
      if (!i)
        throw new Error("notistack - Custom snackbar is not refForwarding");
      return i;
    }
  }]), t;
}(ue.Component);
function Zn() {
}
$c.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Zn,
  onEntering: Zn,
  onEntered: Zn,
  onExit: Zn,
  onExiting: Zn,
  onExited: Zn
};
function ud(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function Sa(e, t) {
  return bd(function() {
    return e == null && t == null ? null : function(n) {
      ud(e, n), ud(t, n);
    };
  }, [e, t]);
}
function Oi(e) {
  var t = e.timeout, n = e.style, r = n === void 0 ? {} : n, o = e.mode;
  return {
    duration: typeof t == "object" ? t[o] || 0 : t,
    easing: r.transitionTimingFunction,
    delay: r.transitionDelay
  };
}
var wa = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Sh = function(t) {
  t.scrollTop = t.scrollTop;
}, dd = function(t) {
  return Math.round(t) + "ms";
};
function tr(e, t) {
  e === void 0 && (e = ["all"]);
  var n = t || {}, r = n.duration, o = r === void 0 ? 300 : r, i = n.easing, a = i === void 0 ? wa.easeInOut : i, c = n.delay, l = c === void 0 ? 0 : c, u = Array.isArray(e) ? e : [e];
  return u.map(function(d) {
    var f = typeof o == "string" ? o : dd(o), h = typeof l == "string" ? l : dd(l);
    return d + " " + f + " " + a + " " + h;
  }).join(",");
}
function h1(e) {
  return e && e.ownerDocument || document;
}
function wh(e) {
  var t = h1(e);
  return t.defaultView || window;
}
function m1(e, t) {
  t === void 0 && (t = 166);
  var n;
  function r() {
    for (var o = this, i = arguments.length, a = new Array(i), c = 0; c < i; c++)
      a[c] = arguments[c];
    var l = function() {
      e.apply(o, a);
    };
    clearTimeout(n), n = setTimeout(l, t);
  }
  return r.clear = function() {
    clearTimeout(n);
  }, r;
}
function g1(e, t) {
  var n = t.getBoundingClientRect(), r = wh(t), o;
  if (t.fakeTransform)
    o = t.fakeTransform;
  else {
    var i = r.getComputedStyle(t);
    o = i.getPropertyValue("-webkit-transform") || i.getPropertyValue("transform");
  }
  var a = 0, c = 0;
  if (o && o !== "none" && typeof o == "string") {
    var l = o.split("(")[1].split(")")[0].split(",");
    a = parseInt(l[4], 10), c = parseInt(l[5], 10);
  }
  switch (e) {
    case "left":
      return "translateX(" + (r.innerWidth + a - n.left) + "px)";
    case "right":
      return "translateX(-" + (n.left + n.width - a) + "px)";
    case "up":
      return "translateY(" + (r.innerHeight + c - n.top) + "px)";
    default:
      return "translateY(-" + (n.top + n.height - c) + "px)";
  }
}
function Go(e, t) {
  if (t) {
    var n = g1(e, t);
    n && (t.style.webkitTransform = n, t.style.transform = n);
  }
}
var Ch = /* @__PURE__ */ uo(function(e, t) {
  var n = e.children, r = e.direction, o = r === void 0 ? "down" : r, i = e.in, a = e.style, c = e.timeout, l = c === void 0 ? 0 : c, u = e.onEnter, d = e.onEntered, f = e.onExit, h = e.onExited, b = Ro(e, ["children", "direction", "in", "style", "timeout", "onEnter", "onEntered", "onExit", "onExited"]), m = or(null), p = Sa(n.ref, m), g = Sa(p, t), C = function(R, N) {
    Go(o, R), Sh(R), u && u(R, N);
  }, T = function(R) {
    var N = (a == null ? void 0 : a.transitionTimingFunction) || wa.easeOut, j = Oi({
      timeout: l,
      mode: "enter",
      style: ke({}, a, {
        transitionTimingFunction: N
      })
    });
    R.style.webkitTransition = tr("-webkit-transform", j), R.style.transition = tr("transform", j), R.style.webkitTransform = "none", R.style.transform = "none";
  }, w = function(R) {
    var N = (a == null ? void 0 : a.transitionTimingFunction) || wa.sharp, j = Oi({
      timeout: l,
      mode: "exit",
      style: ke({}, a, {
        transitionTimingFunction: N
      })
    });
    R.style.webkitTransition = tr("-webkit-transform", j), R.style.transition = tr("transform", j), Go(o, R), f && f(R);
  }, E = function(R) {
    R.style.webkitTransition = "", R.style.transition = "", h && h(R);
  }, S = Ri(function() {
    m.current && Go(o, m.current);
  }, [o]);
  return ot(function() {
    if (!(i || o === "down" || o === "right")) {
      var O = m1(function() {
        m.current && Go(o, m.current);
      }), R = wh(m.current);
      return R.addEventListener("resize", O), function() {
        O.clear(), R.removeEventListener("resize", O);
      };
    }
  }, [o, i]), ot(function() {
    i || S();
  }, [i, S]), Vr($c, Object.assign({
    appear: !0,
    nodeRef: m,
    onEnter: C,
    onEntered: d,
    onEntering: T,
    onExit: w,
    onExited: E,
    in: i,
    timeout: l
  }, b), function(O, R) {
    return Fr(n, ke({
      ref: g,
      style: ke({
        visibility: O === "exited" && !i ? "hidden" : void 0
      }, a, {}, n.props.style)
    }, R));
  });
});
Ch.displayName = "Slide";
var os = function(t) {
  return ue.createElement("svg", Object.assign({
    viewBox: "0 0 24 24",
    focusable: "false",
    style: {
      fontSize: 20,
      marginInlineEnd: 8,
      userSelect: "none",
      width: "1em",
      height: "1em",
      display: "inline-block",
      fill: "currentColor",
      flexShrink: 0
    }
  }, t));
}, y1 = function() {
  return ue.createElement(os, null, ue.createElement("path", {
    d: `M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41
        10.59L10 14.17L17.59 6.58L19 8L10 17Z`
  }));
}, v1 = function() {
  return ue.createElement(os, null, ue.createElement("path", {
    d: "M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"
  }));
}, b1 = function() {
  return ue.createElement(os, null, ue.createElement("path", {
    d: `M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,
        6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,
        13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z`
  }));
}, x1 = function() {
  return ue.createElement(os, null, ue.createElement("path", {
    d: `M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,
        0 22,12A10,10 0 0,0 12,2Z`
  }));
}, E1 = {
  default: void 0,
  success: /* @__PURE__ */ ue.createElement(y1, null),
  warning: /* @__PURE__ */ ue.createElement(v1, null),
  error: /* @__PURE__ */ ue.createElement(b1, null),
  info: /* @__PURE__ */ ue.createElement(x1, null)
}, jn = {
  maxSnack: 3,
  persist: !1,
  hideIconVariant: !1,
  disableWindowBlurListener: !1,
  variant: "default",
  autoHideDuration: 5e3,
  iconVariant: E1,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  TransitionComponent: Ch,
  transitionDuration: {
    enter: 225,
    exit: 195
  }
}, S1 = function(t, n) {
  var r = function(i) {
    return typeof i == "number" || i === null;
  };
  return r(t) ? t : r(n) ? n : jn.autoHideDuration;
}, w1 = function(t, n) {
  var r = function(i, a) {
    return a.some(function(c) {
      return typeof i === c;
    });
  };
  return r(t, ["string", "number"]) ? t : r(t, ["object"]) ? ke({}, jn.transitionDuration, {}, r(n, ["object"]) && n, {}, t) : r(n, ["string", "number"]) ? n : r(n, ["object"]) ? ke({}, jn.transitionDuration, {}, n) : jn.transitionDuration;
}, C1 = function(t, n) {
  return function(r, o) {
    return o === void 0 && (o = !1), o ? ke({}, jn[r], {}, n[r], {}, t[r]) : r === "autoHideDuration" ? S1(t.autoHideDuration, n.autoHideDuration) : r === "transitionDuration" ? w1(t.transitionDuration, n.transitionDuration) : t[r] || n[r] || jn[r];
  };
};
function ko(e) {
  return Object.entries(e).reduce(function(t, n) {
    var r, o = n[0], i = n[1];
    return ke({}, t, (r = {}, r[o] = Ac(i), r));
  }, {});
}
var mr = {
  SnackbarContainer: "notistack-SnackbarContainer",
  Snackbar: "notistack-Snackbar",
  CollapseWrapper: "notistack-CollapseWrapper",
  MuiContent: "notistack-MuiContent",
  MuiContentVariant: function(t) {
    return "notistack-MuiContent-" + t;
  }
}, fd = /* @__PURE__ */ ko({
  root: {
    height: 0
  },
  entered: {
    height: "auto"
  }
}), Ds = "0px", Ls = 175, Th = /* @__PURE__ */ uo(function(e, t) {
  var n = e.children, r = e.in, o = e.onExited, i = or(null), a = or(null), c = Sa(t, a), l = function() {
    return i.current ? i.current.clientHeight : 0;
  }, u = function(p) {
    p.style.height = Ds;
  }, d = function(p) {
    var g = l(), C = Oi({
      timeout: Ls,
      mode: "enter"
    }), T = C.duration, w = C.easing;
    p.style.transitionDuration = typeof T == "string" ? T : T + "ms", p.style.height = g + "px", p.style.transitionTimingFunction = w || "";
  }, f = function(p) {
    p.style.height = "auto";
  }, h = function(p) {
    p.style.height = l() + "px";
  }, b = function(p) {
    Sh(p);
    var g = Oi({
      timeout: Ls,
      mode: "exit"
    }), C = g.duration, T = g.easing;
    p.style.transitionDuration = typeof C == "string" ? C : C + "ms", p.style.height = Ds, p.style.transitionTimingFunction = T || "";
  };
  return Vr($c, {
    in: r,
    unmountOnExit: !0,
    onEnter: u,
    onEntered: f,
    onEntering: d,
    onExit: h,
    onExited: o,
    onExiting: b,
    nodeRef: a,
    timeout: Ls
  }, function(m, p) {
    return Vr("div", Object.assign({
      ref: c,
      className: Fn(fd.root, m === "entered" && fd.entered),
      style: ke({
        pointerEvents: "all",
        overflow: "hidden",
        minHeight: Ds,
        transition: tr("height")
      }, m === "entered" && {
        overflow: "visible"
      }, {}, m === "exited" && !r && {
        visibility: "hidden"
      })
    }, p), Vr("div", {
      ref: i,
      className: mr.CollapseWrapper,
      // Hack to get children with a negative margin to not falsify the height computation.
      style: {
        display: "flex",
        width: "100%"
      }
    }, n));
  });
});
Th.displayName = "Collapse";
var pd = {
  right: "left",
  left: "right",
  bottom: "up",
  top: "down"
}, T1 = function(t) {
  return t.horizontal !== "center" ? pd[t.horizontal] : pd[t.vertical];
}, O1 = function(t) {
  return "anchorOrigin" + Ic(t);
}, R1 = function(t) {
  t === void 0 && (t = {});
  var n = {
    containerRoot: !0,
    containerAnchorOriginTopCenter: !0,
    containerAnchorOriginBottomCenter: !0,
    containerAnchorOriginTopRight: !0,
    containerAnchorOriginBottomRight: !0,
    containerAnchorOriginTopLeft: !0,
    containerAnchorOriginBottomLeft: !0
  };
  return Object.keys(t).filter(function(r) {
    return !n[r];
  }).reduce(function(r, o) {
    var i;
    return ke({}, r, (i = {}, i[o] = t[o], i));
  }, {});
}, k1 = function() {
};
function qr(e, t) {
  return e.reduce(function(n, r) {
    return r == null ? n : function() {
      for (var i = arguments.length, a = new Array(i), c = 0; c < i; c++)
        a[c] = arguments[c];
      var l = [].concat(a);
      t && l.indexOf(t) === -1 && l.push(t), n.apply(this, l), r.apply(this, l);
    };
  }, k1);
}
var P1 = typeof window < "u" ? Uh : ot;
function hd(e) {
  var t = or(e);
  return P1(function() {
    t.current = e;
  }), Ri(function() {
    return (
      // @ts-expect-error hide `this`
      t.current.apply(void 0, arguments)
    );
  }, []);
}
var Oh = /* @__PURE__ */ uo(function(e, t) {
  var n = e.children, r = e.className, o = e.autoHideDuration, i = e.disableWindowBlurListener, a = i === void 0 ? !1 : i, c = e.onClose, l = e.id, u = e.open, d = e.SnackbarProps, f = d === void 0 ? {} : d, h = or(), b = hd(function() {
    c && c.apply(void 0, arguments);
  }), m = hd(function(w) {
    !c || w == null || (h.current && clearTimeout(h.current), h.current = setTimeout(function() {
      b(null, "timeout", l);
    }, w));
  });
  ot(function() {
    return u && m(o), function() {
      h.current && clearTimeout(h.current);
    };
  }, [u, o, m]);
  var p = function() {
    h.current && clearTimeout(h.current);
  }, g = Ri(function() {
    o != null && m(o * 0.5);
  }, [o, m]), C = function(E) {
    f.onMouseEnter && f.onMouseEnter(E), p();
  }, T = function(E) {
    f.onMouseLeave && f.onMouseLeave(E), g();
  };
  return ot(function() {
    if (!a && u)
      return window.addEventListener("focus", g), window.addEventListener("blur", p), function() {
        window.removeEventListener("focus", g), window.removeEventListener("blur", p);
      };
  }, [a, g, u]), Vr("div", Object.assign({
    ref: t
  }, f, {
    className: Fn(mr.Snackbar, r),
    onMouseEnter: C,
    onMouseLeave: T
  }), n);
});
Oh.displayName = "Snackbar";
var Bs, N1 = /* @__PURE__ */ ko({
  root: (Bs = {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1
  }, Bs[wn.upSm] = {
    flexGrow: "initial",
    minWidth: "288px"
  }, Bs)
}), Rh = /* @__PURE__ */ uo(function(e, t) {
  var n = e.className, r = Ro(e, ["className"]);
  return ue.createElement("div", Object.assign({
    ref: t,
    className: Fn(N1.root, n)
  }, r));
});
Rh.displayName = "SnackbarContent";
var jr = /* @__PURE__ */ ko({
  root: {
    backgroundColor: "#313131",
    fontSize: "0.875rem",
    lineHeight: 1.43,
    letterSpacing: "0.01071em",
    color: "#fff",
    alignItems: "center",
    padding: "6px 16px",
    borderRadius: "4px",
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)"
  },
  lessPadding: {
    paddingLeft: 8 * 2.5 + "px"
  },
  default: {
    backgroundColor: "#313131"
  },
  success: {
    backgroundColor: "#43a047"
  },
  error: {
    backgroundColor: "#d32f2f"
  },
  warning: {
    backgroundColor: "#ff9800"
  },
  info: {
    backgroundColor: "#2196f3"
  },
  message: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0"
  },
  action: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    paddingLeft: "16px",
    marginRight: "-8px"
  }
}), md = "notistack-snackbar", kh = /* @__PURE__ */ uo(function(e, t) {
  var n = e.id, r = e.message, o = e.action, i = e.iconVariant, a = e.variant, c = e.hideIconVariant, l = e.style, u = e.className, d = i[a], f = o;
  return typeof f == "function" && (f = f(n)), ue.createElement(Rh, {
    ref: t,
    role: "alert",
    "aria-describedby": md,
    style: l,
    className: Fn(mr.MuiContent, mr.MuiContentVariant(a), jr.root, jr[a], u, !c && d && jr.lessPadding)
  }, ue.createElement("div", {
    id: md,
    className: jr.message
  }, c ? null : d, r), f && ue.createElement("div", {
    className: jr.action
  }, f));
});
kh.displayName = "MaterialDesignContent";
var j1 = /* @__PURE__ */ xd(kh), A1 = /* @__PURE__ */ ko({
  wrappedRoot: {
    width: "100%",
    position: "relative",
    transform: "translateX(0)",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    minWidth: "288px"
  }
}), I1 = function(t) {
  var n = or(), r = cn(!0), o = r[0], i = r[1], a = qr([t.snack.onClose, t.onClose]), c = function() {
    t.snack.requestClose && a(null, "instructed", t.snack.id);
  }, l = Ri(function() {
    n.current = setTimeout(function() {
      i(function(j) {
        return !j;
      });
    }, 125);
  }, []);
  ot(function() {
    return function() {
      n.current && clearTimeout(n.current);
    };
  }, []);
  var u = t.snack, d = t.classes, f = t.Component, h = f === void 0 ? j1 : f, b = bd(function() {
    return R1(d);
  }, [d]), m = u.open, p = u.SnackbarProps, g = u.TransitionComponent, C = u.TransitionProps, T = u.transitionDuration, w = u.disableWindowBlurListener, E = u.content, S = Ro(u, ["open", "SnackbarProps", "TransitionComponent", "TransitionProps", "transitionDuration", "disableWindowBlurListener", "content", "entered", "requestClose", "onEnter", "onEntered", "onExit", "onExited"]), O = ke({
    direction: T1(S.anchorOrigin),
    timeout: T
  }, C), R = E;
  typeof R == "function" && (R = R(S.id, S.message));
  var N = ["onEnter", "onEntered", "onExit", "onExited"].reduce(function(j, x) {
    var P;
    return ke({}, j, (P = {}, P[x] = qr([t.snack[x], t[x]], S.id), P));
  }, {});
  return ue.createElement(Th, {
    in: o,
    onExited: N.onExited
  }, ue.createElement(Oh, {
    open: m,
    id: S.id,
    disableWindowBlurListener: w,
    autoHideDuration: S.autoHideDuration,
    className: Fn(A1.wrappedRoot, b.root, b[O1(S.anchorOrigin)]),
    SnackbarProps: p,
    onClose: a
  }, ue.createElement(g, Object.assign({}, O, {
    appear: !0,
    in: m,
    onExit: N.onExit,
    onExited: l,
    onEnter: N.onEnter,
    // order matters. first callbacks.onEntered to set entered: true,
    // then handleEntered to check if there's a request for closing
    onEntered: qr([N.onEntered, c], S.id)
  }), R || ue.createElement(h, Object.assign({}, S)))));
}, Ar, Fs, Yo, Ko, Vs, Jt = {
  view: {
    default: 20,
    dense: 4
  },
  snackbar: {
    default: 6,
    dense: 2
  }
}, gd = "." + mr.CollapseWrapper, Us = 16, Xo = /* @__PURE__ */ ko({
  root: (Ar = {
    boxSizing: "border-box",
    display: "flex",
    maxHeight: "100%",
    position: "fixed",
    zIndex: 1400,
    height: "auto",
    width: "auto",
    transition: /* @__PURE__ */ tr(["top", "right", "bottom", "left", "max-width"], {
      duration: 300,
      easing: "ease"
    }),
    // container itself is invisible and should not block clicks, clicks should be passed to its children
    // a pointerEvents: all is applied in the collapse component
    pointerEvents: "none"
  }, Ar[gd] = {
    padding: Jt.snackbar.default + "px 0px",
    transition: "padding 300ms ease 0ms"
  }, Ar.maxWidth = "calc(100% - " + Jt.view.default * 2 + "px)", Ar[wn.downXs] = {
    width: "100%",
    maxWidth: "calc(100% - " + Us * 2 + "px)"
  }, Ar),
  rootDense: (Fs = {}, Fs[gd] = {
    padding: Jt.snackbar.dense + "px 0px"
  }, Fs),
  top: {
    top: Jt.view.default - Jt.snackbar.default + "px",
    flexDirection: "column"
  },
  bottom: {
    bottom: Jt.view.default - Jt.snackbar.default + "px",
    flexDirection: "column-reverse"
  },
  left: (Yo = {
    left: Jt.view.default + "px"
  }, Yo[wn.upSm] = {
    alignItems: "flex-start"
  }, Yo[wn.downXs] = {
    left: Us + "px"
  }, Yo),
  right: (Ko = {
    right: Jt.view.default + "px"
  }, Ko[wn.upSm] = {
    alignItems: "flex-end"
  }, Ko[wn.downXs] = {
    right: Us + "px"
  }, Ko),
  center: (Vs = {
    left: "50%",
    transform: "translateX(-50%)"
  }, Vs[wn.upSm] = {
    alignItems: "center"
  }, Vs)
}), $1 = function(t) {
  var n = t.classes, r = n === void 0 ? {} : n, o = t.anchorOrigin, i = t.dense, a = t.children, c = Fn(
    mr.SnackbarContainer,
    Xo[o.vertical],
    Xo[o.horizontal],
    Xo.root,
    // root should come after others to override maxWidth
    r.containerRoot,
    r["containerAnchorOrigin" + Ic(o)],
    i && Xo.rootDense
  );
  return ue.createElement("div", {
    className: c
  }, a);
}, _1 = /* @__PURE__ */ xd($1), M1 = process.env.NODE_ENV !== "production", D1 = {
  NO_PERSIST_ALL: "Reached maxSnack while all enqueued snackbars have 'persist' flag. Notistack will dismiss the oldest snackbar anyway to allow other ones in the queue to be presented."
}, L1 = function(e) {
  if (M1) {
    var t = D1[e];
    typeof console < "u" && console.error("WARNING - notistack: " + t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}, yd = function(t) {
  var n = typeof t == "string" || Br(t);
  return !n;
}, Ph, B1 = /* @__PURE__ */ function(e) {
  xh(t, e);
  function t(r) {
    var o;
    return o = e.call(this, r) || this, o.enqueueSnackbar = function(i, a) {
      if (a === void 0 && (a = {}), i == null)
        throw new Error("enqueueSnackbar called with invalid argument");
      var c = yd(i) ? i : a, l = yd(i) ? i.message : i, u = c.key, d = c.preventDuplicate, f = Ro(c, ["key", "preventDuplicate"]), h = Ho(u), b = h ? u : (/* @__PURE__ */ new Date()).getTime() + Math.random(), m = C1(f, o.props), p = ke({
        id: b
      }, f, {
        message: l,
        open: !0,
        entered: !1,
        requestClose: !1,
        persist: m("persist"),
        action: m("action"),
        content: m("content"),
        variant: m("variant"),
        anchorOrigin: m("anchorOrigin"),
        disableWindowBlurListener: m("disableWindowBlurListener"),
        autoHideDuration: m("autoHideDuration"),
        hideIconVariant: m("hideIconVariant"),
        TransitionComponent: m("TransitionComponent"),
        transitionDuration: m("transitionDuration"),
        TransitionProps: m("TransitionProps", !0),
        iconVariant: m("iconVariant", !0),
        style: m("style", !0),
        SnackbarProps: m("SnackbarProps", !0),
        className: Fn(o.props.className, f.className)
      });
      return p.persist && (p.autoHideDuration = void 0), o.setState(function(g) {
        if (d === void 0 && o.props.preventDuplicate || d) {
          var C = function(S) {
            return h ? S.id === b : S.message === l;
          }, T = g.queue.findIndex(C) > -1, w = g.snacks.findIndex(C) > -1;
          if (T || w)
            return g;
        }
        return o.handleDisplaySnack(ke({}, g, {
          queue: [].concat(g.queue, [p])
        }));
      }), b;
    }, o.handleDisplaySnack = function(i) {
      var a = i.snacks;
      return a.length >= o.maxSnack ? o.handleDismissOldest(i) : o.processQueue(i);
    }, o.processQueue = function(i) {
      var a = i.queue, c = i.snacks;
      return a.length > 0 ? ke({}, i, {
        snacks: [].concat(c, [a[0]]),
        queue: a.slice(1, a.length)
      }) : i;
    }, o.handleDismissOldest = function(i) {
      if (i.snacks.some(function(d) {
        return !d.open || d.requestClose;
      }))
        return i;
      var a = !1, c = !1, l = i.snacks.reduce(function(d, f) {
        return d + (f.open && f.persist ? 1 : 0);
      }, 0);
      l === o.maxSnack && (process.env.NODE_ENV !== "production" && L1("NO_PERSIST_ALL"), c = !0);
      var u = i.snacks.map(function(d) {
        return !a && (!d.persist || c) ? (a = !0, d.entered ? (d.onClose && d.onClose(null, "maxsnack", d.id), o.props.onClose && o.props.onClose(null, "maxsnack", d.id), ke({}, d, {
          open: !1
        })) : ke({}, d, {
          requestClose: !0
        })) : ke({}, d);
      });
      return ke({}, i, {
        snacks: u
      });
    }, o.handleEnteredSnack = function(i, a, c) {
      if (!Ho(c))
        throw new Error("handleEnteredSnack Cannot be called with undefined key");
      o.setState(function(l) {
        var u = l.snacks;
        return {
          snacks: u.map(function(d) {
            return d.id === c ? ke({}, d, {
              entered: !0
            }) : ke({}, d);
          })
        };
      });
    }, o.handleCloseSnack = function(i, a, c) {
      o.props.onClose && o.props.onClose(i, a, c);
      var l = c === void 0;
      o.setState(function(u) {
        var d = u.snacks, f = u.queue;
        return {
          snacks: d.map(function(h) {
            return !l && h.id !== c ? ke({}, h) : h.entered ? ke({}, h, {
              open: !1
            }) : ke({}, h, {
              requestClose: !0
            });
          }),
          queue: f.filter(function(h) {
            return h.id !== c;
          })
        };
      });
    }, o.closeSnackbar = function(i) {
      var a = o.state.snacks.find(function(c) {
        return c.id === i;
      });
      Ho(i) && a && a.onClose && a.onClose(null, "instructed", i), o.handleCloseSnack(null, "instructed", i);
    }, o.handleExitedSnack = function(i, a) {
      if (!Ho(a))
        throw new Error("handleExitedSnack Cannot be called with undefined key");
      o.setState(function(c) {
        var l = o.processQueue(ke({}, c, {
          snacks: c.snacks.filter(function(u) {
            return u.id !== a;
          })
        }));
        return l.queue.length === 0 ? l : o.handleDismissOldest(l);
      });
    }, o.enqueueSnackbar, Ph = o.closeSnackbar, o.state = {
      snacks: [],
      queue: [],
      contextValue: {
        enqueueSnackbar: o.enqueueSnackbar.bind(sd(o)),
        closeSnackbar: o.closeSnackbar.bind(sd(o))
      }
    }, o;
  }
  var n = t.prototype;
  return n.render = function() {
    var o = this, i = this.state.contextValue, a = this.props, c = a.domRoot, l = a.children, u = a.dense, d = u === void 0 ? !1 : u, f = a.Components, h = f === void 0 ? {} : f, b = a.classes, m = this.state.snacks.reduce(function(g, C) {
      var T, w = Ic(C.anchorOrigin), E = g[w] || [];
      return ke({}, g, (T = {}, T[w] = [].concat(E, [C]), T));
    }, {}), p = Object.keys(m).map(function(g) {
      var C = m[g], T = C[0];
      return ue.createElement(_1, {
        key: g,
        dense: d,
        anchorOrigin: T.anchorOrigin,
        classes: b
      }, C.map(function(w) {
        return ue.createElement(I1, {
          key: w.id,
          snack: w,
          classes: b,
          Component: h[w.variant],
          onClose: o.handleCloseSnack,
          onEnter: o.props.onEnter,
          onExit: o.props.onExit,
          onExited: qr([o.handleExitedSnack, o.props.onExited], w.id),
          onEntered: qr([o.handleEnteredSnack, o.props.onEntered], w.id)
        });
      }));
    });
    return ue.createElement(Eh.Provider, {
      value: i
    }, l, c ? um(p, c) : p);
  }, bh(t, [{
    key: "maxSnack",
    get: function() {
      return this.props.maxSnack || jn.maxSnack;
    }
  }]), t;
}(vd), F1 = function() {
  return Vh(Eh);
};
const V1 = (e) => {
  if (!e) return !0;
  const t = `notification_shown_${e}`;
  return localStorage.getItem(t) ? !1 : (localStorage.setItem(t, "true"), !0);
}, is = Co((e) => ({
  notifications: [],
  addNotificationData: (t) => {
    t.singular && !V1(t.singularId) || e((n) => ({
      notifications: [
        ...n.notifications,
        { ...t, id: `${Date.now() * Math.random()}` }
      ]
    }));
  },
  removeNotificationData: (t) => {
    e((n) => ({
      notifications: n.notifications.filter(
        (r) => r.id !== `${t}`
      )
    }));
  }
})), U1 = (e) => /* @__PURE__ */ y.jsx(
  wd,
  {
    onClick: () => {
      Ph(e);
    },
    children: /* @__PURE__ */ y.jsx(Pf, {})
  }
), z1 = () => {
  const { notifications: e, removeNotificationData: t } = is(), { enqueueSnackbar: n } = F1();
  return ot(() => {
    e.length > 0 && e.forEach((r) => {
      n(r.message, {
        variant: r.type,
        action: U1
      }), t(Number(r.id));
    });
  }, [e, n, t]), /* @__PURE__ */ y.jsx(y.Fragment, {});
}, W1 = () => /* @__PURE__ */ y.jsx(kp, { children: /* @__PURE__ */ y.jsx(
  gt,
  {
    sx: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "right",
      width: "100%"
    }
  }
) }), H1 = () => {
  var o;
  const e = Pp(), t = ki(), n = Cd(t.breakpoints.down("sm"));
  let r = (e == null ? void 0 : e.breadcrumbs) || [];
  return n && (r = ((o = e == null ? void 0 : e.breadcrumbs) == null ? void 0 : o.slice(-2)) || []), /* @__PURE__ */ y.jsx(
    Np,
    {
      title: "",
      breadcrumbs: r,
      sx: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
        // fontSize: '0.8rem',
        // Target breadcrumbs specifically
        "& .MuiBreadcrumbs-root": {
          ...n && {
            fontSize: "0.575rem",
            // Adjust this value as needed
            "& .MuiBreadcrumbs-li": {
              fontSize: "inherit"
            },
            "& .MuiBreadcrumbs-separator": {
              fontSize: "inherit"
            },
            // Target the last breadcrumb
            "& .MuiBreadcrumbs-li:last-child": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "inherit",
              "& .MuiTypography-root": {
                fontSize: "inherit",
                fontWeight: "bold"
              }
            }
          }
        },
        "& .MuiStack-root": {
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 0,
          padding: 0,
          alignItems: "center",
          flex: 1
        }
      },
      slots: { toolbar: W1 }
    }
  );
}, q1 = "/static/images/tuni/face-purple-small.png", G1 = "/static/images/tuni/Tampere_University_logo.svg";
function Y1({ mini: e }) {
  return /* @__PURE__ */ y.jsxs(yf, { direction: "column", alignItems: "center", spacing: 1, children: [
    /* @__PURE__ */ y.jsxs(Qe, { variant: "caption", color: "primary", sx: { m: 1 }, children: [
      "BETA ",
      e ? "" : "VERSION 0.1.0"
    ] }),
    e ? /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
      /* @__PURE__ */ y.jsx(
        "img",
        {
          style: { height: "3rem", width: "auto" },
          alt: "Tampere University",
          src: q1
        }
      ),
      /* @__PURE__ */ y.jsxs(Qe, { variant: "caption", sx: { m: 1 }, children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear()
      ] })
    ] }) : /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
      /* @__PURE__ */ y.jsx(
        "img",
        {
          style: { height: "3rem", width: "auto" },
          alt: "Tampere University",
          src: G1
        }
      ),
      /* @__PURE__ */ y.jsxs(
        Qe,
        {
          variant: "caption",
          sx: {
            m: 1,
            overflow: "hidden",
            //No wrap text
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          },
          children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " Made with 💜 The EduML Team"
          ]
        }
      )
    ] })
  ] });
}
const K1 = () => {
  const { user: e, setUser: t, testUsers: n, setTestUsers: r } = rs(), o = (i) => {
    const a = n.filter((c) => c.id !== i.id);
    r([...a, e]), t(i);
  };
  return /* @__PURE__ */ y.jsx(y.Fragment, { children: n.map((i) => /* @__PURE__ */ y.jsxs(
    Td,
    {
      component: "button",
      onClick: () => o(i),
      sx: {
        justifyContent: "flex-start",
        width: "100%",
        columnGap: 2
      },
      children: [
        /* @__PURE__ */ y.jsx(Kh, { children: /* @__PURE__ */ y.jsx(
          Xh,
          {
            sx: {
              width: 32,
              height: 32,
              fontSize: "0.95rem",
              bgcolor: i.color
            },
            src: i.image ?? "",
            alt: (i == null ? void 0 : i.name) ?? "",
            children: i.name[0]
          }
        ) }),
        /* @__PURE__ */ y.jsx(
          Ta,
          {
            sx: {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%"
            },
            primary: i.name,
            secondary: i.email,
            primaryTypographyProps: { variant: "body2" },
            secondaryTypographyProps: { variant: "caption" }
          }
        )
      ]
    },
    i.id
  )) });
}, X1 = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z"
}), "Warning"), J1 = () => window.location.hostname === "localhost" ? /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
  " ",
  /* @__PURE__ */ y.jsxs(
    Oa,
    {
      elevation: 3,
      sx: {
        margin: 2,
        p: 2,
        maxWidth: 300,
        //give it warning color
        backgroundColor: "warning.light"
        // backgroundImage: 'linear-gradient(315deg, #f3dfc1 0%, #cbe2a0 74%)',
      },
      children: [
        /* @__PURE__ */ y.jsxs(
          Qe,
          {
            variant: "h6",
            color: "warning.dark",
            sx: {
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              fontSize: "1rem"
            },
            children: [
              /* @__PURE__ */ y.jsx(X1, {}),
              "Development Tools"
            ]
          }
        ),
        /* @__PURE__ */ y.jsx(
          Qe,
          {
            variant: "body2",
            color: "text.secondary",
            sx: {
              fontSize: "0.6rem"
            },
            children: "Note: Switching between users only affects the view. All backend requests (GET, POST, PUT, DELETE) will still be made with the original authenticated user."
          }
        )
      ]
    }
  ),
  /* @__PURE__ */ y.jsx(Jh, { id: "dev-menu", children: /* @__PURE__ */ y.jsx(K1, {}) })
] }) : null, Z1 = () => /* @__PURE__ */ y.jsx(
  pc,
  {
    slots: {
      popoverContent: Q1
    }
  }
), Q1 = () => /* @__PURE__ */ y.jsxs(Od, { direction: "column", children: [
  /* @__PURE__ */ y.jsx(bi, { variant: "expanded" }),
  /* @__PURE__ */ y.jsx(Dc, {}),
  /* @__PURE__ */ y.jsx(J1, {}),
  /* @__PURE__ */ y.jsx(Dc, {}),
  /* @__PURE__ */ y.jsx(fp, { children: /* @__PURE__ */ y.jsx(dp, {}) })
] });
function eO() {
  return /* @__PURE__ */ y.jsx(Od, { direction: "row", alignItems: "center", spacing: 2, children: /* @__PURE__ */ y.jsx(Sp, {}) });
}
const _O = ({ children: e }) => {
  const [t, n] = cn(!1), { user: r, getUser: o, logout: i } = rs(), { currentCourse: a, getCourses: c, setCurrentCourseUrl: l, getCourseByUrl: u } = xr(), { navigation: d } = Wp(), f = t1(), [h, b] = cn(
    null
  ), [m, p] = cn(null), { addNotificationData: g } = is();
  ot(() => {
    o(a == null ? void 0 : a.id);
  }, [t, a == null ? void 0 : a.id, o]), ot(() => {
    c();
  }, [c]), ot(() => {
    d && (a != null && a.id) && b(s1(mh(d), (r == null ? void 0 : r.role) || ""));
  }, [d, r, a]), ot(() => {
    const E = async (S) => {
      const { url: O } = S.data;
      if (O && (p(O), l(O), !(r != null && r.id)))
        try {
          await u(O);
        } catch (R) {
          console.error("Failed to fetch course by URL:", R);
        }
    };
    return window.addEventListener("message", E), () => window.removeEventListener("message", E);
  }, [r, u, l]), ot(() => {
    if (r != null && r.id) {
      const E = localStorage.getItem("returnLocation");
      E && (localStorage.removeItem("returnLocation"), window.location.href = E);
    }
  }, [r, f]);
  const C = () => {
    const E = (window == null ? void 0 : window.top) || window;
    n(!0), localStorage.setItem("returnLocation", m || window.location.href);
    const S = a == null ? void 0 : a.ltiLoginUrl;
    S ? E.location.href = S : (a != null && a.id ? g({
      type: "error",
      message: "Login is not available. Please contact the course staff."
    }) : g({
      type: "error",
      message: "Failed to login. Please select a course first so that the login URL can be retrieved."
    }), n(!1));
  }, T = async () => {
    try {
      await i();
    } catch (E) {
      console.error("Failed to logout:", E), g({
        type: "error",
        message: "Failed to logout. Please try again."
      });
    }
  }, w = {
    user: (r == null ? void 0 : r.id) && r || void 0
  };
  return /* @__PURE__ */ y.jsx(B1, { maxSnack: 6, autoHideDuration: 1e4, children: /* @__PURE__ */ y.jsx(
    tC,
    {
      branding: {
        logo: /* @__PURE__ */ y.jsx(n1, {}),
        title: ""
      },
      navigation: a && h || [],
      theme: r1,
      router: f,
      session: w,
      authentication: {
        signIn: C,
        signOut: T
      },
      children: /* @__PURE__ */ y.jsxs(
        wp,
        {
          maxWidth: !0,
          slots: {
            toolbarAccount: Z1,
            toolbarActions: eO,
            sidebarFooter: Y1
          },
          children: [
            /* @__PURE__ */ y.jsx(H1, {}),
            e,
            /* @__PURE__ */ y.jsx(z1, {})
          ]
        }
      )
    }
  ) });
}, Nh = Co((e) => ({
  openDialog: null,
  setOpenDialog: (t) => e({ openDialog: t }),
  closeDialog: () => e({ openDialog: null })
})), tO = ({ course: e, isSelected: t, onSelect: n }) => /* @__PURE__ */ y.jsx(
  Rd,
  {
    onClick: () => n(e),
    sx: {
      maxWidth: 300,
      mb: 1,
      borderRadius: 1,
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      bgcolor: t ? (r) => Ve(r.palette.primary.main, 0.1) : "background.paper",
      "&:hover": {
        bgcolor: (r) => Ve(r.palette.primary.main, 0.05),
        transform: "translateX(8px)"
      },
      "&:active": {
        transform: "scale(0.98)"
      }
    },
    children: /* @__PURE__ */ y.jsx(
      Ta,
      {
        primary: /* @__PURE__ */ y.jsx(
          Qe,
          {
            variant: "h6",
            color: "primary",
            sx: {
              fontWeight: t ? "bold" : "medium"
            },
            children: e.title
          }
        ),
        secondary: /* @__PURE__ */ y.jsx(
          Qe,
          {
            variant: "body2",
            color: "text.secondary",
            sx: {
              mt: 0.5,
              opacity: 0.8
            },
            children: e.description
          }
        )
      }
    )
  }
), nO = () => /* @__PURE__ */ y.jsx(Rd, { children: /* @__PURE__ */ y.jsx(
  Ta,
  {
    primary: /* @__PURE__ */ y.jsx(Qe, { variant: "h6", color: "primary", children: "No Courses Found" }),
    secondary: /* @__PURE__ */ y.jsx(Qe, { variant: "body2", color: "text.secondary", children: "You must link a course to EduML to get started." })
  }
) }), rO = ({
  courses: e,
  selectedCourse: t,
  onSelectCourse: n
}) => /* @__PURE__ */ y.jsx(Oa, { elevation: 3, children: /* @__PURE__ */ y.jsx(
  Zh,
  {
    sx: {
      p: 2,
      display: "flex",
      flexDirection: "row",
      flex: 1,
      gap: 2
    },
    children: e.length === 0 ? /* @__PURE__ */ y.jsx(nO, {}) : e.map((r) => /* @__PURE__ */ y.jsx(
      tO,
      {
        course: r,
        isSelected: (t == null ? void 0 : t.id) === r.id,
        onSelect: n
      },
      r.id
    ))
  }
) }), oO = () => {
  const { courses: e, currentCourse: t } = xr(), [n, r] = cn(!1), o = Ln();
  return ot(() => (r(!0), () => r(!1)), []), /* @__PURE__ */ y.jsx(kd, { in: n, timeout: 500, children: /* @__PURE__ */ y.jsxs(
    gt,
    {
      sx: {
        p: 3,
        // height: ' 100%',
        display: "flex",
        flexDirection: "column",
        gap: 2
      },
      children: [
        /* @__PURE__ */ y.jsx(
          Qe,
          {
            variant: "h4",
            sx: {
              mb: 3,
              fontWeight: "medium",
              color: "primary.main"
            },
            children: "Courses"
          }
        ),
        /* @__PURE__ */ y.jsx(
          rO,
          {
            courses: e,
            selectedCourse: t,
            onSelectCourse: (i) => o(`${zp(i.title)}`)
          }
        )
      ]
    }
  ) });
}, iO = Ra`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(0.95); opacity: 0.5; }
`, sO = Ra`
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
  100% { content: ''; }
`, aO = Ra`
  from { opacity: 0; }
  to { opacity: 1; }
`, cO = () => /* @__PURE__ */ y.jsxs(
  gt,
  {
    "data-testid": "loading-screen",
    sx: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      gap: 3,
      backdropFilter: "blur(8px)",
      animation: `${aO} 0.5s ease-in`
    },
    children: [
      /* @__PURE__ */ y.jsx(
        gt,
        {
          sx: {
            position: "relative",
            animation: `${iO} 2s ease-in-out infinite`
          },
          children: /* @__PURE__ */ y.jsx(
            Qh,
            {
              size: 60,
              thickness: 4,
              sx: {
                opacity: 0.8
              }
            }
          )
        }
      ),
      /* @__PURE__ */ y.jsxs(
        Qe,
        {
          variant: "h6",
          sx: {
            fontWeight: 300,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: "2px"
          },
          children: [
            "Loading",
            /* @__PURE__ */ y.jsx(
              gt,
              {
                sx: {
                  display: "inline-block",
                  width: "24px",
                  position: "relative",
                  "&::after": {
                    content: "''",
                    left: 0,
                    animation: `${sO} 1.5s steps(4) infinite`
                  }
                }
              }
            )
          ]
        }
      )
    ]
  }
), MO = () => {
  const { currentCourse: e, fetchState: t } = xr();
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsx(oO, {}),
    !e && t !== "loading" && /* @__PURE__ */ y.jsx(
      Qe,
      {
        variant: "h1",
        sx: { textAlign: "center", mt: 5, color: "text.secondary" },
        children: "Select a course to get started"
      }
    ),
    t === "loading" && /* @__PURE__ */ y.jsx(cO, {})
  ] });
}, lO = ({ show: e, title: t, navigationItems: n, navItems: r, roleCheck: o }) => {
  const { user: i } = rs(), a = r ? r.filter((c) => {
    var l;
    return c.kind === "page" && !!((l = c.metadata) != null && l.isRootTool);
  }).map((c) => {
    var u, d;
    const l = c.iconFC;
    return {
      path: `${c.segment}`,
      icon: l ? /* @__PURE__ */ y.jsx(l, { fontSize: "large" }) : /* @__PURE__ */ y.jsx(y.Fragment, {}),
      label: c.title,
      description: ((u = c.metadata) == null ? void 0 : u.description) || "",
      forRoles: (d = c.metadata) == null ? void 0 : d.forRoles
    };
  }) : n || [];
  return /* @__PURE__ */ y.jsx(gt, { sx: { p: 3 }, "data-testid": "tool-selector", children: /* @__PURE__ */ y.jsx(kd, { in: e, timeout: 500, children: /* @__PURE__ */ y.jsxs(gt, { children: [
    /* @__PURE__ */ y.jsx(Qe, { variant: "h5", sx: { mb: 4, color: "primary.main" }, children: t }),
    /* @__PURE__ */ y.jsx(
      gt,
      {
        sx: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "stretch",
          justifyContent: "center",
          height: "fit-content",
          width: "100%",
          gap: 4
        },
        children: a.map((c) => {
          var l;
          return !o || o && ((l = c.forRoles) != null && l.includes((i == null ? void 0 : i.role) || "")) ? /* @__PURE__ */ y.jsx(uO, { item: c }, c.path) : null;
        })
      }
    )
  ] }) }) });
}, uO = ({ item: e }) => {
  const t = ki(), n = Ln();
  return /* @__PURE__ */ y.jsx(
    em,
    {
      "data-testid": "tool-card",
      sx: {
        height: "auto",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "stretch",
        transition: "all 0.2s ease-in-out",
        transform: "scale(1)",
        bgcolor: "background.paper",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: t.shadows[8],
          bgcolor: (r) => r.palette.primary.main + "20",
          color: "primary.main"
        }
      },
      children: /* @__PURE__ */ y.jsx(
        tm,
        {
          sx: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "top"
          },
          onClick: () => n(e.path),
          children: /* @__PURE__ */ y.jsxs(
            nm,
            {
              sx: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                p: 3,
                maxWidth: 300,
                flex: 1
              },
              children: [
                /* @__PURE__ */ y.jsx(
                  gt,
                  {
                    sx: {
                      color: "inherit"
                    },
                    children: e.icon
                  }
                ),
                /* @__PURE__ */ y.jsx(Qe, { variant: "h6", children: e.label }),
                /* @__PURE__ */ y.jsx(Qe, { variant: "body2", color: "text.secondary", align: "center", children: e.description })
              ]
            }
          )
        }
      )
    }
  );
}, dO = () => {
  const { currentCourse: e, updateCurrentCourse: t } = xr(), { addNotificationData: n } = is(), [r, o] = cn(
    (e == null ? void 0 : e.ltiLoginUrl) || ""
  ), [i, a] = cn(!1), c = async (l) => {
    if (l.preventDefault(), !e) return;
    const u = r.trim();
    if (!u) {
      n({
        type: "error",
        message: "Please provide a valid URL"
      });
      return;
    }
    a(!0);
    try {
      if ((await t({
        ...e,
        ltiLoginUrl: u
      })).ltiLoginUrl === u)
        n({
          type: "success",
          message: "LTI Login URL updated successfully."
        });
      else
        throw new Error("Failed to verify update");
    } catch (d) {
      console.error("Failed to update LTI Login URL:", d), n({
        type: "error",
        message: "Failed to update LTI Login URL. Please try again."
      });
    } finally {
      a(!1);
    }
  };
  return /* @__PURE__ */ y.jsxs(
    Oa,
    {
      elevation: 3,
      sx: {
        p: 3,
        mt: 4,
        mx: "auto",
        maxWidth: 600,
        borderRadius: 2,
        backgroundColor: "background.paper"
      },
      children: [
        /* @__PURE__ */ y.jsx(Qe, { variant: "h6", color: "primary", gutterBottom: !0, sx: { mb: 2 }, children: "Update LTI Login URL" }),
        /* @__PURE__ */ y.jsx(Qe, { variant: "body2", color: "text.secondary", sx: { mb: 3 }, children: "Please provide the LTI Login URL for this course. Students will be redirected to this URL when they need to authenticate." }),
        /* @__PURE__ */ y.jsxs("form", { onSubmit: c, children: [
          /* @__PURE__ */ y.jsx(
            rm,
            {
              label: "LTI Login URL",
              variant: "outlined",
              fullWidth: !0,
              required: !0,
              value: r,
              onChange: (l) => o(l.target.value),
              sx: {
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "primary.main"
                  }
                }
              },
              helperText: "The URL where students will be redirected for LTI authentication"
            }
          ),
          /* @__PURE__ */ y.jsx(gt, { sx: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ y.jsx(
            ir,
            {
              type: "submit",
              variant: "contained",
              color: "primary",
              disabled: i,
              sx: {
                px: 4,
                py: 1,
                textTransform: "none",
                fontWeight: 500
              },
              children: i ? "Updating..." : "Update URL"
            }
          ) })
        ] })
      ]
    }
  );
}, DO = () => {
  const { courseSlug: e } = uw(), { currentCourse: t } = xr(), { addNotificationData: n } = is(), { user: r } = rs(), { sections: o } = Wp(), [i, a] = cn(!0);
  return ot(() => {
    a(!1);
    const c = setTimeout(() => a(!0), 300);
    return () => clearTimeout(c);
  }, [t]), ot(() => {
    t && (r == null ? void 0 : r.role) === "teacher" && !t.ltiLoginUrl && n({
      type: "info",
      message: "The LTI Login URL is missing for this course."
    });
  }, [t, r, n]), e ? (console.log("sections", o), o[e] ? /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    (r == null ? void 0 : r.role) === "teacher" && !(t != null && t.ltiLoginUrl) && /* @__PURE__ */ y.jsx(dO, {}),
    /* @__PURE__ */ y.jsx(
      lO,
      {
        show: i,
        title: t != null && t.title ? `${t.title} - Select a Tool` : "Select a Tool",
        navItems: o[e].children,
        roleCheck: !0
      }
    )
  ] }) : /* @__PURE__ */ y.jsx("h1", { children: "No sections found!" })) : /* @__PURE__ */ y.jsx("h1", { children: "No course selected!" });
}, fO = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M6 9h12v2H6zm8 5H6v-2h8zm4-6H6V6h12z"
}), "Chat"), pO = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z"
}), "Dashboard"), hO = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z"
}), "Assessment"), mO = qe([/* @__PURE__ */ y.jsx("path", {
  d: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9 14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1z"
}, "0"), /* @__PURE__ */ y.jsx("path", {
  d: "M11 7h2v6h-2zm0 8h2v2h-2z"
}, "1")], "ReportGmailerrorred"), gO = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"
}), "People"), yO = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
}), "Edit"), vO = qe(/* @__PURE__ */ y.jsx("path", {
  d: "M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3M7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5M16 17H8v-2h8zm-1-4c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13"
}), "SmartToy"), bO = {
  edit: /* @__PURE__ */ y.jsx(yO, {}),
  chat: /* @__PURE__ */ y.jsx(fO, {}),
  help: /* @__PURE__ */ y.jsx(Oc, {}),
  stats: /* @__PURE__ */ y.jsx(hO, {}),
  reports: /* @__PURE__ */ y.jsx(mO, {}),
  contact: /* @__PURE__ */ y.jsx(Rc, {}),
  logout: /* @__PURE__ */ y.jsx(up, {}),
  instructions: /* @__PURE__ */ y.jsx(pO, {}),
  chatbot: /* @__PURE__ */ y.jsx(vO, {}),
  "es-manager": /* @__PURE__ */ y.jsx(gO, {})
}, LO = ({
  title: e,
  dialogId: t,
  callOnOpen: n,
  showTitle: r = !0
}) => {
  const { setOpenDialog: o } = Nh(), i = (a) => {
    a.stopPropagation(), a.preventDefault(), o(t), n && n(a);
  };
  return /* @__PURE__ */ y.jsxs(
    Td,
    {
      component: ir,
      onClick: i,
      style: {
        marginLeft: "auto",
        zIndex: 1e3,
        width: "100%",
        display: "flex",
        justifyContent: "left",
        columnGap: 2
      },
      children: [
        bO[e.toLowerCase()],
        " ",
        r && e
      ]
    }
  );
}, xO = ({
  children: e,
  open: t,
  onClose: n,
  ...r
}) => {
  const o = window.innerWidth < 600;
  return /* @__PURE__ */ y.jsx(
    om,
    {
      sx: {
        "& .MuiDialog-paper": {
          borderRadius: o ? "0px !important" : "14px"
        }
      },
      open: t,
      onClose: n,
      fullScreen: o,
      ...r,
      children: e
    }
  );
}, BO = ({
  onSubmit: e,
  title: t,
  children: n,
  submitText: r = "Submit",
  disableSubmit: o = !1,
  ...i
}) => {
  const { closeDialog: a } = Nh();
  return /* @__PURE__ */ y.jsxs(xO, { open: !0, onClose: a, ...i, children: [
    /* @__PURE__ */ y.jsx(im, { children: t }),
    /* @__PURE__ */ y.jsx(sm, { children: /* @__PURE__ */ y.jsxs("form", { onSubmit: e, children: [
      n,
      /* @__PURE__ */ y.jsxs(am, { children: [
        /* @__PURE__ */ y.jsx(ir, { onClick: a, children: "Cancel" }),
        /* @__PURE__ */ y.jsx(ir, { type: "submit", disabled: o, children: r })
      ] })
    ] }) })
  ] });
}, FO = ({ Icon: e, size: t, title: n, sx: r }) => /* @__PURE__ */ y.jsx(cm, { title: t + " " + n, children: /* @__PURE__ */ y.jsx(
  Sd,
  {
    sx: {
      fontSize: "0.5rem",
      ...r,
      "& .MuiBadge-badge": {
        top: "0.3rem",
        padding: 0,
        margin: 0,
        height: "15px",
        minWidth: "15px"
      }
    },
    badgeContent: t,
    color: "error",
    children: /* @__PURE__ */ y.jsx(e, {})
  }
) });
class VO extends vd {
  constructor() {
    super(...arguments);
    Un(this, "state", {
      hasError: !1
    });
  }
  static getDerivedStateFromError(n) {
    return console.log(n), { hasError: !0 };
  }
  componentDidCatch(n, r) {
    console.error("Uncaught error:", n, r);
  }
  render() {
    return this.state.hasError ? /* @__PURE__ */ y.jsxs(gt, { sx: { p: 3, textAlign: "center" }, children: [
      /* @__PURE__ */ y.jsx(Qe, { variant: "h6", children: "Something went wrong" }),
      /* @__PURE__ */ y.jsx(
        ir,
        {
          variant: "contained",
          onClick: () => this.setState({ hasError: !1 }),
          sx: { mt: 2 },
          children: "Try again"
        }
      )
    ] }) : this.props.children;
  }
}
const UO = ({ states: e, children: t }) => {
  const n = e.filter(
    (r) => r === null || Object.values(r).includes(null) || Object.values(r).includes(void 0)
  );
  return n.length > 0 ? /* @__PURE__ */ y.jsx("div", { children: /* @__PURE__ */ y.jsxs("p", { children: [
    "Warning: The following states are null:",
    " ",
    n.map((r, o) => /* @__PURE__ */ y.jsxs("span", { children: [
      Object.keys(r)[0],
      " "
    ] }, o))
  ] }) }) : /* @__PURE__ */ y.jsx(y.Fragment, { children: t });
};
export {
  AO as BrowserRouter,
  DO as CourseTools,
  LO as DialogOpener,
  _O as EduMLProvider,
  VO as ErrorBoundary,
  xO as ExtendedDialog,
  BO as FormDialog,
  IO as HashRouter,
  MO as Home,
  FO as IconWithBadge,
  Fp as Link,
  cO as LoadingScreen,
  kO as MemoryRouter,
  PO as Navigate,
  UO as NullStateWarning,
  NO as Outlet,
  Ow as Route,
  jO as Routes,
  lO as ToolSelector,
  Bn as axios,
  zT as baseUrl,
  hr as convertObjectKeysToCamelCase,
  Ea as convertObjectKeysToUnderscore,
  $O as filterNavigationByRole,
  xr as useCourseStore,
  Nh as useDialogStore,
  qt as useLocation,
  Ln as useNavigate,
  Wp as useNavigationStore,
  is as useNotificationStore,
  uw as useParams,
  rs as useUserStore
};
