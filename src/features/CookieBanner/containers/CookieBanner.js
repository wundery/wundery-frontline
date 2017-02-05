import React from 'react';
import classnames from 'classnames';
import { withTranslation } from 'globals';
// eslint-disable-next-line no-unused-vars
import css from '../styles/index.css';

function CookieBanner({ cookieBanner, t }) {
  function onAcknowledgeClick() {
    cookieBanner.acknowledge();
  }

  const className = classnames('wundery-cookie-banner', {
    'wundery-cookie-banner-top': cookieBanner.hasPosition('top'),
    'wundery-cookie-banner-bottom': cookieBanner.hasPosition('bottom'),
  });

  const url = cookieBanner.getOption('url');

  return (
    <div className={className}>
      <div className="wundery-cookie-banner-info">
        {cookieBanner.translation('info', t('info'))}
      </div>
      {url && (
        <a
          className="wundery-cookie-banner-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cookieBanner.translation('more', t('more'))}
        </a>
      )}
      <button onClick={onAcknowledgeClick} className="wundery-cookie-banner-button">
        {cookieBanner.translation('acknowledge', t('acknowledge'))}
      </button>
    </div>
  );
}

CookieBanner.propTypes = {
  // The wundery cookie banner instance
  cookieBanner: React.PropTypes.object.isRequired,

  // Translate helper
  t: React.PropTypes.func.isRequired,
};

export default withTranslation('features.cookieBanner', 'containers.cookieBanner')(CookieBanner);
