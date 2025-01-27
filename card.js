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
            <h4>${card.category}</h4>
          `;

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