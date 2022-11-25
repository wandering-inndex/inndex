import StaticSiteLogoStacked from "./StaticSiteLogoStacked.tsx";
import StaticSiteLogoSubtitle from "./StaticSiteLogoSubtitle.tsx";

export default function StaticSiteLogoStackedWithSubtitle() {
  return (
    <>
      <div>
        <StaticSiteLogoStacked />
        <div class="w-2/3 mx-auto">
          <StaticSiteLogoSubtitle />
        </div>
      </div>
    </>
  );
}
