'use client';

import CaseStudyLayout from '@/components/CaseStudyLayout';
import img1 from '@/public/images/genesis/1.jpg';
import img2 from '@/public/images/genesis/2.jpg';
import img3 from '@/public/images/genesis/3.png';
import img4 from '@/public/images/genesis/4.jpg';
import img5 from '@/public/images/genesis/5.png';
import img6 from '@/public/images/genesis/6.jpg';
import img7 from '@/public/images/genesis/7.jpg';
import img8 from '@/public/images/genesis/8.png';
import img9 from '@/public/images/genesis/9.jpg';
import img10 from '@/public/images/genesis/10.jpg';
import img11 from '@/public/images/genesis/11.jpg';
import img12 from '@/public/images/genesis/12.png';
import img13 from '@/public/images/genesis/13.jpg';
import img14 from '@/public/images/genesis/14.png';

export default function GenesisCase() {
  return (
    <CaseStudyLayout
      title="Genesis: Digital Revolution"
      date="January, 2021"
      company="Bahcesehir University"
      role="Designer"
      contentBlocks={[
        {
          type: 'text',
          text: 'GENESIS is an art project/sub-brand born from a collaboration between two leading festivals; Sonar and DGTL.',
        },
        {
          type: 'text',
          text: 'As its first project, Genesis 1.0 is an audio-visual live show conceptualizing around the idea of digital revolution — symbolizing humans living in an increasingly digital world through generative visuals created from sonic data.',
        },
        {
          type: 'text',
          text: 'Genesis tries to show the magnificent harmony between audio and visual through a meaningful concept. It will be performed only 7 times.',
        },
        {
          type: 'text',
          text: 'Why 7? The number 7 holds significance across religion, mythology, superstition, and philosophy. Since Genesis tells the story of a new world’s creation, the 7-show run mirrors the concept of seven days of creation.',
        },
        {
          type: 'gallery',
          items: [
            { src: img1, alt: 'Genesis frame 1' },
            { src: img2, alt: 'Genesis frame 2' },
            { src: img4, alt: 'Genesis frame 4' },
            { src: img6, alt: 'Genesis frame 6' },
            { src: img3, alt: 'Genesis frame 3' },
            { src: img5, alt: 'Genesis frame 5' },
            { src: img7, alt: 'Genesis frame 7' },
            { src: img9, alt: 'Genesis frame 9' },
            { src: img10, alt: 'Genesis frame 10' },
            { src: img11, alt: 'Genesis frame 11' },
            { src: img8, alt: 'Genesis frame 8' },
            { src: img12, alt: 'Genesis frame 12' },
          ],
        },
      ]}
    />
  );
}
