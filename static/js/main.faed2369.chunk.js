(this["webpackJsonpour-telepathy"]=this["webpackJsonpour-telepathy"]||[]).push([[0],{104:function(e,t,n){},144:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(10),r=n.n(o),i=(n(104),n(46)),s=n(11),l=n(37),u=n(15),m=n(173),f=n(176),d=n(178),g=n(179),p=n(185),b=n(186),h=n(180),k=n(175),E=Object(m.a)((function(e){return{orange:{color:e.palette.getContrastText(k.a[500]),backgroundColor:k.a[500]},cardHeader:{alignItems:"center"},cardContent:{display:"flex",justifyContent:"space-between"},cardStatusChip:{alignSelf:"center"}}}));function v(e){var t=e.member,n=E();return c.a.createElement(f.a,{item:!0,xs:3,md:3},c.a.createElement(d.a,null,c.a.createElement(g.a,{className:n.cardHeader,avatar:c.a.createElement(p.a,{className:n.orange},"O"),title:t.name,action:c.a.createElement(b.a,{className:n.cardStatusChip,color:"primary",label:"\uc5c5\ubb34\uc911"})}),c.a.createElement(h.a,{className:n.cardContent})))}var y=Object(m.a)({memberBox:{padding:"10px 40px",marginTop:"20px"}});function j(e){var t=e.memberList,n=(e.offerToMember,y());return c.a.createElement(f.a,{container:!0,spacing:3,className:n.memberBox},t.map((function(e){return c.a.createElement(v,{key:e.id,member:e})})))}var O=n(59),w=n(181),C=Object(m.a)((function(e){return{orange:{color:e.palette.getContrastText(k.a[500]),backgroundColor:k.a[500]},cardHeader:{alignItems:"center"},cardContent:{display:"flex",justifyContent:"space-between"},cardStatusChip:{alignSelf:"center"},workingStatusButton:{color:"#5843BE"},restStatusButton:{color:"#FFA067"},offStatusButton:{color:"#282828"}}}));function x(e){var t=e.myInfo,n=e.setMyInfo,o=C(),r=Object(a.useState)(""),i=Object(u.a)(r,2),s=i[0],l=i[1],m=Object(a.useState)("primary"),k=Object(u.a)(m,2),E=k[0],v=k[1];function y(e){switch(n(Object(O.a)(Object(O.a)({},t),{},{status:e})),e){case"working":l("\uc5c5\ubb34\uc911"),v("primary");break;case"meeting":l("\ud68c\uc758\uc911"),v("primary");break;case"meal":l("\uc2dd\uc0ac\uc911"),v("secondary");break;case"rest":l("\ud734\uc2dd\uc911"),v("secondary");break;case"offwork":l("\ud1f4\uadfc"),v("default")}}return Object(a.useEffect)((function(){y(t.status)}),[]),c.a.createElement(d.a,{elevation:0},c.a.createElement(g.a,{className:o.cardHeader,avatar:c.a.createElement(p.a,{className:o.orange},"\uc751"),title:t.name,action:c.a.createElement(b.a,{className:o.cardStatusChip,color:E,label:s})}),c.a.createElement(h.a,{className:o.cardContent},c.a.createElement(f.a,{item:!0,xs:1}),c.a.createElement(f.a,{item:!0,xs:2},c.a.createElement(w.a,{variant:"working"==t.status?"contained":"none",color:E,onClick:function(){y("working")}},"\uc5c5\ubb34")),c.a.createElement(f.a,{item:!0,xs:2},c.a.createElement(w.a,{variant:"meeting"==t.status?"contained":"none",color:E,onClick:function(){y("meeting")}},"\ud68c\uc758")),c.a.createElement(f.a,{item:!0,xs:2},c.a.createElement(w.a,{variant:"rest"==t.status?"contained":"none",color:E,onClick:function(){y("rest")}},"\ud734\uc2dd")),c.a.createElement(f.a,{item:!0,xs:2},c.a.createElement(w.a,{variant:"meal"==t.status?"contained":"none",color:E,onClick:function(){y("meal")}},"\uc2dd\uc0ac")),c.a.createElement(f.a,{item:!0,xs:2},c.a.createElement(w.a,{variant:"offwork"==t.status?"contained":"none",color:E,onClick:function(){y("offwork")}},"\ud1f4\uadfc")),c.a.createElement(f.a,{item:!0,xs:1})))}var S=n(83),M=n(84),N=n(85),T={key:"",id:"",team:"",name:""},B=new(function(){function e(){Object(S.a)(this,e),this.socket=Object(N.io)("https://flawless-psyche-307902.du.r.appspot.com")}return Object(M.a)(e,[{key:"join",value:function(e){T.id=e.id,T.team=e.team,T.name=e.name,this.socket.emit("join",e)}},{key:"onJoin",value:function(e,t){this.socket.on("myInfo",(function(e){T.key=e.key})),this.socket.on("userList",(function(t){t.forEach((function(t){console.log(t),e(t)}))})),this.socket.on("joinedUser",(function(t){console.log(t),e(t)})),this.socket.on("leavedUser",(function(e){t(e)}))}},{key:"offJoin",value:function(){this.socket.off("myInfo"),this.socket.off("userList"),this.socket.off("joinedUser"),this.socket.off("leavedUser")}},{key:"getMyInfo",value:function(){return T}},{key:"sendChatMessageToAll",value:function(e,t){this.socket.emit("chatMessageToAll",e,t)}},{key:"onChatMessage",value:function(e){this.socket.on("receiveChatMessage",e)}},{key:"onError",value:function(e){console.error(e)}},{key:"onMessageReceived",value:function(e){this.socket.on("receivePrivateMessage",e)}},{key:"offMessageReceived",value:function(){this.socket.off("receivePrivateMessage")}},{key:"sendMessageToUser",value:function(e,t,n){var a={id:T.id,key:T.key,type:e,message:n};this.socket.emit("privateMessage",t,a)}}]),e}()),L=n(56),I=n.n(L),F=n(86),A={pcList:{},stream:null},D={iceServers:[{url:"stun:34.64.112.126:3478"},{url:"turn:34.64.112.126:3478?transport=udp",credential:"dmdcjfdl",username:"ekim"}],DtlsSrtpKeyAgreement:!0};function R(){return P.apply(this,arguments)}function P(){return(P=Object(F.a)(I.a.mark((function e(){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!A.stream){e.next=2;break}return e.abrupt("return",A.stream);case 2:return e.next=4,navigator.mediaDevices.getUserMedia({audio:!0});case 4:return A.stream=e.sent,e.abrupt("return",A.stream);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(e){return new Promise((function(t,n){R().then((function(a){window.myStream=a;try{var c=new RTCPeerConnection(D);c.addStream(a),c.oniceconnectionstatechange=function(t){!function(e,t){console.log(e,t),console.log(A.pcList[e].connectionState),"connected"===A.pcList[e].connectionState&&console.log("connected")}(e,t)},A.pcList[e]=c,t(c)}catch(o){console.error(o),n(o)}}))}))}function J(e){console.error(e)}var H={getUserMedia:R,createOffer:function(e){return console.log("createOffer: "+e),new Promise((function(t,n){U(e).then((function(n){A.pcList[e].createOffer((function(a){A.pcList[e].setLocalDescription(a),t({pc:n,sessionDescription:a})}),J)})).catch((function(e){n(e)}))}))},createAnswer:function(e){return new Promise((function(t){"connected"!==A.pcList[e].connectionState&&A.pcList[e].createAnswer((function(n){A.pcList[e].setLocalDescription(n),t(n)}),J)}))},receiveOffer:function(e,t){if(console.log("receiveOffer: "+e),!A.pcList[e])return new Promise((function(n){U(e).then((function(e){e.setRemoteDescription(new RTCSessionDescription(t)),n(e)}))}))},receiveAnswer:function(e,t){A.pcList[e].setRemoteDescription(new RTCSessionDescription(t))},addIceCandidate:function(e,t){A.pcList[e]&&A.pcList[e].addIceCandidate(t)}};var z={getNewId:function(){return Math.round(99999999*Math.random())}},K=n(182),W=n(51),Y=n(87),q=n(184),$=Object(m.a)({root:function(e){return{backgroundColor:e.line.color,width:"".concat(e.line.width,"%"),height:"100%",display:"inline-block",borderRadius:e.line.isFirst?"0.3rem 0 0 0.3rem":e.line.isLast?"0 0.3rem 0.3rem 0":"0"}}});function G(e){var t=$(e);return c.a.createElement("span",{className:t.root})}Object(m.a)({});function Q(e){var t=e.className,n=e.lines;return c.a.createElement("div",{className:t},n.map((function(e,t){return c.a.createElement(G,{key:t,line:e})})))}var V=Object(m.a)({progress:{height:"1.5rem",backgroundColor:"#fff",borderRadius:"0.3rem"}});function X(e){Object(Y.a)(e);var t=V(),n=Object(a.useState)([{color:"#C6BDFB",width:15,isFirst:!0},{color:"#FFCBC0",width:10},{color:"#C6BDFB",width:35,isLast:!0}]),o=Object(u.a)(n,2),r=o[0];o[1];return c.a.createElement(q.a,null,c.a.createElement(Q,{className:t.progress,lines:r}))}var Z=Object(m.a)({mainBox:{backgroundColor:"#F1F3F6",padding:"10px 20px"}});function _(){var e=Z(),t=Object(s.g)(),n=t.teamId,o=t.userName,r=Object(a.useState)({key:"",id:z.getNewId(),name:o,team:n,status:"working"}),i=Object(u.a)(r,2),m=i[0],d=i[1],g=Object(a.useState)([]),p=Object(u.a)(g,2),b=(p[0],p[1]),h=Object(a.useState)([]),k=Object(u.a)(h,2),E=k[0],v=k[1];function y(e){v((function(t){return[].concat(Object(l.a)(t),[e])}))}function O(e){v((function(t){return t.filter((function(t){return t.key!==e}))}))}function w(e){b((function(t){return[].concat(Object(l.a)(t),[e])}))}function C(e){switch(e.type){case"offer":H.receiveOffer(e.id,e.message).then((function(t){t.onicecandidate=function(t){S(e.key,t)},t.onaddstream=function(t){M(e.key,t)},t.onremovestream=N,H.createAnswer(e.id).then((function(t){B.sendMessageToUser("answer",e.key,t)}))}));break;case"answer":H.receiveAnswer(e.id,e.message);break;case"candidate":console.log("candidate"),console.log(e),H.addIceCandidate(e.id,e.message);break;default:console.log(e)}}function S(e,t){t.candidate&&B.sendMessageToUser("candidate",e,t.candidate)}function M(e,t){var n=Object(l.a)(E).find((function(t){return t.key===e}));n&&(n.stream=t.stream,function(e){var t=Object(l.a)(E).findIndex((function(t){return t.key===e.key})),n=Object(l.a)(E);n[t]=e,v((function(){return n}))}(n))}function N(e){console.log(e)}return Object(a.useEffect)((function(){B.join(m)}),[]),Object(a.useEffect)((function(){return B.onJoin(y,O),function(){B.offJoin()}})),Object(a.useEffect)((function(){B.onChatMessage(w)}),[]),Object(a.useEffect)((function(){return B.onMessageReceived(C),function(){B.offMessageReceived()}})),c.a.createElement(K.a,{maxWidth:"md"},c.a.createElement(f.a,{container:!0,spacing:3,className:e.mainBox},c.a.createElement(f.a,{item:!0,xs:12,md:12},c.a.createElement(W.a,null,"TeleTele")),c.a.createElement(f.a,{item:!0,xs:12,md:6},c.a.createElement(x,{myInfo:m,setMyInfo:d})),c.a.createElement(f.a,{item:!0,xs:12,md:6},c.a.createElement(X,null))),c.a.createElement(j,{className:e.mainBox,memberList:E,offerToMember:function(e){H.createOffer(e.id,e.key).then((function(t){var n=t.pc,a=t.sessionDescription;n.onicecandidate=function(t){S(e.key,t)},n.onaddstream=function(t){M(e.key,t)},n.onremovestream=N,B.sendMessageToUser("offer",e.key,a)}))}}))}var ee=n(183),te=Object(m.a)({home:{position:"absolute",display:"flex",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",flexDirection:"column",color:"#fff",background:"linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"},title:{height:"3rem",fontSize:"2rem"},startButton:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",color:"#fff",width:"200px",height:"50px",borderRadius:"30px",fontSize:"1.2rem"},joinButton:{fontSize:"1.2rem",color:"#fff"}});function ne(){var e=te(),t=Object(s.f)(),n=Object(a.useState)(!1),o=Object(u.a)(n,2),r=o[0],i=o[1],l=Object(a.useState)(""),m=Object(u.a)(l,2),f=m[0],d=m[1],g=Object(a.useState)(""),p=Object(u.a)(g,2),b=p[0],h=p[1];function k(e){"Enter"===e.key&&(r?E():i(!0))}function E(){t.push("./team/".concat(f,"/").concat(b))}return c.a.createElement(q.a,{className:e.home},c.a.createElement("h2",{className:e.title},"T E L E P A T H Y"),c.a.createElement("h3",null,!r&&c.a.createElement(c.a.Fragment,null,c.a.createElement(ee.a,{label:"MY NAME",className:e.joinTextField,onChange:function(e){h(e.target.value)},onKeyPress:k,required:!0}),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement(w.a,{className:e.startButton,onClick:function(){i(!0)}},"START")),r&&c.a.createElement("div",null,c.a.createElement(w.a,{className:e.joinButton,onClick:E},"JOIN THE"),c.a.createElement(ee.a,{label:"TEAM",className:e.joinTextField,onChange:function(e){d(e.target.value)},onKeyPress:k}))))}var ae=function(){return c.a.createElement(i.a,{basename:"/our-telepathy"},c.a.createElement(s.c,null,c.a.createElement(s.a,{path:"/team/:teamId/:userName"},c.a.createElement(_,null)),c.a.createElement(s.a,{path:"/"},c.a.createElement(ne,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},99:function(e,t,n){e.exports=n(144)}},[[99,1,2]]]);
//# sourceMappingURL=main.faed2369.chunk.js.map