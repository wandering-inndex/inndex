import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>The Wandering Inndex</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/android-chrome-192x192.png"
          class="w-32 h-32"
          alt="The Wandering Inndex Logo"
        />
        <div>The Wandering Inndex</div>
      </div>
    </>
  );
}
