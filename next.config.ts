import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
};

const withNextIntl = createNextIntlPlugin("./src/core/i18n/request.ts");
export default withNextIntl(nextConfig);
