"use strict";

// API key for OpenWeatherMap
const APIkey = '82c61959d1956421836bdcd40192306a';

// DOM element references
const container = document.querySelector('.container');
const search = document.querySelector('.search');
const display1 = document.querySelector('#display1');
const display2 = document.querySelector('#display2');
const display3 = document.querySelector('#display3');

// Event listener for the search button
search.addEventListener('click', async () => {
    // Get the city input value
    const city = document.querySelector('.search input').value;

    // Check if the input is not empty
    if (city !== '') {
        try {
            // Fetch weather data from OpenWeatherMap API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('City not found. Please enter a valid city name.');
            }

            // Parse the JSON response
            const json = await response.json();

            // Show Display 1 and hide Display 2 and Display 3
            showDisplayOne();

            // Extract relevant data from the JSON response
            const image = document.querySelector('#display1 img');
            const temperature = document.querySelector('#display1 .temperature span');
            const temperatureValue = +json.main.temp;
            const moreInfo = document.querySelector('#display1 .more-info');
            const humidity = document.querySelector('#display2 .humidity span');
            const windSpeed = document.querySelector('#display3 .windspeed span');

            // Mapping weather conditions to image file names
            const weatherImageNames = {
                'Clear': 'sunny',
                'Rain': 'rain',
                'Snow': 'snow',
                'Clouds': 'cloudy',
                'Mist': 'misty',
                'Haze': 'misty',
                'default': 'cloudy'
            };

            // Set the weather icon based on the weather condition
            const weatherCondition = json.weather[0].main;
            const imageName = weatherImageNames[weatherCondition] || weatherImageNames['default'];
            const imagePath = `Images/${imageName}.png`;
            setDisplayOneImage(imagePath);

            // Update Display 1 content
            temperature.textContent = `${temperatureValue.toFixed(0)}°C`;
            moreInfo.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            windSpeed.textContent = `${json.wind.speed} m/s`;

            // Function to set the image source for Display 1
            function setDisplayOneImage(imagePath) {
                image.src = imagePath;
            }
        } catch (error) {
            // Handle errors
            console.error('Error fetching weather data:', error);
            alert(error.message); // Display an alert with the error message
        }
    } else {
        // Alert user to enter a city name if input is empty
        alert('Please enter a city name.');
    }
});

// Function to show Display 1 and hide Display 2 and Display 3
function showDisplayOne() {
    display1.classList.remove('hide');
    display2.classList.add('hide');
    display3.classList.add('hide');
}

// Function to show Display 2 and hide Display 1 and Display 3
function showDisplayTwo() {
    display1.classList.add('hide');
    display2.classList.remove('hide');
    display3.classList.add('hide');
}

// Function to show Display 3 and hide Display 1 and Display 2
function showDisplayThree() {
    display1.classList.add('hide');
    display2.classList.add('hide');
    display3.classList.remove('hide');
}







/*

1. **API Key and DOM Element References:**
   - `APIkey` stores the key for accessing the OpenWeatherMap API.
   - `document.querySelector()` is used to get references to various HTML elements.

2. **Event Listener for Search Button:**
   - An event listener is attached to the search button, triggering an asynchronous function when the button is clicked.

3. **Fetching Weather Data:**
   - The code uses the `fetch` function to request weather data from OpenWeatherMap based on the city entered by the user.
   - If the response is not successful (HTTP status not OK), an error is thrown.

4. **Displaying Weather Information:**
   - Upon a successful fetch, the JSON response is parsed.
   - Weather information is displayed on the page using different HTML elements, and images are set based on the weather condition.

5. **Functions to Show/Hide Displays:**
   - Three functions (`showDisplayOne`, `showDisplayTwo`, and `showDisplayThree`) control the visibility of display sections by adding or removing the "hide" class.

6. **Example Scenario:**
   - A user enters a city in the search input and clicks the search button.
   - The script fetches weather data for that city from OpenWeatherMap.
   - Display 1 (`#display1`) is shown, presenting the basic weather information like temperature, weather description, humidity, and wind speed.
   - The weather condition determines the displayed image (e.g., cloudy, rainy, sunny).
   - The user can navigate between different displays using "See More" and "Go Back" buttons.

*/
