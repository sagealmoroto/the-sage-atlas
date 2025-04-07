fetch('cardData.json')
  .then(response => response.json())
  .then(cardData => {
    const categoryDetails = {
      "The Tourist": ["top_attractions", "most_popular_cities"],
      "The Foodie": ["signature_dishes", "food_experiences", "beverages"],
      "The Culture-Seeker": ["historical_landmarks", "local_traditions", "museums_and_arts"],
      "The Relaxer": ["top_relaxation_spots", "activities"],
      "The Adventurer": ["popular_destinations", "activities"],
      "The Explorer": ["popular_destinations", "activities"],
      "The Partier": ["party_cities", "nightlife_experiences", "alcoholic_drinks"],
      "The Photographer": ["photo_spots", "lighting_tips", "gear_recommendations"],
      "The Naturalist": ["natural_wonders", "eco_tours", "wildlife_encounters"],
      "The Wellness Devotee": ["spa_destinations", "wellness_practices", "retreats"]
    };

    const broadCategories = {
      "The Classics": ["The Tourist", "The Foodie", "The Culture-Seeker"],
      "The Bold": ["The Adventurer", "The Explorer", "The Partier"],
      "The Rechargers": ["The Relaxer", "The Wellness Devotee"],
      "The Viewfinders": ["The Naturalist", "The Photographer"]
    };

    const cardContainer = document.querySelector(".card-container");

    Object.entries(broadCategories).forEach(([broadLabel, personalityTypes]) => {
      const wrapper = document.createElement("div");
      wrapper.className = "card-row-wrapper";

      const heading = document.createElement("h3");
      heading.textContent = broadLabel;
      wrapper.appendChild(heading);

      const row = document.createElement("div");
      row.className = "card-row";
      wrapper.appendChild(row);

      personalityTypes.forEach(type => {
        const cards = cardData[type];
        if (!cards) return;

        cards.forEach(card => {
          const categoryClass = type.replace(/\s/g, "");
          const cardDiv = document.createElement("div");
          cardDiv.className = `card ${categoryClass}`; // ✅ fixed!
          cardDiv.tabIndex = 0;

          // ✍️ Build back content
          let backHTML = `
          <div class="card-back">
            <p><strong>${card.country}</strong></p>
        `;
        
        const fields = categoryDetails[card.category];
        if (fields) {
          fields.forEach(field => {
            const label = field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        
            if (Array.isArray(card[field])) {
              backHTML += `<div class="label-list"><strong>${label}:</strong><ul>`;
              card[field].forEach(item => {
                backHTML += `<li>${item}</li>`;
              });
              backHTML += `</ul></div>`;
            } else if (card[field]) {
              backHTML += `<p><strong>${label}:</strong> ${card[field]}</p>`;
            }
          });
        }

          backHTML += `</div>`;

          // 🧱 Build the full card
          cardDiv.innerHTML = `
            <div class="card-front">
              <img src="${card.image}" alt="${card.country} - ${type}" loading="lazy">
              <div class="card-text">
                <div class="category-dot"></div>
                <div>
                  <h4>${card.country}</h4>
                  <h4>${type}</h4>
                </div>
              </div>
            </div>
            ${backHTML}
          `;

          // 🔁 Flip on click
          cardDiv.addEventListener("click", () => {
            cardDiv.classList.toggle("flipped");
          });

          // 🔁 Flip on keyboard
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
  .catch(error => {
    console.error("Error loading JSON:", error);
    const fallback = document.createElement("p");
    fallback.textContent = "Oops! We couldn’t load the destination cards.";
    fallback.style.textAlign = "center";
    fallback.style.marginTop = "40px";
    document.querySelector(".card-container").appendChild(fallback);
  });