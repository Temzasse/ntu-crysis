import React from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
};

const Footer = () => (
  <div styleName='Footer'>
    <div styleName='info'>
      <p>
        Incidents data is provided realtime by Crysis CMS.
        For more details visit our Facebook and Twitter pages.
      </p>
    </div>
    <div styleName='social-media'>
      <a
        href='https://www.facebook.com/Project-Cz3003-218714281882484/'
        rel='noopener noreferrer'
        target='_blank'
      >
        <i className='ion-social-facebook' />
      </a>
      <a
        href='https://twitter.com/CrysisCZ3003'
        rel='noopener noreferrer'
        target='_blank'
      >
        <i className='ion-social-twitter' />
      </a>
    </div>
  </div>
);

Footer.propTypes = propTypes;

export default CSSModules(Footer, styles);
