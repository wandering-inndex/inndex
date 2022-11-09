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

        <div class="text-center max-w-screen-md mx-auto flex flex-col gap-4">
          <h1 class="text-xl uppercase">About</h1>

          <p>
            The Wandering Inndex is a fan-made site for the{" "}
            <a
              href="https://wanderinginn.com"
              class="font-semibold"
              target="_blank"
            >
              The Wandering Inn
            </a>.{" "}
            <span>
              Copyright for almost all the text in this repository goes to the
              author,{" "}
              <a
                href="https://patreon.com/pirateaba"
                class="font-semibold"
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
              class="font-semibold"
              target="_blank"
            >
              The Wandering Inn Wiki
            </a>{"  "}
            contributors to quickly reference{" "}
            <a
              href="https://en.wikipedia.org/wiki/Named_entity"
              class="font-semibold"
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
                class="font-semibold"
                target="_blank"
              >
                Seed Data GitHub Repository
              </a>, or send an email to{" "}
              <a href="mailto:inndex@omg.lol" class="font-semibold">
                inndex@omg.lol
              </a>.
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
