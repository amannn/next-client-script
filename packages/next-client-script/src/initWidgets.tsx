interface Widget {
  (node: HTMLElement, props?: any): void;
  selector: string;
}

export default function initWidgets(widgets: Widget[]) {
  function runInitialization() {
    widgets.forEach((widget) => {
      const nodes = document.querySelectorAll(widget.selector);

      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];

        if (node instanceof HTMLElement) {
          let props: any;
          if (node.children) {
            const propsChild = Array.from(node.children).find(
              (child) =>
                child instanceof HTMLElement &&
                child.dataset.widgetProps === 'true'
            );

            if (propsChild?.textContent) {
              try {
                props = JSON.parse(propsChild.textContent);
              } catch (error) {
                console.error('Props unparseable: ' + propsChild.textContent);
              }
            }
          }

          widget(node, props);
        }
      }
    });
  }

  if (document.readyState === 'complete') {
    runInitialization();
  } else {
    window.addEventListener('load', runInitialization);
  }
}
