import styles from './Toggler.module.scss';

export default function initCounter(rootNode: HTMLElement) {
  let isToggled = false;

  const buttonNode = rootNode.querySelector(`.${styles.button}`);

  buttonNode.addEventListener('click', () => {
    isToggled = !isToggled;
    render();
  });

  function render() {
    rootNode.classList.toggle(styles.root_toggled, isToggled);
  }
}

initCounter.selector = `.${styles.root}`;
