
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

exports.generateOfferLetter = async (req, res) => {
  try {
    const { name, role, company, joiningDate, salary, location } = req.body;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

const content = `
  Dear ${name},

  We are pleased to offer you the position of ${role} at ${company}.
  Your start date will be ${joiningDate}, and your annual CTC will be ${salary}.

  You will be reporting to the team at our ${location} office. 
  Please bring your identity documents on the first day for verification. 
  Further details regarding your onboarding and training schedule will be shared shortly.

  We believe your skills and experience will be a valuable asset to our organization, 
  and we look forward to your contributions in achieving our goals.

  Should you have any questions or need assistance before joining, feel free to reach out to our HR team.

  We are excited to welcome you to our team and look forward to a successful journey together.

  Sincerely,
  HR Team
`;

    page.drawText(content, {
      x: 50,
      y: 350,
      size: 12,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      lineHeight: 20
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=offer-letter.pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating PDF');
  }
};
