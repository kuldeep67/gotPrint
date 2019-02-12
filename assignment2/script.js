
$(document).ready(function(){

var userData=[];
//fetch('http://jsonplaceholder.typicode.com/todos').then(response => {
//  return response.json();
//}).then(data => {
//   userData = [...data];
//
//}).catch(err => {
//  console.log(err);
//});

$.getJSON('http://jsonplaceholder.typicode.com/todos', function(data) {
    userData = [...data];
});

var newOption, td;
var select = document.getElementById('selectUser');

function setUserId(){
  return document.getElementById('selectUser').value;
}

setTimeout(function(){
    console.log(userData);
    for (var i = 0; i < userData.length; i++) {
        newOption = document.createElement("option");
        newOption.value = userData[i]['id'];
        newOption.text = userData[i]['userId'];
        td = document.createElement('td');

        select.appendChild(newOption);
    }
},3000);

});


