
$(function(){

    let html = '';
    let line = '';
    $.ajax({
        url: '../../airmusic/js/songlist.json',
        data: {
            songlist: []
        },
        type: 'get',
        dataType: 'json',
        success: (data) => {
            let songlist = data.songlist;
            songlist.map((v, i)=> {
                return $(v).attr('index', i);
            });
            for (let key in songlist) {

                let index = songlist[key].index;

                html += `<li class="item" style="left:${index*320}px" >
                            <div class="song">
                                <h3>${songlist[key].songName}</h3>
                                <p>${songlist[key].singer}</p>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div class="img-box">

                                <img src="${songlist[key].img}" alt="" />
                                <span class="num">${songlist[key].id}</span>
                            </div>
                        </li>`;
                if (songlist[key].color) {
                    line += `<li style="border-color: ${songlist[key].color};left: ${index * 9 + 'px'};"></li>`
                } else {
                    line += `<li style="left: ${index * 9 + 'px'};"></li>`
                }
            };
            $('.list').html(html);
            $('.line').html(line);
            $('.list').width($('.list').find('li').eq(1).innerWidth() * songlist.length + 120 + 'px');
            $('.line').css("marginLeft", $('.line').find('li').outerWidth() * (songlist.length-1) / -2);
            let li = $('.list').find('li');
            let lines = $('.line').find('li');

            li.each(function (index) {
                $('.list').find('li:odd').stop().animate({
                    'marginTop' : '70px'
                });
                $('.list').find('li:even').stop().animate({
                    'marginTop' : '-10px'
                });
            });
            li.each(function (index) {
                li.eq(index).attr('pLeft',parseFloat(li.eq(index).css('left')));
                $(this).hover(function () {


                    li.each(function (i) {


                        if(songlist[index].color == 'red'){
                            $('.bg').fadeIn();
                        }else{
                            $('.bg').fadeOut();
                        }



                        let s = li.eq(i).attr('pLeft');


                        if(index>i){

                            li.eq(i).stop().animate({
                                left:s-50,
                            },50);
                        }

                        if(index<i){
                            li.eq(i).stop().animate({
                                left: s- -100,
                            },50);
                        }
                    });


                    $(this).find('.song').stop().animate({
                        'opacity': '1',
                        'left': '-10px'
                    },800);
                    $(this).find('img').stop().animate({
                        'left': '100px'
                    },50);
                    $(this).find('img').css({
                        'transform': 'scale(1.2)',
                    },50);
                    $(this).find('.num').css('transform', 'scale(2.8)');

                }, function () {
                    li.each(function (i) {


                        $('.bg').fadeOut();
                        $(".list").css('transform', 'scale(1)');

                        let s = li.eq(i).attr('pLeft');
                        if(index>i){
                            li.eq(i).stop().animate({
                                left:s,
                            },50);
                        }

                        if(index<i){
                            li.eq(i).stop().animate({
                                left:s,
                            },50);
                        }
                    });

                    $(this).find('.song').stop().animate({
                        'left': '100px',
                        'opacity': 0
                    });
                    $(this).find('img').stop().animate({
                        'left': '0px'
                    },50);
                    $(this).find('img').css({
                        'transform': 'scale(1)',
                    });
                    $(this).find('.num').css('transform', 'scale(1)');
                })
            });

            lines.each(function (index) {
                $(this).on(
                    {
                        mouseenter: function () {





                            if($(this).hasClass('active')){
                                $(this).stop(false, false).animate({
                                    'height': '40px',
                                    'marginTop': '-20px',
                                    'opacity': '1'
                                },300);
                            } else{
                                $(this).stop(false, false).animate({
                                    'height': '26px',
                                    'marginTop': '-10px',
                                    'opacity': '1'
                                },300);
                            }

                            if($(this).hasClass('active1')){
                                $(this).stop(false, false).animate({
                                    'height': '34px',
                                    'marginTop': '-14px',
                                    'opacity': '1'
                                },300);
                            }
                            if($(this).hasClass('active2')){
                                $(this).stop(false, false).animate({
                                    'height': '28px',
                                    'marginTop': '-8px',
                                    'opacity': '1'
                                },300);
                            }
                            if($(this).hasClass('active3')){
                                $(this).stop(false, false).animate({
                                    'height': '26px',
                                    'marginTop': '-6px',
                                    'opacity': '1'
                                },300);
                            }


                        },
                        mouseleave: function () {

                            if($(this).hasClass('active')){
                                $(this).stop(false, false).animate({
                                    'marginTop': '-20px',
                                    'height': '26px',
                                },300);
                            }else{
                                $(this).stop(false, false).animate({
                                    'height': '6px',
                                    'marginTop': '0px',
                                    'opacity': '.5'
                                },300);
                            }
                            if($(this).hasClass('active1')){
                                $(this).stop(false, false).animate({
                                    'marginTop': '-14px',
                                    'height': '20px',
                                },300);
                            }
                            if($(this).hasClass('active2')){
                                $(this).stop(false, false).animate({
                                    'marginTop': '-8px',
                                    'height': '14px',
                                },300);
                            }
                            if($(this).hasClass('active3')){
                                $(this).stop(false, false).animate({
                                    'marginTop': '-2px',
                                    'height': '8px',
                                },300);
                            }

                        },
                        click: function () {



                            $("main").stop(false, false).animate({
                                scrollLeft:(index-1)*300,
                            },800);

                            lines.each(function (){
                                $(this).removeClass();
                                $(this).stop(false, false).animate({
                                    'height': '6px',
                                    'marginTop': '0px',
                                });
                            });
                            $(this).addClass('active');
                            $(this).stop(false, false).animate({
                                'height': '26px',
                                'marginTop': '-20px',
                                'opacity': '1'
                            });


                            if(index<=songlist.length){
                                lines.eq(index+1).addClass('active1');
                                lines.eq(index+1).stop(false, false).animate({
                                    'height': '20px',
                                    'marginTop': '-14px',
                                    'opacity': '1'
                                });
                                lines.eq(index+2).addClass('active2');
                                lines.eq(index+2).stop(false, false).animate({
                                    'height': '14px',
                                    'marginTop': '-8px',
                                    'opacity': '1'
                                });
                                lines.eq(index+3).addClass('active3');
                                lines.eq(index+3).stop(false, false).animate({
                                    'height': '8px',
                                    'marginTop': '-2px',
                                    'opacity': '1'
                                });
                            }


                            if(index>0){
                                lines.eq(index-1).addClass('active1');
                                lines.eq(index-1).stop(false, false).animate({
                                    'height': '20px',
                                    'marginTop': '-14px',
                                    'opacity': '1'
                                });}
                            if(index>1){
                                lines.eq(index-2).addClass('active2');
                                lines.eq(index-2).stop(false, false).animate({
                                    'height': '14px',
                                    'marginTop': '-8px',
                                    'opacity': '1'
                                });}
                            if(index>2){
                                lines.eq(index-3).addClass('active3');
                                lines.eq(index-3).stop(false, false).animate({
                                    'height': '8px',
                                    'marginTop': '-2px',
                                    'opacity': '1'
                                });
                            }

                        }
                    }
                )
            });

            lines.each(function (index){
                $("main").on('scroll',function () {

                    // $(".list").css(
                    //     'transform' , 'scale(0.8)'
                    // );

                    let num = Math.ceil($(this).scrollLeft()/300);


                    lines.each(function (index){
                        lines.eq(index).removeClass();
                        lines.eq(index).stop(false, false).animate({
                            'height': '6px',
                            'marginTop': '0px',
                        });
                    });
                    lines.eq(num).addClass('active');
                    lines.eq(num).stop(false, false).animate({
                        'height': '26px',
                        'marginTop': '-20px',
                        'opacity': '1'
                    });


                    if(num<=songlist.length){
                        lines.eq(num+1).addClass('active1');
                        lines.eq(num+1).stop(false, false).animate({
                            'height': '20px',
                            'marginTop': '-14px',
                            'opacity': '1'
                        });
                        lines.eq(num+2).addClass('active2');
                        lines.eq(num+2).stop(false, false).animate({
                            'height': '14px',
                            'marginTop': '-8px',
                            'opacity': '1'
                        });
                        lines.eq(num+3).addClass('active3');
                        lines.eq(num+3).stop(false, false).animate({
                            'height': '8px',
                            'marginTop': '-2px',
                            'opacity': '1'
                        });
                    }


                    if(num>0){
                        lines.eq(num-1).addClass('active1');
                        lines.eq(num-1).stop(false, false).animate({
                            'height': '20px',
                            'marginTop': '-14px',
                            'opacity': '1'
                        });}
                    if(num>1){
                        lines.eq(num-2).addClass('active2');
                        lines.eq(num-2).stop(false, false).animate({
                            'height': '14px',
                            'marginTop': '-8px',
                            'opacity': '1'
                        });}
                    if(num>2){
                        lines.eq(num-3).addClass('active3');
                        lines.eq(num-3).stop(false, false).animate({
                            'height': '8px',
                            'marginTop': '-2px',
                            'opacity': '1'
                        });
                    }
                });

            });

            $('.visit').hover(function () {

                $('.btn-visit').css({
                    fontSize : '12px'
                })
                $('.btn-visit').stop(false,false).animate({
                    width:'190',
                    left:'0'

                })

            },function () {

                $('.btn-visit').css({
                    fontSize : '0'
                })
                $('.btn-visit').stop(false,false).animate({
                    width:'0px',
                    left:'50%'

                })

            });

            $('.about li').hover(function () {


                $(this).find('i').stop(false,false).animate({
                    width:$(this).width()
                })

            },function () {

                $(this).find('i').stop(false,false).animate({
                    width:'0px'
                })

            });
        },
        error: (err)=> {
            console.log(err.responseText);
        }
    });







});