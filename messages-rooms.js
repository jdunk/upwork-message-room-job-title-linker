var pageEnvCode = '(' + function() {
  $(() => {
    // the textarea being focused appears to be the final action after loading a new message room thread
    $('body').on('focus', 'textarea', function(e) {
      linkTheJobTitle();
    });

    function linkTheJobTitle(href) {
      var ngData = angular.element('.room-list-item.selected eo-room-presence-others').data();
      var roomData = ((ngData || {}).$eoRoomPresenceOthersController || {}).room;

      // console.debug({roomData});

      if (!roomData) {
        console.warn("couldn't find data for message room");
        return;
      }

      var $roomTopic = $('#chat-header .room-topic');
      if ($roomTopic.children('a').length) {
        // console.debug('link already exists; returning early');
        return;
      }

      var href = 'https://www.upwork.com/applications/' + roomData.context.applicationId;

      $roomTopic.wrapInner(
        $('<a href="' + href + '" target="_blank">')
          .css({
            'color': 'inherit',
            'textDecoration': 'none'
          })
      );
    }
  });
} + ')();';

waitForElem(
  '.room-list',
  300
).then((elem) => {
  var script = document.createElement('script');
  script.textContent = pageEnvCode;
  (document.head||document.documentElement).appendChild(script);
  script.remove();
});

function waitForElem(selector, intervalMilliseconds) {

  return new Promise((resolve, reject) => {
    var elemCheckInterval = setInterval(() => {
      var elem = document.querySelector(selector);

      if (elem) {
        clearInterval(elemCheckInterval);
        resolve(elem);
      }
    }, intervalMilliseconds);
  });
}