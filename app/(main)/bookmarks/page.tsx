import LinkItem from "@/components/LinkItem";
import AnimateIn, { AnimateItem } from "@/components/AnimateIn";

import { NotionLogoIcon } from "@radix-ui/react-icons";
import Cosmos from "@/public/icons/contactIcons/cosmos";

export default function Bookmarks() {
  return (
    <AnimateIn className="flex flex-col gap-4">
      <AnimateItem>
        <h2 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          Bookmarks
        </h2>
      </AnimateItem>
      <AnimateItem>
        <ul className="flex flex-col">
          <li>
            <LinkItem
              target="https://ulasalyesil.notion.site/Design-Resources-33f5823050a34db0946a836c603b6544?pvs=4"
              title="Design Resources | Notion"
              description="Collecting anything related to design here"
              image={<NotionLogoIcon width="24" height="24" />}
            />
          </li>
          <li>
            <LinkItem
              target="https://www.cosmos.so/ulasalyesil/objekte"
              title="_objekte | Cosmos"
              description="Collecting objects in Cosmos"
              image={
                <div className="size-8 flex items-center">
                  <Cosmos />
                </div>
              }
            />
          </li>
          <li>
            <LinkItem
              target="https://www.cosmos.so/ulasalyesil/haus"
              title="haus | Cosmos"
              description="Collecting interior inspirations in Cosmos"
              image={
                <div className="size-8 flex items-center">
                  <Cosmos />
                </div>
              }
            />
          </li>
          <li>
            <LinkItem
              target="https://www.cosmos.so/ulasalyesil/haus"
              title="grafik | Cosmos"
              description="Collecting graphic design inspirations in Cosmos"
              image={
                <div className="size-8 flex items-center">
                  <Cosmos />
                </div>
              }
            />
          </li>
        </ul>
      </AnimateItem>
    </AnimateIn>
  );
}
