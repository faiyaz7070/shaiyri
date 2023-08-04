const generateBtn = document.getElementById('generateBtn');
const shayariOutput = document.getElementById('Output');

generateBtn.addEventListener('click', async () => {
    const keyword = document.getElementById('word').value;

    if (keyword) {
        try {
            const response = await fetch('http://localhost:8080/shayari', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ keyword }),
            });
           

            if (!response.ok) {
                throw new Error('error');
            }
          

            const data = await response.json();
            shayariOutput.innerHTML = `<p>${data.shayari}</p>`;
        } catch (error) {
            console.error('Error', error);
           
        }
    }
});
