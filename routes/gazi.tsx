import { asset, Head } from "$fresh/runtime.ts";

import { DEFAULT_SITE_NAME, DEFAULT_SITE_URL } from "../constants/site.ts";

import SiteHeader from "../components/ui/SiteHeader.tsx";
import SiteFooter from "../components/ui/SiteFooter.tsx";
import DocumentHead from "../components/document/DocumentHead.tsx";
import InteractiveGazi from "../islands/InteractiveGazi.tsx";

export default function Page() {
  const pageTitle = `Gazi Pathseeker | ${DEFAULT_SITE_NAME}`;
  const pageDescription = "A page showing an interactive Gazi Pathseeker.";
  const siteUrl = `${DEFAULT_SITE_URL}gazi`;

  return (
    <>
      <DocumentHead />

      <Head>
        <title>{pageTitle}</title>
        <meta property="description" content={pageDescription} />

        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={siteUrl} />

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
