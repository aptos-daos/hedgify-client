import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import TwitterLoginButton from "../dao-create-form/twitter-auth";
import Wallet from "./wallet-wrapper";

const NavBar = () => {
  return (
    <nav className="z-50 flex items-center justify-end gap-2 p-2 md:p-4 sticky top-0 bg-background/50 backdrop-blur-lg border-b">
      <div className="flex items-center gap-2">
        <TwitterLoginButton />
        <Wallet>
          <Link href="/create-dao">
            <Button className="flex items-center gap-1">
              <PlusSquare className="h-3 w-3 md:h-4 md:w-4" />
              <span>Create DAO</span>
            </Button>
          </Link>
        </Wallet>
      </div>
    </nav>
  );
};

export default NavBar;
