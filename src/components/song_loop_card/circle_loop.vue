<template>
	<div id="loop">
		<h1 class="circle-title">歌单推荐</h1>
		<!-- 轮播图 -->
		<div class="loop-container">
			<div class="card-container">
				<card-component></card-component>
				<card-component></card-component>
				<card-component></card-component>
				<card-component></card-component>
				<card-component></card-component>
			</div>
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
	background: linear-gradient(#99999922,white);
	padding-top:3em;
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
	.card-container
		width: 80%;
		position: relative;
		overflow: hidden;
		margin:auto;
		> div
			float: left;
		&::after
			content: '';
			clear: both;
			
@media(max-width:1300px)
	#loop .card-container
		width:90%;
</style>