import { asset, Head } from "$fresh/runtime.ts";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";
import SiteFooter from "../components/ui/SiteFooter.tsx";
import DocumentHead from "../components/document/DocumentHead.tsx";

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
      title: "About",
      url: "/about",
    },
  ];

  return (
    <>
      <DocumentHead />

      <Head>
        <title>{DEFAULT_SITE_NAME}</title>

        <meta
          property="description"
          content={DEFAULT_SITE_DESCRIPTION}
        />

        <link rel="stylesheet" href={asset("/styles/gazi.css")}></link>
      </Head>

      <div class="min-h-screen justify-between flex flex-col">
        <div class="p-4 mx-auto text-sm text-gray-900">
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
