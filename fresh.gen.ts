// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/api/media/audiobooks.ts";
import * as $1 from "./routes/api/media/chapters.ts";
import * as $2 from "./routes/api/media/ebooks.ts";
import * as $3 from "./routes/api/media/index.ts";
import * as $4 from "./routes/api/media/volumes.ts";
import * as $5 from "./routes/toc.tsx";
import * as $$0 from "./islands/DropdownSelector.tsx";
import * as $$1 from "./islands/TableHeaderSorter.tsx";
import * as $$2 from "./islands/TableOfContents.tsx";

const manifest = {
  routes: {
    "./routes/api/media/audiobooks.ts": $0,
    "./routes/api/media/chapters.ts": $1,
    "./routes/api/media/ebooks.ts": $2,
    "./routes/api/media/index.ts": $3,
    "./routes/api/media/volumes.ts": $4,
    "./routes/toc.tsx": $5,
  },
  islands: {
    "./islands/DropdownSelector.tsx": $$0,
    "./islands/TableHeaderSorter.tsx": $$1,
    "./islands/TableOfContents.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
