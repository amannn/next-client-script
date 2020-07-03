import styles from './Counter.module.scss';

export type CounterData = {
  initialCount: number;
};

export default function initCounter(rootNode, data: CounterData) {
  let count = data.initialCount;

  const countNode = rootNode.querySelector(`.${styles.count}`);
  const buttonNode = rootNode.querySelector(`.${styles.button}`);

  buttonNode.addEventListener('click', () => {
    count++;
    countNode.textContent = count;
  });
}

initCounter.selector = `.${styles.root}`;
