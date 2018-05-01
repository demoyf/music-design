export default {
  slove(text){
    let lrc_array = text.split("\n");
    let res_list = [];
    for(let key in lrc_array){
      let item = lrc_array[key];
      let matches = item.match(/\[\d{2}:\d{2}\.\d{2}\]/ig);
      if(!matches||matches.length==0){
        continue;
      }
      else{
        let time = item.substr(1,8);
        let lrc_text = item.replace(/\[\d{2}:\d{2}\.\d{2}\]/ig,'');
        lrc_text = lrc_text.trim();
        let has_text = (lrc_text!="");
        let m = parseInt(time.substr(0,2));
        let s = parseInt(time.substr(3,2));
        let ms = parseInt(time.substr(6,2));
        let duration = m*60*1000+s*1000+ms*10;
        let obj = {
          time:duration,
          lrc_text:lrc_text,
          has_text:has_text
        }
        res_list.push(obj);
      }
    }
    return res_list;
  }
}
