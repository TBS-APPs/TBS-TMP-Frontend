import { Result, ResultType } from "@/core/types/results";
import {
  mobileAppThemesEndpoint,
  mobileAppThemesEndpoints,
} from "@/core/constants/endpoints";
import {
  callDelete,
  callGet,
  callPatch,
  callPost,
} from "@/core/services/api-services";
import {
  MobileAppThemePalette,
  MobileAppThemePaletteCreatePayload,
  MobileAppThemePaletteUpdatePayload,
} from "./types";
import {
  MobileAppThemesRepo,
  TranslationIncludeOptions,
} from "./mobile-app-themes-repo";
import { withInclude } from "@/core/utils/entity-translation";
import { getLocale } from "next-intl/server";

export class MobileAppThemesImpl implements MobileAppThemesRepo {
  async getThemePalettes(
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<MobileAppThemePalette[]>>> {
    const endpoint = withInclude(
      mobileAppThemesEndpoint,
      options?.include,
    );
    const locale = await getLocale();
    return callGet<ResultType<MobileAppThemePalette[]>>(
      endpoint,
      "force-cache",
      {
        tags: [mobileAppThemesEndpoint, `${endpoint}:${locale}`],
      },
    );
  }

  async getThemePalette(
    id: string,
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<MobileAppThemePalette>>> {
    const base = mobileAppThemesEndpoints.byId(id);
    const endpoint = withInclude(base, options?.include);
    const locale = await getLocale();
    return callGet<ResultType<MobileAppThemePalette>>(
      endpoint,
      "force-cache",
      {
        tags: [base, `${endpoint}:${locale}`],
      },
    );
  }

  addThemePalette(
    payload: MobileAppThemePaletteCreatePayload,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = mobileAppThemesEndpoint;
    return callPost<ResultType<void>>(endpoint, JSON.stringify(payload));
  }

  updateThemePalette(
    id: string,
    payload: Partial<MobileAppThemePaletteUpdatePayload>,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = mobileAppThemesEndpoints.byId(id);
    return callPatch<ResultType<void>>(endpoint, JSON.stringify(payload));
  }

  deleteThemePalette(id: string): Promise<Result<ResultType<void>>> {
    const endpoint = mobileAppThemesEndpoints.byId(id);
    return callDelete<ResultType<void>>(endpoint);
  }
}
