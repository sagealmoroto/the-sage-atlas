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

      // Optional: heading above each scrollable row
      const heading = document.createElement("h3");
      heading.textContent = broadLabel;
      wrapper.appendChild(heading);

      // Create scrollable row container
      const row = document.createElement("div");
      row.className = "card-row";
      wrapper.appendChild(row);

      // Loop through each category type in this group
      personalityTypes.forEach(type => {
        const cards = cardData[type];
        if (!cards) return;

        cards.forEach(card => {
          const cardDiv = document.createElement("div");
          const categoryClass = type.replace(/\s/g, ""); // e.g. "The Tourist" → "TheTourist"
          cardDiv.className = `card the${categoryClass}`;
          cardDiv.tabIndex = 0;

          // Inject card HTML content
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
              <p><strong>${card.country}</strong></p>
              <p>Language: ${card.primary_language || 'N/A'}</p>
              <p>Currency: ${card.currency || 'N/A'}</p>
              <p>Duration: ${card.recommended_duration || 'N/A'}</p>
            </div>
          `;

          // Flip on click
          cardDiv.addEventListener("click", () => {
            cardDiv.classList.toggle("flipped");
          });

          // Flip on keyboard (Enter or Space)
          cardDiv.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              cardDiv.classList.toggle("flipped");
            }
          });

          // Add card to row
          row.appendChild(cardDiv);
        });
      });

      // Add the full wrapper to the page
      cardContainer.appendChild(wrapper);
    });
  })
  .catch(error => {
    console.error("Error loading JSON:", error);

    // Optional fallback message if JSON fails
    const fallback = document.createElement("p");
    fallback.textContent = "Oops! We couldn’t load the destination cards.";
    fallback.style.textAlign = "center";
    fallback.style.marginTop = "40px";
    document.querySelector(".card-container").appendChild(fallback);
  });