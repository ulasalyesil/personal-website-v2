'use client';
import { motion } from 'framer-motion';
import ContactCard from './ContactCard';

export default function Contacts() {
  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, type: "spring", stiffness: 25 },
  };
  return (
    <motion.div
      className="flex gap-4 max-w-[512px] items-start w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 25,
        delay: 0.8,
      }}
    >
      <ContactCard
        icon={"x"}
        iconFill={"#a3a3a3"}
        target={"https://twitter.com/ulasalyesil"}
      />
      <ContactCard
        icon={"linkedin"}
        iconFill={"#a3a3a3"}
        target={"https://www.linkedin.com/in/ulasalyesil"}
      />
      <ContactCard
        icon={"layers"}
        iconFill={"#a3a3a3"}
        target={"https://layers.to/ulas"}
      />
      <ContactCard
        icon={"dribbble"}
        iconFill={"#a3a3a3"}
        target={"https://dribbble.com/ulasalyesil"}
      />
      <ContactCard icon={"bento"} target={"https://bento.me/ulas"} />
    </motion.div>
  );
}
