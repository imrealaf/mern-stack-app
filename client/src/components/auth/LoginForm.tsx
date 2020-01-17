import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./index.scss";

import * as routes from "../../constants/routes";
import { useQuery } from "../../hooks";
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
  login: any;
  showSocial: boolean;
  showSignUpLink: boolean;
}

const LoginForm: React.FC<ILoginFormProps> & {
  defaultProps: Partial<ILoginFormProps>;
} = ({ login, showSocial, showSignUpLink }) => {
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
                  <strong>Click here</strong>
                </Link>{" "}
                to resend verification email
              </span>
            ) : null}
          </Form.Text>
        ) : null}

        {/* Provider error text */}
        {providerAuthSuccess &&
        providerAuthSuccess === "fail" &&
        !login.data.email ? (
          <Form.Text className="text-center text-danger mb-3">
            The email of the account you're trying to login with is already
            assigned to an account
          </Form.Text>
        ) : null}

        {/* Username field */}
        <Form.Group controlId="email">
          <Form.Control
            className="text-center"
            type="email"
            name="email"
            placeholder="Enter your email"
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
              placeholder="Enter your password"
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
            <strong>Log In</strong>
          </Button>
        ) : null}

        {showSocial ? <SocialProviders show={!login.data.email} /> : null}

        {showSignUpLink && !login.data.email ? (
          <div className="mt-3">
            <small>
              Don't have an account?{" "}
              <Link to={routes.SIGN_UP}>
                <strong>Sign Up</strong>
              </Link>
            </small>
          </div>
        ) : null}
      </Form>
      <Preloader show={login.pending} color="primary" text="Signing you in.." />
    </React.Fragment>
  );
};

/**
 *  Default props
 */
LoginForm.defaultProps = {
  showSocial: true,
  showSignUpLink: true
};

export default LoginForm;
