import { PencilSimpleLine } from "phosphor-react";
import styles from "./sidebar.module.scss";

export function Sidebar() {
  return (
    <article className={styles.sidebar}>
      <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=60" />

      <div className={styles.profile}>
        <img src="http://github.com/ericDK89.png" />
        <strong>Eric Macedo</strong>
        <span>Dev Front-End</span>
      </div>

      <footer className={styles.sidebarFooter}>
        <a href="#">
          <PencilSimpleLine size={20} /> Editar seu perfil
        </a>
      </footer>
    </article>
  );
}
