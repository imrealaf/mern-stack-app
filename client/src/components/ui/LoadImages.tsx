import React from "react";

/**
 *  Props definition
 */
export interface ILoadImagesProps {
  images: string[];
}

export const LoadImages: React.FC<ILoadImagesProps> & {
  defaultProps: Partial<ILoadImagesProps>;
} = ({ images }) => {
  const style = { display: "none" };
  return images.length ? (
    <div style={style}>
      {images.map((image: string, i: number) => (
        <img key={i} src={image} role="decoration" />
      ))}
    </div>
  ) : null;
};

/**
 *  Default props
 */
LoadImages.defaultProps = {
  images: []
};
