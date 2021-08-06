const sign=document.querySelector('.btn-l');
const login=document.querySelector('.btn-r');
const cont=document.querySelector('.container')
login.addEventListener('click',async ()=>{
//         cont.innerHTML=` <h1 class="heading">Please Login to continue</h1>
//         <form action="/login" method="post" class="form-input">
//           <label for="usr">USERNAME :</label>
//           <input type="text" name="usr" placeholder="Enter your username" required id="usr" autocomplete="off">
//           <br>
//           <label for="pswd">PASSWORD :</label>
//           <input type="password" name="pswd" required placeholder="Enter your password"id="pswd">
//           <br>
//         <button type="submit" class="subs">LOGIN</button>
//         </form>`
         login.classList.remove('active');
       sign.classList.add('active');

window.location.href="http://localhost:4000/loginmain";
 })
sign.addEventListener('click',async ()=>{
//     cont.innerHTML=` <div class="heading">
//     <h1>Please Sign-up to continue</h1>
// </div>
// <form action="/signup" method="post" class="form-input">
//  <label for="usr">USERNAME :</label>
//  <input type="text" name="usr" placeholder="Enter your username" required id="usr" autocomplete="off">
//  <br>
//  <label for="pswd">PASSWORD :</label>
//  <input type="password" name="pswd" required placeholder="Enter your password"id="pswd">
//  <br>
// <button type="submit" class="subs">SIGN UP</button>
// </form>`
sign.classList.remove('active');
login.classList.add('active');
window.location.href='http://localhost:4000/';
})