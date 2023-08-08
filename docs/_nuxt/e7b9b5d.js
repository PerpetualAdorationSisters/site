(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{222:function(e,t,r){"use strict";t.a={baseUrl:"https://perpetualadorationsisters.azurewebsites.net/api"}},292:function(e,t,r){"use strict";r.r(t);var n=r(110);var o=r(150),c=r(79);function d(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||Object(o.a)(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var l,v=r(16),w=r(6),h=(r(83),r(12),r(26),r(31),r(47),r(45),r(227)),m=r.n(h),_=r(222),f={data:function(){return{prayerRequests:void 0,password:void 0,passwordInput:void 0,isLoading:!0,errorMessage:"",passwordStorageKey:"password",isAuthenticated:void 0}},mounted:(l=Object(w.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.password=localStorage.getItem(this.passwordStorageKey),this.passwordInput=localStorage.getItem(this.passwordStorageKey),!this.password){e.next=5;break}return e.next=5,this.checkAuth();case 5:this.isLoading=!1;case 6:case"end":return e.stop()}}),e,this)}))),function(){return l.apply(this,arguments)}),methods:{checkAuth:function(){var e=this;return Object(w.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.isLoading=!0,e.errorMessage="",t.next=5,m.a.get("".concat(_.a.baseUrl,"/checkauth"),{headers:{PASSWORD:e.passwordInput}});case 5:return e.password=e.passwordInput,localStorage.setItem(e.passwordStorageKey,e.password),e.isAuthenticated=!0,t.next=10,e.loadRequests();case 10:e.isLoading=!1,t.next=17;break;case 13:t.prev=13,t.t0=t.catch(0),401===t.t0.response.status?(e.errorMessage="Incorrect password, please try again.",e.isAuthenticated=!1):e.errorMessage="Something went wrong, please try again shortly.",e.isLoading=!1;case 17:case"end":return t.stop()}}),t,null,[[0,13]])})))()},loadRequests:function(){var e=this;return Object(w.a)(regeneratorRuntime.mark((function t(){var r,n,o,c,l,w,h;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r=new Date,n=m.a.get("".concat(_.a.baseUrl,"/getprayerrequests?year=").concat(r.getFullYear(),"&month=").concat(r.getMonth()+1),{headers:{PASSWORD:e.password}}),o=m.a.get("".concat(_.a.baseUrl,"/getprayerrequests?year=").concat(r.getFullYear(),"&month=").concat(r.getMonth()),{headers:{PASSWORD:e.password}}),t.next=6,Promise.all([n,o]);case 6:c=t.sent,l=Object(v.a)(c,2),w=l[0],h=l[1],e.prayerRequests=[].concat(d(w.data),d(h.data)).slice(0,100),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(0),401===t.t0.response.status?(e.errorMessage="Incorrect password, please try again.",e.isAuthenticated=!1):t.t0.response.status>=500&&(e.errorMessage="Something went wrong, please try again shortly."),e.isLoading=!1;case 17:case"end":return t.stop()}}),t,null,[[0,13]])})))()},clearPassword:function(){this.password="",this.passwordInput="",localStorage.setItem(this.passwordStorageKey,""),this.isAuthenticated=!1}}},y=f,x=r(20),component=Object(x.a)(y,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"max-w-5xl p-4"},[r("div",{staticClass:"grid grid-cols-2 grid-flow-row"},[r("h1",{staticClass:"text-xl font-bold"},[e._v("Prayer Requests")]),e._v(" "),e.isAuthenticated?r("div",{staticClass:"flex justify-end"},[r("button",{staticClass:"p-2 border-2 bg-accent white font-bold text-white",attrs:{type:"button"},on:{click:e.clearPassword}},[e._v("Update\n        Password")])]):e._e()]),e._v(" "),e.isLoading?r("div",{staticClass:"mt-4 font-semibold"},[e._v("Loading...")]):e._e(),e._v(" "),e.errorMessage?r("div",{staticClass:"text-red-700 mt-4"},[e._v(e._s(e.errorMessage))]):e._e(),e._v(" "),e.password||e.isLoading?e._e():r("div",{staticClass:"mt-4"},[r("label",{staticClass:"py-2 mr-2"},[e._v("Password:")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordInput,expression:"passwordInput"}],staticClass:"p-2 border-2 mr-2",attrs:{type:"password"},domProps:{value:e.passwordInput},on:{input:function(t){t.target.composing||(e.passwordInput=t.target.value)}}}),e._v(" "),r("button",{staticClass:"p-2 border-2 bg-accent white font-bold text-white",attrs:{type:"button"},on:{click:e.checkAuth}},[e._v("Submit")])]),e._v(" "),e.isAuthenticated?r("div",e._l(e.prayerRequests,(function(t){return r("div",{key:t.CreatedDate,staticClass:"border-2 rounded-sm p-4 my-8"},[r("p",{staticClass:"text-xl font-bold"},[e._v(e._s(t.Subject))]),e._v(" "),r("p",{staticClass:"text-lg"},[e._v(e._s(t.Request))]),e._v(" "),r("p",{staticClass:"mt-4"},[e._v(e._s(t.Name))]),e._v(" "),r("p",[e._v(e._s(t.Email))]),e._v(" "),r("p",[e._v(e._s(new Date(t.CreatedDate).toLocaleDateString("en-US")))]),e._v(" "),t.RecipientName||t.RecipientAddress?r("div",{staticClass:"mt-4"},[r("div",{staticClass:"font-semibold"},[e._v("Recipient Details:")]),e._v(" "),t.RecipientName?r("p",[e._v("Name: "+e._s(t.RecipientName))]):e._e(),e._v(" "),t.RecipientAddress?r("p",[e._v("Address: "+e._s(t.RecipientAddress))]):e._e()]):e._e()])})),0):e._e()])}),[],!1,null,null,null);t.default=component.exports}}]);