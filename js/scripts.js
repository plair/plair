var videoList = ["tADtj3idaQ8", "AsGbETlosPo", "TqARD0rNHqY", "O0cihXmhbjs", "jAv_P2Z-5LU", "6EWIawHfMZM", "3XdT2ZEC3Go", "jkPAeOpLSrI"];

var videoInfo = {};

function renderVideoObjects(vidArray, el){
  var i,
      html;

  // http://gdata.youtube.com/feeds/api/videos/UjoE2jNAD7U

  for(i=0; i<vidArray.length; i++){
    html = "<li class='youtube-item' data-youtube='" + vidArray[i] + "'></li>"
    el.append(html);
  }
  $('li[data-youtube="' + videoList[0] + '"]').addClass("currentVid");

}

function labelVideoObjects(vidArray){
  var i,
      songInfo;

  for(i=0; i<vidArray.length; i++){
    $.ajax({
      url: "http://gdata.youtube.com/feeds/api/videos/" + vidArray[i],
      context: document.body,
      success: function(result){
        songInfo = $(result).find('title').eq(0).text();
        videoInfo[vidArray[i]] = songInfo;
        console.log(videoInfo);
      }
    });
  }

}




// add regex
$('form#addVideo input[type="submit"]').click(function(e){
  e.preventDefault();
  var videoCode = $('form#addVideo input[name="linkcode"]').val().split('=')[1];
  $('ul.video-list').append("<li class='youtube-item' data-youtube='" + videoCode + "'></li>")

  $('form#addVideo input[name="linkcode"]').val('');
});

renderVideoObjects(videoList, $('ul.video-list'));

// labelVideoObjects(videoList);

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
          videoId: videoList[0],
          playlist: ['sW_ePQRvrKI','UjoE2jNAD7U'],
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });

      }

      function onSongChange(event){
        var currentVid = $('li.currentVid');

      }


      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {

          $('li.youtube-item').click(function(){
            var currentVid = $('li.currentVid');
            var nextCode = $(this).data("youtube");
            $(this).addClass("currentVid");
            currentVid.removeClass("currentVid");
            event.target.cueVideoById({videoId: nextCode});
            event.target.playVideo();
          });

          $('button.next').click(function(){
            var currentVid = $('li.currentVid');
            var nextCode = currentVid.next().data("youtube");
            event.target.cueVideoById({videoId: nextCode});
            currentVid.next().addClass("currentVid");
            currentVid.removeClass("currentVid");
            event.target.playVideo();
          });

          $('button.prev').click(function(){
            var currentVid = $('li.currentVid');
            var nextCode = currentVid.prev().data("youtube");
            event.target.cueVideoById({videoId: nextCode});
            currentVid.prev().addClass("currentVid");
            currentVid.removeClass("currentVid");
            event.target.playVideo();
          });
        // event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        console.log("playerState", player.getPlayerState());
        if(player.getPlayerState() === 0){
          var currentVid = $('li.currentVid');
          var nextCode = currentVid.next().data("youtube");
          event.target.cueVideoById({videoId: nextCode});
          currentVid.next().addClass("currentVid");
          currentVid.removeClass("currentVid");
          event.target.playVideo();
        }

        // forward and backward will get the next li or the previous li
      }

      function stopVideo() {
        player.stopVideo();
      }
