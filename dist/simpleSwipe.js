// define global variable

var simpleSwiper = function(theoptions){

    var $win = $(window);
    var winH = $win.height();

    var options = {
        container: theoptions.container,
        defaultGap: 300,
        swipeDistance: 50
    }

    var $swpage =  $(options.container).find('.swpage'),
        spLength = $swpage.length,
        theIndex = 0,
        yStart = 0,
        moveVal = 0,
        lastTouchTime = 0,
        theGaptime = 0;

    $swpage.eq(0).addClass("current");

    //jquery .on()
    $swpage.on("touchstart touchend touchmove mousedown mouseup", swipeAction);

    function swipeAction(event){
        event = event.originalEvent;
        var $this = $(this);
        switch(event.type){
            case "touchstart":
                event.preventDefault();
                yStart = event.touches[0].clientY;
                theIndex = $this.index();
                //console.log(theIndex);
                var touchStartDate = new Date();
                var touchStartTime = touchStartDate.getTime();
                theGaptime = touchStartTime-lastTouchTime;
                break;
            case "touchend":
                event.preventDefault();
                moveVal = event.changedTouches[0].clientY - yStart;//get moveVal again
                var lastDate = new Date();
                lastTouchTime = lastDate.getTime();
                if (theGaptime > options.defaultGap) {
                    dragEnd();
                }
                break;
            case "touchmove":
                event.preventDefault();
                moveVal = event.changedTouches[0].clientY - yStart;//get moveVal
                console.log(theIndex, yStart,moveVal);

                if (theGaptime> options.defaultGap) {
                    if (moveVal<0) {
                        console.log("前进");
                        $swpage.eq(theIndex).css({
                            '-webkit-transform':'translate3d(0,'+moveVal+'px,0)'
                        }).next().addClass("active").css({
                            '-webkit-transform':'translate3d(0,'+(moveVal+winH)+'px,0)'
                        });
                    }else{
                        console.log("后退");
                        $swpage.eq(theIndex).css({
                            '-webkit-transform':'translate3d(0,'+moveVal+'px,0)'
                        });
                        if($swpage.eq(theIndex).prev().length){
                            $swpage.eq(theIndex).prev().addClass("active").css({
                                '-webkit-transform':'translate3d(0,'+(-winH+moveVal)+'px,0)'
                            });
                        }
                    }
                }
                break;
            case "mousedown":
                event.preventDefault();
                yStart = event.clientY;
                theIndex = $this.index();
                var touchStartDate = new Date();
                var touchStartTime = touchStartDate.getTime();
                theGaptime = touchStartTime-lastTouchTime;

                console.log($this);
                $this.on("mousemove", function(e) {
                    e.preventDefault();
                    moveVal = e.clientY - yStart;
                    console.log(yStart,moveVal, theGaptime);
                    if (theGaptime> options.defaultGap) {
                        if (moveVal<0) {
                            console.log("前进");
                            $swpage.eq(theIndex).css({
                                '-webkit-transform':'translate3d(0,'+moveVal+'px,0)'
                            }).next().addClass("active").css({
                                '-webkit-transform':'translate3d(0,'+(moveVal+winH)+'px,0)'
                            });
                        }else{
                            console.log("后退");
                            $swpage.eq(theIndex).css({
                                '-webkit-transform':'translate3d(0,'+moveVal+'px,0)'
                            });
                            if($swpage.eq(theIndex).prev().length){
                                $swpage.eq(theIndex).prev().addClass("active").css({
                                    '-webkit-transform':'translate3d(0,'+(-winH+moveVal)+'px,0)'
                                });
                            }
                        }
                    }
                });
                break;
            case "mouseup":
                event.preventDefault();
                moveVal = event.clientY - yStart;
                var lastDate = new Date();
                lastTouchTime = lastDate.getTime();
                if (theGaptime>options.defaultGap) {
                    dragEnd();
                }
                $this.off("mousemove");
                break;
        }
    }

    function dragEnd(){

        if (-moveVal > options.swipeDistance && theIndex > -1 && theIndex < spLength-1) {     console.log("前进2");
            $swpage.eq(theIndex).css({
                'transition-duration': '300ms',
                '-webkit-transform':'translate3d(0,'+ (-winH) +'px,0)'
            }).next().css({
                'transition-duration': '300ms',
                '-webkit-transform':'translate3d(0,0,0)'
            });

            $swpage.eq(theIndex).on('webkitTransitionEnd transitionend',function(){
                $(this).css({
                    'transition-duration': '',
                    '-webkit-transform':''
                }).off('webkitTransitionEnd transitionend').removeClass("current").next().css({
                    'transition-duration': '',
                    '-webkit-transform':''
                }).addClass("current").removeClass("active");
            });

        }else if (moveVal > options.swipeDistance && theIndex > 0){
            console.log("后退2");
            $swpage.eq(theIndex).css({
                'transition-duration': '300ms',
                '-webkit-transform':'translate3d(0,'+ winH +'px,0)'
            }).prev().css({
                'transition-duration': '300ms',
                '-webkit-transform':'translate3d(0,0,0)'
            });

            $swpage.eq(theIndex).on('webkitTransitionEnd transitionend',function(){
                $(this).css({
                    'transition-duration': '',
                    '-webkit-transform':''
                }).off('webkitTransitionEnd transitionend').removeClass("current").prev().css({
                    'transition-duration': '',
                    '-webkit-transform':''
                }).addClass("current").removeClass("active");
            });
        }else {
            console.log("恢复");
            $swpage.eq(theIndex).css({
                'transition-duration': '',
                '-webkit-transform':'translate3d(0,0,0)'
            }).siblings().removeClass("active").css({
                '-webkit-transform':''
            });
        }
    }

};