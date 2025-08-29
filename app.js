const express = require('express');
const app = express();

app.use(express.json()); 

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body; 
        if (!Array.isArray(data)) {
            throw new Error('Invalid input: "data" must be an array');
        }

        const fullName = "Suhani_Sinha";
        const dob = "17102004";
        const userId = `${fullName.toLowerCase()}_${dob}`;
        const email = "suhanisinha123@gmail.com";
        const rollNumber = "22BSA10134";

        let evenNumbers = [];
        let oddNumbers = [];
        let alphabets = [];
        let specialCharacters = [];
        let sum = 0;
        let alphaChars = [];

        data.forEach(item => {
            if (typeof item !== 'string') return;
            if (/^\d+$/.test(item)) {
                const num = parseInt(item);
                sum += num;
                if (num % 2 === 0) evenNumbers.push(item);
                else oddNumbers.push(item);
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphaChars.push(...item);
            } else {
                specialCharacters.push(item);
            }
        });

        const reversedAlpha = alphaChars.reverse();
        let concatString = '';
        reversedAlpha.forEach((char, index) => {
            concatString += index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        });

        const response = {
            is_success: true,
            user_id: userId,
            email,
            roll_number: rollNumber,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
            concat_string: concatString || ""
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            is_success: false,
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});