import { isFailure } from "@/core/types/results";
import { mobileAppThemesRepo } from "@/repositories/mobile-app-themes";
import { MobileAppThemesSectionClient } from "./mobile-app-themes-section-client";

export default async function AllMobileAppThemesPage() {
  const palettesResult = await mobileAppThemesRepo.getThemePalettes({
    include: "translations",
  });
  if (isFailure(palettesResult)) {
    return <div>Error: {palettesResult.failure.message}</div>;
  }
  const palettes = palettesResult.data?.data ?? [];
  return <MobileAppThemesSectionClient palettes={palettes} />;
}
