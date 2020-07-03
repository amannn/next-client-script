import styles from './Counter.module.scss';

export default function initCounter(rootNode, props) {
  let count = props.initialCount;

  const countNode = rootNode.querySelector(`.${styles.count}`);
  const buttonNode = rootNode.querySelector(`.${styles.button}`);

  buttonNode.addEventListener('click', () => {
    count++;
    countNode.textContent = count;
  });
}

initCounter.selector = `.${styles.root}`;
