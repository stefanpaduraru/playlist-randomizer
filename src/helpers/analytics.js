import ReactGA from 'react-ga';
import getEnvironmentVariable from '../constants/environment';
const analyticsId = getEnvironmentVariable('REACT_APP_ANALYTICS_ID');

export function trackPageView(url) {
  if (!analyticsId) {
    return;
  }

  try {
    ReactGA.initialize(analyticsId, { debug: false });
    ReactGA.pageview(url || window.location.href);
  } catch (e) {}
}

export function trackEvent(category, action, label) {
  if (!analyticsId) {
    return;
  }

  try {
    ReactGA.initialize(analyticsId);
    ReactGA.event({
      category,
      action,
      label,
    });
  } catch (e) {}
}
