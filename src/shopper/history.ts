function dequeueIfNeeded(isShopperQueued: boolean, isListSelected: boolean) {
  if (isShopperQueued && !isListSelected) {
    window.history.back();
  }
}

function enqueueIfNeeded(isShopperQueued: boolean, isListSelected: boolean) {
  if (!isShopperQueued && isListSelected) {
    window.history.pushState({ isShopperQueued: true }, 'shopper');
  }
}

function isShopperQueued() {
  return window.history.state?.isShopperQueued === true;
}

export { dequeueIfNeeded, enqueueIfNeeded, isShopperQueued };
