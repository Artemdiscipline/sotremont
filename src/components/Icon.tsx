import type { CSSProperties } from "react";

const paths: Record<string, React.ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  diagonal: <path d="M6 18 18 6M6 6h12v12" />,
  chevron: <path d="m8 10 4 4 4-4" />,
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M10 5h4m-3 14h2" />
    </>
  ),
  screen: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="m12 3-3 6 6 3-5 5 2 4" />
    </>
  ),
  tablet: (
    <>
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <path d="M11 19h2" />
    </>
  ),
  computer: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8m-4-4v4" />
    </>
  ),
  watch: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="3" />
      <path d="m9 6 1-5h4l1 5m-6 12 1 5h4l1-5m-3-9v3l2 1" />
    </>
  ),
  call: (
    <path d="m8 3-4 1c-2 1-1 7 4 12s11 6 12 4l1-4-5-3-2 2c-3-1-4-2-5-5l2-2z" />
  ),
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  telegram: (
    <>
      <path d="M21 3 2 10l7 3 3 7 9-17Z" />
      <path d="m9 13 12-10" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11a9 9 0 0 1-13 8l-5 2 1-6a9 9 0 1 1 17-4Z" />
      <path d="M8 10h8m-8 4h5" />
    </>
  ),
  star: <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" />,
  battery: (
    <>
      <rect x="6" y="4" width="12" height="18" rx="2" />
      <path d="M10 1h4m-1 7-4 6h6l-4 5" />
    </>
  ),
  charging: (
    <>
      <path d="M8 2v5m8-5v5M6 7h12v4a6 6 0 0 1-12 0Zm6 10v5" />
      <path d="M9 10h6" />
    </>
  ),
  camera: (
    <>
      <rect x="2" y="6" width="20" height="15" rx="3" />
      <path d="m7 6 2-4h6l2 4" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  sound: (
    <>
      <path d="m11 4-6 5H2v6h3l6 5Zm5 4a7 7 0 0 1 0 8m3-11a11 11 0 0 1 0 14" />
    </>
  ),
  shield: (
    <>
      <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  tool: (
    <path d="m14 6 4 4 4-4a7 7 0 0 1-9 9l-6 6a3 3 0 0 1-4-4l6-6a7 7 0 0 1 9-9Z" />
  ),
  check: <path d="m5 12 4 4L19 6" />,
  copy: (
    <>
      <rect x="8" y="8" width="13" height="13" rx="2" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  plug: (
    <>
      <rect x="6" y="7" width="12" height="13" rx="3" />
      <path d="M9 2v5m6-5v5m-5 7h4m-2 6v2" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
      <rect x="2" y="12" width="5" height="9" rx="2" />
      <rect x="17" y="12" width="5" height="9" rx="2" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 17.5h7m-3.5-3.5v7" />
    </>
  ),
};
export function Icon({
  name,
  size = 24,
  className = "",
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {paths[name] ?? paths.tool}
    </svg>
  );
}
