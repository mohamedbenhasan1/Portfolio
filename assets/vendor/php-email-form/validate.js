function php_email_form_submit(thisForm, action, formData) {
  fetch(action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'  // <-- Important: tells Formspree we expect JSON
    }
  })
  .then(response => {
    thisForm.querySelector('.loading').classList.remove('d-block');

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();  // return parsed JSON only after status check
  })
  .then(data => {
    if (data.ok) {
      thisForm.querySelector('.sent-message').classList.add('d-block');
      thisForm.reset();

      // Optional redirect:
      // window.location.href = data.next;
    } else {
      throw new Error(data.message || 'Form submission failed');
    }
  })
  .catch(error => {
    displayError(thisForm, error);
  });
}
