// Storage
class Store {
    static getArr() {
      let arr;
      if(localStorage.getItem('arr') === null) {
        arr = [];
      } else {
        arr = JSON.parse(localStorage.getItem('arr'));
      }
  
      return arr;
    }
  
    static addArr(ele) {
      const arr = Store.getArr();
      arr.push(ele);
      localStorage.setItem('arr', JSON.stringify(arr));
    }
  
    static delArr(index) {
      const arr = Store.getArr();

          arr.splice(index, 1);
  
      localStorage.setItem('arr', JSON.stringify(arr));
    }
  }

var field = document.getElementById('inputField');
var myList = document.querySelector('ul');

function rand(maxLimit = 100) {
    let rand = Math.random() * maxLimit;
    return Math.floor(rand);
   }

function newItem(data){
    var newChild = `<li id = '${rand(100000)}'>
    <div class="title">${data}</div>
    <div class="del"><i class="fas fa-trash"></i></div>
</li>`;
   myList.insertAdjacentHTML('beforeend',newChild);
}
function init(){
    var arr = Store.getArr();
    arr.forEach((ele) => newItem(ele));
}

function AddNewItemFromInput(){
    if(field.value ==''){
        alert('Please Fill input Field');
    }
    else{
        var data = field.value;
        Store.addArr(data);
        field.value = '';
        newItem(data);
    }
}

var btn = document.querySelector('.button');
btn.addEventListener('click', AddNewItemFromInput);

field.addEventListener("keypress", function(e){
    if(e.keyCode === 13)
      AddNewItemFromInput();
});


// Remove an item

function deleteBook(el){
    var arr = Store.getArr();
   if(el.classList.contains('fa-trash')){
       var c = el.parentElement.parentElement.children[0];
       for(var i=0;i<arr.length;i++){
           if(arr[i] == c.textContent)
           {
               Store.delArr(i);
           }
       }
       el.parentElement.parentElement.remove();
   }
}

// Done
function markDone(el){
   if(el.classList.contains('title')){
    var c = el.parentElement.children[0];
    if(c.classList.contains('done')){
      c.classList.remove("done");
    }
    else{
      c.classList.add("done")
    }
   }
}

myList.addEventListener('click', (el) => {
    deleteBook(el.target);
    markDone(el.target);
 });