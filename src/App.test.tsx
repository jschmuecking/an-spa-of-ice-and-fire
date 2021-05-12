import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const appBarHeader = screen.getByText("appTitle");
  expect(appBarHeader).toBeInTheDocument();
});
