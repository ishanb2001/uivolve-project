import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export function useLocomotiveScroll(deps = []) {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: "is-revealed",
      scrollbarContainer: null,
      getDirection: true,
      getSpeed: true,
      reloadOnContextChange: true,
    });

    locomotiveScrollRef.current = scroll;

    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  // Update scroll on dependencies change (like route changes)
  useEffect(() => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.update();
    }
  }, deps);

  return { scrollRef, scrollInstance: locomotiveScrollRef };
}


