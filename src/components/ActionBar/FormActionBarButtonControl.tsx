import * as React from "react";
import { buttonStyles } from "./styles";
import { CommandBarButton } from "office-ui-fabric-react/lib/Button";

interface IFormActionBarButtonControlProps {
  controlId: string;
  icon: string;
  text?: string;
  onClick?: Function;
}

class FormActionBarButtonControl extends React.Component<IFormActionBarButtonControlProps> {
  onClick = () => {

    if (this.props.onClick) {
      this.props.onClick();
    } else {

    }

  }

  render() {
    const { icon, text } = this.props;

    return (
      <CommandBarButton
        key={this.props.controlId}
        iconProps={{ iconName: icon }}
        text={text ? text : null}
        styles={buttonStyles}
        onClick={this.onClick}
      />
    )
  }
}

export default FormActionBarButtonControl;