import { handleSignOut } from "@/app/actions/authActions";
import { Button } from "./ui/button";

export default function SignOutDialog() {
  return (
    <form action={handleSignOut}>
      <Button variant="default" type="submit" className="text-white">
        Sign Out
      </Button>
    </form>
  );
}
