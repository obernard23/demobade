// const PDFDocument = require('pdfkit');
// const bills = require('../modules/Bills');
// invoice = require('../quotationTemplate')

// async function buildPDF(id,dataCallback, endCallback) {
//     const InvoicedBill = await bills.findById(id)
//     .then(bill => {
//         const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

//   doc.on('data', dataCallback);
//   doc.on('end', endCallback);

//   doc.fontSize(20).text(`Invoice`);

// //   doc
// //     .fontSize(12)
// //     .text(`Invoice Refrence : ${bill.billReferenceNo}`)
// //     .text(
// //         `Amount : ${bill.orders.map(order => {return order.item.Name})}`
// //         , {
// //         width: 412,  
// //         align: 'justify',
// //         indent: 30,
// //         columns: 2,
// //         height: 300,
// //         ellipsis: true
// //       })
// //       .text('thank you for doing business with us')
// doc.fontSize(25).text('Here is some vector graphics...', 100, 80);

// // some vector graphics



// // an SVG path


// // and some justified text wrapped into columns
// doc
//   .text('And here is some wrapped text...', 100, 300)
//   .font('Times-Roman', 13)
//   .moveDown()
//   .text(
//     `Amount : ${bill.orders.map(order => {return order.item.Name})}`
//     , {
//     width: 412,
//     align: 'between',
//     indent: 30,
//     columns: 3,
//     height: 300,
//   });
//     ;
//   doc.end();
//     })

  
// }

// module.exports = { buildPDF };

