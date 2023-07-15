'use client'
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ContactCard from '@/components/ContactCard';

export default function NotFound() {
  return (
    <div className="text-neutral-900 flex flex-col m-auto p-auto justify-center items-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Oops! You seem to be lost.</h1>
      <div className='flex gap-4 items-center'>
        <p>Go</p>
          <Button href={'/'} label={"Home"} type={"primary"} />
      </div>
      <p className='text-neutral-500'>or reach out at</p>
      <div className="flex gap-4">
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
          </div>
    </div>
  );
}
