/**
 *  App (Tests)
 *
 *  @type Test
 *  @desc testing the main app container component
 */

import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BrowserRouter as Router } from "react-router-dom";
import { App } from "../components";

// Configure for React 16
configure({ adapter: new Adapter() });

// Create suite
describe("<App />", () => {
  const app = (
    <Router>
      <App />
    </Router>
  );

  // 1. Render
  it("renders without crashing", () => {
    const wrapper = mount(app);
    wrapper.unmount();
  });
});
