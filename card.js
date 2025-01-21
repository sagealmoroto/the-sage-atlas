fetch('cardData.json')
  .then(response => response.json())
  .then(cardData => {
    // Map each category to its container
    const categoryContainers = {
      "The Tourist": ".tourist-container",
      "The Foodie": ".foodie-container",
      "The Culture-Seeker": ".culture-container",
      "The Partier": ".partier-container",
      "The Adventurer": ".adventurer-container",
      "The Explorer": ".explorer-container",
      "The Relaxer": ".relaxer-container",
      "The Wellness Devotee": ".wellness-container",
      "The Photographer": ".photographer-container",
      "The Naturalist": ".naturalist-container"
    };

    // Loop through each category in the JSON
    Object.keys(cardData).forEach(category => {
      const cards = cardData[category]; // Array of cards for this category
      const containerSelector = categoryContainers[category];
      const container = document.querySelector(containerSelector);

      if (container) {
        cards.forEach(card => {
          const cardDiv = document.createElement("div");
          cardDiv.className = "card";
          cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.country} - ${category}">
            <h4>${card.country}</h4>
            ${category === "The Tourist" ? `<p>Recommended Duration: ${card.recommended_duration}</p>` : ""}
            <p>${category === "The Tourist" ? "Top Attractions: " + card.top_attractions.join(", ") : ""}</p>
          `;
          container.appendChild(cardDiv);
        });
      }
    });
  })
  .catch(error => console.error("Error loading JSON:", error));

  document.querySelector('.card-container').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
      card.classList.toggle('flip');
    }
  });

//     // and give it some content
//     const newImg = document.createElement("img");
//     newImg.setAttribute('src', currCard.imgSrc);
//     newImg.setAttribute('alt', 'oops');
//     newImg.style.width = '300px';
//     newImg.style.height = '400px';

//     // add the img node to the newly created div
//     cardDiv.appendChild(newImg);

//     // and give it some more content
//     const newCountry = document.createElement("h4");
//     newCountry.textContent = currCard.country;
//     cardDiv.appendChild(newCountry);

//     // add the newly created card to card container
//     cardContainer.appendChild(cardDiv);
// });


