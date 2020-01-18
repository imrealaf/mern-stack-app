import React, { useEffect, useRef, useState } from "react";

import "./Preload.scss";

import config from "../../constants/config";
import { ThemeColor } from "../../index.d";
import { onTransitionEnd } from "../../utils";

/**
 *  Component name
 */
const compName = "preload";

/**
 *  Props definition
 */
export interface IPreloadProps {
  color: ThemeColor;
  animateOut: boolean;
}

export const Preload: React.FC<IPreloadProps> & {
  defaultProps: Partial<IPreloadProps>;
} = ({ children, color, animateOut }) => {
  /**
   *  Create state
   */
  const [show, setShow] = useState(true);

  /**
   *  Element ref
   */
  const ref = useRef(null) as any;

  /**
   *  On mount
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (animateOut) {
        ref.current.style.opacity = 0;
        onTransitionEnd(ref.current, () => {
          document.body.style.overflow = "";
          setShow(false);
        });
      } else {
        document.body.style.overflow = "";
        setShow(false);
      }
    }, config.preload.delayTime);
  }, []);

  /**
   *  Class generation
   */
  const className = (): string => {
    const classes = [compName, `bg-${color}`];
    return classes.join(" ");
  };

  /**
   *  Render
   */
  return show ? (
    <div className={className()} ref={ref}>
      {children}
    </div>
  ) : null;
};

/**
 *  Default props
 */
Preload.defaultProps = {
  color: "light",
  animateOut: false
};
