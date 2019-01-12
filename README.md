# Shopper - Progressive Web App

The intention is for this project to be a re-imagining of `shopper-android` using a progressive web app. This should enable easier updates, since the app should be small anyway, and hopefully simpler to build.

TODO:
 1. Compute diff from the 2 models
    * what was added, what was removed, what was modified
    * maybe use: https://www.npmjs.com/package/deep-diff ?

Goals:
 - [ ] Synchronize to Google Sheets:
    - [ ] Create new model
    - [ ] Load existing model
    - [ ] Save model
    - [ ] Update model, including deletion

 - [ ] Save to local storage, so synchronization does not need to happen immediately
 - [ ] Simple list filtering to filter by store, category, or something else
 - [ ] Add price when marking as done, estimate the final cost of the list
 - [ ] Price tracking
 - [ ] Make project public when MVP-ready

This needs an API key or permission that I still need to figure out how to store.

## Useful Links

* https://www.npmjs.com/package/deep-diff
* https://hackernoon.com/a-progressive-web-app-in-vue-tutorial-part-1-the-vue-app-f9231b032a0b
* https://developers.google.com/web/fundamentals/design-and-ux/input/forms/
* https://developers.google.com/web/progressive-web-apps/checklist
* https://developers.google.com/web/fundamentals/design-and-ux/input/touch/
