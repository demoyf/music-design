<template>
	<div id="little-one-card">
		<img-shadow class="img-container"></img-shadow>
		<div class="descripe-container">
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
	.img-container
		width: 82px;
		height: 82px;
</style>
