// 0.定义数据，实际生产环境由服务器给出
var data = [
    {img:1,h2:'h2 caption',h3:'h3 caption'},
    {img:2,h2:'h2 caption',h3:'h3 caption'},
    {img:3,h2:'h2 caption',h3:'h3 caption'},
    {img:4,h2:'h2 caption',h3:'h3 caption'},
    {img:5,h2:'h2 caption',h3:'h3 caption'},
    {img:6,h2:'h2 caption',h3:'h3 caption'},
    {img:7,h2:'h2 caption',h3:'h3 caption'}
]

// 1.通用函数
function g(selector){
    method = selector.substr(0,1) == '.'?'getElementsByClassName':'getElementById';
    return document[method](selector.substr(1));
}

// 2.输出数据
function addSlider(data){
    var template_main = g('#template_main').innerHTML;
    var template_ctrl = g('#template_ctrl').innerHTML
                            .replace(/^\s*/,'').replace(/\s*$/,'');

    var out_main = [];
    var out_ctrl = [];

    for(i in data){
        var _html_main = template_main
                            .replace(/{{index}}/g,data[i].img)
                            .replace(/{{h2}}/,data[i].h2)
                            .replace(/{{h3}}/,data[i].h3)
                            .replace(/{{css}}/,['','main-i-right'][i%2]);
        var _html_ctrl = template_ctrl
                            .replace(/{{index}}/g,data[i].img)

        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);
    }
    g('#template_main').innerHTML = out_main.join('');
    g('#template_ctrl').innerHTML = out_ctrl.join('');

    g('#template_main').innerHTML += template_main
                            .replace(/{{index}}/g,'{{index}}')
                            .replace(/{{h2}}/,data[i].h2)
                            .replace(/{{h3}}/,data[i].h3);
    g('#main_{{index}}').id = 'main_background';
}

// 3.切换控制
function switchSlider(n){
    var mains = g('.main-i');
    var ctrls = g('.ctrl-i');

    for (var i=0;i<ctrls.length;i++){
        mains[i].classList.remove('main-active');
        ctrls[i].classList.remove('ctrl-active');
    }


    var main_active = g('#main_'+n);
    var ctrl_active = g('#ctrl_'+n);

    main_active.classList.add('main-active');
    ctrl_active.classList.add('ctrl-active');

    setTimeout(function(){
        g('#main_background').innerHTML = main_active.innerHTML;
    },1000);

}
// 动态调整图片位置 使其垂直居中
function movePictures(){
    var p = g('.picture');
    for (var i=0;i<p.length;i++){
        p[i].style.marginTop = (-1*p[i].clientHeight/2)+'px';
    }
}

window.onload = function(){
    addSlider(data);
    switchSlider(1);
    setTimeout(function(){
        movePictures();
    },100);
}