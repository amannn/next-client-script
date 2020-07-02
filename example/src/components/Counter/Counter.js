import ClientWidget from '../../../../dist/ClientWidget';
import styles from './Counter.module.css';

console.log('Counter server code ran');

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
