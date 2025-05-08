import { useState, useTransition, useEffect, useDeferredValue, useMemo } from "react";
import type { Post } from "../../types/Post.ts";
import { BlogForm } from "../../components/blog-form/blog-form.tsx";
import { BlogCard } from "../../components/blog-card/blog-card.tsx";
import styles from './Blogs.module.css';
import dummyBlogs from '../../data/dummyBlogs.json';

export function Blogs() {
    const [blogs, setBlogs] = useState<Post[]>(dummyBlogs as Post[]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isCreateBlogEnabled, setCreateBlog] = useState(false);
    const [isGridView, setIsGridView] = useState(true);
    const [visibleBlogs, setVisibleBlogs] = useState<Post[]>([]);
    const [isDataLoadPending, startDataLoadTransition] = useTransition();
    const [isChangeLayoutPending, startChangeLayoutTransition] = useTransition();
    const deferredQuery: string = useDeferredValue(searchQuery)

    const filteredBlogs = useMemo(() => {
        return blogs.filter(item => item.title.includes(searchQuery))
    }, [deferredQuery])

    const toggleView = () => {
        startChangeLayoutTransition(()=> setIsGridView(prev => !prev));
    };

    const searchBlog = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setSearchQuery(e.target.value);
    }

    useEffect(() => {
        startDataLoadTransition(() => {
            setVisibleBlogs(blogs);
        });
    }, [blogs]);

    return (
        <div className={styles.mainContainer}>
            <nav className={styles.header}>
                <h2>Blog Manager</h2>
                <div className={styles.searchAndBtnContainer}>
                    <input className={styles.searchInput} value={searchQuery} onChange={searchBlog} placeholder={"Search blogs..."}/>
                    <button className={styles.btn} onClick={toggleView}>
                        <svg className={styles.icon}>
                            <use href={`src/assets/svg/sprites/all-icons-sprites.svg#${isGridView ? "list-view-icon" : "grid-view-icon"}`} />
                        </svg>
                    </button>
                    <button className={styles.btn} onClick={() => setCreateBlog(true)}>
                        <svg className={styles.icon}>
                            <use href={`src/assets/svg/sprites/all-icons-sprites.svg#add-icon`} />
                        </svg>
                    </button>
                </div>
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
                <div className={(searchQuery.length ? filteredBlogs.length > 0 : visibleBlogs.length > 0) ? (isGridView ? styles.blogsContainer : styles.listContainer) : styles.emptyStateContainer}>
                {
                    (isDataLoadPending || isChangeLayoutPending) && <p className={styles.loading}>Loading blogs...</p>}
                    {
                        searchQuery.length ? (
                                filteredBlogs.length ? (
                                        filteredBlogs.map(blog => (
                                        <BlogCard blog={blog} key={blog.id} isGridView={isGridView} />
                                    )))
                                    :
                                    (!isDataLoadPending && <p className={styles.emptyContainer}>No blogs to Found</p>)
                        ) : (
                            visibleBlogs.length ? (
                                    visibleBlogs.map(blog => (
                                        <BlogCard blog={blog} key={blog.id} isGridView={isGridView} />
                                    )))
                                :
                                (!isDataLoadPending && <p className={styles.emptyContainer}>No blogs to show</p>)
                        )
                    }
                </div>
            </div>
        </div>
    );
}
