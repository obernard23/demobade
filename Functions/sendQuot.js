const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const customer = require("../modules/customers");
const business = require("../modules/company");
const { ObjectId } = require("mongodb");
const bills = require("../modules/Bills");
var moment = require('moment');
let date = new Date()
var responseDate = moment(date).format("dddd, MMMM Do YYYY,");



//this function sends quotation to customer  on singleill page

const sendQuot = async (req,res,next) => {
    const busines = await business.findOne()
    if (ObjectId.isValid(req.params.id)) {
        try {
          await bills
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(async(result) => {
            //get customer email address
            const date = new Date()
            const CustomerEmail = await customer.findOne({_id: result.customer})
            result.ActivityLog.unshift({logMsg:`Delivery note sent to ${CustomerEmail.Username} on ${responseDate}`,status:`Delivey completed`})
            result.save()
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
                    link : 'mailto:operations.bade@gmail.com',
                    logo: 'https://badegreatkamsi.onrender.com/BADES.jpg',
                    copyright: `© ${date.getFullYear()} BADE.`,
                }
            })
        
            let response = {
                body: {
                    name : CustomerEmail.Username,
                    intro: `${result.billStatus}/${result.billReferenceNo}.`,
                    greeting: 'Dear',
                    signature: 'Sincerely',
                    
                    table: [
                        {
                            // Optionally, add a title to each table.
                            title: 'Products',
                            data: result.orders.map(order =>{
                                return {
                                    Product :order.item.Name,
                                    Qty:order.Qty,
                                    BatchNo:order.BatchId,
                                    Vat:order.item.VAT,
                                   "Price(₦)" : `${order.priceListPrice}`,
                                   'Promotion':order.promotionData ? order.promotionData : 0,
                                    Scale:order.item.UMO,
                                    "Total(₦)": `${order.total}`,
                                }
                            }),
                        },
        
                        //for promotion
                        {
                            // Optionally, add a title to each table.
                            title: 'Promotions',
                            data: result.promotionItems.map(item => {
                                return{
                                    'Item':'Nothing added for this promotion'
                                }
                            })
                        },
        
        
                        {
                            // Optionally, add a title to each table.
                            title: 'Cummulative',
                            data: [
                                {
                                    item: 'Delivery Fee',
                                    "price":`₦${result.shippingFee} (This fee is not Added to Grand total of this ${result.billStatus}})`
                                },
                                {
                                    item: 'Sub Total',
                                    "price": `₦${result.subTotal}`
                                },
                                {
                                    item: 'Invoice Discount',
                                    "price(₦)": result.discount
                                },
                                {
                                    item: 'Grand Total',
                                    "price(₦)": result.grandTotal
                                }
                            ],
                          
                        }
                    ],
                    
                    // action: [
                    //     {
                    //         instructions: `For futher infomation please call our customer service line ${busines.Tel}`,
                    //         button: {
                    //             color: '#22BC66',
                    //             text: 'Download pdf copy',
                    //             link: `${url}/api/v1/invoice/${result._id}`
                    //         }
                    //     }
                    // ],
                    outro: "Looking forward to do more business"
                }
            }
        
            let mail = MailGenerator.generate(response)
        
            
            let message = {
                from : EMAIL,
                to : CustomerEmail.Email,
                subject: `${ERPSmtpName} ${result.billStatus}`,
                html: mail
            }
            
            transporter.sendMail(message).then(() => {
                res.status(200).json({ message: `${ CustomerEmail.Username} will recive this ${result.billStatus} in thier email`})
            })

            });
        } catch (error) {
            res.status(500).json({ message:error.message})
        }
      }


    
    
    
};

module.exports = sendQuot
