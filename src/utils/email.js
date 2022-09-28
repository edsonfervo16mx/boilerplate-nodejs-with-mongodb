const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

const SMTP_SERVER = process.env.SMTP_SERVER;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

class NodeEmail {
  constructor(from, to, subject, template, params) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.template = template;
    this.params = params;
  }

  async sendEmail() {
    console.log("Send email ...");
    // console.log(this.params);
    let transporter = nodemailer.createTransport({
      host: SMTP_SERVER,
      port: SMTP_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: SMTP_EMAIL, // generated ethereal user
        pass: SMTP_PASSWORD, // generated ethereal password
      },
    });

    let html = fs.readFileSync(
      __dirname + "/templates/" + this.template,
      "utf-8",
      (err, data) => {
        if (err) {
          return;
        }
        return data;
      }
    );

    // console.log(html);

    let templateHtml = handlebars.compile(html, { noEscape: true });
    let htmlToSend = templateHtml(this.params);

    // console.log(htmlToSend);

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: this.from, // sender address
      to: this.to, // list of receivers
      subject: this.subject, // Subject line
      text: htmlToSend, // plain text body
      html: htmlToSend, // html body
    });

    // console.log(info);

    return info;
  }
}

module.exports = NodeEmail;
