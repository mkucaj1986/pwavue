(function(e){function t(t){for(var n,s,i=t[0],c=t[1],l=t[2],f=0,d=[];f<i.length;f++)s=i[f],o[s]&&d.push(o[s][0]),o[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(d.length)d.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,i=1;i<r.length;i++){var c=r[i];0!==o[c]&&(n=!1)}n&&(a.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},o={app:0},a=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var n=r("64a9"),o=r.n(n);o.a},"2b8b":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("5c96"),o=r.n(n),a=(r("0fae"),r("2b0e")),s=r("8c4f"),i=r("a391"),c=r.n(i),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":e.activeIndex,mode:"horizontal"}},[n("router-link",{attrs:{to:"/home"}},[e._v("Home")]),n("router-link",{attrs:{to:"/camera"}},[e._v("Camera")])],1),n("img",{attrs:{alt:"Vue logo",src:r("cf05")}}),n("keep-alive",[n("router-view")],1),n("ServiceWorker")],1)},u=[],f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span")},d=[],m={name:"ServiceWorker",methods:{registerServiceWorker:function(){var e=this;"serviceWorker"in navigator?"complete"===document.readyState?window.addEventListener("load",function(){e.register()}):this.register():console.log("Service workers aren't supported in this browser.")},register:function(){navigator.serviceWorker.register("/service-worker.js").then(function(e){console.log("Service workers Registration successfuly, scope is:",e.scope),navigator.serviceWorker.ready.then(function(e){return e.sync.register("myFirstSync")}).catch(function(e){"denied"===Notification.permission?console.log("Permission for Notifications was denied"):console.log("TODO ################################ Unable to subscribe to push.",e)})}).catch(function(e){console.log("Service worker registration failed, error:",e)})}},mounted:function(){this.registerServiceWorker()}},g=m,p=r("2877"),h=Object(p["a"])(g,f,d,!1,null,null,null),v=h.exports,w={name:"app",components:{ServiceWorker:v},data:function(){return{activeIndex:"1"}}},b=w,y=(r("034f"),Object(p["a"])(b,l,u,!1,null,null,null)),S=y.exports,k=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"camera-modal"},[r("video",{ref:"video",staticClass:"camera-stream"}),r("div",{staticClass:"camera-modal-container"},[r("el-button",{attrs:{type:"success"},on:{click:e.capture}},[r("i",{staticClass:"material-icons"},[e._v("Capture photo")])])],1),e._l(e.gallery,function(e,t){return r("div",{key:t},[r("img",{staticClass:"gallery-img",attrs:{id:"image",src:e.src,alt:"Capturing"}})])}),e.canSendImages?r("el-button",{attrs:{type:"success"},on:{click:e.sendImages}},[r("i",{staticClass:"material-icons"},[e._v("Send gallery images")])]):e._e()],2)},_=[],x=(r("6d67"),r("96cf"),r("3b8d")),I=r("bc3a"),O=r.n(I),j={data:function(){return{mediaStream:null,gallery:[],imgSrc:""}},mounted:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:navigator.mediaDevices.getUserMedia({video:!0}).then(function(e){t.mediaStream=e,t.$refs.video.srcObject=e,t.$refs.video.play()}).catch(function(e){return console.error("getUserMedia() error:",e)});case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),destroyed:function(){var e=this.mediaStream.getTracks();e.map(function(e){return e.stop()})},computed:{canSendImages:function(){return this.gallery.length}},methods:{capture:function(){var e=this,t=this.mediaStream.getVideoTracks()[0],r=new window.ImageCapture(t),n=document.querySelector("img");return r.takePhoto().then(function(t){n.src=URL.createObjectURL(t),e.gallery.push({src:n.src})})},sendImages:function(){var e=this,t=this.gallery;O.a.post("https://www.mocky.io/v2/5c6d101d3700001119fa31a8",{body:t}).then(function(t){e.$message({message:"Your data was successfully sent",type:"success"})}).catch(function(t){e.errors.push(t)})}}},C=j,W=(r("6717"),Object(p["a"])(C,k,_,!1,null,"7dc883d4",null)),E=W.exports,L=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"hello"},[e.onlineStatus?r("p",[e._v("This part will be visible only if user is online")]):e._e(),e.onlineStatus?e._e():r("p",[e._v("This part will be visible only if user is offline")]),e._v("\n    "+e._s(e.onlineStatusMsg)+"\n    "),r("el-button",{attrs:{type:"primary"},on:{click:e.openUserDialog}},[e._v("SEND USER DATA")]),r("el-dialog",{attrs:{title:"Outer Dialog",visible:e.outerVisible},on:{"update:visible":function(t){e.outerVisible=t}}},[e.onlineStatus?r("el-tag",{attrs:{type:"success"}},[e._v("You seem to be online.")]):e._e(),e.onlineStatus?e._e():r("el-tag",{attrs:{type:"danger"}},[e._v("You seem to be offline. Your data will be save successfully Connect to send")]),r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[r("el-form-item",{attrs:{label:"Username",prop:"username"}},[r("el-input",{attrs:{placeholder:"Username"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),r("p",[e._v("Username is: "+e._s(e.form.username))]),r("el-form-item",{attrs:{label:"Age",prop:"age"}},[r("el-input",{attrs:{placeholder:"Age"},model:{value:e.form.age,callback:function(t){e.$set(e.form,"age",t)},expression:"form.age"}})],1),r("p",[e._v("Age is: "+e._s(e.form.age))]),r("el-form-item",{attrs:{label:"Sex",prop:"sex"}},[r("el-radio-group",{model:{value:e.form.sex,callback:function(t){e.$set(e.form,"sex",t)},expression:"form.sex"}},[r("el-radio",{attrs:{label:"Male"}}),r("el-radio",{attrs:{label:"Female"}})],1)],1),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.sendUserData("form")}}},[e._v("SEND")])],1)],1),r("el-row",[r("span",[e._v("\n            We're now using\n            "),r("a",{attrs:{href:"https://onesignal.com/"}},[e._v("OneSignal")]),e._v(" for notifications such as Event start/end alert.\n        ")]),r("el-button",{on:{click:e.handleSubscribe}},[e._v("Subscribe")])],1)],1)},T=[],$={name:"HelloWorld",components:{ServiceWorker:v},data:function(){return{onlineStatus:null,photo:null,dataReadyToSent:!1,onlineStatusMsg:"",form:{age:window.localStorage.getItem("age"),username:window.localStorage.getItem("username"),sex:window.localStorage.getItem("sex")},rules:{age:[{required:!0,message:"Please input your Age",trigger:"blur"}],username:[{required:!0,message:"Please input your Name",trigger:"change"}],sex:[{required:!0,message:"Please choice your sex",trigger:"change"}]},outerVisible:!1}},props:{msg:String},mounted:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.localStorageSupport(),window.addEventListener("load",function(){t.checkWifi(),window.addEventListener("sync",t.backgroundSync),window.addEventListener("online",t.checkWifi),window.addEventListener("offline",t.checkWifi)});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),beforeDestroy:function(){window.removeEventListener("sync",this.backgroundSync),window.removeEventListener("online",this.checkWifi),window.removeEventListener("offline",this.checkWifi)},methods:{loadCameraIds:function(e){this.deviceId=e[0].deviceId},backgroundSync:function(e){"myFirstSync"==e.tag&&this.onlineStatus&&this.dataReadyToSent&&this.makeAjaxCall()},checkWifi:function(){this.onlineStatus=!!navigator.onLine,this.onlineStatusMsg=navigator.onLine?"My network is fine":"I am offline",this.onlineStatus&&this.dataReadyToSent&&this.makeAjaxCall(),navigator.onLine?this.$message({message:"My network is fine",type:"success"}):this.$message.error("You seem to be offline. Connect to send user data")},sendUserData:function(e){var t=this;window.localStorage&&this.$refs[e].validate(function(e){return!!e&&(t.onlineStatus?t.makeAjaxCall():t.saveToLocalStorage())})},openUserDialog:function(){this.outerVisible=!0},makeAjaxCall:function(){var e=this,t={username:this.username||window.localStorage.getItem("username"),age:this.age||window.localStorage.getItem("age"),sex:this.sex||window.localStorage.getItem("sex")};O.a.post("https://www.mocky.io/v2/5c6d101d3700001119fa31a8",{body:t}).then(function(t){e.$message({message:"Your data was successfully sent",type:"success"}),e.clearStorage(),e.clearForm(),console.log(t)}).catch(function(t){e.errors.push(t)})},saveToLocalStorage:function(){window.localStorage.setItem("username",this.form.username),window.localStorage.setItem("age",this.form.age),window.localStorage.setItem("sex",this.form.sex),this.dataReadyToSent=!0,this.$message({message:"You seem to be offline, Your data save successfully Connect to send",type:"warning"}),this.clearForm(),navigator.serviceWorker.ready.then(function(e){e.sync.register("myFirstSync")})},localStorageSupport:function(){var e=!!window.localStorage;return e||this.$message.error("Local Storage not supported in browser"),e},clearStorage:function(){window.localStorage.removeItem("username"),window.localStorage.removeItem("age"),window.localStorage.removeItem("sex"),this.dataReadyToSent=!1},clearForm:function(){this.form.username="",this.form.age="",this.form.sex="",this.outerVisible=!1},handleSubscribe:function(){var e=window.OneSignal||[];e.registerForPushNotifications()},takePhoto:function(){}}},P=$,R=Object(p["a"])(P,L,T,!1,null,"fe2346a2",null),U=R.exports;a["default"].use(s["a"]),a["default"].use(o.a),a["default"].use(c.a);var M=[{path:"/home",component:U},{path:"/camera",component:E}],D=new s["a"]({routes:M,mode:"history"});a["default"].config.productionTip=!1;var A=document.getElementById("app");(function(){new a["default"]({el:A,router:D,render:function(e){return e(S)}})})()},"64a9":function(e,t,r){},6717:function(e,t,r){"use strict";var n=r("2b8b"),o=r.n(n);o.a},cf05:function(e,t,r){e.exports=r.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.33a32f66.js.map