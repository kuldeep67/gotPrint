var app = (function(){
    'use strict';

    var select = document.getElementById('selectUser');
    var tbody = document.getElementById("todoTableBody");
    var descId = 1, descTitle=1;

    //Not in use
    var setUserId = function(){
       return document.getElementById('selectUser').value;
    }

    //Dynamically generating table
    function addTableData( id, todoTitle, completed ){
        var tr = document.createElement('tr');
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.class = 'completed';
            checkBox.disabled = true;
            checkBox.checked = completed?true:false;
        td1.appendChild(document.createTextNode(id));
        td2.appendChild(document.createTextNode(todoTitle));
        td3.appendChild(checkBox);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);

    }

    // getting chart context
    var barChart = document.getElementById("myChart").getContext('2d');

    // Getting api response
    async function getData() {
        try{
            const response = await fetch('http://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            return data;
        }
        catch (err) {
            console.log('fetch failed', err);
        }
    }

    // Generating data set from the response
    getData().then(
        function(userData){
            var completedCount=0;
            for (var i = 0; i < userData.length; i++) {
               var newOption = document.createElement("option");
               newOption.value = userData[i]['id'];
               newOption.text = userData[i]['userId'];
               select.appendChild(newOption);
               if(userData[i]['completed']===true){
                   completedCount++;
               }
               addTableData(userData[i]['id'], userData[i]['title'], userData[i]['completed'])
            }

            // creating chart
            var myChart = new Chart(barChart, {
                type: 'bar',
                data: {
                    labels: ["Completed", "NotCompleted"],
                    datasets: [{
                        label: 'Total Count',
                        data: [completedCount,(userData.length-completedCount)],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255,99,132,1)'
                            ],
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: { display: false },
                    title: {
                            display: true,
                            text: 'Completed vs Not completed'
                          },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }
    );
    var sortById = function(){
        descId *= -1
        sortData(0,descId);
        ;

    }
    var sortByTitle = function(){
        descTitle *= -1;
        sortData(1,descTitle);

    }
    var sortByCompleted = function(){
        console.log("sort completed")
    }

    function sortData(index,desc){
        var sortAll = true, rows = tbody.rows, shouldSort=false, tempRow;
        var trows = [...rows];
        	trows.sort(function(a, b) {
        		var first = getVal(a,index);
        		var second = getVal(b,index);
                if(first < second) {
        			return -1*desc;
        		}
        		if(first > second) {
        			return 1*desc;
        		}
        		return 0;
        	});
        	console.log(trows[1].innerHTML);
    }


    function getVal(elm,index){
        var v='';
        if(elm.getElementsByTagName("TD")[index]){
            v = elm.getElementsByTagName("TD")[index].innerHTML.toLowerCase();
        };

        if(isNumeric(v)){
            v = parseInt(v,10);
        }
        return v;
    }

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    return {
        setUserId: setUserId,
        sortById: sortById,
        sortByTitle: sortByTitle,
        sortByCompleted: sortByCompleted

    };

})();




