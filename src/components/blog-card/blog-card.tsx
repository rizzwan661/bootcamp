import { Status } from '../../types/BlogStatus';
import type { Post } from '../../types/Post';
import styles from './blog-card.module.css';

type BlogCardProps = {
    blog: Post;
    isGridView: boolean;
}

export function BlogCard(props: BlogCardProps) {
    const { blog, isGridView } = props;
    return <>
        <div className={`${styles.blog} ${!isGridView ? styles.show : null}`} key={blog.id}>
            <h2>{blog.title}</h2>
            {
                isGridView ? (
                    <>
                        <p>{blog.content}</p>
                        <strong>Authors:</strong>
                        <ul>
                            {blog.authorDetails.map((author, index) => (
                                <li key={`${author.name} ${index}`}>
                                    {author.name} ({author.email})
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <span className={`${styles.status} ${blog.status === Status.Published ? styles.success : null}`}>
                        {blog.status}
                    </span>
                )
            }
        </div>
    </>
}