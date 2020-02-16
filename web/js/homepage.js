$(document).ready(function() {
    
    /* ==================================
    Handle SoundCloud Widget on Homepage
    ===================================== */
    
    var soundcloud = SC.Widget(document.getElementById('soundcloud')), // create new SC widget
        currentTrackTitle = '', // title of current track
        currentTrackIndex = 0;
    
//    SC.Widget.Events.CLICK_DOWNLOAD
    soundcloud.bind(SC.Widget.Events.PLAY, function() { // listens for track play
        
        // get sound index
        soundcloud.getCurrentSoundIndex(function(i){
            currentTrackIndex = i;
        });
        
        // get current sound
        soundcloud.getCurrentSound(function(t) {
            var art = t.artwork_url.replace('large','t500x500');
            currentTrackTitle = t.title;
            
            // returns available parameters
             console.log(t);
            
            // if currentTrackTitle has changed or is empty
            if (currentTrackTitle != t.title || currentTrackTitle != ''){
                $('img[alt=art]')
                    .attr('src', art) // set track art
                    .load(function(){ // when image is loaded
                        $('.track')
                            .html(currentTrackTitle) // set track title
                            .attr('href',t.permalink_url); // change soundcloud link
                        $('html').removeAttr('class'); // remove default animations
                        $('body > section').attr('class','invert animate'); // start CSS animations
                        $('a[href="#play"]').html('<b>&#9616;&#9616;</b>'); // play/pause
                    });
            }
        });
    });


    function onTrackChange(command) {
        if (command == 'play') {
            $('html').attr('class','gradient-1'); // restore default animations
            $('body > section').removeAttr('class'); // pause CSS animations
            $('a[href="#play"]').html('&#9654;'); // play/pause
            soundcloud.toggle();
        }
        else if (command == 'prev') {
            if (currentTrackIndex == 0) { // if first track
                soundcloud.skip(13) // go to last track
            } else {
                soundcloud.prev(); // go to next track
            }
        }
        else if (command == 'next') {
            if (currentTrackIndex == 13) { // if final track
                soundcloud.skip(0) // go to first track
            } else {
                soundcloud.next();
            }
        }
    }
    
    // toggle track when h1 link is clicked
    $('.track').click(function(){ onTrackChange('play'); });


    // send command to onTrackChange
    $('a[href="#play"], a[href="#prev"], a[href="#next"]').click(function(){
        // pass href minus hash as variable
        onTrackChange( $(this).attr('href').replace('#','') );
        return false;
    });


    $(document).keydown(function(e) {
        switch(e.which) {
            case 32: // space bar
                onTrackChange('play');
                break;
            case 37: // left arrow
                onTrackChange('prev');
                break;
            case 39: // right arrow
                onTrackChange('next');
                break;
            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });    
});