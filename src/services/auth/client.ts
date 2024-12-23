import { query } from "@solidjs/router";

import { getUserServerLoader } from "./server";

export const getUserLoader = query(getUserServerLoader, "getUser")
