const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const {WHouse} = require('../modules/warehouse');
const Employee = require('../modules/Employees');
const Expenses = require('../modules/Expense')


// this function sends mail to ware house manager 
const NotifyCFO = async (data) => {
    let date = new Date()
//    const WHous =  await WHouse.findById(data.WHID)//find bill 
   await Employee.find({jobTittle:'CFO'})
    .then((CFO) => {
        CFO.forEach( person => {
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
                    logo: '/logo.jpg',
                    copyright: `© ${date.getFullYear()} BADE.`,
                }
            })
        
            let response = {
                body: {
                    name : `CFO`,
                    intro: `New Expense to Review.`,
                    greeting: 'Dear',
                    signature: 'Sincerely',
                    
                    table: [
                        {
                            // Optionally, add a title to each table.
                            title: `Ref:${data.refNo}, expense Date: ${data.Date} `,
                            data: [
                                {
                                    Exp : data.category.toLowerCase(),
                                    Payee : data.payee.toLowerCase(),
                                    Account :data.payeebankAccount,
                                    Bank: data.payeeBankName.toLowerCase(),
                                    " ₦ ": data.Amount,
                                }
                            ]
                        },
                    ],
                    action: [
                        {
                            instructions: `${data.remarks}`,
                            button: {
                                color: '#22BC66',
                                text: 'View Expense',
                                link: `${url}/api/v1/EXP/${data._id}`
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
               await Expenses.findById(data._id).
               then((expense) => {
                expense.mailSent = true
                expense.save()
               });
                console.log("you should receive an email")
            }).catch(error => {
                console.log( error )
            })
        });
    })
    
};

module.exports = NotifyCFO
