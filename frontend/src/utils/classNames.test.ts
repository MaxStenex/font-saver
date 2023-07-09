import { classNames } from "./";

describe("ClassNames test", () => {
  it("If string passed as argument, should return it", () => {
    const argument = "foo";
    const result = classNames(argument);

    expect(result).toBe(argument);
  });

  it("If more than one strings passed as arguments, should return them as concatinated string, with divider", () => {
    const firstClass = "foo";
    const secondClass = "bar";
    const result = classNames(firstClass, secondClass);

    expect(result).toBe(`${firstClass} ${secondClass}`);
  });

  it("Should correctly parse classes from object argument", () => {
    const argument1 = "foo";
    const argument2 = { bar: true, fooBar: false };
    const result = classNames(argument1, argument2);

    expect(result).toBe(`${argument1} bar`);
  });

  it("Should return empy string, if all classes are inactive", () => {
    const argument = { "foo-bar": false, foo: false, bar: false };
    const result = classNames(argument);

    expect(result).toBe("");
  });

  it("Should correctly parse multiple objects", () => {
    const argument1 = { "foo-bar": true, foo: false };
    const argument2 = { bar: true };
    const result = classNames(argument1, argument2);

    expect(result).toBe(`foo-bar bar`);
  });
});
