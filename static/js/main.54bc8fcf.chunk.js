(this["webpackJsonpour-telepathy"]=this["webpackJsonpour-telepathy"]||[]).push([[0],{137:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(7),r=n.n(o),i=(n(97),n(40)),s=n(9),u=n(36),l=n(33),f=n.n(l),m=n(47),d=n(16);function h(e){var t=e.memberList,n=e.offerToMember,o=Object(a.useRef)();return c.a.createElement("ul",null,t.map((function(e){return c.a.createElement("li",{key:e.key,onDoubleClick:function(){n(e)}},c.a.createElement("p",null,e.id),c.a.createElement("p",null,e.name),c.a.createElement("video",{ref:o,onClick:(t=e.stream,void(t&&(o.current.srcObject=t,o.current.autoplay="autoplay")))}));var t})))}var p=n(77),g=n(78),k=n(79),v={key:"",id:"",team:"",name:""},b=new(function(){function e(){Object(p.a)(this,e),this.socket=Object(k.io)("https://flawless-psyche-307902.du.r.appspot.com")}return Object(g.a)(e,[{key:"join",value:function(e){v.id=e.id,v.team=e.team,v.name=e.name,this.socket.emit("join",e)}},{key:"onJoin",value:function(e,t){this.socket.on("myInfo",(function(e){v.key=e.key})),this.socket.on("userList",(function(t){t.forEach((function(t){console.log(t),e(t)}))})),this.socket.on("joinedUser",(function(t){console.log(t),e(t)})),this.socket.on("leavedUser",(function(e){t(e)}))}},{key:"offJoin",value:function(){this.socket.off("myInfo"),this.socket.off("userList"),this.socket.off("joinedUser"),this.socket.off("leavedUser")}},{key:"getMyInfo",value:function(){return v}},{key:"sendChatMessageToAll",value:function(e,t){this.socket.emit("chatMessageToAll",e,t)}},{key:"onChatMessage",value:function(e){this.socket.on("receiveChatMessage",e)}},{key:"onError",value:function(e){console.error(e)}},{key:"onMessageReceived",value:function(e){this.socket.on("receivePrivateMessage",e)}},{key:"offMessageReceived",value:function(){this.socket.off("receivePrivateMessage")}},{key:"sendMessageToUser",value:function(e,t,n){var a={id:v.id,key:v.key,type:e,message:n};this.socket.emit("privateMessage",t,a)}}]),e}()),y={pcList:{},stream:null},E={iceServers:[{url:"stun:34.64.112.126:3478"},{url:"turn:34.64.112.126:3478?transport=udp",credential:"dmdcjfdl",username:"ekim"}],DtlsSrtpKeyAgreement:!0};function j(){return O.apply(this,arguments)}function O(){return(O=Object(m.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!y.stream){e.next=2;break}return e.abrupt("return",y.stream);case 2:return e.next=4,navigator.mediaDevices.getUserMedia({video:!0,audio:!0});case 4:return y.stream=e.sent,e.abrupt("return",y.stream);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e){return new Promise((function(t,n){j().then((function(a){window.myStream=a;try{var c=new RTCPeerConnection(E);c.addStream(a),c.oniceconnectionstatechange=function(t){!function(e,t){console.log(e,t),console.log(y.pcList[e].connectionState),"connected"===y.pcList[e].connectionState&&console.log("connected")}(e,t)},y.pcList[e]=c,t(c)}catch(o){console.error(o),n(o)}}))}))}function M(e){console.error(e)}var S={getUserMedia:j,createOffer:function(e){return console.log("createOffer: "+e),new Promise((function(t,n){w(e).then((function(n){y.pcList[e].createOffer((function(a){y.pcList[e].setLocalDescription(a),t({pc:n,sessionDescription:a})}),M)})).catch((function(e){n(e)}))}))},createAnswer:function(e){return new Promise((function(t){"connected"!==y.pcList[e].connectionState&&y.pcList[e].createAnswer((function(n){y.pcList[e].setLocalDescription(n),t(n)}),M)}))},receiveOffer:function(e,t){if(console.log("receiveOffer: "+e),!y.pcList[e])return new Promise((function(n){w(e).then((function(e){e.setRemoteDescription(new RTCSessionDescription(t)),n(e)}))}))},receiveAnswer:function(e,t){y.pcList[e].setRemoteDescription(new RTCSessionDescription(t))},addIceCandidate:function(e,t){y.pcList[e]&&y.pcList[e].addIceCandidate(t)}};var C={getNewId:function(){return Math.round(99999999*Math.random())}},L=n(166),T=n(168);function I(e){var t=e.sendMessage,n=Object(a.useState)(""),o=Object(d.a)(n,2),r=o[0],i=o[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement(L.a,{value:r,onChange:function(e){i(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&(t(r),i((function(){return""})))}}),c.a.createElement(T.a,{onClick:function(){t(r),i((function(){return""}))}},"Send"))}function x(e){var t=e.chatList;return c.a.createElement("ul",null,t.map((function(e){return c.a.createElement("li",{key:e.key},c.a.createElement("p",null,e.name),c.a.createElement("p",null,e.message))})))}function A(e){var t=e.stream,n=Object(a.useRef)();return Object(a.useEffect)((function(){n.current.srcObject=t,n.current.autoplay="autoplay"}),[t]),c.a.createElement("video",{ref:n})}function R(){var e=Object(s.g)(),t=e.teamId,n=e.userName,o=Object(a.useState)({key:"",id:C.getNewId(),name:n,team:t}),r=Object(d.a)(o,2),l=r[0],p=(r[1],Object(a.useState)([])),g=Object(d.a)(p,2),k=g[0],v=g[1],y=Object(a.useState)([]),E=Object(d.a)(y,2),j=E[0],O=E[1],w=Object(a.useState)(null),M=Object(d.a)(w,2),L=M[0],R=M[1];function D(e){O((function(t){return[].concat(Object(u.a)(t),[e])}))}function N(e){O((function(t){return t.filter((function(t){return t.key!==e}))}))}function P(e){v((function(t){return[].concat(Object(u.a)(t),[e])}))}function U(e){switch(e.type){case"offer":S.receiveOffer(e.id,e.message).then((function(t){t.onicecandidate=function(t){B(e.key,t)},t.onaddstream=function(t){F(e.key,t)},t.onremovestream=J,S.createAnswer(e.id).then((function(t){b.sendMessageToUser("answer",e.key,t)}))}));break;case"answer":S.receiveAnswer(e.id,e.message);break;case"candidate":console.log("candidate"),console.log(e),S.addIceCandidate(e.id,e.message);break;default:console.log(e)}}function B(e,t){t.candidate&&b.sendMessageToUser("candidate",e,t.candidate)}function F(e,t){console.log("handleRemoteStreamAdded"),console.log(t.stream),window.remoteStream[e]=t.stream;var n=Object(u.a)(j).find((function(t){return t.key===e}));n&&(n.stream=t.stream,function(e){var t=Object(u.a)(j).findIndex((function(t){return t.key===e.key})),n=Object(u.a)(j);n[t]=e,O((function(){return n}))}(n))}function J(e){console.log(e)}return Object(a.useEffect)((function(){function e(){return(e=Object(m.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.getUserMedia();case 2:t=e.sent,console.log(t),R(t);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(a.useEffect)((function(){b.join(l)}),[]),Object(a.useEffect)((function(){return b.onJoin(D,N),function(){b.offJoin()}})),Object(a.useEffect)((function(){b.onChatMessage(P)}),[]),Object(a.useEffect)((function(){return b.onMessageReceived(U),function(){b.offMessageReceived()}})),c.a.createElement("div",null,c.a.createElement("p",null,t,"\ud300\uacfc \ud568\uaed8\ud558\ub294 \uc911"),c.a.createElement(i.b,{to:"/"},"\uccab \ud398\uc774\uc9c0\ub85c \uac00\uae30"),c.a.createElement(T.a,{onClick:function(){console.log(j)}},"MemberListCheck"),c.a.createElement(A,{stream:L}),c.a.createElement(h,{memberList:j,offerToMember:function(e){S.createOffer(e.id,e.key).then((function(t){var n=t.pc,a=t.sessionDescription;n.onicecandidate=function(t){B(e.key,t)},n.onaddstream=function(t){F(e.key,t)},n.onremovestream=J,b.sendMessageToUser("offer",e.key,a)}))}}),c.a.createElement(I,{sendMessage:function(e,t){!function(e){var t=b.getMyInfo();b.sendChatMessageToAll(t,e)}(e)}}),c.a.createElement(x,{chatList:k}))}window.remoteStream={};var D=n(165),N=n(167),P=Object(D.a)({home:{position:"absolute",display:"flex",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",flexDirection:"column",color:"#fff",background:"linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"},title:{height:"3rem",fontSize:"2rem"},startButton:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",color:"#fff",width:"200px",height:"50px",borderRadius:"30px",fontSize:"1.2rem"},joinButton:{fontSize:"1.2rem",color:"#fff"}});function U(){var e=P(),t=Object(s.f)(),n=Object(a.useState)(!1),o=Object(d.a)(n,2),r=o[0],i=o[1],u=Object(a.useState)(""),l=Object(d.a)(u,2),f=l[0],m=l[1],h=Object(a.useState)(""),p=Object(d.a)(h,2),g=p[0],k=p[1];function v(e){"Enter"===e.key&&(r?b():i(!0))}function b(){t.push("/team/".concat(f,"/").concat(g))}return c.a.createElement(N.a,{className:e.home},c.a.createElement("h2",{className:e.title},"T E L E P A T H Y"),c.a.createElement("h3",null,!r&&c.a.createElement(c.a.Fragment,null,c.a.createElement(L.a,{label:"MY NAME",className:e.joinTextField,onChange:function(e){k(e.target.value)},onKeyPress:v,required:!0}),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement(T.a,{className:e.startButton,onClick:function(){i(!0)}},"START")),r&&c.a.createElement("div",null,c.a.createElement(T.a,{className:e.joinButton,onClick:b},"JOIN THE"),c.a.createElement(L.a,{label:"TEAM",className:e.joinTextField,onChange:function(e){m(e.target.value)},onKeyPress:v}))))}var B=function(){return c.a.createElement(i.a,null,c.a.createElement(s.c,null,c.a.createElement(s.a,{path:"/team/:teamId/:userName"},c.a.createElement(R,null)),c.a.createElement(s.a,{path:"/"},c.a.createElement(U,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},92:function(e,t,n){e.exports=n(137)},97:function(e,t,n){}},[[92,1,2]]]);
//# sourceMappingURL=main.54bc8fcf.chunk.js.map