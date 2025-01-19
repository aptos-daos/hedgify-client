import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import TwitterLoginButton from "../dao-create-form/twitter-auth";
import Wallet from "./wallet-wrapper";

const NavBar = () => {
  return (
    <nav className="z-50 flex items-center justify-end gap-2 p-4 sticky top-0 bg-background/50 backdrop-blur-lg border-b">
      <TwitterLoginButton />
      <Wallet>
        <Link href="/create-dao">
          <Button>
            <PlusSquare className="h-4 w-4" />
            Create DAO
          </Button>
        </Link>
      </Wallet>
    </nav>
  );
};

export default NavBar;
