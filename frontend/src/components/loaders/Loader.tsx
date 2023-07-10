import { loaderImage } from "@/assets/images";

interface Props {
  size: number;
}

export const Loader: React.FC<Props> = ({ size }) => {
  return (
    <img
      src={loaderImage}
      alt=""
      className={`w-${size} h-${size} max-h-full max-w-full`}
    />
  );
};
