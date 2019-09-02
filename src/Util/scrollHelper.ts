import * as React from "react";

const smoothScrollTo = (
  containerRef: React.RefObject<HTMLDivElement>,
  finalPos: number
) => {
  let scrollLeft = false;

  if (containerRef.current) {
    if (finalPos < containerRef.current.scrollLeft) {
      scrollLeft = true;
    }
  }

  let timeElapsed = 0;
  let timeSteps = 0.1;


  const scrollInterval = setInterval(() => {
    timeElapsed += timeSteps;
    if (containerRef.current) {
      let currentPos = containerRef.current.scrollLeft;
      console.log(currentPos);
      if (finalPos > currentPos) {
        containerRef.current.scrollLeft += smoothScrollEaseOutQuad(1000, timeElapsed);
      } else if (finalPos < currentPos) {
        containerRef.current.scrollLeft -= smoothScrollEaseOutQuad(1000, timeElapsed);
      }

      if (scrollLeft && finalPos >= currentPos) {
        clearInterval(scrollInterval);
      }

      if (!scrollLeft && finalPos <= currentPos) {
        clearInterval(scrollInterval);
      }
    }
  }, timeSteps);
};

const smoothScrollEaseOutQuad = (
  duration: number,
  timeElapsed: number
) => {
  const percentageElapsed = timeElapsed / duration;
  return percentageElapsed * (duration - percentageElapsed);
};

export default {
  smoothScrollTo
};
