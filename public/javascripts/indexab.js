const toogler=document.querySelector('.navbar-btn');
const drop=document.querySelector('.drop');


toogler.addEventListener('click',()=>{
    drop.classList.toggle('show');
})