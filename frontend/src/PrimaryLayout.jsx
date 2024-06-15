import * as React from "react";

// NavItem component: A reusable component that applies styling to navigation items.
const NavItem = ({ children, className }) => (
  <div className={`justify-center items-start py-3 bg-white rounded-3xl border border-black border-solid ${className}`}>
    {children}
  </div>
);

// SocialIcon component: A reusable component that renders a social media icon image.
const SocialIcon = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="shrink-0 w-10 aspect-square" />
);

// MyComponent: The main component that structures the entire web page layout.
function MyComponent() {
  return (
    <div className="flex flex-col justify-center px-10 py-16 bg-white rounded-[50px] max-md:px-5">
      <header className="flex gap-5 justify-between w-full text-2xl font-bold leading-9 text-black whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-5 items-center max-md:flex-wrap max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2d76e43e758999416aafcd48deddd2406c49d74ee2a1f0afb9d2737faba2426?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&"
            alt="Logo"
            className="shrink-0 self-stretch max-w-full aspect-[1.05] w-[201px]"
          />
          <nav className="flex gap-5 justify-between self-stretch my-auto rounded-[50px]">
            <div>HOME</div>
            <div>MAP</div>
          </nav>
          <div className="self-stretch my-auto">PINBOX</div>
          <div className="flex-auto self-stretch my-auto">PROFILE</div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9809630454abc3963ad762ded58b773bad78a2393e71bc79d3f7a83bdc59a803?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&"
          alt="Secondary Logo"
          className="shrink-0 self-start mt-2 max-w-full aspect-[1.08] w-[165px]"
        />
      </header>
      <section className="overflow-hidden px-4 pt-2 pb-20 mt-14 border border-black border-solid max-md:pl-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[76%] max-md:ml-0 max-md:w-full">
            <div className="flex gap-2 items-start text-xl font-bold text-center text-black whitespace-nowrap max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
              <NavItem className="px-11">Parks</NavItem>
              <NavItem className="px-12">Restaurants</NavItem>
              <NavItem className="px-12 max-md:px-5">Cafe</NavItem>
              <NavItem className="px-11">Pubs</NavItem>
            </div>
          </div>
          <figure className="flex flex-col ml-5 w-[24%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2072327c04c11c4b9d67e58368b041147aa1d8f59654079d8bdc600a991ae3ca?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&"
              className="shrink-0 max-w-full aspect-[3.57] w-[206px] max-md:mt-10"
            />
          </figure>
        </div>
      </section>
      <footer className="flex flex-col self-center mt-24 w-full max-w-screen-xl rounded-3xl max-md:mt-10 max-md:max-w-full">
        <div className="shrink-0 h-px border border-solid bg-neutral-200 border-neutral-200 max-md:max-w-full" />
        <div className="flex gap-5 mt-12 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-1 gap-2 items-start self-start pr-5 pb-7">
            <SocialIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/199c9a3c64fa87237dabe74b1aff1fe617935141f37a07ba364b7012e90e628c?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&" alt="Social Icon 1" />
            <SocialIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1bac3668b19309ab1c82835d154f9962b24bad9c262723d53374e3173c3e762?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&" alt="Social Icon 2" />
            <SocialIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9c8d64becb556072cf4288b2dadd32d18a3ce8e19d5cc15f298f66d1125313b?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&" alt="Social Icon 3" />
            <SocialIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/0828515f09127d365461d17e1036e88788811bd5c0258116139d171a870fbe56?apiKey=ff9831e20d7c417fbe4dbfd7998ee6f7&" alt="Social Icon 4" />
          </div>
          <nav className="flex flex-col flex-1 justify-center text-base font-medium leading-6 whitespace-nowrap text-zinc-700">
            <div>Resources</div>
            <div className="mt-6">About</div>
          </nav>
        </div>
        <div className="mt-14 text-3xl leading-10 text-black max-md:mt-10 max-md:max-w-full">© Pinbox</div>
      </footer>
    </div>
  );
}

export default MyComponent;
