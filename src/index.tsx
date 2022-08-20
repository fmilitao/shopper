import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shopper/App';
import { store } from './shopper/redux/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { importText, exportText } from './shopper/importer';
import { logger } from './shopper/components/common/Notifier';

function isDebug(): boolean {
  const url = new URL(window.location.href);
  const param = url.searchParams.get('debug');
  return Boolean(param);
}

window.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location.href);
  const text = url.searchParams.get('text');
  if (text !== null) {
    const items = importText(text);
    if (navigator?.clipboard?.writeText) {
      const text = exportText(items);
      navigator.clipboard.writeText(text);
      logger.info(`Copied ${items.length} items to clipboard`);
    } else {
      logger.error('ERROR: denied use of browser clipboard');
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (isDebug()) {
  console.log('No service worker enabled.');
  serviceWorker.unregister();
} else {
  serviceWorker.register();
}
