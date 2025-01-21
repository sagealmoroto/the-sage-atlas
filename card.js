// Fetch and load card data from the JSON file
fetch('cardData.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(cardData => {
    console.log("Card data loaded:", cardData); // Debugging

    // Map each category to its container
    const cardContainer = document.querySelector('.card-container');

    // Loop through each category in the JSON
    Object.keys(cardData).forEach(category => {
      const cards = cardData[category]; // Array of cards for this category

      cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className = `card ${category.replace(/\s+/g, '-').toLowerCase()}`; // Add category class
        cardDiv.innerHTML = `
          <div class="card-front">
            <img src="${card.image}" alt="${card.country} - ${category}">
            <h4>${card.country}</h4>
            <p>${category}</p>
          </div>
          <div class="card-back">
            <h4>${card.country}</h4>
            ${Object.keys(card).map(key => {
              if (key !== 'country' && key !== 'image') {
                return `<p><strong>${key.replace(/_/g, ' ')}:</strong> ${Array.isArray(card[key]) ? card[key].join(', ') : card[key]}</p>`;
              }
              return '';
            }).join('')}
          </div>
        `;
        cardContainer.appendChild(cardDiv);
      });
    });

    // Add click event listener for card flip
    cardContainer.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (card) {
        card.classList.toggle('flip');
      }
    });
  })
  .catch(error => console.error("Error loading JSON:", error));
