<template>
	<div id="loop">
		<h1 class="circle-title">歌单推荐</h1>
		<!-- 轮播图 -->
		<div class="loop-parent">
			<div class="loop-container" ref="loop_container">
				<div class="card-container">
					<card-component></card-component>
					<card-component></card-component>
					<card-component></card-component>
					<card-component></card-component>
					<card-component></card-component>
				</div>
				<div class="card-container">
					<card-component></card-component>
					<card-component></card-component>
					<card-component></card-component>
					<card-component></card-component>
					<card-component></card-component>
				</div>
			</div>
		</div>
		<div class="to-left-button loop-ctrl" @click="to_left">
			<i class="icon-to-left-icon icon"></i>
		</div>
		<div class="to-right-button loop-ctrl" @click="to_right">
			<i class="icon-to-right-icon icon"></i>
		</div>
	</div>
</template>
<script type="text/javascript">
import card from './card_component.vue';
export default {
	props:['info_list'],
	data(){
		return{
			all_info:this.info_list
		}
	},
	methods:{
		to_left(){
			this.$refs.loop_container.style.left = "-100%";
		},
		to_right(){
			this.$refs.loop_container.style.left = "0%";
		}
	},
	components:{
		'card-component':card
	}
}
</script>
<style type="stylesheet/stylus" lang="stylus">
@import './../../common/stylus/mixin.styl';
#loop
	width: 100%;
	min-width: my-min-width;
	background: linear-gradient(#99999928 40%,white 100%);
	padding-top:3em;
	position:relative;
	overflow:hidden;
	.circle-title
		text-align: center;
		margin-bottom: 1.8em;
		font-size: 2em;
		color:#333;
		letter-spacing:.3em;
		font-stretch:narrower;
		font-family:SimHei;
		font-weight:bold;
		add_prefix('transform',scaleX(.95));
	.loop-parent
		width:82%;
		margin:auto;
		overflow:hidden;
		.loop-container
			width:200%;
			position:relative;
			left:0;
			add_prefix('transition',all 1s);
			.card-container
				width: 50%;
				overflow: hidden;
				margin:auto;
				float:left;
				> div
					float: left;
					&::after
						content: '';
						clear: both;
				&::after
					content: '';
					clear: both;
	.loop-ctrl
		background:rgba(99,99,99,0.05);
		width:5em;
		height:7em;
		text-align:center;
		position:absolute;
		top:calc(50% - 3.5em);
		line-height:8.3em;
		.icon
			font-size:2.6em;
			color:#333;
		&:hover
			cursor:pointer;
			background:rgba(99,99,99,0.1);
	.to-left-button
		left:-5em;
		add_prefix('transition',left .5s);
	.to-right-button
		right:-5em;
		add_prefix('transition',right .5s);
	&:hover
		.to-left-button
			left:0em;
			add_prefix('transition',left .5s);
		.to-right-button
			right:0em;
			add_prefix('transition',right .5s);
	
@media(max-width:1300px)
	#loop .loop-parent
		width:90%;
</style>