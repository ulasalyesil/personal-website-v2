import LabCard from "./LabCard";
import type { LabItem } from "./data";
import styles from "./Lab.module.css";

export default function LabGrid({ items }: { items: LabItem[] }) {
  if (!items.length) return <p>Experiments land here as they happen.</p>;
  return (
    <ul className={styles.grid}>
      {items.map((item, index) => (
        <li key={item.slug}>
          <LabCard item={item} index={index} />
        </li>
      ))}
    </ul>
  );
}
