/*
    &copyright; http://sixthtone.com
    2017 09
    By lintao@thepaper.cn
*/
(function ($) {
    window.TP = window.TP || {};

    var $doc = $(document),
        $win = $(window),
        $body = $("body"),
        $loading = $("#loading"),
        $bgVideo = $(".bg-video"),
        $coverVideo = $('#coverVideo'),
        $mediaWrap = $('.mediawrap'),
        $fixedMedia = $('.fixedmedia'),
        $full2col = $('.full2col'),
        $lazyimg = $(".lazyimg"),
        $expMedia = $('.expmedia'),
        $expMediaVideo = $expMedia.find('video'),
        $playbtn = $('.playbtn'),
        $fixbg = $('.fixbg'),
        $fixedSlide = $(".fixed-slide"),
        $sliderbox = $(".fixed-slide .sliderbox"),
        $sliderpos = $(".fixed-slide ul"),
        $bigimgs = $(".fixed-slide .bigimgs"),
        $fixedimg = $(".fixedimg"),
        horView,
        isMobile = /iPad|iPod|iPhone|Android/.test(navigator.userAgent);

    var winW = $win.width(),
        winH = $win.height(),
        docW = $doc.width();

    var winScale = winH/winW,
        winHhalf = winH/2,
        videoScale = 0.5625, //1080/1920
        fullmediaVal = (winW-600)/2,
        lastScrollTop = 0;

    if (winScale>videoScale) {
        horView = 0;
    }else{
        horView = 1;
    }

    TP.dongguan = {
        init: function() {

            //gallery with 90% window width view
            var $boxwrap = $(".swipe-gallery ul"),
                $boxs = $boxwrap.find('li'),
                sliderViewWidth = (winW-30)*0.9,
                theIndex = 0,
                boxLength = $boxs.length,
                xStart,
                moveVal = 0,
                wrapMoveVal = null,
                lastMoveVal = 0,
                moveFlag = false,
                lastTouchTime = 0,
                defaultGap = 300, //翻页的最小间隔时间，阻止翻页太快
                theGaptime;

            $boxwrap.width(boxLength*winW);
            $boxs.width(sliderViewWidth);
            $boxs.on("touchstart touchend touchmove", swipeAction);

            function swipeAction(event){
                event = event.originalEvent;
                var $this = $(this);
                switch(event.type){
                    case "touchstart":
                        event.preventDefault();
                        xStart = event.touches[0].clientX;
                        moveFlag = true;
                        theIndex = $this.index();
                        var touchStartDate = new Date();
                        var touchStartTime = touchStartDate.getTime();
                        theGaptime = touchStartTime-lastTouchTime;
                        break;
                    case "touchend":
                        event.preventDefault();
                        moveVal = event.changedTouches[0].clientX - xStart;//get moveVal again
                        var lastDate = new Date();
                        lastTouchTime = lastDate.getTime();
                        if (theGaptime>defaultGap) {
                            dragEnd();
                        }
                        break;
                    case "touchmove":
                        event.preventDefault();
                        moveVal = event.changedTouches[0].clientX - xStart;//get moveVal
                        //console.log(xStart,moveVal);
                        if (moveFlag && theGaptime>defaultGap) {
                            if (moveVal<0) {
                                wrapMoveVal = moveVal - (sliderViewWidth+10)*(theIndex);
                            }else{
                                wrapMoveVal = - (sliderViewWidth+10)*theIndex + moveVal;
                            }
                            $boxwrap.css({
                                '-webkit-transform':'translate3d('+wrapMoveVal+'px,0,0)'
                            });
                        }
                        break;
                }
            }

            function dragEnd(){
                //console.log(moveVal);
                if (-moveVal > 30 && theIndex > -1 && theIndex < boxLength-1) { //向左划大于30
                    $boxs.eq(theIndex+1).addClass('active').prev().removeClass('active');
                    $boxwrap.css({
                        'transition-duration': '300ms',
                        '-webkit-transform':'translate3d('+ (-(sliderViewWidth+10)*(theIndex+1)) +'px,0,0)'
                    })
                }else if (moveVal > 30 && theIndex > 0){
                    $boxs.eq(theIndex-1).addClass('active').next().removeClass('active');
                    $boxwrap.css({
                        'transition-duration': '300ms',
                        '-webkit-transform':'translate3d('+ -(sliderViewWidth+10)*(theIndex-1) +'px,0,0)'
                    });
                }else {
                    $boxwrap.css({
                        'transition-duration': '300ms',
                        '-webkit-transform':'translate3d('+ -(sliderViewWidth+10)*theIndex +'px,0,0)'
                    });
                }
                moveFlag = false;
            }
        }
    }

    $(document).ready(function() {
        TP.dongguan.init();
    });

})(jQuery);
