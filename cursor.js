// Select the body
const body = document.body;

// Create the plane cursor
const planeCursor = document.createElement('div');
planeCursor.classList.add('custom-cursor');
body.appendChild(planeCursor);

// Listen for mouse movement
document.addEventListener('mousemove', (e) => {
    // Position the plane cursor
    planeCursor.style.left = `${e.pageX}px`;
    planeCursor.style.top = `${e.pageY}px`;

    // Create a smoke trail
    const smoke = document.createElement('div');
    smoke.classList.add('smoke');
    smoke.style.left = `${e.pageX - 20}px`;
    smoke.style.top = `${e.pageY + 10}px`;

    // Add the smoke trail to the body
    body.appendChild(smoke);

    // Remove the smoke trail after the animation ends
    setTimeout(() => {
        smoke.remove();
    }, 800); // Match the animation duration in CSS
});
