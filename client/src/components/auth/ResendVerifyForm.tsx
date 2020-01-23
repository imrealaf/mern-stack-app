import React from "react";
import { Button, Form } from "react-bootstrap";

import { dictionary } from "../../data";
import { sanitize } from "../../utils";
import { Preloader } from "../ui";

/**
 *  Component name
 */
const compName = "resend-verify-form";

/**
 *  Props definition
 */
interface IResendVerifyFormProps {
  resend: any;
}

const ResendVerifyForm: React.FC<IResendVerifyFormProps> = ({ resend }) => {
  /**
   *  Render
   */
  return (
    <React.Fragment>
      {!resend.success && !resend.pending ? (
        <Form
          noValidate={true}
          onSubmit={resend.onSubmitHandler}
          id={compName}
          className="auth-form"
          style={resend.pending ? { display: "none" } : {}}
        >
          {/* Error text */}
          {resend.hasError() ? (
            <Form.Text className="text-center text-danger mb-3">
              <span
                dangerouslySetInnerHTML={sanitize(resend.getError().message)}
              />
            </Form.Text>
          ) : null}

          {/* Email field */}
          <Form.Group controlId="email">
            <Form.Control
              className="text-center"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={resend.onChangeHandler}
              size="lg"
            />
          </Form.Group>

          {/* Submit button */}
          {resend.data.email.length ? (
            <Button
              className="btn-pill my-2"
              variant={resend.valid ? "success" : "secondary"}
              disabled={!resend.valid}
              size="lg"
              type="submit"
            >
              <strong>Send</strong>
            </Button>
          ) : null}
        </Form>
      ) : null}
      {resend.success && !resend.pending ? (
        <div className="py-5">
          <div
            dangerouslySetInnerHTML={sanitize(
              dictionary.AUTH_RESEND_VERIFY_TEXT,
              false
            )}
          />
          <button
            className="btn btn-pill btn-secondary btn-xs"
            onClick={resend.onSubmitHandler}
          >
            {dictionary.AUTH_RESEND_VERIFY_BUTTON_TEXT}
          </button>
        </div>
      ) : null}
      <Preloader show={resend.pending} color="primary" />
    </React.Fragment>
  );
};

export default ResendVerifyForm;
