/**
 * Created by lenovo on 2017/10/28.
 */
/*function $(str){
    var dom;
    if(str.charAt(0)=='.'){
        dom = document.getElementsByClassName(str.slice(1));
    }else if(str.charAt(0)=='#'){
        dom = document.getElementById(str.slice(1));
    }else{
        dom = document.getElementsByTagName(str);
    }
    return dom;
}*/

function getStyle(){
    var obj = arguments[0];
    var arr = arguments.length>2?{}:'';

    if(typeof arr=='string'){
        arr = !obj.currentStyle?getComputedStyle(obj)[arguments[1]]:obj.currentStyle[arguments[1]];
    }else{
        for(var i=1;i<arguments.length;i++){
            arr[arguments[i]] = !obj.currentStyle?getComputedStyle(obj)[arguments[i]]:obj.currentStyle[arguments[i]];
        }
    }
    return arr;
}

//封装move
function move(obj,attr,speed,end,callBack){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var attrVal = parseFloat(getStyle(obj,attr));
        var s = attrVal+speed;//下一帧的位置
        if(speed<0){
            if(s<=end){
                s=end;
                clearInterval(obj.timer);
            }
        }
        if(speed>0){
            if(s>=end){
                s=end;
                clearInterval(obj.timer);
            }
        }
        obj.style[attr] = s +'px';
        if(s==end)callBack&&callBack();
    },30);
}
//MTween 时间版的运动函数
function  MTween(opt){

    //end   unit  begin

    var option = {
        obj:'',
        begins:{},
        attrs:{},
        duration:0,
        way:'linear',
        callBack:function(){}
    };

    //用传入的参数覆盖默认值
    for(var key in option){
        if(opt[key]){
            option[key] = opt[key];
        }
    }

    console.log(option);

    //为了不再修改下面更多的代码，在这里做一次变量的适配
    var obj = option.obj;
    var attrs = option.attrs;
    var duration = option.duration;
    var way = option.way;
    var callBack = option.callBack;
    var begins = option.begins;

//        console.log(Tween[way],way,option.way);
//
//        return;



    if(obj.isAnim) return;

    //obj开始运动了  自定义属性
    obj.isAnim = true;


    var starts = {};

    //获取传入属性的开始位置
    for(var key in attrs){
//            console.log(key);
        starts[key] = parseFloat(begins[key])||parseFloat(getStyle(obj,key))||0;
    }

    console.log(starts);

    //对应的单位
    var uintes = {};
    for(var key in attrs){
//            console.log(attrs[key]);
        //不是字符串的直接跳出
        if(typeof attrs[key]!='string') continue;

        var num = parseFloat(attrs[key]);
        var arr = attrs[key].split(num);
//            console.log(arr);
        uintes[key] = arr[1];
    }

    // console.log(uintes);

//        var start = parseFloat(begin)||parseFloat(getStyle(obj,attr))||0;//起始位置  如果begin未传值，那就就尝试获取传入的属性值，如果属性值获取失败，就默认为0
//        console.log(start);
//        var end = 1000;//目标点
//        var duration = 1000;//动画执行的总时间 单位是毫秒
    var startTime = Date.now();

    //所有的属性的总路程
    var allS = {};
    for(var key in attrs){
        if(key=='transform.scale'){
            console.log(attrs[key]);
        }
        allS[key] = parseFloat(attrs[key])-starts[key]||0;
    }

    // console.log(allS);
//        var s = end - start; //总路程

//        var v = s/duration; //计算出来的速度


    //每次20ms走一帧
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        // console.log(attr);

        var endTime = Date.now();

        //计算出当前时间
        var t = endTime-startTime;

        if(t>=duration){
            t = duration;
            clearInterval(timer);//到达目标点要清除定时器
        }
//            console.log(t,start,s,duration);
//            console.log(Tween[way](t,start,s,duration));

        //运动的属性
        for(var key in attrs){

            obj.style[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');


            //透明度的兼容处理
            if(key=='opacity'){
                obj.style.filter = 'Alpha(opacity='+Tween[way](t,starts[key],allS[key],duration)*100+')';
            }

            //处理scrollTop
            if(key=='scrollTop'||key=='scrollLeft'){
                obj[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');
            }
            if(key=='offsetTop'||key=='offsetLeft'){
                obj[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');
            }


            //transform 的处理
            var attr1 = key.split('.');
            if(attr1.length>1&&attr1[0]=='transform'){
                if(attr1[1]=='scale'){
                    obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,starts[key],allS[key],duration)+')';
                }else if(attr1[1]=='rotateZ'){
                    obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,starts[key],allS[key],duration)+'deg)';
                }

            }


        }




        if(t==duration){
            obj.isAnim = false;
            //等到上一个动画完成 然后再调用
            if(callBack){
                callBack(obj);
            }
        }


    },20);


    obj.clearInterval = function(){
        clearInterval(timer);
        obj.isAnim = false;
    };
}
/*//封装MTween函数
function MTween(obj,attr,end,duration,unit,way,callBack){
    if(obj.isAnim) return;
    //true表示函数正在执行过程中，避免事件触发此函数同时进行多次
    obj.isAnim=true;
    //当不设置运动方式时，默认为linear
    if(!way){
        way='linear';
    }
    if(!unit){
        unit='';
    }
    //起始位置为元素某个属性的默认值
    var start = parseFloat(getStyle(obj,attr));
    //起始时间是运动开始前捕获的当前Date.now时间
    var startTime = Date.now();
    //总路程=目标点-起始点
    var s = end - start;
    //开启定时器前先清除
    clearInterval(timer);
    //设置定时器开关指向ID
    var timer = 0;
    timer = setInterval(function(){
        //每次执行获取当次执行结束的时间
        var endTime = Date.now();
        //这个时间差不断增大，为运动从开始到当前一共花费的时间
        var t = endTime - startTime;
        //当这个实际运动的时间=预设的总共运动的时间，表示到达目标位置，关闭定时器
        if(t>=duration){
            t=duration;
            clearInterval(timer);
        }
        //这是把Tween对应的值和运动方式回传到元素，生成新的属性值，这里的t、start、s、duration对于Tween而言是实参，需要对应好Tween中形参所表示的含义的相应位置
        obj.style[attr]=Tween[way](t,start,s,duration)+unit;
        if(attr=='opacity'){
            obj.style.filter='Alpha(opacity='+Tween[way](t,start,s,duration)*100+');'
        }
        //当时间等于预设时间时，到达目标点，运动执行完毕，用false表示执行完毕，此时允许通过实践再次触发此函数，后判断如果有回调函数则执行回调函数
        if(t==duration){
            obj.isAnim=false;
            callBack&&callBack();
        }
    },20);

}*/

