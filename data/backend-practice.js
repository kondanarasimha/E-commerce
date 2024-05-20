const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();

xhr.addEventListener('load', ()=> { //setting event lister have a callback to wait from the respones from backend.
  console.log(xhr.response);
});
