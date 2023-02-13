import { FontCard, type FontType } from "./FontCard";

const dummyFontsData: FontType[] = [
  {
    id: crypto.randomUUID(),
    name: "Anonymous pro",
  },
  {
    id: crypto.randomUUID(),
    name: "Anonymous pro",
  },
  {
    id: crypto.randomUUID(),
    name: "Anonymous pro",
  },
  {
    id: crypto.randomUUID(),
    name: "Anonymous pro",
  },
  {
    id: crypto.randomUUID(),
    name: "Anonymous pro",
  },
];

const cardClasses = `rounded border-gray-400 border-2 px-12 py-3 cursor-pointer
bg-slate-200 hover:bg-slate-300 transition-all flex-[0_0_23%] mb-5 text-sm px-3 flex
justify-center align-center h-14 items-center`;

export const FontCards = () => {
  return (
    <div className="mt-10">
      <ul className="flex flex-wrap gap-[calc(8%/3)] items-center">
        <li
          className={`${cardClasses} font-bold !text-base !bg-slate-300 hover:!bg-slate-400`}
        >
          Add new font
        </li>
        {dummyFontsData.map((f) => (
          <FontCard baseClasses={cardClasses} {...f} key={f.id} />
        ))}
      </ul>
    </div>
  );
};
