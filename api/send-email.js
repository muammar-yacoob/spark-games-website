/**
 * Vercel Serverless Function for Spark Games Email Handler
 * Handles Resend API calls server-side to avoid CORS issues
 * Supports both contact forms and job applications with file attachments
 */

export default async function handler(req, res) {
    // Enable CORS for your domain
    res.setHeader('Access-Control-Allow-Origin', 'https://spark-games.co.uk');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { 
            formType,
            name,
            full_name,
            email,
            message,
            job_position,
            portfolio,
            location,
            cvFile
        } = req.body;
        
        // Validate required fields
        if (!email || !message) {
            return res.status(400).json({ error: 'Missing required fields: email and message' });
        }
        
        // Prepare email data for Resend
        const emailData = {
            from: 'Spark Games Website <website@spark-games.co.uk>',
            to: formType === 'application' 
                ? ['hr@spark-games.co.uk'] 
                : ['support@spark-games.co.uk'],
            replyTo: email,
            subject: formType === 'application' 
                ? `Job Application: ${job_position}` 
                : 'Contact Form Submission - Spark Games',
            attachments: []
        };
        
        // Handle file attachment for job applications
        if (formType === 'application' && cvFile) {
            emailData.attachments.push({
                filename: cvFile.filename,
                content: cvFile.content
            });
        }
        
        // Build email content based on form type
        if (formType === 'application') {
            emailData.html = `
                <h2>New Job Application</h2>
                <p><strong>Position:</strong> ${job_position}</p>
                <p><strong>Name:</strong> ${full_name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Portfolio:</strong> ${portfolio || 'Not provided'}</p>
                <p><strong>Location:</strong> ${location || 'Not specified'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <p><strong>CV:</strong> ${cvFile ? cvFile.filename : 'No file attached'}</p>
            `;
        } else {
            emailData.html = `
                <h2>New Contact Form Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `;
        }
        
        // Debug logging
        console.log('📧 Email routing:', {
            formType,
            targetEmail: emailData.to[0],
            subject: emailData.subject
        });
        
        // Make API call to Resend
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ Email sent successfully:', {
                id: data.id,
                to: emailData.to[0],
                subject: emailData.subject
            });
            res.status(200).json({ 
                success: true, 
                id: data.id,
                targetEmail: emailData.to[0],
                message: 'Email sent successfully' 
            });
        } else {
            console.error('❌ Resend API error:', {
                status: response.status,
                error: data,
                targetEmail: emailData.to[0]
            });
            res.status(response.status).json({ 
                error: data.message || 'Failed to send email',
                details: data,
                targetEmail: emailData.to[0]
            });
        }
    } catch (error) {
        console.error('Serverless function error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message
        });
    }
}