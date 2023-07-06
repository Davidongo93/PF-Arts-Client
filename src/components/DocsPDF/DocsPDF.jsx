
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const downloadPDF = () => {
    const capture = document.querySelector('.A4');
    console.log(capture);

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');

      const imageWidth = 180; // Ancho de la imagen en puntos
      const imageHeight = 120; // Alto de la imagen en puntos
      const margin = 20; // Margen en puntos

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const contentWidth = pageWidth - 2 * margin;
      const contentHeight = pageHeight - 2 * margin;

      let currentY = margin; // Posición vertical inicial
      let remainingHeight = imageHeight;

      // Título del documento
      const title = 'Art Gallery';
      const titleFontSize = 16;
      const titleX = margin; // Posición horizontal del título

      while (remainingHeight > 0) {
        // Verificar si es necesario agregar una nueva página
        if (remainingHeight > contentHeight) {
          doc.addPage();
          remainingHeight -= contentHeight;
          currentY = margin; // Reiniciar la posición vertical en la nueva página
        }

        // Agregar título en cada página
        doc.setFontSize(titleFontSize);
        doc.text(title, titleX, currentY);

        // Ajustar la posición vertical para dejar espacio después del título
        currentY += 10;

        // Agregar la porción de la imagen a la página actual
        const currentX = margin + (contentWidth - imageWidth) / 2; // Centrar la imagen horizontalmente
        const imageBottom = currentY + remainingHeight;
        if (imageBottom > pageHeight - margin) {
          remainingHeight = pageHeight - margin - currentY; // Ajustar la altura para evitar que la imagen se desborde
        }
        doc.addImage(imgData, 'PNG', currentX, currentY, imageWidth, remainingHeight);
        remainingHeight = 0; // Finalizar el bucle

        currentY += remainingHeight; // Incrementar la posición vertical
      }

      doc.save('receipt.pdf');
    });
  };
  export default downloadPDF;



