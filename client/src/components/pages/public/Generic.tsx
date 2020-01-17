import React from "react";
import { Container } from "react-bootstrap";

import "./Generic.scss";

import { sanitize } from "../../../utils";
import { IPageProps, Page } from "../../hoc/Page";

/**
 *  Props definition
 */
interface IGenericProps extends IPageProps {
  content: string;
}

const Generic: React.FC<IGenericProps> = ({ title, descrip, content }) => {
  return (
    <Page title={title} descrip={descrip} classes={["page-generic"]}>
      <div id="content" className="mt-5">
        <Container className="py-4">
          <h1>{title}</h1>
          <span className="divider bg-gray-300 my-3" />
          <div dangerouslySetInnerHTML={sanitize(content)} />
        </Container>
      </div>
    </Page>
  );
};

export default Generic;
