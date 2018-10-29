import * as React from 'react';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IHomeData } from './interfaces/index';

interface IHomeProps {
  data: IHomeData[];
  switchRoute: (_server: IHomeData) => void;
}

class Home extends React.Component<IHomeProps> {
  public delay: number = 0;

  onClick = (_server: IHomeData) => {
    this.props.switchRoute(_server);
  }

  renderItems = () => {
    return this.props.data && this.props.data.map(item =>
      <div key={`dash-${item.name}`} className="slideRightIn40 DashboardItem" style={{ animationDelay: `${this.delay++ * 0.10}s`}} onClick={() => this.onClick(item)}>
        <div style={{ flex: 1, textAlign: 'center', verticalAlign: 'center', paddingLeft: 8, paddingTop: 22 }}>
          <Icon iconName={item.isForge ? "Processing" : "AutoFillTemplate"} styles={{ root: { fontSize: 60 } }} />
        </div>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', textAlign: 'left', paddingTop: 24, color: 'black' }}>
          <p style={{ fontWeight: 400, fontSize: 24, padding: 4, margin: 0 }}>{item.name}</p>
          <p style={{ fontWeight: 100, fontSize: 16, padding: 4, margin: 0 }}>{item.desc}</p>
        </div>
      </div>
    )
  }

  render() {
    this.delay = 1;

    return (
      <div style={{backgroundColor: 'white', width: "100%"}}>
        <div className="slideRightIn40" style={{ padding: 48, textAlign: "center", fontWeight: 100, fontSize: 48}}>Welcome</div>
        <div style={{ borderBottom: `solid 2px #eaeaea`, flex: 1, marginLeft: 84, marginRight: 84 }} />
        <div style={{ padding: 24, display:'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: "space-between" }}>
        <div key={`dash-new-server`} className="slideRightIn40 DashboardItem" style={{ animationDelay: `0.10s`}}>
          <div style={{ flex: 1, textAlign: 'center', verticalAlign: 'center', paddingLeft: 8, paddingTop: 22 }}>
            <Icon iconName={"Add"} styles={{ root: { fontSize: 60 } }} />
          </div>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', textAlign: 'left', paddingTop: 24, color: 'black' }}>
            <p style={{ fontWeight: 400, fontSize: 24, padding: 4, margin: 0 }}>{"New server"}</p>
            <p style={{ fontWeight: 100, fontSize: 16, padding: 4, margin: 0 }}>{"Create a new server"}</p>
          </div>
        </div>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

export default Home;