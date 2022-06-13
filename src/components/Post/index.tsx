import { format, formatDistanceToNow, formatISO } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Author, Content } from "../../services/api/posts";
import { Comments } from "../Comments";
import styles from "./post.module.scss";

interface PostProps {
  author: Author;
  content: Content[];
  publishedAt: Date;
}

interface Comment {
  id: string;
  content: string;
  commentPublishedAt: Date;
}

export function Post({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState<Comment[]>([]);
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
    const id = uuidV4();
    setComments((previousState) => [
      ...previousState,
      { id, content: newCommentText, commentPublishedAt: new Date() },
    ]);
    setNewCommentText("");
  }

  function deleteComment(deletedContentId: string) {
    const commentListWithoutDeletedOne = comments.filter(
      (comment) => comment.id !== deletedContentId
    );
    setComments(commentListWithoutDeletedOne);
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
        {content.map((content) => {
          if (content.type === "paragraph") {
            return <p key={content.id}>{content.content}</p>;
          } else {
            return (
              <p key={content.id}>
                <a href={content.content}>{content.content}</a>
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
            key={comment.id}
            commentId={comment.id}
            comment={comment.content}
            deleteComment={deleteComment}
            commentPublishedAt={comment.commentPublishedAt}
          />
        );
      })}
    </div>
  );
}
