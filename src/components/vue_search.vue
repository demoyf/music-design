<template>
	<div id="vue-search">
		<div class="input-container" v-on:mouseenter="enter()" v-on:mouseleave="leave()">
		<transition name="input-transition">
		<input ref="search_input" placeholder="歌曲名、歌手名、专辑名" class="search-input input-large" type="text" name="search-input">
		</transition>
		<i class="icon-search-icon icon">
		</i>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"vue-search",
		data(){
			return {
				min_width:1120,
				current_width:0
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
		margin-top:0.1em;
		z-index:50;
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
			&:hover
				color:music-color;
				cursor:pointer;
.input-large
	transition:all 0.5s;
	width:190px;
.input-small
	transition:width 0.5s;
	width:0px;
	left:0;
</style>
<style>
	#{
		position: absolute;
	}
</style>