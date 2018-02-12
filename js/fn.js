
/**
 * Created by lenovo on 2018/1/21.
 */
function checkSong(timer){

    $('.song-item').on('mouseover',function(){
        if($(this).hasClass('song-active')) return;
        $(this).addClass('song-move');
    });
    $('.song-item').on('mouseout',function(){
        if($(this).hasClass('song-active')) return;
        $(this).removeClass('song-move');

    });
    $('.prev').on('click',function(){
        var song = $('.song-active').prev().length==0?$('.song-item:last'):$('.song-active').prev();
        $('.song-item').each(function(){
            $(this).removeClass('song-active song-move');
        });
        $(song).addClass('song-active');
        $.ajax({
            url:'../../airmusic/js/songlist.json',
            data:{
                songlist:[]
            },
            type:'get',
            dataType:'json',
            success:(data)=>{
                let action_song = data.songlist.filter(v=>{
                    return $(song).attr("index") == v.id;
                });
                let songsrc = action_song[0].songlink;
                $('audio').attr('src',songsrc);
                let audio = $('audio').get(0);
                audio.currentTime = 0;
                clearInterval(timer);
                timer = setInterval(()=>{
                    $('.now-time').html(currTime(audio.currentTime));
                    getLeft($('.bar'),audio.currentTime,audio.duration);
                    console.log(audio.currentTime);
                },900);
                audio.play();
            },
            error:(err)=>{
                console.log(err.responseText);
            }
        });
        $('.singer').html($(song).find('.singer-name').html());
        $('.music-box').find('.song-name').html($(song).find('.song-name').html());
        $('.music-box').find('.time').html($(song).find('.time').html());
        $('.playbtn').find('div:first').hide().next().show();
        var time = setTimeout(()=>{$('.full-time').html(currTime(audio.duration));},500);
    });
    $('.next').on('click',function(){
        var song = $('.song-active').next().length==0?$('.song-list').find('li:first'):$('.song-active').next();
        $('.song-item').each(function(){
            $(this).removeClass('song-active song-move');
        });
        $(song).addClass('song-active');
        $.ajax({
            url:'../../airmusic/js/songlist.json',
            data:{
                songlist:[]
            },
            type:'get',
            dataType:'json',
            success:(data)=>{
                let action_song = data.songlist.filter(v=>{
                    return $(song).attr("index") == v.id;
                });
                console.log(1);
                let songsrc = action_song[0].songlink;
                $('audio').attr('src',songsrc);
                let audio = $('audio').get(0);
                audio.currentTime = 0;
                clearInterval(timer);
                timer = setInterval(()=>{
                    $('.now-time').html(currTime(audio.currentTime));
                    console.log(2);
                    getLeft($('.bar'),audio.currentTime,audio.duration);
                    console.log(audio.currentTime);
                },900);
                audio.play();
            },
            error:(err)=>{
                console.log(err.responseText);
            }
        });
        $('.singer').html($(song).find('.singer-name').html());
        $('.music-box').find('.song-name').html($(song).find('.song-name').html());
        $('.music-box').find('.time').html($(song).find('.time').html());
        $('.playbtn').find('div:first').hide().next().show();
        var time = setTimeout(()=>{$('.full-time').html(currTime(audio.duration));},500);
    });
    $('.song-item').on('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.song-item').each(function(){
            $(this).removeClass('song-active song-move');
        });
        $.ajax({
            url:'../../airmusic/js/songlist.json',
            data:{
                songlist:[]
            },
            type:'get',
            dataType:'json',
            success:(data)=>{
                let song = data.songlist.filter(v=>{
                    return $(this).attr("index") == v.id;
                });
                console.log(song[0]);
                let songsrc = song[0].songlink;
                $('audio').attr('src',songsrc);
                let audio = $('audio').get(0);
                audio.currentTime = 0;
                clearInterval(timer);
                timer = setInterval(()=>{
                    $('.now-time').html(currTime(audio.currentTime));
                    getLeft($('.bar'),audio.currentTime,audio.duration);
                    console.log(audio.currentTime);
                },900);
                audio.play();
            },
            error:(err)=>{
                console.log(err.responseText);
            }
        });
        $(this).addClass('song-active');
        $('.singer').html($(this).find('.singer-name').html());
        $('.music-box').find('.song-name').html($(this).find('.song-name').html());
        $('.music-box').find('.time').html($(this).find('.time').html());
        $('.playbtn').find('div:first').hide().next().show();
        var time = setTimeout(()=>{$('.full-time').html(currTime(audio.duration));},500);
    });
}
function songlist(timer){
    $.ajax({
        url:'../../airmusic/js/songlist.json',
        data:{
            songlist:[]
        },
        type:'get',
        dataType:'json',
        success:(data)=>{
            let songlist = data.songlist,
                list = '',
                num = 0;
            songlist.map((v,i)=>{
               return $(v).attr('index',i);
            });
            for(let key in songlist){
                num ++;
                num = num>9 ? num : '0'+num ;
                list += `<li class="song-item" num="${songlist[key].index}" index="${songlist[key].id}">
                            <span class="index-box fl">
                                <span class="index-ico ico1">
                                    <i class="fa fa-play"></i>
                                </span>
                                <span class="index-ico ico2">
                                    <i class="fa fa-music"></i>
                                </span>
                                <span class="song-index">${num}</span>
                            </span>
                            <img src="${songlist[key].img}" class="fl" alt="${songlist[key].songName}"/>
                            <p class="fl">
                                <span class="singer-name">${songlist[key].singer}</span>
                                <span class="song">
                                    <span class="song-name">${songlist[key].songName}</span>
                                    <span>&nbsp;(&nbsp;<span class="time">${songlist[key].filetime}</span>&nbsp;)&nbsp;</span>
                                </span>
                            </p>
                        </li>`
            }
            $('.song-list').html(list);
            checkSong(timer);
        },
        error:(err)=>{
            console.log(err.responseText);
        }
    })
}
function toPlay(timer){
    //var timer = '';
    let audio = document.getElementById('audio');
    $('.bar-box').click(function(e){
        var l = e.clientX-$(this).offset().left;
        var per = l/$(this).width();
        audio.currentTime = audio.duration*per;
        console.log(audio.currentTime);
    });
    //创建一个音频上下文实例
    try{
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
        var ctx = new AudioContext();
    }catch(e){
        alert('浏览器不支持Web-Audio-API');
        return;
    }
    //捕获audio
    let audioSrc = ctx.createMediaElementSource(audio);
    //获取音频时间、频率
    let analyser = ctx.createAnalyser();
    audioSrc.connect(analyser);
    // 连接到音频出口
    analyser.connect(ctx.destination);

    //创建画布
    let canvas = document.getElementById('canvas');
        canvas.width = $('.music-player').width();
        canvas.height =  $('.music-player').height();

    let cwidth = canvas.width,
        cheight = canvas.height,
        meterNum = 24;
    //创建2D上下文
    ctx = canvas.getContext('2d');
    let colors = ['rgba(48,82,163,.3)','rgba(36,54,77,.3)','rgba(26,39,77,.3)','rgba(171,171,172,.2)','rgba(18,25,78,.2)','rgba(129,189,244,.2)'];
    let Dots = [];
    function random(m,n){
        return Math.round(Math.random()*(n-m) + m);
    }
    function getDots(){
        Dots = [];
        for(let i=0;i<meterNum;i++){
            let x = random(0,cwidth);
            let y = random(0,cheight);
            let color = colors[Math.floor(Math.random()*colors.length)];
            Dots.push({
                x:x,
                y:y,
                color:color
            });
        }
    }
    getDots();
    function renderFrame() {
        //得到各频率能量值

        let array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        ctx.clearRect(0, 0, cwidth, cheight);
        for (let i = 0; i < meterNum; i++) {
            ctx.beginPath();
            let R = array[i]/128*70;
            let dot = Dots[i];
            ctx.fillStyle = dot.color;
            ctx.arc(dot.x, dot.y,R, 0 , 2*Math.PI ,true);
            ctx.fill();
        }
        requestAnimationFrame(renderFrame);
    }
    renderFrame();
    $.ajax({
        url:'../../airmusic/js/songlist.json',
        data:{
            songlist:[]
        },
        type:'get',
        dataType:'json',
        success:(data)=>{
            $('audio').attr('src',data.songlist[0].songlink);
            audio.play();
            $('.song-item:first').addClass('song-active');
            $('.singer').html($('.song-item:first').find('.singer-name').html());
            $('.music-box').find('.song-name').html($('.song-item:first').find('.song-name').html());
            $('.music-box').find('.time').html($('.song-item:first').find('.time').html());
            $('.playbtn').find('div:first').hide().next().show();
            var time = setTimeout(()=>{$('.full-time').html(currTime(audio.duration));},500);
            clearInterval(timer);
            timer = setInterval(()=>{
                $('.now-time').html(currTime(audio.currentTime));
                getLeft($('.bar'),audio.currentTime,audio.duration);
            },900);

        },
        error:(err)=>{
            console.log(err.responseText);
        }
    });

    $('.playbtn').click(function(){
        if(audio.paused){
            $(this).find('div:first').hide();
            $(this).find('div:last').show();
            timer = setInterval(()=>{
                $('.now-time').html(currTime(audio.currentTime));
                getLeft($('.bar'),audio.currentTime,audio.duration);
                console.log(audio.currentTime);
            },900);
            audio.play();
        }else{
            $(this).find('div:last').hide();
            $(this).find('div:first').show();
            audio.pause();
            clearInterval(timer);
        }

    });
    console.log(222);
    $('.list-ico').click(function(){
        console.log(11);
        window.history.go(-1);
    });
}
/*时间显示方式转换*/
function currTime(time){
    var m = Math.floor(time)>59?Math.floor(time/60):0;
    var s = Math.floor(time)%60>9?Math.floor(time)%60:'0'+Math.floor(time)%60;
    var time = m + ':' + s ;
    return time;
}
/*音乐播放进度*/
function getLeft(obj,currtime,fulltime){
    var per = currtime/fulltime;
    var w = Math.floor(per*$(obj).width());
    $(obj).css('left',w+'px');
}

