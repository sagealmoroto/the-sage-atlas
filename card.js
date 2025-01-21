fetch('cardData.json')
  .then(response => response.json())
  .then(cardData => {
    Object.keys(cardData).forEach(category => {
      const container = document.querySelector(`.${category.replace(/\s/g, '-').toLowerCase()}-container`);
      if (container) {
        cardData[category].forEach(card => {
          const cardDiv = document.createElement('div');
          cardDiv.className = `card the${category.replace(/\s/g, '')}`; // Add category-specific class

          cardDiv.innerHTML = `
            <div class="card-front">
              <img src="${card.image || 'default-image.jpg'}" alt="${card.country || 'Unknown'} - ${category}">
              <h4>${card.category || category}</h4>
            </div>
            <div class="card-back">
              <p>${card.country || 'Unknown Country'}</p>
              <p>${card.backInfo ? card.backInfo.description : 'No details available.'}</p>
            </div>
          `;

          // Add click event to flip the card
          cardDiv.addEventListener('click', () => {
            cardDiv.classList.toggle('flipped');
          });
          
          // Add keyboard accessibility for flipping the card
          cardDiv.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault(); // Prevent scrolling when Space is pressed
              cardDiv.classList.toggle('flipped');
            }
          });

          container.appendChild(cardDiv);
        });
      }
    });
  })
  .catch(error => console.error("Error loading JSON:", error));


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

    // "The Tourist": ".tourist-container",
    //   "The Foodie": ".foodie-container",
    //   "The Culture-Seeker": ".culture-container",
    //   "The Partier": ".partier-container",
    //   "The Adventurer": ".adventurer-container",
    //   "The Explorer": ".explorer-container",
    //   "The Relaxer": ".relaxer-container",
    //   "The Wellness Devotee": ".wellness-container",
    //   "The Photographer": ".photographer-container",
    //   "The Naturalist": ".naturalist-container"