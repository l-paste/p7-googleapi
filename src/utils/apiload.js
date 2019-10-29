const apiKey = `AIzaSyDWjR8Rt6VNWdTjznzLanMbGWALoewrLeo`;
const apiCallback = `gmapsCallback`;

let initialized = !!window.google;
let resolveInitPromise;
let rejectInitPromise;
const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve;
  rejectInitPromise = reject;
});

export default function init() {
  // If Google Maps already is initialized
  // the `initPromise` should be resolved
  // eventually.
  if (initialized) return initPromise;

  initialized = true;
  // The callback function is called by
  // the Google Maps script if it is
  // successfully loaded.
  window[apiCallback] = () => resolveInitPromise(window.google);

  // We inject a new script tag into
  // the `<head>` of our HTML to load
  // the Google Maps script.
  const script = document.createElement(`script`);
  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${apiCallback}`;
  script.onerror = rejectInitPromise;
  document.querySelector(`body`).appendChild(script);

  return initPromise;
}