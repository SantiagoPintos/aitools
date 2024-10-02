import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="file"/>
        <Button type="submit">Cargar</Button>
      </div>
    </div>
  );
}
