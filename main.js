parser = new DOMParser();
document.getElementById('search').addEventListener("click", searchForXML);

document.getElementById('html').addEventListener("click", displayXMLInText);
document.getElementById('inTable').addEventListener("click", displayXMLInTable);


function getXML(country) {
  // This function performs a AJAX REQUEST for specific items that needs to be replaced or loaded in ONCE
  var xml;
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xml = this;
    }
  };
  xhttp.open("GET", "https://webservices-demo-finewebdev.c9users.io/api-countries.php?output=xml&id=" + country, false);
  xhttp.send();
  return(xml);
}
function searchForXML() {
  var countryID = getCountryNumber();

  var xml = getXML(countryID);

  console.log(xml.responseText);
  displayXML(xml.responseText);
}
function getCountryNumber() {
  return(document.getElementById('country_number').value);
}

function displayXML(xml) {
  document.getElementById('xmlDisplay').value = xml;
}


function convertStringToXML(xml) {
  xml = parser.parseFromString(xml,"text/xml");
  return(xml);
}
function displayXMLInText() {
  // Displays the XML as text
  var country_number = getCountryNumber();
  var xml = getXML(country_number);

  xml = convertStringToXML(xml.responseText);


  document.getElementById('result').innerHTML = "Country name: <b>" + xml.getElementsByTagName("name")[0].childNodes[0].nodeValue + "<b>";
}
function displayXMLInTable() {
  var table;
  var countryID = getCountryNumber();
  var xml = getXML(countryID);

  xml = convertStringToXML(xml.responseText);

  var idvalue = xml.getElementsByTagName("id");
  var namevalue = xml.getElementsByTagName("name");

  table = "<table>";
  table += "<tr><th>ID</th><th>Name</th></tr>";
  for (i = 0; i< idvalue.length; i++) {
    table += "<tr>"
    table += "<td>" + idvalue[i].childNodes[0].nodeValue + "</td>";
    table += "<td>" + namevalue[i].childNodes[0].nodeValue + "</td>";
    table += "</tr>"
  }

  document.getElementById('result').innerHTML = table;
}
