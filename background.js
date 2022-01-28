const url = 'https://thavma.club';
browser.browserAction.onClicked.addListener(() => {
  console.log('Browser action clicked...');
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    console.log('Sending message...');
    browser.tabs.sendMessage(tabs[0].id, {});
  });
});
browser.runtime.onMessage.addListener(async ({ questions }) => {
  console.log('Creating assessment...', { questions });
  const res = await fetch(`${url}/api/assessments`, {
    method: 'post',
    body: JSON.stringify({ questions }),
    headers: { 'Content-Type': 'application/json' },
  });
  const { id } = await res.json();
  console.log(`Created assessment (${id}).`);
  window.setInterval(async () => {
    console.log(`Fetching assessment (${id})...`);
    const res = await fetch(`${url}/api/assessments/${id}`);
    const { questions } = await res.json();
    console.log(`Fetched assessment (${id}):`, { questions });
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      console.log('Sending message...');
      browser.tabs.sendMessage(tabs[0].id, { questions });
    });
  }, 1000);
});
