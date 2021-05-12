import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "./home.page";

test("renders header text", () => {
  render(<Home />);
  const header = screen.getByText("overview.header");
  expect(header).toBeInTheDocument();
});
