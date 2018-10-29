import * as React from "react";
import * as client from "socket.io-client";

import { Button, Input, Tabs, Icon } from "antd";

import warning from "./warning.svg";

enum Status {
  OFFLINE,
  LOADING,
  ONLINE
}

const TEXT_AREA_HEIGHT = 530;

interface IConsoleProps {
  socket: client.Socket;
  serverId: string;
}

interface IConsoleState {
  textAreaHeight: number;
  collapsed: boolean;
  serverStatus: Status,
  pingLoading: boolean,
  pingData: {
    description: {
      text: string;
    },
    players: {
      online: number;
      max: number;
    },
    latency: number,
    version: {
      name: string;
    }
  },
  textLog: string,
  commandText: string,
}

class Console extends React.Component<IConsoleProps, IConsoleState> {
  private textArea: any;

  state = {
    textAreaHeight: TEXT_AREA_HEIGHT,
    collapsed: true,
    serverStatus: Status.OFFLINE,
    pingLoading: true,
    pingData: {
      description: {
        text: "Test description"
      },
      players: {
        online: 2, max: 20
      },
      latency: 24,
      version: {
        name: "1.7.10"
      }
    },
    textLog: "",
    commandText: "",
  }

  componentDidMount() {
    this.props.socket.emit("instance", this.props.serverId);

    this.props.socket.on("log", textLog => {
      this.setState({ textLog });

      if (this.textArea) {
        this.textArea.scrollTop = this.textArea.scrollHeight;
      }
    });

    this.props.socket.on("console", data => {
      this.setState({ textLog: this.state.textLog + data });

      if (this.textArea) {
        this.textArea.scrollTop = this.textArea.scrollHeight;
      }
    });

    this.props.socket.on("status", status => {
      this.setState({ serverStatus: status });
    })

    this.props.socket.on("ping", pingData => {
      if (pingData && pingData.players) {
        this.setState({ pingData, pingLoading: false });
      }
    }); 
  }

  componentWillUnmount() {
    this.props.socket.removeAllListeners();
    this.textArea = null;
  }

  onStart = () => {
    if (this.props.socket.connected) {
      this.props.socket.emit("START_SERVER");
    }
    
  }

  onStop = () => {
    this.props.socket.emit("STOP_SERVER");
  }

  onClick = () => {
    this.setState({ pingLoading: !this.state.pingLoading });
  }

  onSaveWorld = () => {
    this.props.socket.emit("SAVE_WORLD");
  }

  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  setRef = (element) => {
    if (element) { 
      this.textArea = element.textAreaRef;
    }
  }

  onCommandTextChange = (event) => {
    this.setState({ commandText: event.target.value });
  }

  onCommandSend = () => {
    this.props.socket.emit("COMMAND", this.state.commandText);
    this.setState({ commandText: "" });
  }

  renderServerOffline = () => (
    <div style={{ height: '100%', width: '100%', display:'flex', flexDirection:'column', textAlign:'center', justifyContent:'center' }} className="slideRightIn40">
      <img src={warning} style={{ height: 120, opacity: 0.25 }} />
      <p style={{ fontFamily: 'Roboto' }}>Server is offline. </p>
    </div>
  );

  isServerOnline = (): boolean => {
    return this.state.serverStatus === Status.ONLINE;
  }

  isServerLoading = (): boolean => {
    return this.state.serverStatus === Status.LOADING;
  }

  renderDetails = () => {
    const { pingData, pingLoading } = this.state;

    if (pingLoading) {
      return (
        <div style={{ height: '100%', width: '100%', display:'flex', flexDirection:'column', textAlign:'center', justifyContent:'center' }} className="slideRightIn40">
          <Icon type="loading" style={{ fontSize: 48 }}/>
          <p style={{ fontFamily: 'Roboto', paddingTop: 12 }}>Loading...</p>
        </div>
      )
    } else {
      return (
        <Tabs>
          <Tabs.TabPane tab="Details" key="det1">
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', fontFamily:'Roboto', fontSize: 20, textAlign:'start' }}>
              <span className="slideRightIn40" style={{ animationDelay: '0.1s', paddingBottom: 16 }}> <span>Name:</span><span style={{ float:'right' }}>{pingData ? pingData.description.text : ""}</span></span>
              <span className="slideRightIn40" style={{ animationDelay: '0.2s', paddingBottom: 16 }}> <span>Status:</span><span style={{ float:'right', color:'#11c711' }}>Online</span></span>
              <span className="slideRightIn40" style={{ animationDelay: '0.3s', paddingBottom: 16 }}> <span>Players:</span><span style={{ float:'right' }}>{pingData ? <><a>{pingData.players.online}</a>/{pingData.players.max}</> : ""}</span></span>
              <span className="slideRightIn40" style={{ animationDelay: '0.4s', paddingBottom: 16 }}> <span>Latency:</span><span style={{ float:'right' }}>{pingData ? pingData.latency : "" }</span></span>
              <span className="slideRightIn40" style={{ animationDelay: '0.5s', paddingBottom: 16 }}> <span>Version:</span><span style={{ float:'right' }}>{pingData ? pingData.version.name : "" }</span></span>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Players" key="det2"></Tabs.TabPane>
        </Tabs>
      )
    }
  }

  render() {
    const { textAreaHeight, textLog, commandText } = this.state;

    return (
      <>
        <div className="slideRightIn40" style={{ margin: 18, marginRight: 9, marginBottom: 0, padding: 24, background: '#fff', height: '100%', width: '75%' }}>
          <div className="App">
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', textAlign: 'start', paddingBottom: 16 }}>
                { this.isServerOnline() ? <Button loading={this.isServerLoading()} type="danger" onClick={this.onStop}>Stop server</Button> : <Button loading={this.isServerLoading()} type="primary" onClick={this.onStart}>Start server</Button>}
                <Button disabled={!this.isServerOnline()} onClick={this.onSaveWorld}>Save world</Button>
                {/* <Button onClick={this.onClick}>Restart</Button> */}
              </div>
              {/* <span style={{ width: '100%', borderBottom: 'solid 1px #eaeaea', marginBottom: 16 }} /> */}
              <div style={{ height: textAreaHeight, overflow: "hidden", transition: 'all 0.3s' }}>
                <Input.TextArea ref={this.setRef} rows={24} value={textLog} />
              </div>
              <div style={{ transition: 'all 0.3s', display: 'flex', flexDirection:'row' }}>
                <Input disabled={!this.isServerOnline()} value={commandText} onChange={this.onCommandTextChange} onPressEnter={this.onCommandSend}/>
              </div>
            </div>
          </div>
        </div>
        <div className="slideRightIn40" style={{ width: '25%', margin: 18, marginLeft: 9, marginBottom: 12, padding: 24, paddingTop: 8, background: '#fff', minHeight: 360 }}>
        {
          this.isServerOnline()
          ? this.renderDetails()
          : this.renderServerOffline()
        }              
        </div>
      </>
    )
  }
}

export default Console;