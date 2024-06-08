import * as React from "react";

function ResourceIcons({ icons }) {
  return ( 
    <div className="flex flex-1 gap-2 items-start self-start pr-5 pb-7">
      {icons.map((icon) => (
        <img 
          key={icon.alt}
          loading="lazy" 
          src={icon.src} 
          alt={icon.alt} 
          className="shrink-0 w-10 aspect-square" 
        />
      ))}
    </div>
  );
}

function MyComponent() {
  const icons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/199c9a3c64fa87237dabe74b1aff1fe617935141f37a07ba364b7012e90e628c?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&", alt: "First icon" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b1bac3668b19309ab1c82835d154f9962b24bad9c262723d53374e3173c3e762?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&", alt: "Second icon" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c9c8d64becb556072cf4288b2dadd32d18a3ce8e19d5cc15f298f66d1125313b?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&", alt: "Third icon" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0828515f09127d365461d17e1036e88788811bd5c0258116139d171a870fbe56?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&", alt: "Fourth icon" },
  ];

  return (
    <div className="flex flex-col rounded-3xl">
      <div className="w-full border border-solid bg-neutral-200 border-neutral-200 min-h-[1px] max-md:max-w-full" />
      <section className="flex gap-5 mt-12 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <ResourceIcons icons={icons} />
        <div className="flex flex-col flex-1 justify-center px-5 text-base font-medium leading-6 whitespace-nowrap text-zinc-700">
          <h2>Resources</h2>
          <p className="mt-6">About</p>
        </div>
      </section>
      <footer className="mt-14 w-full text-3xl leading-10 text-black max-md:mt-10 max-md:max-w-full">
        © Pinbox
      </footer>
    </div>
  );
}