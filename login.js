const form = document.forms['login_form'];
form.addEventListener('submit', onSubmit);

function onSubmit(e){

    if(form.elements['email'].value.length === 0 || form.elements['password'].value.length === 0 || form.elements['confirmPassword'].value.length === 0){
      alert("NO");
      e.preventDefault();
    }
   
}