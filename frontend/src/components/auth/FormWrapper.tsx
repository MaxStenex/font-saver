import React from "react";

type Props = {
  title: string;
  content: React.ReactNode;
};

export const AuthFormWrapper: React.FC<Props> = ({ title, content }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-md mx-auto my-8 min-h-fit">
        <h1 className="uppercase text-blue-400 font-bold text-2xl mb-3">{title}</h1>
        {content}
      </div>
    </div>
  );
};
