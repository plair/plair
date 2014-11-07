var videos = ["tADtj3idaQ8", "AsGbETlosPo", "TqARD0rNHqY", "O0cihXmhbjs", "jAv_P2Z-5LU"]

function renderVideoObjects(vidArray, el){
  var i,
      html;

  for(i=0; i<vidArray.length; i++){

    el.append
  }


}

renderVideoObjects(videos, $('ul.video-list'));

// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          playlist: ['sW_ePQRvrKI','UjoE2jNAD7U'],
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });

      }


      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        // event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        console.log("playerState", player.getPlayerState());
        if(player.getPlayerState() === 0){
          event.target.cueVideoById({videoId:'NyfwImwoE3w'});
          event.target.playVideo();
        }

        // forward and backward will get the next li or the previous li
      }

      function stopVideo() {
        player.stopVideo();
      }
