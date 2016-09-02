import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
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

const DesktopNav = ({ brandImg, navItems }) => {
  return (
    <div styleName='DesktopNav'>
      <nav>
        {brandImg &&
          <div styleName='brand'>
            <IndexLink to='/'>
              <img src={brandImg} alt='brand logo' />
            </IndexLink>
          </div>
        }
        <ul>
          {navItems.map((item, key) => {
            // links to root `/` need to use `IndexLink` instead od `Link`
            return (item.to === '/' ?
              <li key={key}>
                <IndexLink to={item.to}>{item.label}</IndexLink>
              </li> :
              <li key={key}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

DesktopNav.propTypes = propTypes;
// DesktopNav.defaultProps = {};

export default CSSModules(DesktopNav, styles); // { allowMultiple: true }
