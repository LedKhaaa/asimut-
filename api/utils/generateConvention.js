const PDFDocument = require('pdfkit');

const genererConvention = (stage, eleve, res) => {
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="convention_stage_${eleve.nom}_${eleve.prenom}.pdf"`);
    doc.pipe(res);

    // ── EN-TÊTE ──────────────────────────────────────────────
    doc.fontSize(20).font('Helvetica-Bold')
       .text("CONVENTION DE STAGE", { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica')
       .text("Collège Asimov — Grenoble", { align: 'center' });
    doc.moveDown(2);

    // ── ÉLÈVE ────────────────────────────────────────────────
    doc.fontSize(13).font('Helvetica-Bold').text("1. Informations sur l'élève");
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica');
    doc.text(`Nom : ${eleve.nom}`);
    doc.text(`Prénom : ${eleve.prenom}`);
    doc.text(`Identifiant : ${eleve.identifiant ?? '—'}`);
    doc.moveDown(1.5);

    // ── ENTREPRISE ───────────────────────────────────────────
    doc.fontSize(13).font('Helvetica-Bold').text("2. Entreprise d'accueil");
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica');
    doc.text(`Entreprise : ${stage.entreprise}`);
    doc.text(`Contact : ${stage.contact_nom ?? '—'}`);
    doc.text(`Email contact : ${stage.contact_email ?? '—'}`);
    doc.moveDown(1.5);

    // ── DATES ────────────────────────────────────────────────
    doc.fontSize(13).font('Helvetica-Bold').text("3. Période de stage");
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica');

    const fmt = (d) => d ? new Date(d).toLocaleDateString('fr-FR') : '—';
    doc.text(`Date de début : ${fmt(stage.date_debut)}`);
    doc.text(`Date de fin   : ${fmt(stage.date_fin)}`);
    doc.moveDown(1.5);

    // ── RÉSULTAT ─────────────────────────────────────────────
    doc.fontSize(13).font('Helvetica-Bold').text("4. Suivi de recherche");
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica');
    doc.text(`Lettres envoyées : ${stage.nb_lettres_envoyees ?? 0}`);
    doc.text(`Lettres reçues   : ${stage.nb_lettres_recues ?? 0}`);
    doc.text(`Résultat         : ${stage.resultat ?? '—'}`);
    doc.moveDown(3);

    // ── SIGNATURES ───────────────────────────────────────────
    doc.fontSize(13).font('Helvetica-Bold').text("5. Signatures");
    doc.moveDown(1);
    doc.fontSize(11).font('Helvetica');

    const y = doc.y;
    doc.text("L'élève :", 50, y);
    doc.text("Le représentant légal :", 200, y);
    doc.text("L'établissement :", 400, y);

    doc.moveDown(3);
    doc.text("________________________", 50);
    doc.text("________________________", 200, doc.y - doc.currentLineHeight());
    doc.text("________________________", 400, doc.y - doc.currentLineHeight());

    doc.end();
};

module.exports = genererConvention;