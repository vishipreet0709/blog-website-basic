const newpost=document.querySelector('.newpost');
const editpost=document.querySelectorAll('.edit');
const deletepost=document.querySelectorAll('.delete');
const readmore=document.querySelectorAll('.read');
const toogler=document.querySelector('.navbar-btn');
const drop=document.querySelector('.drop');
newpost.addEventListener('click',async ()=>{
  window.location.href="http://localhost:4000/form";
})

editpost.forEach((item)=>{

    item.addEventListener('click', ()=>{
        const gparent=item.parentElement.parentElement;
        const articleid=gparent.getAttribute("id");
        window.location.href=`http://localhost:4000/editpost?k=${articleid}`;
    })
})




readmore.forEach((item)=>{
    item.addEventListener('click',()=>{
        const gparent=item.parentElement.parentElement;
        const articleid=gparent.getAttribute("id");
        window.location.href=`http://localhost:4000/blogs?k=${articleid}`;
    })
})


deletepost.forEach((item)=>{
    item.addEventListener('click',()=>{
        const gparent=item.parentElement.parentElement;
        const articleid=gparent.getAttribute("id");
        window.location.href=`http://localhost:4000/deletepost?k=${articleid}`;
    })
})

toogler.addEventListener('click',()=>{
    drop.classList.toggle('show');
})