import './App.css';
import type { Post } from './types/Post.ts';
import { useEffect, useState } from 'react';
import { Status } from "./types/Status.ts";

function App() {
    const [blogs, setBlogs] = useState<Post[]>([]);
    const [isCreateBlogEnabled, setCreateBlog] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        authors: [{ name: '', email: '' }]
    });

    useEffect(() => {
        getAllBlogs();
    }, []);

    const getAllBlogs = () => {
        setBlogs([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newBlog: Post = {
            id: String(blogs.length + 1),
            title: formData.title.trim(),
            content: formData.content.trim(),
            status: Status.Published,
            authorDetails: formData.authors
        };

        setBlogs(prev => [...prev, newBlog]);
        resetForm();
        setCreateBlog(false);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            authors: [{ name: '', email: '' }]
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        const { name, value } = e.target;

        if (index !== undefined) {
            const updatedAuthors = [...formData.authors];
            updatedAuthors[index] = { ...updatedAuthors[index], [name]: value };

            setFormData(prev => ({ ...prev, authors: updatedAuthors }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const addAuthorField = () => {
        setFormData(prev => ({
            ...prev,
            authors: [...prev.authors, { name: '', email: '' }]
        }));
    };

    const removeAuthorField = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            authors: prev.authors.filter((_, index) => index !== indexToRemove)
        }));
    };

    const getBlogById = (id: string) => {
        const blog = blogs.find(blog => blog.id === id);
        console.log("Selected Blog:", blog);
    };

    return (
        <div className="App">
            <div className='header'>
                <h1>Blog Manager</h1>
                <button onClick={() => setCreateBlog(true)}>Create Blog</button>
            </div>

            {isCreateBlogEnabled && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter blog title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="content"
                        placeholder="Enter blog content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />

                    {formData.authors.map((author, index) => (
                        <div key={index} className="author-input">
                            <input
                                type="text"
                                name="name"
                                placeholder="Author name"
                                value={author.name}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Author email"
                                value={author.email}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                            {formData.authors.length > 1 && (
                                <button type="button" onClick={() => removeAuthorField(index)} className="remove-btn">
                                    Remove Author
                                </button>
                            )}
                        </div>
                    ))}

                    <button type="button" onClick={addAuthorField} >
                        Add Another Author
                    </button>
                    <br />
                    <button type="submit" className="submit-btn">Add Blog</button>
                </form>
            )}

            <hr />
            <h2>All Blogs</h2>

            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div className="blog" key={blog.id} onClick={() => getBlogById(blog.id)}>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        <strong>Authors:</strong>
                        <ul>
                            {blog.authorDetails.map((author, i) => (
                                <li key={i}>
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
    );
}

export default App;
