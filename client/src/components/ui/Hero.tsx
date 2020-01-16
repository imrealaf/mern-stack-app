import React from "react";
import { Container } from "react-bootstrap";

import { ViewHeight } from "../../types/Misc";

/**
 *  Component name
 */
const compName = "hero";

/**
 *  Props definition
 */
interface IHeroProps {
  bg: string;
  text: string;
  image?: string | undefined;
  vh?: ViewHeight;
  fluid: boolean;
  overlay: boolean;
  overlayOpacity: number;
}

const Preloader: React.FC<IHeroProps> & {
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
    const styles: any = {};
    if (vh) styles.height = `${vh}vh`;
    if (image) styles.backgroundImage = `url(${image})`;
    return styles;
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
Preloader.defaultProps = {
  bg: "light",
  text: "dark",
  fluid: false,
  overlay: false,
  overlayOpacity: 0.5
};

export default Preloader;
