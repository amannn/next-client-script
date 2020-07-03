import ClientWidget from 'next-client-script/dist/ClientWidget';
import styles from './Counter.module.scss';

export default function Counter({initialCount = 2}) {
  return (
    <ClientWidget className={styles.root} props={{initialCount}}>
      <p className={styles.label}>
        Count: <span className={styles.count}>{initialCount}</span>
      </p>
      <button className={styles.button}>Increment</button>
    </ClientWidget>
  );
}
