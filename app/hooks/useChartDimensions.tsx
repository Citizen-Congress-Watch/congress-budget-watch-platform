import { useState, useRef, type RefCallback, useCallback } from "react";

const useChartDimensions = () => {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState(300);
  const observerRef = useRef<ResizeObserver | null>(null);
  const ref: RefCallback<HTMLDivElement> = useCallback((node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      const measure = () => {
        const newWidth = node.getBoundingClientRect().width;
        if (newWidth > 0) {
          setWidth(newWidth);
          // derive a height using a 16:9 aspect ratio
          setHeight(Math.round((newWidth * 9) / 16));
        }
      };

      const animationFrameId = requestAnimationFrame(measure);

      observerRef.current = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          const w = entry.contentRect.width;
          setWidth(w);
          setHeight(Math.round((w * 9) / 16));
        }
      });

      observerRef.current.observe(node);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return { ref, width, height };
};

export default useChartDimensions;
