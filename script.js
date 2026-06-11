const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const list = document.getElementById('item-list');

const savedItems = JSON.parse(localStorage.getItem('todo-items') || '[]');

function renderItems(items) {
  list.innerHTML = '';

  if (items.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = 'A lista está vazia. Adicione algo!';
    emptyMessage.style.color = '#5f6a7d';
    emptyMessage.style.fontStyle = 'italic';
    emptyMessage.style.justifyContent = 'center';
    list.appendChild(emptyMessage);
    return;
  }

  items.forEach((item, index) => {
    const itemElement = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = item;
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', () => removeItem(index));

    itemElement.appendChild(label);
    itemElement.appendChild(removeButton);
    list.appendChild(itemElement);
  });
}

function saveItems(items) {
  localStorage.setItem('todo-items', JSON.stringify(items));
}

function addItem(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  savedItems.push(trimmed);
  saveItems(savedItems);
  renderItems(savedItems);
  input.value = '';
  input.focus();
  spawnSmoke();
}

function spawnSmoke() {
  const smokeLayer = document.getElementById('smoke-layer');
  const count = 16;
  const cornerOffsets = [
    { left: 20, bottom: 24 },
    { right: 20, bottom: 24 },
  ];

  cornerOffsets.forEach((corner) => {
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement('div');
      particle.className = 'smoke-particle';
      const x = (Math.random() * 100 + 10) * (corner.left ? 1 : -1);
      const y = -(Math.random() * 180 + 40);
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      particle.style.left = corner.left ? `${corner.left + Math.random() * 20}px` : 'auto';
      particle.style.right = corner.right ? `${corner.right + Math.random() * 20}px` : 'auto';
      particle.style.bottom = `${corner.bottom + Math.random() * 16}px`;
      particle.style.opacity = '0';
      smokeLayer.appendChild(particle);
      particle.addEventListener('animationend', () => particle.remove());
    }
  });
}

function removeItem(index) {
  savedItems.splice(index, 1);
  saveItems(savedItems);
  renderItems(savedItems);
  spawnSmoke();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addItem(input.value);
  spawnSmoke();
});

renderItems(savedItems);
