import { useDispatch } from "react-redux";

import { doLogout } from "../../redux/actions/user.actions";

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
    dispatch(doLogout());
  };

  /**
   *  Return api
   */
  return logout;
};
