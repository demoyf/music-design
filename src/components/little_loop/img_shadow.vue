<template>
	<div id="img-shadow">
		<a :href="info.url" class="link-container">
			<img :src="info.img_url">
			<i class="mask-mod"></i>
		</a>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"img-shadow",
		props:["to_info"],
		data(){
			return {
				info:this.to_info
			}
		},
		methods:{

		},
		computed:{
			 
		},
		components:{

		}
	}
</script>
<style>
#img-shadow
	.link-container
		display:block;
		width:100%;
		height:100%;
		position:relative;
	.mask-mod
		width:100%;
		height:100%;
		background-color:rgba(0,0,0,0.1);


</style>
