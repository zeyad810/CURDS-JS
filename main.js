// get total

//save data to local storage
//clear all inputs
//read 
//count
//delete
// update 
// search 
// clean data 


let title =document.getElementById('title');
let price =document.getElementById('price');
let tax =document.getElementById('tax');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');


let mood ="create"
let temp;
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +tax.value + +ads.value) - +discount.value
        total .innerHTML = result
        total.style.background ="#040"
    }
    else {
        total.innerHTML =" "
        total.style.background ='a00d02'
    }
}
// create product



let  dataProducts;
if (localStorage.products !=null) {
    dataProducts = JSON.parse(localStorage.products)
}else{
    dataProducts=[];
}



submit.onclick = function () {
   
    let newProduct={
        title:title.value,
        price:price.value,
        tax:tax.value,
        ads:ads.value,
        discount:discount.value,
        category:category.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    
    }
    if (title.value !="" && price.value!='' && count.value <=100) {
        if (mood === "create"  ) {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProducts.push(newProduct)
            }
            }
            else{
                dataProducts.push(newProduct);
            }
        }
        else{
            dataProducts[temp] =newProduct;
            mood ="create"
            submit.innerHTML="create"
            count.style.display='block'
        } 
    }

    localStorage.setItem('products', JSON.stringify(dataProducts));
    clearData()
    showData() 
}

//clear data 
function clearData() {
    tax.value='';
    price.value='';
    ads.value="";
    category.value="";
    count.value="";
    discount.value="";
    title.value="";
    total.innerHTML="";
}

// read data
function showData() {
    getTotal()
    let table = " "
    for (let index = 0; index < dataProducts.length; index++) {
        table += `
        <tr>
        <td>${index +1}</td>
        <td>${dataProducts[index].title}</td>
        <td>${dataProducts[index].price}</td>
        <td>${dataProducts[index].tax}</td>
        <td>${dataProducts[index].ads}</td>
        <td>${dataProducts[index].discount}</td>
        <td>${dataProducts[index].total}</td>
        <td>${dataProducts[index].category}</td>
        <td><button onclick="update(${index}) "  id="update">Update</button></td>
        <td><button onclick="deleteData(${index})" id="delete">delete</button></td>
    </tr>
        `
    }
    document.getElementById("tableBody").innerHTML=table;
    let btnDel =document.getElementById("deleteAll");
    if (dataProducts.length > 0) {
        btnDel.innerHTML=`
        <button onclick = "deleteAll()" >Delete All ${ dataProducts.length} items ?</button>`
        
    }
    else{
        btnDel.innerHTML="";
    }
  
}
// delete data
function deleteData(index) {
    dataProducts.splice(index,1);
    localStorage.products = JSON.stringify(dataProducts);
    showData();
}

function deleteAll() {
    dataProducts.splice(0)
    localStorage.clear()
    showData()
}
// update data 
function update(index) {
    title.value =dataProducts[index].title;
    price.value =dataProducts[index].price;
    tax.value =dataProducts [index].tax;
    ads.value =dataProducts[index].ads;
    discount.value=dataProducts[index].discount;
    total.innerHTML=dataProducts[index].total;
    category.value=dataProducts[index].category;
    getTotal()
    count.style.display ="none"
    submit.innerHTML ="Update"
    mood ="update"
    temp = index ;
    scroll({
        top: 0,
        behavior:'smooth'
    })
}


//search
let searchMode ='title'
function getSearchMood(id) {
    let srh =document.getElementById('search')
if (id == "searchByTitle") {
    searchMode= 'title'
    srh.placeholder ="search by title "
    
}else{
    searchMode ="category"
    srh.placeholder ="search by category "
}
srh.focus()
srh.value=""
showData()


}

function searchData(value) {
    let table =" ";
    if (searchMode == 'title') {
        for (let index = 0; index < dataProducts.length; index++) {
            if (dataProducts[index].title.toLowerCase().includes(value.toLowerCase()) ) {
                table += `
                <tr>
                <td>${index +1}</td>
                <td>${dataProducts[index].title}</td>
                <td>${dataProducts[index].price}</td>
                <td>${dataProducts[index].tax}</td>
                <td>${dataProducts[index].ads}</td>
                <td>${dataProducts[index].discount}</td>
                <td>${dataProducts[index].total}</td>
                <td>${dataProducts[index].category}</td>
                <td><button onclick="update(${index}) "  id="update">Update</button></td>
                <td><button onclick="deleteData(${index})" id="delete">delete</button></td>
                </tr>`
                
            
            }
            
        }

    }
    else{
        for (let index = 0; index < dataProducts.length; index++) {
            if (dataProducts[index].category.toLowerCase().includes(value.toLowerCase()) ) {
                table += `
                <tr>
                <td>${index +1}</td>
                <td>${dataProducts[index].title}</td>
                <td>${dataProducts[index].price}</td>
                <td>${dataProducts[index].tax}</td>
                <td>${dataProducts[index].ads}</td>
                <td>${dataProducts[index].discount}</td>
                <td>${dataProducts[index].total}</td>
                <td>${dataProducts[index].category}</td>
                <td><button onclick="update(${index}) "  id="update">Update</button></td>
                <td><button onclick="deleteData(${index})" id="delete">delete</button></td>
                </tr>`
            }
            
        }
    }
    document.getElementById("tableBody").innerHTML=table;
}

showData() 
