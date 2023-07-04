import { memo } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import "./styles.css";

const SidebarPlaylistMenuComponent = ({ title, playlists }) => {
  return (
    <ul className="sidebar__list">
      <li className="sidebar__list__title">{title}</li>
      {playlists.map((playlist, i) => (
        <li key={playlist?.id || i} className="sidebar__list__item">
          {playlist === null ? (
            <Link href="/">
              <Skeleton />
            </Link>
          ) : (
            <Link
              activeClassName="active-playlist"
              to={`/playlist/${playlist.id}`}
            >
              {playlist.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export const SidebarPlaylistMenu = memo(SidebarPlaylistMenuComponent);
