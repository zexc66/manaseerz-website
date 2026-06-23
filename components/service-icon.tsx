import { Zap, Lamp, Home, Plug, Hammer, Wind, type LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  lamp: Lamp,
  zap: Zap,
  home: Home,
  plug: Plug,
  hammer: Hammer,
  wind: Wind,
};

const DEFAULT_ICON = Zap;

/**
 * Renders a service's icon by its string key. Server-component safe (no
 * framer-motion) so the /services and /services/[id] SEO pages can use it.
 */
export function ServiceIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = ICONS[icon] ?? DEFAULT_ICON;
  return <Icon className={className} />;
}
