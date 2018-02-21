<template>
	<div id="card-component">
		<div class="container-div">
			<div class="img-container">
			<a href="#">
				<img src="https://p.qpic.cn/music_cover/JBDCVgqXWXaYUvcsElqcicTqxjf1FITqfN9nJ1D7xicyMRlJ81Pic30kg/300?n=1" class="singer-img">
				<div class="shadow-div">
					<div class="circle-icon">
						<i class="icon-play-icon icon"></i>
					</div>
				</div>
			</a>
			</div>
			<a><h3>2018还要一起过</h3></a>
		</div>	
	</div>
</template>
<script type="text/javascript">
export default {
	name:"card-component",
	props:["info_item"],
	data(){
		return {
			data_info:this.info_item
		}
	},
	methods:{
		
	}
}
</script>
<!--  lang="stylus" -->
<style type="stylesheet/stylus" lang="stylus">
#card-component
	min-width: 170px;
	max-width: 220px;
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
				transition:all .5s;
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
				transition:all .5s;
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
					transition:all .5s;
					opacity: 0;
					-webkit-transform: scale(0.1);
					-ms-transform: scale(0.1);
					-o-transform: scale(0.1);
					transform: scale(0.1);
					.icon
						font-size: 1.9em;
						display:block;
						padding-left:.2em;
						color:rgba(0,0,0,0.6);
			&:hover
				cursor:pointer;
				.singer-img
					transition:all .5s;
					-webkit-transform: scale(1.1);
					-ms-transform: scale(1.1);
					-o-transform: scale(1.1);
					transform: scale(1.1);
				.shadow-div
					transition:all .5s;
					opacity:1;
				.circle-icon
					transition:all .5s;
					opacity:1;
					-webkit-transform: scale(1);
					-ms-transform: scale(1);
					-o-transform: scale(1);
					transform: scale(1);
</style>
<style type="text/css">

</style>