import * as React from "react";

import { Layout } from "antd";

import './styles/App.less';
import './styles/anim.less';

import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";

import Console from "./Console";

import { SocketManager } from "./classes/SocketManager";
import Home from "./Home";

const { Content, Footer } = Layout;

class App extends React.Component<{}, {}> {

  state = {
    currentRoute: 'Home',
    serverId: null,
    homeData: null,
  }

  renderHome = () => (
    <Home data={this.state.homeData} switchRoute={this.switchRoute} />
  )

  switchRoute = (route?: string) => {
    if (!route) {
      this.setState({ currentRoute: 'Home' });
    } else {
      this.setState({ currentRoute: "Console", serverId: route });
    }
  }

  renderConsole = () => <Console socket={SocketManager.socket} serverId={this.state.serverId} />

  renderRoute = () => {
    switch (this.state.currentRoute) {
      case 'Home' : return this.renderHome();
      case 'Console' : return this.renderConsole();
    }
  }

  componentWillMount() {
    SocketManager.Init(this);
  }

  render() {
    return (
      <Layout style={{ flexDirection: 'row', minHeight: '100vh' }}>
        <SideNav switchRoute={this.switchRoute} />
        <Layout className="slideRightIn40">
          <TopNav title="Minecraft Server Console v0.1.0" textColor="white" barColor="#111" />
          <Content style={{ display:'flex', flexDirection: 'row' }}>
            {this.renderRoute()}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Minecraft Server Console ©2018 Created by Matt
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
