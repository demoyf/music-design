webpackJsonp([10],{"/xpP":function(t,e){},0:function(t,e){},"34KM":function(t,e){},"3SXa":function(t,e){},"5FxE":function(t,e){},EV1k:function(t,e,s){"use strict";var n=s("mvHQ"),i=s.n(n),a=s("VeaS"),o={name:"login-com",props:["loginType"],data:function(){return{type:this.loginType,is_login:!1,info:{username:"",password:"",second_password:"",code:""},is_manage:!1,mail_success:!1,code_success:!1,password_success:!1,second_password_success:!1,show_alert:!1,alert_msg:"123456",alert_color:"#FF7F50",login_result_msg:""}},components:{"my-alert":s("YLFo").a},methods:{close_me:function(){this.is_login=!1,this.$emit("close-login")},login:function(){var t=this;if("login"==this.loginType){if(this.check_email()&&this.check_password()){var e=this.info,s=a.a.check_user_info;this.$http.post(s,e).then(function(e){if(200==e.status){var s=e.body;if(s.success){var n=s.info;t.login_result_msg=n.nickname,setTimeout(function(){t.is_login=!0,setTimeout(function(){window.location.reload()},1500)},200),localStorage.setItem("current_user",i()(n))}else t.show_alert_tip(s.msg)}}).catch(function(){t.show_alert_tip("未知的错误发生了")})}}else if(this.check_email()&&this.check_code()&&this.check_password()&&this.check_second_password()){var n=a.a.add_user,o=this.info;this.$http.post(n,o).then(function(e){if(200==e.status){var s=e.body;if(s.success){var n=s.data;t.login_result_msg=n.nickname,setTimeout(function(){t.is_login=!0,setTimeout(function(){window.location.reload()},1500)},200),localStorage.setItem("current_user",i()(n))}else t.show_alert_tip(s.msg)}}).catch(function(){t.show_alert_tip("未知的错误发生了")})}},check_email:function(){var t=this.info.username;return/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(t)?(this.mail_success=!0,!0):(this.show_alert_tip("邮箱格式不正确"),!1)},check_password:function(){return this.info.password.length<6?(this.show_alert_tip("密码长度不少于6位"),!1):(this.password_success=!0,!0)},check_second_password:function(){var t=this.info;return t.password===t.second_password?(this.second_password_success=!0,!0):(this.show_alert_tip("两次输入的密码不一致"),!1)},check_code:function(){return this.info.code?(this.code_success=!0,!0):(this.show_alert_tip("验证码不能为空"),!1)},show_alert_tip:function(t,e){var s=this;t&&(this.alert_msg=t),e&&(this.alert_color=e),this.show_alert=!0,setTimeout(function(){s.show_alert=!1},1e3)}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"login-com"}},[s("div",{staticClass:"main-bg",on:{click:function(e){t.close_me()}}}),t._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"login-container",class:t.is_login?"start-animation":""},[t._m(0),t._v(" "),s("div",{staticClass:"user-name-container"},[s("label",[t._v("\n          账号：\n          "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.info.username,expression:"info.username"}],attrs:{type:"email",name:"user_name"},domProps:{value:t.info.username},on:{blur:function(e){t.check_email()},input:function(e){e.target.composing||t.$set(t.info,"username",e.target.value)}}})])]),t._v(" "),"login"!==t.loginType?s("div",{staticClass:"code-container"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.info.code,expression:"info.code"}],attrs:{type:"text",name:"code"},domProps:{value:t.info.code},on:{blur:function(e){t.check_code()},input:function(e){e.target.composing||t.$set(t.info,"code",e.target.value)}}}),t._v(" "),s("button",{attrs:{type:"button",name:"button"}},[t._v("获取验证码")])]):t._e(),t._v(" "),s("div",{staticClass:"password-container"},[s("label",[t._v("\n          密码：\n          "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.info.password,expression:"info.password"}],attrs:{type:"password",name:"password"},domProps:{value:t.info.password},on:{blur:function(e){t.check_password()},input:function(e){e.target.composing||t.$set(t.info,"password",e.target.value)}}})])]),t._v(" "),"login"!=t.loginType?s("div",{staticClass:"password-container"},[s("label",[t._v("\n          密码：\n          "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.info.second_password,expression:"info.second_password"}],attrs:{type:"password",name:"second_password"},domProps:{value:t.info.second_password},on:{blur:function(e){t.check_second_password()},input:function(e){e.target.composing||t.$set(t.info,"second_password",e.target.value)}}})])]):t._e(),t._v(" "),"login"==t.loginType?s("div",{staticClass:"check-container"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.is_manage,expression:"is_manage"}],staticClass:"chooseBtn",attrs:{type:"checkbox",name:"sex",id:"male"},domProps:{checked:Array.isArray(t.is_manage)?t._i(t.is_manage,null)>-1:t.is_manage},on:{change:function(e){var s=t.is_manage,n=e.target,i=!!n.checked;if(Array.isArray(s)){var a=t._i(s,null);n.checked?a<0&&(t.is_manage=s.concat([null])):a>-1&&(t.is_manage=s.slice(0,a).concat(s.slice(a+1)))}else t.is_manage=i}}}),t._v(" "),s("label",{staticClass:"choose-label",attrs:{for:"male"}}),t._v("\n        管理员登录选项\n      ")]):t._e(),t._v(" "),s("button",{staticClass:"login-button",attrs:{type:"button",name:"login"},on:{click:function(e){t.login()}}},[t._v(t._s("login"==t.loginType?"登录":"注册"))])]),t._v(" "),s("div",{staticClass:"login-msg",staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"}},[s("p",{staticStyle:{"margin-bottom":"1em","font-size":"1.2em"}},[t._v("亲爱的"+t._s(t.is_manage?"管理员":"用户"))]),t._v(" "),s("p",{staticStyle:{color:"#31c27c","margin-bottom":"1em"}},[t._v(t._s(t.login_result_msg))]),t._v(" "),s("p",[t._v(t._s("login"==t.loginType?"欢迎回来":"欢迎加入"))])])]),t._v(" "),s("my-alert",{attrs:{msg:t.alert_msg,"is-show":t.show_alert,"show-color":t.alert_color}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title-info"},[e("h2",[this._v("登 录")])])}]};var c=s("VU/8")(o,r,!1,function(t){s("RrvE")},"data-v-0eb5dd1f",null);e.a=c.exports},I6Qg:function(t,e){},KI8g:function(t,e){},P10z:function(t,e,s){"use strict";var n={name:"to-top",data:function(){return{is_show:!1}},methods:{back_top:function(){var t=window.scrollY,e=Math.floor(t/300*20);this.is_show&&setTimeout(function s(){if(t-e<=0)return void window.scrollTo(0,0);window.scrollTo(0,t-e),console.log(t-e),t-=e,setTimeout(s,20)},20)}},mounted:function(){var t=this;document.body.onscroll=function(e){if(0==e.target.scrollingElement.scrollTop)t.is_show=!1;else{if(t.is_show)return;t.is_show=!0}}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"to-top"}},[s("div",{staticClass:"container",class:t.is_show?"show-top":"",on:{click:function(e){t.back_top()}}},[s("i",{staticClass:"icon-chevron-up"})])])},staticRenderFns:[]};var a=s("VU/8")(n,i,!1,function(t){s("3SXa")},"data-v-3fb549ce",null);e.a=a.exports},RrvE:function(t,e){},S6Sm:function(t,e,s){"use strict";const n="http://106.14.13.178:3000/",i="http://106.14.13.178:3000/";e.a={search_suggestion:n+"search/suggesstion/",search_all:n+"search/all/",billboard:n+"billboard/",get_new_song:n+"song/new_song/",get_song_by_id:n+"song/get_song/",get_artist_song_lsit:n+"song/song_list/",get_hot_artsit:n+"artist/hot_artist/",get_artist_by_id:n+"artist/get_artist/",get_new_album:n+"album/new_album/",get_album_info:n+"album/album_info/",get_artist_album:n+"album/artist_album/",forum_url:i+"forum/publish",user_info_url:i+"user/info/",get_time_forum:i+"forum/time_forum/",get_hot_forum:i+"forum/hot_forum/",get_type_time_forum:i+"forum/type_time/",get_type_hot_forum:i+"forum/type_comment/",get_search_forum:i+"forum/search/",report_user:i+"user/report/",report_tag:i+"forum/report/",delete_forum:i+"user/ban_forum/",delete_user:i+"user/ban/",forum_content_url:i+"forum/forum_content/",publish_comment:i+"comment/publish_comment/",get_comment_url:i+"comment/get_comment/",delete_comment:i+"comment/delete/",update_user_picture:i+"user/update_img/",update_user_info:i+"user/update_info/",collect_url:i+"user/add_collect/",get_collect:i+"user/collect/",get_my_forum:i+"forum/my_forum/",get_my_comment:i+"comment/my_comment/",get_report_comment:i+"forum/report_forum",has_new_url:i+"user/has_new/",delete_new_url:i+"user/update_new/",all_user:i+"user/all",all_comment:i+"comment/all"}},VeaS:function(t,e,s){"use strict";var n="http://106.14.13.178:3000/",i="http://106.14.13.178:3000/";e.a={search_suggestion:n+"search/suggesstion/",search_all:n+"search/all/",billboard:n+"billboard/",get_new_song:n+"song/new_song/",get_song_by_id:n+"song/get_song/",get_artist_song_lsit:n+"song/song_list/",get_hot_artsit:n+"artist/hot_artist/",get_artist_by_id:n+"artist/get_artist/",get_new_album:n+"album/new_album/",get_album_info:n+"album/album_info/",get_artist_album:n+"album/artist_album/",check_user_info:i+"user/check",add_user:i+"user/reg",has_new_url:i+"user/has_new/"}},YLFo:function(t,e,s){"use strict";var n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"my-alert"}},[e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.isShow,expression:"isShow"}],staticClass:"alert-container",style:{"background-color":this.showColor}},[this._v("\n      "+this._s(this.msg)+"\n    ")])])],1)},staticRenderFns:[]};var i=s("VU/8")({name:"my-alert",props:["msg","isShow","showColor"],data:function(){return{}}},n,!1,function(t){s("kByx")},"data-v-66b28a38",null);e.a=i.exports},YNfo:function(t,e){},ZZh2:function(t,e,s){"use strict";e.a={get_song_info:"current_song",get_album_info:"current_album",get_artist_id:"current_artist",get_ting_id:"current_ting",get_play_song_id:"play_song_id",get_has_paly_page:"has_paly_page",jump_album_info:"/page/album_info.html",jump_song_info:"/page/song_list.html",jump_artist_info:"/page/artist.html",jump_play_music:"/page/play_music.html"}},Zuyx:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),i=s("pFYg"),a=s.n(i),o=s("mvHQ"),r=s.n(o),c=s("S6Sm"),_=s("ve3d"),l=s("P10z"),u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"personal-manage"}},[s("h1",[t._v("修改个人信息")]),t._v(" "),s("div",{staticClass:"input-container"},[s("label",[t._v("昵称："),s("input",{directives:[{name:"model",rawName:"v-model",value:t.nickname,expression:"nickname"}],staticClass:"tag",attrs:{type:"text"},domProps:{value:t.nickname},on:{input:function(e){e.target.composing||(t.nickname=e.target.value)}}})]),t._v(" "),s("label",[t._v("个性签名："),s("input",{directives:[{name:"model",rawName:"v-model",value:t.personal_tag,expression:"personal_tag"}],attrs:{type:"text"},domProps:{value:t.personal_tag},on:{input:function(e){e.target.composing||(t.personal_tag=e.target.value)}}})]),t._v(" "),s("button",{attrs:{type:"button",name:"button"},on:{click:t.emit_change}},[t._v("修改")])])])},staticRenderFns:[]};var m=s("VU/8")({name:"personal-manage",props:["currentUser"],data:function(){return{nickname:"",personal_tag:""}},created:function(){this.nickname=this.currentUser.nickname,this.personal_tag=this.currentUser.personal_tag},methods:{emit_change:function(){this.$emit("infochange",this.nickname,this.personal_tag)}}},u,!1,function(t){s("YNfo")},"data-v-6f26ab09",null).exports,v=s("dQCR"),h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"choose-img"}},[s("div",{staticClass:"bg",on:{click:t.emit_close}}),t._v(" "),s("div",{staticClass:"content"},t._l(18,function(e){return s("div",{staticClass:"img-container",class:t.current==e?"active":"",on:{click:function(s){t.change_image(e)}}},[s("img",{attrs:{src:t._f("get_picture")(e),alt:""}})])})),t._v(" "),s("div",{staticClass:"footer"},[s("button",{staticClass:"sure-btn",attrs:{type:"button",name:"button"},on:{click:t.emit_success}},[t._v("确认")]),t._v(" "),s("button",{staticClass:"cancel-btn",attrs:{type:"button",name:"button"},on:{click:t.emit_close}},[t._v("取消")])])])},staticRenderFns:[]};var f=s("VU/8")({name:"choose-img",props:["currentIndex"],data:function(){return{current:this.currentIndex}},methods:{emit_close:function(){this.$emit("closechoose")},change_image:function(t){this.current=t},emit_success:function(){this.$emit("choosesuccess",this.current)}},filters:{get_picture:function(t){return"number"==typeof t||t.indexOf("http")<0?"http://106.14.13.178/icon/"+t+".jpg":t}}},h,!1,function(t){s("KI8g")},"data-v-244d0aa2",null).exports,p=s("YLFo"),d=s("ZZh2"),g={name:"collect-manage",props:["currentUser"],data:function(){return{current:1,collect_list:[]}},created:function(){var t=this,e=this.currentUser,s=c.a.get_collect+e._id;this.$http.get(s).then(function(e){200==e.status&&(t.collect_list=e.body)})},methods:{change_active:function(t){this.current=t},delete_collect:function(t,e){var s=this;setTimeout(function(){s.$emit("showtip","删除成功"),s.collect_list.splice(t,1)},400)},to_next_page:function(t){var e=this.collect_list[t];1==e.type?(localStorage.setItem(d.a.get_song_info,e.song_id),window.open("/page/song_list.html")):3==e.type?(localStorage.setItem(d.a.get_album_info,e.album_id),window.open(d.a.jump_album_info)):(localStorage.setItem(d.a.get_artist_id,e.artist_id),localStorage.setItem(d.a.get_ting_id,e._tingid),window.open(d.a.jump_artist_info))}}},w={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"collect-manage"}},[s("div",{staticClass:"content"},[s("div",{staticClass:"left"},[s("li",{class:1==t.current?"active":"",on:{click:function(e){t.change_active(1)}}},[t._v("收藏的歌曲")]),t._v(" "),s("li",{class:2==t.current?"active":"",on:{click:function(e){t.change_active(2)}}},[t._v("收藏的歌手")]),t._v(" "),s("li",{class:3==t.current?"active":"",on:{click:function(e){t.change_active(3)}}},[t._v("收藏的专辑")])]),t._v(" "),s("div",{staticClass:"right"},t._l(t.collect_list,function(e,n){return e.is_ban?t._e():s("div",{directives:[{name:"show",rawName:"v-show",value:e.type==t.current,expression:"item.type==current"}],staticClass:"collect-item"},[s("div",{staticClass:"img-container",on:{click:function(e){t.to_next_page(n)}}},[s("img",{attrs:{src:e.picture,alt:""}})]),t._v(" "),s("p",[t._v(t._s(e.title))]),t._v(" "),s("button",{attrs:{type:"button",name:"button"},on:{click:function(s){t.delete_collect(n,e._id)}}},[t._v("删除")])])}))])])},staticRenderFns:[]};var b=s("VU/8")(g,w,!1,function(t){s("/xpP")},"data-v-e1bbb07e",null).exports,C={name:"my-forum-manage",props:["currentUser"],data:function(){return{current:1,forum_list:[],comment_list:[],has_new:!1}},methods:{to_show_forum:function(t){localStorage.setItem("show_forum_current",t),window.open("/page/show_forum.html")},change_active:function(t){var e=this;if(this.current=t,3==t){var s=c.a.delete_new_url+this.currentUser._id;this.$http.get(s).then(function(t){200==t.status&&t.body.has_new&&(e.has_new=!1)})}},delete_info:function(t,e){var s=this,n=c.a.delete_forum+t+"/true";this.$http.get(n).then(function(t){200==t.status&&t.body.success&&(s.$emit("showtip","删除成功"),s.forum_list.splice(e,1))})},delete_comment:function(t){var e=this;setTimeout(function(){e.splice(t,1),e.$emit("showtip","删除成功")},500)}},created:function(){var t=this,e=c.a.get_my_forum,s=this.currentUser;e+=s._id,this.$http.get(e).then(function(e){200==e.status&&(t.forum_list=e.body)});var n=c.a.get_my_comment+s._id;if(this.$http.get(n).then(function(e){200==e.status&&(t.comment_list=e.body)}),this.currentUser){var i=c.a.has_new_url+this.currentUser._id;this.$http.get(i).then(function(e){200==e.status&&e.body.has_new&&(t.has_new=!0)})}},filters:{formatDateTime:function(t){var e=new Date(t),s=e.getFullYear(),n=e.getMonth()+1;n=n<10?"0"+n:n;var i=e.getDate();i=i<10?"0"+i:i;var a=e.getHours();a=a<10?"0"+a:a;var o=e.getMinutes(),r=e.getSeconds();return s+"-"+n+"-"+i+" "+a+":"+(o=o<10?"0"+o:o)+":"+(r=r<10?"0"+r:r)}}},y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"my-forum-manage"}},[s("div",{staticClass:"content"},[s("div",{staticClass:"left"},[s("li",{class:1==t.current?"active":"",on:{click:function(e){t.change_active(1)}}},[t._v("发布的贴子")]),t._v(" "),s("li",{class:2==t.current?"active":"",on:{click:function(e){t.change_active(2)}}},[t._v("发表的评论")]),t._v(" "),s("li",{class:3==t.current?"active":"",on:{click:function(e){t.change_active(3)}}},[t.has_new?s("div",{staticClass:"has-new"}):t._e(),t._v("\n        收到的评论\n      ")])]),t._v(" "),s("div",{staticClass:"right"},[s("div",{directives:[{name:"show",rawName:"v-show",value:1==t.current,expression:"current==1"}],staticClass:"forum-container"},[t._m(0),t._v(" "),t._l(t.forum_list,function(e,n){return e.is_ban?t._e():s("div",{staticClass:"a-forum part"},[s("p",{staticClass:"title",on:{click:function(s){t.to_show_forum(e._id)}}},[t._v(t._s(e.title))]),t._v(" "),s("p",{staticClass:"comment"},[t._v(t._s(e.comment_count))]),t._v(" "),s("div",{staticClass:"info"},[s("div",{staticClass:"img-container"},[s("img",{attrs:{src:e.info.picture,alt:""}})]),t._v(" "),s("p",{staticClass:"name"},[t._v(t._s(e.info.name))]),t._v(" "),s("p",[t._v(t._s(1==e.type?"歌曲相关":2==e.type?"歌手相关":"专辑相关"))])]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(t._f("formatDateTime")(e.publish_time)))]),t._v(" "),s("p",{staticClass:"delete-con"},[s("button",{attrs:{type:"button",name:"button"},on:{click:function(s){t.delete_info(e._id,n)}}},[t._v("删除")])])])})],2),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2==t.current,expression:"current==2"}],staticClass:"comment-container"},[t._m(1),t._v(" "),t._l(t.comment_list,function(e,n){return e.is_ban||e.my_id!=t.currentUser._id?t._e():s("div",{staticClass:"comment-part part"},[s("p",{staticClass:"title",on:{click:function(s){t.to_show_forum(e.forum_id)}}},[t._v(t._s(e.forum_title))]),t._v(" "),s("p",{staticClass:"comment"},[t._v(t._s(e.comment_content))]),t._v(" "),s("p",{staticClass:"reply"},[t._v(t._s(2==e.type?e.replay_to_user_name:"无"))]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(t._f("formatDateTime")(e.publish_time)))]),t._v(" "),s("p",{staticClass:"delete-con"},[s("button",{attrs:{type:"button",name:"button"},on:{click:function(e){t.delete_comment(n)}}},[t._v("删除")])])])})],2),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:3==t.current,expression:"current==3"}],staticClass:"comment-container"},[t._m(2),t._v(" "),t._l(t.comment_list,function(e){return!e.is_ban&&(e.user_id==t.currentUser._id&&1==e.type&&e.my_id!=t.currentUser._id||e.replay_to_user_id==t.currentUser._id&&2==e.type)?s("div",{staticClass:"comment-part part"},[s("p",{staticClass:"title",on:{click:function(s){t.to_show_forum(e.forum_id)}}},[t._v(t._s(e.forum_title))]),t._v(" "),s("p",{staticClass:"comment"},[t._v(t._s(2==e.type?e.reply_comment_content:e.comment_content))]),t._v(" "),s("p",{staticClass:"reply"},[t._v(t._s(e.my_name))]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(t._f("formatDateTime")(e.publish_time)))])]):t._e()})],2)])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header part"},[s("p",{staticClass:"title"},[t._v("标题")]),t._v(" "),s("p",{staticClass:"comment"},[t._v("评论数量")]),t._v(" "),s("div",{staticClass:"info"},[t._v("\n            类型\n          ")]),t._v(" "),s("p",{staticClass:"time"},[t._v("发布时间")]),t._v(" "),s("p",{staticClass:"delete-con"},[t._v("删除")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header part"},[s("p",{staticClass:"title"},[t._v("帖子标题")]),t._v(" "),s("p",{staticClass:"comment"},[t._v("评论内容")]),t._v(" "),s("p",{staticClass:"reply"},[t._v("回复谁")]),t._v(" "),s("p",{staticClass:"time"},[t._v("发布时间")]),t._v(" "),s("p",{staticClass:"delete-con"},[t._v("删除")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header part"},[e("p",{staticClass:"title"},[this._v("帖子标题")]),this._v(" "),e("p",{staticClass:"comment"},[this._v("回复内容")]),this._v(" "),e("p",{staticClass:"reply"},[this._v("谁回复我")]),this._v(" "),e("p",{staticClass:"time"},[this._v("发布时间")])])}]};var k=s("VU/8")(C,y,!1,function(t){s("bgwv")},"data-v-16417dce",null).exports,x={name:"manage-user",data:function(){return{current:1,forum_list:[],user_list:[],comment_list:[]}},filters:{get_picture:function(t){return"number"==typeof t||t.indexOf("http")<0?"http://106.14.13.178/icon/"+t+".jpg":t},formatDateTime:function(t){var e=new Date(t),s=e.getFullYear(),n=e.getMonth()+1;n=n<10?"0"+n:n;var i=e.getDate();i=i<10?"0"+i:i;var a=e.getHours();a=a<10?"0"+a:a;var o=e.getMinutes(),r=e.getSeconds();return s+"-"+n+"-"+i+" "+a+":"+(o=o<10?"0"+o:o)+":"+(r=r<10?"0"+r:r)}},methods:{to_show_forum:function(t){localStorage.setItem("show_forum_current",t),window.open("/page/show_forum.html")},change_active:function(t){this.current=t},delete_user:function(t,e){var s=this;setTimeout(function(){s.user_list.splice(e,1),s.$emit("showtip","删除成功")},500)},delete_comment:function(t,e){var s=this;setTimeout(function(){s.comment.splice(e,1),s.$emit("showtip","删除成功")},500)},delete_info:function(t,e){var s=this,n=c.a.delete_forum+t+"/true";this.$http.get(n).then(function(t){200==t.status&&t.body.success&&(s.$emit("showtip","删除成功"),s.forum_list.splice(e,1))})}},created:function(){var t=this,e=c.a.get_report_comment;this.$http.get(e).then(function(e){200==e.status&&(t.forum_list=e.body)});var s=c.a.all_user;this.$http.get(s).then(function(e){200==e.status&&(t.user_list=e.body)});var n=c.a.all_comment;this.$http.get(n).then(function(e){200==e.status&&(t.comment_list=e.body)})}},$={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"manage-user"}},[s("div",{staticClass:"content"},[s("div",{staticClass:"left"},[s("li",{class:1==t.current?"active":"",on:{click:function(e){t.change_active(1)}}},[t._v("管理帖子")]),t._v(" "),s("li",{class:2==t.current?"active":"",on:{click:function(e){t.change_active(2)}}},[t._v("管理评论")]),t._v(" "),s("li",{class:3==t.current?"active":"",on:{click:function(e){t.change_active(3)}}},[t._v("管理用户")])]),t._v(" "),s("div",{staticClass:"right"},[s("div",{directives:[{name:"show",rawName:"v-show",value:1==t.current,expression:"current==1"}],staticClass:"forum-container"},[t._m(0),t._v(" "),t._l(t.forum_list,function(e,n){return e.is_ban?t._e():s("div",{staticClass:"a-forum part"},[s("p",{staticClass:"title",on:{click:function(s){t.to_show_forum(e._id)}}},[t._v(t._s(e.title))]),t._v(" "),s("p",{staticClass:"comment"},[t._v(t._s(e.user_name))]),t._v(" "),s("div",{staticClass:"info"},[s("div",{staticClass:"img-container"},[s("img",{attrs:{src:e.info.picture,alt:""}})]),t._v(" "),s("p",{staticClass:"name"},[t._v(t._s(e.info.name))]),t._v(" "),s("p",[t._v(t._s(1==e.type?"歌曲相关":2==e.type?"歌手相关":"专辑相关"))])]),t._v(" "),s("p",{staticClass:"report"},[t._v(t._s(e.report_count))]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(t._f("formatDateTime")(e.publish_time)))]),t._v(" "),s("p",{staticClass:"delete-con"},[s("button",{attrs:{type:"button",name:"button"},on:{click:function(s){t.delete_info(e._id,n)}}},[t._v("删除")])])])})],2),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:3==t.current,expression:"current==3"}],staticClass:"forum-container"},[t._m(1),t._v(" "),t._l(t.user_list,function(e,n){return e.is_ban?t._e():s("div",{staticClass:"a-forum part"},[s("p",{staticClass:"title",staticStyle:{display:"flex","flex-direction":"row"},attrs:{style:"display:flex;flex-direction:row;"}}),s("div",{staticClass:"img-container",staticStyle:{width:"60px",height:"60px","border-radius":"30px",overflow:"hidden",position:"relative",left:"-100px"}},[s("img",{attrs:{src:t._f("get_picture")(e.picture),alt:"",width:"100%",height:"100%"}})]),t._v(" "),s("p"),t._v(" "),s("p",{staticClass:"comment"},[t._v(t._s(e.nickname))]),t._v(" "),s("p",{staticClass:"report"},[t._v(t._s(e.report_count))]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(e.is_manager?"是":"否"))]),t._v(" "),s("p",{staticClass:"delete-con"},[s("button",{attrs:{type:"button",name:"button"},on:{click:function(s){t.delete_user(e._id,n)}}},[t._v("禁言")])])])})],2),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2==t.current,expression:"current==2"}],staticClass:"forum-container"},[t._m(2),t._v(" "),t._l(t.comment_list,function(e,n){return e.is_ban?t._e():s("div",{staticClass:"a-forum part"},[s("p",{staticClass:"title",on:{click:function(s){t.to_show_forum(e.forum_id)}}},[t._v(t._s(e.forum_title))]),t._v(" "),s("p",{staticClass:"comment"},[t._v(t._s(e.my_name))]),t._v(" "),s("div",{staticClass:"info"},[s("p",[t._v(t._s(e.comment_content))])]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(t._f("formatDateTime")(e.publish_time)))]),t._v(" "),s("p",{staticClass:"delete-con"},[s("button",{attrs:{type:"button",name:"button"},on:{click:function(s){t.delete_comment(e._id,n)}}},[t._v("删除")])])])})],2)])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header part"},[s("p",{staticClass:"title"},[t._v("标题")]),t._v(" "),s("p",{staticClass:"comment"},[t._v("发布者")]),t._v(" "),s("div",{staticClass:"info"},[t._v("\n            类型\n          ")]),t._v(" "),s("p",{staticClass:"report"},[t._v("举报次数")]),t._v(" "),s("p",{staticClass:"time"},[t._v("发布时间")]),t._v(" "),s("p",{staticClass:"delete-con"},[t._v("删除")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header part"},[s("p",{staticClass:"title",staticStyle:{width:"230px"}}),t._v(" "),s("p",{staticClass:"comment"},[t._v("用户名")]),t._v(" "),s("p",{staticClass:"report"},[t._v("举报次数")]),t._v(" "),s("p",{staticClass:"time"},[t._v("管理员")]),t._v(" "),s("p",{staticClass:"delete-con"},[t._v("禁言")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header part"},[s("p",{staticClass:"title"},[t._v("标题")]),t._v(" "),s("p",{staticClass:"comment"},[t._v("发布者")]),t._v(" "),s("div",{staticClass:"info"},[t._v("\n            发布内容\n          ")]),t._v(" "),s("p",{staticClass:"time"},[t._v("发布时间")]),t._v(" "),s("p",{staticClass:"delete-con"},[t._v("删除")])])}]};var F=s("VU/8")(x,$,!1,function(t){s("5FxE")},"data-v-1dca8a3b",null).exports,S={name:"App",data:function(){return{current_user:void 0,current_banner:1,show_choose_img:!1,show_alert:!1,alert_msg:"123456",alert_color:"#FF7F50"}},components:{"forum-header":_.a,"to-top":l.a,"personal-manage":m,"my-footer":v.a,"choose-img":f,"my-alert":p.a,"collect-manage":b,"my-forum-manage":k,"manage-user":F},methods:{show_alert_tip:function(t,e){var s=this;t&&(this.alert_msg=t),e&&(this.alert_color=e),this.show_alert=!0,setTimeout(function(){s.show_alert=!1},1e3)},change_banner:function(t){this.current_banner=t},close_choose_img:function(){this.show_choose_img=!1},show_manage_tip:function(t){this.show_alert_tip(t,"#31c27c")},submit_info:function(t,e){var s=this;if(""!=t&&""!=e){var n=this.current_user,i=c.a.update_user_info+n._id,a={nickname:t,personal_tag:e};this.$http.post(i,a).then(function(n){200==n.status&&(n.body.success?(s.show_alert_tip("修改成功","#31c27c"),s.current_user.nickname=t,s.current_user.personal_tag=e,localStorage.setItem("current_user",r()(s.current_user)),setTimeout(function(){window.location.reload()},800)):s.show_alert_tip("修改失败","#FF7F50"))}).catch(function(){s.show_alert_tip("修改失败","#FF7F50")})}else this.show_alert_tip("内容不能为空","#FF7F50")},show_choose_click:function(){this.show_choose_img=!0},choose_img_success:function(t){var e=this,s=this.current_user,n=c.a.update_user_picture+s._id+"/"+t;this.$http.get(n).then(function(s){200==s.status&&(s.body.success?(e.current_user.picture=t,e.show_alert_tip("修改成功","#31c27c"),localStorage.setItem("current_user",r()(e.current_user)),setTimeout(function(){window.location.reload()},800)):e.show_alert_tip("修改失败","#FF7F50"),e.show_choose_img=!1)}).catch(function(){e.show_alert_tip("修改失败","#FF7F50"),e.show_choose_img=!1})}},filters:{get_picture:function(t){return"number"==typeof t||t.indexOf("http")<0?"http://106.14.13.178/icon/"+t+".jpg":t},formatDateTime:function(t){var e=new Date(t),s=e.getFullYear(),n=e.getMonth()+1;n=n<10?"0"+n:n;var i=e.getDate();i=i<10?"0"+i:i;var a=e.getHours();a=a<10?"0"+a:a;var o=e.getMinutes(),r=e.getSeconds();return s+"-"+n+"-"+i+" "+a+":"+(o=o<10?"0"+o:o)+":"+(r=r<10?"0"+r:r)}},created:function(){var t=localStorage.getItem("current_user");"object"!=(void 0===t?"undefined":a()(t))&&""!=t&&(this.current_user=JSON.parse(t))}},T={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"App"}},[s("forum-header"),t._v(" "),s("div",{staticClass:"info"},[s("div",{staticClass:"bg"}),t._v(" "),s("div",{staticClass:"title-info"},[t._v("\n      "+t._s(t.current_user.nickname)+"\n    ")]),t._v(" "),s("div",{staticClass:"tag-info"},[t._v("\n      "+t._s(t.current_user.personal_tag)+"\n    ")]),t._v(" "),s("div",{staticClass:"img-container",on:{click:t.show_choose_click}},[s("div",{staticClass:"img-shadow"}),t._v(" "),s("div",{staticClass:"real-img"},[s("img",{attrs:{src:t._f("get_picture")(t.current_user.picture),alt:""}})])])]),t._v(" "),s("div",{staticClass:"banner"},[s("span",{class:1==t.current_banner?"my-active":"",on:{click:function(e){t.change_banner(1)}}},[t._v("个人信息")]),t._v(" "),s("span",{class:2==t.current_banner?"my-active":"",on:{click:function(e){t.change_banner(2)}}},[t._v("收藏管理")]),t._v(" "),s("span",{class:3==t.current_banner?"my-active":"",on:{click:function(e){t.change_banner(3)}}},[t._v("论坛管理")]),t._v(" "),t.current_user.is_manager?s("span",{class:4==t.current_banner?"my-active":"",on:{click:function(e){t.change_banner(4)}}},[t._v("内容管理")]):t._e()]),t._v(" "),s("div",{staticClass:"manage-content"},[1==t.current_banner?s("personal-manage",{attrs:{"current-user":t.current_user},on:{infochange:t.submit_info}}):t._e(),t._v(" "),2==t.current_banner?s("collect-manage",{attrs:{"current-user":t.current_user},on:{showtip:t.show_manage_tip}}):t._e(),t._v(" "),3==t.current_banner?s("my-forum-manage",{attrs:{"current-user":t.current_user},on:{showtip:t.show_manage_tip}}):t._e(),t._v(" "),4==t.current_banner?s("manage-user"):t._e()],1),t._v(" "),s("to-top"),t._v(" "),s("choose-img",{directives:[{name:"show",rawName:"v-show",value:t.show_choose_img,expression:"show_choose_img"}],attrs:{"current-index":t.current_user.picture},on:{closechoose:t.close_choose_img,choosesuccess:t.choose_img_success}}),t._v(" "),s("my-footer"),t._v(" "),s("my-alert",{attrs:{msg:t.alert_msg,"is-show":t.show_alert,"show-color":t.alert_color}})],1)},staticRenderFns:[]};var E=s("VU/8")(S,T,!1,function(t){s("dDHL")},"data-v-65246322",null).exports,N=(s("34KM"),s("Mdbh"));n.a.use(N.a),new n.a({el:"#app",render:t=>t(E)})},bgwv:function(t,e){},dDHL:function(t,e){},dQCR:function(t,e,s){"use strict";var n=s("c/Tr"),i=s.n(n),a={0:{name:"我的个人博客哇",link:"http://xyf0412.oicp.io/",icon:"icon-quill"},1:{name:"书签和案例展示",link:"http://xyf0412.oicp.io/MarkerPage",icon:"icon-bookmarks"},2:{name:"我的github地址",link:"https://github.com/demoyf",icon:"icon-github"},length:3},o={name:"",data:function(){return{link_list:[]}},created:function(){this.link_list=i()(a)}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"footer"}},t._l(t.link_list,function(e){return s("a",{attrs:{href:e.link,target:"_blank"}},[s("div",{staticClass:"link-container"},[s("p",{staticClass:"name-container"},[t._v(t._s(e.name))]),t._v(" "),s("i",{staticClass:"my-link-icon",class:e.icon})])])}))},staticRenderFns:[]};var c=s("VU/8")(o,r,!1,function(t){s("I6Qg")},"data-v-7404eab6",null);e.a=c.exports},kByx:function(t,e){},ve3d:function(t,e,s){"use strict";var n=s("EV1k"),i=s("S6Sm"),a={name:"forum-header",data:function(){return{show_login:!1,show_reg:!1,user_info:void 0,show_control:!1,has_new:!1}},created:function(){var t=this,e=localStorage.getItem("current_user");if(e&&""!==e){var s=JSON.parse(e);("number"==typeof s.picture||s.picture.indexOf("http")<0)&&(s.picture="http://106.14.13.178/icon/"+s.picture+".jpg"),this.user_info=s}if(this.user_info){var n=i.a.has_new_url+this.user_info._id;this.$http.get(n).then(function(e){200==e.status&&e.body.has_new&&(t.has_new=!0)})}document.addEventListener("click",function(e){t.show_control&&(t.show_control=!1)}),window.addEventListener("storage",function(t){"current_user"==t.key&&setTimeout(function(){window.location.reload()},800)})},components:{"login-com":n.a},methods:{to_manage:function(t,e){t.preventDefault(),t.stopPropagation(),window.location.href="/page/manage.html"},to_forum_page:function(t){localStorage.setItem("forum_sort",t),window.location.href="/page/forum_page.html"},to_show_login:function(){this.show_login=!0},my_close:function(){this.show_login&&(this.show_login=!1),this.show_reg&&(this.show_reg=!1)},start_reg:function(){this.show_reg=!0},show_user_control:function(t){this.show_control=!0,t.preventDefault(),t.stopPropagation()},login_out:function(t){localStorage.setItem("current_user",""),t.preventDefault(),t.stopPropagation(),window.location.reload()}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"header"}},[s("div",{staticClass:"link-container"},[s("a",{attrs:{href:"/"}},[t._v("音乐首页")]),t._v(" "),s("a",{attrs:{href:"/page/all_forum.html"}},[t._v("论坛首页")]),t._v(" "),s("a",{attrs:{href:"#"},on:{click:function(e){t.to_forum_page("hot")}}},[t._v("热门")]),t._v(" "),s("a",{attrs:{href:"#"},on:{click:function(e){t.to_forum_page("new")}}},[t._v("最新")])]),t._v(" "),t.user_info?t._e():s("div",{staticClass:"button-container"},[s("button",{staticClass:"login-button",on:{click:t.to_show_login}},[t._v(" 登录")]),t._v(" "),s("button",{staticClass:"register-button",on:{click:t.start_reg}},[t._v("注册")])]),t._v(" "),t.user_info?s("div",{staticClass:"user-info-container"},[t.has_new?s("div",{staticClass:"has-new"}):t._e(),t._v(" "),s("div",{staticClass:"user-icon",on:{click:t.show_user_control}},[s("img",{attrs:{src:t.user_info.picture,alt:""}})]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.show_control,expression:"show_control"}],staticClass:"user-control",class:t.show_control?"active":""},[s("div",{staticClass:"info"},[s("div",{staticClass:"img-container"},[s("img",{attrs:{src:t.user_info.picture,alt:""}})]),t._v(" "),s("p",[t._v(t._s(t.user_info.nickname))])]),t._v(" "),s("div",{staticClass:"manage-list"},[s("div",{staticClass:"personal-manage manage"},[s("p",{on:{click:function(e){t.to_manage(e,2)}}},[t._v("个人信息管理")]),t._v(" "),s("button",{attrs:{type:"button",name:"button"},on:{click:function(e){t.to_manage(e,2)}}},[t._v("进入")])]),t._v(" "),s("div",{staticClass:"forum-manage manage"},[s("p",{on:{click:function(e){t.to_manage(e,2)}}},[t._v("论坛管理")]),t._v(" "),s("button",{attrs:{type:"button",name:"button"},on:{click:function(e){t.to_manage(e,2)}}},[t._v("进入")])]),t._v(" "),t.user_info.is_manager?s("div",{staticClass:"forum-manage manage"},[t.has_new?s("div",{staticClass:"has-new"}):t._e(),t._v(" "),s("p",{on:{click:function(e){t.to_manage(e,2)}}},[t._v("数据管理")]),t._v(" "),s("button",{attrs:{type:"button",name:"button"},on:{click:function(e){t.to_manage(e,2)}}},[t._v("进入")])]):t._e(),t._v(" "),s("div",{staticClass:"manage"},[s("p"),t._v(" "),s("button",{attrs:{type:"button",name:"button"},on:{click:t.login_out}},[t._v("退出")])])])])]):t._e(),t._v(" "),s("transition",{attrs:{name:"fade-in"}},[s("login-com",{directives:[{name:"show",rawName:"v-show",value:t.show_login,expression:"show_login"}],attrs:{"login-type":"login"},on:{"close-login":t.my_close}})],1),t._v(" "),s("transition",{attrs:{name:"fade-in"}},[s("login-com",{directives:[{name:"show",rawName:"v-show",value:t.show_reg,expression:"show_reg"}],attrs:{"login-type":"reg"},on:{"close-login":t.my_close}})],1)],1)},staticRenderFns:[]};var r=s("VU/8")(a,o,!1,function(t){s("wNDD")},"data-v-43829c26",null);e.a=r.exports},wNDD:function(t,e){}},["Zuyx"]);
//# sourceMappingURL=manage.dd788958c43f9e2e66fd.js.map