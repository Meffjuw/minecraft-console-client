import * as React from "react";

import {
  buttonStyles,
  rootStyle,
  activeButtonStyles
} from "./styles";

import {
  IActionBarButtonElement,
  IActionBarGroup,
  IActionBarTabButton,
  IActionBarGroupButton,
  IActionBarButton
} from "./interfaces";

import {
  CommandBarButton,
  DefaultButton,
  IButtonStyles
} from "office-ui-fabric-react/lib/Button";

import { Label } from "office-ui-fabric-react/lib/Label";
import FormActionBarButtonControl from "./FormActionBarButtonControl";
import { Button } from "antd";
import FormActionBarButtonControlAntd from "./FormActionBarButtonControlAntd";

interface IActionBarProps {
  items: IActionBarElements;
}

interface IActionBarState {
  showRibbon: boolean;
  currentTab: string;
}

export interface IActionBarElements {
  main: IActionBarButtonElement[];
  far: IActionBarButtonElement[];
}

class ActionBar extends React.Component<IActionBarProps, IActionBarState> {
  private count: number = 0;
  private delay: number = 0.025;

  state = {
    showRibbon: this.props.items.main.filter(element => element.type === "ActionBarTabButton").length > 0 ? true : false,
    currentTab: this.props.items.main.filter(element => element.type === "ActionBarTabButton").length > 0 ? (this.props.items.main.filter(element => element.type === "ActionBarTabButton")[0] as IActionBarTabButton).text : null
  }

  handleRibbonChange = (tab:string) => {
    if (this.state.currentTab === tab) {
      this.setState({ currentTab: null, showRibbon: false });
    } else {
      this.setState({ currentTab: tab, showRibbon: true })
    }
  }

