import { strict as assert } from "assert";
import * as gq from "graphql";
import { assertNamesAreValid } from "./util";

export type DefinitionNodeExtractor = (
  node: gq.DefinitionNode,
) => gq.DefinitionNode | null;

export function compose(
  ...extractors: DefinitionNodeExtractor[]
): DefinitionNodeExtractor {
  return (node) => {
    let cur: gq.DefinitionNode | null = node;
    for (const ett of extractors) {
      cur = ett(cur);
      if (!cur) return null;
    }
    return cur;
  };
}

/**
 *
 * @param names interfaces to remove
 */
export function removeInterfaces(names: string[]) {
  const namesSet = new Set(names);
  return (node: gq.DefinitionNode): gq.ObjectTypeDefinitionNode => {
    assert(node.kind === "ObjectTypeDefinition");
    assertNamesAreValid(
      node.interfaces?.map((it) => it.name.value),
      names,
      node.name.value,
      "interfaces",
    );

    return {
      ...node,
      interfaces: node.interfaces?.filter((it) => !namesSet.has(it.name.value)),
    };
  };
}

export function removeFields(names: string[]) {
  const namesSet = new Set(names);
  return (
    node: gq.DefinitionNode,
  ): gq.ObjectTypeDefinitionNode | gq.InterfaceTypeDefinitionNode => {
    assert(
      node.kind === "ObjectTypeDefinition" ||
        node.kind === "InterfaceTypeDefinition",
    );

    assertNamesAreValid(
      node.fields?.map((it) => it.name.value),
      names,
      node.name.value,
      "fields",
    );

    return {
      ...node,
      fields: node.fields?.filter((f) => !namesSet.has(f.name.value)),
    };
  };
}

export function removeFieldsExcept(names: string[]) {
  const namesSet = new Set(names);
  return (
    node: gq.DefinitionNode,
  ): gq.ObjectTypeDefinitionNode | gq.InterfaceTypeDefinitionNode => {
    assert(
      node.kind === "ObjectTypeDefinition" ||
        node.kind === "InterfaceTypeDefinition",
    );

    assertNamesAreValid(
      node.fields?.map((it) => it.name.value),
      names,
      node.name.value,
      "fields",
    );

    return {
      ...node,
      fields: node.fields?.filter((f) => namesSet.has(f.name.value)),
    };
  };
}

export function removeInterfacesAndFields(
  interfaces: string[],
  fields: string[],
) {
  return compose(removeInterfaces(interfaces), removeFields(fields));
}

export const removeNodeAndId = removeInterfacesAndFields(["Node"], ["id"]);

export const removeConnectionFieldsExceptTotalCount = removeFields([
  "edges",
  "nodes",
  "pageInfo",
]);
