import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const currentTime = Number(localStorage.getItem(STORAGE_KEY));

const iframeEl = document.querySelector('iframe');
const player = new Player(iframeEl);

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(currentTime);

function onPlay(data) {
  const timeToSave = data.seconds;

  localStorage.setItem(STORAGE_KEY, timeToSave);
}
