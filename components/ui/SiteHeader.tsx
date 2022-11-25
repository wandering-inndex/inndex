import StaticSiteLogoLine from "../images/StaticSiteLogoLine.tsx";

export default function SiteHeader() {
  return (
    <>
      <nav class="w-full mb-3 text-center uppercase font-bold">
        <a
          href="/"
          title="The Wandering Inndex - A fan-made index for The Wandering Inn, a universe by pirateaba."
          class="block mx-auto w-[15rem]"
        >
          <StaticSiteLogoLine />
        </a>
      </nav>
    </>
  );
}
