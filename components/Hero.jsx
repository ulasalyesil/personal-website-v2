'use client'

//packages
import Link from "next/link";
import { motion } from "framer-motion";

// components
import Button from "./ui/Button";
import ContactCard from "./ContactCard";
import Header from "./Header";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function Hero() {

  const createAnimatedElement = (element, delay) => {
    const { initial, animate, transition } = animationConfig;

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
          <Header />
          {createAnimatedElement(
            <div className="flex flex-col">
              <h1 className="text-neutral-900 text-xl font-semibold">Ulaş Alyeşil</h1>
              <p className="text-neutral-500">Product Designer</p>
              <a
                className="flex gap-2 items-center py-2 px-2 mt-2 rounded-md hover:bg-neutral-300 text-neutral-500 hover:text-blue-500 hover:font-semibold transition ease-in-out"
                href="mailto:hello@ulasalyesil.com"
              >
                <div className="w-3 h-3 bg-lime-600 rounded-full"></div>
                <span className="text-sm">Open for new opportunities</span>
              </a>
            </div>,
            0.2
          )}
          {createAnimatedElement(
            <div className="flex flex-col gap-2">
              <motion.p
                className="text-neutral-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.2 }}
              >
                Hey there, I`&apos;m Ulaş, a designer of digital products, motion and
                sound. I am currently designing experiences at{" "}
                <a
                  className="font-semibold hover:text-[#FF6100] transition duration-200"
                  href="https://jotform.com"
                >
                  Jotform.
                </a>
              </motion.p>
              <p className="text-neutral-900">
                I design interfaces to create memorable experiences for humans.
              </p>
            </div>,
            0.4
          )}
          <motion.div 
          className="flex gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 25, delay: 0.5 }}
          >
          <motion.a
            className="text-neutral-900 font-semibold transition ease-in-out duration-150 hover:text-[#017bfc]"
            href="https://frey.money"
            target="_blank"
            rel="noopener noreferrer"
          >
            Building ▲.
          </motion.a>
          {/* <a 
          href="https://mozari.framer.website/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-900 font-semibold transition ease-in-out duration-150 hover:text-[#FF0000]"
          >
            Running  ___agency
          </a> */}
          </motion.div>
          <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 25, delay: 0.55 }}
          >
            <ContactCard
              icon={"twitter"}
              iconBorder={"#a3a3a3"}
              target={"https://twitter.com/ulasalyesil"}
            />
            <ContactCard
              icon={"posts"}
              iconBorder={"#a3a3a3"}
              target={"https://posts.cv/ulasalyesil"}
            />
            <ContactCard
              icon={"linkedin"}
              iconBorder={"#a3a3a3"}
              target={"https://www.linkedin.com/in/ulasalyesil"}
            />
            <ContactCard
              icon={"layers"}
              iconFill={"#a3a3a3"}
              target={"https://layers.to/ulas"}
            />
            <ContactCard icon={"bento"} target={"https://bento.me/ulas"} />
          </motion.div>
          {createAnimatedElement(
            <div className="flex gap-2">
                <Button label={"See Works"} type={"primary"} href={'/works'} />
                <Button label={"Talk to me"} type={"secondary"} href="mailto:hello@ulasalyesil.com" />
            </div>,
            0.6
          )}
        </div>,
        0
      )}
    </motion.div>
  );
}