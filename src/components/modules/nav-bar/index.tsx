import Link from "next/link";
import TwitterLoginButton from "../dao-create-form/twitter-auth";
import Wallet from "./wallet-wrapper";
import DashboardButton from "./dashboard-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { PlusSquare } from "lucide-react";
import Image from "next/image";
import JiggleAnimation from "@/components/molecules/wrapper/jiggle";

const NavBar = () => {
  return (
    <>
      <nav className="z-50 flex items-center justify-end gap-2 p-2 md:p-4 sticky top-0 bg-background/50 backdrop-blur-lg border-b">
        <Link href="/" className="mr-auto flex gap-2 items-center">
          <Image
            src="/logo.svg"
            alt="Mooner Logo"
            width={35}
            height={35}
          />
          <span className="text-primary text-xl font-bold flex items-center justify-center">
            Mooner.
            <JiggleAnimation className="text-white">Money</JiggleAnimation>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <TwitterLoginButton />
          <DashboardButton />
          <Wallet>
            <Link href="/create-dao" className="hidden md:block">
              <InteractiveHoverButton icon={<PlusSquare size={16} />}>
                <span>Create DAO</span>
              </InteractiveHoverButton>
            </Link>
          </Wallet>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
