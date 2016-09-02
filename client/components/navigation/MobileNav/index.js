import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import CSSModules from 'react-css-modules';

// Components
import Backdrop from '../../Backdrop';

// Styles
import styles from './index.scss';

const propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  })),
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  brandImg: PropTypes.string.isRequired,
};

const MobileNav = ({ navItems, brandImg, onClose, onOpen, isOpen }) => {
  const panelZindex = 999;
  const panelStyles = {
    transform: `translateX(${!isOpen ? '-300px' : '0px'})`,
    zIndex: panelZindex,
    boxShadow: !isOpen && 'none',
  };

  return (
    <div styleName='MobileNav'>

      {isOpen && // this basically means if(isOpen) { render stuff }
        <Backdrop zIndex={panelZindex - 1} onClick={onClose} />
      }

      <div styleName='navbar'>
        <IndexLink to='/'>
          <img styleName='brand' src={brandImg} alt='brand logo' />
        </IndexLink>
        <i styleName='navicon' className='ion-navicon' onClick={onOpen} />
      </div>

      <div styleName='navpanel' style={panelStyles}>
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
      </div>

    </div>
  );
};

MobileNav.propTypes = propTypes;

// MobileNav.defaultProps = {};

export default CSSModules(MobileNav, styles); // { allowMultiple: true }
