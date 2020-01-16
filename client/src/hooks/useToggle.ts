import { Dispatch, SetStateAction, useState } from "react";

/**
 *  Hook api interface
 */
export interface IUseToggle {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  handleClose(): void;
  handleShow(): void;
  toggle(): void;
}

/**
 *  Hook
 */
export const useToggle = (): IUseToggle => {
  /**
   *  Create state
   */
  const [show, setShow] = useState(false);

  /**
   *  handle close method
   */
  const handleClose = () => setShow(false);

  /**
   *  Handle show method
   */
  const handleShow = () => setShow(true);

  /**
   *  Toggle method
   */
  const toggle = () => {
    if (!show) {
      handleShow();
    } else {
      handleClose();
    }
  };

  /**
   *  Return api
   */
  return {
    show,
    setShow,
    handleClose,
    handleShow,
    toggle
  };
};
