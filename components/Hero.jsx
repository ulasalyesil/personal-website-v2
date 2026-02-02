"use client";

//packages
import { motion } from "framer-motion";

// components
import Button from "./ui/Button";
import Contacts from "./Contacts";
import GetirFinansLogo from "./icons/GetirFinansLogo";
import { fadeInUp, withDelay } from "@/lib/animations";

export default function Hero() {
  const createAnimatedElement = (element, delay) => {
    const animation = withDelay(fadeInUp, delay);
    return (
      <motion.div
        initial={animation.initial}
        animate={animation.animate}
        transition={animation.transition}
      >
        {element}
      </motion.div>
    );
  };


  return (
    <motion.div className="w-full select-none">
      {createAnimatedElement(
        <div id="info" className="flex gap-6 flex-col">
          {createAnimatedElement(
            <div className="flex flex-col">
              <h1 className="text-neutral-900 dark:text-neutral-100 text-xl font-semibold">
                ulaş alyeşil
              </h1>
              <p className="text-neutral-500 font-mono">product designer</p>
              <div className="flex gap-2 items-center py-2 mt-2">
                <div className="w-3 h-3 bg-brand rounded-full"></div>
                <a className="text-sm text-neutral-500 font-mono">
                  open for new opportunities
                </a>
              </div>
            </div>,
            0.2
          )}
          {createAnimatedElement(
            <div className="flex flex-col gap-2">
              <motion.h1
                className="text-neutral-900 dark:text-neutral-100 text-xl sm:w-2/3 sm:text-4xl font-mono tracking-tighter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.2 }}
              >
                product designer with a focus on clear interfaces, useful tools,
                and creative technology.
              </motion.h1>
              <motion.p className="text-lg text-neutral-600 dark:text-neutral-400">
                currently at <a href="https://www.getirfinans.com" target="_blank" rel="noopener noreferrer" className="inline-block align-middle font-medium text-[#5d3ebc] dark:text-neutral-100 transition-colors duration-200"><GetirFinansLogo /></a> turning complex financial journeys into simple, measurable outcomes.
              </motion.p>
            </div>,
            0.4
          )}
          {createAnimatedElement(
            <div className="flex gap-2">
              <Button
                label={"Contact me"}
                type={"primary"}
                href="mailto:hello@ulasalyesil.com"
              />
              <Button label={"See Works"} type={"secondary"} href={"/works"} />
            </div>,
            0.6
          )}
        </div>,
        0
      )}
      <div className="mt-8">
        <Contacts />
      </div>
    </motion.div>
  );
}
