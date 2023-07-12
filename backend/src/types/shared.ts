import { Request } from "express";
import { UserJwtPayload } from "./";

export type ModifiedRequest = Request & {
  userInfo?: UserJwtPayload;
};
