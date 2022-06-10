import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./comments.module.scss";

export function Comments() {
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

            <button type="button" title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>

        <footer className={styles.commentsFooter}>
          <button type="button">
            <ThumbsUp size={24} /> Aplaudir <span>03</span>
          </button>
        </footer>
      </main>
    </div>
  );
}
