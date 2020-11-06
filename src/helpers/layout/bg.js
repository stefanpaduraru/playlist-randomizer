const setRandomBg = (toggle = true) => {
  const bgCount = 40;
  const bg = getRandomBg([...Array(bgCount - 1).keys()]);

  if (toggle) {
    setBg(`url('./images/bg/${bg}.jpg'`);
    window.setTimeout(() => switchBg(), 500);
  } else {
    clearBg();
  }
};

const getElements = () => {
  const visible = document.getElementsByClassName('opacity-visible').item(0);
  const hidden = document.getElementsByClassName('opacity-hidden').item(0);

  return { visible, hidden };
};

const switchBg = () => {
  const { visible, hidden } = getElements();

  visible.setAttribute(
    'class',
    'absolute-fullscreen animate-opacity background-image opacity-hidden',
  );
  hidden.setAttribute(
    'class',
    'absolute-fullscreen animate-opacity background-image opacity-visible',
  );
};

const clearBg = () => {
  const { visible, hidden } = getElements();

  hidden && (hidden.style.backgroundImage = '');
  visible && (visible.style.backgroundImage = '');
};

const setBg = bg => {
  const { hidden } = getElements();

  hidden && (hidden.style.backgroundImage = bg);
};

const getRandomBg = list => list[Math.floor(Math.random() * list.length)];

export default setRandomBg;
