import { DEFAULT_SITE_NAME } from "../../constants/config/site.ts";

export default function SiteHeader() {
  return (
    <>
      <nav class="w-full mb-3">
        <span class="font-medium">{DEFAULT_SITE_NAME}</span>
      </nav>
    </>
  );
}
