_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{"/0+H":function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=c,t.useAmp=function(){return c(a.default.useContext(o.AmpStateContext))};var r,a=(r=n("q1tI"))&&r.__esModule?r:{default:r},o=n("lwAK");function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,a=void 0!==r&&r,o=e.hasQuery,c=void 0!==o&&o;return n||a&&c}},0:function(e,t,n){n("74v/"),e.exports=n("nOHt")},"09Of":function(e,t,n){},"48fX":function(e,t,n){var r=n("qhzo");e.exports=function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}},"5fIB":function(e,t,n){var r=n("7eYB");e.exports=function(e){if(Array.isArray(e))return r(e)}},"74v/":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n("cha2")}])},"8Kt/":function(e,t,n){"use strict";n("oI91");t.__esModule=!0,t.defaultHead=u,t.default=void 0;var r,a=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var o=r?Object.getOwnPropertyDescriptor(e,a):null;o&&(o.get||o.set)?Object.defineProperty(n,a,o):n[a]=e[a]}n.default=e,t&&t.set(e,n);return n}(n("q1tI")),o=(r=n("Xuae"))&&r.__esModule?r:{default:r},c=n("lwAK"),i=n("FYa8"),s=n("/0+H");function l(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function u(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[a.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(a.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var d=["name","httpEquiv","charSet","itemProp"];function p(e,t){return e.reduce((function(e,t){var n=a.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(f,[]).reverse().concat(u(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(a){var o=!0,c=!1;if(a.key&&"number"!==typeof a.key&&a.key.indexOf("$")>0){c=!0;var i=a.key.slice(a.key.indexOf("$")+1);e.has(i)?o=!1:e.add(i)}switch(a.type){case"title":case"base":t.has(a.type)?o=!1:t.add(a.type);break;case"meta":for(var s=0,l=d.length;s<l;s++){var u=d[s];if(a.props.hasOwnProperty(u))if("charSet"===u)n.has(u)?o=!1:n.add(u);else{var f=a.props[u],p=r[u]||new Set;"name"===u&&c||!p.has(f)?(p.add(f),r[u]=p):o=!1}}}return o}}()).reverse().map((function(e,t){var n=e.key||t;return a.default.cloneElement(e,{key:n})}))}function b(e){var t=e.children,n=(0,a.useContext)(c.AmpStateContext),r=(0,a.useContext)(i.HeadManagerContext);return a.default.createElement(o.default,{reduceComponentsToState:p,headManager:r,inAmpMode:(0,s.isInAmpMode)(n)},t)}b.rewind=function(){};var h=b;t.default=h},FYa8:function(e,t,n){"use strict";var r;t.__esModule=!0,t.HeadManagerContext=void 0;var a=((r=n("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});t.HeadManagerContext=a},NbYv:function(e,t,n){"use strict";var r=n("nKUr");t.a=function(){return Object(r.jsx)("a",{href:"https://ko-fi.com/I2I51WSPZ",target:"_blank",children:Object(r.jsx)("img",{height:"36",style:{border:"0px",height:"36px"},src:"https://cdn.ko-fi.com/cdn/kofi1.png?v=2",alt:"Buy Me a Coffee at ko-fi.com"})})}},T0f4:function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},Xuae:function(e,t,n){"use strict";var r=n("mPvQ"),a=n("/GRZ"),o=n("i2R6"),c=(n("qXWd"),n("48fX")),i=n("tCBg"),s=n("T0f4");function l(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=s(e);if(t){var a=s(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return i(this,n)}}t.__esModule=!0,t.default=void 0;var u=n("q1tI"),f=function(e){c(n,e);var t=l(n);function n(e){var o;return a(this,n),(o=t.call(this,e))._hasHeadManager=void 0,o.emitChange=function(){o._hasHeadManager&&o.props.headManager.updateHead(o.props.reduceComponentsToState(r(o.props.headManager.mountedInstances),o.props))},o._hasHeadManager=o.props.headManager&&o.props.headManager.mountedInstances,o}return o(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(u.Component);t.default=f},cha2:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return z}));var r=n("nKUr"),a=n("cpVT"),o=(n("j9Yi"),n("09Of"),n("H+61")),c=n("UlJF"),i=n("7LId"),s=n("VIvw"),l=n("iHvq"),u=n("q1tI"),f=n.n(u),d=n("RAs/"),p=n("hVfy"),b=n("TSYQ"),h=n.n(b),m=n("y8DL"),v=n("YdCC"),j=n("vUet"),x=f.a.forwardRef((function(e,t){var n=e.bsPrefix,r=e.className,a=e.as,o=Object(p.a)(e,["bsPrefix","className","as"]);n=Object(j.a)(n,"navbar-brand");var c=a||(o.href?"a":"span");return f.a.createElement(c,Object(d.a)({},o,{ref:t,className:h()(r,n)}))}));x.displayName="NavbarBrand";var O=x,y=n("vYJ8"),g=n("qUpC"),w=f.a.forwardRef((function(e,t){var n=e.children,r=e.bsPrefix,a=Object(p.a)(e,["children","bsPrefix"]);return r=Object(j.a)(r,"navbar-collapse"),f.a.createElement(g.a.Consumer,null,(function(e){return f.a.createElement(y.a,Object(d.a)({in:!(!e||!e.expanded)},a),f.a.createElement("div",{ref:t,className:r},n))}))}));w.displayName="NavbarCollapse";var k=w,C=n("ZCiN"),_=f.a.forwardRef((function(e,t){var n=e.bsPrefix,r=e.className,a=e.children,o=e.label,c=e.as,i=void 0===c?"button":c,s=e.onClick,l=Object(p.a)(e,["bsPrefix","className","children","label","as","onClick"]);n=Object(j.a)(n,"navbar-toggler");var b=Object(u.useContext)(g.a)||{},m=b.onToggle,v=b.expanded,x=Object(C.a)((function(e){s&&s(e),m&&m()}));return"button"===i&&(l.type="button"),f.a.createElement(i,Object(d.a)({},l,{ref:t,onClick:x,"aria-label":o,className:h()(r,n,!v&&"collapsed")}),a||f.a.createElement("span",{className:n+"-icon"}))}));_.displayName="NavbarToggle",_.defaultProps={label:"Toggle navigation"};var N=_,P=n("ILyh"),M=Object(v.a)("navbar-text",{Component:"span"}),S=f.a.forwardRef((function(e,t){var n=Object(m.a)(e,{expanded:"onToggle"}),r=n.bsPrefix,a=n.expand,o=n.variant,c=n.bg,i=n.fixed,s=n.sticky,l=n.className,b=n.children,v=n.as,x=void 0===v?"nav":v,O=n.expanded,y=n.onToggle,w=n.onSelect,k=n.collapseOnSelect,C=Object(p.a)(n,["bsPrefix","expand","variant","bg","fixed","sticky","className","children","as","expanded","onToggle","onSelect","collapseOnSelect"]),_=Object(j.a)(r,"navbar"),N=Object(u.useCallback)((function(){w&&w.apply(void 0,arguments),k&&O&&y&&y(!1)}),[w,k,O,y]);void 0===C.role&&"nav"!==x&&(C.role="navigation");var M=_+"-expand";"string"===typeof a&&(M=M+"-"+a);var S=Object(u.useMemo)((function(){return{onToggle:function(){return y&&y(!O)},bsPrefix:_,expanded:!!O}}),[_,O,y]);return f.a.createElement(g.a.Provider,{value:S},f.a.createElement(P.a.Provider,{value:N},f.a.createElement(x,Object(d.a)({ref:t},C,{className:h()(l,_,a&&M,o&&_+"-"+o,c&&"bg-"+c,s&&"sticky-"+s,i&&"fixed-"+i)}),b)))}));S.defaultProps={expand:!0,variant:"light",collapseOnSelect:!1},S.displayName="Navbar",S.Brand=O,S.Toggle=N,S.Collapse=k,S.Text=M;var E=S,I=n("7vrA"),R=n("+YzT"),H=n("NbYv"),T=n("3Z9Z"),A=n("JI6e"),q=n("ma3e");function D(){return Object(r.jsx)(I.a,{fluid:!0,children:Object(r.jsx)(T.a,{className:"bg-light p-3",children:Object(r.jsx)(A.a,{className:"footer-col",children:Object(r.jsx)(I.a,{className:"footer-col",children:Object(r.jsxs)("footer",{children:[Object(r.jsxs)("span",{className:"float-left text-muted",children:["Made by ",Object(r.jsxs)("a",{className:"text-muted",href:"https://twitter.com/joshmarcushills",children:[Object(r.jsx)(q.i,{})," joshmarcushills"]})]}),Object(r.jsx)("span",{className:"float-right",children:Object(r.jsxs)("a",{className:"text-muted",href:"https://github.com/joshhills/steam-review-explorer",children:[Object(r.jsx)(q.c,{})," Code"]})})]})})})})})}var Y=n("20a2"),X=n("QojX"),B=function(){var e=Object(u.useState)(!0),t=e[0],n=e[1];return Object(r.jsx)(X.a.Check,{type:"switch",label:t?Object(r.jsx)(q.h,{className:"mb-1 mr-3"}):Object(r.jsx)(q.d,{className:"mb-1 mr-3"}),id:"dark-mode-switch",checked:!t,onChange:function(e){var t=!e.target.checked;n(t),t?document.querySelector("html").classList.remove("dark"):document.querySelector("html").classList.add("dark")}})},F=n("YFqc"),K=n.n(F);function U(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(l.a)(e);if(t){var a=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(s.a)(this,n)}}var W=function(e){Object(i.a)(n,e);var t=U(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this.props.children;return Object(r.jsxs)("div",{style:{display:"flex",minHeight:"100vh",flexDirection:"column"},children:[Object(r.jsx)(E,{bg:"light",expand:"lg",children:Object(r.jsxs)(I.a,{children:[Object(r.jsxs)(E.Brand,{children:[Object(r.jsx)("img",{src:"/steam-review-explorer/steam-review-explorer-logo.png",width:"30",height:"30",className:"d-inline-block align-top mr-2",alt:"Steam Review Explorer logo"}),"Steam Review Explorer"]}),Object(r.jsx)(E.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(r.jsxs)(E.Collapse,{id:"basic-navbar-nav",children:[Object(r.jsxs)(R.a,{className:"mr-auto",children:[Object(r.jsx)(K.a,{href:"/",children:Object(r.jsx)("a",{className:"nav-link",children:"Home"})}),Object(r.jsx)(K.a,{href:"/about",children:Object(r.jsx)("a",{className:"nav-link",children:"About"})}),Object(r.jsx)(K.a,{href:"/feedback",children:Object(r.jsx)("a",{className:"nav-link",children:"Feedback"})})]}),Object(r.jsx)(B,{}),Object(r.jsx)(H.a,{})]})]})}),Object(r.jsx)(I.a,{style:{flex:"1"},className:"pt-5 pb-4",children:e}),Object(r.jsx)(D,{})]})}}]),n}(u.Component),J=Object(Y.withRouter)(W),L=n("g4pe"),Q=n.n(L);function Z(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function V(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Z(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Z(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function z(e){var t=e.Component,n=e.pageProps,a=Object(Y.useRouter)();if(console.log("%cHey, are you trying to figure out how something works?\nView the source at https://github.com/joshhills/steam-review-explorer","background: #f8f9fa; color: #007bff; font-size: .75rem; padding: 2px; border-radius:2px"),Object.keys(a.query).length>=1){var o=Object.keys(a.query)[0];if("/"===o[0]){var c=o.slice(1).split("&").map((function(e){return e.replace(/~and~/g,"&")})).join("?");a.push(a.pathname+c)}}return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)(Q.a,{children:[Object(r.jsx)("title",{children:"Steam Review Explorer"}),Object(r.jsx)("meta",{name:"viewport",content:"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"})]}),Object(r.jsx)(J,{children:Object(r.jsx)(t,V({},n))})]})}},g4pe:function(e,t,n){e.exports=n("8Kt/")},j9Yi:function(e,t,n){},kG2m:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},lwAK:function(e,t,n){"use strict";var r;t.__esModule=!0,t.AmpStateContext=void 0;var a=((r=n("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=a},mPvQ:function(e,t,n){var r=n("5fIB"),a=n("rlHP"),o=n("KckH"),c=n("kG2m");e.exports=function(e){return r(e)||a(e)||o(e)||c()}},oI91:function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},qXWd:function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},rlHP:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},tCBg:function(e,t,n){var r=n("C+bE"),a=n("qXWd");e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!==typeof t?a(e):t}}},[[0,0,2,5,1,3,4,7]]]);