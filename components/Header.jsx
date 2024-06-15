"use client";

import Link from "next/link";
import Tabs from "./Tabs";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="flex items-center justify-between w-full max-w-[1200px] my-8 px-2">
      <Link href={"/"}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.0 }}
          className="w-[56px] h-14 bg-[#017bfc] transition ease-in-out hover:border-4 rounded-full"
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
  );
}
