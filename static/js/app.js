// select the table body
var tbody = d3.select("tbody");

// go through each entry in the data.js and append it to a table
data.forEach((siteReport) => {
  // add a new row to the table for each entry & use Object.entries and forEach to get the key and value for each entry
  var row = tbody.append("tr");
   Object.entries(siteReport).forEach(([key, value]) => {
    // add a new td for each value with the value from Object.entries
    var cell = tbody.append("td");
    cell.text(value);
  });
});

// create a filter for datetime
// first select the filter button btn and the input field
var button = d3.select("#filter-btn");

var inputField = d3.select("#datetime");
// when the button is clicked: prevent the page from refreshing, clear out the default list, create a variable for the value that was input
button.on("click", function() {
  d3.event.preventDefault();
  d3.select("tbody").text("");
  var inputValue = inputField.property("value");


  // Create a filtering function for that date then check for matching
  function selectRequested(date) {
    return date.datetime === inputValue;
  }

  // create a new variable using the filter as an argument
  var requested = data.filter(selectRequested);
  if (requested.length === 0){
    var row = tbody.append("tr");
    var cell = tbody.append("td");
    cell.text("Date format should be D/M/YYYY.  There may have been no recorded activity on that date.")
  }

  else{
  //  use the new variable to go through each of the filterd entries
    requested.forEach((siteReport) => {
      // add a new row to the table for each entry
      var row = tbody.append("tr");
      // use Object.entries and forEach to get the key and value for each entry
      Object.entries(siteReport).forEach(([key, value]) => {
        // add a new td for each value with the value from Object.entries
        var cell = tbody.append("td");
        cell.text(value);
      });
    });
  }
});