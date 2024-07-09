import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (orderDetail, productName, customerAddress, customerName) => {
  const doc = new jsPDF();

  // Add the title
  doc.setFontSize(20);
  doc.text("Sales Report Invoice", 105, 20, null, null, "center");

  // Add a horizontal line
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);

  // Add the date
  doc.setFontSize(12);
  doc.text(`Date: ${new Date(orderDetail.Date).toLocaleDateString()}`, 20, 35);

  // Add customer details
  doc.setFontSize(12);
  doc.text(`Customer Name: ${customerName}`, 20, 45);
  doc.text(`Customer Address: ${customerAddress}`, 20, 55);

  // Add a horizontal line
  doc.line(20, 65, 190, 65);

  // Add table of order details
  doc.autoTable({
    startY: 70,
    head: [["Product Name", "Quantity", "Unit Price", "Total Price"]],
    body: [
      [
        productName,
        orderDetail.Quantity,
        `Rs. ${orderDetail.Unit_Price}.00`,
        `Rs. ${orderDetail.Total_Price}.00`
      ],
    ],
    theme: 'grid',
    headStyles: { fillColor: [22, 160, 133] },
    styles: { fontSize: 12, halign: 'center' },
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
    }
  });

  // Add a total amount section
  doc.setFontSize(12);
  doc.text(`Total Amount: Rs. ${orderDetail.Total_Price}.00`, 20, doc.lastAutoTable.finalY + 20);

  // Add a place for signature
  doc.setFontSize(12);
  doc.text("Authorized Signature: ____________________", 20, doc.lastAutoTable.finalY + 40);

  // Add a footer
  doc.setFontSize(10);
  doc.text("Thank you for your business!", 105, 290, null, null, "center");

  // Save the PDF
  doc.save(`invoice_${orderDetail.SalesID}.pdf`);
};
