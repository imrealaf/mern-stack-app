import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";

import config from "../../constants/config";
import * as routes from "../../constants/routes";
import { sendRequest } from "../../http";
import {
  signUp,
  signUpFail,
  signUpSuccess
} from "../../redux/actions/user.actions";

/**
 *  State interface
 */
export interface ISignUpState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

/**
 *  Hook api interface
 */
export interface IUseSignUp {
  data: ISignUpState;
  errors: any;
  valid: boolean;
  pending: boolean;
  submitted: boolean;
  verify: string;
  passwordNotValid(): boolean;
  passwordsDontMatch(): boolean;
  hasError(name: string): boolean;
  getError(name: string): any;
  onSubmitHandler(e: FormEvent<Element>): void;
  onChangeHandler(e: FormEvent<Element>): void;
}

/**
 *  Initial state
 */
export const initialData: ISignUpState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: ""
};

/**
 *  Hook
 */
export const useSignUp = (): IUseSignUp => {
  /**
   *  Load dispatch
   */
  const dispatch = useDispatch();

  /**
   *  Create state
   */
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState([]) as any;
  const [valid, setValid] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [verify, setVerify] = useState("");

  /**
   *  On component update
   */
  useEffect(() => {
    const { name, email, password, passwordConfirm } = data;

    const emailValid = email && validator.isEmail(email);
    const passwordValid =
      password &&
      password.length <= config.auth.minPasswordLength &&
      password === passwordConfirm;

    if (name && emailValid && passwordValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  });

  /**
   *  Password valid function
   */
  const passwordNotValid = () => {
    const { password } = data;
    return password && password.length < config.auth.minPasswordLength
      ? true
      : false;
  };

  /**
   *  Password match function
   */
  const passwordsDontMatch = () => {
    const { password, passwordConfirm } = data;
    return passwordConfirm && password !== passwordConfirm ? true : false;
  };

  /**
   *  Has error function
   */
  const hasError = (name: string) => {
    if (errors.length > 0) {
      const error = errors.filter((err: any) => err.param === name);
      return error.length === 1 ? true : false;
    } else {
      return false;
    }
  };

  /**
   *  Get error function
   */
  const getError = (name: string) => {
    return errors.filter((err: any) => err.param === name)[0];
  };

  /**
   *  On input change handler
   */
  const onChangeHandler = (e: FormEvent) => {
    const target = e.target as HTMLFormElement;
    setData({ ...data, [target.name]: target.value.trim() });
    if (hasError(target.name) && submitted) {
      setErrors([]);
    }
  };

  /**
   *  On submit handler
   */
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSubmitted(true);

    if (valid) {
      dispatch(signUp());
      setPending(true);
      setTimeout(submit, config.http.requestDelay);
    }
  };

  /**
   *  Submit function
   */
  const submit = async () => {
    try {
      const response = await sendRequest(
        "post",
        routes.API_USERS,
        JSON.stringify(data)
      );

      setPending(false);
      if (response.data.verifyToken) {
        setVerify(response.data.message);
        dispatch(
          signUpSuccess({
            user: null,
            verify: true
          })
        );
      } else {
        dispatch(
          signUpSuccess({
            user: response.data.user,
            verify: false
          })
        );
      }
    } catch (error) {
      const err = [error.response.data];
      setPending(false);
      setErrors(err);
      dispatch(signUpFail());
    }
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
    verify,
    onChangeHandler,
    onSubmitHandler,
    passwordNotValid,
    passwordsDontMatch,
    hasError,
    getError
  };
};
