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

      // Add heading
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
          const categoryClass = type.replace(/\s/g, ""); // remove spaces
          cardDiv.className = `card the${categoryClass}`;
          cardDiv.tabIndex = 0;

          // Card inner HTML
          cardDiv.innerHTML = `
            <div class="card-front">
              <img src="${card.image}" alt="${card.country} - ${type}" loading="lazy">
              <div class="card-text">
                <h4>${card.country}</h4>
                <h4>${type}</h4>
              </div>
            </div>
            <div class="card-back">
              <p>${card.country}</p>
              <p>Additional info here</p>
            </div>
          `;

          // Flip on click
          cardDiv.addEventListener("click", () => {
            cardDiv.classList.toggle("flipped");
          });

          // Flip with keyboard
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
