export const SellLine = ({ text }: { text: string }) => {
  const t = text.trim();
  if (!t) return null;
  return (
    <div className="relative z-10 py-7 md:py-8">
      <div className="mx-auto w-full max-w-[1300px] px-5 md:px-8">
        <p className="mx-auto max-w-3xl text-center font-body text-sm font-normal leading-relaxed tracking-normal text-th-muted md:text-[15px]">
          {t}
        </p>
      </div>
    </div>
  );
};
