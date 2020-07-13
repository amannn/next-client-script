import styles from './Counter.module.scss';

export type CounterData = {
  initialCount: number;
};

export default function initCounter(rootNode: HTMLElement, data: CounterData) {
  let count = data.initialCount;

  const countNode = rootNode.querySelector(`.${styles.count}`);
  const buttonNode = rootNode.querySelector(`.${styles.button}`);

  if (!buttonNode || !countNode) {
    return;
  }

  buttonNode.addEventListener('click', () => {
    count++;
    render();
  });

  function render() {
    countNode!.textContent = String(count);
  }
}

initCounter.selector = `.${styles.root}`;
