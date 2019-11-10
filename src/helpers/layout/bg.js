const setRandomBg = () => {
  const bgCount = 40;
  const bg = getRandomBg([...Array(bgCount - 1).keys()]);
  const hidden = document.getElementsByClassName('opacity-hidden').item(0);

  hidden && (hidden.style.backgroundImage = `url('./images/bg/${bg}.jpg'`);
  window.setTimeout(() => switchBg(), 500);
}

const switchBg = () => {
  const visible = document.getElementsByClassName('opacity-visible').item(0);
  const hidden = document.getElementsByClassName('opacity-hidden').item(0);

  visible.setAttribute('class', 'absolute-fullscreen animate-opacity background-image opacity-hidden');
  hidden.setAttribute('class', 'absolute-fullscreen animate-opacity background-image opacity-visible');
}

const getRandomBg = (list) =>
  list[Math.floor((Math.random() * list.length))]

export default setRandomBg;
