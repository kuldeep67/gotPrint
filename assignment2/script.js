var app = (function(){
    'use strict';

    var select = document.getElementById('selectUser');
    var tbody = document.getElementById("todoTableBody");
    var descId = 1, descTitle=1, descCompleted=1, userId=null, completedCount=0, selectDataArray=[],totalLength=0, myChart;
    var barChart = document.getElementById("myChart").getContext('2d');

    var setUserId = function(){
       userId = document.getElementById('selectUser').value;
       var event = new Event('USERID_CHANGED');
       document.dispatchEvent(event);

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
            checkBox['checked'] = completed?true:false;
            checkBox.className = 'dynCheck';
            checkBox.value = completed?'yes':'no';
        td1.appendChild(document.createTextNode(id));
        td2.appendChild(document.createTextNode(todoTitle));
        td3.appendChild(checkBox);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);

    }



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

            generateTable(userData, userId);
            generateChart(totalLength,userData.length);
            var selectDataUniqueUserId = selectDataArray.filter(function(item, pos){
              return selectDataArray.indexOf(item)== pos;
            });

            for (var i = 0; i < selectDataUniqueUserId.length; i++) {
                 var newOption = document.createElement("option");
                 newOption.value = selectDataUniqueUserId[i];
                 newOption.text = selectDataUniqueUserId[i];
                 select.appendChild(newOption);
            }


            document.addEventListener('USERID_CHANGED', function (e) {
            tbody.innerHTML='';
            generateTable(userData, userId)
            generateChart(totalLength,userData.length);
//                userData=userData.map(obj=>obj.userId === userId);
             }, false);

        });

    function generateTable(userData, userId){
        if(userId===null){
            totalLength = userData.length;
            for (var i = 0; i < userData.length; i++) {
                selectDataArray.push(userData[i]['userId']);
                if(userData[i]['completed']===true){
                    completedCount++;
                }
                addTableData(userData[i]['id'], userData[i]['title'], userData[i]['completed'])
            }
        }
        else{
          totalLength = 0,completedCount=0;
          for (var i = 0; i < userData.length; i++) {
              if(userData[i]['userId']==userId){
                  if(userData[i]['completed']===true){
                      completedCount++;
                  }
                  addTableData(userData[i]['id'], userData[i]['title'], userData[i]['completed']);
                  totalLength++;
              }
          }
        }



    }

    function generateChart(totalLength,originalLength) {
        if (totalLength !== originalLength && myChart) {
            myChart.data.datasets[0].data = [completedCount,(totalLength-completedCount)];
            myChart.update();
        }
        else{
             myChart = new Chart(barChart, {
                type: 'bar',
                data: {
                    labels: ["Completed", "NotCompleted"],
                    datasets: [{
                        label: 'Total Count',
                        data: [completedCount,(totalLength-completedCount)],
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
    }

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
        descCompleted *= -1;
        sortData(2,descCompleted);
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
        tbody.innerHTML='';
        trows.forEach(function(element) {
          tbody.innerHTML += element.innerHTML;


        });
        var allCheckBox = document.querySelectorAll('.dynCheck');
        allCheckBox.forEach(function(element){
            if(element.value==='yes'){
                element.checked = true;
            }else{
                element.checked = false;
            }
        })
    }


    function getVal(elm,index){
        var v='';

        if(elm.getElementsByTagName("TD")[index] && index!==2){
            v = elm.getElementsByTagName("TD")[index].innerHTML.toLowerCase();
        }

        if(isNumeric(v) && index !== 2){
            v = parseInt(v,10);
        }

        if(index === 2 && elm.getElementsByTagName("TD")[index]){
            var checkBoxEle = elm.getElementsByTagName("TD")[index].children[0];
           v = checkBoxEle.checked ? 1 : 0;
                if(checkBoxEle.value==='yes'){
                    elm.getElementsByTagName("TD")[index].children[0].checked===true;
                }
                 else {
                    elm.getElementsByTagName("TD")[index].children[0].checked===false;
                }
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




