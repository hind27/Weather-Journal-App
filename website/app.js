/* Global Variables */


// Personal API Key for OpenWeatherMap API
const baseURL ='https://api.openweathermap.org/data/2.5/weather?zip=';
//const apikey ="92bb3f8e5ec17d26337fd34724d2f94f";
const apiKey = ',us&appid=92bb3f8e5ec17d26337fd34724d2f94f&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Function called by event listener */
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;
   // get the API data
   getApiData(baseURL, zip, apiKey)
   .then(function (data) {
       postData('/add', {temperature: data.main.temp, date: newDate, user_response: feelings });
    })
    .then(
        updateUI()
      )
 
}



/* Function to GET Web API Data*/
const getApiData = async (baseURL, zip, key) => {
    const response = await fetch(baseURL + zip + key);
    console.log(response);
    try {
        const webData = await response.json();
        console.log(webData);
        return webData
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */

const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    return allData
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    console.log(JSON.parse(JSON.stringify(response)))

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

/* Update UI */
const updateUI = async () => {
    console.log("iiiir")

    const request = await fetch('/all')

    try{
        const allData = await request.json()
    
        document.getElementById('date').innerHTML = 'Date: ' + allData.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + allData.temperature;
        document.getElementById('content').innerHTML = 'Feelings: ' + allData.user_response;
    }catch(error){
        console.log("error",error)
    }
}