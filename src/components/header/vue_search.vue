<template>
	<div id="vue-search" v-on:mouseenter="enter()" v-on:mouseleave="leave()">
		<div class="input-container" ref="input_container">
		<input ref="search_input" placeholder="歌曲名、歌手名、专辑名"
		class="search-input input-large" type="text" name="search-input"
		v-on:input="search_suggestion" v-model="search_content" v-on:blur="hide_result"
		 v-on:focus="show_result" v-on:keyup.enter="local_to_search_page" />
		<i class="icon-search-icon icon">
		</i>
		</div>
		<div class="search-result" ref="search_result">
			<div class="result-item">
				<div class="icon-container">
					<i class="icon-music-icon search-i"></i>
					<span>单曲</span>
				</div>
				<span v-for="item in song_list" class="result-span">
					{{item.songname}}<span>- {{item.artistname}}</span>
				</span>
			</div>
			<div class="result-item">
				<div class="icon-container">
					<i class="icon-music-icon search-i"></i>
					<span>歌手</span>
				</div>
				<span v-for="item in artist_list" class="result-span">
					{{item.artistname}}
				</span>
			</div>
			<div class="result-item">
				<div class="icon-container">
					<i class="icon-album-icon search-i"></i>
					<span>专辑</span>
				</div>
				<span v-for="item in album_list" class="result-span">
					{{item.albumname}}<span>- {{item.artistname}}</span>
				</span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import url_util from './../../common/util/url.js';
import * as storage_util from './../../common/util/local_storage.js';
	export default {
		name:"vue-search",
		data(){
			return {
				min_width:1310,
				middle_width:1410,
				current_width:0,
				search_content:"",
				is_search_now:false,
				song_list:[],
				album_list:[],
				artist_list:[],
				search_history:[]
			}
		},
		mounted(){
			// storage_util.clear_all();
			const self = this;
			self.current_width = document.body.clientWidth;
			window.onresize = ()=>{
				return (()=>{
					self.current_width = document.body.clientWidth;
				})();
			}
		},
		watch:{
			current_width(new_val){
				let ref_class = this.$refs.search_input.classList;
				let contain_class = this.$refs.input_container.classList;
				// 1200
				if (this.middle_width>=new_val) {
					if (!contain_class.contains("input-center")) {
						contain_class.add("input-center");
					}
				}else{
					if (contain_class.contains("input-center")) {
						contain_class.remove("input-center");
					}
				}
				if (this.min_width>=new_val) {
					console.log(ref_class.contains("input-small"));
					if (!ref_class.contains("input-small")) {
						ref_class.add("input-small");
						ref_class.remove("input-large");
					}
					if (contain_class.contains("input-center")) {
						contain_class.remove("input-center");
					}
				}
				else{
					if (!ref_class.contains("input-large")) {
						ref_class.remove("input-small");
						ref_class.add("input-large");
					}
				}
				this.current_width = new_val;
			}
		},
		methods:{
			enter(){
				if (this.current_width>this.min_width) {
					return;
				}
				let ref_class = this.$refs.search_input.classList;
				if (!ref_class.contains("input-large")) {
					ref_class.remove("input-small");
					ref_class.add("input-large");
				}
				this.$refs.search_result.classList.add("input-left");
				this.$refs.input_container.classList.add("input-left");
				let list = this.$refs.search_result.classList;
				if (!(this.search_content==="")&&!list.contains("show")) {
					this.$refs.search_result.classList.add("show");
				}
			},
			leave(){
				if (this.current_width>this.min_width) {
					return;
				}
				let ref_class = this.$refs.search_input.classList;
				if (!ref_class.contains("input-small")) {
					ref_class.remove("input-large");
					ref_class.add("input-small");
				}
				this.$refs.input_container.classList.remove("input-left");
				this.$refs.search_result.classList.remove("input-left");
				this.$refs.search_result.classList.remove("show");
			},
			search_suggestion(){
				if (!this.is_search_now) {
					this.is_search_now = true;
					let search_text = this.search_content;
					if (search_text==="") {
						this.is_search_now = false;
						return;
					}
					let url = url_util.search_suggestion+search_text;
					this.$http.get(url).then((data)=>{
						if (data.status===200) {
							if (data.body) {
								let body = data.body;
								this.song_list = body.song.slice(0,4);
								this.artist_list = body.artist.slice(0,3);
								this.album_list = body.album.slice(0,3);
								this.$refs.search_result.classList.add("show");
								this.is_search_now = false;
							}else{
								this.is_search_now = false;
								this.song_list = [];
								this.artist_list = [];
								this.album_list = [];
							}
						}
					}).catch(()=>{
						this.is_search_now = false;
					});
				}
			},
			hide_result(){
				this.$refs.search_result.classList.remove("show");
			},
			show_result(){
				let list = this.$refs.search_result.classList;
				if (!(this.search_content==="")&&!list.contains("show")) {
					this.$refs.search_result.classList.add("show");
				}
			},
			local_to_search_page(){
				if (this.search_content==="") {
					return;
				}
				storage_util.save_item("current_search",this.search_content);
				window.open("/page/search_result.html");
			}
		}
	}
</script>
<style type="stylesheet/stylus" lang="stylus">
@import './../../common/stylus/mixin.styl';
#vue-search
	color:rgba(0,0,0,0.8);
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	position:relative;
	.input-container
		display:flex;
		-ms-flex-direction:row;
		flex-direction:row;
		border:1px solid gray;
		align-items:center;
		border-radius:2px;
		padding:3px;
		position:absolute;
		left:5em;
		top:25px;
		z-index:50;
		add_prefix('transition',left inpur-second);
		background-color:white;
		.search-input
			display: inline-block;
			height:25px;
			padding:3px;
			max-width:190px;
			position:relative;
		.icon
			display:block;
			color:gray;
			font-size:1.1em;
			position:relative;
			padding-right:0.2em;
			&:hover
				color:music-color;
				cursor:pointer;
	.search-result
		position:absolute;
		width:222px;
		left:5em;
		background-color:white;
		border:1px solid gray;
		border-radius:3px;
		z-index:100;
		top:64px;
		// padding:0.5em;
		-webkit-box-sizing:border-box;
		box-sizing:border-box;
		add_prefix('transition',all inpur-second);
		visibility:hidden;
		.result-item
			margin:0.3em 0;
			display:flex;
			flex-direction:column;
			.icon-container
				color:gray;
				font-size:0.9em;
				line-height:1.2em;
				margin:0.5em;
				.search-i
					margin-left:0.3em;
					margin-top:0.2em;
					margin-right:0.5em;
					display:block;
					width:1em;
					float:left;
					&::after
						content:'';
						clear:both;
			span.result-span
				font-size:0.92em;
				display:block;
				height:2em;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				width:100%;
				box-sizing:border-box;
				padding:0.5em 0.5em 0em 2.1em;
				color:black;
				span
					color:gray;
				&:hover
					background-color:music-color;
					color:white;
					cursor:pointer;
					span
						color:white;
	.input-large
		add_prefix('transition',all inpur-second);
		width:190px;
	.input-small
		add_prefix('transition',all inpur-second);
		width:0px;
	.input-left
		left:-7em;
		add_prefix('transition',all inpur-second);
	.input-center
		left:0em;
		add_prefix('transition',left inpur-second);
	.show
		height:auto;
		visibility:visible;
</style>
<style>
	.{
	}
</style>
