import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center space-y-4">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-muted-foreground">That page doesn&apos;t exist or was moved.</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
