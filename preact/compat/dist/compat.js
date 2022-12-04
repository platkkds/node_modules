var n=require("preact/hooks"),t=require("preact");function e(n,t){for(var e in t)n[e]=t[e];return n}function r(n,t){for(var e in n)if("__source"!==e&&!(e in t))return!0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return!0;return!1}function o(n){this.props=n}function u(n,e){function o(n){var t=this.props.ref,o=t==n.ref;return!o&&t&&(t.call?t(null):t.current=null),e?!e(this.props,n)||!o:r(this.props,n)}function u(e){return this.shouldComponentUpdate=o,t.createElement(n,e)}return u.displayName="Memo("+(n.displayName||n.name)+")",u.prototype.isReactComponent=!0,u.__f=!0,u}(o.prototype=new t.Component).isPureReactComponent=!0,o.prototype.shouldComponentUpdate=function(n,t){return r(this.props,n)||r(this.state,t)};var i=t.options.__b;t.options.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),i&&i(n)};var l="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function c(n){function t(t){var r=e({},t);return delete r.ref,n(r,t.ref||null)}return t.$$typeof=l,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var f=function(n,e){return null==n?null:t.toChildArray(t.toChildArray(n).map(e))},a={map:f,forEach:f,count:function(n){return n?t.toChildArray(n).length:0},only:function(n){var e=t.toChildArray(n);if(1!==e.length)throw"Children.only";return e[0]},toArray:t.toChildArray},s=t.options.__e;t.options.__e=function(n,t,e,r){if(n.then)for(var o,u=t;u=u.__;)if((o=u.__c)&&o.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),o.__c(n,t);s(n,t,e,r)};var p=t.options.unmount;function h(){this.__u=0,this.t=null,this.__b=null}function v(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function d(n){var e,r,o;function u(u){if(e||(e=n()).then(function(n){r=n.default||n},function(n){o=n}),o)throw o;if(!r)throw e;return t.createElement(r,u)}return u.displayName="Lazy",u.__f=!0,u}function m(){this.o=null,this.u=null}t.options.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),p&&p(n)},(h.prototype=new t.Component).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var o=v(r.__v),u=!1,i=function(){u||(u=!0,e.__R=null,o?o(l):l())};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__e){var n=r.state.__e;r.__v.__k[0]=function n(t,e,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(n,n.__c.__P,n.__c.__O)}var t;for(r.setState({__e:r.__b=null});t=r.t.pop();)t.forceUpdate()}},c=!0===t.__h;r.__u++||c||r.setState({__e:r.__b=r.__v.__k[0]}),n.then(i,i)},h.prototype.componentWillUnmount=function(){this.t=[]},h.prototype.render=function(n,r){if(this.__b){if(this.__v.__k){var o=document.createElement("div"),u=this.__v.__k[0].__c;this.__v.__k[0]=function n(t,r,o){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c()}),t.__c.__H=null),null!=(t=e({},t)).__c&&(t.__c.__P===o&&(t.__c.__P=r),t.__c=null),t.__k=t.__k&&t.__k.map(function(t){return n(t,r,o)})),t}(this.__b,o,u.__O=u.__P)}this.__b=null}var i=r.__e&&t.createElement(t.Fragment,null,n.fallback);return i&&(i.__h=null),[t.createElement(t.Fragment,null,r.__e?null:n.children),i]};var x=function(n,t,e){if(++e[1]===e[0]&&n.u.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.u.size))for(e=n.o;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.o=e=e[2]}};function y(n){return this.getChildContext=function(){return n.context},n.children}function b(n){var e=this,r=n.i;e.componentWillUnmount=function(){t.render(null,e.l),e.l=null,e.i=null},e.i&&e.i!==r&&e.componentWillUnmount(),n.__v?(e.l||(e.i=r,e.l={nodeType:1,parentNode:r,childNodes:[],appendChild:function(n){this.childNodes.push(n),e.i.appendChild(n)},insertBefore:function(n,t){this.childNodes.push(n),e.i.appendChild(n)},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),e.i.removeChild(n)}}),t.render(t.createElement(y,{context:e.context},n.__v),e.l)):e.l&&e.componentWillUnmount()}function _(n,e){return t.createElement(b,{__v:n,i:e})}(m.prototype=new t.Component).__e=function(n){var t=this,e=v(t.__v),r=t.u.get(n);return r[0]++,function(o){var u=function(){t.props.revealOrder?(r.push(o),x(t,n,r)):o()};e?e(u):u()}},m.prototype.render=function(n){this.o=null,this.u=new Map;var e=t.toChildArray(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&e.reverse();for(var r=e.length;r--;)this.u.set(e[r],this.o=[1,0,this.o]);return n.children},m.prototype.componentDidUpdate=m.prototype.componentDidMount=function(){var n=this;this.u.forEach(function(t,e){x(n,e,t)})};var S="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,C=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,w="undefined"!=typeof document,g=function(n){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function E(n,e,r){return null==e.__k&&(e.textContent=""),t.render(n,e),"function"==typeof r&&r(),n?n.__c:null}function R(n,e,r){return t.hydrate(n,e),"function"==typeof r&&r(),n?n.__c:null}t.Component.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(t.Component.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t})}})});var N=t.options.event;function O(){}function k(){return this.cancelBubble}function A(){return this.defaultPrevented}t.options.event=function(n){return N&&(n=N(n)),n.persist=O,n.isPropagationStopped=k,n.isDefaultPrevented=A,n.nativeEvent=n};var L,U={configurable:!0,get:function(){return this.class}},M=t.options.vnode;t.options.vnode=function(n){var e=n.type,r=n.props,o=r;if("string"==typeof e){var u=-1===e.indexOf("-");for(var i in o={},r){var l=r[i];w&&"children"===i&&"noscript"===e||"value"===i&&"defaultValue"in r&&null==l||("defaultValue"===i&&"value"in r&&null==r.value?i="value":"download"===i&&!0===l?l="":/ondoubleclick/i.test(i)?i="ondblclick":/^onchange(textarea|input)/i.test(i+e)&&!g(r.type)?i="oninput":/^onfocus$/i.test(i)?i="onfocusin":/^onblur$/i.test(i)?i="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i)?i=i.toLowerCase():u&&C.test(i)?i=i.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===l&&(l=void 0),o[i]=l)}"select"==e&&o.multiple&&Array.isArray(o.value)&&(o.value=t.toChildArray(r.children).forEach(function(n){n.props.selected=-1!=o.value.indexOf(n.props.value)})),"select"==e&&null!=o.defaultValue&&(o.value=t.toChildArray(r.children).forEach(function(n){n.props.selected=o.multiple?-1!=o.defaultValue.indexOf(n.props.value):o.defaultValue==n.props.value})),n.props=o,r.class!=r.className&&(U.enumerable="className"in r,null!=r.className&&(o.class=r.className),Object.defineProperty(o,"className",U))}n.$$typeof=S,M&&M(n)};var T=t.options.__r;t.options.__r=function(n){T&&T(n),L=n.__c};var D={ReactCurrentDispatcher:{current:{readContext:function(n){return L.__n[n.__c].props.value}}}};function F(n){return t.createElement.bind(null,n)}function I(n){return!!n&&n.$$typeof===S}function W(n){return I(n)?t.cloneElement.apply(null,arguments):n}function j(n){return!!n.__k&&(t.render(null,n),!0)}function P(n){return n&&(n.base||1===n.nodeType&&n)||null}var V=function(n,t){return n(t)},z=function(n,t){return n(t)},B=t.Fragment,$={useState:n.useState,useReducer:n.useReducer,useEffect:n.useEffect,useLayoutEffect:n.useLayoutEffect,useRef:n.useRef,useImperativeHandle:n.useImperativeHandle,useMemo:n.useMemo,useCallback:n.useCallback,useContext:n.useContext,useDebugValue:n.useDebugValue,version:"17.0.2",Children:a,render:E,hydrate:R,unmountComponentAtNode:j,createPortal:_,createElement:t.createElement,createContext:t.createContext,createFactory:F,cloneElement:W,createRef:t.createRef,Fragment:t.Fragment,isValidElement:I,findDOMNode:P,Component:t.Component,PureComponent:o,memo:u,forwardRef:c,flushSync:z,unstable_batchedUpdates:V,StrictMode:B,Suspense:h,SuspenseList:m,lazy:d,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:D};Object.keys(n).forEach(function(t){exports[t]=n[t]}),exports.createElement=t.createElement,exports.createContext=t.createContext,exports.createRef=t.createRef,exports.Fragment=t.Fragment,exports.Component=t.Component,exports.version="17.0.2",exports.Children=a,exports.render=E,exports.hydrate=R,exports.unmountComponentAtNode=j,exports.createPortal=_,exports.createFactory=F,exports.cloneElement=W,exports.isValidElement=I,exports.findDOMNode=P,exports.PureComponent=o,exports.memo=u,exports.forwardRef=c,exports.flushSync=z,exports.unstable_batchedUpdates=V,exports.StrictMode=B,exports.Suspense=h,exports.SuspenseList=m,exports.lazy=d,exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=D,exports.default=$;
//# sourceMappingURL=compat.js.map
