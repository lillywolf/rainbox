import styles from './styles.module.css';

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.sparkles}>   ˚　　　　✦　　　.　　. 　 ˚ ✰✰　.　　　　 </div>
      <div className={styles.header}>
        <h1 className={styles.site}>
          rainbox.world
        </h1>
        <div className={styles.emojis}>
          <span>☁️</span><span>☁️</span><span>☁️</span>
          <span>☁️</span><span>☁️</span><span>☁️</span>
          <span>☁️</span><span>☁️</span><span>☁️</span>
        </div>
        <p className={styles.tagline}>realtime processing of a chaotic existence</p>
        <a className={styles.minesweeper} href='/box/minesweeper'>💣 minesweeper</a>
      </div>
      <Footer />
    </main>
  );
}

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>created by <a className={styles.link} href='http://lillywolf.com'>lilly wolf 💖</a></p>
    </div>
  );
};
