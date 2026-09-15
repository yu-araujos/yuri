import type { ReactNode } from "react";

export interface CardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  showBadgeDot?: boolean;
  children?: ReactNode;
  className?: string;
  showFooterAction?: boolean;
  footerText?: string;
  compact?: boolean;
}