  renderGroups = (max: number) => {
    let result = [];
    for(let x = 0; x < max; x++) {
      result.push(
        <div key={x} style={{margin: 8, display:'flex', flexDirection: 'column', textAlign:'start', minWidth: 100, flexShrink: 0}}>
          <Label styles={{root:{fontWeight:'500', fontFamily: "Roboto", fontSize: 12, paddingLeft: 12}}}>ACCOUNTS</Label>
          <div style={{ display: 'flex', flexDirection: 'row', whiteSpace: 'nowrap', wordSpacing: '-1em', flexShrink: 0}}>
            <div style={{ display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap', wordSpacing: '-1em', flexShrink: 0}}>
              <DefaultButton styles={{root:{height: 28, paddingRight: 8, paddingLeft: 8}, label:{fontWeight: '100', textAlign: 'start'} }} text="Update" />
              <DefaultButton styles={{root:{height: 28, paddingRight: 8, paddingLeft: 8}, label:{fontWeight: '100', textAlign: 'start'} }} text="Reverse" />
              <DefaultButton styles={{root:{height: 28, paddingRight: 8, paddingLeft: 8}, label:{fontWeight: '100', textAlign: 'start'} }} text="This is a label" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap', wordSpacing: '-1em', flexShrink: 0}}>
              <DefaultButton styles={{root:{height: 28, paddingRight: 8, paddingLeft: 8}, label:{fontWeight: '100', textAlign: 'start'} }} text="Reverse long long long" />
            </div>
          </div>
        </div>)
        result.push(<span key={x + "-span"} style={{ marginTop: 18, marginBottom: 18, borderRight: `solid 1px rgba(120,120,120,0.5)`}} />
      )
    }

    return result;
  }

  onClick = (element) => {

  }

  renderButtonGroupColumn = (buttons: IActionBarGroupButton[], start: number) => {
    let result = [];

    const styles: IButtonStyles = {
      root:{
        height: 24,
        backgroundColor: 'white',
        paddingRight: 8,
        paddingLeft: 8,
      },
      label:{
        fontWeight: 100,
        textAlign: 'start'
      }
    };

    for(let i = start; i < start + 3 && buttons[i]; i++) {
      result.push(
        <DefaultButton 
          key={i}
          className="slideRightIn40"
          style={{ animationDelay: `${this.delay * this.count++}s` }}
          styles={styles}
          text={buttons[i].text}
          onClick={() => this.onClick(buttons[i])}
        />)
    }

    return result;
  }

  renderButtonGroup = (group: IActionBarGroup) => {
    let result = []

    for(let i = 0; i < group.buttons.length; i+=3 ) {
      result.push (<div key={i} style={{ paddingLeft: 4, display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap', wordSpacing: '-1em', flexShrink: 0}}>
        {this.renderButtonGroupColumn(group.buttons, i)}
      </div>)
    }

    return result;
  }

  renderRibbon = () => {
    const currentTabElements = this.props.items.main.find(element => element.type == "ActionBarTabButton" && element.text == this.state.currentTab) as IActionBarTabButton;

    return (
      <div
      className="slideRightIn40" 
        style={{
          transition: 'all 0.3s',
          transitionTimingFunction: `cubic-bezier(0.1, 0.9, 0.2, 1)`,
          height: this.state.showRibbon ? 125 : 0,
          backgroundColor: 'white',//'rgb(244, 244, 244)',
          display: 'flex',
          flexDirection: 'row',
          borderBottom: this.state.showRibbon ? 'solid 1px rgba(20,20,20,0.35)' : 'solid 0px transparent',
          overflow:'auto'
        }}
      >
        {currentTabElements && currentTabElements.groups && currentTabElements.groups.map((group, index) => { return (
          <React.Fragment key={index}>
            <div key={index} style={{ margin: 2, display:'flex', flexDirection: 'column', textAlign:'start', minWidth: 100, flexShrink: 0}}>
              <Label styles={{root:{fontWeight:'500', fontFamily: "Roboto", fontSize: 12, paddingLeft: 16, paddingTop: 10 }}}>{group.text.toUpperCase()}</Label>
              <div style={{ display: 'flex', flexDirection: 'row', whiteSpace: 'nowrap', wordSpacing: '-1em', flexShrink: 0}}>
                {this.renderButtonGroup(group)}
              </div>
            </div>
            {index !== currentTabElements.groups.length - 1 && <span key={index + "-span"} style={{ marginTop: 18, marginBottom: 18, borderRight: `solid 1px rgba(120,120,120,0.5)`}} />}
          </React.Fragment>
        )})}
      </div>
    )
  }

  onButtonClick = (element: IActionBarButton) => {

  }

  renderElements = (items: IActionBarElements) => {
    return items.main.map((element, index): JSX.Element => {
      switch(element.type) {
        case "ActionBarButton" : {
          return <FormActionBarButtonControl key={element.id} controlId={element.id} icon={element.icon} text={element.text} onClick={element.onClick} />
        }
        case "ActionBarMenuItemButton" : {
          return <FormActionBarButtonControl key={element.id} controlId={element.id} icon={element.icon} text={element.text} />
        }
        case "ActionBarDivider" : return (
          <span key={index} style={{ borderRight: `solid 1px rgba(244,244,244,0.5)`, marginTop: 8, marginBottom: 8 }} />
        )
        case "ActionBarTabButton" : return (
          <CommandBarButton
            key={index}
            onClick={() => this.handleRibbonChange(element.text)}
            text={element.text}
            styles={this.state.currentTab === element.text ? activeButtonStyles : buttonStyles} 
          />
        )
      }
    });
  }

  renderRightElements = () => (
    <>
      <span style={{ flex: 'auto' }} />
      {this.props.items.far.map((element) => <FormActionBarButtonControl key={(element as IActionBarButton).id} controlId={(element as IActionBarButton).id} icon={(element as IActionBarButton).icon} onClick={(element as IActionBarButton).onClick ? (element as IActionBarButton).onClick : null } /> )}
    </>
  )

  renderAntdElements = (items: IActionBarElements) => {
    return items.main.map((element, index): JSX.Element => {
      switch(element.type) {
        case "ActionBarButton" : {
          return <FormActionBarButtonControlAntd loading={element.loading} key={element.id} controlId={element.id} icon={element.icon} text={element.text} onClick={element.onClick} />
        }
        // case "ActionBarMenuItemButton" : {
        //   return <FormActionBarButtonControl key={element.id} controlId={element.id} icon={element.icon} text={element.text} />
        // }
        case "ActionBarDivider" : return (
          <span key={index} style={{ borderRight: `solid 1px rgba(244,244,244,0.5)`, marginTop: 8, marginBottom: 8 }} />
        )
        // case "ActionBarTabButton" : return (
        //   <CommandBarButton
        //     key={index}
        //     onClick={() => this.handleRibbonChange(element.text)}
        //     text={element.text}
        //     styles={this.state.currentTab === element.text ? activeButtonStyles : buttonStyles} 
        //   />
        // )
      }
    });
  }

  render() {
    this.count = 0;
    
    return (
      <div>
        {/* <div className="slideRightIn40" style={rootStyle}>
          {this.renderElements(this.props.items)}
          {this.renderRightElements()}
        </div> */}
        <div className="slideRightIn40" style={rootStyle}>
          {this.renderAntdElements(this.props.items)}
          {this.renderRightElements()}
        </div>
        {this.renderRibbon()}
      </div>
    )
  }
}

export default ActionBar;