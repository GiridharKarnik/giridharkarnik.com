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
        height: window.innerHeight
      }
    };
  }

  private containerRef: React.RefObject<HTMLDivElement> = React.createRef();
  private scrollInProgress: boolean = false;

  public componentDidMount() {
    window.addEventListener("resize", this._updateDimensions);
    window.addEventListener("mousewheel", this._handleScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this._updateDimensions);
    window.removeEventListener("mousewheel", this._handleScroll);
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
        height: window.innerHeight
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
    if (this.containerRef.current && !this.scrollInProgress) {
      this.scrollInProgress = true;
      ScrollHelper.smoothScrollTo(this.containerRef, pixels)
        .then(() => {
          this.scrollInProgress = false;
        })
        .catch(() => {
          this.scrollInProgress = false;
        });
    }
  };

  private _getCurrentSlide = (
    containerRef: React.RefObject<HTMLDivElement>
  ) => {
    let slideNo = -1;
    if (containerRef && containerRef.current) {
      const slideWidth = window.innerWidth;
      const currentPos = containerRef.current.scrollLeft;
      slideNo = Math.floor(currentPos / slideWidth);
    }

    return slideNo + 1;
  };

  private _handleScroll = (event: any) => {
    if (!this.scrollInProgress) {
      if (this.containerRef && this.containerRef.current) {
        const currentSlide = this._getCurrentSlide(this.containerRef);

        let nextSlide: number;

        if ((event.wheelDelta || event.detail) > 0) {
          // scroll to next slide
          nextSlide = currentSlide + 1;
        } else {
          // scroll to previous slide
          nextSlide = currentSlide - 1;
        }

        if (nextSlide <= 0 || nextSlide > 3) {
          return;
        }

        const pixels =
          nextSlide * this.state.slideDimensions.width -
          this.state.slideDimensions.width;
        this.scrollInProgress = true;
        ScrollHelper.smoothScrollTo(this.containerRef, pixels)
          .then(() => {
            this.scrollInProgress = false;
          })
          .catch(() => {
            this.scrollInProgress = false;
          });
      }
    }
  };
}

export default MainPage;
