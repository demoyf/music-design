class VueRoll{
  constructor(vue,parent_query,roll_query){
    this.Vue = vue;
    this.init(parent_query,roll_query);
  }
  // new 之后需要build，在nextTick里面创建和调用
  init(parent_query,roll_query){
    let vue = this.Vue;
    this.parent = vue.$refs[parent_query];
    this.children = vue.$refs[roll_query];
    this.current = 1;
    this.active_index = 1;
    vue = null;
  }
  build(transition_class,count){
    let parent = this.parent;
    let childrens = this.children;
    let _count = childrens.length;
    let child_width = (100/_count).toFixed(2)+"%";
    parent.style.width = 100*_count+"%";
    for(let i = 0;i<_count;i++){
      childrens[i].style.width = child_width;
    }
    this.transition_class = transition_class;
    this.is_transition = false;
    this.count = count;
  }
  bind_transition_listener(target_class){
    // 绑定transitionend，需要轮播，跳转回第一个
    let _transition_class = this.transition_class;
    this.parent.addEventListener("transitionend",(event)=>{
      if(event.target.classList.contains(target_class)){
      this.is_transition = false;
      console.log("end");
      let _count = this.count;
      let _current = this.current;
      let _parent = this.parent;
      console.log(_count);
      // 结束的时候，是在第一个（伪装的最后一个），需要瞬间跳回最后一个
      if(_current<=0){
        this.current = _count;
        if (_parent.classList.contains(_transition_class)) {
          _parent.classList.remove(_transition_class);
        }
        _parent.style.left = -this.current*100+"%";
        return;
      }
      // 结束的时候，是在最后一个（伪装的第一个），需要瞬间跳回第一个
      if(_current>_count){
        this.current = 1;
        if (_parent.classList.contains(_transition_class)) {
          _parent.classList.remove(_transition_class);
        }
        _parent.style.left = -this.current*100+"%";
        return;
      }
    }
    },true);
  }
  to_left(){
    if (this.is_transition) {
      return;
    }
    let _transition_class = this.transition_class;
    let _current = --this.current;
    this.is_transition = true;
    let container = this.parent;
    if (!container.classList.contains(_transition_class)) {
      container.classList.add(_transition_class);
    }
    if (_current<=0) {
      this.active_index = this.count;
    }else{
      this.active_index = _current;
    }
    container.style.left = -_current*100+"%";
  }
  to_right(){
    //0 -100 1 -200 2 - 300 3
    if (this.is_transition) {//动画过程中，点击无效
      return;
    }
    console.log(this.current);
    let _transition_class = this.transition_class;
    let _current = ++this.current;
    // 因为需要瞬间回到第一或者最后一个，所以transition还是要可控
    let container = this.parent;
    if (!container.classList.contains(_transition_class)) {
      container.classList.add(_transition_class);
    }
    if (_current>this.count) {
      this.active_index = 1;
    }else{
      this.active_index = _current;
    }
    this.is_transition = true;
    container.style.left = -_current*100+"%";
  }
  to_index(index){
    let _current = this.current;
    if(index===_current){
      return;
    }
    console.log("index:"+index);
    if (this.is_transition) {//动画过程中，点击无效
      return;
    }
    _current += index-_current;
    this.current = _current;
    // 因为需要瞬间回到第一或者最后一个，所以transition还是要可控
    let container = this.parent;
    if (!container.classList.contains("add_transition")) {
      container.classList.add('add_transition');
    }
    if (_current>this.count) {
      this.active_index = 1;
    }else{
      this.active_index = _current;
    }
    this.is_transition = true;
    container.style.left = -_current*100+"%";
  }
  get_active(){
    return this.active_index;
  }
  set_active(index){
    this.active_index = index;
  }
  set_current(current){
    this.current = current;
  }
  get_current(){
    return this.current;
  }
}

export default VueRoll;
