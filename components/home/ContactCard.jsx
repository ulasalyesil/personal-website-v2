import React from "react";
import TwitterIcon from '../../public/icons/contactIcons/twitter';
import PostsIcon from '../../public/icons/contactIcons/posts';
import LayersIcon from '../../public/icons/contactIcons/layers';
import LinkedinIcon from '../../public/icons/contactIcons/linkedin';
import BentoIcon from '../../public/icons/contactIcons/bento';

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
    <a
      className={`border border-neutral-300 rounded-xl aspect-square p-4 flex items-center justify-center hover:bg-neutral-100 transition ease-in-out`}
      href={target}
      rel="noreferrer"
      target="_blank"
    >
      {renderIcon()}
    </a>
  );
}
