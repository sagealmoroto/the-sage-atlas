// ------------------------------
// 📚 DATA STRUCTURE
// ------------------------------

const questionBank = {
    "The Tourist": [
      "When I travel, I usually start by looking up the top-rated attractions or must-see spots.",
      "I’d rather visit a place that’s well-known and popular than one I’ve never heard of.",
      "I find satisfaction in seeing iconic landmarks in person — even if they’re crowded.",
      "I get excited checking famous sights off my travel list.",
      "It’s important to me to see what a destination is known for.",
      "I prefer having a set itinerary with major stops planned in advance."
    ],
    "The Culture-Seeker": [
      "I’m most excited to experience a place through its traditions, language, or rituals.",
      "I often skip the most touristy sites in favor of something more local or cultural.",
      "I’d love to take a class or workshop during a trip — even if it’s outside my comfort zone.",
      "I’m curious about how people live, worship, or celebrate in different places.",
      "I often look for experiences that teach me something about local traditions.",
      "A quiet, culturally rich moment feels more rewarding than a crowded attraction."
    ],
    "The Foodie": [
      "I like planning where to eat just as much as planning what to see or do.",
      "Trying new foods is one of the best parts of traveling.",
      "A visit to a local market or food tour sounds more fun to me than a visit to a museum.",
      "I try to find out what a place is known for food-wise before I visit.",
      "One of my favorite parts of travel is discovering new flavors or cooking styles.",
      "I love when a meal tells a story about the people who made it."
    ],
    "The Adventurer": [
      "I enjoy doing things that challenge me physically when I travel.",
      "I’d choose an activity like rafting or zip-lining over a city tour.",
      "The best experiences are the ones that get your heart pumping.",
      "I enjoy travel that gets me out of my physical comfort zone.",
      "If a destination has an exciting outdoor activity, I’m probably interested.",
      "For me, adventure is about doing something I’ve never done before."
    ],
    "The Explorer": [
      "I’m drawn to places that feel unfamiliar or lesser-known.",
      "The journey itself is often just as important to me as the destination.",
      "I prefer destinations that feel untouched or not designed for tourists.",
      "I’d rather explore a lesser-known place than a popular tourist city.",
      "I’m curious about the deeper stories behind places and people.",
      "I often travel to learn or experience something completely new to me."
    ],
    "The Partier": [
      "The nightlife of a place plays a big role in where I want to go.",
      "I enjoy events, festivals, or celebrations when I travel.",
      "A great trip should include a few late nights and lively crowds.",
      "I’m always down for a good party when I’m in a new place.",
      "I travel partly for the energy — music, dancing, social life.",
      "Fun for me often starts when the sun goes down."
    ],
    "The Relaxer": [
      "I enjoy having nothing planned and just going with the flow.",
      "My ideal vacation includes long naps, beautiful views, and minimal effort.",
      "I often choose destinations based on how calming or scenic they are.",
      "The idea of doing *nothing* on vacation sounds amazing to me.",
      "A calm, peaceful setting matters more to me than what’s on the itinerary.",
      "When I travel, I want to rest and recover from daily life."
    ],
    "The Wellness Devotee": [
      "I’m interested in travel experiences that help me grow or reset.",
      "I’d consider going on a retreat focused on mindfulness, health, or spiritual healing.",
      "I travel to feel more balanced — mentally, emotionally, or physically.",
      "Travel gives me space to take better care of myself.",
      "I’d rather come back from a trip feeling renewed than busy.",
      "I’m interested in the spiritual or healing traditions of other cultures."
    ],
    "The Photographer": [
      "When I travel, I’m always on the lookout for beautiful or unique photo opportunities.",
      "I tend to notice color, light, and texture more than most people.",
      "I often choose destinations based on how visually inspiring they are.",
      "I notice details — light, color, symmetry — that others might miss.",
      "I take travel photos to remember how a place *felt*, not just how it looked.",
      "Visual beauty is a big part of why I choose certain destinations."
    ],
    "The Naturalist": [
      "I feel most connected when I’m surrounded by nature.",
      "I prefer quiet, scenic destinations to busy urban areas.",
      "Wildlife, landscapes, or natural wonders play a big role in my dream trips.",
      "I feel more at peace in nature than in a city.",
      "I care about how travel impacts the environment.",
      "I often choose places where I can be close to wildlife or untouched landscapes."
    ]
  };
  
  const distractorQuestions = [
    "I like keeping a travel journal or scrapbook.",
    "I prefer traveling with a group over going solo.",
    "I often research practical things like local etiquette before a trip.",
    "I pack light so I can be spontaneous.",
    "I plan trips around the best times for weather or pricing.",
    "I follow travel influencers or bloggers for inspiration.",
    "I usually bring back something symbolic from my trip.",
    "I’m more excited about the journey than the destination.",
    "I prefer small towns over major cities.",
    "I usually have a go-to travel companion.",
    "I often book experiences ahead of time.",
    "I keep track of every country or city I’ve visited.",
    "I like sharing trip photos or stories with friends.",
    "I get overwhelmed by overplanning.",
    "I sometimes pick a place just because the name sounds cool."
  ];
  
  // ------------------------------
  // 🎲 UTILITY FUNCTIONS
  // ------------------------------
  
  function getRandomSubset(array, n) {
    const copy = [...array];
    const result = [];
    while (result.length < n && copy.length > 0) {
      const index = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(index, 1)[0]);
    }
    return result;
  }
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // ------------------------------
  // 🧠 QUIZ LOGIC
  // ------------------------------
  
  function buildQuiz(mode) {
    const quiz = [];
  
    Object.entries(questionBank).forEach(([type, questions]) => {
      if (mode === "quick") {
        const subset = getRandomSubset(questions, 3);
        subset.forEach(q => quiz.push({ text: q, type }));
      } else if (mode === "full") {
        questions.forEach(q => quiz.push({ text: q, type }));
      }
    });
  
    if (mode === "full") {
      const extras = getRandomSubset(distractorQuestions, 15);
      extras.forEach(q => quiz.push({ text: q, type: "distractor" }));
    }
  
    return shuffle(quiz);
  }
  
  // ------------------------------
  // 🚀 RENDER QUIZ ON SCREEN
  // ------------------------------
  
  function startQuiz(mode) {
    const intro = document.querySelector(".quiz-intro");
    const questionsContainer = document.getElementById("quiz-questions");
  
    intro.style.display = "none";
    questionsContainer.style.display = "block";
  
    const quiz = buildQuiz(mode);
    renderQuiz(quiz);
  }
  
  function renderQuiz(questions) {
    const container = document.getElementById("quiz-questions");
    container.innerHTML = "";
  
    questions.forEach((q, i) => {
      const qDiv = document.createElement("div");
      qDiv.className = "quiz-question";
      qDiv.innerHTML = `
        <p><strong>Q${i + 1}</strong>: ${q.text}</p>
        <div class="quiz-options">
          <button data-type="${q.type}">Strongly Disagree</button>
          <button data-type="${q.type}">Disagree</button>
          <button data-type="${q.type}">Neutral</button>
          <button data-type="${q.type}">Agree</button>
          <button data-type="${q.type}">Strongly Agree</button>
        </div>
      `;
      container.appendChild(qDiv);
    });
  }
  
  // ------------------------------
  // 🧭 TOGGLE COLLAPSE
  // ------------------------------
  
  function toggleQuiz() {
    const section = document.getElementById("quiz-hero");
    section.classList.toggle("quiz-collapsed");
    section.classList.toggle("quiz-expanded");
  }