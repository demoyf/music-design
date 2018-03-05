<template>
	<div class="card-component">
		<div class="container-div">
			<div class="img-container" ref="img_container">
				<a href="#">
					<img :src="defaultImg" class="singer-img"
					onerror="onerror=null;src='./../../../static/img/default.png'">
					<div class="shadow-div">
						<div class="circle-icon">
							<i class="icon-play-icon icon"></i>
						</div>
					</div>
				</a>
			</div>
			<a href="#" :data-albumid="data_info.album_id"><h3 class="title-h3">{{data_info.title}}</h3></a>
			<a href="#" :data-artistid="data_info.artist_id"><span class="artist-span">{{data_info.author}}</span></a>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	name:"card-component",
	props:["infoItem"],
	data(){
		return {
			data_info:this.infoItem,
			defaultImg:"./../../../static/img/default.png"
		}
	},
	mounted(){
		let img_url = this.data_info.pic_big;
		let image = new Image();
		let index = img_url.lastIndexOf("@")>0?img_url.lastIndexOf("@"):img_url.length;
		img_url = img_url.substr(0,index);
		if(img_url.lastIndexOf("s_0")>0){
			img_url+="@s_0,w_240";
		}else{
			img_url+="@s_1,w_240,h_240";
		}
		image.src = img_url;
		image.onload = ()=>{
			this.defaultImg = img_url;
			image = null;
		};
	},
	methods:{

	}
}
</script>
<!--  lang="stylus" -->
<style type="stylesheet/stylus" lang="stylus">
@import './../../common/stylus/mixin.styl';
.card-component
	width: 20%;
	box-sizing: border-box;
	padding-right:20px;
	overflow:hidden;
	.container-div
		width: 100%;
		.img-container
			width: 100%;
			position: relative;
			left: 0;
			top: 0;
			overflow:hidden;
			.singer-img
				width: 100%;
				height: auto;
				z-index:10;
				add_prefix('transition',all .5s);
			.shadow-div
				z-index:50;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,0.2);
				position: absolute;
				left: 0;
				top: 0;
				display:flex;
				flex-direction:column;
				justify-content: center;
				align-items: center;
				overflow:hidden;
				opacity: 0;
				add_prefix('transition',all 0.5s);
				.circle-icon
					background-color: white;
					box-shadow:1px 1px 3px 3px rgba(0,0,0,0.2);
					border-radius: 28px;
					width:56px;
					height:56px;
					display:flex;
					flex-direction:column;
					justify-content: center;
					align-items: center;
					add_prefix('transition',all .5s);
					opacity: 0;
					add_prefix('transform',scale(0.1));
					.icon
						font-size: 1.9em;
						display:block;
						padding-left:.2em;
						color:rgba(0,0,0,0.6);
			&:hover
				cursor:pointer;
				.singer-img
					add_prefix('transition',all .5s);
					add_prefix('transform',scale(1.1));
				.shadow-div
					add_prefix('transition',all .5s);
					opacity:1;
				.circle-icon
					add_prefix('transition',all .5s);
					opacity:1;
					add_prefix('transform',scale(1));
		h3.title-h3
			font-size:1em;
			margin-top:.5em;
			color:#333;
			width:100%;
			line-height: 22px;
			font-weight:400
			ellipsis_tran()
			&:hover
				color:music-color;
		span.artist-span
			font-size:.95em;
			color:#999;
			line-height:22px;
			display:block;
			ellipsis_tran();
			&:hover
				color:music-color;
</style>
