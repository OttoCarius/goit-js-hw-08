import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  id: '236203659',
  width: 1024,
});

const storegeCurrentTime = function (data) {
  localStorage.setItem('video-current-time', data.seconds);
};
player.on('timeupdate', throttle(storegeCurrentTime, 1000));

player
  .setCurrentTime(localStorage.getItem('video-current-time'))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
