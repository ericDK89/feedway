import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import { posts } from "./services/api/posts";
import styles from "./styles/wrapper.module.scss";

export function App() {
  return (
    <div className="App">
      <Header />

      <main className={styles.wrapper}>
        <Sidebar />
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          );
        })}
      </main>
    </div>
  );
}
