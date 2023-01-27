import React from "react";

type Props = { children: React.ReactNode };

export const Main: React.FC<Props> = ({ children }) => {
  return <div className="min-h-screen w-full bg-slate-300">{children}</div>;
};
