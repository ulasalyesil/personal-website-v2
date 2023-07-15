import Link from "next/link";
import Tabs from "./Tabs"

export default function Header() {
  return (
    <div className="flex items-center justify-between w-full max-w-[512px] my-8 px-2">
      <Link href={"/"}>
        <div className="w-[56px] h-14 bg-[#017bfc] transition ease-in-out hover:border-4 rounded-full"></div>
      </Link>
      <Tabs />
    </div>
  );
}
