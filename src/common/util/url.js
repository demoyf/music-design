const url="http://106.14.13.178:3000/";
const dev_url = "http://127.0.0.1:3000/";
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
	check_user_info:dev_url+"user/check",
	add_user:dev_url+"user/reg"
}
