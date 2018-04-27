
// 基础js
let getElem = function (selector) {         //获取元素
    return document.querySelector(selector);
};
let getAllElem = function (selector) {      //获取所有元素
    return document.querySelectorAll(selector);
};
let getCls = function (element) {           //获取样式
    return element.getAttribute('class');
};
let setCls = function (element,cls) {       //设置样式
    return element.setAttribute('class',cls);
};
let addCls = function (element,cls) {       //增加样式
    let baseCls = getCls(element);
    if(baseCls.indexOf(cls) === -1){         //判断是否样式已存在，若不存在则添加
        setCls(element,baseCls+' '+cls)
    }
};
let delCls = function (element,cls) {       //删除样式
    let baseCls = getCls(element);
    if(baseCls.indexOf(cls) !== -1){        //判断样式是否存在，若存在就删除
        setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
    }
};

// 1.初始化样式
const screenAnimateElements = {             //有动画效果的元素
    '.screen-1':[
        '.screen-1__heading',
        '.screen-1__phone',
        '.screen-1__shadow'
    ],
    '.screen-2':[
        '.screen-2__heading',
        '.screen-2__subheading',
        '.screen-2__phone',
        '.screen-2__point_i_1',
        '.screen-2__point_i_2',
        '.screen-2__point_i_3',
    ],
    '.screen-3':[
        '.screen-3__heading',
        '.screen-3__subheading',
        '.screen-3__phone',
        '.screen-3__features'
    ],
    '.screen-4':[
        '.screen-4__heading',
        '.screen-4__subheading',
        '.screen-4__type-item_i_1',
        '.screen-4__type-item_i_2',
        '.screen-4__type-item_i_3',
        '.screen-4__type-item_i_4',
    ],
    '.screen-5':[
        '.screen-5__heading',
        '.screen-5__subheading',
        '.screen-5__back'
    ]
};
let setScreenAnimateInit = function (e) {
    let screen = document.querySelector(e);
    let animateElements = screenAnimateElements[e];
    for(let i=0;i<animateElements.length;i++){
        let element = document.querySelector(animateElements[i]);
        let baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls+' '+animateElements[i].substring(1)+'_animate_init');
    }
};
let playScreenAnimateDone = function (e) {
    let screen = document.querySelector(e);
    let animateElements = screenAnimateElements[e];
    for(let i=0;i<animateElements.length;i++){
        let element = document.querySelector(animateElements[i]);
        let baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
    }
};
window.onload = function () {
    for(let k in screenAnimateElements){
        if(k==='.screen-1'){
            continue;
        }
        setScreenAnimateInit(k);
    }
};

// 2.滚动屏幕播放动画
let navItems = getAllElem('.header__nav-item');
let outlineItems = getAllElem('.outline__item');
let switchNavItemsActive = function (idx) {
    for(let i = 0;i<navItems.length;i++){
        delCls(navItems[i],'header__nav-item_status_active');
    }
    addCls(navItems[idx],'header__nav-item_status_active');
    for(let i = 0;i<outlineItems.length;i++){
        delCls(outlineItems[i],'outline__item_status_active');
    }
    addCls(outlineItems[idx],'outline__item_status_active');
};
switchNavItemsActive(0);
window.onscroll = function () {
    let top = document.documentElement.scrollTop;
    if(top>80){
        addCls(getElem('.header'),'header_status_back');
        addCls(getElem('.outline'),'outline_status_in');
    }else {
        delCls(getElem('.header'),'header_status_back');
        delCls(getElem('.outline'),'outline_status_in');
    }
    switchNavItemsActive(0);
    if(top>1){

    }
    if(top>700){
        playScreenAnimateDone('.screen-2');
        switchNavItemsActive(1);
    }
    if(top>1500){
        playScreenAnimateDone('.screen-3');
        switchNavItemsActive(2);
    }
    if(top>2300){
        playScreenAnimateDone('.screen-4');
        switchNavItemsActive(3);
    }
    if(top>3100){
        playScreenAnimateDone('.screen-5');
        switchNavItemsActive(4);
    }
};
// 3.导航定位

let setNavJump = function (i,lib) {
    let item = lib[i];
    item.onclick=function () {
        document.documentElement.scrollTop = i*800;
    };
};
for(let i = 0;i<navItems.length;i++){
    setNavJump(i,navItems);
}
for(let i = 0;i<outlineItems.length;i++){
    setNavJump(i,outlineItems);
}

// 默认播放第一屏动画
setTimeout(function () {
    console.log("123");
    playScreenAnimateDone('.screen-1');
},200);

