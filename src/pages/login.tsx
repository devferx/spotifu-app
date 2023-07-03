import Image from "next/image";

import { AUTH_URL } from "@/constants";

import spotifuLogo from "@/assets/icons/spotifu-logo.svg";
import styles from "@/styles/Login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.login}>
      <section className={styles.loginCard}>
        <Image src={spotifuLogo} alt="Spotify Logo" />
        <a className="button button-text" href={AUTH_URL}>
          Login
        </a>
      </section>
    </main>
  );
}
