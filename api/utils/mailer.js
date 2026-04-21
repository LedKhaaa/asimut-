const nodemailer = require('nodemailer');

const creerTransport = async () => {
    const compte = await nodemailer.createTestAccount();

    const transport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: compte.user,
            pass: compte.pass
        }
    });

    return { transport, compte };
};

const envoyerEmail = async (destinataire, sujet, contenu) => {
    const { transport, compte } = await creerTransport();

    const info = await transport.sendMail({
        from: '"Collège Asimov" <secretariat@asimov.fr>',
        to: destinataire,
        subject: sujet,
        html: contenu
    });

    const urlApercu = nodemailer.getTestMessageUrl(info);
    console.log(`Email envoyé à ${destinataire} — Aperçu : ${urlApercu}`);

    return urlApercu;
};

module.exports = { envoyerEmail };