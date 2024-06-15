"use client";

//packages
import { motion } from "framer-motion";

// components
import Button from "./ui/Button";
import Contacts from "./Contacts";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function Hero() {
  const { initial, animate, transition } = animationConfig;

  const createAnimatedElement = (element, delay) => {
    return (
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: delay }}
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
                Ulaş Alyeşil
              </h1>
              <p className="text-neutral-500">Product Designer</p>
              <div className="flex gap-2 items-center py-2 px-2 mt-2">
                <div className="w-3 h-3 bg-lime-600 rounded-full"></div>
                <p className="text-sm text-neutral-500">
                  Open for new opportunities
                </p>
              </div>
            </div>,
            0.2
          )}
          {createAnimatedElement(
            <div className="flex flex-col gap-2">
              <motion.p
                className="text-neutral-900 dark:text-neutral-100 text-3xl sm:text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.2 }}
              >
<<<<<<< HEAD
                Hey there, I'm Ulaş, a designer of digital products 💻, motion
                💫 and sound 🎵 specialising in SaaS. I am currently at{" "}
=======
                Hey there, I&apos;m Ulaş, a designer of digital products 💻, motion 💫
                and sound 🎵 specialising in SaaS. I am currently at{" "}
>>>>>>> c9823ce54cb8db7862b78d60bdbb42b025553222
                <a
                  className="font-semibold hover:text-[#FF6100] transition duration-200"
                  href="https://peaka.com"
                >
                  Peaka
                </a>{" "}
                as a Product Designer.
              </motion.p>
            </div>,
            0.4
          )}
          {createAnimatedElement(
            <div className="flex gap-2">
              <Button
                label={"Talk to me"}
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
