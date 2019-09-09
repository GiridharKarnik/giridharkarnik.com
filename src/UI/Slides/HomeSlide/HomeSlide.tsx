import * as React from "react";

import "./HomeSlide.scss";

interface IProps {
  slideDimensions: {
    width: number;
    height: number;
  };
}

interface IState {
  contentLeft: number;
  contentOpacity: number;
}

class HomeSlide extends React.Component<IProps, IState> {
  canvasRef: any;

  constructor(props: IProps) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      contentLeft: 0,
      contentOpacity: 1
    };
  }

  public componentDidMount() {
    this._setUpBackgroundAnimation();
    window.addEventListener("scroll", this._handleScroll, true);
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this._handleScroll);
  }

  public render() {
    let contentStyle = {
      transform: `translateX(${this.state.contentLeft}px)`,
      opacity: this.state.contentOpacity
    };

    return (
      <div
        className="homeSlideContainer"
        style={{
          width: this.props.slideDimensions.width,
          height: this.props.slideDimensions.height
        }}
      >
        {/* Background container, scrolls faster */}
        <canvas id="canvas" ref={this.canvasRef}>
          Your browser does not support canvas
        </canvas>

        {/* Background container, scrolls faster */}
        <div className="contentContainer" style={contentStyle}>
          <div className="mainTextContainer">
            <div className="nameContainer">
              <span className="firstName">GIRIDHAR</span>
              <span className="lastName">KARNIK</span>
            </div>
            <div className="introContainer">Boosting ideas since 2008.</div>
          </div>
        </div>
      </div>
    );
  }

  private _setUpBackgroundAnimation = () => {
    this.canvasRef.current.height = window.innerHeight;
    this.canvasRef.current.width = window.innerWidth;

    var c = this.canvasRef.current.getContext("2d");

    class Meteor {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      speed: number;

      constructor(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        speed: number
      ) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.speed = speed;

        this.draw();
      }

      draw = () => {
        var grad = c.createLinearGradient(this.x1, this.y1, this.x2, this.y2);
        grad.addColorStop(0, "black");
        grad.addColorStop(1, "white");
        c.strokeStyle = grad;

        c.beginPath();
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        c.stroke();
      };

      reset = () => {
        this.x1 = Math.random() * window.innerWidth - window.innerWidth;
        this.y1 = Math.random() * window.innerHeight - window.innerHeight;

        let meteorLength = Math.random() * 100 + 50;
        this.speed = Math.random() * 4;

        this.x2 = this.x1 + meteorLength;
        this.y2 = this.y1 + meteorLength;
      };

      update = () => {
        //if the meteor has crossed the screen, reset the location.
        if (this.x1 > window.innerWidth || this.y1 > window.innerHeight) {
          this.reset();
        }

        this.x1 += this.speed;
        this.y1 += this.speed;
        this.x2 += this.speed;
        this.y2 += this.speed;

        this.draw();
      };
    }

    let meteorArray: any = [];

    /**
     * Each meteor should be between 100px and 200px long.
     * (0.1 - 1) * x = (100 - 200)
     *
     * for a meteor going diagonally, x1 == y1 and x2 == y2, and length = x1 - x2
     */
    for (let i = 0; i < 50; i++) {
      let x1 = Math.random() * window.innerWidth - window.innerHeight;
      let y1 = Math.random() * window.innerHeight - window.innerWidth;

      let meteorLength = Math.random() * 100 + 50;
      let speed = Math.random() * 4;

      let x2 = x1 + meteorLength;
      let y2 = y1 + meteorLength;

      meteorArray.push(new Meteor(x1, y1, x2, y2, speed));
    }

    //animate the line moving diagonally
    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < meteorArray.length; i++) {
        meteorArray[i].update();
      }
    }

    animate();
  };

  /**
   * * To achieve parallax effect, move the contentContainer to the right by some amount
   * * as and when the screen moves to the right.
   *
   * * opacity = scrollLeft / innerWidth
   */
  private _handleScroll = (event: any) => {
    const scrolledRightBy = event.target.scrollLeft;
    this.setState({
      contentLeft: Math.floor(scrolledRightBy / 2.5),
      contentOpacity: 1 - scrolledRightBy / window.innerWidth
    });
  };
}

export default HomeSlide;
