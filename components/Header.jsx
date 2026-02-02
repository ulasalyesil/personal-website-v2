"use client";

import Link from "next/link";
import Tabs from "./Tabs";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="flex items-center justify-between sm:justify-start w-full max-w-[1200px] my-8 sm:px-2 sm:gap-16">
      <div className="flex gap-16 w-full max-w-[512px]">
        <Link href={"/"}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.0 }}
            className="w-14 h-14 bg-brand rounded-full transition ease-in-out hover:scale-110"
          />
        </Link>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.0 }}
        >
          <Tabs />
        </motion.div>
      </div>
    </div>
  );
}
