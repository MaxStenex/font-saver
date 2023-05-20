import Roboto from "@/assets/fonts/Roboto-Regular.ttf";
import { useModal } from "@/state/modal";
import { FontType } from "@/types/font";
import { useCallback } from "react";
import { CardPreviewModal } from "../modals/CardPreview";
import { AddNewFontBtn } from "./AddNewFont";
import { FontCard } from "./FontCard";

const dummyFontsData: FontType[] = new Array(6).fill(null).map((_, i) => ({
  id: crypto.randomUUID(),
  name: "Anonymous pro " + i,
  filePath: Roboto,
}));

const cardClasses = `rounded border-gray-400 border-2 px-12 py-3 cursor-pointer
bg-slate-200 hover:bg-slate-300 transition-all flex-[0_0_23%] mb-5 text-sm px-3 flex
justify-center align-center h-14 items-center`;

export const FontCards = () => {
  const { show: openPreviewModal } = useModal(CardPreviewModal);

  const onCardClick = useCallback(
    (font: FontType) => {
      openPreviewModal({
        ...font,
      });
    },
    [openPreviewModal]
  );

  return (
    <div className="mt-10">
      <ul className="flex flex-wrap gap-[calc(8%/3)] items-center">
        <AddNewFontBtn cardClasses={cardClasses} />
        {dummyFontsData.map((f) => (
          <FontCard onClick={onCardClick} baseClasses={cardClasses} {...f} key={f.id} />
        ))}
      </ul>
    </div>
  );
};
