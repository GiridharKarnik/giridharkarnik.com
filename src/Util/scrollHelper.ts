import * as React from "react";
import { reject } from "q";

const smoothScrollTo = (
  containerRef: React.RefObject<HTMLDivElement>,
  finalPos: number
): Promise<void> => {
  return new Promise(resolve => {
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
        if (finalPos > currentPos) {
          const scrollBy = smoothScrollEaseOutQuad(1000, timeElapsed);
          containerRef.current.scrollLeft += scrollBy;
        } else if (finalPos < currentPos) {
          containerRef.current.scrollLeft -= smoothScrollEaseOutQuad(
            1000,
            timeElapsed
          );
        }

        currentPos = containerRef.current.scrollLeft;
        console.log("final Pos " + finalPos + " currentPos: " + currentPos);
        if (scrollLeft && finalPos >= currentPos) {
          clearInterval(scrollInterval);
          _adjustToNearest(containerRef, finalPos, currentPos).then(() => {
            resolve();
          });
        }

        if (!scrollLeft && finalPos <= currentPos) {
          clearInterval(scrollInterval);
          _adjustToNearest(containerRef, finalPos, currentPos).then(() => {
            resolve();
          });
        }
      } else {
        return Promise.reject(false);
      }
    }, timeSteps);
  });
};

const _adjustToNearest = (
  contentRef: React.RefObject<HTMLDivElement>,
  finalPos: number,
  currentPos: number
) => {
  return new Promise(resolve => {
    if (contentRef && contentRef.current) {
      if (currentPos > finalPos) {
        const diff = currentPos - finalPos;
        contentRef.current.scrollLeft -= diff;
      }

      if (currentPos < finalPos) {
        const diff = finalPos - currentPos;
        contentRef.current.scrollLeft += diff;
      }

      resolve();
    } else {
      reject();
    }
  });
};

const smoothScrollEaseOutQuad = (duration: number, timeElapsed: number) => {
  const percentageElapsed = timeElapsed / duration;
  return percentageElapsed * (duration - percentageElapsed);
};

export default {
  smoothScrollTo
};
