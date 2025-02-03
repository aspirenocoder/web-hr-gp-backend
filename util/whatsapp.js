require('dotenv').config();
const axios = require('axios');

const runWhatsappFun = async (otp, mobile) => {
    require('dotenv').config();
    const data =
    {
        apiKey: process.env.WHATSAPP_API_KEY,
        campaignName: process.env.WHATSAPP_CAMPAIGN_NAME,
        destination: `91${mobile}`,
        userName: process.env.WHATSAPP_USER_NAME,
        templateParams: [
            otp // Replace "John" with the actual first name you want to send
        ],
        source: "new-landing-page form",
        media: {},
        buttons: [
            {
                type: "button",
                sub_type: "url",
                index: 0,
                parameters: [
                    {
                        type: "text",
                        text: "TESTCODE20"
                    }
                ]
            }
        ],
        carouselCards: [],
        location: {},
        paramsFallbackValue: {
            FirstName: "user"
        }
    }
    await axios.post('https://backend.aisensy.com/campaign/t1/api/v2', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
}
module.exports = runWhatsappFun;