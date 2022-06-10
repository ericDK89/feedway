import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import { comments } from "./services/api/posts";
import styles from "./styles/wrapper.module.scss";

export function App() {
  return (
    <div className="App">
      <Header />

      <main className={styles.wrapper}>
        <Sidebar />
        {comments.map((comment) => {
          return (
            <Post
              key={comment.id}
              author={comment.author}
              content={comment.content}
              publishedAt={comment.publishedAt}
            />
          );
        })}
      </main>
    </div>
  );
}
