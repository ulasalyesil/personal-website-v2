'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';


import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import TypingAnimatedText from './TypingAnimatedText';

export default function SectionItem({ date, projectTitle, role, target }) {
  return (
    <Link href={target} className="text-sm md:text-base">
      <div className="flex gap-6 cursor-pointer justify-between items-center sm:px-3 py-2 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 group transition ease-in-out duration-300">
        <div className="flex gap-2 items-start">
          <div className="flex flex-col">
            <TypingAnimatedText text={projectTitle} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 2.5,
                type: "spring",
                damping: 50,
                stiffness: 100,
                delay: 1.0,
              }}
              className="text-neutral-500 text-xs font-mono"
            >
              {role}
            </motion.p>
          </div>
          <ArrowTopRightIcon
            width={"20"}
            height={"20"}
            className="hidden transition ease-in-out duration-300 group-hover:block text-neutral-500 dark:text-neutral-100"
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3.5, delay: 1.0 }}
          id="date"
          className="text-neutral-500 text-xs text-align-right font-mono"
        >
          {date}
        </motion.p>
      </div>
    </Link>
  );
}
