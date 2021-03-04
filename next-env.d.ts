/// <reference types="next" />
/// <reference types="next/types/global" />

// TODO: types for graphiql-explorer
declare module "graphiql-explorer" {
  const GraphiQLExplorer: React.ComponentType<Record<string, unknown>>;
  export default GraphiQLExplorer;
}
