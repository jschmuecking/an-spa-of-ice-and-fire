import { render, screen } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from "history";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from "react-router";
import HouseDetail from "./house-detail.page";

test("renders header text", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <HouseDetail />
    </Router>
  );
  const button = screen.getByText("houseDetail.ui.backButton");
  expect(button).toBeInTheDocument();
});
