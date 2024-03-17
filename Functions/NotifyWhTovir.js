const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const {WHouse} = require('../modules/warehouse');
const Employee = require('../modules/Employees');
const Product = require('../modules/Product')


// this function sends mail to ware house manager 
const NotifyScrap = async (req,res,next) => {
    let date = new Date()
   const WHous =  await WHouse.findById(req.body.WHIDS)//find bill 
   virtualStorageQty = await Product.findById(req.params.id)
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
                intro: `${req.body.virtualQty} ${virtualStorageQty.UMO} of ${virtualStorageQty.Name} retured from ${WHous.WHName} TO Virtual`,
                action: [
                    {
                        instructions: `To view this action, visit  virtual and view activity log of the ${virtualStorageQty.Name} returned from  ${WHous.WHName}`,
                        button: {
                            color: '#04724d',
                            text: ` Visit ${WHous.WHName} Inventory`,
                            link: `${url}/api/v1/SetUp/${WHous._id}/${person._id}`
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
                res.status(200).json({message:'Product Returned Successfully. MD will be notified of the product return'})
            }).catch(error => {
                res.status(500).json({error:error.message});
            })
        });
    })
    
};

module.exports = NotifyScrap
