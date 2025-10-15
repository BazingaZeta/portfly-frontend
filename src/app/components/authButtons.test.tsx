import { render, screen } from "@testing-library/react";
import { SignInButton, SignOutButton } from "./authButtons";

// Mock next-auth functions
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Auth Buttons", () => {
  it("renders the sign-in button correctly", () => {
    render(<SignInButton />);

    const signInButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });
    expect(signInButton).toBeTruthy();
  });

  it("renders the sign-out button correctly", () => {
    render(<SignOutButton />);

    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    expect(signOutButton).toBeTruthy();
  });
});
