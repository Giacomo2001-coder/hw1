const form = document.forms['register_form'];
form.addEventListener("submit", OnSubmit);

function OnSubmit(e){
    if(form.elements['email'].value.length === 0 || form.elements['password'].value.length === 0 || form.elements['confirmPassword'].value.length === 0){
        alert("NO");
        e.preventDefault();
      }
} 