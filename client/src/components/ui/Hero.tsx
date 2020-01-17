import React from "react";
import { Container } from "react-bootstrap";

import "./Hero.scss";

import { ViewHeight } from "../../types/Misc";

/**
 *  Component name
 */
const compName = "hero";

/**
 *  Props definition
 */
export interface IHeroProps {
  bg: string;
  text: string;
  image?: string | undefined;
  vh?: ViewHeight;
  fluid: boolean;
  overlay: boolean;
  overlayOpacity: number;
}

export const Hero: React.FC<IHeroProps> & {
  defaultProps: Partial<IHeroProps>;
} = ({ children, bg, vh, image, fluid, text, overlay, overlayOpacity }) => {
  /**
   *  Class name generation
   */
  const className = (): string => {
    const classes = [compName, `bg-${bg}`, `text-${text}`];
    if (vh) classes.push("has-vh");
    if (image) classes.push("has-image");
    return classes.join(" ");
  };

  /**
   *  Styles generation
   */
  const styles = (): any => {
    const s: any = {};
    if (vh) s.height = `${vh}vh`;
    if (image) s.backgroundImage = `url(${image})`;
    return s;
  };

  /**
   *  Render
   */
  return (
    <div className={className()} style={styles()}>
      {overlay ? (
        <div
          className={`${compName}_overlay`}
          style={{ opacity: overlayOpacity }}
        />
      ) : null}
      <Container className={`${compName}_container`} fluid={fluid}>
        {children}
      </Container>
    </div>
  );
};

/**
 *  Default props
 */
Hero.defaultProps = {
  bg: "light",
  text: "dark",
  fluid: false,
  overlay: false,
  overlayOpacity: 0.5
};
