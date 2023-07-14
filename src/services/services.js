const apiKey = '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';
const apiUrl = 'https://api.sendinblue.com/v3/smtp/email';

export const sendEmail = async (name, email, subject, message) => {
    const emailData = {
        sender: {
            name: name,
            email: email,
        },
        to: [
            {
                email: 'heisjuanda@gmail.com',
            },
        ],
        subject: subject,
        textContent: message,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify(emailData),
        });

        if (response.ok) {
            return 'sent';
        } else {
            return 'notSent';
        }
    } catch (error) {
        return 'error';
    }
};

export const sendEmailResponse = async (email) => {
    const emailResponse = {
        sender: {
            name: 'Juan David Moreno A.',
            email: 'hola@heisjuanda.com',
        },
        to: [
            {
                email: email,
            },
        ],
        subject: 'Hello friend!',
        textContent: 'Thank you for sending your email, I will contact you as soon as possible (heisjuanda@gmail.com)',
    };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify(emailResponse),
        });
    } catch (error) {
        return 'error';
    }
};
