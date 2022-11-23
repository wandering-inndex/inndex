import { Head } from "$fresh/runtime.ts";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";
import SiteFooter from "../components/ui/SiteFooter.tsx";
import DocumentHead from "../components/document/DocumentHead.tsx";

export default function Page() {
  return (
    <>
      <DocumentHead />

      <Head>
        <title>{DEFAULT_SITE_NAME}</title>

        <meta
          property="description"
          content={DEFAULT_SITE_DESCRIPTION}
        />
      </Head>

      <div class="min-h-screen justify-between flex flex-col">
        <div>
          <img
            src="/banner.png"
            class="w-[200px] sm:w-[500px] object-contain mx-auto"
            alt="The Wandering Inndex - A fan-made index for The Wandering Inn, a universe by pirateaba."
            title="The Wandering Inndex - A fan-made index for The Wandering Inn, a universe by pirateaba."
          />
        </div>

        <nav class="text-center uppercase font-bold mb-auto">
          <ul>
            <li>
              <a href="/toc" class="hover:underline">
                <span>
                  <span class="text-sm">T</span>
                  <span class="text-xs">able</span>
                </span>{" "}
                <span>
                  <span class="text-sm">O</span>
                  <span class="text-xs">f</span>
                </span>{" "}
                <span>
                  <span class="text-sm">C</span>
                  <span class="text-xs">ontents</span>
                </span>
              </a>
            </li>
            <li>
              <a href="/brackets" class="hover:underline">
                <span>
                  <span class="text-sm">L</span>
                  <span class="text-xs">ist</span>
                </span>{" "}
                <span>
                  <span class="text-sm">O</span>
                  <span class="text-xs">f</span>
                </span>{" "}
                <span>
                  <span class="text-sm">B</span>
                  <span class="text-xs">racket</span>
                </span>{" "}
                <span>
                  <span class="text-sm">C</span>
                  <span class="text-xs">ontents</span>
                </span>
              </a>
            </li>
            <li>
              <a href="/about" class="hover:underline">
                <span>
                  <span class="text-sm">A</span>
                  <span class="text-xs">bout</span>
                </span>
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
