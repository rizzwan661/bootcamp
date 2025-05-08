import { useState} from "react";
import type {Post} from "../../types/Post.ts";
import type {Author} from "../../types/Author.ts";
import styles from './Blogs.module.css';
import {BlogForm} from "../blog-form/blog-form.tsx";

export function Blogs() {
    const [blogs, setBlogs] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authors, setAuthors] = useState<Author[]>([{name: '', email: ''}]);
    const [isCreateBlogEnabled, setCreateBlog] = useState(false);

    return (
        <div className={styles.mainContainer}>
            <nav className={styles.header}>
                <h2>Blog Manager</h2>
                <button className={styles.btn} onClick={() => setCreateBlog(true)}>Create Blog</button>
            </nav>

            <div className={styles.content}>
                {isCreateBlogEnabled && (
                    <BlogForm
                        title={title}
                        blogs={blogs}
                        content={content}
                        authors={authors}
                        setBlogs={setBlogs}
                        setTitle={setTitle}
                        setContent={setContent}
                        setAuthors={setAuthors}
                        setCreateBlog={setCreateBlog}
                    />
                )}

                <h2>All Blogs</h2>
                {blogs.length > 0 ? (
                    blogs.map(blog => (
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
                    ))
                ) : (
                    <p>No blogs to show.</p>
                )}
            </div>
        </div>
    );
}
