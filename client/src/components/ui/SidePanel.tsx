import React from "react";
import { useSwipeable } from "react-swipeable";

import { IUseToggle } from "../../hooks/useToggle";

/**
 *  Component name
 */
const compName = "sidepanel";

/**
 *  Props definition
 */
export interface ISidePanelProps extends IUseToggle {
  id?: string;
  position?: string;
  bg?: string;
  shadow?: boolean;
  onCanvas?: boolean;
}

export const SidePanel: React.FC<ISidePanelProps> & {
  defaultProps: Partial<ISidePanelProps>;
} = ({ id, children, position, bg, shadow, show, handleClose, onCanvas }) => {
  /**
   *  Swipe handling
   */
  const swipeEvent = position === "left" ? "onSwipedLeft" : "onSwipedRight";
  const swipeHandler = useSwipeable({
    [swipeEvent]: () => handleClose()
  });

  /**
   *  Class generation function
   */
  const classNames = () => {
    const classes = [compName, `${compName}-${position}`, `bg-${bg}`];
    if (onCanvas) classes.push(`${compName}-oncanvas`);
    if (shadow) classes.push(`${compName}-shadow`);
    if (show) {
      document.body.classList.add(`${compName}-active`);
      classes.push("in");
    } else {
      document.body.classList.remove(`${compName}-active`);
    }
    return classes.join(" ");
  };

  /**
   *  Render
   */
  return (
    <React.Fragment>
      <div id={id} className={classNames()} {...swipeHandler}>
        <div className={`${compName}_body`}>{children}</div>
      </div>
      {show ? (
        <div className={`${compName}-overlay`} onClick={handleClose} />
      ) : null}
    </React.Fragment>
  );
};

/**
 *  Default props
 */
SidePanel.defaultProps = {
  id: "",
  position: "right",
  bg: "light",
  shadow: true,
  show: false,
  onCanvas: false
};
