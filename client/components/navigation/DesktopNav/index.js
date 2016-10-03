import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  })),
  brandImg: PropTypes.string,
};

const DesktopNav = ({ brandImg, navItems }) => (
  <div styleName='DesktopNav'>
    <nav>
      {brandImg &&
        <div styleName='brand'>
          <Link to='/'>
            <img src={brandImg} alt='brand logo' />
          </Link>
        </div>
      }
      <ul>
        {navItems.map((item, key) =>
          <li key={key}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        )}
      </ul>
    </nav>
  </div>
);

DesktopNav.propTypes = propTypes;

export default CSSModules(DesktopNav, styles); // { allowMultiple: true }
