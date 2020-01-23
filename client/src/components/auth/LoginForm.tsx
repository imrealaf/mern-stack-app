import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./index.scss";

import * as routes from "../../constants/routes";
import { dictionary } from "../../data";
import providers from "../../data/auth/social-providers.json";
import { useQuery } from "../../hooks";
import { IUseLogin } from "../../hooks/auth/useLogin";
import { sanitize } from "../../utils";
import { Preloader } from "../ui";
import { SocialProviders } from "./";

/**
 *  Component name
 */
const compName = "login-form";

/**
 *  Props definition
 */
interface ILoginFormProps {
  login: IUseLogin;
}

const LoginForm: React.FC<ILoginFormProps> & {
  defaultProps: Partial<ILoginFormProps>;
} = ({ login }) => {
  /**
   *  Read success query var
   */
  const providerAuthSuccess = useQuery("status");

  /**
   *  Render
   */
  return (
    <React.Fragment>
      <Form
        noValidate={true}
        onSubmit={login.onSubmitHandler}
        id={compName}
        className="auth-form"
        style={login.pending ? { display: "none" } : {}}
      >
        {/* Error text */}
        {login.hasError() ? (
          <Form.Text className="text-center text-danger mb-3">
            <span
              dangerouslySetInnerHTML={sanitize(login.getError().message)}
            />
            {login.getError().message.search("verify") > -1 ? (
              <span className="d-block mt-1">
                <Link className="text-danger" to={routes.RESEND_VERIFY}>
                  <strong>{dictionary.AUTH_LOGIN_RESEND_VERIFY_LINK}</strong>
                </Link>{" "}
                {dictionary.AUTH_LOGIN_RESEND_VERIFY_TEXT}
              </span>
            ) : null}
          </Form.Text>
        ) : null}

        {/* Provider error text */}
        {providerAuthSuccess &&
        providerAuthSuccess === "fail" &&
        !login.data.email ? (
          <Form.Text className="text-center text-danger mb-3">
            {dictionary.AUTH_LOGIN_SOCIAL_FAIL}
          </Form.Text>
        ) : null}

        {/* Username field */}
        <Form.Group controlId="email">
          <Form.Control
            className="text-center"
            type="email"
            name="email"
            placeholder={dictionary.AUTH_LOGIN_EMAIL_PLACEHOLDER}
            onChange={login.onChangeHandler}
            size="lg"
          />
        </Form.Group>

        {/* Password field */}
        {login.data.email && login.validUsername() ? (
          <Form.Group controlId="password">
            <Form.Control
              className="text-center"
              type="password"
              name="password"
              placeholder={dictionary.AUTH_LOGIN_PASSWORD_PLACEHOLDER}
              onChange={login.onChangeHandler}
              size="lg"
            />
          </Form.Group>
        ) : null}

        {/* Submit button */}
        {login.data.email.length ? (
          <Button
            className="btn-pill my-2"
            variant={login.valid ? "primary" : "secondary"}
            disabled={!login.valid}
            size="lg"
            type="submit"
          >
            <strong>{dictionary.AUTH_LOGIN_SUBMIT_TEXT}</strong>
          </Button>
        ) : null}

        {providers.length ? <SocialProviders show={!login.data.email} /> : null}

        {!login.data.email ? (
          <div className="mt-3">
            <small>
              {dictionary.AUTH_LOGIN_NO_ACCOUNT_TEXT}{" "}
              <Link to={routes.SIGN_UP} className="text-dark">
                <strong>{dictionary.AUTH_LOGIN_NO_ACCOUNT_LINK}</strong>
              </Link>
            </small>
          </div>
        ) : null}
      </Form>
      <Preloader
        show={login.pending}
        color="primary"
        text={dictionary.AUTH_LOGIN_PENDING_TEXT}
      />
    </React.Fragment>
  );
};

/**
 *  Default props
 */
LoginForm.defaultProps = {};

export default LoginForm;
