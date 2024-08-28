> [!WARNING]  
> This project is in maintainence mode now, check out [React Server Components](https://beta.nextjs.org/docs/rendering/server-and-client-components#server-components) instead!

# next-client-script

> Supercharge the performance of your Next.js apps by using a minimal client runtime that avoids full-blown hydration. 🚀

## The problem

By default, Next.js adds the code to your client bundle that is necessary to execute your whole page. At a minimum this includes React itself, the components to render the markup and if relevant, the data that is necessary to rehydrate the markup (result from `getInitialProps` and friends).

For content heavy sites this [can cause performance issues](https://developers.google.com/web/updates/2019/02/rendering-on-the-web#rehydration) since the page is unresponsive while the client bundle is being executed.

Recently, an [early version of removing the client side bundle](https://github.com/vercel/next.js/pull/11949) was shipped to Next.js which doesn't suffer from performance problems caused by hydration. However, for a typical website you'll likely still need some JavaScript on the client side to deliver a reasonable user experience.

## This solution

This is a Next.js plugin that is intended to be used in conjunction with disabled runtime JavaScript. You can add client bundles on a per-page basis that only sprinkle a tiny bit of JavaScript over otherwise completely static pages.

This allows for the same [architecture that Netflix has chosen for their public pages](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9).

**Benefits:**

- Keep the React component model for rendering your markup server side
- Use the Next.js development experience and build pipeline for optimizing the server response
- A client side runtime for components is opt-in
- Serializing data for the client is opt-in

The tradeoff is that you can't use any client-side features of React (state, effects, event handlers, …). Note that some features of Next.js might not be available (yet) – e.g. code splitting via `dynamic` within a page.

→ [Demo deployment](https://next-client-script.vercel.app/) ([source](https://github.com/amannn/next-client-script/tree/master/packages/example))


## Compatibility

⚠️ **Important:** To achieve the desired effect, this plugin modifies the webpack configuration that Next.js consumes. Similar as with other Next.js plugins, it's possible that this plugin will break when there are updates to Next.js. I'm keeping the plugin updated so that it continues to work with new versions of Next.js.

| Next.js version  | Plugin version |
| ------------- | ------------- |
| ^10.0.0, ^9.5.0 | 0.1.0 |
| ~9.4.0 | 0.0.6 |

Latest version tested: 10.0.5

## Getting started

### Minimum setup

1. Add a client script for a page.

```js
// ./src/client/index.ts
console.log('Hello from client.');
```

2. Add this plugin to your `next.config.js` and reference your client script.

```js
const withClientScripts = require('next-client-script/withClientScripts');

// Define which paths will cause which scripts to load
module.exports = withClientScripts({
  '/': './src/client/index.ts',
  // You can use parameters as provided by path-to-regexp to match routes dynamically.
  '/products/:id': './src/client/product.ts'
})();
```

3. Add a [custom document to your app](https://nextjs.org/docs/advanced-features/custom-document) and add the `<ClientScript />` component as the last child in the body.

```diff
+ import ClientScript from 'next-client-script/ClientScript';

  // ...

+   <ClientScript />
  </body>
```

4. **Recommended**: Disable the runtime JavaScript for the pages with separate client scripts:

```js
// ./pages/index.ts
export const config = {
  unstable_runtimeJS: false
};
```

Note that you can mix this approach with the traditional hydration approach, to optimize the performance of critical pages while keeping the flexibility of using React on the client side for other pages.

See [the example folder](https://github.com/amannn/next-client-script/blob/master/packages/example) for a project demonstrating this setup.

### Widget usage

To help with a component-oriented approach for client-side code, this library contains convenience APIs that help with passing data to the client and initializing widgets.

Use the `ClientWidget` component to mark an entry point for the client side and to optionally pass in some data.

```js
// Counter.js
import ClientWidget from 'next-client-script/ClientWidget';
import styles from './Counter.module.scss';

export default function Counter({initialCount = 2}) {
  return (
    <ClientWidget className={styles.root} data={{initialCount}}>
      <p className={styles.label}>
        Count: <span className={styles.count}>{initialCount}</span>
      </p>
      <button className={styles.button}>Increment</button>
    </ClientWidget>
  );
}
```

Now you can add a client part for this component that receives the data and adds interactivity.

```js
// Counter.client.js
import styles from './Counter.module.scss';

export default function initCounter(rootNode, data) {
  let count = data.initialCount;

  const countNode = rootNode.querySelector(`.${styles.count}`);
  const buttonNode = rootNode.querySelector(`.${styles.button}`);

  buttonNode.addEventListener('click', () => {
    count++;
    countNode.textContent = count;
  });
}

// This will be passed to `querySelectorAll` to find all widgets on the page
initCounter.selector = `.${styles.root}`;
```

As a last step, you need to reference the client counter code in your client script:

```js
import initWidgets from 'next-client-script/initWidgets';
import Counter from 'components/Counter/Counter.client';

initWidgets([Counter]);
```

## Prior art & credits

- [A Netflix Web Performance Case Study](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9) by [Addy Osmani](https://twitter.com/addyosmani)
- [next-critical](https://github.com/stroeer/next-critical) by [Lukas Bombach](https://github.com/stroeer/next-critical)

I really hope that React will solve hydration problems in the future with [partial hydration](https://github.com/facebook/react/pull/14717) and [server-side components](https://github.com/facebook/react/tree/master/fixtures/blocks), but I think a tiny bit of vanilla JavaScript on the client side is really hard to beat.