/*
//MTween 时间版的运动函数
function  MTween(obj,attr,end,duration,way,callBack) {
    if (obj.isAnim) return;
    //obj开始运动了  自定义属性
    obj.isAnim = true;
    if (!way) { //如果用户没有选择运动方式就默认匀速
        way = 'linear';
    }
    var start = parseFloat(getStyle(obj, attr));//起始位置
    var startTime = Date.now();
    var s = end - start; //总路程
    //每次20ms走一帧
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function () {
        var endTime = Date.now();
        //计算出当前时间
        var t = endTime - startTime;
        if (t >= duration) {
            t = duration;
            clearInterval(timer);//到达目标点要清除定时器
        }
        obj.style[attr] = Tween[way](t, start, s, duration) + 'px';
        if (t == duration) {
            obj.isAnim = false;
            //等到上一个动画完成 然后再调用
            if (callBack) {
                callBack();
            }
        }
    }, 20);
}*/



//抖动函数：
/*
 * obj: 抖动的对象
 * attr: 抖动的属性
 *
 * */
function shake(obj,attr,s,f,callBack){
//        var s = 40; //最大偏移量
//        var f = 10; //衰退值
//        console.log(obj.isShake);
    if(obj.isShake) return;
    obj.isShake = true;

    var oldSite = parseFloat(getStyle(obj,attr));//抖动之前的位置

//    var arr = [-10,10,-5,5,0];
    var arr = [];

//    for(var i=0;i<?;i++){
//        arr[i] = -s;
//        arr[i+1] = s;
//    } for循环无法实现 改用while循环

    while(s>0){ //创造抖动的偏移量集合
        arr[arr.length] = -s;
        arr[arr.length] = s;
        s -= f;
    }
    arr[arr.length] = 0;//加上一个0
//        console.log(arr);

    var num = 0;
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        obj.style[attr] = oldSite+arr[num]+'px';
        if(arr[num]==0){
            clearInterval(timer);
            obj.isShake = false;
        }
        if(arr[num]==0) callBack&&callBack();
        num++;
    },30);
}


