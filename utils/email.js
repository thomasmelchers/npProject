const nodemailer = require('nodemailer')

const sendEmail = async options => {
    
    // 1. create a transporter - a service which will send the email.
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS
    }
})

    // 2. email's options
const mailOptions = {
    from: 'thomas.npproject@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.text
    //html

}
    // 3. send the email
    await transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error)
        } else {
            /* console.log('email has been sent' + info.response) */
        }
    })
}

module.exports = sendEmail