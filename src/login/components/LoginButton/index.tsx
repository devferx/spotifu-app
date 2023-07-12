interface LoginButtonProps {
  AUTH_URL: string;
  text: string;
}

export function LoginButton({ AUTH_URL, text }: LoginButtonProps) {
  return (
    <a className="button button-text" href={AUTH_URL}>
      {text}
    </a>
  );
}
