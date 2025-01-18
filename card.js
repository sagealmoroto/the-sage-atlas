const cardData = [
    { className: "theTourist", title: "The Tourist" },
    // { className: "theFoodie", title: "The Foodie" },
    // { className: "theCultured", title: "The Cultured" },
    // { className: "thePartier", title: "The Partier" },
    // { className: "theAdventurer", title: "The Adventurer" },
    // { className: "theExplorer", title: "The Explorer" },
    // { className: "theRelaxer", title: "The Relaxer" },
    // { className: "theWell", title: "The Wellness Devotee" },
    // { className: "thePhotographer", title: "The Photographer" },
    // { className: "theNaturalist", title: "The Naturalist" },
  ];

const touristCards = [
    {
        id: 1,
        country: 'US',
        lang: 'en',
        currency: 'usd',
        tipping: '15-20%',
        popularCities: 'blahg',
        imgSrc: 'assets/statueofliberty.jpg'
    },
]






const currCard = {
    id: 1,
    country: 'US',
    lang: 'en',
    currency: 'usd',
    tipping: '15-20%',
    popularCities: 'blahg',
    imgSrc: 'assets/statueofliberty.jpg'
};

const cardContainer = document.querySelectorAll(".card-container");

// create a new div element
const newDiv = document.createElement("div");

// and give it some content
const newImg = document.createElement("img");
newImg.setAttribute('src', currCard.imgSrc);
newImg.setAttribute('alt', 'oops');
newImg.style.width = '300px';
newImg.style.height = '400px';

// add the img node to the newly created div
newDiv.appendChild(newImg);


// repeat for other shit
const newCountry = document.createElement("h4");
newCountry.text = currCard.country;
newDiv.appendChild(newCountry);

// add the newly created card to card container hopefully fingers crossed
cardContainer.append(newDiv);