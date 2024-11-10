import { action, query } from "@solidjs/router";

import { getUserServerLoader, signInServerAction } from "./server";

export const getUserLoader = query(getUserServerLoader, "user")

export const signInAction = action(signInServerAction)
