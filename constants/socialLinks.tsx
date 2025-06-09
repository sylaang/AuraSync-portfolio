import { Github, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SocialLink = {
  IconComponent: LucideIcon;
  label: string;
  url: string;
  rel?: string;
  target?: string;
};

export const socialLinks = [
  {
    IconComponent: Github,
    label: "GitHub",
    url: "https://github.com/sylaang/",
    rel: "noopener noreferrer",
    target: "_blank",
  },
  {
    IconComponent: Linkedin,
    label: "Linkedin",
    url: "https://www.linkedin.com/in/mehdi-hachem-54a8672b0/",
    rel: "noopener noreferrer",
    target: "_blank",
  },
] as const;