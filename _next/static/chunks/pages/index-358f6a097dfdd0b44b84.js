_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[18],{"/EDR":function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t("23aj")}])},"23aj":function(e,a,t){"use strict";t.r(a);var r=t("nKUr"),n=t("q1tI"),s=t.n(n),c=t("vJKn"),o=t.n(c),i=t("rg98"),l=t("LvDl"),d=t.n(l),j=t("oHt2"),u=t("7vrA"),b=t("3Z9Z"),m=t("JI6e"),h=t("QojX"),p=t("T/rR"),x=t("20a2"),O=t("6xyR"),f=t("cWnB"),g=t("DLMT"),v=function(e){var a=e.game,t=Object(x.useRouter)(),n="https://store.steampowered.com/app/".concat(a.steam_appid),s="dlc"===a.type?"DLC":a.type.charAt(0).toUpperCase()+a.type.slice(1);a.developers||console.log(a);var c=a.developers.join(", ");return Object(r.jsxs)(O.a,{className:"mb-4 game-card",children:[Object(r.jsx)(O.a.Img,{variant:"top",src:a.header_image}),Object(r.jsxs)(O.a.Body,{children:[Object(r.jsxs)(O.a.Title,{children:[Object(r.jsx)("a",{href:n,children:a.name}),"\xa0",Object(r.jsx)(g.a,{game:a,showTooltip:!0})]}),Object(r.jsxs)(O.a.Subtitle,{className:"mb-2 text-muted",children:[s," by ",c," ",a.release_date.coming_soon?"coming soon":"released ".concat(a.release_date.date)]}),Object(r.jsx)(O.a.Text,{className:"small",children:a.short_description})]}),Object(r.jsx)(O.a.Footer,{children:Object(r.jsx)(f.a,{block:!0,variant:a.total_reviews>0?"primary":"outline-secondary",className:"float-right",disabled:0===a.total_reviews,onClick:function(){return t.push("/game/".concat(a.steam_appid))},children:"Explore"})})]},a.steam_appid)},w=function(e){var a=e.games;return Object(r.jsx)("div",{className:"row",children:a.map((function(e){return Object(r.jsx)("div",{className:"col-auto mb-3",children:Object(r.jsx)(v,{game:e})},e.steam_appid)}))})},N=function(){var e=Object(n.useState)(null),a=e[0],t=e[1],s=Object(n.useState)(null),c=s[0],l=s[1],x=Object(n.useState)(!0),O=x[0],f=x[1],g=function(){var e=Object(i.a)(o.a.mark((function e(){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.getFeaturedGames();case 2:a=e.sent,l(a),f(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();null===c&&g();var v=d.a.debounce(function(){var e=Object(i.a)(o.a.mark((function e(a){var r,n,s,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a&&!/^\s*$/.test(a)){e.next=2;break}return e.abrupt("return");case 2:if(r=new Date,f(!0),n=null,-1===a.indexOf("http")&&-1===a.indexOf("www.")){e.next=12;break}if(!(s=a.match(/\/app\/(\d+)/))||!s[1]){e.next=12;break}return e.next=10,j.a.getGame(s[1]);case 10:(c=e.sent)&&(n=[c]);case 12:if(null!==n){e.next=16;break}return e.next=15,j.a.findGamesBySearchTerm(a);case 15:n=e.sent;case 16:t((function(e){return null===e||r>e.time?{time:r,data:n,term:a}:e})),f(!1);case 18:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),400);return Object(r.jsxs)(u.a,{children:[Object(r.jsx)(b.a,{children:Object(r.jsx)(m.a,{children:Object(r.jsx)(h.a.Control,{className:"mb-3",placeholder:"Search for a game by name or paste a store page URL...",type:"text",onChange:function(e){return v(e.target.value)}})})}),O&&Object(r.jsx)(b.a,{children:Object(r.jsx)(p.a,{className:"mx-auto mt-2",animation:"border",role:"status",children:Object(r.jsx)("span",{className:"sr-only",children:"Loading..."})})}),a&&!O&&Object(r.jsx)(b.a,{children:Object(r.jsx)(m.a,{children:Object(r.jsxs)("p",{children:[a.data&&"".concat(a.data.length," result").concat(1!==a.data.length?"s":""," found for "),Object(r.jsx)("a",{href:"https://store.steampowered.com/search/?term=".concat(a.term),children:a.term}),".",a.data.length>0&&a.term.length<11&&Object(r.jsx)("span",{className:"small",children:" Not what you're looking for? Try being more specific"}),0===a.data.length&&Object(r.jsx)("span",{className:"small",children:" Looking for something specific? Try searching the name as it appears on Steam"})]})})}),!O&&(null===a||void 0===a?void 0:a.data.length)>0&&Object(r.jsx)(w,{games:a.data}),(null===c||void 0===c?void 0:c.length)>0&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(b.a,{children:Object(r.jsx)(m.a,{children:Object(r.jsx)("h3",{className:"mb-3",children:"Featured Products"})})}),Object(r.jsx)(w,{games:c})]})]})},_=t("MX0m"),k=t.n(_),y=t("YFqc"),T=t.n(y),E=t("RAs/"),S=t("hVfy"),R=t("TSYQ"),F=t.n(R),D=t("vUet"),L=s.a.forwardRef((function(e,a){var t,r=e.as,n=void 0===r?"div":r,c=e.className,o=e.fluid,i=e.bsPrefix,l=Object(S.a)(e,["as","className","fluid","bsPrefix"]),d=((t={})[i=Object(D.a)(i,"jumbotron")]=!0,t[i+"-fluid"]=o,t);return s.a.createElement(n,Object(E.a)({ref:a},l,{className:F()(c,d)}))}));L.defaultProps={fluid:!1},L.displayName="Jumbotron";var P=L,C=function(){return Object(r.jsxs)(b.a,{children:[Object(r.jsx)(k.a,{id:"2804914260",children:[".header{background-image:url('/steam-review-explorer/jumbotron-bg.jpg');background-size:cover;background-position:center;background-repeat:no-repeat;}","html.dark .header{background-image:url('/steam-review-explorer/jumbotron-bg-dark.jpg');}"]}),Object(r.jsx)(m.a,{children:Object(r.jsx)("header",{className:"jsx-2804914260",children:Object(r.jsxs)(P,{className:"header",children:[Object(r.jsx)("h1",{className:"jsx-2804914260",children:"Understand player feedback"}),Object(r.jsx)("p",{className:"jsx-2804914260",children:"Make better sense of all Steam product reviews using this free exploratory data analysis tool"}),Object(r.jsx)(T.a,{href:"/about",children:"Find out more about how it works"})]})})})]})},J=t("/+W/");a.default=function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(J.a,{}),Object(r.jsx)(C,{}),Object(r.jsx)(b.a,{children:Object(r.jsx)(m.a,{children:Object(r.jsx)(N,{})})})]})}}},[["/EDR",0,2,6,1,3,4,8]]]);