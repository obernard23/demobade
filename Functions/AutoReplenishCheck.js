const {storeProduct,WHouse} = require('../modules/warehouse')
const Products = require('../modules/Product') 
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');

module.exports = async function AutoReplenishCheck (){
    await WHouse.find().then((location)=>{
        location.forEach(async wh=>{
            // send mail here to each warehouse
            await storeProduct.find({WHIDS:wh._id})
            .then(async(storeProduct)=>{
                storeProduct.map(async(Product) =>{
                    
                    console.log(Product._id);
                })
               
            })

        })
    })
   
    console.log('================================ reached')
}



// storeProduct.forEach(async (product)=>{
//     if(product.currentQty <= product.replenishQty){
//        if(!product.mailsent){
//         await Products.findById(product.productId)
//         .then(async(ClonedProduct)=>{
//             // send reminder mail
//            await WHouse.findById(product.WHIDS).
//            then(manager=>{
//             console.log(manager.Manager.Email)
//            })
           
//         })
//        }
//     }else{
//         console.log(`${product.productId} is in abundant`)
//     }
// })



// let config = {
//     service : 'gmail',
//     auth : {
//         user: EMAIL,
//         pass: PASSWORD
//     },
//     tls : { rejectUnauthorized: false }//always add this to stop error in console   
// }

// let transporter = nodemailer.createTransport(config);

// let MailGenerator = new Mailgen({
//     theme: "salted",
//     product : {
//         name: 'BADE',
//         link : 'mailto:operations.bade@gmail.com',
//         logo: 'https://badegreatkamsi.onrender.com/BADES.jpg',
//         copyright: `© ${date.getFullYear()} BADE.`,
//     }
// })

// let response = {
//     body: {
//         name : ``,
//         intro: ``,
//         greeting: 'Dear',
//         signature: 'Sincerely',
        
//         table: [
//             {
//                 // Optionally, add a title to each table.
//                 title: 'Products',
//                 data: result.orders.map(order =>{
//                     return {
//                         Product :order.item.Name,
//                         Qty:order.Qty,
//                         Vat:order.item.VAT,
//                     }
//                 }),
//             },
           
//         ],
//         action: [
//             {
//                 instructions: ``,
//                 button: {
//                     color: '#22BC66',
//                     text: 'Raise Product Request',
//                     link: `${url}/invoice/${result._id}`
//                 }
//             }
//         ],
//         outro: ""
//     }
// }

// let mail = MailGenerator.generate(response)

// let message = {
//     from : EMAIL,
//     to : wh.Manager.Email,
//     subject: `${ERPSmtpName} Auto replenish Reminder`,
//     html: mail
// }

// transporter.sendMail(message).then(() => {
//   console.log('message sent') //will recive this Delivery Note in thier email`})
// }).catch(error => {
//    console.log(error.message)
// })



