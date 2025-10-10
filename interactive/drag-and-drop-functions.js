// Drag & Drop Activity Logic
document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll('.draggable-item');
  const dropZones = document.querySelectorAll('.drop-zone');
  const successMessage = document.getElementById('successMessage');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => draggable.classList.add('dragging'));
    draggable.addEventListener('dragend', () => draggable.classList.remove('dragging'));
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.classList.add('over');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('over');
      const dragged = document.querySelector('.dragging');
      if (!dragged) return;

      if (dragged.id === zone.dataset.accept) {
        zone.textContent = dragged.textContent;
        dragged.remove();
        checkCompletion();
      } else {
        alert('Incorrect match! Try again.');
      }
    });
  });

  function checkCompletion() {
    if (document.querySelectorAll('.draggable-item').length === 0) {
      successMessage.style.display = 'block';
    }
  }
});
