import type { Metadata } from "next";
import "@/app/globals.css";
import { AppProvider } from "@/components/providers/app-provider";
import { EventLogDrawer } from "@/components/debug/event-log-drawer";

export const metadata: Metadata = {
  title: "Seekho Mission Mode Prototype",
  description: "Clickable stakeholder prototype for Seekho 2.0 Mission Mode"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <EventLogDrawer />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
