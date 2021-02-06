import { strict as assert } from "assert";
import * as gq from "graphql";

export function assertNamesAreValid(
  validNames: string[] | undefined,
  names: string[],
  nodeName: string,
  prop: string,
) {
  assert(validNames && validNames.length, `Node ${nodeName} has no ${prop}`);

  const validNamesSet = new Set(validNames);
  const invalidNames = names.filter((n) => !validNamesSet.has(n));
  assert(
    invalidNames.length === 0,
    `Node ${nodeName} does not have the following ${prop}: ${invalidNames.join(
      ", ",
    )}`,
  );
}
