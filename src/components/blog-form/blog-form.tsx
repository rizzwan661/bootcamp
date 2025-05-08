import type { Author } from '../../types/Author';
import styles from './blog-form.module.css'
import type { Post } from '../../types/Post';
import { Status } from '../../types/Status';

interface BlogFormProps  {
    blogs: Post[];
    title: string;
    content: string;
    authors: Author[];
    setBlogs: React.Dispatch<React.SetStateAction<Post[]>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
    setCreateBlog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BlogForm(props: BlogFormProps) {
    const {blogs, setBlogs,title, content, setTitle, setContent, authors,setAuthors, setCreateBlog} = props;

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

    return <>
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
    </>
}