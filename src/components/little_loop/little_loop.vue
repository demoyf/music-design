<template>
	<div id="little-loop-component">
		<div class="parent-container">
			<little-one-card></little-one-card>
		</div>
	</div>
</template>
<script type="text/javascript">
import one_card from './little_one_card.vue';
	export default {
		name:"little-loop-component",
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
		},
		mounted(){

		}
	}
</script>
<style lang="stylus">
#little-loop-component
	width:100%;
	position:relative;
	height:100px;
	.parent-container
		height:100%;
		width:82%;
		position:absolute;
		left:9%;
		overflow:hidden;
</style>
