import React, {useState, useEffect} from 'react'
import Plot from 'react-plotly.js';


function TimeChart() {
    //list state = initial state
    const [list, setList] = useState({});


    // Object.keys(testData).forEach(function(key) {
    //     console.log(key, testData[key].ID);
    // });
   useEffect(()=>{
        fetch('http://localhost:3001/users/data')
        .then(response => response.json())
        .then(response =>{
            setList(response)
        })
        .catch(err => {
            console.log(err);
        })

    })






        // const st = list.forEach(element => {

        // });

  // Object.keys(testData).forEach(function(key) {
    //     console.log(key, testData[key].ID);
    // });
var time = []

var count0 = 0;
var count12=0;
var count11=0;
var count10=0;
var count9=0;
var count7=0;
var count6 = 0;
var count5=0;
var count8=0;
var count4 = 0;
var count3 = 0;
var count2 = 0;
var count1=0;
var freq = []
for (var i = 0; i < list.length; i++){
    var row = list[i].Start_Time;
    if(row[12]=="0")
    {    time.push(0)
        count0++
    }
    if(row[12]=="1")
    {    time.push(1)
        count1++
    }
    if(row[12]=="2")
    {    time.push(2)
        count2++
    }
    if(row[12]=="3")
    {    time.push(3)
        count3++
    }
    if(row[12]=="4")
    {    time.push(4)
        count4++
    }
    if(row[12]=="7")
    {    time.push(7)
        count7++
    }

    if(row[12]=="6")
    {
        time.push(6)
        count6++
    }
    if(row[12]=="5" )
    {
        time.push(5)
        count5++
    }
    if(row[12]=="8" )
    {
        time.push(8)
        count8++
    }
    if(row[12]=="9")
    {    time.push(9)
        count9++
    }
    if(row[12]=="10")
    {    time.push(10)
        count10++
    }
    if(row[12]=="11")
    {    time.push(11)
        count11++
    }
    if(row[12]=="12")
    {    time.push(12)
        count12++
    }

}
var set = [...new Set(time)]
freq = [count0,count5,count6,count8]

    return (
        <div>

              <Plot
        data={[
          {
              //start times of accidents within the hour
            x: set,

            y: freq,
            type: 'bar',
            mode: 'none',
          },
        ]}
        layout={ {width: 500, height: 500, title: 'Time of Accidents'},

        {xaxis: 
            {
                title:
                {
                    text: 'AM----------------------------------------------------PM'
                },

        },
        yaxis: 
            {
                title:
                {
                    text: 'Number of Accidents'
                }

        }

        }



    }
      />

        </div>


    );
}

export default TimeChart;
