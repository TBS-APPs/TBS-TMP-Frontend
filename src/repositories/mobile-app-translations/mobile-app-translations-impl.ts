import { Result, ResultType } from "@/core/types/results";
import {
  mobileAppTranslationsEndpoint,
  mobileAppTranslationsEndpoints,
} from "@/core/constants/endpoints";
import {
  callDelete,
  callGet,
  callPatch,
  callPost,
  callPut,
} from "@/core/services/api-services";
import { MobileAppTranslationsRepo } from "./mobile-app-translations-repo";
import {
  CreateMobileAppTranslationKeyPayload,
  MobileAppTranslation,
  MobileAppTranslationKey,
  UpdateMobileAppTranslationKeyPayload,
  UpsertMobileAppTranslationPayload,
} from "./types";

export class MobileAppTranslationsImpl implements MobileAppTranslationsRepo {
  getKeys(): Promise<Result<ResultType<MobileAppTranslationKey[]>>> {
    const endpoint = mobileAppTranslationsEndpoints.keys;
    return callGet<ResultType<MobileAppTranslationKey[]>>(
      endpoint,
      "force-cache",
      { tags: [mobileAppTranslationsEndpoint] },
    );
  }

  getTranslations(): Promise<Result<ResultType<MobileAppTranslation[]>>> {
    const endpoint = mobileAppTranslationsEndpoints.translations;
    return callGet<ResultType<MobileAppTranslation[]>>(
      endpoint,
      "force-cache",
      { tags: [mobileAppTranslationsEndpoint] },
    );
  }

  createKey(
    payload: CreateMobileAppTranslationKeyPayload,
  ): Promise<Result<ResultType<MobileAppTranslationKey>>> {
    return callPost<ResultType<MobileAppTranslationKey>>(
      mobileAppTranslationsEndpoints.keys,
      JSON.stringify(payload),
    );
  }

  updateKey(
    id: string,
    payload: UpdateMobileAppTranslationKeyPayload,
  ): Promise<Result<ResultType<MobileAppTranslationKey>>> {
    return callPatch<ResultType<MobileAppTranslationKey>>(
      mobileAppTranslationsEndpoints.key(id),
      JSON.stringify(payload),
    );
  }

  deleteKey(id: string): Promise<Result<ResultType<void>>> {
    return callDelete<ResultType<void>>(
      mobileAppTranslationsEndpoints.key(id),
    );
  }

  upsertTranslation(
    payload: UpsertMobileAppTranslationPayload,
  ): Promise<Result<ResultType<MobileAppTranslation>>> {
    return callPut<ResultType<MobileAppTranslation>>(
      mobileAppTranslationsEndpoints.translations,
      JSON.stringify(payload),
    );
  }
}
