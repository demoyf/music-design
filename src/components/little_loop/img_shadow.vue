<template>
	<div class="img-shadow" :data-song-id="info.song_id">
		<a class="link-container">
			<img :src="img_url">
			<i class="mask-mod">
				<i class="icon-play-icon play-icon"></i>
			</i>
		</a>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"img-shadow",
		props:["imgUrl"],
		data(){
			return {
				info:this.imgUrl,
				img_url:"./static/img/default.png"
			}
		},
		mounted() {
		  //do something after mounting vue instance
			let img_url = this.info.img_url;
			let image = new Image();
			image.src = img_url;
			image.onload = ()=>{
				this.img_url = img_url;
				image = null;
			};
		}
	}
</script>
<style lang="stylus">
.img-shadow
	.link-container
		display:block;
		width:100%;
		height:100%;
		position:relative;
		overflow: hidden;
		&:hover
			cursor: pointer;
			img
				-webkit-transition: -webkit-transform .5s;
				transition: -webkit-transform .5s;
				transition: transform .5s;
				transition: transform .5s;
				-webkit-transform .5s;
				-webkit-transform: scale(1.1);
				transform: scale(1.1);
			.mask-mod
				opacity: 1;
				-webkit-transition: all .5s;
				transition: all .5s;
				.play-icon
					transition: transform .5s;
					-webkit-transform: scale(1);
					transform: scale(1);
		img
			width: 100%;
			height: 100%;
			display: block;
			position: absolute;
			left: 0;
			top: 0;
		.mask-mod
			width:100%;
			height:100%;
			background-color:rgba(0,0,0,0.1);
			display: block;
			position: absolute;
			text-align: center;
			z-index: 100;
			padding-left: 50%;
			padding-top: 50%;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			opacity: 0;
			transition: all .5s;
			.play-icon
				transition: transform .5s;
				-webkit-transform: scale(.5);
				transform: scale(.5);
				position: relative;
				background-color: white;
				font-size: 1em;
				height: 1.7em;
				width: 1.7em;
				line-height: 1.7em;
				display: block;
				text-align: center;
				padding-left: .1em;
				border-radius: 1.7em;
				left: -0.85em;
				top: -0.85em;
				box-sizing: border-box;
</style>
