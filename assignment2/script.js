(function(){
    'use strict';

    var select = document.getElementById('selectUser');

    //Not in use
    function setUserId(){
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
        document.getElementById("todoTableBody").appendChild(tr);

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
})();




