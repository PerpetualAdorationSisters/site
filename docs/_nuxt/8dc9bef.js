(window.webpackJsonp=window.webpackJsonp||[]).push([[10,3],{222:function(e,t,r){"use strict";t.a={baseUrl:"https://perpetualadorationsisters.azurewebsites.net/api"}},223:function(e,t,r){var content=r(229);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(44).default)("312eb500",content,!0,{sourceMap:!1})},228:function(e,t,r){"use strict";r(223)},229:function(e,t,r){var n=r(43)((function(i){return i[1]}));n.push([e.i,"/*purgecss start ignore*/\n.text-input[data-v-22f85226]{\n  border:1px solid grey;\n  border-radius:2px;\n  width:90%;\n  padding:5px\n}\n\n/*purgecss end ignore*/",""]),n.locals={},e.exports=n},230:function(e,t,r){"use strict";r.r(t);var n=r(6),l=(r(45),r(115),r(25),r(46),r(166),r(227)),o=r.n(l),m=r(222),c={data:function(){return{prayerRequest:{name:"",email:"",subject:"",request:"",recipientName:"",recipientAddress:""},errMsg:"",submitSucceeded:!1,isSubmitting:!1}},methods:{submit:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,e.errMsg="",!((r=e.getValidationErrors())&&r.length>0)){t.next=6;break}return e.errMsg=r.join(", "),t.abrupt("return");case 6:return e.isSubmitting=!0,t.next=9,o.a.post("".concat(m.a.baseUrl,"/createprayerrequest"),e.prayerRequest);case 9:e.submitSucceeded=!0,e.isSubmitting=!1,t.next=17;break;case 13:t.prev=13,t.t0=t.catch(0),e.isSubmitting=!1,e.errMsg="Error: "+(null===(n=t.t0.response)||void 0===n?void 0:n.data);case 17:case"end":return t.stop()}}),t,null,[[0,13]])})))()},getValidationErrors:function(){var e=[];return this.prayerRequest.name||e.push("Name is required"),this.prayerRequest.email?this.prayerRequest.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)||e.push("Email is invalid"):e.push("Email is required"),this.prayerRequest.request||e.push("Prayer Request is required"),e}}},d=(r(228),r(20)),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("form",[r("h2",{staticClass:"text-primary text-xl font-semibold mb-4"},[e._v("Submit your prayer request")]),e._v(" "),r("div",[r("label",{attrs:{id:"name-label",for:"name"}},[e._v("Your Name (required)")]),e._v(" "),r("br"),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.prayerRequest.name,expression:"prayerRequest.name"}],staticClass:"text-input",attrs:{id:"name","aria-labelledby":"name-label",required:"",autofocus:"autofocus"},domProps:{value:e.prayerRequest.name},on:{input:function(t){t.target.composing||e.$set(e.prayerRequest,"name",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"mt-5"},[r("label",{attrs:{id:"email-label",for:"email"}},[e._v("Your Email (required)")]),e._v(" "),r("br"),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.prayerRequest.email,expression:"prayerRequest.email"}],staticClass:"text-input",attrs:{id:"email","aria-labelledby":"email-label",required:""},domProps:{value:e.prayerRequest.email},on:{input:function(t){t.target.composing||e.$set(e.prayerRequest,"email",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"mt-5"},[r("label",{attrs:{id:"subject-label",for:"subject"}},[e._v("Subject")]),e._v(" "),r("br"),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.prayerRequest.subject,expression:"prayerRequest.subject"}],staticClass:"text-input",attrs:{id:"subject","aria-labelledby":"subject-label"},domProps:{value:e.prayerRequest.subject},on:{input:function(t){t.target.composing||e.$set(e.prayerRequest,"subject",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"mt-5"},[r("label",{attrs:{id:"prayer-request-label",for:"prayer-request"}},[e._v("Your Prayer Request")]),e._v(" "),r("br"),e._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.prayerRequest.request,expression:"prayerRequest.request"}],staticClass:"text-input",attrs:{id:"prayer-request","aria-labelledby":"prayer-request-label",required:"",rows:"8"},domProps:{value:e.prayerRequest.request},on:{input:function(t){t.target.composing||e.$set(e.prayerRequest,"request",t.target.value)}}})]),e._v(" "),r("p",{staticClass:"my-4"},[e._v("\n    If you are offering this prayer request for someone else and would\n    like the Sisters to send them a postcard, please fill out the\n    following information.\n  ")]),e._v(" "),r("div",{staticClass:"mt-5"},[r("label",{attrs:{id:"recipient-name-label",for:"recipient-name"}},[e._v("Recipient's Name")]),e._v(" "),r("br"),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.prayerRequest.recipientName,expression:"prayerRequest.recipientName"}],staticClass:"text-input",attrs:{id:"recipient-name","aria-labelledby":"recipient-name-label"},domProps:{value:e.prayerRequest.recipientName},on:{input:function(t){t.target.composing||e.$set(e.prayerRequest,"recipientName",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"mt-5"},[r("label",{attrs:{id:"recipient-address-label",for:"recipient-address"}},[e._v("Recipient's Address")]),e._v(" "),r("br"),e._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.prayerRequest.recipientAddress,expression:"prayerRequest.recipientAddress"}],staticClass:"text-input",attrs:{id:"recipient-address","aria-labelledby":"recipient-address-label",rows:"4"},domProps:{value:e.prayerRequest.recipientAddress},on:{input:function(t){t.target.composing||e.$set(e.prayerRequest,"recipientAddress",t.target.value)}}})]),e._v(" "),e.errMsg?r("p",{staticClass:"mt-2 text-primary"},[e._v(e._s(e.errMsg))]):e._e(),e._v(" "),e.isSubmitting?r("p",{staticClass:"mt-2"},[e._v("Submitting...")]):e._e(),e._v(" "),e.submitSucceeded?r("p",{staticClass:"mt-2 text-green-700"},[e._v("Prayer request submitted. Thank you!")]):e._e(),e._v(" "),e.isSubmitting||e.submitSucceeded?e._e():r("button",{staticClass:"px-5 py-2 my-4 bg-blue-700 text-white rounded",attrs:{type:"button"},on:{click:e.submit}},[e._v("SEND")])])}),[],!1,null,"22f85226",null);t.default=component.exports},295:function(e,t,r){"use strict";r.r(t);var n={components:{PrayerRequest:r(230).default}},l=r(20),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"mb-5 grid grid-flow-col px-2"},[r("div",{staticClass:"col-span-full md:col-span-6 mr-0 md:mr-4"},[r("PrayerRequest")],1),e._v(" "),e._m(0)])])}),[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"col-span-full md:col-span-6 ml-0 md:ml-4 mt-5 md:mt-0"},[r("h2",{staticClass:"text-primary text-xl font-semibold mb-4"},[e._v("Mater Ecclesiae Monastery")]),e._v(" "),r("p",[e._v("\n        The Perpetual Adoration Sisters of the Blessed Sacrament invite you to\n        join them in their new home, Mater Ecclesiae Monastery. Visitors are\n        welcome to attend Holy Mass, spend time in personal prayer or pray\n        devotions in the chapel dedicated to Jesus the High Priest.\n      ")]),e._v(" "),r("p",{staticClass:"mt-5 font-semibold"},[e._v("Visiting Hours:")]),e._v(" "),r("p",{staticClass:"font-semibold"},[e._v("Daily from 9:00am-12:00pm & 4:00pm-6:00pm")]),e._v(" "),r("p",{staticClass:"mt-5 font-semibold"},[e._v("Gift Shop Hours:")]),e._v(" "),r("p",{staticClass:"font-semibold"},[e._v("Monday-Saturday 9:30am-5:30pm")]),e._v(" "),r("p",{staticClass:"mt-5 font-semibold"},[e._v("Holy Mass:")]),e._v(" "),r("p",{staticClass:"font-semibold"},[e._v("Monday through Saturday at 7:00am")]),e._v(" "),r("p",{staticClass:"italic"},[e._v("\n        Please note that as a full-time priest chaplain is not available to\n        serve the community, other parish responsibilities of the priests who\n        minister to the monastery may cause slight changes to this schedule.\n      ")]),e._v(" "),r("p",{staticClass:"mt-5 font-semibold"},[e._v("Adoration Chapel Hours:")]),e._v(" "),r("p",{staticClass:"font-semibold"},[e._v("Open to the public daily")]),e._v(" "),r("p",{staticClass:"font-semibold"},[e._v("6:00am-6:00pm")]),e._v(" "),r("p",{staticClass:"italic"},[e._v("The Blessed Sacrament will be exposed in the monstrance each day as duties within the monastery allow.")]),e._v(" "),r("p",{staticClass:"mt-5 font-semibold text-primary text-xl"},[e._v("Contact")]),e._v(" "),r("p",{staticClass:"mt-5 underline text-primary"},[r("a",{attrs:{href:"https://www.google.com/maps/place/707+W+4th+St,+Sioux+Falls,+SD+57104",target:"_blank"}},[e._v("\n          707 W. 4th Street, Sioux Falls, SD 57104\n          "),r("br"),e._v("On the Cathedral of Saint Joseph Campus\n        ")])]),e._v(" "),r("p",{staticClass:"mt-5 underline text-primary"},[r("a",{attrs:{href:"tel:6053362374"}},[e._v("(605) 336-2374")])])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{PrayerRequest:r(230).default})}}]);