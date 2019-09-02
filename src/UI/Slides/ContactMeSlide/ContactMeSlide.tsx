import * as React from "react";

import "./ContactMeSlide.scss";

interface IProps {
  slideDimensions: {
    width: number;
    height: number;
  };
}

class ContactMeSlide extends React.Component<IProps, {}> {
  public render() {
    return (
      <div
        className="slideContainer"
        style={{
          width: this.props.slideDimensions.width,
          height: this.props.slideDimensions.height
        }}
      >{`width ${this.props.slideDimensions.width} x height ${
        this.props.slideDimensions.height
      }`}</div>
    );
  }
}

export default ContactMeSlide;
