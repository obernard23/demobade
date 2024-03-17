const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const customer = require('../modules/customers');
const Employee = require('../modules/Employees');


// this function sends mail to ware house manager 
const NotifyCustomerCreate = async (params) => {
    let date = new Date()
   const newCustomer =  await customer.findById(params._id)//find bill 
  const SalesPerson=  await Employee.findOne({_id:params.salesPerson})
   await Employee.find({jobTittle:'MD'})
    .then((MD) => {
        MD.forEach( person => {
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
                name : 'MD',
                intro: `New Customer Account to Review from ${SalesPerson.firstName}`,
                action: [
                    {
                        instructions: `To view ${SalesPerson.firstName} request, click the button below`,
                        button: {
                            color: '#22BC66',
                            text: `Check out ${newCustomer.Username} `,
                            link: `${url}/api/v1/customer/${newCustomer._id}/edit`
                        }
                    }
                ]
            },
                outro: "kind Regards"
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
               console.log(error.message);
            })
        });
    })
    
};

module.exports = NotifyCustomerCreate
