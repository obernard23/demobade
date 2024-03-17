const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const vendor = require('../modules/Vendors');
const Employee = require('../modules/Employees');
const {WHouse} = require('../modules/warehouse')
var moment = require('moment'); 


// this function sends mail to ware house manager 
const NotifyCFOPO = async (purchased) => {
    let date = new Date()
    var responseDate = moment(purchased.recievedDate).format("dddd, MMMM Do YYYY,");
   const Vendor =  await vendor.findById(purchased.Vendor)//find bill 
   const WH = await WHouse.findById(purchased.WHID)
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
                    intro: `New P/O Bill for ${WH.WHName.toLocaleUpperCase()} to Review.`,
                    greeting: 'Dear',
                    signature: 'Sincerely',
                    
                    table: [
                        {
                            // Optionally, add a title to each table.
                            title: 'Products',
                            data: purchased.orders.map(order =>{
                                return {
                                    Product :order.item.Name,
                                    Qty:order.Qty,
                                    Scale:order.item.UMO,
                                    "Total(₦)": `${order.total}`,
                                }
                            }),
                        },
                        {
                            // Optionally, add a title to each table.
                            title: `Payment Infomation`,
                            data: [
                                {
                                    For:`${WH.WHName.toLocaleUpperCase()}`,
                                    Vendor : Vendor.Name.toLowerCase(),
                                    Account :Vendor.Account_num,
                                    Bank: Vendor.Bank_name.toLowerCase(),
                                    "P/O Date": `${responseDate}`,
                                    "Grand(₦)": purchased.grandTotal,
                                    Ref:`${purchased.billReferenceNo}`,
                                }
                            ]
                        },
                    ],
                    action: [
                        {
                            instructions: `To view Hard copy of this P.O, click on See Attachment `,
                            button: {
                                color: '#22BC66',
                                text: 'View Vendor Bill',
                                link: `${url}/api/v1/Purchase/bill/${purchased._id}`
                            }
                        }
                    ],
                    outro: `Thanks for your speedy response (${person.firstName})`
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
            console.log('mail sent')
            }).catch(error => {
              console.log(error)
            })
    
};

module.exports = NotifyCFOPO
