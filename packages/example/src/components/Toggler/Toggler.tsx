/* eslint-disable css-modules/no-unused-class */
import ClientWidget from 'next-client-script/dist/ClientWidget';
import Button from 'components/Button';
import styles from './Toggler.module.scss';

// This example tests that the whole stylesheet is loaded and individual
// classes aren't dead code eliminated. This is relevant, if classes are
// only later added from the client side.

export default function Toggler() {
  return (
    <ClientWidget className={styles.root}>
      <Button className={styles.button}>Change background color</Button>
    </ClientWidget>
  );
}
