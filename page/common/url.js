const url="http://106.14.13.178:3000/";
const dev_url = "http://106.14.13.178:3000/"
export default {
	search_suggestion:url+"search/suggesstion/",//need query
	search_all:url+"search/all/",//need query type
	billboard:url+"billboard/",//need query type
	get_new_song:url+"song/new_song/",//not need
	get_song_by_id:url+"song/get_song/",//need song_id
	get_artist_song_lsit:url+"song/song_list/",//need tinguid artisitid page,
	get_hot_artsit:url+"artist/hot_artist/",
	get_artist_by_id:url+"artist/get_artist/",//need tinguid artisitid
	get_new_album:url+"album/new_album/",//not need
	get_album_info:url+"album/album_info/",//need albumid
	get_artist_album:url+"album/artist_album/",//need tinguid page
	forum_url:dev_url+"forum/publish",
	user_info_url:dev_url+"user/info/",
	get_time_forum:dev_url+"forum/time_forum/",
	get_hot_forum:dev_url+"forum/hot_forum/",
	get_type_time_forum:dev_url+"forum/type_time/",
	get_type_hot_forum:dev_url+"forum/type_comment/",
	get_search_forum:dev_url+"forum/search/",
	report_user:dev_url+"user/report/",
	report_tag:dev_url+"forum/report/",
	delete_forum:dev_url+"user/ban_forum/",
	delete_user:dev_url+"user/ban/",
	forum_content_url:dev_url+"forum/forum_content/",
	publish_comment:dev_url+"comment/publish_comment/",
	get_comment_url:dev_url+"comment/get_comment/",
	delete_comment:dev_url+"comment/delete/"
}
