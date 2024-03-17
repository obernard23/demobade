const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const {WHouse} = require('../modules/warehouse');
const Employee = require('../modules/Employees');
const Scrap = require('../modules/Scrap')


// this function sends mail to ware house manager 
const ScrapResponse = async (req,res,next) => {
    const Scraps=  await Scrap.findById(req.params.ID)
    let date = new Date()
    const WHous =  await WHouse.findById(Scraps.WHID)
   const Manager =  await Employee.findById(WHous.Manager._id)
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
                name :  Manager.firstName,
                intro: `Your Scrap Request has been Reviewed and it's ${req.body.status}`,
                action: [
                    {
                        instructions: 'To view this request, please click here:',
                        button: {
                            color: '#22BC66',
                            text: `VIEW THIS REQUEST`,
                            link: `${url}/api/v1/scrap/single/${Scraps._id}`
                        }
                    }
                ]
            },
                outro: "kind Regards"
            }
            let mail = MailGenerator.generate(response)
            
            let message = {
                from : EMAIL,
                to :Manager.Email,
                subject: `${ERPSmtpName} Operations`,
                html: mail
            }
            
            transporter.sendMail(message).then(async() => {
               res.status(200).json({message:`Your Response to this Request has been Registered and ${Manager.firstName} has been Notified`})
            }).catch(error => {
                res.status(500).json({error:error.message});
            })
//        
    
};

module.exports = ScrapResponse
