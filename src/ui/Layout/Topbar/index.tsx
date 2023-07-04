import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// import { SpotifyContext } from "@/context/SpotifyContext";
// import { AuthContext } from "@/context/AuthContext";

import { AUTH_URL } from "@/constants";

import styles from "./TopBar.module.css";

const isLogin = false;

// TODO: Implement search
export function Topbar() {
  // const { setSearch } = useContext(spotifyContext);
  // const { isLogin } = useContext(authContext);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();
  const pageIsSearch = router.pathname === "/search";

  // const handleSearch = (ev) => {
  //   const newQuery = ev.target.value;

  //   if (!pageIsSearch?.isExact) {
  //     history.push("/search");
  //   }

  //   if (newQuery.trim() === "") {
  //     history.push("/home");
  //   }

  //   setDebouncedSearch(newQuery);
  // };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setSearch(debouncedSearch);
  //   }, 500);

  //   return () => clearTimeout(timeout);
  // }, [debouncedSearch, setSearch]);

  return (
    <div className={`${styles.topBar} ${styles.bgGray}`}>
      <div className={styles.searchInput}>
        <span className={styles.searchInputIcon} aria-label="Search Icon" />
        <input
          type="text"
          // value={debouncedSearch}
          // onChange={handleSearch}
          autoFocus={pageIsSearch}
          placeholder="Artistas, canciones o podcasts"
        />
      </div>

      {!isLogin && (
        <a className="button button-text" href={AUTH_URL}>
          Login
        </a>
      )}
    </div>
  );
}
