import { format, formatDistanceToNow, formatISO } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { ChangeEvent, FormEvent, useState } from "react";
import { Author, Content } from "../../services/api/posts";
import { Comments } from "../Comments";
import styles from "./post.module.scss";

interface PostProps {
  author: Author;
  content: Content[];
  publishedAt: Date;
}

export function Post({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState(["Post muito bacana"]);
  const [newCommentText, setNewCommentText] = useState("");
  const { avatarUrl, name, role } = author;

  const timeFormat = format(publishedAt, "EEEE d 'de' MMMM 'ás' HH:mm'h'", {
    locale: ptBR,
  });

  const timeFormatIso = formatISO(publishedAt);

  const timeFormatToNow = formatDistanceToNow(publishedAt, {
    addSuffix: true,
    locale: ptBR,
  });

  function handleNewCommentChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setNewCommentText(e.target.value);
    e.currentTarget.setCustomValidity("");
  }

  function handleCreateNewComment(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setComments((previousState) => [...previousState, newCommentText]);
    setNewCommentText("");
  }

  function handleDeleteComment(deletedComment: string) {
    const commentsWithoutDeletedOne = comments.filter(
      (comment) => comment !== deletedComment
    );

    setComments(commentsWithoutDeletedOne);
  }

  function handleInvalidComment(e: FormEvent<HTMLTextAreaElement>): void {
    e.currentTarget.setCustomValidity("Campo obrigatório!");
  }

  const verifyIfCommentExist = newCommentText.trim().length === 0;

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

        <time title={timeFormat} dateTime={timeFormatIso}>
          Publicado {timeFormatToNow}
        </time>
      </header>

      <main className={styles.postMain}>
        {content.map((item) => {
          if (item.type === "paragraph") {
            return <p key={item.content}>{item.content}</p>;
          } else {
            return (
              <p key={item.content}>
                <a href={item.content}>{item.content}</a>
              </p>
            );
          }
        })}
      </main>

      <form onSubmit={handleCreateNewComment} className={styles.postForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          value={newCommentText}
          placeholder="Escreva um comentário"
          onChange={handleNewCommentChange}
          required
          onInvalid={handleInvalidComment}
        />

        <footer>
          <button
            className={styles.publishBtnComment}
            disabled={verifyIfCommentExist}
            type="submit"
          >
            Publicar
          </button>
        </footer>
      </form>

      {comments.map((comment) => {
        return (
          <Comments
            key={comment}
            comment={comment}
            deleteComment={handleDeleteComment}
          />
        );
      })}
    </div>
  );
}
