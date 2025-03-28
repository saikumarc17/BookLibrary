let totalPagination =0;
let booksArray;
let currentPage=1;
let itemsPerPage=5;

const CardContainer=document.getElementById('CardContainer')
const searchInput=document.getElementById('searchInput')

let timer;
searchInput.addEventListener('keyup',(event)=>{
    clearTimeout(timer)
    timer=setTimeout(()=>{
        const SearchData=booksArray.filter((ele)=>ele.title.toLowerCase().includes((event.target.value).toLowerCase())||ele.authors.toLowerCase().includes((event.target.value).toLowerCase()))
        generateBooks(SearchData);
    },500)
})


async function getBooks(paginationNumber,limit){
    
    const url=`https://api.freeapi.app/api/v1/public/books?page=${paginationNumber}&limit=${limit}&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech`
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    const result=await fetch(url,options);
    const booksData=await result.json(); 
    booksArray=booksData.data.data.map((ele)=>({       
        title:ele.volumeInfo.title,

        //Using the ternary operator to check if authors or not
        //If true, join the array to a comma-separated string, otherwise assign an empty string as Not Available
        authors:ele.volumeInfo.authors?(ele.volumeInfo.authors).join(', '):"Not Available",
        publisher:ele.volumeInfo.publisher?ele.volumeInfo.publisher:'Not Available',
        publishedDate:ele.volumeInfo.publishedDate?ele.volumeInfo.publishedDate:'Not Available',
        image:ele.volumeInfo.imageLinks.smallThumbnail,
    }))
    generateBooks(booksArray);
    totalPagination=booksData.data.totalPages;
    genertaePagination(totalPagination);
    console.log(totalPagination,"Pagination");
}

getBooks(currentPage,itemsPerPage);

function populateBookDetails(bookele){
    const cardContent=`
            <img 
            src="${bookele.image}"
            alt="${bookele.title}">
            <div>
                <h4>${bookele.title}</h4>
                <div>
                    <table>
                        <tr>
                            <td>Author :</td>
                            <td>${bookele.authors}</td>
                        </tr>
                        <tr>
                            <td>Published by :</td>
                            <td>${bookele.publisher}</td>
                        </tr>
                        <tr>
                            <td>Published Date:</td>
                            <td>${bookele.publishedDate}</td>
                        </tr>
                    </table>
                </div>
            </div>`

    const bookCard=document.createElement('div');
    bookCard.classList.add('book');
    bookCard.innerHTML=cardContent;
    CardContainer.appendChild(bookCard);
}

function generateBooks(arrayOfBooks){
    CardContainer.innerHTML='';
    arrayOfBooks.forEach((book) => {
        populateBookDetails(book)
    });
}

// let order='dec'
// function sortData(){
//     console.log(order);
//      if(order==='dec'){
//         booksArray.sort((a,b)=>a.title.localeCompare(b.title));
//         generateBooks(booksArray);
//         order='asc';
//         console.log(order);
//     } else{
//         booksArray.sort((a,b)=>b.title.localeCompare(a.title));
//         generateBooks(booksArray);
//         order='dec';
//         console.log(order);
//     }
//     console.log(booksArray);
// }

// let dateOrder='dec'
// function dateSortData(){
//      if(dateOrder==='dec'){
//         booksArray.sort((a,b)=>new Date(a.publishedDate)-new Date(b.publishedDate));
//         generateBooks(booksArray);
//         dateOrder='asc';
//         console.log(order);
//     } else{
//         booksArray.sort((a,b)=>new Date(b.publishedDate)-new Date(a.publishedDate));
//         generateBooks(booksArray);
//         dateOrder='dec';
//         console.log(order);
//     }
// }

// re writing the code for more reusable 
let order = 'dec';
let dateOrder = 'dec';

// taking array(bookarray) , key(title or publish date) and order(order or dateorder)
function sortArray(array, key, order) {
    return array.sort((a, b) => {
        // sorting data based on keys publish date or title
        // as both data types are of different type we are using different sorts 
        if (key === 'publishedDate') {
            // first cnverting to regular date format and sorting data
            return order === 'asc' ? new Date(a[key]) - new Date(b[key]) : new Date(b[key]) - new Date(a[key]);
        } else {
            // using localeCompare tosort based on local language 
            return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
        }
    });
}

// sorting based on title
function sortData() {
    console.log(order);
    booksArray = sortArray(booksArray, 'title', order);
    generateBooks(booksArray);
    order = order === 'dec' ? 'asc' : 'dec';
    console.log(order);
}

// sorting based on publish date
function dateSortData() {
    console.log(dateOrder);
    booksArray = sortArray(booksArray, 'publishedDate', dateOrder);
    generateBooks(booksArray);
    dateOrder = dateOrder === 'dec' ? 'asc' : 'dec';
    console.log(dateOrder);
}


// pagination Code

const pageCount=document.getElementById('pageCount');
// for greating pagination buttons based on pages count
function genertaePagination(count){
    pageCount.innerHTML=''
    for (let index = 1; index <= count; index++) {
        const item=document.createElement('button');
        item.classList.add('count');
        item.innerHTML=index;
        pageCount.appendChild(item);
   }
    // getting pagination numbers using count class 
    // updating current page and calling on updated page  
   const PaginationNumber=document.querySelectorAll('.count');
   PaginationNumber.forEach((element) => {
        element.addEventListener('click',()=>{
            currentPage=element.innerHTML;
            getBooks(currentPage,itemsPerPage);
        })    
   });
}

const ItemCount=document.getElementById('ItemCount');
// for setting items per page
ItemCount.addEventListener('change',(event)=>{
    itemsPerPage=event.target.value;
    getBooks(currentPage,itemsPerPage);
})





