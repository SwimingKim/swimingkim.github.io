(this["webpackJsonpreact-site"]=this["webpackJsonpreact-site"]||[]).push([[0],{270:function(e,a,t){e.exports=t(555)},275:function(e,a,t){},555:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),i=t(12),o=t.n(i),l=(t(275),t(234)),c=t(55),s=t(93),m=t(4),u=t(601),p=t(609),d=t(613),g=t(610),h=t(611),E=t(74),f=t(612),v=t(231),w=t.n(v),x=t(233),b=t.n(x),y=t(232),S=t.n(y),k=t(616),B=t(598),j=t(599),O=t(600),C=t(219),N=t.n(C),M=t(220),I=t.n(M),T=t(139),P=t.n(T),D=t(595),H=t(597);var A=function(e){return r.a.createElement("div",null,function(e){return[{title:"Home",icon:r.a.createElement(P.a,null),to:"/#/"},{title:"Project",icon:r.a.createElement(P.a,null),to:"/#/project"}].map((function(a,t){return r.a.createElement(W,{key:t,item:a,onClose:e})}))}(e),r.a.createElement(D.a,null),function(e){var a=[{title:"Clock",icon:r.a.createElement(N.a,null),to:"/#/clock"},{title:"Chatbot",icon:r.a.createElement(I.a,null),to:"/#/chatbot"}];return r.a.createElement("div",null,r.a.createElement(O.a,{inset:!0},"Examples"),a.map((function(a,t){return r.a.createElement(W,{key:t,item:a,onClose:e})})))}(e))};function W(e){var a=e.item,t=e.onClose;return r.a.createElement(H.a,{href:a.to,color:"inherit"},r.a.createElement("div",{onClick:t},r.a.createElement(k.a,{button:!0},r.a.createElement(B.a,null,a.icon),r.a.createElement(j.a,{color:"inherit",primary:a.title}))))}var z=t(14),R=t(36),F=t(47);function G(e){return r.a.createElement(E.a,{component:"h2",variant:"h6",color:"primary",gutterBottom:!0},e.children)}function K(e,a){return{time:e,amount:a}}var J=[K("00:00",0),K("03:00",300),K("06:00",600),K("09:00",800),K("12:00",1500),K("15:00",2e3),K("18:00",2400),K("21:00",2400),K("24:00",void 0)];function L(){var e=Object(R.a)();return r.a.createElement(r.a.Fragment,null,r.a.createElement(G,null,"Today"),r.a.createElement(F.d,null,r.a.createElement(F.c,{data:J,margin:{top:16,right:16,bottom:0,left:24}},r.a.createElement(F.e,{dataKey:"time",stroke:e.palette.text.secondary}),r.a.createElement(F.f,{stroke:e.palette.text.secondary},r.a.createElement(F.a,{angle:270,position:"left",style:{textAnchor:"middle",fill:e.palette.text.primary}},"Sales ($)")),r.a.createElement(F.b,{type:"monotone",dataKey:"amount",stroke:e.palette.primary.main,dot:!1}))))}function V(e){e.preventDefault()}var X=Object(u.a)({depositContext:{flex:1}});function $(){var e=X();return r.a.createElement(r.a.Fragment,null,r.a.createElement(G,null,"Recent Deposits"),r.a.createElement(E.a,{component:"p",variant:"h4"},"$3,024.00"),r.a.createElement(E.a,{color:"textSecondary",className:e.depositContext},"on 15 March, 2019"),r.a.createElement("div",null,r.a.createElement(H.a,{color:"primary",href:"#",onClick:V},"View balance")))}var _=t(602),U=t(606),Y=t(605),q=t(603),Q=t(604);function Z(e,a,t,n,r,i){return{id:e,date:a,name:t,shipTo:n,paymentMethod:r,amount:i}}var ee=[Z(0,"16 Mar, 2019","Elvis Presley","Tupelo, MS","VISA \u2800\u2022\u2022\u2022\u2022 3719",312.44),Z(1,"16 Mar, 2019","Paul McCartney","London, UK","VISA \u2800\u2022\u2022\u2022\u2022 2574",866.99),Z(2,"16 Mar, 2019","Tom Scholz","Boston, MA","MC \u2800\u2022\u2022\u2022\u2022 1253",100.81),Z(3,"16 Mar, 2019","Michael Jackson","Gary, IN","AMEX \u2800\u2022\u2022\u2022\u2022 2000",654.39),Z(4,"15 Mar, 2019","Bruce Springsteen","Long Branch, NJ","VISA \u2800\u2022\u2022\u2022\u2022 5919",212.79)];function ae(e){e.preventDefault()}var te=Object(u.a)((function(e){return{seeMore:{marginTop:e.spacing(3)}}}));function ne(){var e=te();return r.a.createElement(r.a.Fragment,null,r.a.createElement(G,null,"Recent Orders"),r.a.createElement(_.a,{size:"small"},r.a.createElement(q.a,null,r.a.createElement(Q.a,null,r.a.createElement(Y.a,null,"Date"),r.a.createElement(Y.a,null,"Name"),r.a.createElement(Y.a,null,"Ship To"),r.a.createElement(Y.a,null,"Payment Method"),r.a.createElement(Y.a,{align:"right"},"Sale Amount"))),r.a.createElement(U.a,null,ee.map((function(e){return r.a.createElement(Q.a,{key:e.id},r.a.createElement(Y.a,null,e.date),r.a.createElement(Y.a,null,e.name),r.a.createElement(Y.a,null,e.shipTo),r.a.createElement(Y.a,null,e.paymentMethod),r.a.createElement(Y.a,{align:"right"},e.amount))})))),r.a.createElement("div",{className:e.seeMore},r.a.createElement(H.a,{color:"primary",href:"#",onClick:ae},"See more orders")))}var re=t(607),ie=t(608),oe=t(558),le=Object(u.a)((function(e){return{root:{display:"flex"},toolbar:{background:"#212121",paddingRight:24},toolbarIcon:Object(s.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawer:{width:240,flexShrink:0},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(c.a)({display:"none",overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}}));var ce=function(){var e=le(),a=Object(m.a)(e.paper,e.fixedHeight);return r.a.createElement(re.a,{maxWidth:"lg",className:e.container},r.a.createElement(ie.a,{container:!0,spacing:3},r.a.createElement(ie.a,{item:!0,xs:12,md:8,lg:9},r.a.createElement(oe.a,{className:a},r.a.createElement(L,null))),r.a.createElement(ie.a,{item:!0,xs:12,md:4,lg:3},r.a.createElement(oe.a,{className:a},r.a.createElement($,null))),r.a.createElement(ie.a,{item:!0,xs:12},r.a.createElement(oe.a,{className:e.paper},r.a.createElement(ne,null)))))},se=Object(u.a)((function(e){return{container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)}}}));var me=function(){var e=se();return r.a.createElement(re.a,{maxWidth:"lg",className:e.container},r.a.createElement("div",null,"Project"))},ue=Object(u.a)((function(e){return{container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)}}}));var pe=function(){var e=ue();return r.a.createElement(re.a,{maxWidth:"lg",className:e.container},r.a.createElement("div",null,"HOME"))},de=t(614);var ge=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"NOT FOUND"))},he=Object(u.a)((function(e){return{root:{display:"flex"},toolbar:{background:"#212121",paddingRight:24},toolbarIcon:Object(s.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawer:{width:240,flexShrink:0},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(c.a)({display:"none",overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}}));function Ee(){return r.a.createElement(E.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(H.a,{target:"_blank",color:"inherit",href:"https://material-ui.com/"},"Your Website")," ",(new Date).getFullYear(),".")}function fe(){var e=he(),a=r.a.useState(!1),t=Object(l.a)(a,2),n=t[0],i=t[1],o=function(){i(!0)},c=function(){i(!1)};return r.a.createElement("div",{className:e.root},r.a.createElement(p.a,null),r.a.createElement(g.a,{position:"absolute",className:Object(m.a)(e.appBar)},r.a.createElement(h.a,{className:e.toolbar},r.a.createElement(f.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:o,className:Object(m.a)(e.menuButton,n&&e.menuButtonHidden)},r.a.createElement(w.a,null)),r.a.createElement(E.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:e.title},"SKIM"),r.a.createElement(H.a,{target:"_blank",color:"inherit",href:"https://dev-skim.blogspot.com/"},r.a.createElement(f.a,{color:"inherit"},r.a.createElement(S.a,null))),r.a.createElement(H.a,{target:"_blank",color:"inherit",href:"https://github.com/SwimingKim"},r.a.createElement(f.a,{color:"inherit"},r.a.createElement(b.a,null))))),r.a.createElement(d.a,{classes:{paper:Object(m.a)(e.drawerPaper,!n&&e.drawerPaperClose)},open:n,onOpen:o,onClose:c},A(c)),r.a.createElement("main",{className:e.content},r.a.createElement("div",null,r.a.createElement("div",{className:e.appBarSpacer}),r.a.createElement("div",null,r.a.createElement(z.c,null,r.a.createElement(z.a,{path:"/",component:pe,exact:!0}),r.a.createElement(z.a,{path:"/project",component:me}),r.a.createElement(z.a,{path:"/test",component:ce}),r.a.createElement(z.a,{component:ge})),r.a.createElement(de.a,{pt:4},r.a.createElement(Ee,null))))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ve=t(138);o.a.render(r.a.createElement(ve.a,null,r.a.createElement(fe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[270,1,2]]]);
//# sourceMappingURL=main.a15f612d.chunk.js.map