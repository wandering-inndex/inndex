import { asset, Head } from "$fresh/runtime.ts";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";

import SiteHeader from "../components/ui/SiteHeader.tsx";
import SiteFooter from "../components/ui/SiteFooter.tsx";
import DocumentHead from "../components/document/DocumentHead.tsx";
import InteractiveGazi from "../islands/InteractiveGazi.tsx";

export default function Page() {
  return (
    <>
      <DocumentHead />

      <Head>
        <title>Gazi Pathseeker | {DEFAULT_SITE_NAME}</title>

        <meta
          property="description"
          content={DEFAULT_SITE_DESCRIPTION}
        />

        <link rel="stylesheet" href={asset("/styles/gazi.css")}></link>
      </Head>

      <div class="min-h-screen justify-between flex flex-col">
        <div class="p-4 mx-auto text-sm text-gray-900">
          <SiteHeader />

          <div class="m-auto">
            <InteractiveGazi />
          </div>
        </div>

        <div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
