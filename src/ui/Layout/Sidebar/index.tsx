import { useContext, memo } from "react";
import Image from "next/image";

import { SpotifyContext } from "@/context/SpotifyContext";
import { SidebarPlaylistMenu } from "./SidebarPlaylistMenu";

import spotifuLogo from "@/assets/icons/spotifu-logo.svg";
import styles from "./Sidebar.module.css";
import NavLink from "@/ui/NavLink";

function SidebarCompoment() {
  const { userPlaylists } = useContext(SpotifyContext);

  return (
    <aside className={styles.sidebar}>
      <Image className={styles.logo} src={spotifuLogo} alt="logo spotifu" />

      <div className={styles.routes}>
        <NavLink href="/" activeClassName={styles.active} exact>
          <span
            className={`${styles.icon} ${styles.iconHome}`}
            aria-label="Home Icon"
          ></span>{" "}
          Inicio
        </NavLink>

        <NavLink href="/search" activeClassName={styles.active}>
          <span
            className={`${styles.icon} ${styles.iconSearch}`}
            aria-label="Search Icon"
          ></span>{" "}
          Buscar
        </NavLink>
      </div>

      <SidebarPlaylistMenu title="Tu Biblioteca" playlists={userPlaylists} />
    </aside>
  );
}

export const Sidebar = memo(SidebarCompoment);
