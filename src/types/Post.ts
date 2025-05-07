import type {Author} from "./Author.ts";
import type {PostStatus} from "./Status.ts";

export type Post = {
    id: string,
    title: string,
    content: string,
    status: PostStatus,
    authorDetails: Author[];
}