import Image from "next/image";

import { AUTH_URL } from "@/constants";

import { LoginButton } from "@/login/components/LoginButton";

import spotifuLogo from "@/assets/icons/spotifu-logo.svg";
import styles from "@/styles/Login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.login}>
      <section className={styles.loginCard}>
        <Image src={spotifuLogo} alt="Spotify Logo" />
        <LoginButton AUTH_URL={AUTH_URL} text="Login" />
      </section>
    </main>
  );
}
