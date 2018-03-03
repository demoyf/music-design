<template>
	<div id="little-one-card">
		<img-shadow class="img-container"></img-shadow>
		<div class="descripe-container">
				<p class="music-title-p">沉默是金</p>
				<p class="artist-name-p">张国荣</p>
		</div>
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
#little-one-card
	width:33%;
	overflow: hidden;
	.img-container
		width: 86px;
		height: 86px;
		float: left;
	.descripe-container
		max-width: 50%;
		font-size: 1em;
		font-weight: 400;
		float: left;
		>p
			width: 100%;
			height: 50%;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
</style>
