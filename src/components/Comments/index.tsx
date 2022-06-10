import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import styles from "./comments.module.scss";

interface CommentsProps {
  comment: string;
  deleteComment: (deletedComment: string) => void;
}

export function Comments({ comment, deleteComment }: CommentsProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    deleteComment(comment);
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
              <time>Cerca de 2h</time>
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
