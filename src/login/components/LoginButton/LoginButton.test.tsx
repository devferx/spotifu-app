import { render, screen } from "@testing-library/react";
import { LoginButton } from ".";

describe("<LoginButton />", () => {
  const URL = "https://accounts.spotify.com/authorize";

  test('should render a anchor tag with the text "Login"', () => {
    render(<LoginButton AUTH_URL={URL} text="Login" />);

    const loginButton = screen.getByRole("link", { name: /login/i });

    expect(loginButton).toBeInTheDocument();
  });

  test("should render a anchor tag with the href attribute", () => {
    render(<LoginButton AUTH_URL={URL} text="Login" />);

    const loginButton = screen.getByRole("link", { name: /login/i });

    expect(loginButton).toHaveAttribute(
      "href",
      "https://accounts.spotify.com/authorize"
    );
  });
});
