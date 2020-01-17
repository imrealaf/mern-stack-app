import { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";

import config from "../../constants/config";
import * as routes from "../../constants/routes";
import { doLogin, login, loginFail } from "../../redux/actions/user.actions";
import { sendRequest } from "../../utils/http";

/**
 *  State interface
 */
export interface ILoginState {
  email: string;
  password: string;
}

/**
 *  Hook api interface
 */
export interface IUseLogin {
  data: ILoginState;
  errors: any;
  valid: boolean;
  pending: boolean;
  submitted: boolean;
  validUsername(): boolean;
  validPassword(): boolean;
  hasError(): boolean;
  getError(): any;
  onSubmitHandler(e: FormEvent<Element>): void;
  onChangeHandler(e: FormEvent<Element>): void;
}

/**
 *  Initial state
 */
export const initialState: ILoginState = {
  email: "",
  password: ""
};

/**
 *  Hook
 */
export const useLogin = (): IUseLogin => {
  /**
   *  Load dispatch
   */
  const dispatch = useDispatch();

  /**
   *  Create state
   */
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [valid, setValid] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /**
   *  Run when username or password is updated
   */
  useEffect(() => {
    if (validUsername() && validPassword()) {
      setValid(true);
    } else {
      setValid(false);
    }
  });

  /**
   *  On change handler
   */
  const onChangeHandler = (e: FormEvent) => {
    const target = e.target as HTMLFormElement;
    setData({ ...data, [target.name]: target.value.trim() });
    if (hasError() && submitted) {
      setErrors([]);
    }
  };

  /**
   *  Submit handler
   */
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSubmitted(true);

    if (valid) {
      dispatch(login());
      setPending(true);
      setTimeout(submit, 2000);
    }
  };

  /**
   *  Submit function
   */
  const submit = async () => {
    // Login success ..
    try {
      const response = await sendRequest(
        "post",
        routes.AUTH_EMAIL,
        JSON.stringify(data)
      );

      // Set not pending
      setPending(false);

      // Dispatch success action
      dispatch(doLogin(response.data));

      // Login fail ..
    } catch (error) {
      // Get and log errors
      const err: any = [error.response.data];

      // Set and dispatch errors
      setPending(false);
      setErrors(err);
      dispatch(loginFail());
    }
  };

  /**
   *  Validate username function
   */
  const validUsername = () => {
    return data.email && validator.isEmail(data.email) ? true : false;
  };

  /**
   * Validate password function
   */
  const validPassword = () => {
    return data.password &&
      data.password.length >= config.auth.minPasswordLength
      ? true
      : false;
  };

  const hasError = () => {
    return errors.length > 0;
  };

  const getError = () => {
    return errors[0];
  };

  /**
   *  Return api
   */
  return {
    data,
    errors,
    valid,
    pending,
    submitted,
    onSubmitHandler,
    onChangeHandler,
    validUsername,
    validPassword,
    hasError,
    getError
  };
};
