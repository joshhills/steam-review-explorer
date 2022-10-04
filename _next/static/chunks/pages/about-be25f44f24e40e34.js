(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{39212:function(e,s,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return i(14228)}])},6047:function(e,s,i){"use strict";var t=i(85893),r=i(41664),a=i.n(r),n=(i(67294),i(88375));s.Z=function(){return(0,t.jsxs)(n.Z,{variant:"info",className:"mb-4",children:["This website is in beta, please consider ",(0,t.jsx)(a(),{href:"/feedback",children:"leaving feedback"})," to help improve it"]})}},14228:function(e,s,i){"use strict";i.r(s),i.d(s,{default:function(){return m}});var t=i(85893),r=i(35712),a=i(6047),n=(i(67294),i(41664)),o=i.n(n),l=i(26699),d=i(10682),c=i(34051),h=i(31555);function m(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.Z,{}),(0,t.jsx)("div",{className:"bg-light rounded-3 p-3 mb-4",children:(0,t.jsxs)(l.Z,{className:"mb-0",children:[(0,t.jsx)(l.Z.Item,{children:(0,t.jsx)(o(),{href:"/",children:"Home"})}),(0,t.jsx)(l.Z.Item,{active:!0,children:"About"})]})}),(0,t.jsxs)(d.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsxs)(h.Z,{children:[(0,t.jsx)("h3",{children:"Purpose"}),(0,t.jsxs)("p",{className:"lead",children:["This tool has been built to help promote the accessibility of the ",(0,t.jsx)("a",{href:"https://store.steampowered.com/reviews/",children:"Steam user review system"})," so that developers can better perform research and action on feedback about their products."]}),(0,t.jsx)("p",{children:"There are many tools out there that help make sense of the totality of public data Steam provides - they transform the data they mine to provide insights Steam does not readily provide itself."}),(0,t.jsxs)("p",{children:["The Steam review system was introduced in 2011 and has evolved from a simple text box to include user curation and filtering in an attempt to be more useful and address issues such as spam and ",(0,t.jsx)("a",{href:"https://en.wikipedia.org/wiki/Review_bomb",children:"'review bombing'"}),"."]}),(0,t.jsx)("p",{children:"There are now a huge number of user reviews in Steam, but the only place to view them is the store front, which is geared towards consumers."}),(0,t.jsx)("p",{children:"However, Steam's APIs can be used to access all reviews for a given product at once, and more. This tool provides a clean interface to this data set with a greater level of control."})]})}),(0,t.jsx)(c.Z,{children:(0,t.jsxs)(h.Z,{children:[(0,t.jsx)("h3",{children:"Usage"}),(0,t.jsxs)("p",{children:["Research shows that ",(0,t.jsx)("a",{href:"https://arstechnica.com/gaming/2014/04/steam-gauge-do-strong-reviews-lead-to-stronger-sales-on-steam/",children:"user reviews are influential"}),", and have the potential to answer a number of interesting and useful questions such as:"]}),(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:"How long do people typically play this game?"}),(0,t.jsx)("li",{children:"What do people like/dislike most about it?"}),(0,t.jsx)("li",{children:"What is the current trend in user sentiment after the last update compared to previous updates?"}),(0,t.jsx)("li",{children:"Which users are having technical issues?"}),(0,t.jsx)("li",{children:"Do people who receive it for free rate it more favourably?"})]}),(0,t.jsx)("p",{children:"A community manager may use it to find dedicated users worth helping and rewarding. A designer may use it to isolate high quality feedback. A product analyst may use it evaluate success (retention, sentiment) over time."}),(0,t.jsx)("p",{children:"To this end, visualisations are provided to aid exploration, and the data itself can be exported."})]})}),(0,t.jsx)(c.Z,{children:(0,t.jsxs)(h.Z,{children:[(0,t.jsx)("h3",{children:"Feedback & Support"}),(0,t.jsxs)("p",{children:["You can request features and report bugs on ",(0,t.jsx)("a",{href:"https://github.com/joshhills/steam-review-explorer/projects/1",children:"Github"}),"."]}),(0,t.jsxs)("p",{children:["This tool is provided for free, but developing, maintaining and hosting it takes time and money. If you find it useful, and you'd like to support me, consider ",(0,t.jsx)(o(),{href:"/feedback",children:"providing constructive feedback"})," and ",(0,t.jsx)("a",{href:"https://twitter.com/intent/tweet?hashtags=gamedev&ref_src=twsrc%5Etfw&text=Make%20better%20sense%20of%20all%20%40Steam%20product%20reviews%20using%20this%20free%20exploratory%20data%20analysis%20tool&tw_p=tweetbutton&url=https%3A%2F%2Fproject.joshhills.dev%2Fsteam-review-explorer&via=steamreviewtool",target:"_blank",children:"sharing on social media"}),", or joining one of the many kind people who have made a donation using the link below."]}),(0,t.jsx)(r.Z,{})]})}),(0,t.jsx)(c.Z,{className:"mt-4 mb-4",children:(0,t.jsxs)(h.Z,{children:[(0,t.jsx)("h3",{id:"faq",children:"FAQ"}),(0,t.jsx)("h5",{id:"data-source",children:"Where does the data come from?"}),(0,t.jsxs)("p",{children:["The data is retrieved from ",(0,t.jsx)("a",{href:"https://partner.steamgames.com/doc/store/getreviews",children:"Steam's Web API"})," by your web browser via a CORS proxy I'm hosting. It can only see public reviews (ones not made by private accounts)."]}),(0,t.jsx)("h5",{id:"data-quantity",children:"Is there a limit to its use?"}),(0,t.jsx)("p",{children:"None imposed by this tool, but since the reviews are stored in your browser's memory, and filtering them can be demanding on your hardware, the tool may break for games with > 30,000 reviews. Steam may also decide to rate limit use of their public APIs, or make them inaccessible, at any time."}),(0,t.jsx)("h5",{id:"data-privacy",children:"Are you spying on me?"}),(0,t.jsxs)("p",{children:["I've chosen to not include any kind of analytics scripts on this website, so you can use it in a professional capacity without worrying about being tracked. ",(0,t.jsx)("a",{href:"https://github.com/joshhills/steam-review-explorer/",children:"View the source here"}),", and use a VPN if you're unconvinced. Consider this the privacy policy."]}),(0,t.jsx)("h5",{id:"known-issues-mismatched-totals",children:"Why am I seeing more / less reviews than I expected for a product?"}),(0,t.jsx)("p",{children:"If reviews are added or removed while the tool is busy retrieving them, the number retrieved may not match the total Steam initially provided. This is more likely to happen with new/popular games recieving a lot of activity. Though it may take some time for Steam to accurately report the total number of reviews for a product in its system, this tool will retrieve all reviews it has access to at the time of retrieval."}),(0,t.jsx)("h5",{id:"product-type",children:"Why 'products' and not 'games'?"}),(0,t.jsx)("p",{children:"Over time Valve has experimented with providing more than just games through Steam, from subscriptions to films and hardware. Reviews can only be left for games, DLCs and soundtracks."}),(0,t.jsx)("h5",{id:"languages",children:"Does the language matter?"}),(0,t.jsx)("p",{children:"Some experimental features such as censoring bad words and word frequency currently only work in English - if you'd like to contribute to localising these features, please contact me!"}),(0,t.jsx)(o(),{href:"/feedback",children:"Do you have a different question?"})]})}),(0,t.jsx)(c.Z,{className:"mb-4",children:(0,t.jsxs)(h.Z,{children:[(0,t.jsx)("h3",{id:"changelog",children:"Changelog"}),(0,t.jsx)("h6",{children:"0.1"}),(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:"Initial release with game search, review table, and highlighted sections"}),(0,t.jsx)("li",{className:"text-secondary",children:"Beta, 'experimental' and feedback notices on some features"})]}),(0,t.jsx)("h6",{children:"0.2"}),(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:"Review URLs included in CSV export"}),(0,t.jsx)("li",{children:"Filter panel requires confirmation of changes"}),(0,t.jsx)("li",{className:"text-secondary",children:"Filter and page refresh bugs fixed"})]}),(0,t.jsx)("h6",{children:"0.3"}),(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:"Dark mode and view filter preferences are remembered between visits"}),(0,t.jsx)("li",{children:"Copy text functionality exists for review items"}),(0,t.jsx)("li",{children:"Scraper shows elapsed time and allows you to continue early"}),(0,t.jsx)("li",{children:"Review table can be paginated using left and right arrow keys"}),(0,t.jsx)("li",{className:"text-secondary",children:"Word frequency table made responsive"})]}),(0,t.jsx)("h6",{children:"0.4"}),(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:"Scroll-up button now exists at bottom of review table"}),(0,t.jsx)("li",{children:"Language filter is now remembered between visits"}),(0,t.jsx)("li",{children:"Select fields are searchable, easier to use"}),(0,t.jsx)("li",{children:"Time played after review stats now available"}),(0,t.jsx)("li",{className:"text-secondary",children:"UI frameworks updated"})]})]})}),(0,t.jsx)(c.Z,{className:"mb-4",children:(0,t.jsxs)(h.Z,{children:[(0,t.jsx)("h3",{children:"Legal & Attributions"}),(0,t.jsxs)("p",{children:["Data is retrieved from ",(0,t.jsx)("a",{href:"https://steamcommunity.com/dev",children:"Steam's web APIs"})," in accordance with their policy. This website is not affiliated with Valve."]})]})})]})]})}},88375:function(e,s,i){"use strict";var t=i(44036),r=i.n(t),a=i(67294),n=i(80789),o=i(78146),l=i(70080),d=i(76792),c=i(41068),h=i(41485),m=i(39602),u=i(66611),p=i(85893);const f=(0,m.Z)("h4");f.displayName="DivStyledAsH4";const x=(0,u.Z)("alert-heading",{Component:f}),v=(0,u.Z)("alert-link",{Component:l.Z}),b={variant:"primary",show:!0,transition:c.Z,closeLabel:"Close alert"},j=a.forwardRef(((e,s)=>{const{bsPrefix:i,show:t,closeLabel:a,closeVariant:l,className:m,children:u,variant:f,onClose:x,dismissible:v,transition:b,...j}=(0,n.Ch)(e,{show:"onClose"}),w=(0,d.vE)(i,"alert"),g=(0,o.Z)((e=>{x&&x(!1,e)})),y=!0===b?c.Z:b,k=(0,p.jsxs)("div",{role:"alert",...y?void 0:j,ref:s,className:r()(m,w,f&&`${w}-${f}`,v&&`${w}-dismissible`),children:[v&&(0,p.jsx)(h.Z,{onClick:g,"aria-label":a,variant:l}),u]});return y?(0,p.jsx)(y,{unmountOnExit:!0,...j,ref:void 0,in:t,children:k}):t?k:null}));j.displayName="Alert",j.defaultProps=b,s.Z=Object.assign(j,{Link:v,Heading:x})},26699:function(e,s,i){"use strict";i.d(s,{Z:function(){return m}});var t=i(44036),r=i.n(t),a=i(67294),n=i(76792),o=i(70080),l=i(85893);const d=a.forwardRef((({bsPrefix:e,active:s,children:i,className:t,as:a="li",linkAs:d=o.Z,linkProps:c,href:h,title:m,target:u,...p},f)=>{const x=(0,n.vE)(e,"breadcrumb-item");return(0,l.jsx)(a,{ref:f,...p,className:r()(x,t,{active:s}),"aria-current":s?"page":void 0,children:s?i:(0,l.jsx)(d,{...c,href:h,title:m,target:u,children:i})})}));d.displayName="BreadcrumbItem",d.defaultProps={active:!1,linkProps:{}};var c=d;const h=a.forwardRef((({bsPrefix:e,className:s,listProps:i,children:t,label:a,as:o="nav",...d},c)=>{const h=(0,n.vE)(e,"breadcrumb");return(0,l.jsx)(o,{"aria-label":a,className:s,ref:c,...d,children:(0,l.jsx)("ol",{...i,className:r()(h,null==i?void 0:i.className),children:t})})}));h.displayName="Breadcrumb",h.defaultProps={label:"breadcrumb",listProps:{}};var m=Object.assign(h,{Item:c})}},function(e){e.O(0,[774,888,179],(function(){return s=39212,e(e.s=s);var s}));var s=e.O();_N_E=s}]);