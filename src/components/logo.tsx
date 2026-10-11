type LogoProps = {
  className?: string;
  variant?: "lockup" | "header";
};

export function Logo({ className, variant = "lockup" }: LogoProps) {
  if (variant === "header") {
    return (
      <span className={`flex min-w-0 items-center gap-3 sm:gap-4 ${className ?? ""}`}>
        <img src="/logo-mark.svg" alt="" className="h-11 w-auto shrink-0 sm:h-14 lg:h-16" />
        <span className="min-w-0">
          <span className="block font-display text-[17px] leading-tight text-white sm:text-xl lg:text-2xl">
            American Heritage
          </span>
          <span className="block text-[16px] leading-none text-[#c4a36a] sm:text-lg">
            Insurance Brokers, Inc.
          </span>
        </span>
      </span>
    );
  }

  return (
    <img
      src="/logo.svg"
      alt="American Heritage Insurance Brokers, Inc."
      className={className ?? "h-14 w-auto sm:h-16"}
    />
  );
}
