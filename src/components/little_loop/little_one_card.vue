<template>
	<div class="little-one-card">
		<img-shadow class="img-container" :img-url="get_music_url()"></img-shadow>
		<div class="descripe-container">
				<p class="music-title-p"
				:data-song-id="my_song_item.song_id">{{my_song_item.title}}</p>
				<p class="artist-name-p" :data-tinguid="my_song_item.ting_uid"
				:data-artistid="my_song_item.artist_id">{{my_song_item.author}}</p>
		</div>
		<p class="music-duration">{{get_file_duration()}}</p>
	</div>
</template>
<script type="text/javascript">
import img_shadow from './img_shadow.vue';
export default {
	name:"little-one-card",
	props:['songItem'],
	data(){
		return {
			mock_list:[],
			my_song_item:this.songItem,
			img_url:{}
		}
	},
	methods:{
		get_file_duration(){
			let file_duration = parseInt(this.my_song_item.file_duration);
			let result = "";
			let minute = Math.ceil(file_duration/60);
			result+=minute>=10?minute:("0"+minute);
			result+=":";
			let second = file_duration%60;
			result+=second>=10?second:"0"+second;
			return result;
		},
		get_music_url(){
			let url = this.my_song_item.pic_small;
			let music_url = {
				img_url:url,
				song_id:this.my_song_item.song_id
			}
			this.img_url = music_url;
			return this.img_url;
		}
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
@import "../../common/stylus/mixin.styl";
.little-one-card
	width:32%;
	margin-right: 1%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	border-top: 1px solid #99999933;
	padding-top: 1em;
	padding-bottom: 1em;
	float: left;
	.img-container
		width: 86px;
		height: 86px;
		float: left;
		&::after
			content: '';
			clear: both;
	.descripe-container
		max-width: 50%;
		font-size: 1em;
		font-weight: 400;
		float: left;
		&::after
			content: '';
			clear: both;
		>p
			width: 100%;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			padding: 0 0 0 .7em;
			line-height: 1.5em;
			&:hover
				color: music-color;
				cursor: pointer;
		.music-title-p
			color: #333;
			margin-top: 1em;
		.artist-name-p
			color: #999;
			font-size: .93em;
	.music-duration
		float: right;
		height: 100%;
		line-height: 86px;
		color: #999;
		&::after
			content: '';
			clear: both;
</style>
