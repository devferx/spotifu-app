import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { BottomBar } from "./Bottombar";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <section className={styles.layoutContent}>{children}</section>
      <BottomBar />
    </div>
  );
}
