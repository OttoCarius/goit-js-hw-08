import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let objectStorage = {
  email: '',
  message: '',
};

getInputLocalStorage();
function getInputLocalStorage() {
  try {
    const dataLS = localStorage.getItem(STORAGE_KEY);
    if (!dataLS) return;
    objectStorage = JSON.parse(dataLS);
    for (let key in objectStorage) {
      form.elements[key].value = objectStorage[key];
    }
  } catch (error) {
    console.log('Get state error: ', error.message);
  }
}

function onFormInput(e) {
  objectStorage[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(objectStorage));
}

function onFormsubmit(e) {
  e.preventDefault();
  const { email, message } = e.currentTarget.elements;

  const formData = {
    email: email.value,
    message: message.value,
  };
  console.log('This is Form Data:', formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormsubmit);
