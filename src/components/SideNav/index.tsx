// import react
import * as React from 'react';

// import react redux
import { connect } from 'react-redux';

// import {
//   IRootState,
//   ConnectedReduxProps
// } from '../../core/reducers';

// import {
//   IReduxMenusState
// } from '../../core/reducers/menus';

// import {
//   showHoverMenu,
//   hideHoverMenu,
//   hideSubHoverMenu
// } from '../../core/actions/menus';

// import custom components
import Icon from '../Icon';

// import constants
import { SIDENAV_WIDTH } from './consts';
import { ISideNavModule } from './interfaces';
// import { SocketManager } from '../../core/classes/SocketManager';

const menus: ISideNavModule[] = [
  {
    name: 'SalesManagement',
    text: 'Sales management',
    type: 'module',
    menus: [
      {
        name: 'SalesOrders',
        text: 'Sales orders',
        type: 'menu',
        items: [
          {
            name: 'SalesOrdersAll',
            text: 'All sales orders',
            type: 'menuItem'
          }
        ]
      }, {
        name: 'Products',
        text: 'Products',
        type: 'menu',
        items: [
          {
            name: 'ProductsAll',
            text: 'All products',
            type: 'menuItem'
          }
        ]
      }, {
        name: 'Vendors',
        text: 'Vendors',
        type: 'menu',
        items: [
          {
            name: 'VendorsAll',
            text: 'All vendors',
            type: 'menuItem'
          }
        ]
      }
    ]
  }, {
    name: 'ProjectManagement',
    text: 'Project management',
    type: 'module',
    menus: [
      {
        name: 'Projects',
        text: 'Projects',
        type: 'menu',
        items: [
          {
            name: 'ProjectsAll',
            text: 'All projects',
            type: 'menuItem'
          }, {
            name: 'ProjectsMy',
            text: 'My projects',
            type: 'menuItem'
          }
        ]
      }, {
        name: 'Resources',
        text: 'Resources',
        type: 'menu',
        items: [
          {
            name: 'ResourceScheduling',
            text: 'Resource scheduling',
            type: 'menuItem'
          }
        ]
      }, {
        name: 'Timesheets',
        text: 'Timesheets',
        type: 'menu',
        items: [
          {
            name: 'TimesheetsAll',
            text: 'All timesheets',
            type: 'menuItem'
          }, {
            name: 'TimesheetsMy',
            text: 'My timesheets',
            type: 'menuItem'
          }
        ]
      }
    ]
  }, {
    name: 'SystemConfiguration',
    text: 'System configuration',
    type: 'module',
    menus: [

    ]
  }
];

interface SideNavProps {
  switchRoute: Function;
}

class SideNav extends React.Component<SideNavProps, { menus?: any[], showHoverMenu:boolean, showSubHoverMenu: boolean}> {
  private node: any;

  state = {
    showHoverMenu: false,
    showSubHoverMenu: false,
  };

  setRef = (node: any) => {
    this.node = node;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (event: any) => {

  }

  goHome = () => {
    this.props.switchRoute();
  }

  render() {
    const {

    } = this.props;

    const SideNavStyle: React.CSSProperties = { 
      background: '#0e0e0e',
      minWidth: SIDENAV_WIDTH,
      display:'flex',
      flexDirection: 'column',
      transitionProperty: `width`,
      transitionDuration: '200ms',
      transitionTimingFunction: `cubic-bezier(0.4, 0, 0.23, 1)`,
      animationFillMode: 'none'
    }

    return (
      <div ref={this.setRef} className="slideRightIn40" style={SideNavStyle}>
        <Icon icon={'Home'} height={64} paddingTop={11} fontSize={28} color="#fff" background="black" cursor="pointer" hoverColor="#0062ff" onClick={this.goHome} />
        {/* <Icon icon={'GlobalNavButton'} height={40} paddingTop={6} fontSize={18} color="#aaa" background="#0e0e0e" hoverColor="#fff" cursor="pointer" /> */}
      </div>
    );
  }
}

export default SideNav;