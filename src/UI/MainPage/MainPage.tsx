import * as React from "react";

import HomeSlide from "../Slides/HomeSlide/HomeSlide";
import ProjectsSlide from "../Slides/ProjectsSlide/ProjectsSlide";
import ContactMeSlide from "../Slides/ContactMeSlide/ContactMeSlide";
import NavBar from "../NavBar/NavBar";

import ScrollHelper from "../../Util/scrollHelper";

import "./MainPage.scss";

interface IState {
  slideDimensions: {
    width: number;
    height: number;
  };
}

class MainPage extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      slideDimensions: {
        width: window.innerWidth,
        height: window.innerHeight - 5
      }
    };
  }

  private containerRef: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    window.addEventListener("resize", this._updateDimensions);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this._updateDimensions);
    window.removeEventListener("scroll", this._handleScroll);
  }

  public render() {
    return (
      <div id="scrollContainer" ref={this.containerRef}>
        <div
          className="mainPage"
          style={{ width: this.state.slideDimensions.width * 3 }}
          onScroll={this._handleScroll}
        >
          <HomeSlide slideDimensions={this.state.slideDimensions} />
          <ProjectsSlide slideDimensions={this.state.slideDimensions} />
          <ContactMeSlide slideDimensions={this.state.slideDimensions} />
          <NavBar onNavClick={this._onNavClick} />
        </div>
      </div>
    );
  }

  private _updateDimensions = () => {
    this.setState({
      slideDimensions: {
        width: window.innerWidth,
        height: window.innerHeight - 5
      }
    });
  };

  private _onNavClick = (slideNo: number) => {
    this._scrollToPosition(
      slideNo * this.state.slideDimensions.width -
        this.state.slideDimensions.width
    );
  };

  private _scrollToPosition = (pixels: number) => {
    if (this.containerRef.current) {
      ScrollHelper.smoothScrollTo(this.containerRef, pixels);
    }
  };

  private _handleScroll = (value: any) => {
    
  }
}

export default MainPage;
