import * as React from 'react';

import { Tooltip } from 'antd';

import { Icon as MSIcon } from 'office-ui-fabric-react/lib/Icon';

import './IconCustom.less';

class Icon extends React.Component<any, any> {
  state = {
    height: 0,
    width: 0,
    paddingTop: 0,
    fontSize: 0,
    color: 0,
    background: "",
    cursor: ""
  }

  createStyle = (): any => {
    const { height, width, paddingTop, fontSize, color, background, cursor } = this.state;

    return { 
      root: {
        height: height ? height : '100%',
        width: width ? width : '100%',
        textAlign: 'center',
        paddingTop: paddingTop ? paddingTop : 0,
        fontSize: fontSize ? fontSize : 12,
        color: color ? color : '#000',
        background: background ? background : '#fff',
        cursor: cursor ? cursor : 'default',
        transitionProperty: `color, position`,
        transitionDuration: '150ms',
        transitionTimingFunction: `cubic-bezier(0.4, 0, 0.23, 1)`
      }
    };
  }

  onHover = () => {
    const { hoverColor, backgroundHoverColor } = this.props;

    if (!hoverColor && !backgroundHoverColor) {
      return;
    }

    if (hoverColor && !backgroundHoverColor) {
      this.setState({ color: hoverColor });
    }

    if (!hoverColor && backgroundHoverColor) {
      this.setState({ background: backgroundHoverColor });
    }

    if (hoverColor && backgroundHoverColor) {
      this.setState({ color: hoverColor, background: backgroundHoverColor });
    }
  }

  onLeave = () => {
    const { color, background } = this.props;

    this.setState({ color, background });
  }

  componentDidMount() {
    this.setState({ ...this.props });
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.color !== this.props.color) {
      this.setState({ color: nextProps.color });
    }

    if(nextProps.backgroundHoverColor === "transparent") {
      this.setState({ background: nextProps.backgroundHoverColor })
    }
  }

  renderBaseIconElement = () => (
    <div>
      <MSIcon
        className={this.props.spin ? 'icon-custom-spin' : ''}
        iconName={this.props.icon} 
        styles={this.createStyle()}
        onClick={this.props.onClick}
        onMouseEnter={this.onHover}
        onMouseLeave={this.onLeave}
      />
    </div>
  );

  render() {
    const { route, tooltip, tooltipPlacement } = this.props;

    if (route && !tooltip) {
      return this.renderBaseIconElement()
    } 
    
    if (!route && tooltip) {
      return (
        <Tooltip arrowPointAtCenter placement={tooltipPlacement} trigger="hover" title={tooltip}>
          {this.renderBaseIconElement()}
        </Tooltip>
      );
    }

    if (route && tooltip) {
      return (
          <Tooltip arrowPointAtCenter placement={tooltipPlacement} trigger="hover" title={tooltip}>
            {this.renderBaseIconElement()}
          </Tooltip>
      );
    }

    if (!route && !tooltip) {
      return this.renderBaseIconElement();
    }

  }
}

export default Icon;