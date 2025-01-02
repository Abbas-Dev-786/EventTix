"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAccount } from "wagmi";

const NavItems = () => {
  const pathname = usePathname();
  const account = useAccount();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {account?.isConnected && (
        <li
          key={"/"}
          className={`${
            pathname === "/" && "text-primary-500"
          } flex-center p-medium-16 whitespace-nowrap`}
        >
          <Link href={"/"}>Home</Link>
        </li>
      )}
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          account?.address &&
          link?.isProtected && (
            <li
              key={link.route}
              className={`${
                isActive && "text-primary-500"
              } flex-center p-medium-16 whitespace-nowrap`}
            >
              <Link href={link.route}>{link.label}</Link>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default NavItems;
