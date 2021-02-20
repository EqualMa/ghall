import { PinnableItemConnectionResolvers, UserResolvers } from "./generated";
import { InstanceResolverInterface } from "./resolver-type";

export type ResolverTypes = {
  User: UserInstanceResolver;
  PinnableItemConnection: InstanceResolverInterface<
    PinnableItemConnectionResolvers<any, any>
  >;
};

export interface UserInstanceResolver
  extends InstanceResolverInterface<UserResolvers<any, any>> {}
export abstract class UserInstanceResolver {}
