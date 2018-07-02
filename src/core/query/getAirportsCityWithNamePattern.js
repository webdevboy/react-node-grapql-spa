import queryAirportsCityWithNamePattern from './queryAirportsCityWithNamePattern.graphql';

export default function searchCityNameFromText(inputText, client) {

  if (inputText && client) {
    // Convert the input to lower case for case insensitive search
    var lowerCaseInput = inputText.toLowerCase();
    // Make %word% for database search
    var name = lowerCaseInput.split(/[ ,]+/).map(val => '%' + val + '%');

    return new Promise((resolve, reject) => {
       client
      .query({
        query: queryAirportsCityWithNamePattern,
          variables: {
          name
        },
      })
      .then(({ data }) => {
        const airports = data.airports;
        var cityName = false;
        var bestMatch = 0;
        // Split the inputText into words
        var splitName = lowerCaseInput.split(/[ ,]+/);

        // For each airport, get the airport whose name contains most of the words
        // of the input text
        airports.map(airport => {
          var numberOfMatch = 0 ;
          var airportName = airport.full_name.toLowerCase();
          var airportIata = airport.iata.toLowerCase();
          var airportIcao = airport.icao.toLowerCase();

          // Get score with name
          splitName.forEach(function(word) {
            if (airportName.includes(word)) {
              numberOfMatch++;
            }
          });

          // Get score with iata code
          splitName.forEach(function(word) {
            if (airportIata.includes(word)) {
              numberOfMatch++;
            }
          });

          // Get score with icao
          splitName.forEach(function(word) {
            if (airportIcao.includes(word)) {
              numberOfMatch++;
            }
          });

          // Keep the best matched result
          if (bestMatch < numberOfMatch) {
            cityName = airport.city.name;
            bestMatch = numberOfMatch;
          }
          // If there is another airport with the same score
          // Invalidate the cityName
          else if (bestMatch === numberOfMatch) {
            cityName = false;
          }
        })

        resolve(cityName);
      });
    });
  } else {
    return '';
  }


};