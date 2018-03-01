<template>
	<div id="little-loop-component">
		<div class="parent-container">
			
		</div>
	</div>
</template>
<script type="text/javascript">
import one_card from './little_one_card';
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
		components: {
			"little-one-card":one_card
		}
	}
</script>
<style lang="stylus">
#little-loop-component
	width:100%;
	position:relative;
	height:100px;
	background-color:yellow;
	.parent-container
		height:100%;
		width:82%;
		background-color:green;
		position:absolute;
		left:9%;
		overflow:hidden;
	
</style>