import { persistentAtom } from "@nanostores/persistent";

export const themeStore = persistentAtom<string>("theme", "default");
