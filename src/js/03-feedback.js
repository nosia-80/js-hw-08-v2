import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const feedbackForm = document.querySelector('.feedback-form');
const { email, message } = feedbackForm.elements;

let formData = {};

feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
feedbackForm.addEventListener('input', throttle(onFeedbackFormChange, 500));

checkLocalStorage();

function onFeedbackFormSubmit(evt) {
  evt.preventDefault();

  if (email.value === '' || message.value === '') {
    return alert('Пожалуйста, заполните все обязательные поля!!!');
  }

  console.log({ email: email.value, message: message.value });
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFeedbackFormChange(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function checkLocalStorage() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);

  if (savedFormData) {
    formData = JSON.parse(savedFormData);

    email.value = formData.email;
    message.value = formData.message;
  }
}
