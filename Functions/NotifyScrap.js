const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const {WHouse} = require('../modules/warehouse');
const Employee = require('../modules/Employees');
const Scrap = require('../modules/Scrap')


// this function sends mail to ware house manager 
const NotifyScrap = async (req,res,next) => {
    let date = new Date()
   const WHous =  await WHouse.findById(req.body.WHID)//find bill 
  const Scraps=  await Scrap.findOne({SERIALnUMBER:req.body.SERIALnUMBER})
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
                intro: `New Scrap Request to Review from ${WHous.WHName}`,
                action: [
                    {
                        instructions: 'To view this request, please click here:',
                        button: {
                            color: '#22BC66',
                            text: `VIEW SCRAP REQUEST`,
                            link: `${url}/api/v1/wh-lagos/bill/${Scraps._id}`
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
                Scraps.mailSent = true
                Scraps.save()
               res.status(200).json({message:'Validation has to be approved. the CFO has been notified'})
            }).catch(error => {
                res.status(500).json({error:error.message});
            })
        });
    })
    
};

module.exports = NotifyScrap
