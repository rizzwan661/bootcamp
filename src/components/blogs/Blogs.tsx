import { useState } from "react";
import type { Post } from "../../types/Post.ts";
import type { Author } from "../../types/Author.ts";
import { Status } from "../../types/Status.ts";
import styles from './Blogs.module.css';

export function Blogs() {
    const [blogs, setBlogs] = useState<Post[]>([]);
    const [isCreateBlogEnabled, setCreateBlog] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authors, setAuthors] = useState<Author[]>([{ name: '', email: '' }]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newBlog: Post = {
            id: String(blogs.length + 1),
            title,
            content,
            status: Status.Published,
            authorDetails: authors
        };

        setBlogs(prev => [...prev, newBlog]);
        resetForm();
        setCreateBlog(false);
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setAuthors([{ name: '', email: '' }]);
    };

    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const updatedAuthors = [...authors];
        updatedAuthors[index] = {
            ...updatedAuthors[index],
            [name]: value
        };
        setAuthors(updatedAuthors);
    };

    const addAuthorField = () => {
        setAuthors(prev => [...prev, { name: '', email: '' }]);
    };

    const removeAuthorField = (indexToRemove: number) => {
        setAuthors(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className={styles.mainContainer}>
            <nav className={styles.header}>
                <h2>Blog Manager</h2>
                <button className={styles.btn} onClick={() => setCreateBlog(true)}>Create Blog</button>
            </nav>

            <div className={styles.content}>
                {isCreateBlogEnabled && (
                    <form onSubmit={handleSubmit}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Enter blog title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Enter blog content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />

                        {authors.map((author, index) => (
                            <div key={`${author.name} ${index}`} className="author-input">
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="name"
                                    placeholder="Author name"
                                    value={author.name}
                                    onChange={(e) => handleAuthorChange(e, index)}
                                    required
                                />
                                <input
                                    className={styles.input}
                                    type="email"
                                    name="email"
                                    placeholder="Author email"
                                    value={author.email}
                                    onChange={(e) => handleAuthorChange(e, index)}
                                    required
                                />
                                {authors.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeAuthorField(index)}
                                        className={styles.removeBtn}
                                    >
                                        Remove Author
                                    </button>
                                )}
                            </div>
                        ))}

                        <button type="button" onClick={addAuthorField}>
                            Add Another Author
                        </button>
                        <br />
                        <button type="submit" className={styles.submitBtn}>Add Blog</button>
                    </form>
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
