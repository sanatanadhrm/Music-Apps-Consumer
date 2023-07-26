/* eslint-disable no-underscore-dangle */
const nodemailer = require('nodemailer');
const config = require('./utils/config');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.rabbitMq.host,
      port: config.rabbitMq.port,
      auth: {
        user: config.rabbitMq.username,
        pass: config.rabbitMq.password,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Musics Apps',
      to: targetEmail,
      subject: 'Ekspor Playlist',
      text: 'Terlampir hasil dari ekspor Playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}
module.exports = MailSender;
