webpackJsonp([9],{"/0Qb":function(t,s){},0:function(t,s){},"1bZd":function(t,s){},"34KM":function(t,s){},"3SXa":function(t,s){},"4Uwr":function(t,s,e){t.exports=e.p+"static/img/logo.397413d.jpg"},EV1k:function(t,s,e){"use strict";var n=e("mvHQ"),i=e.n(n),o=e("VeaS"),a={name:"login-com",props:["loginType"],data:function(){return{type:this.loginType,is_login:!1,info:{username:"",password:"",second_password:"",code:""},is_manage:!1,mail_success:!1,code_success:!1,password_success:!1,second_password_success:!1,show_alert:!1,alert_msg:"123456",alert_color:"#FF7F50",login_result_msg:""}},components:{"my-alert":e("YLFo").a},methods:{close_me:function(){this.is_login=!1,this.$emit("close-login")},login:function(){var t=this;if("login"==this.loginType){if(this.check_email()&&this.check_password()){var s=this.info,e=o.a.check_user_info;this.$http.post(e,s).then(function(s){if(200==s.status){var e=s.body;if(e.success){var n=e.info;t.login_result_msg=n.nickname,setTimeout(function(){t.is_login=!0,setTimeout(function(){window.location.reload()},1500)},200),localStorage.setItem("current_user",i()(n))}else t.show_alert_tip(e.msg)}}).catch(function(){t.show_alert_tip("未知的错误发生了")})}}else if(this.check_email()&&this.check_code()&&this.check_password()&&this.check_second_password()){var n=o.a.add_user,a=this.info;this.$http.post(n,a).then(function(s){if(200==s.status){var e=s.body;if(e.success){var n=e.data;t.login_result_msg=n.nickname,setTimeout(function(){t.is_login=!0,setTimeout(function(){window.location.reload()},1500)},200),localStorage.setItem("current_user",i()(n))}else t.show_alert_tip(e.msg)}}).catch(function(){t.show_alert_tip("未知的错误发生了")})}},check_email:function(){var t=this.info.username;return/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(t)?(this.mail_success=!0,!0):(this.show_alert_tip("邮箱格式不正确"),!1)},check_password:function(){return this.info.password.length<6?(this.show_alert_tip("密码长度不少于6位"),!1):(this.password_success=!0,!0)},check_second_password:function(){var t=this.info;return t.password===t.second_password?(this.second_password_success=!0,!0):(this.show_alert_tip("两次输入的密码不一致"),!1)},check_code:function(){return this.info.code?(this.code_success=!0,!0):(this.show_alert_tip("验证码不能为空"),!1)},show_alert_tip:function(t,s){var e=this;t&&(this.alert_msg=t),s&&(this.alert_color=s),this.show_alert=!0,setTimeout(function(){e.show_alert=!1},1e3)}}},r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"login-com"}},[e("div",{staticClass:"main-bg",on:{click:function(s){t.close_me()}}}),t._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"login-container",class:t.is_login?"start-animation":""},[t._m(0),t._v(" "),e("div",{staticClass:"user-name-container"},[e("label",[t._v("\n          账号：\n          "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.info.username,expression:"info.username"}],attrs:{type:"email",name:"user_name"},domProps:{value:t.info.username},on:{blur:function(s){t.check_email()},input:function(s){s.target.composing||t.$set(t.info,"username",s.target.value)}}})])]),t._v(" "),"login"!==t.loginType?e("div",{staticClass:"code-container"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.info.code,expression:"info.code"}],attrs:{type:"text",name:"code"},domProps:{value:t.info.code},on:{blur:function(s){t.check_code()},input:function(s){s.target.composing||t.$set(t.info,"code",s.target.value)}}}),t._v(" "),e("button",{attrs:{type:"button",name:"button"}},[t._v("获取验证码")])]):t._e(),t._v(" "),e("div",{staticClass:"password-container"},[e("label",[t._v("\n          密码：\n          "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.info.password,expression:"info.password"}],attrs:{type:"password",name:"password"},domProps:{value:t.info.password},on:{blur:function(s){t.check_password()},input:function(s){s.target.composing||t.$set(t.info,"password",s.target.value)}}})])]),t._v(" "),"login"!=t.loginType?e("div",{staticClass:"password-container"},[e("label",[t._v("\n          密码：\n          "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.info.second_password,expression:"info.second_password"}],attrs:{type:"password",name:"second_password"},domProps:{value:t.info.second_password},on:{blur:function(s){t.check_second_password()},input:function(s){s.target.composing||t.$set(t.info,"second_password",s.target.value)}}})])]):t._e(),t._v(" "),"login"==t.loginType?e("div",{staticClass:"check-container"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.is_manage,expression:"is_manage"}],staticClass:"chooseBtn",attrs:{type:"checkbox",name:"sex",id:"male"},domProps:{checked:Array.isArray(t.is_manage)?t._i(t.is_manage,null)>-1:t.is_manage},on:{change:function(s){var e=t.is_manage,n=s.target,i=!!n.checked;if(Array.isArray(e)){var o=t._i(e,null);n.checked?o<0&&(t.is_manage=e.concat([null])):o>-1&&(t.is_manage=e.slice(0,o).concat(e.slice(o+1)))}else t.is_manage=i}}}),t._v(" "),e("label",{staticClass:"choose-label",attrs:{for:"male"}}),t._v("\n        管理员登录选项\n      ")]):t._e(),t._v(" "),e("button",{staticClass:"login-button",attrs:{type:"button",name:"login"},on:{click:function(s){t.login()}}},[t._v(t._s("login"==t.loginType?"登录":"注册"))])]),t._v(" "),e("div",{staticClass:"login-msg",staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"}},[e("p",{staticStyle:{"margin-bottom":"1em","font-size":"1.2em"}},[t._v("亲爱的"+t._s(t.is_manage?"管理员":"用户"))]),t._v(" "),e("p",{staticStyle:{color:"#31c27c","margin-bottom":"1em"}},[t._v(t._s(t.login_result_msg))]),t._v(" "),e("p",[t._v(t._s("login"==t.loginType?"欢迎回来":"欢迎加入"))])])]),t._v(" "),e("my-alert",{attrs:{msg:t.alert_msg,"is-show":t.show_alert,"show-color":t.alert_color}})],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"title-info"},[s("h2",[this._v("登 录")])])}]};var c=e("VU/8")(a,r,!1,function(t){e("RrvE")},"data-v-0eb5dd1f",null);s.a=c.exports},I6Qg:function(t,s){},LTOM:function(t,s){},N0ar:function(t,s){},P10z:function(t,s,e){"use strict";var n={name:"to-top",data:function(){return{is_show:!1}},methods:{back_top:function(){var t=window.scrollY,s=Math.floor(t/300*20);this.is_show&&setTimeout(function e(){if(t-s<=0)return void window.scrollTo(0,0);window.scrollTo(0,t-s),console.log(t-s),t-=s,setTimeout(e,20)},20)}},mounted:function(){var t=this;document.body.onscroll=function(s){if(0==s.target.scrollingElement.scrollTop)t.is_show=!1;else{if(t.is_show)return;t.is_show=!0}}}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"to-top"}},[e("div",{staticClass:"container",class:t.is_show?"show-top":"",on:{click:function(s){t.back_top()}}},[e("i",{staticClass:"icon-chevron-up"})])])},staticRenderFns:[]};var o=e("VU/8")(n,i,!1,function(t){e("3SXa")},"data-v-3fb549ce",null);s.a=o.exports},"Rl+a":function(t,s){},RrvE:function(t,s){},S6Sm:function(t,s,e){"use strict";const n="http://106.14.13.178:3000/",i="http://106.14.13.178:3000/";s.a={search_suggestion:n+"search/suggesstion/",search_all:n+"search/all/",billboard:n+"billboard/",get_new_song:n+"song/new_song/",get_song_by_id:n+"song/get_song/",get_artist_song_lsit:n+"song/song_list/",get_hot_artsit:n+"artist/hot_artist/",get_artist_by_id:n+"artist/get_artist/",get_new_album:n+"album/new_album/",get_album_info:n+"album/album_info/",get_artist_album:n+"album/artist_album/",forum_url:i+"forum/publish",user_info_url:i+"user/info/",get_time_forum:i+"forum/time_forum/",get_hot_forum:i+"forum/hot_forum/",get_type_time_forum:i+"forum/type_time/",get_type_hot_forum:i+"forum/type_comment/",get_search_forum:i+"forum/search/",report_user:i+"user/report/",report_tag:i+"forum/report/",delete_forum:i+"user/ban_forum/",delete_user:i+"user/ban/",forum_content_url:i+"forum/forum_content/",publish_comment:i+"comment/publish_comment/",get_comment_url:i+"comment/get_comment/",delete_comment:i+"comment/delete/",update_user_picture:i+"user/update_img/",update_user_info:i+"user/update_info/",collect_url:i+"user/add_collect/",get_collect:i+"user/collect/",get_my_forum:i+"forum/my_forum/",get_my_comment:i+"comment/my_comment/",get_report_comment:i+"forum/report_forum",has_new_url:i+"user/has_new/",delete_new_url:i+"user/update_new/",all_user:i+"user/all",all_comment:i+"comment/all"}},VeaS:function(t,s,e){"use strict";var n="http://106.14.13.178:3000/",i="http://106.14.13.178:3000/";s.a={search_suggestion:n+"search/suggesstion/",search_all:n+"search/all/",billboard:n+"billboard/",get_new_song:n+"song/new_song/",get_song_by_id:n+"song/get_song/",get_artist_song_lsit:n+"song/song_list/",get_hot_artsit:n+"artist/hot_artist/",get_artist_by_id:n+"artist/get_artist/",get_new_album:n+"album/new_album/",get_album_info:n+"album/album_info/",get_artist_album:n+"album/artist_album/",check_user_info:i+"user/check",add_user:i+"user/reg",has_new_url:i+"user/has_new/"}},W5PA:function(t,s,e){"use strict";s.b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"history",s=arguments[1];window.localStorage&&localStorage.setItem(t,s)},s.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"history";if(window.localStorage)return localStorage.getItem(t)};var n=e("mvHQ");e.n(n)},YLFo:function(t,s,e){"use strict";var n={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"my-alert"}},[s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:this.isShow,expression:"isShow"}],staticClass:"alert-container",style:{"background-color":this.showColor}},[this._v("\n      "+this._s(this.msg)+"\n    ")])])],1)},staticRenderFns:[]};var i=e("VU/8")({name:"my-alert",props:["msg","isShow","showColor"],data:function(){return{}}},n,!1,function(t){e("kByx")},"data-v-66b28a38",null);s.a=i.exports},ZZh2:function(t,s,e){"use strict";s.a={get_song_info:"current_song",get_album_info:"current_album",get_artist_id:"current_artist",get_ting_id:"current_ting",get_play_song_id:"play_song_id",get_has_paly_page:"has_paly_page",jump_album_info:"/page/album_info.html",jump_song_info:"/page/song_list.html",jump_artist_info:"/page/artist.html",jump_play_music:"/page/play_music.html"}},bAbj:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e("7+uW"),i=e("hxP8"),o=e("mvHQ"),a=e.n(o),r=e("pFYg"),c=e.n(r),l=e("S6Sm"),_={name:"lrc-com",props:["lrcUrl"],data:function(){return{lrc_url:this.lrcUrl,lrc_text:"",is_show:!1}},created:function(){var t=this;console.log(this.lrc_url),this.$http.get(this.lrc_url).then(function(s){if(200===s.status){var e=s.bodyText;e=(e=(e=e.replace(/\[\d{2}:\d{2}\.\d{2}\]/gi,"")).replace(/\[\S*\]/gi,"")).trim(),t.lrc_text=e}})},methods:{expend:function(){var t=this.is_show;t?this.$refs.lrc_container.classList.remove("expend-lrc"):this.$refs.lrc_container.classList.add("expend-lrc"),this.is_show=!t}}},u={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"lrc-com"}},[s("div",{ref:"lrc_container",staticClass:"lrc-container"},[this._v("\n      "+this._s(this.lrc_text)+"\n    ")]),this._v(" "),s("span",{staticClass:"more-span",on:{click:this.expend}},[this._v("[展开]")])])},staticRenderFns:[]};var m=e("VU/8")(_,u,!1,function(t){e("N0ar")},"data-v-3239eff8",null).exports,h=e("kD5y"),d=e("W5PA"),f=e("ZZh2"),p=e("YLFo"),v={name:"play-music-info",data:function(){return{song_id:102723216,song_link:"",img_url:"/static/img/default.png",song_info:void 0,album_info:void 0,configObj:void 0,show_alert:!1,alert_msg:"123456",alert_color:"#FF7F50"}},created:function(){var t=this,s=d.a(f.a.get_song_info),e=l.a.get_song_by_id,n=l.a.get_album_info;e+=s,this.$http.get(e).then(function(s){if(200===s.status){var e=s.body;t.song_info=e.songinfo,t.img_url=e.songinfo.pic_premium;var i=t.song_info.album_id;if(i)return t.$http.get(n+i)}}).then(function(s){if(200===s.status){var e=s.body.albumInfo;t.album_info=e;var n=e.info;t.configObj={info:n,direction:"l",show_header:"专辑简介"}}}).catch(function(t){console.log("error")})},components:{"lrc-com":m,"more-span":h.a,"my-alert":p.a},methods:{show_alert_tip:function(t,s){var e=this;t&&(this.alert_msg=t),s&&(this.alert_color=s),this.show_alert=!0,setTimeout(function(){e.show_alert=!1},1e3)},collect_this:function(){var t=this,s=l.a.collect_url,e=localStorage.getItem("current_user");if("object"!=(void 0===e?"undefined":c()(e))&&""!=e){var n=this.song_info,i={user_id:JSON.parse(e)._id,title:n.title,is_ban:!1,song_id:n.song_id,picture:n.pic_big,type:1};this.$http.post(s,i).then(function(s){200==s.status&&(s.body.success?t.show_alert_tip("收藏成功","#31c27c"):t.show_alert_tip(s.body.msg,"#FF7F50"))}).catch(function(){t.show_alert_tip("添加失败","#FF7F50")})}else this.show_alert_tip("请先登录","#FF7F50")},to_publish:function(){var t=this.song_info,s={name:t.title,picture:t.pic_small,song_id:t.song_id};localStorage.setItem("publish_music",a()(s)),window.open("/page/publish_page.html")},to_url:function(t){d.b(f.a.get_album_info,t),window.location.href=f.a.jump_album_info},to_artist_url:function(t,s){d.b(f.a.get_artist_id,t),d.b(f.a.get_ting_id,s),window.location.href=f.a.jump_artist_info},to_play_url:function(t){d.b(f.a.get_play_song_id,t);var s=d.a(f.a.get_has_paly_page);"object"!=(void 0===s?"undefined":c()(s))&&0!=s||(d.b(f.a.get_has_paly_page,"1"),window.open(f.a.jump_play_music))},add_new_music:function(t){d.b("add_new_music",t);var s=d.a(f.a.get_has_paly_page);"object"!=(void 0===s?"undefined":c()(s))&&0!=s||(d.b(f.a.get_has_paly_page,"1"),window.open(f.a.jump_play_music))}}},g={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"play-music-info"}},[e("div",{staticClass:"all-info"},[e("div",{staticClass:"img-container"},[e("img",{attrs:{src:t.img_url}})]),t._v(" "),e("div",{staticClass:"info-container"},[e("h1",[t._v(t._s(t.song_info?t.song_info.title:""))]),t._v(" "),e("div",{staticClass:"icon-conatiner"},[e("i",{staticClass:"icon-user"}),t._v(" "),e("span",{staticClass:"artist-name",on:{click:function(s){t.to_artist_url(t.song_info.all_artist_id,t.song_info.all_artist_ting_uid)}}},[t._v(t._s(t.song_info?t.song_info.author:""))])]),t._v(" "),e("div",{staticClass:"other-info"},[e("div",{staticClass:"album-info one-part-info",attrs:{"data-albumid":t.song_info?t.song_info.album_id:""}},[t._v("\r\n          专辑：\r\n          "),e("span",{on:{click:function(s){t.to_url(t.song_info.album_id)}}},[t._v("\r\n            "+t._s(t.song_info?t.song_info.album_title:""))])]),t._v(" "),e("div",{staticClass:"company-info one-part-info"},[t._v("\r\n          发行公司：\r\n          "),e("span",[t._v(t._s(t.song_info?t.song_info.si_proxycompany:""))])])]),t._v(" "),e("div",{staticClass:"button-container"},[e("button",{staticClass:"music-play-button",attrs:{type:"button",name:"play-button"},on:{click:function(s){t.to_play_url(t.song_info.song_id)}}},[e("i",{staticClass:"icon-play-icon-1"}),t._v("播放")]),t._v(" "),e("button",{staticClass:"music-other-button",attrs:{type:"button",name:"coll-button"},on:{click:function(s){t.add_new_music(t.song_info.song_id)}}},[e("i",{staticClass:"icon-plus-square-icon",staticStyle:{"font-weight":"100"}}),t._v("\r\n          播放队列\r\n        ")]),t._v(" "),e("button",{staticClass:"music-other-button",attrs:{type:"button",name:"coll-button"},on:{click:t.collect_this}},[e("i",{staticClass:"icon-heart-icon"}),t._v("\r\n          收藏\r\n        ")]),t._v(" "),e("button",{staticClass:"music-other-button",attrs:{type:"button",name:"comment-button"},on:{click:t.to_publish}},[e("i",{staticClass:"icon-quill"}),t._v("\r\n          去讨论\r\n        ")])])])]),t._v(" "),e("div",{staticClass:"lrc-and-brief"},[null!=t.song_info?e("lrc-com",{attrs:{"lrc-url":t.song_info.lrclink}}):t._e(),t._v(" "),void 0!==t.album_info?e("div",{staticClass:"album-brief"},[e("h1",[t._v("简介")]),t._v(" "),e("p",{staticStyle:{"margin-bottom":".7em"}},[t._v(t._s(t.album_info.info))]),t._v(" "),e("more-span",{staticClass:"more-span-class",attrs:{"config-obj":t.configObj}}),t._v(" "),e("div",{staticClass:"album-img-container"},[e("h1",[t._v("所属专辑")]),t._v(" "),e("img",{staticStyle:{display:"block"},attrs:{src:t.album_info.pic_big}}),t._v(" "),e("h2",{staticStyle:{"margin-top":".3em","font-size":"1em",color:"#333"}},[t._v(t._s(t.album_info.title))]),t._v(" "),e("h3",{staticStyle:{"margin-top":".3em","font-size":".9em",color:"#999","margin-left":".1em"}},[t._v(t._s(t.album_info.publishtime))])])],1):t._e()],1),t._v(" "),e("my-alert",{attrs:{msg:t.alert_msg,"is-show":t.show_alert,"show-color":t.alert_color}})],1)},staticRenderFns:[]};var w=e("VU/8")(v,g,!1,function(t){e("1bZd")},"data-v-91166b14",null).exports,b=e("dQCR"),y=e("P10z"),C={name:"App",data:function(){return{}},components:{"header-com":i.a,"song-info-com":w,"my-footer":b.a,"to-top":y.a},created:function(){}},k={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"App"}},[s("header-com"),this._v(" "),s("song-info-com"),this._v(" "),s("my-footer"),this._v(" "),s("to-top")],1)},staticRenderFns:[]},$=e("VU/8")(C,k,!1,null,null,null).exports,x=(e("34KM"),e("Mdbh"));n.a.use(x.a),new n.a({el:"#app",render:t=>t($)})},dQCR:function(t,s,e){"use strict";var n=e("c/Tr"),i=e.n(n),o={0:{name:"我的个人博客哇",link:"http://xyf0412.oicp.io/",icon:"icon-quill"},1:{name:"书签和案例展示",link:"http://xyf0412.oicp.io/MarkerPage",icon:"icon-bookmarks"},2:{name:"我的github地址",link:"https://github.com/demoyf",icon:"icon-github"},length:3},a={name:"",data:function(){return{link_list:[]}},created:function(){this.link_list=i()(o)}},r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"footer"}},t._l(t.link_list,function(s){return e("a",{attrs:{href:s.link,target:"_blank"}},[e("div",{staticClass:"link-container"},[e("p",{staticClass:"name-container"},[t._v(t._s(s.name))]),t._v(" "),e("i",{staticClass:"my-link-icon",class:s.icon})])])}))},staticRenderFns:[]};var c=e("VU/8")(a,r,!1,function(t){e("I6Qg")},"data-v-7404eab6",null);s.a=c.exports},hxP8:function(t,s,e){"use strict";var n=e("VeaS"),i=e("W5PA"),o={name:"vue-search",data:function(){return{min_width:1310,middle_width:1410,current_width:0,search_content:"",is_search_now:!1,song_list:[],album_list:[],artist_list:[],search_history:[]}},mounted:function(){var t=this;t.current_width=document.body.clientWidth,window.onresize=function(){t.current_width=document.body.clientWidth}},watch:{current_width:function(t){var s=this.$refs.search_input.classList,e=this.$refs.input_container.classList;this.middle_width>=t?e.contains("input-center")||e.add("input-center"):e.contains("input-center")&&e.remove("input-center"),this.min_width>=t?(console.log(s.contains("input-small")),s.contains("input-small")||(s.add("input-small"),s.remove("input-large")),e.contains("input-center")&&e.remove("input-center")):s.contains("input-large")||(s.remove("input-small"),s.add("input-large")),this.current_width=t}},methods:{enter:function(){if(!(this.current_width>this.min_width)){var t=this.$refs.search_input.classList;t.contains("input-large")||(t.remove("input-small"),t.add("input-large")),this.$refs.search_result.classList.add("input-left"),this.$refs.input_container.classList.add("input-left");var s=this.$refs.search_result.classList;""===this.search_content||s.contains("show")||this.$refs.search_result.classList.add("show")}},leave:function(){if(!(this.current_width>this.min_width)){var t=this.$refs.search_input.classList;t.contains("input-small")||(t.remove("input-large"),t.add("input-small")),this.$refs.input_container.classList.remove("input-left"),this.$refs.search_result.classList.remove("input-left"),this.$refs.search_result.classList.remove("show")}},search_suggestion:function(){var t=this;if(!this.is_search_now){this.is_search_now=!0;var s=this.search_content;if(""===s)return void(this.is_search_now=!1);var e=n.a.search_suggestion+s;this.$http.get(e).then(function(s){if(200===s.status)if(s.body){var e=s.body;t.song_list=e.song.slice(0,4),t.artist_list=e.artist.slice(0,3),t.album_list=e.album.slice(0,3),t.$refs.search_result.classList.add("show"),t.is_search_now=!1}else t.is_search_now=!1,t.song_list=[],t.artist_list=[],t.album_list=[]}).catch(function(){t.is_search_now=!1})}},hide_result:function(){this.$refs.search_result.classList.remove("show")},show_result:function(){var t=this.$refs.search_result.classList;""===this.search_content||t.contains("show")||this.$refs.search_result.classList.add("show")},local_to_search_page:function(){""!==this.search_content&&(i.b("current_search",this.search_content),window.open("/page/search_result.html"))}}},a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"vue-search"},on:{mouseenter:function(s){t.enter()},mouseleave:function(s){t.leave()}}},[e("div",{ref:"input_container",staticClass:"input-container"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.search_content,expression:"search_content"}],ref:"search_input",staticClass:"search-input input-large",attrs:{placeholder:"歌曲名、歌手名、专辑名",type:"text",name:"search-input"},domProps:{value:t.search_content},on:{input:[function(s){s.target.composing||(t.search_content=s.target.value)},t.search_suggestion],blur:t.hide_result,focus:t.show_result,keyup:function(s){if(!("button"in s)&&t._k(s.keyCode,"enter",13,s.key))return null;t.local_to_search_page(s)}}}),t._v(" "),e("i",{staticClass:"icon-search-icon icon"})]),t._v(" "),e("div",{ref:"search_result",staticClass:"search-result"},[e("div",{staticClass:"result-item"},[t._m(0),t._v(" "),t._l(t.song_list,function(s){return e("span",{staticClass:"result-span"},[t._v("\n\t\t\t\t"+t._s(s.songname)),e("span",[t._v("- "+t._s(s.artistname))])])})],2),t._v(" "),e("div",{staticClass:"result-item"},[t._m(1),t._v(" "),t._l(t.artist_list,function(s){return e("span",{staticClass:"result-span"},[t._v("\n\t\t\t\t"+t._s(s.artistname)+"\n\t\t\t")])})],2),t._v(" "),e("div",{staticClass:"result-item"},[t._m(2),t._v(" "),t._l(t.album_list,function(s){return e("span",{staticClass:"result-span"},[t._v("\n\t\t\t\t"+t._s(s.albumname)),e("span",[t._v("- "+t._s(s.artistname))])])})],2)])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"icon-container"},[s("i",{staticClass:"icon-music-icon search-i"}),this._v(" "),s("span",[this._v("单曲")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"icon-container"},[s("i",{staticClass:"icon-music-icon search-i"}),this._v(" "),s("span",[this._v("歌手")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"icon-container"},[s("i",{staticClass:"icon-album-icon search-i"}),this._v(" "),s("span",[this._v("专辑")])])}]};var r={name:"music-header",props:["active"],data:function(){return{active_el:this.active,show_login:!1,show_reg:!1,user_info:void 0,show_control:!1,has_new:!1}},created:function(){var t=this,s=localStorage.getItem("current_user");if(s&&""!==s){var e=JSON.parse(s);("number"==typeof e.picture||e.picture.indexOf("http")<0)&&(e.picture="http://106.14.13.178/icon/"+e.picture+".jpg"),this.user_info=e}if(this.active_el||(this.active_el=1),this.user_info){var i=n.a.has_new_url+this.user_info._id;this.$http.get(i).then(function(s){200==s.status&&s.body.has_new&&(t.has_new=!0)})}window.addEventListener("storage",function(t){"current_user"==t.key&&setTimeout(function(){window.location.reload()},800)})},mounted:function(){var t=this;document.addEventListener("mousewheel",function(s){t.show_login&&(s.preventDefault(),s.stopPropagation())}),document.addEventListener("click",function(s){t.show_control&&(t.show_control=!1)})},methods:{show_l:function(){this.show_login=!0},to_manage:function(t,s){t.preventDefault(),t.stopPropagation(),window.location.href="/page/manage.html"},close_login:function(){this.show_login&&(this.show_login=!1),this.show_reg&&(this.show_reg=!1)},start_reg:function(){this.show_reg=!0},show_user_control:function(t){this.show_control=!0,t.preventDefault(),t.stopPropagation()},login_out:function(t){localStorage.setItem("current_user",""),t.preventDefault(),t.stopPropagation(),window.location.reload()}},compute:{},components:{"vue-search":e("VU/8")(o,a,!1,function(t){e("LTOM"),e("/0Qb")},null,null).exports,"login-com":e("EV1k").a}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"music-header"}},[e("div",{staticClass:"music-header-container"},[t._m(0),t._v(" "),e("div",{staticClass:"header-content"},[e("ul",{staticClass:"header-nav"},[e("li",[e("a",{class:{active:1==t.active_el},attrs:{href:"/"}},[t._v("\n        音乐馆\n        ")])]),t._v(" "),e("li",[e("a",{class:{active:2==t.active_el},attrs:{href:"/page/hot_artist.html"}},[t._v("\n        热门歌手\n        ")])]),t._v(" "),e("li",[e("a",{class:{active:3==t.active_el},attrs:{href:"/page/billboard.html"}},[t._v("\n        排行榜\n        ")])]),t._v(" "),e("li",[e("a",{class:{active:4==t.active_el},attrs:{href:"/page/all_forum.html"}},[t._v("\n        论坛\n        ")])])])]),t._v(" "),e("vue-search"),t._v(" "),t.user_info?t._e():e("div",{staticClass:"button-container"},[e("button",{staticClass:"login-button",on:{click:t.show_l}},[t._v(" 登录")]),t._v(" "),e("button",{staticClass:"register-button",on:{click:t.start_reg}},[t._v("注册")])]),t._v(" "),t.user_info?e("div",{staticClass:"user-info-container"},[t.has_new?e("div",{staticClass:"has-new"}):t._e(),t._v(" "),e("div",{staticClass:"user-icon",on:{click:t.show_user_control}},[e("img",{attrs:{src:t.user_info.picture,alt:""}})]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.show_control,expression:"show_control"}],staticClass:"user-control",class:t.show_control?"active":""},[e("div",{staticClass:"info"},[e("div",{staticClass:"img-container"},[e("img",{attrs:{src:t.user_info.picture,alt:""}})]),t._v(" "),e("p",[t._v(t._s(t.user_info.nickname))])]),t._v(" "),e("div",{staticClass:"manage-list"},[e("div",{staticClass:"personal-manage manage"},[e("p",{on:{click:function(s){t.to_manage(s,1)}}},[t._v("个人信息管理")]),t._v(" "),e("button",{attrs:{type:"button",name:"button"},on:{click:function(s){t.to_manage(s,1)}}},[t._v("进入")])]),t._v(" "),e("div",{staticClass:"forum-manage manage"},[e("p",{on:{click:function(s){t.to_manage(s,2)}}},[t._v("论坛管理")]),t._v(" "),e("button",{attrs:{type:"button",name:"button"},on:{click:function(s){t.to_manage(s,2)}}},[t._v("进入")])]),t._v(" "),t.user_info.is_manager?e("div",{staticClass:"forum-manage manage"},[t.has_new?e("div",{staticClass:"has-new"}):t._e(),t._v(" "),e("p",{on:{click:function(s){t.to_manage(s,3)}}},[t._v("数据管理")]),t._v(" "),e("button",{attrs:{type:"button",name:"button"},on:{click:function(s){t.to_manage(s,4)}}},[t._v("进入")])]):t._e(),t._v(" "),e("div",{staticClass:"manage"},[e("p"),t._v(" "),e("button",{attrs:{type:"button",name:"button"},on:{click:t.login_out}},[t._v("退出")])])])])]):t._e()],1),t._v(" "),e("transition",{attrs:{name:"fade-in"}},[e("login-com",{directives:[{name:"show",rawName:"v-show",value:t.show_login,expression:"show_login"}],attrs:{"login-type":"login"},on:{"close-login":t.close_login}})],1),t._v(" "),e("transition",{attrs:{name:"fade-in"}},[e("login-com",{directives:[{name:"show",rawName:"v-show",value:t.show_reg,expression:"show_reg"}],attrs:{"login-type":"reg"},on:{"close-login":t.close_login}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{staticClass:"header-head"},[s("a",{staticClass:"home-link",attrs:{href:"/"}},[s("img",{attrs:{src:e("4Uwr"),width:"170",height:"46"}})])])}]};var l=e("VU/8")(r,c,!1,function(t){e("Rl+a")},null,null);s.a=l.exports},kByx:function(t,s){},kD5y:function(t,s,e){"use strict";var n={name:"more-span",props:["configObj"],data:function(){return{config:this.configObj,is_show:!1}},mounted:function(){var t=this;(document.body||document.documentElement.body).addEventListener("click",function(s){var e=s.target.classList;e.contains("more-click")||e.contains("more-info-container")||e.contains("more-header")||e.contains("album-info")||t.is_show&&(t.is_show=!1)});this.$refs.more_span_ref.offsetTop,this.$refs.more_span_ref.offsetLeft;var s=this.configObj.direction||"l";"l"==s?this.$refs.pointer_ref.classList.add("left-pointer"):"t"==s&&(this.$refs.pointer_ref.classList.add("top-pointer"),this.$refs.more_info_container.classList.add("top-more-info"))},methods:{show_mod:function(){this.is_show||(this.is_show=!this.is_show)}}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"more-span"}},[e("span",{ref:"more_span_ref",staticClass:"more-click",on:{click:t.show_mod}},[t._v("[更多]")]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.is_show,expression:"is_show"}],ref:"more_info_container",staticClass:"more-info-container"},[e("div",{staticClass:"more-header"},[t._v("\n      "+t._s(t.config.show_header)+"\n    ")]),t._v(" "),e("div",{staticClass:"album-info"},[t._v("\n        "+t._s(t.config.info)+"\n    ")]),t._v(" "),e("div",{ref:"pointer_ref",staticClass:"pointer-icon"})])])},staticRenderFns:[]};var o=e("VU/8")(n,i,!1,function(t){e("msCZ")},"data-v-d254afec",null);s.a=o.exports},msCZ:function(t,s){}},["bAbj"]);
//# sourceMappingURL=song_list.554855a31fe5af27eede.js.map