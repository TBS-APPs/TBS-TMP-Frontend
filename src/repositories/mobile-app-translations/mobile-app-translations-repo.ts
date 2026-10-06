import { Result, ResultType } from "@/core/types/results";
import {
  CreateMobileAppTranslationKeyPayload,
  MobileAppTranslation,
  MobileAppTranslationKey,
  UpdateMobileAppTranslationKeyPayload,
  UpsertMobileAppTranslationPayload,
} from "./types";

export interface MobileAppTranslationsRepo {
  getKeys(): Promise<Result<ResultType<MobileAppTranslationKey[]>>>;
  getTranslations(): Promise<Result<ResultType<MobileAppTranslation[]>>>;
  createKey(
    payload: CreateMobileAppTranslationKeyPayload,
  ): Promise<Result<ResultType<MobileAppTranslationKey>>>;
  updateKey(
    id: string,
    payload: UpdateMobileAppTranslationKeyPayload,
  ): Promise<Result<ResultType<MobileAppTranslationKey>>>;
  deleteKey(id: string): Promise<Result<ResultType<void>>>;
  upsertTranslation(
    payload: UpsertMobileAppTranslationPayload,
  ): Promise<Result<ResultType<MobileAppTranslation>>>;
}
