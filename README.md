# next-client-script

> Add a separate client entry point to your Next.js pages.

Minimum setup:

1. Add client script for a page
2. Add plugin to `next.config.js` and configure client script
3. Add component to custom document page
4. Optional: Add `unstable_runtimeJS: true` to the page

Widget usage:

1. Add a client widget and use `ClientWidget`.
2. Use `initClientWidgets` and pass in the widget

benefits
 - serializing state is opt-in
 - client side runtime for components is opt-in

 tradeoff
 - no client-side css-in-js (e.g. css modules is totally fine)

inspiration
 - netflix case study
 - addy osmani
 - https://github.com/postcss/postcss.org/pull/256