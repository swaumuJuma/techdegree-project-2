/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


//global variables that store the DOM elements and the number of iterms on each page
const listItem = document.getElementsByClassName('student-item');
const numOfItemsOnEachPage = 10;
const page = document.querySelector('div.page');
const pageHeader = document.querySelector('div.page-header');
const studentNames = document.querySelectorAll('h3');

//creating the search component(i.e, input field and search button)
const studentSearch = document.createElement('div');
studentSearch.className = 'student-search';
const input = document.createElement('input');
input.className = 'search-input';
const button = document.createElement('button');
button.textContent = 'Search';
button.className = 'searchButton';
button.style.marginLeft = '5px';
input.placeholder = "Search for students...";
studentSearch.appendChild(input);
studentSearch.insertBefore(button, input.nextElementSibling);
pageHeader.appendChild(studentSearch);


//Selecting the input and the button
const searchButton = document.querySelector('.searchButton');
const searchInput = document.querySelector('.search-input');


//function that hides all the items in the list except for
//the 10 on each page
const showPage = (list, page) => {
   //startIndex and endIndex variables
   let startIndex = (page * 10) - 10;
   let endIndex = page * 10;
   //iterate through the list
   for(let i = 0; i<list.length; i++){
      //student names on the lis with index greater than or equal to start index
      //but less than the end index are displayed
      if(i >= startIndex && i<endIndex ){
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}


//creating the div  which the message 'no results found' will be printed on
//when there are no matches on the list.
let newDiv = document.createElement('div');
   let p = document.createElement('p');
   p.textContent = "No results found."
   newDiv.appendChild(p);

   //array for storing the unhidden li elements
   let unhiddenLis = [];

//function that does the matching between the searched name and the names on the list of students
const searchName = (inputSearch, list) =>{
   //refer to count when handling the resuls returned
   let count = 0;

   for(let i = 0; i<list.length; i++){
      //Display the list of student names that contains the characters  that match with
 //the characters typed by the user in the input field.
      if(inputSearch.value.length !== 0  ){

          if(studentNames[i].textContent.toLowerCase().includes(inputSearch.value.toLowerCase())){
            list[i].style.display = '';
            //each of the displayed student name is stored in the 'unhiddenLis' array
            unhiddenLis.push(list[i]);
          } else {
             //count is increased by one for every hidden li.
            count++;
          //   The student names which don't match with the names typed by user in search input
          // is hidden.
            list[i].style.display = 'none';
           }


       } else {
         //If nothing is typed in the search input, display all the list of students
         //and each of their li elements are stored in the 'unhiddenLis' array
         list[i].style.display = '';

         unhiddenLis.push(list[i]);
      }
   }

  //The pagination links are removed first to avoid duplication when the list from the 'unhiddenLis' is displayed
   page.removeChild(document.querySelector('.pagination'));
   //display the the list from the 'unhiddenLis' array and place the lis on each page
   showPage(unhiddenLis, 1);
   //Display the page links
   appendPageLinks(unhiddenLis);
   //make the array empty again
   unhiddenLis = [];

//if the count is equal to the number of lis,
//insert the new div with the message 'no results found'
//before the last element child of the page element
//and display the message
if(count === list.length ){
  page.insertBefore(newDiv, page.lastElementChild);
   newDiv.style.display = '';
   } else {
      newDiv.style.display = 'none';
   }
}


//Creating the pagination buttons and its functionality through the appendPageLinks function
const appendPageLinks = (list) => {
   //Creating the div with class name 'pagination'
   const pagination = document.createElement('div');
   pagination.className = 'pagination';

   //creating the ul
   let ul = document.createElement('ul');
   //creating the li and a tags with href = '#'
   for(let i = 0; i<list.length/ numOfItemsOnEachPage ; i++){
     const li = document.createElement('li');
     const a = document.createElement('a');
     a.href = '#';
     //putting the number page
     a.textContent = i+1;
     //making the first button active
     if(a.textContent === '1'){
        a.className = 'active';
     }
     //append the a tags to li
     li.appendChild(a);
     //append the lis to ul
      ul.appendChild(li);
   }
   //append the ul to the pagination div
   pagination.appendChild(ul);

   //append the pagination div to the page dic
   page.appendChild(pagination);

   //Creating the 'a' tags
   const aTags = document.getElementsByTagName('a');
   //adding event listener on each a tag to allow the user
   //to view the list of the student names on each page after he clicks it
   //and make the clicked button active.
   for(let k = 0; k<aTags.length; k++){
      aTags[k].addEventListener('click', (e) =>{
         showPage(list, e.target.textContent);
         for(let a = 0 ; a < aTags.length; a++){
            aTags[a].classList.remove('active');
         }
         e.target.className = 'active';
      })
   }
}

//Calling the functions to run the program
showPage(listItem, 1);
appendPageLinks(listItem);


//implement searchName function when the user types something on the search input
//and clicks the search button
searchInput.addEventListener('keyup', () => {
   searchName(searchInput, listItem);
})
searchButton.addEventListener('click', () => {
   searchName(searchInput, listItem);
})
