import { useContext, memo } from "react";
import Link from "next/link";
import Image from "next/image";

import { SpotifyContext } from "@/context/SpotifyContext";
import { SidebarPlaylistMenu } from "./SidebarPlaylistMenu";

import spotifuLogo from "@/assets/icons/spotifu-logo.svg";
import styles from "./Sidebar.module.css";
import NavLink from "@/ui/NavLink";

// TODO: Add active class when is active
function SidebarCompoment() {
  const { userPlaylists, featuredPlaylists } = useContext(SpotifyContext);

  return (
    <aside className={styles.sidebar}>
      <Image className={styles.logo} src={spotifuLogo} alt="logo spotifu" />

      <div className={styles.routes}>
        <NavLink href="/" activeClassName={styles.active} exact>
          <span
            className={`${styles.icon} ${styles.iconHome}`}
            aria-label="Home Icon"
          ></span>{" "}
          Home
        </NavLink>

        <NavLink href="/search" activeClassName={styles.active}>
          <span
            className={`${styles.icon} ${styles.iconSearch}`}
            aria-label="Search Icon"
          ></span>{" "}
          Buscar
        </NavLink>

        <Link href="/">
          <span
            className={`${styles.icon} ${styles.iconCreditCard}`}
            aria-label="Credit Card Icon"
          ></span>{" "}
          Premium
        </Link>
      </div>

      <SidebarPlaylistMenu title="Tu Biblioteca" playlists={userPlaylists} />
      <SidebarPlaylistMenu title="Playlists" playlists={featuredPlaylists} />
    </aside>
  );
}

export const Sidebar = memo(SidebarCompoment);
