"use client";

import Link from "next/link";
import { triggerHaptic } from "@/lib/haptics";

import PostsIcon from "@/public/icons/contactIcons/posts";
import LayersIcon from "@/public/icons/contactIcons/layers";
import LinkedinIcon from "@/public/icons/contactIcons/linkedin";
import BentoIcon from "@/public/icons/contactIcons/bento";
import DribbbleIcon from "@/public/icons/contactIcons/dribbble";
import XIcon from "@/public/icons/contactIcons/x";

type IconType = "x" | "posts" | "layers" | "linkedin" | "bento" | "dribbble";

interface ContactCardProps {
  icon: IconType;
  iconFill?: string;
  iconBorder?: string;
  target: string;
}

const iconLabels: Record<IconType, string> = {
  x: "X (Twitter)",
  posts: "Posts",
  layers: "Layers",
  linkedin: "LinkedIn",
  bento: "Bento",
  dribbble: "Dribbble",
};

export default function ContactCard({ icon, iconFill, iconBorder, target }: ContactCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case "x":
        return <XIcon fill={iconFill} border={iconBorder} />;
      case "posts":
        return <PostsIcon fill={iconFill} border={iconBorder} />;
      case "layers":
        return <LayersIcon />;
      case "linkedin":
        return <LinkedinIcon fill={iconFill} border={iconBorder} />;
      case "bento":
        return <BentoIcon />;
      case "dribbble":
        return <DribbbleIcon fill={iconFill} />;
      default:
        return null;
    }
  };

  return (
    <Link
      className="border border-border-default bg-surface-1 rounded-sm aspect-square p-4 flex items-center justify-center hover:bg-brand transition-colors duration-150"
      href={target}
      rel="noopener noreferrer"
      target="_blank"
      onClick={() => triggerHaptic("light")}
      aria-label={`Visit ${iconLabels[icon] || icon} profile`}
    >
      {renderIcon()}
    </Link>
  );
}
