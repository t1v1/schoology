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
  const res = await fetch('http://localhost:3000/assessments', {
    method: 'post',
    body: JSON.stringify({ questions }),
    headers: { 'Content-Type': 'application/json' },
  });
  const { id } = await res.json();
  window.setInterval(async () => {
    const res = await fetch(`http://localhost:3000/assessments/${id}`);
    const { questions } = await res.json();
    const div = document.createElement('div');
    div.className = 't1v1';
    div.innerText = questions
      .map((q, idx) => `${idx + 1}. (${q.answer + 1}) ${q.answers[q.answer]}`)
      .join(' | ');
    document.body.appendChild(div);
  }, 1000);
});
