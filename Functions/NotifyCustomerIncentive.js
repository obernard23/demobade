const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const Cusomers = require('../modules/customers');
const vendors = require('../modules/Vendors');


// this function sends mail to ware house manager 
const NotifyCustomerIncentive = async (req,res,next) => {
  
   const customer =  await Cusomers.findById(req.body.customer)//find bill 
   const vendor =  await vendors.findById(req.body.Vendor)//find bill 
   let date = new Date()
    
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
                name : ` ${customer.Username}`,
                intro: `New TTC Payment has been Registered to your ledger, Amount Registered: ₦${req.body.INCENTIVE} on ${req.body.PaymetDate}.`,
                action: [
                    // {
                    //     instructions: ``,
                    //     button: {
                    //         color: '#22BC66',
                    //         text: `Acknowledge Payment for bill `,
                    //         link: `${url}/api/v1/Register/bill/`
                    //     }
                    // }
                ]
            },
                outro: "kind Regards"
            }
            
            let mail = MailGenerator.generate(response)
            
            let message = {
                from : EMAIL,
                to : customer.Email,//accountant email address
                subject: `${ERPSmtpName} Operations`,
                html: mail
            }
            
            transporter.sendMail(message).then(() => {
                res.status(200).json({message:'Payment registered successfully'})
            }).catch(error => {
                res.status(500).json({Error:error.message})
            })
       
    
};

module.exports = NotifyCustomerIncentive
