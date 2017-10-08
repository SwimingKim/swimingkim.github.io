$(function(){
    $("#gotop").click(function(){
        jQuery("html,body").animate({
            scrollTop:0
        }, 500);
    });
    $(window).load(function() {
        $('#gotop').hide();
    });
    
    $(window).scroll(function() {
        var btn = $('#gotop'),
        view_posY = btn.offset().top + btn.height() + 10,
        total_height = $(document).height(),
        scroll_percent = parseInt(view_posY / total_height * 100);
        btn.text( '↑\t'+scroll_percent+'%' );
        // console.log(view_posY, total_height, scroll_percent);

        if ( $(this).scrollTop() > 300){
            btn.fadeIn("fast");
        } else {
            btn.stop().fadeOut("fast");
        }
    });
});
