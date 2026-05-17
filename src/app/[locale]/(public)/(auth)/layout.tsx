import { ReactNode } from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4">
      {children}
    </div>
  );
}
