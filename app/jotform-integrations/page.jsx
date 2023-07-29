"use client";

import Link from "next/link";

import CaseStudyTitle from "@/components/CaseStudyTitle";
import qbContent from "./qbContent.json";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

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
    h2: "text-xl font-bold w-full mt-4 max-w-[512px]",
    p: "text-neutral-900 dark:text-neutral-100 text-base flex flex-col gap-4 max-w-[512px]",
  };

  return (
    <div className="flex flex-col gap-16 px-8 py-8 items-center justify-center">
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className="top-6"
      >
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
          className="flex flex-col items-center"
        >
          <CaseStudyTitle
            title={"Jotform Integrations"}
            date={"July, 2023"}
            company={"Jotform"}
            role={"Product Design"}
          />
          <Image
            src={cover}
            alt="good afternoon"
            className="my-6 rounded-lg shadow-xl w-full"
          />
          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
          >
            {/* Jotform QuickBooks Content */}
            <div className="flex flex-col gap-4 items-center">
              <h2 className={styles.h2}>Introduction</h2>
              <p className={styles.p}>
                Jotform is a leading platform that allows users to create online
                forms and collect data seamlessly. As a Product Designer at
                Jotform, I contributed to a significant project aimed at
                designing a seamless integration with QuickBooks, a widely used
                accounting software. This case study explores the user-centric
                design process that drove the development of this integration
                and improved Jotform&apos;s overall integrations experience.
              </p>

              <h2 className={styles.h2}>My Role</h2>
              <p className={styles.p}>
                As the sole designer on this project, I collaborated with the
                Integrations and UXR teams. My main goal was to understand user
                needs by participating in user interviews conducted by the UXR
                team. Based on the research findings and personas, I designed
                user flows, journey maps, and new components that aligned with
                our design system.
              </p>

              <h2 className={styles.h2}>Understanding User Needs</h2>
              <p className={styles.p}>
                To effectively meet our users&apos; needs, we conducted
                extensive user interviews and surveys. This provided valuable
                insights into our users&apos; pain points and requirements, both
                qualitatively and quantitatively.
              </p>
              <ul className="list-disc list-inside mt-2 flex flex-col items-center">
                <li className={styles.p}>
                  Users wanted a seamless integration with QuickBooks to sync
                  data effortlessly and reduce manual data entry.
                </li>
                <li className={styles.p}>
                  Customizable data mapping between Jotform and QuickBooks was
                  crucial to accommodate diverse business needs.
                </li>
                <Image
                  src={mapper}
                  alt="good afternoon"
                  className="my-6 max-w-[512px]"
                />
                <li className={styles.p}>
                  A user-friendly interface with clear instructions was
                  necessary for a smooth onboarding experience.
                </li>
                <Image
                  src={actions}
                  alt="good afternoon"
                  className="my-6 max-w-[720px] shadow-xl rounded-xl"
                />
                <li className={styles.p}>
                  Users expressed interest in automated workflows that could
                  trigger actions in other Jotform products, such as Jotform
                  Tables and Jotform Approvals, upon successful integration with
                  QuickBooks.
                </li>
                <Image
                  src={tables}
                  alt="good afternoon"
                  className="my-6 max-w-[720px] shadow-xl rounded-xl"
                />
              </ul>

              <h2 className={styles.h2}>
                Challenges and Shifting the Approach
              </h2>
              <p className={styles.p}>
                Through user studies, we identified some challenges. For
                example, QuickBooks required exact product names for invoicing,
                which might not align with Jotform&apos;s product names.
                Additionally, not all users were utilizing the &quot;Product
                List&quot; form field, affecting the ideal integration scenario.
              </p>
              <p className={styles.p}>
                To address these challenges, we made pivotal changes in our
                design approach:
              </p>
              <ol className="list-decimal list-inside mt-2">
                <li className={styles.p}>
                  Guiding Users on Product Name Matching: We introduced a smart
                  suggestion mechanism during the integration setup,
                  automatically recommending similar product names based on user
                  input. This reduced discrepancies and potential errors in
                  product name matching.
                </li>
                <li className={styles.p}>
                  Expanding Integration to Other Form Fields: To offer more
                  flexibility, we expanded the integration beyond the
                  &quot;Product List&quot; form field. Users could now choose
                  between various form fields, such as &quot;Single
                  Selection&quot; and &quot;Multiple Selection,&quot; without
                  compromising functionality.
                </li>
                <li className={styles.p}>
                  Educational Resources: We developed tutorials and guides to
                  promote the benefits of the &quot;Product List&quot; form
                  field, encouraging users to explore its potential and enhance
                  their integration experience.
                </li>
                <li className={styles.p}>
                  Clear Communication: Throughout the design process, we
                  maintained transparent communication with users, informing
                  them of updates, improvements, and new features in the
                  QuickBooks integration. We actively encouraged feedback
                  channels for continuous improvement.
                </li>
              </ol>

              <h2 className={styles.h2}>
                Collaboration for Enhanced Possibilities
              </h2>
              <p className={styles.p}>
                Collaboration is key at Jotform. During the QuickBooks
                integration project, we fostered collaboration among different
                teams, unlocking new possibilities for both the integration and
                other Jotform products.
              </p>
              <ul className="list-disc list-inside mt-2">
                <li className={styles.p}>
                  Jotform Tables Integration: Leveraging the QuickBooks
                  integration, we enabled seamless data syncing with Jotform
                  Tables, empowering users to visualize and analyze accounting
                  data effectively for data-driven decision-making.
                </li>
                <li className={styles.p}>
                  Jotform Approvals Integration: Integrating with Jotform
                  Approvals allowed users to automate approval processes based
                  on accounting data, streamlining business workflows and saving
                  time.
                </li>
              </ul>

              <h2 className={styles.h2}>
                Continued Iteration and User Feedback
              </h2>
              <Image
                src={uxrSlide}
                alt="good afternoon"
                className="my-6 max-w-[720px] shadow-xl rounded-xl"
              />
              <p className={styles.p}>
                Our design process didn&apos;t end with the initial release. We
                actively sought and welcomed user feedback, iterating on the
                integration to address pain points and continuously enhance the
                overall experience.
              </p>
              <Image
                src={createCustomer}
                alt="good afternoon"
                className="my-6 max-w-[720px] shadow-xl rounded-xl"
              />
              <Image
                src={createInvoice}
                alt="good afternoon"
                className="my-6 max-w-[720px] shadow-xl rounded-xl"
              />
              <Image
                src={actionList}
                alt="good afternoon"
                className="my-6 max-w-[720px] shadow-xl rounded-xl"
              />
              <h2 className={styles.h2}>Conclusion</h2>
              <p className={styles.p}>
                The QuickBooks integration project exemplifies Jotform&apos;s
                commitment to prioritizing user needs in product design. Through
                user interviews, surveys, and iterative development, we designed
                an integration that simplifies accounting workflows for our
                users. Collaborating with different teams unlocked new
                possibilities, providing users with enhanced value across
                various Jotform products. We remain dedicated to refining the
                integration based on user feedback, ensuring that Jotform
                continues to empower users in their professional journeys. The
                challenges we encountered were met with innovative solutions,
                further solidifying Jotform&apos;s position as a user-centric
                platform.
              </p>
              <div className="flex justify-start w-full max-w-[512px] my-6 gap-4">
                <Button
                  label={"See the User Guide"}
                  href={
                    "https://www.jotform.com/blog/introducing-jotforms-quickbooks-integration/"
                  }
                  target={"_blank"}
                  type={"primary"}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        alt="Good Afternoon Creative landing page"
        className="mb-4"
      >
        {/* <Image src={gacWeb} className="w-full rounded-2xl" alt="logo" /> */}
      </motion.div>

      <Footer />
    </div>
  );
}
