<template>
	<div id="little-loop-component">
		<h1 class="circle-title">新歌速递</h1>
		<div class="parent-container">
			<div class="roll-container" ref="song_list_container">
				<div class="one-part" ref="song_item_container" v-for="index in length">
					<little-one-card v-for="n in list">
					</little-one-card>
				</div>
				<i class="clear_float"></i>
			</div>
		</div>
		<div class="circle-bottom-icon-container">
			<i class="bottom-icon icon-circle-icon" v-for="n in count" :class="n===active_index?'active':''"
			@click="to_index(n)"></i>
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
import one_card from './little_one_card.vue';
import Roll from '../../common/util/roll_util';
	export default {
		name:"little-loop-component",
		props:[],
		data(){
			return {
				mock_list:[],
				list:9,
				roll:null,
				count:2,
				active_index:1,
				length:4
			}
		},
		created() {
		  //do something after creating vue instance
			this.$nextTick(()=>{
				this.roll = new Roll(this,"song_list_container","song_item_container");
				this.roll.build("add_transition",this.count);
				this.roll.bind_transition_listener("roll-container");
			});
		},
		methods:{
			to_left(){
				this.roll.to_left();
				this.active_index = this.roll.get_active();
			},
			to_right(){
				this.roll.to_right();
				this.active_index = this.roll.get_active();
			},
			to_index(index){
				this.roll.to_index(index);
				this.active_index = this.roll.get_active();
			}
		},
		components: {
			"little-one-card":one_card
		}
	}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl";
#little-loop-component
	width:100%;
	background: linear-gradient(#99999928 40%,white 100%);
	overflow: hidden;
	position: relative;
	.circle-bottom-icon-container
		width:100%;
		margin:30px 0;
		padding:20px 0px 0px 0px;
		text-align:center;
		height:20px;
		line-height:20px;
		.bottom-icon
			color:#999;
			display:inline-block;
			font-size:.65em;
			margin:0 1em;
			color:rgba(0,0,0,.15);
			transition: color .5s;
			&:hover
				cursor:pointer;
		.active
			color:rgba(0,0,0,.3);
			transition: color .5s;
	.circle-title
		text-align: center;
		margin-bottom: 1.8em;
		font-size: 2em;
		color:#333;
		letter-spacing:.3em;
		font-stretch:narrower;
		font-family:SimHei;
		font-weight:bold;
		padding-top: 2em;
		add_prefix('transform',scaleX(.95));
		position: relative;
	.parent-container
		width:82%;
		position:relative;
		left:9%;
		overflow:hidden;
		.roll-container
			width: 200%;
			left: -100%;
			position: relative;
			float: left;
			.one-part
				width: 50%;
				float: left;
			.clear_float::after
				content: '';
				clear: both;
			&::after
				content: '';
				clear: both;
		.add_transition
			transition: left .8s;
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
	#little-loop-component .parent-container
		width:90%;
		left: 5%;
</style>
