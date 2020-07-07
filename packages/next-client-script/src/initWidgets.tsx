interface Widget {
  (node: HTMLElement, data?: any): void;
  selector: string;
}

export default function initWidgets(widgets: Array<Widget>) {
  function runInitialization() {
    widgets.forEach((widget) => {
      const nodes = document.querySelectorAll(widget.selector);

      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];

        if (node instanceof HTMLElement) {
          let data: any;
          if (node.children) {
            const dataChild = Array.from(node.children).find(
              (child) =>
                child instanceof HTMLElement &&
                child.dataset.widgetData === 'true'
            );

            if (dataChild?.textContent) {
              try {
                data = JSON.parse(dataChild.textContent);
              } catch (error) {
                console.error('Data unparseable: ' + dataChild.textContent);
              }
            }
          }

          widget(node, data);
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
