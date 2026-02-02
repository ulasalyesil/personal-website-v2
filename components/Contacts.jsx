import { motion } from "framer-motion";
import ContactCard from "./ContactCard";
import { fadeInUp, withDelay } from "@/lib/animations";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Contacts() {
  const animation = withDelay(fadeInUp, 0.8);
  
  return (
    <motion.div
      className="flex gap-4 max-w-[512px] items-start w-full"
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      <ContactCard
        icon={"x"}
        iconFill={"#a3a3a3"}
        target={SOCIAL_LINKS.twitter}
      />
      <ContactCard
        icon={"linkedin"}
        iconFill={"#a3a3a3"}
        target={SOCIAL_LINKS.linkedin}
      />
      <ContactCard
        icon={"layers"}
        iconFill={"#a3a3a3"}
        target={SOCIAL_LINKS.layers}
      />
      <ContactCard
        icon={"dribbble"}
        iconFill={"#a3a3a3"}
        target={SOCIAL_LINKS.dribbble}
      />
      <ContactCard icon={"bento"} target={SOCIAL_LINKS.bento} />
    </motion.div>
  );
}

