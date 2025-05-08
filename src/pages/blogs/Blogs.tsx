import { useState} from "react";
import type {Post} from "../../types/Post.ts";
import {BlogForm} from "../../components/blog-form/blog-form.tsx";
import { BlogCard } from "../../components/blog-card/blog-card.tsx";
import styles from './Blogs.module.css';

export function Blogs() {
    const [blogs, setBlogs] = useState<Post[]>([]);
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
                        blogs={blogs}
                        setBlogs={setBlogs}
                        setCreateBlog={setCreateBlog}
                    />
                )}

                <h2>All Blogs</h2>
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <BlogCard blog={blog}/>
                    ))
                ) : (
                    <p>No blogs to show.</p>
                )}
            </div>
        </div>
    );
}
