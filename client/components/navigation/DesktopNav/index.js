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
  title: PropTypes.string,
};


const DesktopNav = ({ brandImg, navItems, title }) => (
  <div styleName='DesktopNav'>
    <nav>
      {brandImg &&
        <div styleName='brand'>
          <Link to='/'>
            <img src={brandImg} alt='brand logo' height='40' />
          </Link>
          <div styleName='title'>
            {title}
          </div>
        </div>
      }
      <ul>
        {navItems.map(({ to, label, onClick }, key) =>
          <li key={key}>
            {onClick ?
              <Link to={to} onClick={() => onClick()}>{label}</Link> :
              <Link to={to}>{label}</Link>
            }
          </li>
        )}
      </ul>
    </nav>
  </div>
);

DesktopNav.propTypes = propTypes;

export default CSSModules(DesktopNav, styles); // { allowMultiple: true }
