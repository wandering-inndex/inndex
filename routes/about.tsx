import { asset, Head } from "$fresh/runtime.ts";

import type { ComponentChildren } from "preact";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";
import SiteHeader from "../components/ui/SiteHeader.tsx";
import DocumentHead from "../components/document/DocumentHead.tsx";
import SiteFooter from "../components/ui/SiteFooter.tsx";
import StaticGazi from "../components/images/StaticGazi.tsx";
import StaticSiteLogoLine from "../components/images/StaticSiteLogoLine.tsx";
import StaticSiteLogoStackedWithSubtitle from "../components/images/StaticSiteLogoStackedWithSubtitle.tsx";

interface SectionProps {
  title: string;
  children: ComponentChildren;
}

function Section({ title, children }: SectionProps) {
  return (
    <>
      <h1 class="text-xl uppercase text-center">
        {title}
      </h1>
      <div class="text-left flex flex-col gap-4">
        {children}
      </div>
    </>
  );
}

export default function Page() {
  return (
    <>
      <DocumentHead />

      <Head>
        <title>About | {DEFAULT_SITE_NAME}</title>

        <meta
          property="description"
          content={DEFAULT_SITE_DESCRIPTION}
        />

        <link rel="stylesheet" href={asset("/styles/gazi.css")}></link>
      </Head>

      <div class="min-h-screen justify-between flex flex-col">
        <div class="p-4 mx-auto text-sm text-gray-900">
          <SiteHeader />

          <div class="max-w-screen-md mx-auto flex flex-col gap-4">
            <Section title="About The Wandering Inn">
              <p>
                <a
                  href="https://wanderinginn.com"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  The Wandering Inn
                </a>{" "}
                is an ongoing{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Fantasy"
                  class="hover:underline"
                  target="_blank"
                >
                  Fantasy
                </a>-<a
                  href="https://en.wikipedia.org/wiki/LitRPG"
                  class="hover:underline"
                  target="_blank"
                >
                  LitRPG
                </a>{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Web_fiction#Web_serial"
                  class="hover:underline"
                  target="_blank"
                >
                  web serial
                </a>{" "}
                by{" "}
                <a
                  href="https://patreon.com/pirateaba"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  pirateaba
                </a>. Since the first chapter in July 2016, the web serial
                currently has nine volumes with over 11 million words (
                <a
                  href="https://inndex.omg.lol/toc#stats"
                  class="font-semibold text-gray-700 hover:underline italic"
                  target="_blank"
                >
                  and counting
                </a>), making it one of the longest pieces of published work
                written in English by a single person. As a reference,{" "}
                <a
                  href="https://en.wikipedia.org/wiki/The_Wheel_of_Time"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  The Wheel of Time
                </a>{" "}
                by Robert Jordan clocks in at around{" "}
                <a
                  href="https://shol.ly/ethan/data/fantasy-sci-fi-word-count/"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  4.41 million words
                </a>
                , and{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Harry_Potter"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  The Harry Potter series
                </a>{" "}
                by J. K. Rowling is "only" at{" "}
                <a
                  href="https://wordcounter.net/blog/2015/11/23/10922_how-many-words-harry-potter.html"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  1.08 million words
                </a>.
              </p>
            </Section>

            <Section title="About The Wandering Inndex">
              <p>
                The Wandering Inndex is a fan-made site for the{" "}
                <a
                  href="https://wanderinginn.com"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  The Wandering Inn
                </a>.{" "}
                <span>
                  Copyright for almost all the text in this repository goes to
                  the author,{" "}
                  <a
                    href="https://patreon.com/pirateaba"
                    class="font-semibold text-gray-700 hover:underline"
                    target="_blank"
                  >
                    pirateaba
                  </a>.{" "}
                </span>
                <span>
                  Please support them on their official channels:{" "}
                  <span>
                    <a
                      href="https://wanderinginn.com"
                      class="font-semibold text-gray-700 hover:underline"
                      target="_blank"
                    >
                      The Wandering Inn Website
                    </a>
                  </span>,{" "}
                  <span>
                    <a
                      href="https://store.wanderinginn.com"
                      class="font-semibold text-gray-700 hover:underline"
                      target="_blank"
                    >
                      The Wandering Inn Official Store
                    </a>
                  </span>,{" and the author's "}
                  <span>
                    <a
                      href="https://patreon.com/pirateaba"
                      class="font-semibold text-gray-700 hover:underline"
                      target="_blank"
                    >
                      Patreon
                    </a>
                  </span>.
                </span>
              </p>
              <p>
                This project was initially created as a tool for{" "}
                <a
                  href="https://thewanderinginn.fandom.com/"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  The Wandering Inn Wiki
                </a>{"  "}
                contributors to quickly reference{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Named_entity"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  named entities
                </a>{" "}
                like <span class="italic">Characters</span>,{" "}
                <span class="italic">Classes</span>, and{" "}
                <span class="italic">Skills</span>.{" "}
                <span>
                  Please note that this is currently a work in progress. If you
                  notice any inconsistencies or want to contribute your
                  expertise, you can file an Issue at the{"  "}
                  <a
                    href="https://github.com/wandering-inndex/seed-data/issues"
                    class="font-semibold text-gray-700 hover:underline"
                    target="_blank"
                  >
                    Seed Data GitHub Repository
                  </a>, or send an email to{" "}
                  <a
                    href="mailto:inndex@omg.lol"
                    class="font-semibold text-gray-700 hover:underline"
                  >
                    inndex@omg.lol
                  </a>.
                </span>
              </p>
            </Section>

            <Section title="About the images used on the website">
              <div class="w-1/2 mx-auto">
                <StaticSiteLogoLine />
                <StaticSiteLogoStackedWithSubtitle />
              </div>
              <p>
                The text logos are created in{" "}
                <a
                  href="https://www.figma.com/"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  Figma
                </a>, using the font{" "}
                <a
                  href="https://www.theleagueofmoveabletype.com/sorts-mill-goudy"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  Sorts Mill Goudy
                </a>.
              </p>

              <div class="w-1/2 mx-auto">
                <StaticGazi />
              </div>
              <p>
                This is a fanart of{" "}
                <a
                  href="https://thewanderinginn.fandom.com/wiki/Gazi_Pathseeker"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  Gazi Pathseeker
                </a>, a character from The Wandering Inn, who first appeared in
                {" "}
                <a
                  href="https://wanderinginn.com/2016/12/04/1-29/"
                  class="font-semibold text-gray-700 hover:underline"
                  target="_blank"
                >
                  Volume 1 Chapter 1.29
                </a>.
              </p>
            </Section>
          </div>
        </div>

        <div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
