<template>
	<div class="little-loop-component">
		<h1 class="circle-title">新歌速递</h1>
		<div class="parent-container">
			<div class="roll-container" ref="song_list_container">
				<div class="one-part" ref="song_item_container" v-for="index in my_length" :key="index">
					<little-one-card v-for="n in card_num" :song-item="song_list[card_num*(index-1)+(n-1)]" :key="index*200+n">
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
import one_card from './little_one_card';
import Roll from './../../common/util/roll_util';
import url from './../../common/util/url';
	export default {
		name:"little-loop-component",
		props:[],
		data(){
			return {
				roll:null,
				count:0,
				active_index:1,
				my_length:0,
				song_list:[],
				card_num:9
			}
		},
		created() {
		  //do something after creating vue instance
			this.$http.get(url.get_new_song+"1").then((response)=>{
				if(response.status===200){
					let body = response.body;
					let song_list = body.song_list;
					let count = Math.ceil(song_list.length/9);
					let length = song_list.length;
					if(length%9!=0){
						let temp_index = length%9;
						let temp_list = song_list.slice(0,9-temp_index);
						song_list.push(...temp_list);
						temp_list = null;
						temp_index = null;
					}
					length = song_list.length;
					this.count = count;
					let first = song_list.slice(0,9);
					let index = length-9<0?0:length-9;
					let after = song_list.slice(index,length);
					song_list.push(...first);
					song_list.unshift(...after);
					this.my_length = count+2;
					this.song_list = song_list;
					after = null;
					first = null;
					this.$nextTick(()=>{
						this.roll = new Roll(this,"song_list_container","song_item_container");
						this.roll.build("add_transition",this.count);
						this.roll.bind_transition_listener("roll-container");
					})
				}
			}).catch((error)=>{
				console.log(error);
			})
		},
		watch:{

		},
		methods:{
			to_left(){
				if(!this.roll){
					return;
				}
				this.roll.to_left();
				this.active_index = this.roll.get_active();
			},
			to_right(){
				if(!this.roll){
					return;
				}
				this.roll.to_right();
				this.active_index = this.roll.get_active();
			},
			to_index(index){
				if(!this.roll){
					return;
				}
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
.little-loop-component
	width:100%;
	background: -webkit-gradient(linear,left top, left bottom,color-stop(40%, #99999928),to(white));
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
			-webkit-transition: color scale-second;
			transition: color scale-second;
			&:hover
				cursor:pointer;
		.active
			color:rgba(0,0,0,.3);
			transition: color scale-second;
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
			transition: left roll-scond;
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
		add_prefix('transition',left scale-second);
	.to-right-button
		right:-5em;
		add_prefix('transition',right scale-second);
	&:hover
		.to-left-button
			left:0em;
			add_prefix('transition',left scale-second);
		.to-right-button
			right:0em;
			add_prefix('transition',right scale-second);
@media(max-width:1300px)
	#little-loop-component .parent-container
		width:90%;
		left: 5%;
</style>
