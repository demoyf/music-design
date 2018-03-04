<template>
	<div id="little-one-card">
		<img-shadow class="img-container"></img-shadow>
		<div class="descripe-container">
				<p class="music-title-p">我要的</p>
				<p class="artist-name-p">张靓颖</p>
		</div>
		<p class="music-duration">03:40</p>
	</div>
</template>
<script type="text/javascript">
import img_shadow from './img_shadow.vue';
export default {
	name:"little-one-card",
	props:[],
	data(){
		return {
			mock_list:[]
		}
	},
	methods:{

	},
	computed:{

	},
	mounted(){

	},
	components: {
		'img-shadow':img_shadow
	}
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl";
#little-one-card
	width:32%;
	margin-right: 1%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	border-top: 1px solid #99999933;
	padding-top: 1em;
	padding-bottom: 1em;
	float: left;
	.img-container
		width: 86px;
		height: 86px;
		float: left;
		&::after
			content: '';
			clear: both;
	.descripe-container
		max-width: 50%;
		font-size: 1em;
		font-weight: 400;
		float: left;
		&::after
			content: '';
			clear: both;
		>p
			width: 100%;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			padding: 0 0 0 .7em;
			line-height: 1.5em;
			&:hover
				color: music-color;
				cursor: pointer;
		.music-title-p
			color: #333;
			margin-top: 1em;
		.artist-name-p
			color: #999;
			font-size: .93em;
	.music-duration
		float: right;
		height: 100%;
		line-height: 86px;
		color: #999;
		&::after
			content: '';
			clear: both;
</style>
