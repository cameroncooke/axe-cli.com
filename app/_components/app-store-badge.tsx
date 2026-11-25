import Image from "next/image"

export const APP_STORE_URL = "https://apps.apple.com/app/id6836545597"

/** Apple's "Download on the App Store" badge, linking to AXe Mirror. `small` is for inside a card. */
export function AppStoreBadge({ small = false, className = "" }: { small?: boolean; className?: string }) {
  return (
    <a href={APP_STORE_URL} className={`inline-block shrink-0 transition-opacity hover:opacity-85 ${className}`}>
      <Image
        src="/mirror/app-store-badge.svg"
        alt="Download AXe Mirror on the App Store"
        width={180}
        height={60}
        className={small ? "h-[44px] w-auto" : "h-[60px] w-auto"}
      />
    </a>
  )
}

/** The badge with a line beside it saying what it gets you: for the foot of a section. */
export function GetTheApp({ children = "AXe Mirror is free for iPhone and iPad. No account." }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/50 p-6 text-center sm:flex-row sm:gap-6 sm:text-left">
      <AppStoreBadge />
      <p className="max-w-md leading-relaxed text-axe-text-secondary">{children}</p>
    </div>
  )
}
