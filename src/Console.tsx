import * as React from "react";
import * as client from "socket.io-client";

import { Input, Tabs, Icon } from "antd";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { titleCase } from "change-case";

import warning from "./warning.svg";
import { IHomeData } from "./interfaces/index";
import ActionBar, { IActionBarElements } from "./components/ActionBar";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";

enum Status {
  OFFLINE,
  LOADING,
  ONLINE
}

interface IConsoleProps {
  socket: client.Socket;
  server: IHomeData;
  switchRoute: (route?: IHomeData) => void;
}

interface IConsoleState {
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
  showPropsPanel: boolean;
  properties: any;
}

class Console extends React.Component<IConsoleProps, IConsoleState> {
  private textArea: any;

  state = {
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
    showPropsPanel: false,
    properties: null
  }

  // Lifecycle functions
  componentDidMount() {
    this.props.socket.emit("instance", this.props.server.id);

    this.props.socket.on("log", textLog => {
      this.setState({ textLog });

      if (this.textArea) {
        this.textArea.scrollTop = this.textArea.scrollHeight;
      }
    });

    this.props.socket.on("console", payload => {
      if (payload.serverId === this.props.server.id) {
        this.setState({ textLog: this.state.textLog + payload.msg });

        if (this.textArea) {
          this.textArea.scrollTop = this.textArea.scrollHeight;
        }
      }
    });

    this.props.socket.on("status", payload => {
      if (payload.serverId === this.props.server.id) {
        this.setState({ serverStatus: payload.status });
      }
    });

    this.props.socket.on("PROPS_DETAILS", payload => {
      if (payload.serverId === this.props.server.id) {
        this.setState({ showPropsPanel: true, properties: payload.props });
      }
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

  // Server command functions
  onStart = () => {
    if (this.props.socket.connected) {
      this.props.socket.emit("START_SERVER", this.props.server.id);
    }
  }

  onStop = () => {
    this.props.socket.emit("STOP_SERVER", this.props.server.id);
  }

  onSaveWorld = () => {
    this.props.socket.emit("SAVE_WORLD", this.props.server.id);
  }

  onCommandSend = () => {
    this.props.socket.emit("COMMAND", { 
      serverId: this.props.server.id,
      command: this.state.commandText
    });

    this.setState({ commandText: "" });
  }

  onProperties = () => {
    this.props.socket.emit("PROPS", this.props.server.id);
  }

  // Component functions
  isServerOnline = (): boolean => {
    return this.state.serverStatus === Status.ONLINE;
  }

  isServerLoading = (): boolean => {
    return this.state.serverStatus === Status.LOADING;
  }

  goHome = () => {
    this.props.switchRoute();
  }

  setRef = (element) => {
    if (element) { 
      this.textArea = element.textAreaRef;
    }
  }

  onCommandTextChange = (event) => {
    this.setState({ commandText: event.target.value });
  }

  onPropertyToggleChange = (propKey: string, checked: boolean) => {
    const { properties } = this.state;

    this.setState({ properties: {
      ...properties,
      [propKey]: checked
    }})
  }

  onPropertyTextChange = (propKey: string, value: string, type: string) => {
    const { properties } = this.state;

    this.setState({ properties: {
      ...properties,
      [propKey]: type === "number" ? parseInt(value) : value
    }})
  }

  onPropertiesSave = () => {
    console.log(JSON.stringify(this.state.properties, null, 2));
  }

  closePropertiesPanel = () => {
    this.setState({ showPropsPanel: false });
  }

  // Render functions
  renderServerOffline = () => (
    <div style={{ height: '100%', width: '100%', display:'flex', flexDirection:'column', textAlign:'center', justifyContent:'center' }} className="slideRightIn40">
      <img src={warning} style={{ height: 120, opacity: 0.25 }} />
      <p style={{ fontFamily: 'Roboto' }}>Server is offline. </p>
    </div>
  );

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

  renderProperties = () => {
    const { properties } = this.state;

    return Object.keys(properties).map(propKey => {
      switch(typeof(properties[propKey])) {
        case "boolean" : return ( 
          <span key={propKey} style={{display: 'flex', flexDirection:'row', padding: 4 }}>
            <span style={{ width: "60%"}}>{titleCase(propKey)}</span>
            <span style={{ width: "40%"}}> <Toggle key={propKey} onChange={(event, value) => this.onPropertyToggleChange(propKey, value)} checked={properties[propKey]}/></span>
          </span>
          );
        case "string" : return ( 
          <span key={propKey} style={{display: 'flex', flexDirection:'row', padding: 4 }}>
            <span style={{ width: "60%"}}>{titleCase(propKey)}</span>
            <span style={{ width: "40%"}}><TextField value={properties[propKey]} onChange={(event, value) => this.onPropertyTextChange(propKey, value, "string")} /></span>
          </span>
        );
        case "number" : return ( 
          <span key={propKey} style={{display: 'flex', flexDirection:'row', padding: 4 }}>
            <span style={{ width: "60%"}}>{titleCase(propKey)}</span>
            <span style={{ width: "40%"}}><TextField value={properties[propKey]} onChange={(event, value) => this.onPropertyTextChange(propKey, value, "number")} /></span>
          </span>
        );
        case "object" : {
          if (!properties[propKey]) {
            return (
              <span key={propKey} style={{display: 'flex', flexDirection:'row', padding: 4 }}>
                <span style={{ width: "60%"}}>{titleCase(propKey)}</span>
                <span style={{ width: "40%"}}><TextField value={properties[propKey] ? properties[propKey] : "" } onChange={(event, value) => this.onPropertyTextChange(propKey, value, "string")} /></span>
              </span>
            )
          }
        }
        default: return null;
      }
    })
  }

  render() {
    const {
      textLog,
      commandText,
      serverStatus
    } = this.state;

    const actionBarItems: IActionBarElements = {
      main: [
        {
          id: "START_STOP_SERVER_BTN",
          enabled: true,
          type: "ActionBarButton",
          icon: serverStatus ? "stop" : "caret-right",
          text: serverStatus ? "Stop server" : "Start server",
          onClick: serverStatus ? this.onStop : this.onStart,
          loading: this.isServerLoading()
        }, {
          type: "ActionBarDivider"
        }, {
          id: "SAVE_WORLD_BTN",
          enabled: this.isServerOnline(),
          type: "ActionBarButton",
          icon: "save",
          text: "Save world",
          onClick: this.onSaveWorld
        }, {
          id: "PROPS_BTN",
          enabled: true,
          type: "ActionBarButton",
          icon: "form",
          text: "Properties",
          onClick: this.onProperties
        }
      ],
      far: [
        {
          id: "CLOSE_BUTTON",
          icon: "Cancel",
          type: "ActionBarFarButton",
          onClick: this.goHome
        }
      ]
    };

    return (
      <div className="custom" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <ActionBar items={actionBarItems} />
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
          <div className="slideRightIn40" style={{ marginBottom: 0, padding: 24, paddingTop: 24, background: '#fff', height: '100%', width: '75%' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: "100%" }}>
              <div style={{ height: "100%", overflow: "hidden", transition: 'all 0.3s' }}>
                <Input.TextArea ref={this.setRef} rows={24} value={textLog} spellCheck={false} />
              </div>
              <div style={{ transition: 'all 0.3s', display: 'flex', flexDirection:'row', marginTop: 24 }}>
                <Input disabled={!this.isServerOnline()} value={commandText} onChange={this.onCommandTextChange} onPressEnter={this.onCommandSend}/>
              </div>
            </div>
          </div>
          <div className="slideRightIn40" style={{ width: '25%', borderLeft: "solid 1px #eaeaea", padding: 24, paddingTop: 8, background: '#fff', minHeight: 360 }}>
          {
            this.isServerOnline()
            ? this.renderDetails()
            : this.renderServerOffline()
          }              
          </div>
        </div>
        <Panel
          isOpen={this.state.showPropsPanel}
          onDismiss={this.closePropertiesPanel}
          isLightDismiss={true}
          type={PanelType.custom}
          customWidth="600px"
          headerText="Properties"
        >
          { 
            this.state.showPropsPanel 
            ? <div style={{ display:"flex", flexDirection: 'column'}}>
                {this.renderProperties()}
                <div style={{ display: 'flex', width: "100%", paddingTop: 24, justifyContent: "flex-end" }}>
                  <PrimaryButton text="Save" onClick={this.onPropertiesSave} />
                  <span style={{ paddingLeft: 8 }} />
                  <DefaultButton text="Cancel" onClick={this.closePropertiesPanel} />
                </div>
              </div>
            : null 
          }
        </Panel>
      </div>
    )
  }
}

export default Console;