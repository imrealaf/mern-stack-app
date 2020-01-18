import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./SocialProviders.scss";

import providers from "../../data/auth/social-providers.json";
import { getServerBase, interpolate } from "../../utils";

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
      {providers.map((item: any, i: number) => {
        return (
          <a
            key={i}
            className={`btn btn-${item.id}`}
            href={getServerBase() + interpolate(item.path)}
            title={interpolate(item.title)}
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
