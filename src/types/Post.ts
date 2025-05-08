import type {Author} from "./Author.ts";
import type { BlogStatus } from "./BlogStatus.ts";

export type Post = {
    id: string,
    title: string,
    content: string,
    status: BlogStatus,
    authorDetails: Author[];
}