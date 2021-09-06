// selecteren van alle items op de pagina
const searchForm = document.querySelector(".form");
const searchButton = document.querySelector(".form button");
const searchInput = document.querySelector(".form input");

let landContainer = document.querySelector(".land-container");
let landHeader = document.querySelector(".line-header");
let landList = document.querySelector(".line-content");

// aanmaken van DOM elementen
let landImg = document.createElement("img");
let landH2 = document.createElement("h2");
let firstline = document.createElement("li");
let secondline = document.createElement("li");
let thirdline = document.createElement("li");

// Functie om de data uit de API te halen
// prettier-ignore
const fetchData = async function (search) {
  try {
    const result = await axios.get(`https://restcountries.eu/rest/v2/name/${search}`);
    return result;

  } catch (e) {
    cleanElements();
    console.log("ERROR");
    alert("ERROR, CAN'T FIND ANY RESULTS");
    console.error(e);
  }
};

// Functie voor het printen van meerdere talen
// prettier-ignore
const printLanguage = function (languages) {
  
  const firstLanguages = languages
    .map((e) => e.name)
    .slice(0, -1)
    .join(", ");

  const lastLangauge = languages
  .map((e) => e.name)
  .slice(-1);

  if (languages.length > 1) {
    return `They speak ${firstLanguages} and ${lastLangauge}`;
  } else {
    return `They speak ${lastLangauge}`;
  }
};

//Functie voor het deleten van DOM elementen
const cleanElements = function () {
  landContainer.removeAttribute("class", "land-container");
  landHeader.removeAttribute("class", "line-header");
  landList.removeAttribute("class", "line-content");
  landImg.src = "";
  landH2.textContent = "";
  firstline.textContent = "";
  secondline.textContent = "";
  thirdline.textContent = "";
};

// Functie voor het zetten van classes
const setClasses = function () {
  landContainer.setAttribute("class", "land-container");
  landHeader.setAttribute("class", "line-header");
  landList.setAttribute("class", "line-content");
};

//Functie print alle data uit (main functie) prettier-ignore
// prettier-ignore
const printData = async function (search) {
  const result = await fetchData(search);

  //toevoegen van de vlag
  landImg.src = result.data[0].flag;
  landHeader.append(landImg);

  //toevoegen van het land
  landH2.append(result.data[0].name);
  landHeader.append(landH2);

  // eerste string wordt toegevoegd
  firstline.append(
    `${result.data[0].name} is situated in ${result.data[0].subregion}. It has a population of ${result.data[0].population.toLocaleString("nl-NL")} people`
  );
  landList.append(firstline);

  // tweede string wordt toegevoegd. 2 verschillende strings wanneer er 1 of 2 currencies aanwezig zijn in een land 
  if (result.data[0].currencies.length > 1) {
    secondline.append(
      `The capital is ${result.data[0].capital} and you can pay with ${result.data[0].currencies[0].name}'s and ${result.data.currencies[1].name}`
    );
    landList.append(secondline);
  } else {
    secondline.append(
      `The capital is ${result.data[0].capital} and you can pay with ${result.data[0].currencies[0].name}'s`
    );
    landList.append(secondline);
  }

  // Derde string wordt toegevoegd met behulp vna de printLanguage functie
  thirdline.append(printLanguage(result.data[0].languages));
  landList.append(thirdline);
};

//submitten van form cleaned the DOM en voert de functie uit om data uit te printen
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  cleanElements();
  setClasses();
  printData(searchInput.value);
  searchInput.value = "";
});
