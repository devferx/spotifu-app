import Link from "next/link";

import { useRouter } from "next/router";
import React from "react";

interface NavLinkProps {
  href: string;
  activeClassName: string;
  children: React.ReactNode;
  exact?: boolean;
}

type Props = typeof Link.defaultProps & NavLinkProps;

function NavLink({ href, exact = false, activeClassName, ...props }: Props) {
  const router = useRouter();

  const isActive = exact
    ? router.asPath === href
    : router.asPath.startsWith(href);

  return (
    <Link href={href} className={isActive ? activeClassName : ""} {...props} />
  );
}

export default NavLink;
