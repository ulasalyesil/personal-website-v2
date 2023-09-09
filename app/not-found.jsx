'use client'
import Button from '@/components/ui/Button';
import ContactCard from '@/components/ContactCard';

export default function NotFound() {
  return (
    <div className="text-neutral-900 dark:text-neutral-100 flex flex-col m-auto p-auto justify-center items-center h-screen gap-4">
      <h1 className="text-2xl font-bold max-w-[556px] text-center">We regret to inform that we decided to move on with other pages. We&apos;ll keep your candidate info and reach out if we see any fit.</h1>
      <div className='flex gap-4 items-center'>
        <p>Go</p>
          <Button href={'/'} label={"Home"} type={"primary"} />
      </div>
      <p className='text-neutral-500'>or reach out at</p>
      <div className="flex gap-4">
            <ContactCard
              icon={"x"}
              iconFill={"#a3a3a3"}
              target={"https://x.com/ulasalyesil"}
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
