webpackJsonp([14],{198:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e(24),i=e.n(o),a=e(503),r=e.n(a),l=e(244),u=e(89),c=(e.n(u),e(486)),p=e.n(c),s=e(499),d=(e.n(s),e(504)),h=e.n(d),f=e(137),m=(e.n(f),e(243));i.a.component("SIdentify",h.a),i.a.use(p.a),window.axios=e(89),window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",i.a.prototype.$http=window.axios,i.a.prototype.$api=m.a,new i.a({router:l.a,render:function(t){return t(r.a)}}).$mount("#app")},242:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"SIdentify",props:{identifyCode:{type:String,default:"1234"},fontSizeMin:{type:Number,default:16},fontSizeMax:{type:Number,default:40},backgroundColorMin:{type:Number,default:180},backgroundColorMax:{type:Number,default:240},colorMin:{type:Number,default:50},colorMax:{type:Number,default:160},lineColorMin:{type:Number,default:40},lineColorMax:{type:Number,default:180},dotColorMin:{type:Number,default:0},dotColorMax:{type:Number,default:255},contentWidth:{type:Number,default:112},contentHeight:{type:Number,default:38}},methods:{randomNum:function(t,n){return Math.floor(Math.random()*(n-t)+t)},randomColor:function(t,n){return"rgb("+this.randomNum(t,n)+","+this.randomNum(t,n)+","+this.randomNum(t,n)+")"},drawPic:function(){var t=document.getElementById("s-canvas"),n=t.getContext("2d");n.textBaseline="bottom",n.fillStyle=this.randomColor(this.backgroundColorMin,this.backgroundColorMax),n.fillRect(0,0,this.contentWidth,this.contentHeight);for(var e=0;e<this.identifyCode.length;e++)this.drawText(n,this.identifyCode[e],e);this.drawLine(n),this.drawDot(n)},drawText:function(t,n,e){t.fillStyle=this.randomColor(this.colorMin,this.colorMax),t.font=this.randomNum(this.fontSizeMin,this.fontSizeMax)+"px SimHei";var o=(e+1)*(this.contentWidth/(this.identifyCode.length+1)),i=this.randomNum(this.fontSizeMax,this.contentHeight-5),a=this.randomNum(-45,45);t.translate(o,i),t.rotate(a*Math.PI/180),t.fillText(n,0,0),t.rotate(-a*Math.PI/180),t.translate(-o,-i)},drawLine:function(t){for(var n=0;n<8;n++)t.strokeStyle=this.randomColor(this.lineColorMin,this.lineColorMax),t.beginPath(),t.moveTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),t.lineTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),t.stroke()},drawDot:function(t){for(var n=0;n<100;n++)t.fillStyle=this.randomColor(0,255),t.beginPath(),t.arc(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight),1,0,2*Math.PI),t.fill()}},watch:{identifyCode:function(){this.drawPic()}},mounted:function(){this.drawPic()}}},243:function(t,n,e){"use strict";function o(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function i(t){for(var n in t)null===t[n]&&delete t[n],"string"===o(t[n])?t[n]=t[n].trim():"object"===o(t[n])?t[n]=i(t[n]):"array"===o(t[n])&&(t[n]=i(t[n]));return t}function a(t,n,e,o,a){e&&(e=i(e)),c({method:t,url:n,data:"POST"===t||"PUT"===t?e:null,params:"GET"===t||"DELETE"===t?e:null,baseURL:u,withCredentials:!1}).then(function(t){!0===t.data.success?(o&&o(t.data.data),o(t.data.data)):a?a(t.data):window.alert("error: "+l()(t.data))}).catch(function(t){var n=t.response;t&&window.alert("api error, HTTP CODE: "+n.status)})}var r=e(200),l=e.n(r),u="/api/",c=e(89);n.a={get:function(t,n,e,o){return a("GET",t,n,e,o)},post:function(t,n,e,o){return a("POST",t,n,e,o)},put:function(t,n,e,o){return a("PUT",t,n,e,o)},delete:function(t,n,e,o){return a("DELETE",t,n,e,o)}}},244:function(t,n,e){"use strict";var o=e(24),i=e.n(o),a=e(507);i.a.use(a.a),n.a=new a.a({routes:[{path:"/",redirect:"/login"},{path:"/analysis",component:function(t){return e.e(2).then(function(){var n=[e(511)];t.apply(null,n)}.bind(this)).catch(e.oe)},children:[{path:"/",component:function(t){return e.e(0).then(function(){var n=[e(201)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/upload",component:function(t){return e.e(1).then(function(){var n=[e(519)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/userCenter",component:function(t){return e.e(7).then(function(){var n=[e(520)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/modifyUser",component:function(t){return e.e(4).then(function(){var n=[e(518)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/starffManage",component:function(t){return e.e(5).then(function(){var n=[e(522)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/part",component:function(t){return e.e(6).then(function(){var n=[e(521)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/company",component:function(t){return e.e(3).then(function(){var n=[e(513)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/finance",component:function(t){return e.e(11).then(function(){var n=[e(514)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/addCompany",component:function(t){return e.e(12).then(function(){var n=[e(512)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/analysis",component:function(t){return e.e(0).then(function(){var n=[e(201)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/overtimeManage",component:function(t){return e.e(10).then(function(){var n=[e(515)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/updataPassword",component:function(t){return e.e(9).then(function(){var n=[e(516)];t.apply(null,n)}.bind(this)).catch(e.oe)}}]},{path:"/login",component:function(t){return e.e(8).then(function(){var n=[e(517)];t.apply(null,n)}.bind(this)).catch(e.oe)}}]})},478:function(t,n,e){n=t.exports=e(87)(!1),n.i(e(480),""),n.i(e(479),""),n.push([t.i,"",""])},479:function(t,n,e){n=t.exports=e(87)(!1),n.push([t.i,".header{background-color:#242f42}.login-wrap{background:#324157}.plugins-tips{background:#eef1f6}.el-upload--text em,.plugins-tips a{color:#20a0ff}.pure-button{background:#20a0ff}",""])},480:function(t,n,e){n=t.exports=e(87)(!1),n.push([t.i,"*{margin:0;padding:0}#app,.wrapper,body,html{width:100%;height:100%;overflow:hidden}body{font-family:Helvetica Neue,Helvetica,microsoft yahei,arial,STHeiTi,sans-serif;background-color:#f9f9f9}a{text-decoration:none}.content{background:none repeat scroll 0 0 #fff;position:absolute;left:250px;right:0;top:70px;bottom:0;width:auto;padding:40px;box-sizing:border-box;overflow-y:scroll}.crumbs{margin-bottom:20px}.pagination{margin:20px 0;text-align:right}.plugins-tips{padding:20px 10px;margin-bottom:20px}.el-button+.el-tooltip{margin-left:10px}.el-table tr:hover{background:#f6faff}.mgb20{margin-bottom:20px}.move-enter-active,.move-leave-active{transition:opacity .5s}.move-enter,.move-leave{opacity:0}.form-box{width:600px}.form-box .line{text-align:center}.el-time-panel__content:after,.el-time-panel__content:before{margin-top:-7px}.ms-doc .el-checkbox__input.is-disabled+.el-checkbox__label{color:#333;cursor:pointer}.pure-button{width:150px;height:40px;line-height:40px;text-align:center;color:#fff;border-radius:3px}.g-core-image-corp-container .info-aside{height:45px}.el-upload--text{background-color:#fff;border:1px dashed #d9d9d9;border-radius:6px;box-sizing:border-box;width:360px;height:180px;cursor:pointer;position:relative;overflow:hidden}.el-upload--text .el-icon-upload{font-size:67px;color:#97a8be;margin:40px 0 16px;line-height:50px}.el-upload--text{color:#97a8be;font-size:14px;text-align:center}.el-upload--text em{font-style:normal}.ql-container{min-height:400px}.ql-snow .ql-tooltip{transform:translateX(117.5px) translateY(10px)!important}.editor-btn{margin-top:20px}",""])},499:function(t,n){},503:function(t,n,e){e(508);var o=e(138)(null,e(506),null,null);t.exports=o.exports},504:function(t,n,e){var o=e(138)(e(242),e(505),null,null);t.exports=o.exports},505:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"s-canvas"},[e("canvas",{attrs:{id:"s-canvas",width:t.contentWidth,height:t.contentHeight}})])},staticRenderFns:[]}},506:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]}},508:function(t,n,e){var o=e(478);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(199)("4a280b39",o,!0)},510:function(t,n,e){e(137),t.exports=e(198)}},[510]);