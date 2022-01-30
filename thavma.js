console.log('Installing thavma extension script...');
window.addEventListener('message', async (evt) => {
  console.log('Received message:', evt);
  await browser.storage.local.set({ id: evt.data });
});
