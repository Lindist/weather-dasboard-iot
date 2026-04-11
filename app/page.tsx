import { Button } from "@/components/ui/button"
import { signOut } from "@/app/actions";


export default function Home() {
  return (
    <div>
      HI
      <form action={signOut}>
        <Button>Sign Out</Button>
      </form>
    </div>
  );
}
