import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import NavActionBtn from "./NavActionBtn";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="Evently logo"
          />
        </Link>

        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>

        <div className="flex justify-end gap-3">
          <MobileNav />
          <Button asChild className="rounded-full" size="lg">
            <NavActionBtn />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
