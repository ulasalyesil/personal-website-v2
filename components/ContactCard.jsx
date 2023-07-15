'use client'

import React from "react";
import Link from "next/link";


import TwitterIcon from '../public/icons/contactIcons/twitter';
import PostsIcon from '../public/icons/contactIcons/posts';
import LayersIcon from '../public/icons/contactIcons/layers';
import LinkedinIcon from '../public/icons/contactIcons/linkedin';
import BentoIcon from '../public/icons/contactIcons/bento';

export default function ContactCard({
  icon,
  iconFill,
  iconBorder,
  target,
}) {
  const renderIcon = () => {
    switch (icon) {
      case "twitter":
        return <TwitterIcon fill={iconFill} border={iconBorder} />;
      case "posts":
        return <PostsIcon fill={iconFill} border={iconBorder} />;
      case "layers":
        return <LayersIcon />;
      case "linkedin":
        return <LinkedinIcon fill={iconFill} border={iconBorder} />;
      case "bento":
        return <BentoIcon />;
      default:
        return null;
    }
  };

  return (
    <Link
      className={`border border-neutral-300 dark:border-neutral-800 rounded-xl aspect-square p-4 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition ease-in-out`}
      href={target}
      rel="noreferrer"
      target="_blank"
    >
      {renderIcon()}
    </Link>
  );
}
