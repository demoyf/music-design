<template>
	<div id="loop">
		<h1 class="circle-title">歌单推荐</h1>
		<!-- 轮播图 -->
		<div class="loop-parent">
			<div class="loop-container" ref="loop_container">
				<div class="card-container" v-for="item in reslut_list" :key="item.id" ref="card_container">
					<card-component class="one-card" v-for="card in item" :key="card.id"></card-component>
				</div>
			</div>
		</div>
		<div class="circle-bottom-icon-container">
			<i class="bottom-icon icon-to-left-icon" v-for="n in count" :class="n===active_index?'active':''"></i>
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
			all_info:this.info_list,
			mock_list:[
				{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10}
			],
			reslut_list:[],
			current:1,
			count:0,
			is_transition:false,
			active_index:1
		}
	},	
	created(){
		if (this.mock_list.length%5===0) {
			let _mock_list = this.mock_list;
			let first = _mock_list.slice(0,5);
			// console.log(first);
			let last = _mock_list.slice(this.mock_list.length-5,this.mock_list.length);
			// console.log(last);
			_mock_list.unshift(...last);
			_mock_list.push(...first);
			let num = _mock_list.length/5;
			this.count = num-2;
			let temp = [];
			for (let i = 0;i<num;i++) {
				temp.push(_mock_list.slice(i*5,(i+1)*5));
			}
			this.reslut_list = temp;
			this.$nextTick(()=>{
				this.$refs.loop_container.style.width = num*100+"%";
				let length = this.$refs.card_container.length;
				let temp = this.$refs.card_container;
				for(let i = 0;i<length;i++){
					temp[i].style.width = 100/num+"%";
				}
			});
		}
	},
	mounted(){
		this.$refs.loop_container.addEventListener("transitionend",(event)=>{
			// if ($event.traget) {}
			// console.log();
			if (event.target.classList.contains("loop-container")) {
				this.is_transition = false;
				let count = this.count;
				if (this.current <= 0) {
					this.current = count;
					let container = this.$refs.loop_container;
					if (container.classList.contains("add_transition")) {
						container.classList.remove('add_transition');
					}
					container.style.left = -this.current*100+"%";
					return;
				}
				if (this.current > count) {//最后一个了，这个只是测试用的
					this.current = 1;
					let container = this.$refs.loop_container;
					if (container.classList.contains("add_transition")) {
						container.classList.remove('add_transition');
					}
					container.style.left = -this.current*100+"%";
					return;
				}
			}
		});
	},
	methods:{
		to_right(){
			//0 -100 1 -200 2 - 300 3
			if (this.is_transition) {//动画过程中，点击无效
				return;
			}
			this.current++;
			// 因为需要瞬间回到第一或者最后一个，所以transition还是要可控
			let container = this.$refs.loop_container;
			if (!container.classList.contains("add_transition")) {
				container.classList.add('add_transition');
			}
			if (this.current>this.count) {
				this.active_index = 1;
			}else{
				this.active_index = this.current;
			}
			console.log(this.active_index);
			this.is_transition = true;
			container.style.left = -this.current*100+"%";
		},
		to_left(){
			// -300 -200 -100 0
			if (this.is_transition) {
				return;
			}
			this.current--;
			this.is_transition = true;
			let container = this.$refs.loop_container;
			if (!container.classList.contains("add_transition")) {
				container.classList.add('add_transition');
			}
			if (this.current<0) {
				this.active_index = this.count;
			}else{
				this.active_index = this.current;
			}
			console.log(this.active_index);
			container.style.left = -this.current*100+"%";
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
		.active
			color:#333;
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
			float:left;
			left:-100%;
			position:relative;
			.card-container
				width: 50%;
				overflow: hidden;
				margin:auto;
				float:left;
				.one-card
					float: left;
					&::after
						content: '';
						clear: both;
				&::after
					content: '';
					clear: both;
		.add_transition
			add_prefix('transition',left 1s);
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