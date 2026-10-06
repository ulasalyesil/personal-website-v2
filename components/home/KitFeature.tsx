import styles from "./KitFeature.module.css";
import heroStyles from "./Hero.module.css";

const COMPONENTS = [
  { name: "Listening", detail: "Microphone signal" },
  { name: "Thinking", detail: "Agent event log" },
  { name: "Tool call", detail: "Running to complete" },
];

export default function KitFeature() {
  return (
    <section className={styles.section} aria-labelledby="kit-feature-heading">
      <div className={styles.copy}>
        <p className={styles.kicker}>
          <span aria-hidden="true"># </span>Independent project
        </p>
        <h2 id="kit-feature-heading" className={styles.title}>
          —kit
          <span className={styles.cursor} aria-hidden="true" />
        </h2>
        <p className={styles.headline}>
          The interface tells you what the agent is doing.
        </p>
        <p className={styles.description}>
          A set of interface instruments for listening, thinking, and tool use.
          Each readout is designed to reflect an actual signal or event.
        </p>
        <a
          className={`${heroStyles.cta} ${styles.ctaSpacing}`}
          href="https://kit.ulasalyesil.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden="true">[</span>Explore —kit
          <span aria-hidden="true">]</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>

      <div className={styles.preview} aria-label="Three components in the kit">
        <div className={styles.previewHeader}>
          <span className={styles.mark}>
            —kit
            <span className={styles.cursor} aria-hidden="true" />
          </span>
          <span>Component set / 01–03</span>
        </div>
        <ol className={styles.components}>
          {COMPONENTS.map((component, index) => (
            <li key={component.name} className={styles.component}>
              <span className={styles.number}>0{index + 1}</span>
              <span className={styles.componentName}>{component.name}</span>
              <span className={styles.detail}>{component.detail}</span>
            </li>
          ))}
        </ol>
        <p className={styles.previewFooter}>Signals in. State out.</p>
      </div>
    </section>
  );
}
