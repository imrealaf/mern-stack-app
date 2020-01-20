import React from "react";
import { Container } from "react-bootstrap";

import "./Generic.scss";

import { sanitize } from "../../../utils";
import { IPageProps, Page } from "../../hoc/Page";

const Generic: React.FC<IPageProps> = ({ title, description, content }) => {
  return (
    <Page title={title} description={description} classes={["page-generic"]}>
      <div id="content" className="mt-5">
        <Container>
          <h1>{title}</h1>
          <span className="divider bg-gray-300 mt-3 mb-4" />
          <div dangerouslySetInnerHTML={sanitize(content)} />
        </Container>
      </div>
    </Page>
  );
};

export default Generic;
