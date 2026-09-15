import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";

export interface Contact {
  label: string;
  href: string;
  icon: IconType;
}

export const CONTACTS: Contact[] = [
  {
    label: "GitHub",
    href: "https://github.com/yu-araujos",
    icon: SiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yuriaraujoo/",
    icon: FaLinkedin,
  },
];
