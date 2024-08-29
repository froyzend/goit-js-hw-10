import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


  const form = document.getElementById('promiseForm');
  const delayInput = document.getElementById('delay');
  const stateInput = document.getElementsByName('state');

  // Обрабатываем отправку формы
  form.addEventListener('submit', onFormSubmit);

  function onFormSubmit(e) {
    e.preventDefault();

    const delay = Number(delayInput.value);
    const state = [...stateInput].find((input) => input.checked).value;

    // Создаем промис
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else if (state === 'rejected') {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then((delay) => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          timeout: 5000,
        });
      })
      .catch((delay) => {
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          timeout: 5000,
        });
      });

    form.reset();
  }


