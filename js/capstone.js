document.getElementById('generatePdf').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  let y = 10;
  pdf.setFontSize(16);
  pdf.text("Week 14: Capstone Project Assessment", 105, y, { align: "center" });
  y += 10;

  // Pre-fill Learning Outcomes
  pdf.setFontSize(12);
  pdf.setFont("Arial", "bold");
  pdf.text("Learning Outcomes:", 10, y);
  y += 6;
  pdf.setFont("Arial", "normal");
  const outcomes = [
    "1. Design a functional Python program addressing a real-world problem.",
    "2. Apply core Python concepts: functions, loops, conditionals, data structures.",
    "3. Identify and resolve errors in code (debugging).",
    "4. Provide clear documentation and comments.",
    "5. Present project and explain design choices."
  ];
  outcomes.forEach(line => { pdf.text(line, 10, y); y += 6; });
  y += 4;

  // Pre-fill Assessment Rubric
  pdf.setFont("Arial", "bold");
  pdf.text("Assessment Rubric:", 10, y);
  y += 6;
  pdf.setFont("Arial", "normal");
  const rubric = [
    "Functionality: Program runs without errors; meets all requirements.",
    "Code Quality: Clean, organized, well-commented code.",
    "Creativity: Original approach; adds unique features.",
    "Documentation: Comprehensive README; clear instructions.",
    "Presentation: Clear and confident; answers questions well."
  ];
  rubric.forEach(line => { pdf.text(line, 10, y); y += 6; });
  y += 4;

  // Include student input
  const form = document.getElementById('capstoneForm');
  Array.from(form.elements).forEach(el => {
    if (el.tagName === 'TEXTAREA') {
      pdf.setFont("Arial", "bold");
      pdf.text(`${el.previousElementSibling.textContent}`, 10, y);
      y += 6;
      pdf.setFont("Arial", "normal");
      const lines = pdf.splitTextToSize(el.value, 180);
      pdf.text(lines, 10, y);
      y += lines.length * 6 + 4;
    }
  });

  pdf.save("Week_14_Capstone_Assessment.pdf");
});
