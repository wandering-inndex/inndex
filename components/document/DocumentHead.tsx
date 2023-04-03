import { Head } from "$fresh/runtime.ts";

import { DEFAULT_SITE_NAME } from "../../constants/site.ts";

export default function DocumentHead() {
  const siteName = DEFAULT_SITE_NAME;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          property="keywords"
          content="the wandering inn, encyclopedia, timeline, graph"
        />
        <meta property="author" content="The Wandering Inndex contributors" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://inndex.omg.lol/ogp.png" />
        <meta
          property="og:image:secure_url"
          content="https://inndex.omg.lol/ogp.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="878" />
        <meta property="og:image:height" content="500" />
        <meta
          property="og:image:alt"
          content="The logo of The Wandering Inndex: a fan-made index for The Wandering Inn, a universe by pirateaba."
        />
      </Head>
    </>
  );
}
