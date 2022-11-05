import { DEFAULT_SITE_NAME } from "../../constants/site.ts";

export default function SiteHeader() {
  return (
    <>
      <nav class="w-full mb-3 text-center">
        <span class="font-medium">{DEFAULT_SITE_NAME}</span>
      </nav>
    </>
  );
}
