import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { AuthContext } from "@/context/AuthContext";
import { SpotifyContext } from "@/context/SpotifyContext";

import { AUTH_URL } from "@/constants";

import styles from "./TopBar.module.css";

export function Topbar() {
  const router = useRouter();

  const { setSearch } = useContext(SpotifyContext);
  const { isLogin } = useContext(AuthContext);

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const pageIsSearch = router.pathname === "/search";

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = ev.target.value;

    if (!pageIsSearch) {
      router.push("/search");
    }

    if (newQuery.trim() === "") {
      router.push("/");
    }

    setDebouncedSearch(newQuery);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 500);

    return () => clearTimeout(timeout);
  }, [debouncedSearch, setSearch]);

  return (
    <div className={`${styles.topBar} ${styles.bgGray}`}>
      <div className={styles.searchInput}>
        <span className={styles.searchInputIcon} aria-label="Search Icon" />
        <input
          type="text"
          value={debouncedSearch}
          onChange={handleSearch}
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
