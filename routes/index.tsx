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
        <nav class="text-center font-semibold hover:underline uppercase">
          <ul>
            <li>
              <a href="/toc">Table of Contents</a>
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
