import { Loader } from "./";

export const FullPageLoader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader size={8} />
    </div>
  );
};