//修改search某一个值的函数 如果不传任何参数，将返回一个包含search属性值的对象
function editSearch(name,value,bool){
    var search = window.location.search;// typeof => string

    console.log(search);

    //如果要修改某个值  先把字符串转成对象

    //?user=yinwei&pwd=123456

    var info = search.substring(1);


    //把对应的信息分组
    var info = info.split('&');

    if(!search){
        info = [];
    }


    var searchObj = {};

    //info已经是一个数组，需要遍历拆分
    for(var i=0;i<info.length;i++){
        var arr = info[i].split('=');


        searchObj[arr[0]] = arr[1];
    }


    if(arguments.length==0){
        //如果没有传入任何参数，那么程序就假定用户可能是需要search的对象
        return searchObj;
    }



    searchObj[name] = value;//改值

    //把改好的值在拼接回字符串
    var arr = [];
    var n = 0;
    for(key in searchObj){
        arr[n] = key + '=' +searchObj[key];
        n++;
    }

    console.log(arr);
    search = '';
    for(var i=0;i<arr.length;i++){
        search += arr[i]+'&';
    }

//        console.log(search.slice(0,-1));

    if(bool){ //有时候并不希望直接刷新页面
        return search.slice(0,-1);
    }


    window.location.search = search.slice(0,-1);

}


//补零
function format(num){
    return num<10?'0'+num:''+num;
}

//拖拽：
function drag(option){

    var opt = {
        obj:option.obj||null,
        move:option.move||null,
        up:option.up||null
    };

    // var fn = function(o,l,t){};

    var div = opt.obj;//偷懒 转换对象

    //给拖拽的元素添加mousedown事件
    div.onmousedown = function(ev){

        var ev = ev || event;

        ev.preventDefault();

        //鼠标当前点：
        var x1 = ev.clientX;
        var y1 = ev.clientY;

        //元素当前的位置：
        var l = div.offsetLeft;
        var t = div.offsetTop;

        document.onmousemove = function(ev){

            var ev = ev || event;

            ev.preventDefault();

            //移动过程中的鼠标位置
            var x2 = ev.clientX;
            var y2 = ev.clientY;


            //计算div要移动的距离
            var x = x2-x1;
            var y = y2-y1;

            // function fn(o,l,t){}

            if(opt.move){
                opt.move(div,l+x,t+y);
            }else{
                //设置div的属性
                div.style.left = l+x+'px';
                div.style.top = t+y+'px';
            }


        };

        document.onmouseup = function(){
            //鼠标抬起取消事件；
            document.onmousemove = null;

            if(opt.up){
                opt.up(div);
            }
        };



    };
}

