(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{48312:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(20864)}])},62257:function(e,t,a){"use strict";var n=a(26042),r=a(69396),s=a(85893),l=(a(67294),a(27977)),c=a(63178),i=a(43489);t.Z=function(e){var t,a=e.game,o=e.showTooltip;switch(a.review_score_desc.toLowerCase()){case"overwhelmingly positive":case"very positive":case"positive":case"mostly positive":t="success";break;case"mixed":t="warning";break;case"mostly negative":case"negative":case"very negative":case"overwhelmingly negative":t="danger";break;default:t="secondary"}var d=(0,s.jsx)(l.Z,{className:"mb-1 me-1",bg:t,children:a.review_score_desc}),u=Math.round(a.total_positive/a.total_reviews*100);return o?(0,s.jsx)(c.Z,{placement:"top",delay:{show:250,hide:400},overlay:function(e){return a.total_reviews>0?(0,s.jsx)(i.Z,(0,r.Z)((0,n.Z)({id:"score-".concat(a.steamp_appid)},e),{children:1===a.total_reviews?(0,s.jsxs)(s.Fragment,{children:["The one review for this game is ",100===u?"positive":"negative"]}):(0,s.jsxs)(s.Fragment,{children:[u,"% of the ",a.total_reviews.toLocaleString()," reviews for this ","dlc"===a.type?"DLC":a.type," are positive"]})})):(0,s.jsx)("p",{})},children:d}):d}},20864:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return U}});var n=a(85893),r=a(67294),s=a(47568),l=a(828),c=a(70655),i=a(96486),o=a.n(i),d=a(76572),u=a(10682),h=a(34051),m=a(31555),p=a(25432),g=a(36968),f=a(6212),x=a(35005),v=a(11163),j=a(78182),y=a(27977),b=a(62257),w=function(e){var t=e.game,a=e.onExplore,r=((0,v.useRouter)(),"https://store.steampowered.com/app/".concat(t.steam_appid)),s="https://steamdb.info/app/".concat(t.steam_appid),l="https://steamspy.com/app/".concat(t.steam_appid),c="dlc"===t.type?"DLC":t.type.charAt(0).toUpperCase()+t.type.slice(1),i=t.developers?t.developers.join(", "):"Unknown";return(0,n.jsxs)(j.Z,{className:"mb-4 game-card",children:[(0,n.jsx)(j.Z.Img,{variant:"top",src:t.header_image}),(0,n.jsxs)(j.Z.Body,{children:[(0,n.jsxs)(j.Z.Title,{children:[0===t.total_reviews?(0,n.jsx)("p",{children:t.name}):(0,n.jsx)("a",{href:"/steam-review-explorer/game/".concat(t.steam_appid),children:t.name}),"\xa0",(0,n.jsx)(b.Z,{game:t,showTooltip:!0}),null!==t.content_descriptors.ids&&-1!==t.content_descriptors.ids.indexOf(3)&&(0,n.jsx)(y.Z,{bg:"danger",children:"Adult"})]}),(0,n.jsxs)(j.Z.Subtitle,{className:"mb-2 text-muted",children:[c," by ",i," ",t.release_date.coming_soon?"coming soon":"released ".concat(t.release_date.date),(0,n.jsx)("br",{})]}),(0,n.jsxs)(j.Z.Subtitle,{className:"mb-2 text-muted",children:[(0,n.jsx)("a",{href:r,children:"Steam Store"})," | ",(0,n.jsx)("a",{href:s,children:"SteamDB"})," | ",(0,n.jsx)("a",{href:l,children:"SteamSpy"})]}),(0,n.jsx)(j.Z.Text,{className:"small",children:t.short_description})]}),(0,n.jsx)(j.Z.Footer,{children:(0,n.jsx)("div",{className:"d-grid gap-2",children:(0,n.jsx)(x.Z,{variant:t.total_reviews>0?"primary":"outline-secondary",className:"float-end",disabled:0===t.total_reviews,onClick:function(){return a(t)},children:"Explore"})})})]},t.steam_appid)},Z=function(e){var t=e.games,a=e.onExplore;return(0,n.jsx)("div",{className:"row",children:t.map((function(e){return(0,n.jsx)("div",{className:"col-auto mb-3",children:(0,n.jsx)(w,{game:e,onExplore:a})},e.steam_appid)}))})},_=a(11177),k=a(70461),S=a(56448),N=(a(23273),a(27404)),C=[{label:"Game",value:"game"},{label:"Adult Game",value:"adult_game"},{label:"Application",value:"application"},{label:"Tool",value:"tool"},{label:"Demo",value:"demo"},{label:"DLC",value:"dlc"},{label:"Music",value:"music"}],T=Object.keys(N.Z).map((function(e){return{label:N.Z[e].englishName,value:e}})),D=function(){var e=(0,v.useRouter)(),t=(0,r.useState)(""),a=t[0],i=t[1],j=(0,r.useState)(null),y=j[0],b=j[1],w=(0,r.useState)(null),N=w[0],D=w[1],E=(0,r.useState)(!0),F=E[0],q=E[1],A=(0,r.useState)(C),L=A[0],U=A[1],I=(0,r.useState)(!1),O=I[0],B=I[1],R=(0,r.useState)(null),z=R[0],G=R[1],P=(0,r.useState)("2weeks"),H=P[0],M=P[1],X=(0,r.useState)([]),V=X[0],W=X[1],$=(0,r.useState)(T),J=$[0],K=$[1],Q=(0,l.Z)((0,k.Z)(["productTypes"]),2),Y=Q[0],ee=Q[1];(0,r.useEffect)((function(){Y.productTypes&&U(Y.productTypes)}),[]),(0,r.useEffect)((function(){var t=[];if(void 0!==e.query.productTypes&&(0===(t=function(e){var t=e.split(","),a=[],n=!0,r=!1,s=void 0;try{for(var l,c=t[Symbol.iterator]();!(n=(l=c.next()).done);n=!0){var i=l.value,o=!0,d=!1,u=void 0;try{for(var h,m=C[Symbol.iterator]();!(o=(h=m.next()).done);o=!0){var p=h.value;if(i===p.value){a.push(p);break}}}catch(g){d=!0,u=g}finally{try{o||null==m.return||m.return()}finally{if(d)throw u}}}}catch(g){r=!0,s=g}finally{try{n||null==c.return||c.return()}finally{if(r)throw s}}return a}(e.query.productTypes)).length||o().isEqual(L,t)||U(t)),0===t.length&&(t=L),void 0!==e.query.search&&y!==e.query.search){var a=decodeURI(e.query.search);i(a),ae(a,t)}null===N&&te()}),[e.query.search,e.query.productTypes]);var te=function(){var e=(0,s.Z)((function(){var e;return(0,c.__generator)(this,(function(t){switch(t.label){case 0:return[4,d.Z.getFeaturedGames()];case 1:return e=t.sent(),D(e),q(!1),[2]}}))}));return function(){return e.apply(this,arguments)}}(),ae=function(){var e=(0,s.Z)((function(e,t){var a,n,r,s;return(0,c.__generator)(this,(function(l){switch(l.label){case 0:return 0===t.length||!e||/^\s*$/.test(e)?(b(null),q(!1),[2]):(a=new Date,q(!0),n=null,-1===e.indexOf("http")&&-1===e.indexOf("www.")?[3,2]:(r=e.match(/\/app\/(\d+)/))&&r[1]?[4,d.Z.getGame(r[1])]:[3,2]);case 1:(s=l.sent())&&(n=[s]),l.label=2;case 2:return null!==n?[3,4]:[4,d.Z.findGamesBySearchTerm(e,t.map((function(e){return e.value})))];case 3:n=l.sent(),l.label=4;case 4:return b((function(t){return null===t||a>t.time?{time:a,data:n,term:e}:t})),q(!1),[2]}}))}));return function(t,a){return e.apply(this,arguments)}}(),ne=(0,r.useCallback)(o().debounce((function(t,a){ee("productTypes",a,{path:"/"});var n=function(e){if(e.length===C.length)return"";var t=[],a=!0,n=!1,r=void 0;try{for(var s,l=e[Symbol.iterator]();!(a=(s=l.next()).done);a=!0){var c=s.value;t.push(c.value)}}catch(i){n=!0,r=i}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}return t.join(",")}(a),r={};0!==t.length&&(r.search=encodeURI(t),0!==n.length&&(r.productTypes=encodeURI(n))),e.push({pathname:"/",query:r},null,{shallow:!0}),ae(t,a)}),800),[]),re=function(e){G(e),B(!0)},se=function(e){var t=new Date;return t.setDate(t.getDate()-e),t};return(0,n.jsxs)(u.Z,{children:[(0,n.jsxs)(h.Z,{className:"mb-3",children:[(0,n.jsx)(m.Z,{children:(0,n.jsx)(p.Z.Control,{style:{minWidth:"16ch"},className:"mb-3",placeholder:"Find a product...",type:"text",value:a,onChange:function(e){i(e.target.value),ne.cancel(),ne(e.target.value,L)}})}),(0,n.jsx)(m.Z,{children:(0,n.jsx)(_.NU,{options:C,labelledBy:"Select product type",overrideStrings:{allItemsAreSelected:"All product types selected.",clearSearch:"Clear search",clearSelected:"Clear selected",noOptions:"No options",search:"Search",selectAll:"Select all product types",selectAllFiltered:"Select all product types (filtered)",selectSomeItems:"Select product type",create:"Create"},value:L,onChange:function(e){U(e),ne.cancel(),ne(a,e)}})})]}),F&&(0,n.jsx)(h.Z,{children:(0,n.jsx)(g.Z,{className:"mx-auto mt-2",animation:"border",role:"status",children:(0,n.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}),y&&!F&&(0,n.jsx)(h.Z,{children:(0,n.jsx)(m.Z,{children:(0,n.jsxs)("p",{children:[y.data&&"".concat(y.data.length," result").concat(1!==y.data.length?"s":""," found for "),(0,n.jsx)("a",{href:"https://store.steampowered.com/search/?term=".concat(y.term),children:y.term}),".",y.data.length>0&&y.term.length<11&&(0,n.jsxs)("span",{className:"small",children:[" Not what you're looking for? Try being more specific",L.length!==C.length?", or selecting more product types":""]}),0===y.data.length&&(0,n.jsx)("span",{className:"small",children:" Looking for something specific? Try searching the name as it appears on Steam"})]})})}),!F&&(null===y||void 0===y?void 0:y.data.length)>0&&(0,n.jsx)(Z,{games:y.data,onExplore:re}),(null===N||void 0===N?void 0:N.length)>0&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(h.Z,{children:(0,n.jsx)(m.Z,{children:(0,n.jsx)("h3",{className:"mb-3",children:"Featured Products"})})}),(0,n.jsx)(Z,{games:N,onExplore:re})]}),z&&(0,n.jsxs)(f.Z,{show:O,onHide:function(){B(!1),G(null)},children:[(0,n.jsx)(f.Z.Header,{closeButton:!0,children:(0,n.jsxs)(f.Z.Title,{children:["Find ",z.name," reviews"]})}),(0,n.jsxs)(f.Z.Body,{children:[(0,n.jsx)("p",{children:"Since..."}),(0,n.jsx)(p.Z.Check,{inline:!0,label:"Two weeks",name:"timespan",type:"radio",id:"2weeks",onChange:function(e){M(e.target.id)},checked:"2weeks"===H}),(0,n.jsx)(p.Z.Check,{inline:!0,label:"One month",name:"timespan",type:"radio",id:"1month",onChange:function(e){M(e.target.id)},checked:"1month"===H}),(0,n.jsx)(p.Z.Check,{inline:!0,label:"Forever",name:"timespan",type:"radio",id:"forever",onChange:function(e){M(e.target.id)},checked:"forever"===H}),(0,n.jsx)(p.Z.Check,{inline:!0,label:"Custom",name:"timespan",type:"radio",id:"custom",onChange:function(e){M(e.target.id)},checked:"custom"===H,className:"custom"===H?"mb-3":""}),"custom"===H&&(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(S.Z,{onCancel:function(){},onCallback:function(e,t){W([e.toDate(),t.toDate()])},initialSettings:{minDate:null,maxDate:new Date,startDate:se(14),endDate:new Date,timePicker:!0,locale:{cancelLabel:"Clear",applyLabel:"Apply"}},children:(0,n.jsx)(p.Z.Control,{type:"text"})})}),(0,n.jsxs)("p",{className:"mt-3",children:["In language",J.length>1&&"s","... ",0===J.length&&(0,n.jsx)("em",{children:"(Select at least one)"})]}),(0,n.jsx)(_.NU,{options:T,labelledBy:"Select languages",value:J,onChange:function(e){K(e)}})]}),(0,n.jsx)(f.Z.Footer,{children:(0,n.jsx)(x.Z,{variant:"primary",onClick:function(){var t=[new Date(0),new Date];"2weeks"===H?t[0]=se(14):"1month"===H?t[0]=se(30):"custom"===H&&(t=V);var a=null;J.length!==T.length&&(a=encodeURI(J.map((function(e){return e.value})).join(","))),"forever"===H?e.push("/game/".concat(z.steam_appid).concat(a?"?languages=".concat(a):"")):e.push("/game/".concat(z.steam_appid,"?start=").concat(t[0].getTime(),"&end=").concat(t[1].getTime()).concat(a?"&languages=".concat(a):""))},disabled:0===J.length,children:"Explore"})})]})]})},E=a(60357),F=a.n(E),q=a(41664),A=a.n(q),L=function(){return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(h.Z,{children:[(0,n.jsx)(F(),{id:"f35b0909c65f2703",children:'.header{background-image:url("/steam-review-explorer/jumbotron-bg.jpg");-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;background-position:center;background-repeat:no-repeat}html.dark .header{background-image:url("/steam-review-explorer/jumbotron-bg-dark.jpg")}'}),(0,n.jsx)(m.Z,{children:(0,n.jsx)("header",{className:"jsx-f35b0909c65f2703",children:(0,n.jsx)("div",{className:"jsx-f35b0909c65f2703 header mb-4 bg-light rounded-3",children:(0,n.jsxs)("div",{className:"jsx-f35b0909c65f2703 container-fluid py-5",children:[(0,n.jsx)("h1",{className:"jsx-f35b0909c65f2703",children:"Understand player feedback"}),(0,n.jsx)("p",{className:"jsx-f35b0909c65f2703",children:"Search, visualise and download Steam reviews using this free data analysis tool"}),(0,n.jsx)(A(),{href:"/about",children:"Find out how it works"}),(0,n.jsx)("br",{className:"jsx-f35b0909c65f2703"}),(0,n.jsx)(A(),{href:"/about#changelog",children:(0,n.jsx)("a",{className:"jsx-f35b0909c65f2703",children:"View Changelog"})})]})})})})]})})},U=function(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(L,{}),(0,n.jsx)(h.Z,{children:(0,n.jsx)(m.Z,{children:(0,n.jsx)(D,{})})})]})}}},function(e){e.O(0,[662,571,885,923,899,572,774,888,179],(function(){return t=48312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);