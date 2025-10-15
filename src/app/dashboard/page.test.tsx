import { render, screen } from "@testing-library/react";
import DashboardPage from "./page";

describe("Dashboard Page", () => {
  it("renders the main heading", () => {
    render(<DashboardPage />);

    const heading = screen.getByRole("heading", {
      name: /welcome to your dashboard/i,
    });

    expect(heading).not.toBeNull();
  });
});
