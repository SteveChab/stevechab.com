$(document).ready(function() {
    var btn_toggle = document.getElementById('toggle');
    var audio = document.getElementsByTagName("audio"); // audio is an HTMLcollection (not an array)
    var totalTracks = audio.length / 2; // number of total tracks (2.5 rounds up to 3)
    var hasPlayed = 0; // has user played any audio yet?
    var playing = 0; // is playing?
    var degrees = 0; // rotation of sun and moon
    var track = 1; // the active track
    var t; // global timeout
    var steve = document.getElementById("steve" + track);
    var nils = document.getElementById("nils" + track);
    
    function setVol() {
        for (var i = 0; i < audio.length; i++) { // for every audio track
            audio[i].volume = 0.707; // reset volume to constant power middle
        }
        
        $('img[alt=sun]').css('opacity', 0.5);
        $('#slider').val(50); // reset slider to middle
    }

    $('.no-js').removeClass('no-js');
    $('audio').attr({
      'aria-hidden': true,
      'tabindex': -1
    });
    
    // $("#tracks a").each(function(i){
    //     i++;
    //     var idee = 't'+i;
    //     $(this)
    //         .attr('id', idee) // add an id of t1, t2, etc.
    //         .click(function(){ toggle(i); });
        
    // });


    function animate() {
        t = setTimeout(function(){
            degrees = degrees + 0.35;
            $('img[alt=sun]').css({'transform' : 'translateY(-50%) rotate(-'+ degrees +'deg)'});
            $('img[alt=moon]').css({'transform' : 'translateY(-50%) rotate('+ degrees +'deg)'});
            if (playing === 1) {animate();}
        }, 50);
    }
    

    function toggle(what) {
        if (playing === 1) {
            steve.pause();
            nils.pause();
            btn_toggle.classList.add("play-button--pause");

            // if clicking a different track
            if (track != what){playing = 0;} // keep playing=0 so track plays
        }

        $('.active b, .active i').css('opacity',1); // reset opacity
        $('.active').removeClass('active');
                
        track = what; // set track to what
        
        var active = 'a[id="t'+track+'"]'; // get current track title
        $(active).addClass('active'); // set current track title to active
        
        steve = document.getElementById("steve" + track);
        nils = document.getElementById("nils" + track);

        if (playing === 0) {
            setVol(); // reset volume
            clearTimeout(t); // prevent multiple timeouts
            animate();
            steve.play();
            nils.play();
            playing = 1;
            btn_toggle.classList.add("play-button--pause");
            btn_toggle.setAttribute("aria-pressed","true");
        } else {
            steve.pause();
            nils.pause();
            playing = 0;
            btn_toggle.classList.remove("play-button--pause");
            btn_toggle.setAttribute("aria-pressed","false");
        }

        hasPlayed = 1; // user has hit the play button
    }
    

    function goto(where) {
        var go = where + track;

        if (go < 1) {
            go = totalTracks;
        } else if (go > totalTracks || hasPlayed === 0) {
            go = 1;
        }

        toggle(go);
    }
    
    
    // set on clicks for controls
    $('#toggle').click(function(){ toggle(track); });
    $('#prev').click(function(){ goto(-1); });
    $('#next').click(function(){ goto(1); });
    

    /* =====================
    EQUAL POWER PANNING

    x = slider value * PI * 0.5
    Cos of x is left
    Sin of x is right

    https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#Spatialization-panning-algorithm
    http://www.w3schools.com/jsref/jsref_obj_math.asp
    ======================== */

    // input change is like saying <input oninput="showVal(this.value)" etc.
    $('#slider').on("input change", function(){
        var r_linear = $('#slider').val() / 100,
            l_linear = $('#slider').val() * -1 / 100 + 1,
            r_constant = Math.cos(0.5 * Math.PI * r_linear),
            l_constant = Math.sin(0.5 * Math.PI * r_linear);

        $('img[alt=sun]').css('opacity', r_linear);
        $('.active b').css('opacity', l_linear*2);
        $('.active i').css('opacity', r_linear*2);

        // console.log(l_linear + ", " + r_linear + " // " + l_constant + ", " + r_constant)

        nils.volume = r_constant;
        steve.volume = l_constant;
    });
    
});