import { HomeFontCards, HomeToolbar } from "@/components/home";

export const HomePage = () => {
  return (
    <div className="flex flex-col max-w-4xl w-full mx-auto my-4 flex-1">
      <HomeToolbar />
      <HomeFontCards />
    </div>
  );
};
