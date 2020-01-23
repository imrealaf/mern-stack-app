import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";

import "./Hero.scss";

import { ThemeColor } from "../../index.d";

/**
 *  Component name
 */
const compName = "hero";

/**
 *  Props definition
 */
export interface IHeroProps {
  bg: ThemeColor;
  text: ThemeColor;
  image?: string;
  vh?: 25 | 50 | 75 | 100;
  fluid: boolean;
  overlay: boolean;
  overlayOpacity: number;
  preload: boolean;
}

export const Hero: React.FC<IHeroProps> & {
  defaultProps: Partial<IHeroProps>;
} = ({
  children,
  bg,
  vh,
  image,
  preload,
  fluid,
  text,
  overlay,
  overlayOpacity
}) => {
  /**
   *  Element ref
   */
  const ref = useRef() as any;

  /**
   *  On mount, preload image if set
   */
  useEffect(() => {
    if (image && preload) {
      initImageLoad();
    }
  }, []);

  /**
   *  Init image preloading
   */
  const initImageLoad = () => {
    if (!image) return;
    const preloadImage = new Image();
    preloadImage.onload = onImageLoad;
    preloadImage.src = image;
  };

  /**
   *  On image loaded
   */
  const onImageLoad = () => {
    setTimeout(() => {
      ref.current.classList.remove("is-preload");
    }, 100);
  };

  /**
   *  Class name generation
   */
  const className = (): string => {
    const classes = [compName, `bg-${bg}`, `text-${text}`];
    if (vh) classes.push("has-vh");
    if (image) {
      classes.push("has-image");
      if (preload) classes.push("is-preload");
    }
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
    <div className={className()} style={styles()} ref={ref}>
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
  overlayOpacity: 0.5,
  preload: true
};
