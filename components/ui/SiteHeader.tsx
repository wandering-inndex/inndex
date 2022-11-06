export default function SiteHeader() {
  return (
    <>
      <nav class="w-full mb-3 text-center object-contain">
        <a
          href="/"
          title="The Wandering Inndex - A fan-made index for The Wandering Inn, a universe by pirateaba."
        >
          <img
            src="/header-one-line-black-small.png"
            class="h-3 mx-auto dark:h-0 dark:hidden"
          />
          <img
            src="/header-one-line-white-small.png"
            class="h-0 mx-auto dark:h-3 dark:inline"
          />
        </a>
      </nav>
    </>
  );
}
