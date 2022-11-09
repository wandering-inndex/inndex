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

      <div>
        <img
          src="/banner.png"
          class="w-[200px] sm:w-[500px] object-contain mx-auto"
          alt="The Wandering Inndex - A fan-made index for The Wandering Inn, a universe by pirateaba."
          title="The Wandering Inndex - A fan-made index for The Wandering Inn, a universe by pirateaba."
        />
      </div>

      <div>
        <nav class="text-center uppercase font-bold">
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
              <a href="/about" class="hover:underline">
                <span>
                  <span class="text-sm">A</span>
                  <span class="text-xs">bout</span>
                </span>{" "}
                <span>
                  <span class="text-sm">T</span>
                  <span class="text-xs">his</span>
                </span>{" "}
                <span>
                  <span class="text-sm">P</span>
                  <span class="text-xs">roject</span>
                </span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="p-4 mx-auto text-sm text-gray-900">
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
