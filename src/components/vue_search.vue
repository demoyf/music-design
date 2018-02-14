<template>
	<div id="vue-search">
		<div class="input-container">
		<input placeholder="歌曲名、歌手名、专辑名" class="search-input" type="text" name="search-input">
		<i class="icon-search-icon icon">
		</i>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"vue-search",
		data(){

		}
	}
</script>
<style type="stylesheet/stylus" lang="stylus">
music-color = #31c27c
#vue-search
	color:rgba(0,0,0,0.8);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.input-container
		display:flex;
		flex-direction:row;
		border:1px solid rgba(0,0,0,0.8);
		align-items:center;
		border-radius:2px;
		padding:3px;
		.search-input
			display: inline-block;
			height:25px;
			padding:3px;
		.icon
			display:block;
			color:gray;
			font-size:1.1em;
			&:hover
				color:music-color;
				cursor:pointer;		
@media(max-width:1120px)
	#vue-search .input-container
		background-color:red;
</style>