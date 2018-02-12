window.onload = function () {

    let tipBox = document.querySelector('.tip-box');
    let imgBox = document.querySelector('.img-box');
    let imgs = imgBox.querySelectorAll('.position-img');

    MTween({
        obj:tipBox,
        attrs:{
            left:40+'px',
            opacity:1
        },
        duration:800
    });

    for(let i=0;i<imgs.length;i++){


            imgs[i].style.display = 'block';

            imgs[i].style.opacity = 1;
            imgs[i].style.transform = 'scale(1)';
            if(i%2!=1){
                imgs[i].style.top = '150px';
            }else{

                imgs[i].style.top = '350px';

            }

    }

    $('.visit').hover(function () {

        $('.btn-visit').css({
            fontSize : '14px'
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


    console.log(window.location.href);
    
    
    $('.play-list').on('click',function () {


        let load = document.createElement('div');



        document.body.appendChild(load);

        load.className = 'load';


        load.innerHTML = `
                   <div style="position:relative;margin: 350px auto;width: 100px;height: 100px; border-radius: 52px;border: 4px solid #fff">
                   <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 17 26" xml:space="preserve" width="17" height="26" class="u-fill--white"><path d="M16.5,0.3c-0.3-0.3-0.6-0.4-1-0.3L7.7,1.1C7,1.2,6.6,1.8,6.6,2.4v15C6,17.1,5.3,17,4.6,17
                            c-2.7,0-4.5,1.9-4.5,4.5S2,26,4.6,26s4.5-1.9,4.5-4.4v-0.1l0,0V8.7l6.7-0.9c0.6-0.1,1.1-0.6,1.1-1.3V1.4C16.8,0.9,16.7,0.6,16.5,0.3
                            z M4.6,23.4c-1.2,0-1.9-0.8-1.9-1.9s0.8-1.9,1.9-1.9s1.9,0.8,1.9,2.1C6.5,22.7,5.8,23.4,4.6,23.4z M14.3,5.4L9.1,6.1V3.5l5.2-0.7
                            V5.4z" fill="#fff"></path></svg>
                            <div style="position: absolute;background-color: #000"></div>
                    </div>
        `;




        window.location.href = '../html/sub_index.html';
    })


};