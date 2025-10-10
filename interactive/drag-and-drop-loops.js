document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll(".draggable");
  const dropzones = document.querySelectorAll(".dropzone");
  const resultDiv = document.getElementById("result");
  const resetBtn = document.getElementById("reset-btn");
  let score = 0;

  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  dropzones.forEach(dropzone => {
    dropzone.addEventListener("dragover", e => {
      e.preventDefault();
      dropzone.classList.add("hovered");
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("hovered");
    });

    dropzone.addEventListener("drop", e => {
      e.preventDefault();
      dropzone.classList.remove("hovered");
      const dragged = document.querySelector(".dragging");
      if (!dragged) return;

      const correct = dropzone.dataset.accept === dragged.dataset.match;

      if (correct) {
        dropzone.classList.add("correct");
        dropzone.textContent = dragged.textContent;
        dragged.remove();
        score++;
      } else {
        dropzone.classList.add("wrong");
        setTimeout(() => dropzone.classList.remove("wrong"), 1000);
      }

      if (score === 4) {
        resultDiv.textContent = "🎉 Well done! All matches are correct.";
      }
    });
  });

  resetBtn.addEventListener("click", () => {
    location.reload();
  });
});
