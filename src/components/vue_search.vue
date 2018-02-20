<template>
	<div id="vue-search" v-on:mouseenter="enter()" v-on:mouseleave="leave()">
		<div class="input-container" ref="input_container">
		<input ref="search_input" placeholder="歌曲名、歌手名、专辑名" class="search-input input-large" type="text" name="search-input" v-on:input="search_suggestion" v-model="search_content">
		<i class="icon-search-icon icon">
		</i>
		</div>
		<div class="search-result" ref="search_result">
			<div class="result-item">
				<span v-for="item in song_list">
					{{item.songname}}-
					{{item.artistname}}
				</span>
			</div>
			<div class="result-item">
				<span v-for="item in artist_list">
					{{item.artistname}}
				</span>
			</div>
			<div class="result-item">
				<span v-for="item in album_list">
					{{item.albumname}}
				</span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import url_util from './../common/util/url.js';
	export default {
		name:"vue-search",
		data(){
			return {
				min_width:1120,
				current_width:0,
				search_content:"",
				is_search_now:false,
				song_list:[],
				album_list:[],
				artist_list:[]
			}
		},
		mounted(){
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
				// 1200
				if (this.min_width>=new_val) {
					console.log(ref_class.contains("input-small"));
					if (!ref_class.contains("input-small")) {
						ref_class.add("input-small");
						ref_class.remove("input-large");
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
				this.$refs.input_container.classList.add("input-left");
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
			},
			search_suggestion(){
				if (!this.is_search_now) {
					this.is_search_now = true;
					setTimeout(()=>{
						let search_text = this.search_content;	
						if (!search_text) {
							return;
						}
						this.$http.get(url_util.url+"search/suggesstion/"+search_text).then((data)=>{
							if (data.status===200) {
								let body = data.body;
								this.song_list = body.song.slice(0,4);
								this.artist_list = body.artist.slice(0,3);
								this.album_list = body.album.slice(0,3);
								this.$refs.search_result.classList.add("show");
							}
						}).catch(()=>{
							console.log("error");
						});
						this.is_search_now = false;
					}, 300);
				}
			}
		}
	}
</script>
<style type="stylesheet/stylus" lang="stylus">
music-color = #31c27c
#vue-search
	color:rgba(0,0,0,0.8);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position:relative;
	.input-container
		display:flex;
		flex-direction:row;
		border:1px solid rgba(0,0,0,0.8);
		align-items:center;
		border-radius:2px;
		padding:3px;
		position:absolute;
		left:5em;
		top:25px;
		z-index:50;
		transition:left 0.5s;
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
		top:64px;
		// padding:0.5em;
		box-sizing:border-box;
		height:0;
		visibility: hidden;
		transition:height .5s;
		.result-item span
			display:block;
			height:1em;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden; 
			width:100%;
	.input-large
		transition:all 0.5s;
		width:190px;
	.input-small
		transition:width 0.5s;
		width:0px;
	.input-left
		left:-6em;
		transition:left 0.5s;
	.show
		visibility:visible;
		height:auto;
		transition:height .5s;
</style>
<style>
	.{
		
	}
</style>