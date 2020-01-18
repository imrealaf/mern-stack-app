import { useDispatch } from "react-redux";

import { userActions } from "../../modules/user";

/**
 *  Hook api interface
 */
export type IUseLogout = () => void;

/**
 *  Hook
 */
export const useLogout = (): IUseLogout => {
  /**
   *  Load dispatch
   */
  const dispatch = useDispatch();

  /**
   *  Logout method
   */
  const logout = () => {
    dispatch(userActions.doLogout());
  };

  /**
   *  Return api
   */
  return logout;
};
