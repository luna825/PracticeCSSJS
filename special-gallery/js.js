// 1.翻转控制

function turn(elem){
    // var cls = elem.className;
    // if (/photo_front/.test(cls)){
    //     cls = cls.replace('photo_front','photo_back');
    // }else{
    //     cls = cls.replace('photo_back','photo_front');
    // }
    // return elem.className = cls

    // if (elem.classList.contains('photo_front')){
    //     elem.classList.remove('photo_front');
    //     elem.classList.add('photo_back');
    // }else{
    //     elem.classList.remove('photo_back');
    //     elem.classList.add('photo_front');
    // }
    var n = elem.id.split('_')[1];
    if ( !elem.classList.contains('photo-center')){
        return rsort(n);
    }

    elem.classList.toggle('photo_back');
    g('#nav_' + n).classList.toggle('i_back');
}

// 2输出数据

function addPhoto(data){
    var template = g('#wrap').innerHTML;
    var html = []
    var navs = []

    for (s in data){
        var _html = template.replace('{{index}}',s)
                                .replace('{{img}}',data[s].img)
                                .replace('{{caption}}',data[s].caption)
                                .replace('{{desc}}',data[s].desc);
        html.push(_html);
        navs.push('<span id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))" class="i">\
            <i class="icon-reply icon-large"></i></span>')
    }
    html.push('<div class="nav">'+navs.join('')+'</div>')
    g('#wrap').innerHTML = html.join('');
    rsort(random([0,data.length-1]));
}
addPhoto(data);
// 排序
function rsort(n){

    var _photos = g('.photo')
    var photos =[]
    for(var s=0;s<_photos.length;s++){
        // _photos[s].className = _photos[s].className.replace(/\s*photo-center\s*/,'');
        _photos[s].classList.remove('photo-center');
        _photos[s].classList.remove('photo_back');
        _photos[s].style.cssText = '';

        _photos[s].style['transform'] = 'rotate(360deg) scale(1.3)'
        photos.push(_photos[s]);
    }

    var photo_center = g('#photo_'+n);
    photo_center.classList.add('photo-center')

    photos.splice(n,1)

    var photos_left = photos.splice(0,Math.ceil(photos.length/2))
    var photos_right =photos

    var rangeXY = range()

    for (s in photos_left){
        photos_left[s].style.left = random(rangeXY.left.x)+'px';
        photos_left[s].style.top = random(rangeXY.left.y)+'px';

        photos_left[s].style['transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';

    }
    for (s in photos_right){
        photos_right[s].style.left = random(rangeXY.right.x)+'px';
        photos_right[s].style.top = random(rangeXY.right.y)+'px';

        photos_right[s].style['transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';

    }
    // 控制条选种样式添加
    var navs = g('.i');
    for (var s = 0;s<navs.length;s++){
        navs[s].classList.remove('i_currnt');
        navs[s].classList.remove('i_back')
    }

    g('#nav_'+n).classList.add('i_currnt');

}

// 4计算左右半区范围 返回{left:{x:[],y:[]},right:{x:[],y[]}}
function range(){
    var range = { left:{x:[],y:[]},right:{x:[],y:[]}};

    var wrap = {
        w: g('#wrap').clientWidth,
        h: g('#wrap').clientHeight
    }
    var photo = {
        w: g('.photo')[0].clientWidth,
        h: g('.photo')[0].clientHeight
    }

    range.left.x = [0 , wrap.w/2 - photo.w];
    range.left.y = [0 , wrap.h-photo.h]

    range.right.x = [wrap.w/2 + photo.w/2,wrap.w-photo.w];
    range.right.y = range.left.y;

    range.wrap = wrap;
    range.photo = photo;

    return range;

}

// 通用函数
function g(selector){
    var method = selector.substr(0,1)=='.'?'getElementsByClassName' : 'getElementById';
    return document[method](selector.substr(1));
}

// 范围随机数[x,y]
function random(range){
    var max = Math.max(range[0],range[1]);
    var min = Math.min(range[0],range[1]);

    var diff = max - min;
    return Math.ceil(Math.random()*diff + min);
}