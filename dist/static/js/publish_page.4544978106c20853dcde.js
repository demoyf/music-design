webpackJsonp([12],{"+VQI":function(t,e,s){"use strict";e.b=function(t="history",e){window.localStorage&&localStorage.setItem(t,e)},e.a=function(t="history"){if(window.localStorage)return localStorage.getItem(t)}},0:function(t,e){},"34KM":function(t,e){},"3SXa":function(t,e){},"6wEy":function(t,e){},EV1k:function(t,e,s){"use strict";var o=s("mvHQ"),i=s.n(o),n=s("VeaS"),a={name:"login-com",props:["loginType"],data:function(){return{type:this.loginType,is_login:!1,info:{username:"",password:"",second_password:"",code:""},is_manage:!1,mail_success:!1,code_success:!1,password_success:!1,second_password_success:!1,show_alert:!1,alert_msg:"123456",alert_color:"#FF7F50",login_result_msg:""}},components:{"my-alert":s("YLFo").a},methods:{close_me:function(){this.is_login=!1,this.$emit("close-login")},login:function(){var t=this;if("login"==this.loginType){if(this.check_email()&&this.check_password()){var e=this.info,s=n.a.check_user_info;this.$http.post(s,e).then(function(e){if(200==e.status){var s=e.body;if(s.success){var o=s.info;t.login_result_msg=o.nickname,setTimeout(function(){t.is_login=!0,setTimeout(function(){window.location.reload()},1500)},200),localStorage.setItem("current_user",i()(o))}else t.show_alert_tip(s.msg)}}).catch(function(){t.show_alert_tip("未知的错误发生了")})}}else if(this.check_email()&&this.check_code()&&this.check_password()&&this.check_second_password()){var o=n.a.add_user,a=this.info;this.$http.post(o,a).then(function(e){if(200==e.status){var s=e.body;if(s.success){var o=s.data;t.login_result_msg=o.nickname,setTimeout(function(){t.is_login=!0,setTimeout(function(){window.location.reload()},1500)},200),localStorage.setItem("current_user",i()(o))}else t.show_alert_tip(s.msg)}}).catch(function(){t.show_alert_tip("未知的错误发生了")})}},check_email:function(){var t=this.info.username;return/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(t)?(this.mail_success=!0,!0):(this.show_alert_tip("邮箱格式不正确"),!1)},check_password:function(){return this.info.password.length<6?(this.show_alert_tip("密码长度不少于6位"),!1):(this.password_success=!0,!0)},check_second_password:function(){var t=this.info;return t.password===t.second_password?(this.second_password_success=!0,!0):(this.show_alert_tip("两次输入的密码不一致"),!1)},check_code:function(){return this.info.code?(this.code_success=!0,!0):(this.show_alert_tip("验证码不能为空"),!1)},show_alert_tip:function(t,e){var s=this;t&&(this.alert_msg=t),e&&(this.alert_color=e),this.show_alert=!0,setTimeout(function(){s.show_alert=!1},1e3)}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"login-com"}},[s("div",{staticClass:"main-bg",on:{click:function(e){t.close_me()}}}),t._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"login-container",class:t.is_login?"start-animation":""},[t._m(0),t._v(" "),s("div",{staticClass:"user-name-container"},[s("label",[t._v("\n          账号：\n          "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.info.username,expression:"info.username"}],attrs:{type:"email",name:"user_name"},domProps:{value:t.info.username},on:{blur:function(e){t.check_email()},input:function(e){e.target.composing||t.$set(t.info,"username",e.target.value)}}})])]),t._v(" "),"login"!==t.loginType?s("div",{staticClass:"code-container"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.info.code,expression:"info.code"}],attrs:{type:"text",name:"code"},domProps:{value:t.info.code},on:{blur:function(e){t.check_code()},input:function(e){e.target.composing||t.$set(t.info,"code",e.target.value)}}}),t._v(" "),s("button",{attrs:{type:"button",name:"button"}},[t._v("获取验证码")])]):t._e(),t._v(" "),s("div",{staticClass:"password-container"},[s("label",[t._v("\n          密码：\n          "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.info.password,expression:"info.password"}],attrs:{type:"password",name:"password"},domProps:{value:t.info.password},on:{blur:function(e){t.check_password()},input:function(e){e.target.composing||t.$set(t.info,"password",e.target.value)}}})])]),t._v(" "),"login"!=t.loginType?s("div",{staticClass:"password-container"},[s("label",[t._v("\n          密码：\n          "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.info.second_password,expression:"info.second_password"}],attrs:{type:"password",name:"second_password"},domProps:{value:t.info.second_password},on:{blur:function(e){t.check_second_password()},input:function(e){e.target.composing||t.$set(t.info,"second_password",e.target.value)}}})])]):t._e(),t._v(" "),"login"==t.loginType?s("div",{staticClass:"check-container"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.is_manage,expression:"is_manage"}],staticClass:"chooseBtn",attrs:{type:"checkbox",name:"sex",id:"male"},domProps:{checked:Array.isArray(t.is_manage)?t._i(t.is_manage,null)>-1:t.is_manage},on:{change:function(e){var s=t.is_manage,o=e.target,i=!!o.checked;if(Array.isArray(s)){var n=t._i(s,null);o.checked?n<0&&(t.is_manage=s.concat([null])):n>-1&&(t.is_manage=s.slice(0,n).concat(s.slice(n+1)))}else t.is_manage=i}}}),t._v(" "),s("label",{staticClass:"choose-label",attrs:{for:"male"}}),t._v("\n        管理员登录选项\n      ")]):t._e(),t._v(" "),s("button",{staticClass:"login-button",attrs:{type:"button",name:"login"},on:{click:function(e){t.login()}}},[t._v(t._s("login"==t.loginType?"登录":"注册"))])]),t._v(" "),s("div",{staticClass:"login-msg",staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"}},[s("p",{staticStyle:{"margin-bottom":"1em","font-size":"1.2em"}},[t._v("亲爱的"+t._s(t.is_manage?"管理员":"用户"))]),t._v(" "),s("p",{staticStyle:{color:"#31c27c","margin-bottom":"1em"}},[t._v(t._s(t.login_result_msg))]),t._v(" "),s("p",[t._v(t._s("login"==t.loginType?"欢迎回来":"欢迎加入"))])])]),t._v(" "),s("my-alert",{attrs:{msg:t.alert_msg,"is-show":t.show_alert,"show-color":t.alert_color}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title-info"},[e("h2",[this._v("登 录")])])}]};var c=s("VU/8")(a,r,!1,function(t){s("RrvE")},"data-v-0eb5dd1f",null);e.a=c.exports},P10z:function(t,e,s){"use strict";var o={name:"to-top",data:function(){return{is_show:!1}},methods:{back_top:function(){var t=window.scrollY,e=Math.floor(t/300*20);this.is_show&&setTimeout(function s(){if(t-e<=0)return void window.scrollTo(0,0);window.scrollTo(0,t-e),console.log(t-e),t-=e,setTimeout(s,20)},20)}},mounted:function(){var t=this;document.body.onscroll=function(e){if(0==e.target.scrollingElement.scrollTop)t.is_show=!1;else{if(t.is_show)return;t.is_show=!0}}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"to-top"}},[s("div",{staticClass:"container",class:t.is_show?"show-top":"",on:{click:function(e){t.back_top()}}},[s("i",{staticClass:"icon-chevron-up"})])])},staticRenderFns:[]};var n=s("VU/8")(o,i,!1,function(t){s("3SXa")},"data-v-3fb549ce",null);e.a=n.exports},RrvE:function(t,e){},S6Sm:function(t,e,s){"use strict";const o="http://106.14.13.178:3000/",i="http://106.14.13.178:3000/";e.a={search_suggestion:o+"search/suggesstion/",search_all:o+"search/all/",billboard:o+"billboard/",get_new_song:o+"song/new_song/",get_song_by_id:o+"song/get_song/",get_artist_song_lsit:o+"song/song_list/",get_hot_artsit:o+"artist/hot_artist/",get_artist_by_id:o+"artist/get_artist/",get_new_album:o+"album/new_album/",get_album_info:o+"album/album_info/",get_artist_album:o+"album/artist_album/",forum_url:i+"forum/publish",user_info_url:i+"user/info/",get_time_forum:i+"forum/time_forum/",get_hot_forum:i+"forum/hot_forum/",get_type_time_forum:i+"forum/type_time/",get_type_hot_forum:i+"forum/type_comment/",get_search_forum:i+"forum/search/",report_user:i+"user/report/",report_tag:i+"forum/report/",delete_forum:i+"user/ban_forum/",delete_user:i+"user/ban/",forum_content_url:i+"forum/forum_content/",publish_comment:i+"comment/publish_comment/",get_comment_url:i+"comment/get_comment/",delete_comment:i+"comment/delete/",update_user_picture:i+"user/update_img/",update_user_info:i+"user/update_info/",collect_url:i+"user/add_collect/",get_collect:i+"user/collect/",get_my_forum:i+"forum/my_forum/",get_my_comment:i+"comment/my_comment/",get_report_comment:i+"forum/report_forum",has_new_url:i+"user/has_new/",delete_new_url:i+"user/update_new/",all_user:i+"user/all",all_comment:i+"comment/all"}},VeaS:function(t,e,s){"use strict";var o="http://106.14.13.178:3000/",i="http://106.14.13.178:3000/";e.a={search_suggestion:o+"search/suggesstion/",search_all:o+"search/all/",billboard:o+"billboard/",get_new_song:o+"song/new_song/",get_song_by_id:o+"song/get_song/",get_artist_song_lsit:o+"song/song_list/",get_hot_artsit:o+"artist/hot_artist/",get_artist_by_id:o+"artist/get_artist/",get_new_album:o+"album/new_album/",get_album_info:o+"album/album_info/",get_artist_album:o+"album/artist_album/",check_user_info:i+"user/check",add_user:i+"user/reg",has_new_url:i+"user/has_new/"}},XJAf:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("7+uW"),i=s("pFYg"),n=s.n(i),a=s("S6Sm"),r=(s("+VQI"),s("ZZh2"),s("ve3d")),c=s("P10z"),l=s("Eq4a"),_=s.n(l),u={name:"editor-xyf",data:function(){return{editor:void 0}},mounted:function(){this.editor=new _.a("#editor_toolbar","#editor_area");var t=this.editor;t.customConfig.uploadImgServer="http://106.14.13.178:3000/img/upload",t.customConfig.uploadFileName="img",t.customConfig.uploadImgHeaders={Accept:"text/x-json"},t.customConfig.uploadImgHooks={before:function(t,e,s){},success:function(t,e,s){},fail:function(t,e,s){},error:function(t,e){},timeout:function(t,e){},customInsert:function(t,e,s){t(e.data[0])}};var e=this;t.customConfig.onchange=function(s){var o=t.txt.text();e.$emit("changeinput",o,s)},t.customConfig.zIndex=10,t.create()},methods:{save_data:function(){}}},m={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"editor-xyf"},[e("div",{staticClass:"toolbar",staticStyle:{width:"1100px",border:"1px solid #ccc","background-color":"#f1f1f1",padding:"5px","margin-bottom":"1px"},attrs:{id:"editor_toolbar"}}),this._v(" "),e("div",{staticClass:"text",staticStyle:{width:"1100px",height:"400px",border:"1px solid #ccc"},attrs:{id:"editor_area"}})])}]};var h=s("VU/8")(u,m,!1,function(t){s("jt3Y")},null,null).exports,p=s("YLFo"),f={name:"App",data:function(){return{current_value:"",editor_setting:{height:400},publish_info:{title:"",type:1,content:"",info:{}},has_storage:!1,type:0,show_alert:!1,alert_msg:"123456",alert_color:"#FF7F50",login_result_msg:"",current_text:"",current_html:"",is_publish:!1,user_info:void 0}},methods:{show_alert_tip:function(t,e){var s=this;t&&(this.alert_msg=t),e&&(this.alert_color=e),this.show_alert=!0,setTimeout(function(){s.show_alert=!1},1e3)},check_isnull:function(){return""!=this.publish_info.title||(this.show_alert_tip("标题不能为空"),!1)},check_textarea:function(){return""!=this.current_text||(this.show_alert_tip("正文内容不能为空"),!1)},my_change_text:function(t,e){this.current_text=t,this.current_html=e},publish_forum:function(){var t=this;if(this.is_publish)this.show_alert_tip("上传数据中....");else{var e=localStorage.getItem("current_user");if("object"!=(void 0===e?"undefined":n()(e))&&""!=e){if(this.check_isnull&&this.check_textarea){var s=this.publish_info;s.title=s.title.replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/\&/gi,"&amp;"),s.content=this.current_html,s.type=this.type,s.user_id=this.user_info._id,s.user_name=this.user_info.nickname,s.user_picture=this.user_info.picture;var o=new Date;s.publish_time=o.getTime(),s.comment_count=0;var i=a.a.forum_url;this.$http.post(i,this.publish_info).then(function(e){if(200===e.status){var s=e.body;s.success?(localStorage.setItem("show_forum_current",s.id),window.location.href="/page/show_forum.html"):(t.is_publish=!1,t.show_alert_tip(s.msg))}}).catch(function(){t.is_publish=!1,t.show_alert_tip("发布失败")})}}else this.show_alert_tip("登录后才可以发表","#FF7F50")}}},created:function(){var t=localStorage.getItem("current_user");if(t&&""!==t){var e=JSON.parse(t);e.picture="http://106.14.13.178/icon/"+e.picture+".jpg",this.user_info=e}var s=localStorage.getItem("publish_artist");return s&&""!==s?(this.publish_info.info=JSON.parse(s),this.has_storage=!0,this.type=2,void localStorage.setItem("publish_artist","")):(s=localStorage.getItem("publish_music"))&&""!==s?(this.publish_info.info=JSON.parse(s),this.has_storage=!0,this.type=1,void localStorage.setItem("publish_music","")):(s=localStorage.getItem("publish_album"))&&""!==s?(this.publish_info.info=JSON.parse(s),this.has_storage=!0,this.type=3,void localStorage.setItem("publish_album","")):void 0},components:{"forum-header":r.a,"to-top":c.a,"my-editor":h,"my-alert":p.a}},g={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"App"}},[s("forum-header"),t._v(" "),s("div",{staticClass:"publish-container"},[s("div",{staticClass:"title container"},[s("h1",[t._v("标题")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.publish_info.title,expression:"publish_info.title"}],attrs:{type:"text",name:"title",placeholder:"输入你响亮的标题"},domProps:{value:t.publish_info.title},on:{blur:t.check_isnull,input:function(e){e.target.composing||t.$set(t.publish_info,"title",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"type container"},[t.has_storage?t._e():s("h1",[t._v("类型")]),t._v(" "),t.has_storage?s("h1",[t._v(t._s(1==t.type?"歌曲相关":"")+"\n                "+t._s(2==t.type?"歌手相关":"")+"\n                "+t._s(3==t.type?"专辑相关":""))]):t._e(),t._v(" "),t.has_storage?t._e():s("select",{directives:[{name:"model",rawName:"v-model",value:t.publish_info.type,expression:"publish_info.type"}],on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.publish_info,"type",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"1"}},[t._v("歌手相关")]),t._v(" "),s("option",{attrs:{value:"2"}},[t._v("歌曲相关")]),t._v(" "),s("option",{attrs:{value:"3"}},[t._v("专辑相关")])]),t._v(" "),t.has_storage?s("div",{staticClass:"storage-info"},[s("div",{staticClass:"img-container"},[s("img",{attrs:{src:t.publish_info.info.picture}})]),t._v(" "),s("p",[t._v(t._s(t.publish_info.info.name))])]):t._e()])]),t._v(" "),s("my-editor",{staticClass:"my-editor",attrs:{value:t.current_value,setting:t.editor_setting},on:{changeinput:t.my_change_text}}),t._v(" "),s("button",{staticClass:"publish-button",attrs:{type:"button",name:"button"},on:{click:t.publish_forum}},[t._v("发布")]),t._v(" "),s("to-top"),t._v(" "),s("my-alert",{attrs:{msg:t.alert_msg,"is-show":t.show_alert,"show-color":t.alert_color}})],1)},staticRenderFns:[]};var d=s("VU/8")(f,g,!1,function(t){s("6wEy")},"data-v-cbca09bc",null).exports,v=(s("34KM"),s("Mdbh"));o.a.use(v.a),new o.a({el:"#app",render:t=>t(d)})},YLFo:function(t,e,s){"use strict";var o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"my-alert"}},[e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.isShow,expression:"isShow"}],staticClass:"alert-container",style:{"background-color":this.showColor}},[this._v("\n      "+this._s(this.msg)+"\n    ")])])],1)},staticRenderFns:[]};var i=s("VU/8")({name:"my-alert",props:["msg","isShow","showColor"],data:function(){return{}}},o,!1,function(t){s("kByx")},"data-v-66b28a38",null);e.a=i.exports},ZZh2:function(t,e,s){"use strict";e.a={get_song_info:"current_song",get_album_info:"current_album",get_artist_id:"current_artist",get_ting_id:"current_ting",get_play_song_id:"play_song_id",get_has_paly_page:"has_paly_page",jump_album_info:"/page/album_info.html",jump_song_info:"/page/song_list.html",jump_artist_info:"/page/artist.html",jump_play_music:"/page/play_music.html"}},jt3Y:function(t,e){},kByx:function(t,e){},ve3d:function(t,e,s){"use strict";var o=s("EV1k"),i=s("S6Sm"),n={name:"forum-header",data:function(){return{show_login:!1,show_reg:!1,user_info:void 0,show_control:!1,has_new:!1}},created:function(){var t=this,e=localStorage.getItem("current_user");if(e&&""!==e){var s=JSON.parse(e);("number"==typeof s.picture||s.picture.indexOf("http")<0)&&(s.picture="http://106.14.13.178/icon/"+s.picture+".jpg"),this.user_info=s}if(this.user_info){var o=i.a.has_new_url+this.user_info._id;this.$http.get(o).then(function(e){200==e.status&&e.body.has_new&&(t.has_new=!0)})}document.addEventListener("click",function(e){t.show_control&&(t.show_control=!1)}),window.addEventListener("storage",function(t){"current_user"==t.key&&setTimeout(function(){window.location.reload()},800)})},components:{"login-com":o.a},methods:{to_manage:function(t,e){t.preventDefault(),t.stopPropagation(),window.location.href="/page/manage.html"},to_forum_page:function(t){localStorage.setItem("forum_sort",t),window.location.href="/page/forum_page.html"},to_show_login:function(){this.show_login=!0},my_close:function(){this.show_login&&(this.show_login=!1),this.show_reg&&(this.show_reg=!1)},start_reg:function(){this.show_reg=!0},show_user_control:function(t){this.show_control=!0,t.preventDefault(),t.stopPropagation()},login_out:function(t){localStorage.setItem("current_user",""),t.preventDefault(),t.stopPropagation(),window.location.reload()}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"header"}},[s("div",{staticClass:"link-container"},[s("a",{attrs:{href:"/"}},[t._v("音乐首页")]),t._v(" "),s("a",{attrs:{href:"/page/all_forum.html"}},[t._v("论坛首页")]),t._v(" "),s("a",{attrs:{href:"#"},on:{click:function(e){t.to_forum_page("hot")}}},[t._v("热门")]),t._v(" "),s("a",{attrs:{href:"#"},on:{click:function(e){t.to_forum_page("new")}}},[t._v("最新")])]),t._v(" "),t.user_info?t._e():s("div",{staticClass:"button-container"},[s("button",{staticClass:"login-button",on:{click:t.to_show_login}},[t._v(" 登录")]),t._v(" "),s("button",{staticClass:"register-button",on:{click:t.start_reg}},[t._v("注册")])]),t._v(" "),t.user_info?s("div",{staticClass:"user-info-container"},[t.has_new?s("div",{staticClass:"has-new"}):t._e(),t._v(" "),s("div",{staticClass:"user-icon",on:{click:t.show_user_control}},[s("img",{attrs:{src:t.user_info.picture,alt:""}})]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.show_control,expression:"show_control"}],staticClass:"user-control",class:t.show_control?"active":""},[s("div",{staticClass:"info"},[s("div",{staticClass:"img-container"},[s("img",{attrs:{src:t.user_info.picture,alt:""}})]),t._v(" "),s("p",[t._v(t._s(t.user_info.nickname))])]),t._v(" "),s("div",{staticClass:"manage-list"},[s("div",{staticClass:"personal-manage manage"},[s("p",{on:{click:function(e){t.to_manage(e,2)}}},[t._v("个人信息管理")]),t._v(" "),s("button",{attrs:{type:"button",name:"button"},on:{click:function(e){t.to_manage(e,2)}}},[t._v("进入")])]),t._v(" "),s("div",{staticClass:"forum-manage manage"},[s("p",{on:{click:function(e){t.to_manage(e,2)}}},[t._v("论坛管理")]),t._v(" "),s("button",{attrs:{type:"button",name:"button"},on:{click:function(e){t.to_manage(e,2)}}},[t._v("进入")])]),t._v(" "),t.user_info.is_manager?s("div",{staticClass:"forum-manage manage"},[t.has_new?s("div",{staticClass:"has-new"}):t._e(),t._v(" "),s("p",{on:{click:function(e){t.to_manage(e,2)}}},[t._v("数据管理")]),t._v(" "),s("button",{attrs:{type:"button",name:"button"},on:{click:function(e){t.to_manage(e,2)}}},[t._v("进入")])]):t._e(),t._v(" "),s("div",{staticClass:"manage"},[s("p"),t._v(" "),s("button",{attrs:{type:"button",name:"button"},on:{click:t.login_out}},[t._v("退出")])])])])]):t._e(),t._v(" "),s("transition",{attrs:{name:"fade-in"}},[s("login-com",{directives:[{name:"show",rawName:"v-show",value:t.show_login,expression:"show_login"}],attrs:{"login-type":"login"},on:{"close-login":t.my_close}})],1),t._v(" "),s("transition",{attrs:{name:"fade-in"}},[s("login-com",{directives:[{name:"show",rawName:"v-show",value:t.show_reg,expression:"show_reg"}],attrs:{"login-type":"reg"},on:{"close-login":t.my_close}})],1)],1)},staticRenderFns:[]};var r=s("VU/8")(n,a,!1,function(t){s("wNDD")},"data-v-43829c26",null);e.a=r.exports},wNDD:function(t,e){}},["XJAf"]);
//# sourceMappingURL=publish_page.4544978106c20853dcde.js.map