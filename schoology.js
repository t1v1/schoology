const questions = [];
document.querySelectorAll('.item').forEach((item) => {
  const question = item.querySelector('.lrn_question').innerText;
  const answers = [];
  document.querySelectorAll('.lrn-mcq-option .sr-only').forEach((ans) => {
    answers.push(ans.innerText);
  });
  questions.push({ question, answers });
});
console.log('Questions:', questions);
