"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[372],{6047:function(e,t,r){var n=r(85893),a=r(41664),s=r.n(a),i=(r(67294),r(88375));t.Z=function(){return(0,n.jsxs)(i.Z,{variant:"info",className:"mb-4",children:["This website is in beta, please consider ",(0,n.jsx)(s(),{href:"/feedback",children:"leaving feedback"})," to help improve it"]})}},52091:function(e,t,r){var n=r(26042),a=r(69396),s=r(85893),i=(r(67294),r(27977)),o=r(63178),c=r(43489);t.Z=function(e){var t,r=e.game,u=e.showTooltip;switch(r.review_score_desc.toLowerCase()){case"overwhelmingly positive":case"very positive":case"positive":case"mostly positive":t="success";break;case"mixed":t="warning";break;case"mostly negative":case"negative":case"very negative":case"overwhelmingly negative":t="danger";break;default:t="secondary"}var l=(0,s.jsx)(i.Z,{className:"mb-1 me-1",bg:t,children:r.review_score_desc}),p=Math.round(r.total_positive/r.total_reviews*100);return u?(0,s.jsx)(o.Z,{placement:"top",delay:{show:250,hide:400},overlay:function(e){return r.total_reviews>0?(0,s.jsx)(c.Z,(0,a.Z)((0,n.Z)({id:"score-".concat(r.steamp_appid)},e),{children:1===r.total_reviews?(0,s.jsxs)(s.Fragment,{children:["The one review for this game is ",100===p?"positive":"negative"]}):(0,s.jsxs)(s.Fragment,{children:[p,"% of the ",r.total_reviews.toLocaleString()," reviews for this ","dlc"===r.type?"DLC":r.type," are positive"]})})):(0,s.jsx)("p",{})},children:l}):l}},76572:function(e,t,r){var n=r(47568),a=r(26042),s=r(69396),i=r(70655),o=r(96486),c=r.n(o),u=r(26209),l=r(25632),p=new l.CensorSensor,h="https://guarded-waters-40555.herokuapp.com/";function f(e){return m.apply(this,arguments)}function m(){return(m=(0,n.Z)((function(e){return(0,i.__generator)(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(h,"https://store.steampowered.com/appreviews/").concat(e,"?json=1&day_range=9223372036854775807&language=all&review_type=all&purchase_type=all&filter_offtopic_activity=0&num_per_page=0&cacheBust=").concat(Math.random())).then((function(e){return e.json()})).then((function(e){return{review_score:e.query_summary.review_score,review_score_desc:"1 user reviews"===e.query_summary.review_score_desc?"1 user review":e.query_summary.review_score_desc,total_positive:e.query_summary.total_positive,total_negative:e.query_summary.total_negative,total_reviews:e.query_summary.total_reviews}}))];case 1:return[2,t.sent()]}}))}))).apply(this,arguments)}function _(){return(_=(0,n.Z)((function(){var e,t,r,n,o,u,l,p,f;return(0,i.__generator)(this,(function(i){switch(i.label){case 0:return[4,fetch("".concat(h,"https://store.steampowered.com/api/featured?cacheBust=").concat(Math.random())).then((function(e){return e.json()})).then((function(e){return e.featured_win}))];case 1:e=i.sent(),t=[],r=!0,n=!1,o=void 0,i.label=2;case 2:i.trys.push([2,7,8,9]),u=c().uniqBy(e,(function(e){return e.id}))[Symbol.iterator](),i.label=3;case 3:return(r=(l=u.next()).done)?[3,6]:[4,y(l.value.id)];case 4:if(null===(p=i.sent()))return[3,5];-1!==p.content_descriptors.ids.indexOf(3)||t.push((0,s.Z)((0,a.Z)({},p),{time_scraped:Math.floor((new Date).getTime()/1e3)})),i.label=5;case 5:return r=!0,[3,3];case 6:return[3,9];case 7:return f=i.sent(),n=!0,o=f,[3,9];case 8:try{r||null==u.return||u.return()}finally{if(n)throw o}return[7];case 9:return[2,t]}}))}))).apply(this,arguments)}function v(){return(v=(0,n.Z)((function(e,t){var r,n,o,c,u,l,p,f,m,_,v;return(0,i.__generator)(this,(function(i){switch(i.label){case 0:return[4,fetch("".concat(h,"https://store.steampowered.com/api/storesearch/?term=").concat(e,"&l=english&cc=US")).then((function(e){return e.json()})).then((function(e){return e.items}))];case 1:r=i.sent(),n=[],o=!0,c=!1,u=void 0,i.label=2;case 2:i.trys.push([2,7,8,9]),l=r[Symbol.iterator](),i.label=3;case 3:return(o=(p=l.next()).done)?[3,6]:[4,y(p.value.id)];case 4:f=i.sent(),m=-1!==f.content_descriptors.ids.indexOf(3),_=-1!==t.indexOf("adult_game");try{(_&&"game"===f.type&&m||-1!==t.indexOf(f.type)&&!f.release_date.coming_soon)&&n.push((0,s.Z)((0,a.Z)({},f),{time_scraped:Math.floor((new Date).getTime()/1e3)}))}catch(d){}i.label=5;case 5:return o=!0,[3,3];case 6:return[3,9];case 7:return v=i.sent(),c=!0,u=v,[3,9];case 8:try{o||null==l.return||l.return()}finally{if(c)throw u}return[7];case 9:return[2,n]}}))}))).apply(this,arguments)}function y(e){return d.apply(this,arguments)}function d(){return(d=(0,n.Z)((function(e){var t,r;return(0,i.__generator)(this,(function(n){switch(n.label){case 0:return[4,fetch("".concat(h,"https://store.steampowered.com/api/appdetails?appids=").concat(e)).then((function(e){return e.json()})).then((function(t){return t[e].success?t[e].data:null}))];case 1:return null===(t=n.sent())?[2,null]:[4,f(e)];case 2:return r=n.sent(),[2,(0,s.Z)((0,a.Z)({},t,r),{time_scraped:Math.floor((new Date).getTime()/1e3)})]}}))}))).apply(this,arguments)}function w(){return w=(0,n.Z)((function(e,t,r,a,s){var o,c,l,f,m,_,v,y,d,w,g,b,Z,x,j,N,T,E,M,S,q,k,C,A,L,R,B,D;return(0,i.__generator)(this,(function(F){switch(F.label){case 0:50,o=null,c=[],l=function(){var t=(0,n.Z)((function(t,r){var o,l;return(0,i.__generator)(this,(function(p){switch(p.label){case 0:r&&(r=encodeURIComponent(r)),o=null,r||(o=Math.random()),l="".concat(h,"https://store.steampowered.com/appreviews/").concat(t,"?json=1&filter=recent&language=all&review_type=all&purchase_type=all&num_per_page=100&filter_offtopic_activity=0").concat(r?"&cursor=".concat(r):"").concat(o?"&cacheBust=".concat(o):""),p.label=1;case 1:return p.trys.push([1,3,,4]),[4,(0,u.Z)((function(){return fetch(l).then(function(){var t=(0,n.Z)((function(t){var r;return(0,i.__generator)(this,(function(n){switch(n.label){case 0:return[4,t.json()];case 1:if(null!==(r=n.sent())&&r.success&&r.query_summary.num_reviews>0)return a({abortController:s}),[2,{reviews:r.reviews,cursor:r.cursor,bytes:+t.headers.get("Content-Length")}];if(a({abortController:s}),0===r.query_summary.num_reviews&&e.total_reviews-c.length>50)throw new Error("Expected more reviews but response was empty");return[2]}}))}));return function(e){return t.apply(this,arguments)}}())}),{retries:4,signal:s.signal,onFailedAttempt:function(n){o=Math.random(),l="".concat(h,"https://store.steampowered.com/appreviews/").concat(t,"?json=1&filter=recent&language=all&review_type=all&purchase_type=all&num_per_page=100&filter_offtopic_activity=0").concat(r?"&cursor=".concat(r):"").concat(o?"&cacheBust=".concat(o):""),a({triesLeft:n.retriesLeft,attemptNumber:n.attemptNumber,goal:e.total_reviews,abortController:s})}})];case 2:return[2,p.sent()];case 3:return p.sent(),[2];case 4:return[2]}}))}));return function(e,r){return t.apply(this,arguments)}}(),f=[],m=0,F.label=1;case 1:return _=(new Date).getTime(),[4,l(t,o)];case 2:if(v=F.sent(),y=(new Date).getTime()-_,3===f.length&&f.shift(),f.push(y),v){m+=v.bytes,d=!0,w=!1,g=void 0;try{for(b=v.reviews[Symbol.iterator]();!(d=(Z=b.next()).done);d=!0)x=Z.value,isNaN(x.author.playtime_at_review)&&(x.author.playtime_at_review=x.author.playtime_forever),x.review=x.review.replace(/"/g,"'"),p.isProfaneIsh(x.review)&&(x.censored=p.cleanProfanityIsh(x.review)),x.recommendationurl="https://steamcommunity.com/profiles/".concat(x.author.steamid,"/recommended/").concat(e.steam_appid,"/"),(x.votes_up===Number.MAX_VALUE||x.votes_up===Number.MAX_SAFE_INTEGER||x.votes_up<0)&&(x.votes_up=0),(x.votes_funny===Number.MAX_VALUE||x.votes_funny===Number.MAX_SAFE_INTEGER||x.votes_funny<0)&&(x.votes_funny=0),c.push(x)}catch(G){w=!0,g=G}finally{try{d||null==b.return||b.return()}finally{if(w)throw g}}j=0,N=!0,T=!1,E=void 0;try{for(M=f[Symbol.iterator]();!(N=(S=M.next()).done);N=!0)q=S.value,j+=q}catch(G){T=!0,E=G}finally{try{N||null==M.return||M.return()}finally{if(T)throw E}}r({count:c.length,averageRequestTime:j/f.length,bytes:m,finished:!1}),o=v.cursor}else o=null;F.label=3;case 3:if(o)return[3,1];F.label=4;case 4:k=0,C=!0,A=!1,L=void 0;try{for(R=f[Symbol.iterator]();!(C=(B=R.next()).done);C=!0)D=B.value,k+=D}catch(G){A=!0,L=G}finally{try{C||null==R.return||R.return()}finally{if(A)throw L}}return r({count:c.length,averageRequestTime:k/f.length,bytes:m,finished:!0}),[2,c]}}))})),w.apply(this,arguments)}var g={getFeaturedGames:function(){return _.apply(this,arguments)},getReviewScore:f,findGamesBySearchTerm:function(e,t){return v.apply(this,arguments)},getGame:y,getReviews:function(e,t,r,n,a){return w.apply(this,arguments)}};t.Z=g}}]);