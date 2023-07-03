import { Transporter } from "nodemailer"
require('dotenv').config()

const nodemailer = require('nodemailer')

class MailService {

    public transporter: Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта на моем хосте`,
            text: '',
            html: 
            `
                <div>
                    <h1>Для активации аккаунта перейдите по ссылке:</h1>
                    <a href="${link}">Ссылка на активацию</a>
                </div>
            `
        })


    }
}
export default new MailService()