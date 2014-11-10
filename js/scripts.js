var videoList = ["7O_l7O4PpDI", "-q5nFR-EW7U", "tADtj3idaQ8", "AsGbETlosPo", "TqARD0rNHqY", "O0cihXmhbjs", "jAv_P2Z-5LU", "6EWIawHfMZM", "3XdT2ZEC3Go", "jkPAeOpLSrI", "0xxWBigyovY", "rtodyi12q-4", "98nUZ938oiU", "s_u6RCIfe80", "lup_mAtL7zY", "QbjLa9vbZe0", "HohnlWnQPvs", "nk4P03R3Hts", "3yn0PISCGpg", "X1h26SvybDw"];

var YoutubeVideo = Backbone.Model.extend({
  defaults: {
    title: "",
    youtubeCode: "",
  },
  initialize: function(){
    var self = this;
    $.ajax({
      url: "http://gdata.youtube.com/feeds/api/videos/" + this.get('youtubeCode'),
      success: function(result){
            self.set('title', $(result).find('title').eq(0).text());
        }
    });
  }
});



var YoutubeVideoView = Backbone.View.extend({

  template: _.template($("#youtubeTemplate").html()),
  events: {
      "click button.removeTrack"  : "removeTrack"
  },
  initialize: function(){
    this.render();
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function(){
    // console.log("this.template", this.template(this.model.toJSON()));

    // console.log("this.model",this.model.toJSON());
    // console.log("this.el.html", this.$el.html);
    return this.template(this.model.toJSON());
    // console.log(this.$el.html(this.template(this.model)));
  },
  removeTrack: function(){
    console.log("parent", $this.parent());
    this.model.destroy();
  }
});

// you need to create a collection for the titles to come in correctly

function renderVideoObjects(vidArray, pageElement){
  var i;
  for(i=0; i<vidArray.length; i++){
    var vid = new YoutubeVideo({youtubeCode: vidArray[i]});
    var view = new YoutubeVideoView({model: vid});
    pageElement.append(view.render());
  }
  $('li[data-youtube="' + videoList[0] + '"]').addClass("currentVid");
  $('button.removeTrack').click(function(e){
    e.stopPropagation();
    console.log("clicked");
    $(this).parent().remove();
    console.log($(this).parent());
  })
};

function listenNewItem(){
  $('li.youtube-item').click(function(){
      var currentVid = $('li.currentVid');
      var nextCode = $(this).data("youtube");
      $(this).addClass("currentVid");
      currentVid.removeClass("currentVid");
      player.cueVideoById({videoId: nextCode});
      player.playVideo();
  });
}


// add regex
$('form#addVideo input[type="submit"]').click(function(e){
  e.preventDefault();
  var videoCode = $('form#addVideo input[name="linkcode"]').val().split('=')[1];
  $('ul.video-list').append("<li class='youtube-item' data-youtube='" + videoCode + "'><button class='removeTrack'>X</a></button></li>")

  $('form#addVideo input[name="linkcode"]').val('');
  listenNewItem();
});

renderVideoObjects(videoList, $('ul.video-list'));

// labelVideoObjects(videoList);

// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      // if (player != null) {
      //     player.destroy();
      //     player = null;
      // }


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

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {

          $('li.youtube-item').click(function(){
            // onYouTubeIframeAPIReady();
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

