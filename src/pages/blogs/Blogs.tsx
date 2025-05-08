import { useState} from "react";
import type {Post} from "../../types/Post.ts";
import {BlogForm} from "../../components/blog-form/blog-form.tsx";
import { BlogCard } from "../../components/blog-card/blog-card.tsx";
import styles from './Blogs.module.css';

export function Blogs() {
    const [blogs, setBlogs] = useState<Post[]>([]);
    const [isCreateBlogEnabled, setCreateBlog] = useState(false);

    const dummyBlog: Post[] = [
        {
            id: "100",
            title: "React Ceatsheet",
            content: "Somethiiing related to React",
            status: "Published",
            authorDetails: [{name: "Rizwan Kazi", email: "rizwan@gmail.com"}]
        },
        {
            id: "101",
            title: "React Ceatsheet",
            content: "Somethiiing related to React",
            status: "Published",
            authorDetails: [{name: "Rizwan Kazi", email: "rizwan@gmail.com"}]
        },
        {
            id: "102",
            title: "React Ceatsheet",
            content: "Somethiiing related to React",
            status: "Published",
            authorDetails: [{name: "Rizwan Kazi", email: "rizwan@gmail.com"}]
        },
        {
            id: "104",
            title: "React Ceatsheet",
            content: "Somethiiing related to React",
            status: "Published",
            authorDetails: [{name: "Rizwan Kazi", email: "rizwan@gmail.com"}]
        },
    ];

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
                <div className={blogs.length ? styles.blogsContainer : styles.emptyStateContainer}>
                    {blogs.length ? (
                        blogs.map(blog => (
                            <BlogCard blog={blog} key={blog.id} />
                        ))
                    ) : (
                        <p className={styles.emptyContainer}>No blogs to show.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
