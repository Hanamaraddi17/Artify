const fs = require('fs').promises;
const path = require('path');
const ExcelJS = require('exceljs');
const twilio = require('twilio');

// Twilio credentials from your Twilio account
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);
const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER || '+917204484843';

// Function to handle contact form submission
exports.submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.error('Error: Missing fields in the submission:', { name, email, message });
        return res.status(400).json({ error: 'Please fill out all fields' });
    }

    // Create or update Excel file to store form submissions
    const dataDir = path.join(__dirname, '..', 'data');
    const filePath = path.join(dataDir, 'contact_us.xlsx');

    // Ensure the data directory exists
    try {
        await fs.mkdir(dataDir, { recursive: true });
        console.log('Data directory created:', dataDir);
    } catch (error) {
        console.error('Error creating data directory:', error);
    }

    const workbook = new ExcelJS.Workbook();
    let worksheet;

    try {
        // Check if the Excel file exists
        await fs.access(filePath);
        console.log('Excel file found, reading the file:', filePath);
        await workbook.xlsx.readFile(filePath);
        worksheet = workbook.getWorksheet('contact_us');
        if (!worksheet) {
            worksheet = workbook.addWorksheet('contact_us');
            worksheet.addRow(['Name', 'Email', 'Message']);
        }
    } catch (error) {
        console.log('Excel file not found, creating a new file:', filePath);
        worksheet = workbook.addWorksheet('contact_us');
        worksheet.addRow(['Name', 'Email', 'Message']);
    }

    // Log existing data
    console.log('Existing data before update, row count:', worksheet.rowCount);

    // Append the new contact data
    worksheet.addRow([name, email, message]);
    console.log('New contact added:', { name, email, message });

    // Save the updated file
    try {
        await workbook.xlsx.writeFile(filePath);
        console.log("Excel file updated successfully:", filePath);
    } catch (error) {
        console.error('Error saving Excel file:', error);
        return res.status(500).json({ error: 'Failed to save contact form data' });
    }

    // Verify updated data by reading the file again
    try {
        const verificationWorkbook = new ExcelJS.Workbook();
        await verificationWorkbook.xlsx.readFile(filePath);
        const verificationWorksheet = verificationWorkbook.getWorksheet('contact_us');
        console.log('Data after updating, row count:', verificationWorksheet.rowCount);
        const lastRow = verificationWorksheet.getRow(verificationWorksheet.rowCount);
        console.log('Last row data:', lastRow.values);
    } catch (error) {
        console.error('Error reading updated file:', error);
    }

    // Send an SMS using Twilio
    const smsMessage = `New contact form submission: Name: ${name}, Email: ${email}, Message: ${message}`;
    console.log('Sending SMS:', smsMessage);

    try {
        const message = await client.messages.create({
            body: smsMessage,
            from: twilioPhoneNumber,
            to: adminPhoneNumber,
        });
        console.log(`SMS sent successfully. Message SID: ${message.sid}`);
        res.status(200).json({ message: 'Contact form data saved and SMS sent successfully' });
    } catch (error) {
        console.error('Failed to send SMS:', error);
        res.status(500).json({ error: 'Failed to send SMS' });
    }
};