fetch('cardData.json')
  .then(response => response.json())
  .then(cardData => {
    const broadCategories = {
      "The Classics": ["The Tourist", "The Foodie", "The Culture-Seeker"],
      "The Bold": ["The Adventurer", "The Explorer", "The Partier"],
      "The Rechargers": ["The Relaxer", "The Wellness Devotee"],
      "The Viewfinders": ["The Naturalist", "The Photographer"]
    };

    const cardContainer = document.querySelector(".card-container");

    Object.entries(broadCategories).forEach(([broadLabel, personalityTypes]) => {
      // Create a wrapper per broad category
      const wrapper = document.createElement("div");
      wrapper.className = "card-row-wrapper";

      // Add heading for the broad category
      const heading = document.createElement("h3");
      heading.textContent = broadLabel;
      wrapper.appendChild(heading);

      // Create the scrollable row
      const row = document.createElement("div");
      row.className = "card-row";
      wrapper.appendChild(row);

      // Loop through each vacation personality type in this group
      personalityTypes.forEach(type => {
        const cards = cardData[type];
        if (!cards) return;

        cards.forEach(card => {
          const cardDiv = document.createElement("div");
          const categoryClass = type.replace(/\s/g, ""); // remove spaces for class naming
          cardDiv.className = `card the${categoryClass}`;
          cardDiv.tabIndex = 0;

          // Determine the back content based on personality type
          let backContent = "";
          switch (type) {
            case "The Tourist":
              backContent = `
                <p><strong>Top Attractions:</strong> ${card.top_attractions ? card.top_attractions.join(', ') : 'N/A'}</p>
                <p><strong>Tipping:</strong> ${card.tipping_etiquette || 'N/A'}</p>
                <p><strong>Duration:</strong> ${card.recommended_duration || 'N/A'}</p>
              `;
              break;
            case "The Foodie":
              backContent = `
                <p><strong>Signature Dishes:</strong> ${card.signature_dishes ? card.signature_dishes.join(', ') : 'N/A'}</p>
                <p><strong>Food Experiences:</strong> ${card.food_experiences ? card.food_experiences.join(', ') : 'N/A'}</p>
                <p><strong>Beverages:</strong> ${card.beverages ? card.beverages.join(', ') : 'N/A'}</p>
              `;
              break;
            case "The Culture-Seeker":
              backContent = `
                <p><strong>Historical Landmarks:</strong> ${card.historical_landmarks ? card.historical_landmarks.join(', ') : 'N/A'}</p>
                <p><strong>Local Traditions:</strong> ${card.local_traditions ? card.local_traditions.join(', ') : 'N/A'}</p>
                <p><strong>Museums & Arts:</strong> ${card.museums_and_arts ? card.museums_and_arts.join(', ') : 'N/A'}</p>
              `;
              break;
            case "The Relaxer":
              backContent = `
                <p><strong>Relaxation Spots:</strong> ${card.top_relaxation_spots ? card.top_relaxation_spots.join(', ') : 'N/A'}</p>
                <p><strong>Activities:</strong> ${card.activities ? card.activities.join(', ') : 'N/A'}</p>
              `;
              break;
            case "The Wellness Devotee":
              // Adjust the fields based on your JSON structure for Wellness Devotee
              backContent = `
                <p><strong>Wellness Focus:</strong> ${card.wellness_focus || 'N/A'}</p>
              `;
              break;
            case "The Adventurer":
              backContent = `
                <p><strong>Popular Destinations:</strong> ${card.popular_destinations ? card.popular_destinations.join(', ') : 'N/A'}</p>
                <p><strong>Activities:</strong> ${card.activities ? card.activities.join(', ') : 'N/A'}</p>
              `;
              break;
            case "The Explorer":
              // Customize fields as needed for The Explorer
              backContent = `
                <p><strong>Destinations:</strong> ${card.destinations ? card.destinations.join(', ') : 'N/A'}</p>
              `;
              break;
            case "The Partier":
              // Customize fields as needed for The Partier
              backContent = `
                <p><strong>Nightlife Spots:</strong> ${card.nightlife ? card.nightlife.join(', ') : 'N/A'}</p>
              `;
              break;
            case "The Naturalist":
              backContent = `
                <p><strong>Parks & Wildlife:</strong> ${card.parks ? card.parks.join(', ') : 'N/A'}</p>
              `;
              break;
            case "The Photographer":
              backContent = `
                <p><strong>Photo Opportunities:</strong> ${card.photo_opportunities ? card.photo_opportunities.join(', ') : 'N/A'}</p>
              `;
              break;
            default:
              backContent = `<p>Additional info here</p>`;
          }

          // Set up the inner HTML with a front and back for the flip effect
          cardDiv.innerHTML = `
            <div class="card-front">
              <img src="${card.image}" alt="${card.country} - ${type}" loading="lazy">
              <div class="card-text">
                <div class="category-dot the${categoryClass}"></div>
                <div>
                  <h4>${card.country}</h4>
                  <h4>${type}</h4>
                </div>
              </div>
            </div>
            <div class="card-back">
              ${backContent}
            </div>
          `;

          // Add click and keyboard events to flip the card
          cardDiv.addEventListener("click", () => {
            cardDiv.classList.toggle("flipped");
          });
          cardDiv.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              cardDiv.classList.toggle("flipped");
            }
          });

          row.appendChild(cardDiv);
        });
      });

      cardContainer.appendChild(wrapper);
    });
  })
  .catch(error => console.error("Error loading JSON:", error));
