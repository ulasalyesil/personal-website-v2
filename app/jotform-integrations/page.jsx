'use client';

import CaseStudyLayout from '@/components/CaseStudyLayout';
import cover from '@/public/images/quickbooks/cover.png';
import uxrSlide from '@/public/images/quickbooks/slide.jpg';
import mapper from '@/public/images/quickbooks/mapper.png';
import actions from '@/public/images/quickbooks/actions.png';
import createCustomer from '@/public/images/quickbooks/createCustomer.png';

export default function QuickBooksIntegrationCase() {
  return (
    <CaseStudyLayout
      title="Jotform | QuickBooks Integration"
      date="July, 2023"
      company="Jotform"
      role="Product Design"
      websiteUrl="https://www.jotform.com/blog/introducing-jotforms-quickbooks-integration/"
      contentBlocks={[
        {
          type: 'text',
          text: 'QuickBooks is one of the most widely used accounting tools for small businesses. As part of Jotform’s integrations team, I designed a seamless QuickBooks integration to bridge data between two platforms while keeping the experience effortless.',
        },
        {
          type: 'image',
          src: cover,
          alt: 'Jotform QuickBooks integration cover',
        },
        {
          type: 'text',
          text: 'I was the sole designer on this project, collaborating with PMs, engineers, and the UXR team. I handled end-to-end design—from research synthesis to high-fidelity mockups and developer handoff.',
        },
        {
          type: 'text',
          text: 'The Challenge: Many users manually created invoices and customer records in QuickBooks after collecting orders in Jotform. Our goal was to automate that gap without adding complexity or setup friction.',
        },
        {
          type: 'text',
          text: 'User Research Insights: We conducted 10+ interviews and surveys, learning:',
        },
        { type: 'text', text: '• Users needed to map specific form fields to QuickBooks fields.' },
        { type: 'text', text: '• There was confusion around QuickBooks data types (customer vs. invoice fields).' },
        { type: 'text', text: '• Simplicity was key: users wanted automation without setup fatigue.' },
        {
          type: 'image',
          src: uxrSlide,
          alt: 'User research slide',
        },
        {
          type: 'text',
          text: 'Design Approach: We structured the flow into three steps:',
        },
        { type: 'text', text: '• Authenticate your QuickBooks account' },
        { type: 'text', text: '• Choose an action (Create Invoice or Create Customer)' },
        { type: 'text', text: '• Map your form fields to QuickBooks fields' },
        {
          type: 'image',
          src: mapper,
          alt: 'Field mapper interface',
        },
        {
          type: 'text',
          text: 'UI Details & Components: I designed custom mappers, validation hints, and dynamic selectors, extending Jotform’s design system with more app-like interactions.',
        },
        {
          type: 'image',
          src: actions,
          alt: 'Action selection screen',
        },
        {
          type: 'text',
          text: 'Impact: This became one of our most requested features of 2023, boosting setup conversions and reducing support tickets.',
        },
        {
          type: 'image',
          src: createCustomer,
          alt: 'Create customer UI',
        },
        {
          type: 'text',
          text: 'What I Learned: Simplifying complex workflows for non-accountant users requires deep empathy, clear UI patterns, and tight cross-team collaboration under tight deadlines.',
        },
      ]}
    />
  );
}
