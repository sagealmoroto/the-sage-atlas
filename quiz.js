// Toggle the quiz open/collapsed
function toggleQuiz() {
    const section = document.getElementById("quiz-hero");
    section.classList.toggle("quiz-collapsed");
    section.classList.toggle("quiz-expanded");
  }
  
  // Starts quiz based on selected mode (quick/full)
  function startQuiz(mode) {
    const intro = document.querySelector(".quiz-intro");
    const questionsContainer = document.getElementById("quiz-questions");
  
    // Fade out intro section
    intro.style.display = "none";
    questionsContainer.style.display = "block";
  
    loadQuizQuestions(mode);
  }
  
  // Example placeholder quiz loader
  function loadQuizQuestions(mode) {
    // Replace this with your actual bank later
    const demoQuestions = mode === "quick"
      ? [
          "When I travel, I usually start by looking up the top-rated attractions or must-see spots.",
          "Trying new foods is one of the best parts of traveling.",
          "I enjoy doing things that challenge me physically when I travel."
        ]
      : [
          "I’d rather visit a place that’s well-known and popular than one I’ve never heard of.",
          "A calm, peaceful setting matters more to me than what’s on the itinerary.",
          "Travel gives me space to take better care of myself.",
          "The nightlife of a place plays a big role in where I want to go.",
          "I travel to feel more balanced — mentally, emotionally, or physically."
        ];
  
    const container = document.getElementById("quiz-questions");
    container.innerHTML = ""; // Clear old content
  
    demoQuestions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "quiz-question";
      questionDiv.innerHTML = `
        <p><strong>Q${index + 1}</strong>: ${question}</p>
        <div class="quiz-options">
          <button>Strongly Disagree</button>
          <button>Disagree</button>
          <button>Neutral</button>
          <button>Agree</button>
          <button>Strongly Agree</button>
        </div>
      `;
      container.appendChild(questionDiv);
    });
  }