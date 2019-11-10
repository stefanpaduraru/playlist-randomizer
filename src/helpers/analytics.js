import ReactGA from 'react-ga';
import getEnvironmentVariable from '../constants/environment';
const analyticsId = getEnvironmentVariable('REACT_APP_ANALYTICS_ID');

export function trackPageView(url) {
  if (!analyticsId) {
    return;
  }

  ReactGA.initialize(analyticsId, { debug: false });
  ReactGA.pageview(url || (window.location.href));
}

export function trackEvent(category, action, label) {
  if (!analyticsId) {
    return;
  }

  ReactGA.initialize(analyticsId);
  ReactGA.event({
    category,
    action,
    label
  });
}
