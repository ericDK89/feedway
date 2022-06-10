import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { Author, Content } from "../../services/api/posts";
import { Comments } from "../Comments";
import styles from "./post.module.scss";

interface PostProps {
  author: Author;
  content: Content[];
  publishedAt: Date;
}

export function Post({ author, content, publishedAt }: PostProps) {
  const { avatarUrl, name, role } = author;

  const timeFormatToNow = formatDistanceToNow(publishedAt, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className={styles.post}>
      <header>
        <div className={styles.authorInfoAndTime}>
          <img src={avatarUrl} />

          <div>
            <strong>{name}</strong>
            <span>{role}</span>
          </div>
        </div>

        <time>Publicado {timeFormatToNow}</time>
      </header>

      <main className={styles.postMain}>
        {content.map((item) => {
          if (item.type === "paragraph") {
            return <p>{item.content}</p>;
          } else {
            return (
              <p>
                <a href={item.content}>{item.content}</a>
              </p>
            );
          }
        })}
      </main>

      <form className={styles.postForm}>
        <strong>Deixe seu feedback</strong>
        <textarea placeholder="Escreva um comentário" />

        <footer>
          <button className={styles.publishComment} type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <Comments />
    </div>
  );
}
