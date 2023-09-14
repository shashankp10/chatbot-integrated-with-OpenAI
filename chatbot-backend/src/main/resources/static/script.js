document.addEventListener('DOMContentLoaded', function() {
    const fetchDataButton = document.getElementById('fetchDataButton');
    const dataContainer = document.getElementById('dataContainer');
    const userInput = document.getElementById('userInput');

    fetchDataButton.addEventListener('click', async function() {
        const userInputValue = userInput.value;
        const apiUrl = `http://localhost:8080/openai/chat?prompt=${encodeURIComponent(userInputValue)}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const textData = await response.text();
            dataContainer.textContent = textData;
        } catch (error) {
            console.error('Error fetching data:', error);
            dataContainer.textContent = 'An error occurred while fetching data.';
        }
    });
});
