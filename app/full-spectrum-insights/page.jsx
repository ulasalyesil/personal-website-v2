'use client';

import CaseStudyLayout from '@/components/CaseStudyLayout';
import fsiCover from '@/public/images/fsi/fsi_cover.png';
import fsiWeb from '@/public/images/fsi/fsi_web.png';

export default function FullSpectrumInsightsCase() {
  return (
    <CaseStudyLayout
      title="Full Spectrum Insights"
      date="June, 2025"
      company="Full Spectrum Insights"
      role="Web Design, Framer Dev"
      websiteUrl="https://fullspectruminsights.com"
      contentBlocks={[
        {
          type: 'text',
          text: 'Full Spectrum Insights is a boutique consultancy working at the intersection of data, behavior, and technology.',
        },
        {
          type: 'image',
          src: fsiCover,
          alt: 'Full Spectrum Insights homepage cover',
        },
        {
          type: 'text',
          text: 'I led the end-to-end design and development of their website, defining the information hierarchy, designing the UI, and implementing a responsive, performance-focused build using Next.js.',
        },
        {
          type: 'image',
          src: fsiWeb,
          alt: 'Full Spectrum Insights full-page screenshot',
        },
        {
          type: 'text',
          text: 'The result is a clean, credible web presence that communicates FSI’s unique value proposition and sets a solid foundation for future content and storytelling.',
        },
      ]}
    />
  );
}
