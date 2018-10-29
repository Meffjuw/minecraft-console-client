import * as React from 'react';

import { Layout, Icon  } from 'antd';

const { Header } = Layout;

interface ITopNavProps {
  title: string;
  barColor?: string;
  textColor?: string;
  collapsed?: boolean;
  icon?: string;
  rightContent?: JSX.Element
}

const TopNav: React.SFC<ITopNavProps> = ({ title = "", barColor = '#fff', textColor = "", collapsed = false, rightContent, icon = undefined }) =>
   <Header style={{ display: 'flex', paddingRight: 8, backgroundColor: barColor, boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)' }}>
      <div style={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: 16 }}>
         <h2 style={{ color: textColor, margin: 0, padding: 0, fontWeight: "lighter" }}>{ !collapsed ? title : icon ? <Icon type={icon} style={{color: textColor}} /> : null }</h2>
      </div>
      <span style={{ flex: 'auto' }} />
      {rightContent}
   </Header>

export default TopNav;
