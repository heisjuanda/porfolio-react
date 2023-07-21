const apiKey = '';
const apiUrl = '';

export const sendEmail = async (name, email, message) => {
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
        subject: 'Portfolio message',
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
