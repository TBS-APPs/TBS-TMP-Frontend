import { isFailure } from "@/core/types/results";
import {
  mergeTranslationRows,
  mobileAppTranslationsRepo,
} from "@/repositories/mobile-app-translations";
import { MobileAppTranslationsSectionClient } from "./mobile-app-translations-section-client";

export default async function AllMobileAppTranslationsPage() {
  const [keysResult, translationsResult] = await Promise.all([
    mobileAppTranslationsRepo.getKeys(),
    mobileAppTranslationsRepo.getTranslations(),
  ]);

  if (isFailure(keysResult)) {
    return <div>Error: {keysResult.failure.message}</div>;
  }
  if (isFailure(translationsResult)) {
    return <div>Error: {translationsResult.failure.message}</div>;
  }

  const rows = mergeTranslationRows(
    keysResult.data?.data ?? [],
    translationsResult.data?.data ?? [],
  );

  return <MobileAppTranslationsSectionClient rows={rows} />;
}
