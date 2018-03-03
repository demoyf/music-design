<template>
	<div id="img-shadow">
		<a href="#" class="link-container">
			<img src="https://p.qpic.cn/music_cover/JBDCVgqXWXaYUvcsElqcicTqxjf1FITqfN9nJ1D7xicyMRlJ81Pic30kg/300?n=1">
			<i class="mask-mod">
				<i class="icon-play-icon play-icon"></i>
			</i>
		</a>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"img-shadow",
		props:["to_info"],
		data(){
			return {
				info:this.to_info
			}
		}
	}
</script>
<style lang="stylus">
#img-shadow
	.link-container
		display:block;
		width:100%;
		height:100%;
		position:relative;
		overflow: hidden;
		&:hover
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
