"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import CaseStudyTitle from "@/components/CaseStudyTitle";
import Button from "@/components/ui/Button";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

import cover from "@/public/images/quickbooks/cover.png";
import mapper from "@/public/images/quickbooks/mapper.png";
import actions from "@/public/images/quickbooks/actions.png";
import tables from "@/public/images/quickbooks/tables.png";
import uxrSlide from "@/public/images/quickbooks/slide.jpg";
import createCustomer from "@/public/images/quickbooks/createCustomer.png";
import createInvoice from "@/public/images/quickbooks/createInvoice.png";
import actionList from "@/public/images/quickbooks/actionList.png";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function Page() {
  const { initial, animate, transition } = animationConfig;

  const styles = {
    h2: "text-xl dark:text-neutral-100 font-bold w-full mt-4 sm:max-w-[512px]",
    p: "text-neutral-900 dark:text-neutral-100 text-base flex flex-col gap-4 sm:max-w-[512px]",
  };

  return (
    <div className="flex flex-col gap-16 sm:px-8 py-8 items-center justify-center">
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className="top-6 flex flex-col items-center"
      >
        <CaseStudyTitle
          title={"Jotform | QuickBooks Integration"}
          date={"July, 2023"}
          company={"Jotform"}
          role={"Product Design"}
          className="max-w-[512px]"
        />
        <Image
          src={cover}
          alt="Jotform QuickBooks cover"
          className="my-6 rounded-lg shadow-xl w-full"
        />

        <motion.article
          initial={initial}
          animate={animate}
          transition={transition}
          className="flex flex-col gap-4 items-center"
        >
          <h2 className={styles.h2}>Introduction</h2>
          <p className={styles.p}>
            QuickBooks is one of the most widely used accounting tools for small businesses.
            As part of Jotform’s integrations team, I was responsible for designing a seamless
            QuickBooks integration experience for our users. This case study covers how we designed
            for both power and simplicity—bridging data between two platforms while keeping the
            user experience effortless.
          </p>

          <h2 className={styles.h2}>My Role</h2>
          <p className={styles.p}>
            I was the only designer on the project and worked closely with the product manager,
            engineers, and the UXR team. I was responsible for the end-to-end design—from user
            research synthesis to final high-fidelity mockups and developer handoff.
          </p>

          <h2 className={styles.h2}>The Challenge</h2>
          <p className={styles.p}>
            Many Jotform users sell products or services through their forms, but still had to
            manually create invoices or customer records in QuickBooks. Our goal was to automate
            that gap without introducing complexity or setup friction.
          </p>

          <h2 className={styles.h2}>User Research Insights</h2>
          <p className={styles.p}>
            We conducted 10+ user interviews and multiple surveys. Here’s what we learned:
          </p>
          <ul className="list-disc list-inside mt-2 flex flex-col gap-2">
            <li className={styles.p}>
              Users wanted to map specific fields between Jotform and QuickBooks
            </li>
            <li className={styles.p}>
              Most users were confused about QuickBooks data types—e.g. customer vs. invoice fields
            </li>
            <li className={styles.p}>
              Simplicity was a priority: users wanted automation without setup fatigue
            </li>
          </ul>
          <Image
            src={uxrSlide}
            alt="UX Research Slide"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />

          <h2 className={styles.h2}>Design Approach</h2>
          <p className={styles.p}>
            We broke the flow into three parts:
          </p>
          <ul className="list-disc list-inside mt-2 flex flex-col gap-2">
            <li className={styles.p}>Step 1: Authenticate your QuickBooks account</li>
            <li className={styles.p}>Step 2: Choose an action (Create Invoice or Create Customer)</li>
            <li className={styles.p}>Step 3: Map your form fields to QuickBooks fields</li>
          </ul>
          <Image
            src={mapper}
            alt="Field Mapper UI"
            className="my-6 w-full sm:max-w-[512px]"
          />

          <h2 className={styles.h2}>UI Details & Components</h2>
          <p className={styles.p}>
            I designed custom components such as field mappers, validation hints, and dynamic form selectors.
            The integration page followed Jotform’s design system but introduced more app-like interaction patterns.
          </p>
          <Image
            src={actions}
            alt="Actions screen"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />

          <h2 className={styles.h2}>Impact</h2>
          <ul className="mt-2 flex flex-col gap-2">
            <li className={styles.p}>The integration was one of the most requested features in 2023</li>
            <li className={styles.p}>Improved conversion rate on integrations setup flow</li>
            <li className={styles.p}>Reduced support tickets for invoice generation issues</li>
          </ul>
          <Image
            src={createCustomer}
            alt="Customer creation UI"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />

          <h2 className={styles.h2}>What I Learned</h2>
          <p className={styles.p}>
            This project reinforced the importance of simplifying complex user flows. Designing for users who are not
            accountants required empathy and clarity. I also learned how to collaborate across teams under tight
            timelines to deliver a highly anticipated product.
          </p>

          <div className="flex justify-start w-full sm:max-w-[512px] my-6 gap-4">
            <Button
              label={"See the User Guide"}
              href={"https://www.jotform.com/blog/introducing-jotforms-quickbooks-integration/"}
              target={"_blank"}
              type={"primary"}
            />
            <Button label={"Go Home"} href={"/"} type={"secondary"} />
          </div>
        </motion.article>
        <Contacts />
      </motion.div>
      <Footer />
    </div>
  );
}
