import { asset, Head } from "$fresh/runtime.ts";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
  DEFAULT_SITE_URL,
} from "../constants/site.ts";
import SiteFooter from "../components/ui/SiteFooter.tsx";
import DocumentHead from "../components/document/DocumentHead.tsx";
import SiteHeader from "../components/ui/SiteHeader.tsx";

import InteractiveGazi from "../islands/InteractiveGazi.tsx";

interface MenuItemProps {
  url: string;
  title: string;
}

function MenuItem({ url, title }: MenuItemProps) {
  const words = title.split(" ");

  return (
    <>
      <a href={url} class="w-full">
        <div class="bg-gray-700 text-gray-50 p-2 hover:bg-gray-900">
          {words.map((word, index) => {
            const start = word[0];
            const end = word.slice(1);

            return (
              <>
                <span>
                  <span class="text-sm">{start}</span>
                  <span class="text-xs">{end}</span>
                </span>
                {index !== words.length - 1 ? " " : null}
              </>
            );
          })}
        </div>
      </a>
    </>
  );
}

export default function Page() {
  const menuItems: MenuItemProps[] = [
    {
      title: "Table of Contents",
      url: "/toc",
    },
    {
      title: "List of Bracket Contents",
      url: "/brackets",
    },
    {
      title: "Mapping of Rewrite Chapters",
      url: "/rewrite",
    },
    {
      title: "3D Word Count Visualizer",
      url: "https://titan.inndex.omg.lol/",
    },
    {
      title: "About",
      url: "/about",
    },
  ];

  const pageTitle = DEFAULT_SITE_NAME;
  const pageDescription = DEFAULT_SITE_DESCRIPTION;
  const siteUrl = DEFAULT_SITE_URL;

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

        <nav class="text-center uppercase font-bold mb-auto max-w-screen-sm mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-1 justify-center">
          {menuItems.map((item) => MenuItem(item))}
        </nav>

        <div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
