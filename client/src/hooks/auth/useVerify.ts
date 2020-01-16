import { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";

import config from "../../constants/config";
import * as routes from "../../constants/routes";
import { sendRequest } from "../../http";
import {
  doVerify,
  verifyFail,
  verifySuccess
} from "../../redux/actions/user.actions";

export default (token: string | undefined) => {
  /**
   *  Load dispatch
   */
  const dispatch = useDispatch();

  /**
   *  Create state
   */
  const [pending, setPending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  /**
   *  On mount
   */
  useEffect(() => {
    if (token) {
      dispatch(doVerify());
      setPending(true);
      setTimeout(verify, config.preload.delayTime + 1000);
    }
  }, [token]);

  /**
   *  Verify function
   */
  const verify = async () => {
    const data = {
      token
    };
    try {
      const response = await sendRequest(
        "post",
        routes.AUTH_VERIFY,
        JSON.stringify(data)
      );

      setPending(false);
      dispatch(verifySuccess());
      setMessage(response.data.message);
      setIsVerified(true);
    } catch (error) {
      setPending(false);
      setError(error.response.data.message);
      dispatch(verifyFail());
    }
  };

  /**
   *  Return api
   */
  return {
    pending,
    isVerified,
    message,
    error
  };
};
