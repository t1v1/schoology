browser.runtime.onMessage.addListener(async (message) => {
  const questions = [];
  document.querySelectorAll('.item').forEach((item) => {
    const question = item.querySelector('.lrn_question').textContent;
    const answers = [];
    item.querySelectorAll('.lrn-mcq-option .sr-only').forEach((ans) => {
      answers.push(ans.textContent);
    });
    questions.push({ question, answers });
  });
  const res = await fetch('http://localhost:3000/questions', {
    method: 'post',
    body: JSON.stringify(questions),
    headers: { 'Content-Type': 'application/json' },
  });
  const { id } = await res.json();
  window.setInterval(async () => {
    const res = await fetch(`http://localhost:3000/answers?id=${id}`);
    const answers = await res.json();
    const div = document.createElement('div');
    div.className = 't1v1';
    div.innerText = answers.map((ans, idx) => `${idx + 1}. ${ans}`).join(' | ');
    document.body.appendChild(div);
  }, 1000);
});
