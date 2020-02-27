$(document).ready(function() {
    
    $('body').removeClass('no-js');
    
    
    /* =============
    Navigation Menu
    ================ */
    
    // clone nav and hide from screen-readers
    $('nav').clone().addClass('menu').attr('aria-hidden','true').prependTo('footer');
    
    $('.menu').prepend('<a href="#close">Close</a>');
    $('.menu ul').addClass('invisible');
    
    $('a[href="#menu"], a[href="#close"]').click(function(e){
        e.preventDefault();
        $('.menu ul').toggleClass('invisible');
        $('.menu').toggleClass('on');
    });
    
    
    /* =========================================================
    Adds scroll-to-top button to tall pages
    ============================================================ */
    
    // create scroll-to-top button
    $(document.createElement('a')).html('&#9652;').attr({
        'class': 'scrolltop btn',
        'href': '#',
        'aria-hidden': 'true'
    }).appendTo('body');
    
    
    $(window).scroll(function() {
        var scrollPos = $(document).scrollTop(), // amount user has scrolled
            windowHeight = $(window).height() * 2; // twice the window height
        
        if (scrollPos > windowHeight) { // if scroll position is greater than twice the window height
            $('.scrolltop').addClass('on'); // turn it on 
        } else {
            $('.scrolltop').removeClass('on'); // else turn it off
        }
    });
    
    
    /* ===========================
    Handle Hash Anchor Clicks
    1. Smooth Anchor Scrolling
    2. Speak Button (Articulate JS Plugin Settings)
    ============================== */
    
    // if speak section exists, add a 'speak this' link.
    if($('#speak').length) {
        $('#speak').prepend('<a href="#speak" title="Listen to your computer speak these words." class="floatleft"><svg xmlns="https://www.w3.org/2000/svg" class="offscreen"><symbol id="icon-volume" viewBox="0 -64 1024 1024"><path d="M719.53 128.47c-12.286 0-24.566 4.686-33.942 14.056-18.744 18.744-18.744 49.136 0 67.882 131.006 131.006 131.006 344.17 0 475.176-18.744 18.746-18.744 49.138 0 67.882 18.744 18.742 49.138 18.744 67.882 0 81.594-81.59 126.53-190.074 126.53-305.466 0-115.39-44.936-223.876-126.53-305.47-9.372-9.374-21.656-14.060-33.94-14.060v0zM549.020 218.98c-12.286 0-24.566 4.686-33.942 14.058-18.746 18.746-18.746 49.134 0 67.88 81.1 81.1 81.1 213.058 0 294.156-18.746 18.746-18.746 49.138 0 67.882s49.136 18.744 67.882 0c118.53-118.53 118.53-311.392 0-429.922-9.372-9.368-21.656-14.054-33.94-14.054zM416.006 0c-8.328 0-16.512 3.25-22.634 9.374l-246.626 246.626h-114.746c-17.672 0-32 14.326-32 32v320c0 17.672 14.328 32 32 32h114.746l246.626 246.628c9.154 9.154 22.916 11.89 34.874 6.936 11.958-4.952 19.754-16.622 19.754-29.564v-832c0-12.944-7.796-24.612-19.754-29.564-3.958-1.64-8.118-2.436-12.24-2.436z" /></symbol></svg><svg class="icon"><use xlink:href="#icon-volume"/></svg></a>');
    }
    
    // when anchor beginning with hash attribute is clicked (except menu and play buttons)
    $('a[href^=#]:not([href=#menu]):not([aria-label^=play])').click(function(e){
        e.preventDefault();
        
        // Smooth Scrolling Anchor Links
        var h = $(this).attr('href'),
            speed = 350;
        
        if (h == '#') { $('html, body').animate({scrollTop: $('html').offset().top}, speed); } // scroll to top
        else { $('html, body').animate({scrollTop: $(h).offset().top}, speed); } // scroll to the section
        
        if (h == '#speak') {
            if ($().articulate('isSpeaking') == true){ $().articulate('pause'); } // if speaking, pause
            if ($().articulate('isPaused') == true){ $().articulate('resume'); } // if paused, resume
            else { $('#speak').articulate('rate',1).articulate('pitch',0.5).articulate('speak'); } // speak
        }
        
        
    });
    
    
    /* =======================================================
    Sets video proportions to 16:9 in relation to video width
    ======================================================= */
    
    function vids(){
        if ($('iframe[src*=youtube], iframe[src*=vimeo], iframe[src*=flickr], video').length) {
            var h;
            // for each youtube iframe, vimeo iframe, flickr iframe, kaltura iframe and video tag
            $('iframe[src*=youtube], iframe[src*=vimeo], iframe[src*=flickr], video').each(function () {
                $(this).attr("width", "100%"); // set iframe width to 100%
                h = (Math.round($(this).width() * 9) / 16); // calculate proper height
                $(this).attr('height', h); // set iframe height
            });
        }
    }
    vids();
    $(window).resize(function(){ vids(); });
    
    
    /* =========================
    Replace 2017 w/ Current Year
    ============================ */
    $('.current-year').text(new Date().getFullYear());
    
});