import { User } from "src/entities";

export type UserJwtPayload = Pick<User, "id">;
