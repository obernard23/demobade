const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const {WHouse} = require('../modules/warehouse');
const Employee = require('../modules/Employees');
const PurchaseOrders = require('../modules/purchaseOrder')
var moment = require('moment'); 
let date = new Date()
var responseDate = moment(date).format("dddd, MMMM Do YYYY,");


// this function sends mail to ware house manager 
const NotifyInvoicerPODeclined = async (vendorBill,Requester) => {
  
        person =  await Employee.findOne({jobTitle:'Invoicer'})
   
   
            let config = {
                service : 'gmail',
                auth : {
                    user: EMAIL,
                    pass: PASSWORD
                },
                tls : { rejectUnauthorized: false }//always add this to stop error in console   
            }
        
            let transporter = nodemailer.createTransport(config);
        
            let MailGenerator = new Mailgen({
                theme: "salted",
                product : {
                    name: 'BADE',
                    link : 'https://mailgen.js/',
                    logo: 'bade.jpg',
                    copyright: `© ${date.getFullYear()} BADE.`,
                }
            })
        
            let response = {
                body: {
                name : 'Invoicer',
                intro: `LPO Request for ${vendorBill.billReferenceNo} has been declined by ${Requester}`,
                action: [
                    {
                        instructions: `Rejection Reason : ${vendorBill.RejectionReason}`,
                        button: {
                            color: '#04724d',
                            text: ` See LPO Ref/${vendorBill.billReferenceNo}`,
                            link: `${url}/api/v1/Purchase/bill/${vendorBill._id}`,
                        }
                    }
                ]
            },
                outro: "kind Regards"
            }
            let mail = MailGenerator.generate(response)
            
            let message = {
                from : EMAIL,
                to : person.Email,
                // to : 'bennygroove8@gmail.com',
                subject: `${ERPSmtpName} Operations`,
                html: mail
            }
            
            transporter.sendMail(message).then(async(response) => {
                console.log(response)
                // res.status(200).json({message:'Product Transfered Successfully. manager will be notified of the product '})
            }).catch(error => {
                console.log(error)
                // res.status(500).json({error:error.message});
            })
       
    
};

module.exports = NotifyInvoicerPODeclined
