import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />

        <title>The Wandering Inndex</title>

        <meta
          property="description"
          content="A fan-made index for The Wandering Inn by pirateaba."
        />
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
      </Head>
      <div class="p-4 mx-auto">
        <nav class="w-full">
          <span class="font-medium">The Wandering Inndex</span>
        </nav>

        <div>
          <input
            type="range"
            list="volumeMarkers"
            value="614"
            min="0"
            max="614"
            class="w-full bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
          />
          <datalist id="volumeMarkers">
            <option value="0" />
            <option value="66" />
            <option value="123" />
            <option value="175" />
            <option value="238" />
            <option value="310" />
            <option value="387" />
            <option value="482" />
            <option value="587" />
          </datalist>
        </div>
      </div>
    </>
  );
}
