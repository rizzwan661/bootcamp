import type { Post } from '../../types/Post';
import styles from './blog-card.module.css';

type BlogCardProps = {
    blog: Post;
}

export function BlogCard(props: BlogCardProps) {
    const { blog } = props;
    return <>
        <div className={styles.blog} key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <strong>Authors:</strong>
            <ul>
                {blog.authorDetails.map((author, index) => (
                    <li key={`${author.name} ${index}`}>
                        {author.name} ({author.email})
                    </li>
                ))}
            </ul>
        </div>
    </>
}