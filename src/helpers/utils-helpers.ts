import { publicSiteUrl } from "src/context";

export function avatarUrl(options: { uid: string; extension: string }) {
	return `${publicSiteUrl}/${options.uid}.${options.extension}`;
}
