import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

import "./SocialProviders.scss";

import authConfig from "../../constants/auth";
import { getServerBase } from "../../utils";

/**
 *  Component name
 */
const compName = "social-providers";

/**
 *  Props definition
 */
interface ISocialProvidersProps {
  show: boolean;
  action: string;
}

const SocialProviders: React.FC<ISocialProvidersProps> & {
  defaultProps: Partial<ISocialProvidersProps>;
} = ({ show, action }) => {
  return show ? (
    <div className={compName}>
      <p>or {action} with</p>
      {authConfig.socialProviders.map((item: any, i: number) => {
        return (
          <a
            key={i}
            className={`btn btn-${item.id}`}
            href={getServerBase() + item.path}
            title={item.title}
          >
            <FontAwesomeIcon icon={["fab", item.icon]} size="2x" />
          </a>
        );
      })}
    </div>
  ) : null;
};

/**
 *  Default props
 */
SocialProviders.defaultProps = {
  show: true,
  action: "Login"
};

export default SocialProviders;
