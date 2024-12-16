import { GitForkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
export default function Header() {
  return (
    <div className="flex justify-between items-center text-xs text-gray-600 py-4">
      <div>
        <a className="text-sm" href="https://dianafrial.net" target="_blank">
          <Badge variant={"outline"}>Hire me!</Badge>
        </a>
      </div>
      <div className="flex items-center gap-5">
        <a href="#" className="text-orange-500">
          Change logs v1.0
        </a>
        <a
          href="https://github.com/agilworld/we-love-photos-app"
          className="flex items-center"
          target="_blank"
        >
          <GitForkIcon size={15} className="mr-1" />
          Fork on Github
        </a>
      </div>
    </div>
  );
}
