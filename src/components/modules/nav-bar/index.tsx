import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import TwitterLoginButton from "../dao-create-form/twitter-auth";
import Wallet from "./wallet-wrapper";
import DashboardButton from "./dashboard-button";

const NavBar = () => {
  return (
    <>
      <nav className="z-50 flex items-center justify-end gap-2 p-2 md:p-4 sticky top-0 bg-background/50 backdrop-blur-lg border-b">
        <div className="flex items-center gap-2">
          <DashboardButton /> 
          <TwitterLoginButton />
          <Wallet>
            <Link href="/create-dao" className="hidden md:block">
              <Button className="flex items-center gap-1">
                <PlusSquare className="h-3 w-3 md:h-4 md:w-4" />
                <span>Create DAO</span>
              </Button>
            </Link>
          </Wallet>
        </div>
      </nav>

      {/* <Link href="/create-dao" className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button className="flex items-center h-12 w-12 rounded-full shadow-lg">
          <PlusSquare className="h-5 w-5" />
        </Button>
      </Link> */}
    </>
  );
};

export default NavBar;
