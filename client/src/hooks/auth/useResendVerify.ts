import { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";

import * as routes from "../../constants/routes";
import { userActions } from "../../modules/user";
import { sendRequest } from "../../utils/http";

/**
 *  State interface
 */
export interface IResendVerifyState {
  email: string;
}

/**
 *  Hook api interface
 */
export interface IUseResendVerify {
  data: IResendVerifyState;
  errors: any;
  valid: boolean;
  pending: boolean;
  submitted: boolean;
  success: boolean;
  submit(): Promise<void>;
  onSubmitHandler(e: FormEvent<Element>): void;
  onChangeHandler(e: FormEvent<Element>): void;
  validEmail(): boolean;
  hasError(): boolean;
  getError(): any;
}

/**
 *  Initial state
 */
export const initialState: IResendVerifyState = {
  email: ""
};

/**
 *  Hook
 */
export const useResendVerify = (): IUseResendVerify => {
  /**
   *  Load dispatch
   */
  const dispatch = useDispatch();

  /**
   *  Create state
   */
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState([]) as any;
  const [valid, setValid] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  /**
   *  Run when username or password is updated
   */
  useEffect(() => {
    if (validEmail()) {
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
      dispatch(userActions.resendVerify());
      setPending(true);
      setTimeout(submit, 2000);
    }
  };

  /**
   *  Submit function
   */
  const submit = async () => {
    // Success ..
    try {
      await sendRequest(
        "post",
        routes.AUTH_RESEND_VERIFY,
        JSON.stringify(data)
      );

      // Set not pending
      setPending(false);

      // Dispatch success action
      dispatch(userActions.resendVerifySuccess());
      setSuccess(true);

      // Fail ..
    } catch (error) {
      // Get and log errors
      const err = [error.response.data];

      // Set and dispatch errors
      setPending(false);
      setErrors(err);
      dispatch(userActions.resendVerifyFail());
    }
  };

  /**
   *  Validate username function
   */
  const validEmail = () => {
    return data.email && validator.isEmail(data.email) ? true : false;
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
    success,
    submit,
    onSubmitHandler,
    onChangeHandler,
    validEmail,
    hasError,
    getError
  };
};
