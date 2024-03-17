const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const { ObjectId } = require("mongodb");
const bills = require('../modules/Bills')
const {WHouse} = require('../modules/warehouse')


// sends notification to WH manager to approve bill to storekeeper
const NotifyManagerPayment = async (req,res,next) => {
    const bill = await bills.findById( new ObjectId(req.params.id))
    let date = new Date()
    const wareHouseEmail = await WHouse.findById(new ObjectId(bill.whId))
    
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
        name : wareHouseEmail.Manager.firstName,
        intro: "New Prepaid Bill to Approve",
        action: [
            {
                instructions: 'To view with this request, please click here:',
                button: {
                    color: '#22BC66',
                    text: `See Bill Ref: ${bill.billReferenceNo}`,
                    link: `${url}/api/v1/${wareHouseEmail.WHName}/bill/${bill._id}`
                }
            }
        ]
    },
        outro: "kind Regards"
    }
    
    let mail = MailGenerator.generate(response)
    
    let message = {
        from : EMAIL,
        to : wareHouseEmail.Manager.Email,
        subject: `${ERPSmtpName} Operations`,
        html: mail
    }
    
    transporter.sendMail(message).then(() => {
    res.status(200).json({ message:'Payment acknowledged. ware House Manager will receive notification for approval'})
    next()
    }).catch(error => {
        res.status(500).json({ message: error.message })
    })
    
    
};

module.exports = NotifyManagerPayment
