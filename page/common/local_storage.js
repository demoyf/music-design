export function save_to_array(item,key = "history") {
  if (window.localStorage) {
    const storage = window.localStorage;
    let obj = storage.getItem(key);
    if (obj) {
      obj = JSON.parse(obj);
      if (obj.data) {
        if (obj.data.indexOf(item)>=0) {
          return;
        }
        if (obj.data.length==6) {
          obj.data.shift();
          obj.data.push(item);
        }else{
          obj.data = obj.data.concat(item);
        }
      } else {
        obj.data = [].concat(item);
      }
    } else {
      obj = {};
      obj.data = [].concat(item);
    }
  	storage.setItem(key, JSON.stringify(obj));
  }
}

export function read_form_array(key = "history") {
  if (window.localStorage) {
    const storage = window.localStorage;
    let res = storage.getItem(key);
    if (typeof res === "string") {
      res = JSON.parse(res);
    }
    if (res&&res.data) {
      return res.data;
    } else {
      return [];
    }
  }
}
export function save_item(key = "history",item) {
  if (window.localStorage) {
    localStorage.setItem(key,item);
  }
}
export function read_item(key = "history") {
  if (window.localStorage) {
   return localStorage.getItem(key);
  }
}
export function clear_item(key="history") {
	if(window.localStorage){
		window.localStorage.removeItem(key);
	}
}

export function clear_all() {
	// body...
	if (window.localStorage) {
		window.localStorage.clear();
	}
}
