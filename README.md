# Shopper - Progressive Web App

The intention is for this project to be a re-imagining of `shopper-android` using a progressive web app. This should enable easier updates, since the app should be small anyway, and hopefully simpler to build.

---

Goals:
 - Import/export to Google Sheets + Clipboard
 - Save to local storage, so synchronization does not need to happen immediately
 - Simple list filtering to filter by store, category, or something else
 - Add price when marking as done, estimate the final cost of the list
 - Price tracking?

> Make project public when MVP-ready
> This needs an API key or permission that I still need to figure out how to store. Could it be just locked to an URL?

## Useful Links

* https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
* https://www.npmjs.com/package/jsondiffpatch (for minimal array diffing)
* https://stackoverflow.com/questions/43329654/android-back-button-on-a-progressive-web-application-closes-de-app
* https://hackernoon.com/a-progressive-web-app-in-vue-tutorial-part-1-the-vue-app-f9231b032a0b
* https://developers.google.com/web/fundamentals/design-and-ux/input/forms/
* https://developers.google.com/web/progressive-web-apps/checklist
* https://developers.google.com/web/fundamentals/design-and-ux/input/touch/

## Notes on Speeding up TypeScript compilation

Probably the easiest way to to run `npm run build-watch` to have incremental compilation, and then
use the `jest` config that runs over the `build` directory with `npm run build-test`.
