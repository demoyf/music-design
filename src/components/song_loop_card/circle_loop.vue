<template>
	<div class="loop">
		<h1 class="circle-title">歌单推荐</h1>
		<!-- 轮播图 -->
		<div class="loop-parent">
			<div class="loop-container" ref="loop_container">
				<div class="card-container" v-for="(item,index) in reslut_list" ref="card_container" :key="index">
					<card-component class="one-card" v-for="(card,j) in item"
					 :info-item="card" :key="index*1000+j"></card-component>
				</div>
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
import card from './card_component.vue';
import url_util from './../../common/util/url';
export default {
	props:['info_list'],
	data(){
		return{
			all_info:this.info_list,
			reslut_list:[],
			current:1,
			count:0,
			is_transition:false,
			active_index:1
		}
	},
	created(){
		let url = url_util.get_new_album;
		let that = this;
		this.$http.get(url).then((response)=>{
			if(response.status==200){
					let body = response.body.plaze_album_list.RM.album_list.list;
					let length = body.length;
					if(length>10){
						body = body.slice(0,10);
						init(body);
					}else if(length<10){
						let temp = body.slice(0,10-body.length);
						body.push(...temp);
						init(body);
					}else{
						init(body);
					}
			}
		}).catch(()=>{

		});
		function init(mock_list){
				let _mock_list = mock_list;
				let first = _mock_list.slice(0,5);
				// console.log(first);
				let last = _mock_list.slice(_mock_list.length-5,_mock_list.length);
				// console.log(last);
				_mock_list.unshift(...last);
				_mock_list.push(...first);
				let num = _mock_list.length/5;
				that.count = num-2;
				let temp = [];
				for (let i = 0;i<num;i++) {
					temp.push(_mock_list.slice(i*5,(i+1)*5));
				}
				that.reslut_list = temp;
				that.$nextTick(()=>{
					console.log("tick");
					that.$refs.loop_container.style.width = num*100+"%";
					let length = that.$refs.card_container.length;
					let container = that.$refs.card_container;
					for(let i = 0;i<length;i++){
						container[i].style.width = (100/num).toFixed(2)+"%";
					}
				});
		}
	},
	mounted(){
		this.$refs.loop_container.addEventListener("transitionend",(event)=>{
			// if ($event.traget) {}
			// console.log();
			if(event.target.classList.contains("loop-container")){
				this.is_transition = false;
				let count = this.count;
				let _current = this.current;
				let container = this.$refs.loop_container;
				if (_current <= 0) {
					this.current = count;
					if (container.classList.contains("add_transition")) {
						container.classList.remove('add_transition');
					}
					container.style.left = -this.current*100+"%";
					return;
				}
				if (_current > count) {//最后一个了，这个只是测试用的
					this.current = 1;
					if (container.classList.contains("add_transition")) {
						container.classList.remove('add_transition');
					}
					container.style.left = -this.current*100+"%";
					return;
				}
				}
		},true);
	},
	methods:{
		to_right(){
			//0 -100 1 -200 2 - 300 3
			if (this.is_transition) {//动画过程中，点击无效
				return;
			}
			let _current = ++this.current;
			// 因为需要瞬间回到第一或者最后一个，所以transition还是要可控
			let container = this.$refs.loop_container;
			if (!container.classList.contains("add_transition")) {
				container.classList.add('add_transition');
			}
			if (_current>this.count) {
				this.active_index = 1;
			}else{
				this.active_index = _current;
			}
			this.is_transition = true;
			container.style.left = -_current*100+"%";
		},
		to_left(){
			// -300 -200 -100 0
			if (this.is_transition) {
				return;
			}
			let _current = --this.current;
			this.is_transition = true;
			let container = this.$refs.loop_container;
			if (!container.classList.contains("add_transition")) {
				container.classList.add('add_transition');
			}
			if (_current<=0) {
				this.active_index = this.count;
			}else{
				this.active_index = _current;
			}
			container.style.left = -_current*100+"%";
		},
		to_index(index){
			let _current = this.current;
			if(index===_current){
				console.log("return")
				return;
			}
			console.log("index:"+index);
			if (this.is_transition) {//动画过程中，点击无效
				return;
			}
			_current += index-_current;
			this.current = _current;
			// 因为需要瞬间回到第一或者最后一个，所以transition还是要可控
			let container = this.$refs.loop_container;
			if (!container.classList.contains("add_transition")) {
				container.classList.add('add_transition');
			}
			if (_current>this.count) {
				this.active_index = 1;
			}else{
				this.active_index = _current;
			}
			this.is_transition = true;
			container.style.left = -_current*100+"%";
		}
	},
	components:{
		'card-component':card
	}
}
</script>
<style type="stylesheet/stylus" lang="stylus">
@import './../../common/stylus/mixin.styl';
.loop
	width: 100%;
	min-width: my-min-width;
	gardient-background();
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
			font-size:.65em;
			margin:0 1em;
			color:rgba(0,0,0,.15);
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
			add_prefix('transition',left roll-scond);
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
	.loop .loop-parent
		width:90%;
</style>
