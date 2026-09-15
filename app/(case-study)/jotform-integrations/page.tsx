import CaseStudyLayout from '@/components/CaseStudyLayout';
import cover from '@/public/images/quickbooks/cover.webp';
import uxrSlide from '@/public/images/quickbooks/slide.jpg';
import mapper from '@/public/images/quickbooks/mapper.webp';
import actions from '@/public/images/quickbooks/actions.webp';
import createCustomer from '@/public/images/quickbooks/createCustomer.webp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jotform | QuickBooks Integration — Ulaş Alyeşil',
  description:
    'Product design for Jotform’s QuickBooks integration: automating invoices and customer records without setup friction.',
  openGraph: {
    title: 'Jotform | QuickBooks Integration — Ulaş Alyeşil',
    description: 'Product design for Jotform’s QuickBooks integration.',
    images: [{ url: cover.src }],
  },
};

export default function QuickBooksIntegrationCase() {
  return (
    <CaseStudyLayout
      slug="jotform-integrations"
      title="Designing a QuickBooks mapping flow"
      date="July, 2023"
      company="Jotform"
      role="Product Design"
      websiteUrl="https://www.jotform.com/blog/introducing-jotforms-quickbooks-integration/"
      contentBlocks={[
        {
          type: 'text',
          text: 'As part of Jotform’s integrations team, I designed a QuickBooks connection that lets form submissions create customer records and invoices.',
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
          text: 'The challenge was translating a form submission into the right QuickBooks object without asking a non-accountant to understand the accounting model first.',
        },
        {
          type: 'list',
          lead: 'Research synthesis with the UXR team highlighted three setup needs:',
          items: [
            'Map specific form fields to QuickBooks fields.',
            'Distinguish customer details from invoice fields.',
            'Keep the setup path understandable while preserving control.',
          ],
        },
        {
          type: 'image',
          src: uxrSlide,
          alt: 'User research slide',
        },
        {
          type: 'list',
          lead: 'The resulting flow has three steps:',
          ordered: true,
          items: [
            'Authenticate a QuickBooks account.',
            'Choose whether the submission creates an invoice or customer.',
            'Map form fields to QuickBooks fields.',
          ],
        },
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
          text: 'Delivered capability: people can authenticate, choose an action, and map their fields before a form submission creates the selected QuickBooks record. This case does not claim conversion or support outcomes without a published baseline.',
        },
        {
          type: 'image',
          src: createCustomer,
          alt: 'Create customer UI',
        },
        {
          type: 'text',
          text: 'The durable decision was to make the accounting choice explicit before mapping begins. That keeps the field mapper specific to the record a person is trying to create.',
        },
      ]}
    />
  );
}
