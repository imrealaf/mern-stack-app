import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { HTMLAttributes } from "react";

import "./Logo.scss";

import { dictionary } from "../../data";

/**
 *  Component name
 */
const compName = "logo";

/**
 *  Props definition
 */
export interface ILogoProps extends HTMLAttributes<string> {
  color: string;
  size: string;
  text: string | boolean;
}

export const Logo: React.FC<ILogoProps> & {
  defaultProps: Partial<ILogoProps>;
} = ({ size, color, text, className }) => {
  /**
   *  Class generation
   */
  const classNames = (): string => {
    const classes = [compName];
    if (className) classes.push(className);
    if (color) classes.push(`text-${color}`);
    if (size) classes.push(`${compName}-${size}`);
    return classes.join(" ");
  };

  /**
   *  Render
   */
  return (
    <span className={classNames()}>
      <FontAwesomeIcon icon={["fas", "code"]} />
      {text ? <span>{text}</span> : null}
    </span>
  );
};

/**
 *  Default props
 */
Logo.defaultProps = {
  color: "white",
  text: dictionary.APP_NAME
};
