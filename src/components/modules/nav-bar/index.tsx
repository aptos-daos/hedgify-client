import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { WalletSelector } from "@/components/WalletSelector";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-end gap-2 p-4">
      <Link href="/create-dao">
        <Button>
          <PlusSquare className="h-4 w-4" />
          Create DAO
        </Button>
      </Link>
      <div className="w-fit">
        <WalletSelector />
      </div>
    </nav>
  );
};

export default NavBar;
