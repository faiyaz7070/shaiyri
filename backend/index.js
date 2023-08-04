const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
require('dotenv').config();

const app = express();


app.use(cors());

app.use(express.json());


app.get('/',(req,res)=> {
    res.send('Shayari ');
})

app.post('/shayari', async (req, res) => {

    const word = req.body.keyword;

    const prompt = `Generate a Shayari based on the keyword: ${word}`;
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
        
            temperature: 0.5,
            max_tokens: 70,
            messages: [{ role: 'system', 
          
            content: 'You are a shayari generator in hi.' }, { role: 'user', content: prompt }],
        },
        {

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`,
            },
        }
    );

    const shayari = response.data.choices[0].message.content;
    res.json({ shayari });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
