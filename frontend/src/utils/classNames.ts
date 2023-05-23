type ArgumentDict = Record<string, boolean>;

type Argument = string | ArgumentDict;

type ClassNames = (...args: Argument[]) => string;

export const classNames: ClassNames = function (...args) {
  let result = "";

  for (let i = 0; i <= args.length; i++) {
    const currentArgument = args[i];
    if (typeof currentArgument === "string") {
      result = result.concat(currentArgument).concat(" ");
      continue;
    }

    if (typeof currentArgument === "object") {
      const activeKeys: string = Object.keys(currentArgument)
        .filter((key) => currentArgument[key])
        .join(" ");
      result = result.concat(activeKeys).concat(" ");
      continue;
    }
  }

  return result.trim();
};
