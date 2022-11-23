import { Head } from "$fresh/runtime.ts";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";
import SiteHeader from "../components/ui/SiteHeader.tsx";
import DocumentHead from "../components/document/DocumentHead.tsx";

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
      </Head>

      <div class="p-4 mx-auto text-sm text-gray-900">
        <SiteHeader />

        <div class="max-w-screen-md mx-auto flex flex-col gap-4">
          <h1 class="text-xl uppercase text-center">About The Wandering Inn</h1>

          <div class="text-left flex flex-col gap-4">
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
              currently has nine volumes with over 10 million words (
              <a
                href="https://wanderinginn.neocities.org/statistics.html"
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
          </div>

          <h1 class="text-xl uppercase text-center">
            About The Wandering Inndex
          </h1>

          <div class="text-left flex flex-col gap-4">
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
                Copyright for almost all the text in this repository goes to the
                author,{" "}
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
                notice any inconsistencies or want to contribute your expertise,
                you can file an Issue at the{"  "}
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
          </div>
        </div>
      </div>
    </>
  );
}
