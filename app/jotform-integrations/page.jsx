"use client";

import { motion } from "framer-motion";

import CaseStudyTitle from "@/components/CaseStudyTitle";
import Button from "@/components/ui/Button";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

// images
import Image from "next/image";
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
    h2: "text-xl dark:text-neutral-100 font-bold w-full mt-4 w-full sm:w-full sm:max-w-[512px]",
    p: "text-neutral-900 dark:text-neutral-100 text-base flex flex-col gap-4 sm:w-full sm:max-w-[512px]",
  };

  return (
    <div className="flex flex-col gap-16 px-4 sm:px-8 py-8 items-center justify-center">
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className="top-6 flex flex-col items-center"
      >
        <CaseStudyTitle
          title={"Jotform Integrations"}
          date={"July, 2023"}
          company={"Jotform"}
          role={"Product Design"}
          className="max-w-[512px]"
        />
        <Image
          src={cover}
          alt="jotform quickbooks"
          className="my-6 rounded-lg shadow-xl w-full"
        />
        {/* Jotform QuickBooks Content */}
        <motion.article
          initial={initial}
          animate={animate}
          transition={transition}
          className="flex flex-col gap-4 items-center"
        >
          <h2 className={styles.h2}>Introduction</h2>
          <p className={styles.p}>
            Jotform is a leading platform that allows users to create online
            forms and collect data seamlessly. As a Product Designer at Jotform,
            I contributed to a significant project aimed at designing a seamless
            integration with QuickBooks, a widely used accounting software. This
            case study explores the user-centric design process that drove the
            development of this integration and improved Jotform&apos;s overall
            integrations experience.
          </p>

          <h2 className={styles.h2}>My Role</h2>
          <p className={styles.p}>
            As the sole designer on this project, I collaborated with the
            Integrations and UXR teams. My main goal was to understand user
            needs by participating in user interviews conducted by the UXR team
            and overlook the whole design process. Based on the research
            findings and personas, I designed user flows, journey maps, and new
            components that aligned with our design system.
          </p>
          <h2 className={styles.h2}>The Goal</h2>
          <p className={styles.p}>
            At Jotform, we review feature requests on a daily basis and strive
            to meet our users&apos; needs. One highly requested feature was
            integration with QuickBooks. We recognized the importance of this
            integration through our own finance team&apos;s experience and by
            talking to users who rely on QuickBooks regularly. Many Jotform
            users use our platform for selling products or services. Previously,
            QuickBooks users had to manually create customer records and
            invoices after each sale made through the form. Our dedicated
            integrations team identified this opportunity and delved into the
            various use cases of QuickBooks. Our primary objective was to enable
            users to automate their invoice creation process with a single
            click. This endeavor presented numerous challenges and required
            extensive research.
          </p>
          <h2 className={styles.h2}>Understanding User Needs</h2>
          <Image
            src={uxrSlide}
            alt="good afternoon"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />
          <p className={styles.p}>
            To meet our users&apos; needs effectively, we conducted thorough
            user interviews and surveys. These activities yielded valuable
            insights into our users&apos; pain points and requirements, both
            qualitatively and quantitatively. QuickBooks is a comprehensive
            product with numerous features. Our goal was to determine the
            optimal utilization of QuickBooks with Jotform. Based on multiple
            interviews and surveys, we concluded that the two most effective
            actions for Jotform and QuickBooks integration are: creating a
            customer record and generating an invoice.
          </p>
          <ul className="list-disc list-inside mt-2 flex flex-col items-center">
            <li className={styles.p}>
              Users wanted a seamless integration with QuickBooks to sync data
              effortlessly and reduce manual data entry.
            </li>
            <li className={styles.p}>
              Customizable data mapping between Jotform and QuickBooks was
              crucial to accommodate diverse business needs.
            </li>
            <Image
              src={mapper}
              alt="good afternoon"
              className="my-6 w-full sm:max-w-[512px]"
            />
            <li className={styles.p}>
              A user-friendly interface with clear instructions was necessary
              for a smooth onboarding experience.
            </li>
            <Image
              src={actions}
              alt="good afternoon"
              className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
            />
            <li className={styles.p}>
              Users expressed interest in automated workflows that could trigger
              actions in other Jotform products, such as Jotform Tables and
              Jotform Approvals, upon successful integration with QuickBooks.
            </li>
            <Image
              src={tables}
              alt="good afternoon"
              className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
            />
          </ul>

          <h2 className={styles.h2}>Challenges and Shifting the Approach</h2>
          <p className={styles.p}>
            In user studies, we discovered challenges in integrating QuickBooks
            with Jotform. For instance, product name discrepancies posed an
            issue for invoicing, and some users didn&apos;t utilize the
            &quot;Product List&quot; form field, affecting integration.
          </p>
          <p className={styles.p}>
            To address these challenges, we made pivotal changes in our design
            approach:
          </p>
          <ol className="list-decimal list-inside mt-2 gap-4 flex flex-col">
            <li className={styles.p}>
              Expanded Integration: Beyond &quot;Product List&quot; users could
              now select from various form fields without losing functionality.
            </li>
            <li className={styles.p}>
              Educational Resources: We created tutorials to promote the
              &quot;Product List&quot; field&apos;s benefits, enhancing
              users&apos; integration experience.
            </li>
            <li className={styles.p}>
              Transparent Communication: We kept users informed of updates and
              encouraged feedback for continuous improvement.
            </li>
          </ol>

          <h2 className={styles.h2}>
            Collaboration for Enhanced Possibilities
          </h2>
          <p className={styles.p}>
            Collaboration is key at Jotform. During the QuickBooks integration
            project, we fostered collaboration among different teams, unlocking
            new possibilities for both the integration and other Jotform
            products.
          </p>
          <ul className="list-disc list-inside mt-2">
            <li className={styles.p}>
              Jotform Tables Integration: Leveraging the QuickBooks integration,
              we enabled seamless data syncing with Jotform Tables, empowering
              users to visualize and analyze accounting data effectively for
              data-driven decision-making.
            </li>
            <li className={styles.p}>
              Jotform Approvals Integration: Integrating with Jotform Approvals
              allowed users to automate approval processes based on accounting
              data, streamlining business workflows and saving time.
            </li>
          </ul>

          <h2 className={styles.h2}>Continued Iteration and User Feedback</h2>
          <p className={styles.p}>
            Our design process didn&apos;t end with the initial release. We
            actively sought and welcomed user feedback, iterating on the
            integration to address pain points and continuously enhance the
            overall experience.
          </p>
          <Image
            src={createCustomer}
            alt="good afternoon"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />
          <Image
            src={createInvoice}
            alt="good afternoon"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />
          <Image
            src={actionList}
            alt="good afternoon"
            className="my-6 w-full sm:max-w-[720px] shadow-xl rounded-xl"
          />
          <h2 className={styles.h2}>Conclusion</h2>
          <p className={styles.p}>
            The QuickBooks integration project exemplifies Jotform&apos;s
            commitment to prioritizing user needs in product design. Through
            user interviews, surveys, and iterative development, we designed an
            integration that simplifies accounting workflows for our users.
            Collaborating with different teams unlocked new possibilities,
            providing users with enhanced value across various Jotform products.
            We remain dedicated to refining the integration based on user
            feedback, ensuring that Jotform continues to empower users in their
            professional journeys. The challenges we encountered were met with
            innovative solutions, further solidifying Jotform&apos;s position as
            a user-centric platform.
          </p>
          <div className="flex justify-start w-full sm:max-w-[512px] my-6 gap-4">
            <Button
              label={"See the User Guide"}
              href={
                "https://www.jotform.com/blog/introducing-jotforms-quickbooks-integration/"
              }
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
