import Link from "next/link";
import TwitterLoginButton from "../dao-create-form/twitter-auth";
import Wallet from "./wallet-wrapper";
import DashboardButton from "./dashboard-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { PlusSquare } from "lucide-react";

const NavBar = () => {
  return (
    <>
      <nav className="z-50 flex items-center justify-end gap-2 p-2 md:p-4 sticky top-0 bg-background/50 backdrop-blur-lg border-b">
        <div className="flex items-center gap-2">
          <TwitterLoginButton />
          <DashboardButton />
          <Wallet>
            <Link href="/create-dao" className="hidden md:block">
              <InteractiveHoverButton
                icon={<PlusSquare size={16}/>}
              >
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