//检测碰撞
function boom(option){

    var opt = {
        obj:option.obj||null,
        ele:option.ele||null,
        Boom:option.Boom||null,
        unBoom:option.unBoom||null,
        callBack:option.callBack||null
    }

    var a1 = opt.obj;
    var eles = opt.ele;

    //a1的中心点
    var x1 = a1.offsetLeft+a1.offsetWidth/2;
    var y1 = a1.offsetTop+a1.offsetHeight/2;


    //除了被抓到的元素  其他元素都是碰撞元素
    var minObj = {
        s:0, //距离
        o:null //元素
    };
    for(var i=0;i<eles.length;i++){

        //其他的就是被碰撞元素
        var a2 = eles[i];

        //a2 的中心点：
        var x2 = a2.offsetLeft+a2.offsetWidth/2;
        var y2 = a2.offsetTop+a2.offsetHeight/2;

        //计算出x和y的距离
        var x = Math.abs(x1-x2);
        var y = Math.abs(y1-y2);

        //碰撞时的最大距离
        var maxW = a1.offsetWidth/2+a2.offsetWidth/2;
        var maxH = a1.offsetHeight/2+a2.offsetHeight/2;

        //已知条件： x ， y  w h
        if(x<=maxW&&y<=maxH){
            if(opt.Boom){
                opt.Boom(a2);
            }

            //检测中心点距离
            var c = Math.sqrt(x*x+y*y);

            if(minObj.o){
                //如有已经有元素了 ，就对比距离（s）值的大小，谁的更小就把谁换进去
                if(c<minObj.s){
                    minObj.s = c;
                    minObj.o = a2;
                }
            }else{
                //没有元素的时候 就把当前这个元素存进去
                minObj.s = c;
                minObj.o = a2;
            }


        }else{
            if(opt.unBoom){
                opt.unBoom(a2);
            }
        }


    }

    //如果有里的最近的元素存入，就执行回调
    if(minObj.o) opt.callBack&&opt.callBack(minObj.o);
}
//框选
function kxBox(option){

    var box = option.box||null;
    var eles =option.eles||[];
    var fn1 = option.colli||null;
    var fn2 = option.uncolli||null;


    //是否触发点击事件的开关：
    var onoff = true;

//        document.onclick = function(){
//            if(!onoff) return;
//        };

    //制作一个选框
    box.onmousedown = function(ev){

        var ev = ev || event;

        ev.preventDefault();

        var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;

        var div = document.createElement('div');
        div.className = 'mask';//选框的初始样式

        var x1 = ev.clientX;
        var y1 =ev.clientY;

        //定位选框
        div.style.left = x1+'px';
        div.style.top = y1+scrollTop+'px';

        //放body中
        box.appendChild(div);

        document.onmousemove = function(ev){

            var ev = ev||event;

            ev.preventDefault();//清除默认行为

            var x2 = ev.clientX;
            var y2 = ev.clientY;


            //计算鼠标移动的距离：
            var x = Math.abs(x2-x1);
            var y = Math.abs(y2-y1);

            if(x>4&&y>4){ //解决点击事件的冲突
                div.style.display = 'block';
                onoff = false;//不允许触发点击事件
            }

            //边界处理：
            if(x2<box.offsetLeft+box.clientLeft){
                x = x1-(box.offsetLeft+box.clientLeft);
            }
            if(x2>box.offsetLeft+box.clientWidth){
                x = box.offsetLeft+box.clientWidth-x1;
            }

            if(y2<box.offsetTop+box.clientTop){
                y = y1-(box.offsetTop+box.clientTop);
            }
            if(y2>box.offsetTop+box.clientHeight){
                y = box.offsetTop+box.clientHeight-y1;
            }

            if(x2-x1<0){
                div.style.left = x1-x+'px';
            }else{
                //还原left位置
                div.style.left = x1+'px';
            }
            if(y2-y1<0){
                div.style.top = y1-y+scrollTop+'px';
            }else{
                //还原top位置
                div.style.top = y1+scrollTop+'px';
            }

            div.style.width = x+'px';
            div.style.height = y+'px';


            //检测碰撞：
            boom(div,eles,function(element){
                //碰上了加样式
                fn1&&fn1(element);
            },function(element){
                //没碰上清除样式
                fn2&&fn2(element);
            });

        };



        document.onmouseup = function(){
            //清除mark
            box.removeChild(div);

            setTimeout(function(){
                onoff = true;
            },100);

            document.onmousemove = null;//注销移动事件
            document.onmouseup = null;//注销事件
        };


    };
}
//滚动
function wheel(option){
    if(!option){
        return false;
    }
    var opt = {
        obj:option.obj||document,
        up:option.up||null,
        down:option.down||null
    };

    opt.obj.onmousewheel = function(ev){
        var ev = ev||event;
        ev.preventDefault();
        if(ev.wheelDelta<0){
            opt.down&&opt.down();
        }
        if(ev.wheelDelta>0){
            opt.up&&opt.up();
        }
    };

    opt.obj.addEventListener('DOMMouseWheel',function(ev){
        var ev = ev||event;
        ev.preventDefault();
        if(ev.detail>0){
            opt.down&&opt.down();
        }
        if(ev.detail<0){
            opt.up&&opt.up();
        }
    });
}