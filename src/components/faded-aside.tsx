export function FadedAside({ src }: { src: string }) {
  return (
    <div className="pointer-events-none absolute top-0 right-0 h-80 w-[58%] md:h-[34rem] md:w-3/5" aria-hidden>
      <img src={src} alt="" className="h-full w-full object-cover object-right" />
      <div className="absolute inset-0 bg-gradient-to-r from-paper from-0% via-paper/80 via-45% to-paper/25" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
