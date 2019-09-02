import * as React from "react";

import "./ProjectsSlide.scss";

interface IProps {
  slideDimensions: {
    width: number;
    height: number;
  };
}

class ProjectsSlide extends React.Component<IProps, {}> {
  public render() {
    return (
      <div
        className="projectsSlideSlideContainer"
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

export default ProjectsSlide;
