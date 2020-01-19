import React from "react";

import "./Preloader.scss";

/**
 *  Component name
 */
const compName = "preloader";

/**
 *  Props definition
 */
export interface IPreloaderProps {
  show: boolean;
  color: ThemeColor;
  text?: string;
}

export const Preloader: React.FC<IPreloaderProps> & {
  defaultProps: Partial<IPreloaderProps>;
} = ({ show, color, text }) => {
  return show ? (
    <React.Fragment>
      <div className={compName}>
        <div className={`bg-${color}`} />
        <div className={`bg-${color}`} />
        <div className={`bg-${color}`} />
        <div className={`bg-${color}`} />
      </div>
      {text ? <p className="text-secondary">{text}</p> : null}
    </React.Fragment>
  ) : null;
};

/**
 *  Default props
 */
Preloader.defaultProps = {
  show: false,
  color: "primary"
};
