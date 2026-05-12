import { Roboto } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/core/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import { DialogProvider } from "@/core/components/UI/dialog/dialog-context";
import { SnackbarProvider } from "@/core/components/UI/snackbar/snack-bar-context";
import { ReactNode } from "react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("appName"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Detect direction based on locale
  const direction = getLangDir(locale);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className={roboto.variable}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <DialogProvider>
            <SnackbarProvider>
              {children}
              {/* <CustomSnackbar /> */}
            </SnackbarProvider>
            {/* <DialogSlide /> */}
          </DialogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
