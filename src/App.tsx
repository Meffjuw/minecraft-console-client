import * as React from "react";

import { Layout } from "antd";

import './styles/App.less';
import './styles/anim.less';

import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";

import Console from "./Console";

import { SocketManager } from "./classes/SocketManager";
import Home from "./Home";

import { IHomeData } from "./interfaces/index";

const { Content, Footer } = Layout;

interface IAppState {
  currentRoute: string;
  currentServer: IHomeData;
  homeData: IHomeData[];
}

class App extends React.Component<{}, IAppState> {

  state = {
    currentRoute: 'Home',
    currentServer: null,
    homeData: null
  }

  renderHome = () => (
    <Home data={this.state.homeData} switchRoute={this.switchRoute} />
  )

  switchRoute = (currentServer?: IHomeData) => {
    if (!currentServer) {
      this.setState({ currentRoute: 'Home', currentServer: null });
    } else {
      this.setState({ currentRoute: "Console", currentServer });
    }
  }

  renderConsole = () => <Console socket={SocketManager.socket} server={this.state.currentServer} switchRoute={this.switchRoute} />

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
    const { currentServer } = this.state;

    return (
      <Layout style={{ flexDirection: 'row', minHeight: '100vh' }}>
        <SideNav switchRoute={this.switchRoute} />
        <Layout className="slideRightIn40">
          <TopNav title={ currentServer ? currentServer.name : "Minecraft Server Console v0.1.0"} textColor="white" barColor="#111" />
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
