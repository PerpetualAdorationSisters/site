(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{222:function(e,t,r){"use strict";t.a={baseUrl:"https://perpetualadorationsisters.azurewebsites.net/api"}},292:function(e,t,r){"use strict";r.r(t);var n=r(110);var o=r(150),c=r(79);function d(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||Object(o.a)(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var l,h=r(16),w=r(6),v=(r(83),r(12),r(26),r(32),r(31),r(47),r(45),r(227)),m=r.n(v),_=r(222),f={data:function(){return{prayerRequests:void 0,password:void 0,passwordInput:void 0,isLoading:!0,errorMessage:"",passwordStorageKey:"password",isAuthenticated:void 0}},mounted:(l=Object(w.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.password=localStorage.getItem(this.passwordStorageKey),this.passwordInput=localStorage.getItem(this.passwordStorageKey),!this.password){e.next=5;break}return e.next=5,this.checkAuth();case 5:this.isLoading=!1;case 6:case"end":return e.stop()}}),e,this)}))),function(){return l.apply(this,arguments)}),methods:{checkAuth:function(){var e=this;return Object(w.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.isLoading=!0,e.errorMessage="",t.next=5,m.a.get("".concat(_.a.baseUrl,"/checkauth"),{headers:{PASSWORD:e.passwordInput}});case 5:return e.password=e.passwordInput,localStorage.setItem(e.passwordStorageKey,e.password),e.isAuthenticated=!0,t.next=10,e.loadRequests();case 10:e.isLoading=!1,t.next=17;break;case 13:t.prev=13,t.t0=t.catch(0),401===t.t0.response.status?(e.errorMessage="Incorrect password, please try again.",e.isAuthenticated=!1):e.errorMessage="Something went wrong, please try again shortly.",e.isLoading=!1;case 17:case"end":return t.stop()}}),t,null,[[0,13]])})))()},loadRequests:function(){var e=this;return Object(w.a)(regeneratorRuntime.mark((function t(){var r,n,o,c,l,w,v;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r=new Date,n=m.a.get("".concat(_.a.baseUrl,"/getprayerrequests?year=").concat(r.getFullYear(),"&month=").concat(r.getMonth()+1),{headers:{PASSWORD:e.password}}),o=m.a.get("".concat(_.a.baseUrl,"/getprayerrequests?year=").concat(r.getFullYear(),"&month=").concat(r.getMonth()),{headers:{PASSWORD:e.password}}),t.next=6,Promise.all([n,o]);case 6:c=t.sent,l=Object(h.a)(c,2),w=l[0],v=l[1],w.data.forEach((function(element){element.ShowDetails=!1})),v.data.forEach((function(element){element.ShowDetails=!1})),e.prayerRequests=[].concat(d(w.data),d(v.data)).slice(0,200),t.next=19;break;case 15:t.prev=15,t.t0=t.catch(0),401===t.t0.response.status?(e.errorMessage="Incorrect password, please try again.",e.isAuthenticated=!1):t.t0.response.status>=500&&(e.errorMessage="Something went wrong, please try again shortly."),e.isLoading=!1;case 19:case"end":return t.stop()}}),t,null,[[0,15]])})))()},completeRequest:function(e){var t=this;return Object(w.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,m.a.post("".concat(_.a.baseUrl,"/prayer-request/").concat(e.Id,"/complete"),null,{headers:{PASSWORD:t.password}});case 3:e.IsCompleted=!0,r.next=9;break;case 6:r.prev=6,r.t0=r.catch(0),alert("Error completing prayer request.");case 9:case"end":return r.stop()}}),r,null,[[0,6]])})))()},clearPassword:function(){this.password="",this.passwordInput="",localStorage.setItem(this.passwordStorageKey,""),this.isAuthenticated=!1}}},y=f,x=r(20),component=Object(x.a)(y,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"max-w-5xl p-4"},[r("div",{staticClass:"grid grid-cols-2 grid-flow-row"},[r("h1",{staticClass:"text-xl font-bold"},[e._v("\n      Prayer Requests\n    ")]),e._v(" "),e.isAuthenticated?r("div",{staticClass:"flex justify-end"},[r("button",{staticClass:"p-2 border-2 bg-accent white font-bold text-white",attrs:{type:"button"},on:{click:e.clearPassword}},[e._v("\n        Update Password\n      ")])]):e._e()]),e._v(" "),e.isLoading?r("div",{staticClass:"mt-4 font-semibold"},[e._v("\n    Loading...\n  ")]):e._e(),e._v(" "),e.errorMessage?r("div",{staticClass:"text-red-700 mt-4"},[e._v("\n    "+e._s(e.errorMessage)+"\n  ")]):e._e(),e._v(" "),e.password||e.isLoading?e._e():r("div",{staticClass:"mt-4"},[r("label",{staticClass:"py-2 mr-2"},[e._v("Password:")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordInput,expression:"passwordInput"}],staticClass:"p-2 border-2 mr-2",attrs:{type:"password"},domProps:{value:e.passwordInput},on:{input:function(t){t.target.composing||(e.passwordInput=t.target.value)}}}),e._v(" "),r("button",{staticClass:"p-2 border-2 bg-accent white font-bold text-white",attrs:{type:"button"},on:{click:e.checkAuth}},[e._v("\n      Submit\n    ")])]),e._v(" "),e.isAuthenticated?r("div",{staticClass:"mt-12"},e._l(e.prayerRequests,(function(t){return r("div",{key:t.Id,staticClass:"border-2 rounded-sm p-4 my-8"},[r("div",{staticClass:"flex center mb-4 mt-1 items-center"},[r("p",{staticClass:"text-xl font-bold flex-1"},[e._v("\n          "+e._s(t.Subject)+"\n          "),t.IsCompleted?r("span",{staticClass:"text-green-600 text-xl font-bold ml-2"},[e._v("(Request Completed)\n          ")]):e._e()]),e._v(" "),t.IsCompleted?r("button",{staticClass:"p-2 border-2 bg-accent white font-bold text-white",on:{click:function(e){t.ShowDetails=!t.ShowDetails}}},[e._v("\n          "+e._s(t.ShowDetails?"Hide":"Show")+" Details\n        ")]):r("button",{staticClass:"p-2 border-2 bg-green-600 white font-bold text-white",attrs:{type:"button"},on:{click:function(r){return e.completeRequest(t)}}},[e._v("\n          Mark Completed\n        ")])]),e._v(" "),!t.IsCompleted||t.ShowDetails?r("div",[r("p",{staticClass:"text-lg"},[e._v("\n          "+e._s(t.Request)+"\n        ")]),e._v(" "),r("p",{staticClass:"mt-4"},[e._v("\n          "+e._s(t.Name)+"\n        ")]),e._v(" "),r("p",[e._v(e._s(t.Email))]),e._v(" "),r("p",[e._v(e._s(new Date(t.CreatedDate).toLocaleDateString("en-US")))]),e._v(" "),t.RecipientName||t.RecipientAddress?r("div",{staticClass:"mt-4"},[r("div",{staticClass:"font-semibold"},[e._v("\n            Recipient Details:\n          ")]),e._v(" "),t.RecipientName?r("p",[e._v("\n            Name: "+e._s(t.RecipientName)+"\n          ")]):e._e(),e._v(" "),t.RecipientAddress?r("p",[e._v("\n            Address: "+e._s(t.RecipientAddress)+"\n          ")]):e._e()]):e._e()]):e._e()])})),0):e._e()])}),[],!1,null,null,null);t.default=component.exports}}]);