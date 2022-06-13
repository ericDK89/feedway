import { format, formatDistanceToNow, formatISO } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import styles from "./comments.module.scss";

interface CommentsProps {
  commentId: string;
  comment: string;
  commentPublishedAt: Date;
  deleteComment: (id: string) => void;
}

export function Comments({
  comment,
  commentPublishedAt,
  deleteComment,
  commentId,
}: CommentsProps) {
  const [likeCount, setLikeCount] = useState(0);

  const timeFormateToNow = formatDistanceToNow(commentPublishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const timeFormat = format(
    commentPublishedAt,
    "EEEE d 'de' MMMM 'ás' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const timeFormatIso = formatISO(commentPublishedAt);

  function handleDeleteComment() {
    deleteComment(commentId);
  }

  function handleLikeComment() {
    setLikeCount((previousState) => {
      return previousState + 1;
    });
  }

  return (
    <div className={styles.comments}>
      <img src="http://github.com/ericDK89.png" />

      <main className={styles.commentsMain}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorInfo}>
              <strong>Eric Macedo</strong>
              <time title={timeFormat} dateTime={timeFormatIso}>
                {timeFormateToNow}
              </time>
            </div>

            <button
              type="button"
              title="Deletar comentário"
              onClick={handleDeleteComment}
            >
              <Trash size={24} />
            </button>
          </header>
          <p>{comment}</p>
        </div>

        <footer className={styles.commentsFooter}>
          <button type="button" onClick={handleLikeComment}>
            <ThumbsUp size={24} /> Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </main>
    </div>
  );
}
