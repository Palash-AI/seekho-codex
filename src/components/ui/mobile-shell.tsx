import { PropsWithChildren } from "react";

export function MobileShell({ children }: PropsWithChildren) {
  return <main className="screen"><div className="mobile-shell">{children}</div></main>;
}
