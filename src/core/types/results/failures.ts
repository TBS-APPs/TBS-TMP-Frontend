export type AppFailure = ServerFailure | TimeOutFailure | GenericFailure;

export type ServerFailure = {
  type: "server";
  message: string;
};

export type TimeOutFailure = {
  type: "timeout";
  message: string;
};

export type GenericFailure = {
  type: "generic";
  message: string;
};

export function getFailure(
  t: (key: string) => string,
  isOk: boolean,
  responseData: any
): AppFailure | null {
  if (responseData.message && responseData.status !== "success") {
    const failure: ServerFailure = {
      type: "server",
      message: responseData.message,
    };
    return failure;
  }
  if (!isOk) {
    const failure: ServerFailure = {
      type: "server",
      message: t("somethingWrongTryAgain"),
    };
    return failure;
  }
  return null;
}
