document.addEventListener('DOMContentLoaded', () => {
  const heartsContainer = document.getElementById('hearts');
  const flowersContainer = document.getElementById('flowers');
  const messageButton = document.getElementById('message-button');
  const note = document.getElementById('note');
  const numberOfHearts = 17;
  const numberOfFlowers = 5;
  const elementSize = 20; // Size of the heart and flower elements
  const minDistance = elementSize * 1; // Minimum distance between elements

  // Function to generate a random position for hearts and flowers
  function getRandomPosition() {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    return { x, y };
  }

  // Function to check if a new position is valid (not too close to existing elements)
  function isValidPosition(newPos, positions, minDist) {
    for (let pos of positions) {
      const distance = Math.sqrt(Math.pow(newPos.x - pos.x, 2) + Math.pow(newPos.y - pos.y, 2));
      if (distance < minDist) return false;
    }
    return true;
  }

  // Create and position hearts
  function createElements(container, numberOfElements) {
    const elementPositions = [];
    let attempts = 0;
    while (elementPositions.length < numberOfElements && attempts < 1000) {
      const position = getRandomPosition();
      if (isValidPosition(position, elementPositions, minDistance)) {
        elementPositions.push(position);
        const element = document.createElement('div');
        element.classList.add(container === heartsContainer ? 'heart' : 'flower');
        element.style.top = `${position.y}%`;
        element.style.left = `${position.x}%`;
        container.appendChild(element);
      }
      attempts++;
    }
  }

  // Toggle note visibility
  messageButton.addEventListener('click', () => {
    note.classList.toggle('visible');
    if (note.classList.contains('visible')) {
      // Clear existing flowers and create new ones when the note is visible
      flowersContainer.innerHTML = '';
      createElements(flowersContainer, numberOfFlowers);
    }
  });

  // Initial creation of hearts
  createElements(heartsContainer, numberOfHearts);
});
