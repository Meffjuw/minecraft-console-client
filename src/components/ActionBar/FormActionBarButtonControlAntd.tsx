import * as React from "react";
import { buttonStyles } from "./styles";
import { CommandBarButton } from "office-ui-fabric-react/lib/Button";
import { Button } from "antd";

interface IFormActionBarButtonControlProps {
  controlId: string;
  icon: string;
  text?: string;
  onClick?: Function;
  loading: boolean;
}

class FormActionBarButtonControlAntd extends React.Component<IFormActionBarButtonControlProps> {
  onClick = () => {

    if (this.props.onClick) {
      this.props.onClick();
    } else {

    }

  }

  setRef = (element) => {
    if (element) {

    }
  }

  render() {
    const { icon, text, loading } = this.props;

    return (
      <Button key={this.props.controlId} onClick={this.onClick} icon={icon} loading={loading} style={{ paddingLeft: loading ? 29 : 12, paddingRight: 12 }}>{text}</Button>
    )
  }
}

export default FormActionBarButtonControlAntd;