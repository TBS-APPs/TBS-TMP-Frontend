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
import { MobileAppThemesRepo } from "./mobile-app-themes-repo";

export class MobileAppThemesImpl implements MobileAppThemesRepo {
  getThemePalettes(): Promise<Result<ResultType<MobileAppThemePalette[]>>> {
    const endpoint = mobileAppThemesEndpoint;
    return callGet<ResultType<MobileAppThemePalette[]>>(endpoint, "force-cache", {
      tags: [endpoint],
    });
  }

  getThemePalette(
    id: string,
  ): Promise<Result<ResultType<MobileAppThemePalette>>> {
    const endpoint = mobileAppThemesEndpoints.byId(id);
    return callGet<ResultType<MobileAppThemePalette>>(endpoint, "force-cache", {
      tags: [endpoint],
    });
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
