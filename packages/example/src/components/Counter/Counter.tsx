import ClientWidget from 'next-client-script/dist/ClientWidget';
import Button from 'components/Button';
import {CounterData} from './Counter.client';
import styles from './Counter.module.scss';

type Props = {
  initialCount?: number;
};

export default function Counter({initialCount = 2}: Props) {
  return (
    <ClientWidget<CounterData> className={styles.root} data={{initialCount}}>
      <p className={styles.label}>
        Count: <span className={styles.count}>{initialCount}</span>
      </p>
      <Button className={styles.button}>Increment</Button>
    </ClientWidget>
  );
}
