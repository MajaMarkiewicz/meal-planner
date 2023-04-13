'use client'

import Link from "next/link";
import { Settings, User } from "react-feather";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface LinkProps {
    link: {
        link: string,
        icon?: string,
        label: string,
    }
}

const icons = { Settings, User };


const SidebarLink: FC<LinkProps> = ({ link }) => {
      const pathname = usePathname();
  let isActive = false;
  let linkContent;

  if (pathname === link.link) {
    isActive = true;
  }

  
  if(link.icon) {
    //@ts-expect-error
    const Icon = icons[link.icon];
    linkContent = <Icon
    size={40}
    className={`stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out ${isActive && "stroke-violet-600"}`}
    />
  } else {
    linkContent = <p>{link.label}</p>
  }

  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      {linkContent}
    </Link>
  );
}

export default SidebarLink;