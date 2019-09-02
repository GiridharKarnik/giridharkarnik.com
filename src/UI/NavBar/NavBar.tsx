import * as React from "react";

import "./NavBar.scss";

interface IProps {
  onNavClick: (slideNo: number) => void;
}

class NavBar extends React.Component<IProps, {}> {
  private _buildMenu = (slides: Array<string>) => {
    return slides.map((slide, index) => {
      return (
        <div
          key={index + 1}
          onClick={() => {
            this.props.onNavClick(index + 1);
          }}
        >
          {slide}
        </div>
      );
    });
  };

  public render() {
    const slides = ["1", "2", "3", "4", "5"];

    return <div className="navBarContainer">{this._buildMenu(slides)}</div>;
  }
}

export default NavBar;
