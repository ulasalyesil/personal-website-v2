import CaseStudyLayout from '@/components/CaseStudyLayout';
import CommodoreContent from './CommodoreContent.json';
import type { TextBlock } from '@/types';

import commodoreLanding from '@/public/images/commodoreImages/commodoreLanding.webp';
import commodore1 from '@/public/images/commodoreImages/commodore1.jpg';
import commodore2 from '@/public/images/commodoreImages/commodore2.jpg';
import commodore3 from '@/public/images/commodoreImages/commodore3.jpg';
import commodore4 from '@/public/images/commodoreImages/commodore4.jpg';

export default function CommodoreCase() {
  return (
    <CaseStudyLayout
      slug="commodore"
      title="Commodore Z Glass"
      date="June, 2022"
      company="Bahcesehir University"
      role="Designer"
      contentBlocks={[
        ...CommodoreContent.paragraphs.map((text): TextBlock => ({
          type: 'text',
          text,
        })),
        {
          type: 'image',
          src: commodoreLanding,
          alt: 'Commodore Z Glass landing page',
        },
        {
          type: 'gallery',
          items: [
            { src: commodore3, alt: 'Commodore poster 3' },
            { src: commodore4, alt: 'Commodore poster 4' },
            { src: commodore1, alt: 'Commodore poster 1' },
            { src: commodore2, alt: 'Commodore poster 2' },
          ],
        },
      ]}
    />
  );
}
