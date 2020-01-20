import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import config from "../../constants/config";
import * as routes from "../../constants/routes";
import { dictionary } from "../../data";
import { sanitize } from "../../utils";
import { Preloader } from "../ui";
import { SocialProviders } from "./";

/**
 *  Component name
 */
const compName = "signup-form";

/**
 *  Props definition
 */
interface ISignUpFormProps {
  signUp: any;
}

const SignUpForm: React.FC<ISignUpFormProps> = ({ signUp }) => {
  /**
   *  Element refs
   */
  const refs = {
    name: useRef() as any,
    email: useRef() as any,
    password: useRef() as any,
    passwordConfirm: useRef() as any
  };

  /**
   *  Render
   */
  return (
    <React.Fragment>
      {!signUp.verify ? (
        <Form
          noValidate={true}
          onSubmit={signUp.onSubmitHandler}
          id={compName}
          className="auth-form"
          style={signUp.pending ? { display: "none" } : {}}
        >
          {/* Error text */}
          {signUp.hasError() ? (
            <Form.Text className="text-center text-danger mb-3">
              <span
                dangerouslySetInnerHTML={sanitize(signUp.getError().message)}
              />
            </Form.Text>
          ) : null}

          {/* First name field */}
          {signUp.data.email.length ? (
            <Form.Group controlId="firstName">
              <Form.Label className="sr-only">Name</Form.Label>
              <Form.Control
                className="text-center"
                type="text"
                name="name"
                placeholder="Enter your name"
                ref={refs.name}
                onChange={signUp.onChangeHandler}
                size="lg"
              />
            </Form.Group>
          ) : null}

          {/* Email field */}
          <Form.Group controlId="email">
            <Form.Label className="sr-only">Email</Form.Label>
            <Form.Control
              isInvalid={signUp.hasError("email")}
              className="text-center"
              type="email"
              name="email"
              placeholder="Enter your email"
              ref={refs.email}
              onChange={signUp.onChangeHandler}
              size="lg"
            />
            {signUp.hasError("email") ? (
              <Form.Text className="text-danger">
                {signUp.getError("email").message}
              </Form.Text>
            ) : null}
            {signUp.data.email.length > 3 ? (
              <Form.Text>This will be your username</Form.Text>
            ) : null}
          </Form.Group>

          {/* Password field */}
          {signUp.data.email.length ? (
            <Form.Group controlId="password">
              <Form.Label className="sr-only">Password</Form.Label>
              <Form.Control
                className="text-center"
                type="password"
                name="password"
                placeholder="Choose your password"
                ref={refs.password}
                onChange={signUp.onChangeHandler}
                size="lg"
              />
              {signUp.passwordNotValid() ? (
                <Form.Text className="text-secondary">
                  {dictionary.AUTH_PASSWORD_MIN}
                </Form.Text>
              ) : null}
            </Form.Group>
          ) : null}

          {/* Confirm password field */}
          {signUp.data.password && !signUp.passwordNotValid() ? (
            <Form.Group controlId="passwordConfirm">
              <Form.Label className="sr-only">Confirm password</Form.Label>
              <Form.Control
                className="text-center"
                type="password"
                name="passwordConfirm"
                placeholder="Confirm your password"
                ref={refs.passwordConfirm}
                onChange={signUp.onChangeHandler}
                size="lg"
              />
              {signUp.passwordsDontMatch() ? (
                <Form.Text className="text-secondary">
                  {dictionary.AUTH_PASSWORD_MATCH}
                </Form.Text>
              ) : null}
            </Form.Group>
          ) : null}

          {/* Submit button */}
          {signUp.data.email.length ? (
            <Button
              className="btn-pill my-2"
              variant={signUp.valid ? "primary" : "secondary"}
              disabled={!signUp.valid}
              type="submit"
              size="lg"
            >
              <strong>Sign Up</strong>
            </Button>
          ) : null}

          <SocialProviders
            action="Sign Up"
            show={
              !signUp.data.name && !signUp.data.email && !signUp.data.password
            }
          />

          {!signUp.data.name && !signUp.data.email && !signUp.data.password ? (
            <div className="mt-3">
              <small>
                Already have an account?{" "}
                <Link to={routes.LOGIN} className="text-dark">
                  <strong>Login</strong>
                </Link>
              </small>
            </div>
          ) : null}
        </Form>
      ) : (
        <div
          className="py-5"
          dangerouslySetInnerHTML={sanitize(signUp.verify)}
        />
      )}
      <Preloader
        show={signUp.pending}
        color="primary"
        text="Signing you up.."
      />
    </React.Fragment>
  );
};

export default SignUpForm;
