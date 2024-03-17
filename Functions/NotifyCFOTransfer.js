const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const vendor = require('../modules/Vendors');
const Employee = require('../modules/Employees');
const {WHouse} = require('../modules/warehouse')
var moment = require('moment'); 


// this function sends mail to ware house manager 
const NotifyCFOTransfer = async (req,res) => {
    let date = new Date()
   const from = await WHouse.findById(req.body.from)
   const to = await WHouse.findById(req.body.to)
   const person = await Employee.findOne({jobTittle:'CFO'})
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
                    name : `CFO`,
                    intro: `New Transfer ${req.body.billReferenceNo} Request form ${from.WHName.toLocaleUpperCase()} to ${to.WHName.toLocaleUpperCase()} awaiting your Review.`,
                    greeting: 'Dear',
                    signature: 'Sincerely',
                    
                    table: [
                    
                        {
                            // Optionally, add a title to each table.
                            title: `Product Transfer Infomation`,
                            data:   req.body.orders.map(order =>{
                                return {
                                    Products :order.item.productName,
                                    Qty: order.Qty,
                                    Scale : order.item.UOM,
                                }
                            }),
                                  
                        },
                    ],
                    // action: [
                    //     {
                    //         instructions: `To view Hard copy of this P.O, click on See Attachment `,
                    //         button: {
                    //             color: '#22BC66',
                    //             text: `View ${req.body.billReferenceNo}`,
                    //             link: `${url}/api/v1/Purchase/bill/${purchased._id}`
                    //         }
                    //     }
                    // ],
                    outro: `Thanks for your speedy response ${person.firstName} ${person.lastName}`
                }
            }
            
            let mail = MailGenerator.generate(response)
            
            let message = {
                from : EMAIL,
                to : person.Email,//cfo email address
                subject: `${ERPSmtpName} Operations`,
                html: mail
            }
            
            transporter.sendMail(message).then(async() => {
                res.status(200).json({message:'Transfer Request submited.Deductions have been made from selected WareHouse inventor. We will Notify CFO to review and carry out further Action'})
            }).catch(error => {
              res.status(500).json({error:error.message})
            })
    
};

module.exports = NotifyCFOTransfer
