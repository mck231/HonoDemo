document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-button');
    const elementsTextArea = document.getElementById('elements-textarea');

    if (fetchButton && elementsTextArea) {
        fetchButton.addEventListener('click', async () => {
            try {
                const response = await fetch('http://localhost:3000/api/elements');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                elementsTextArea.value = JSON.stringify(data, null, 2);
            } catch (error) {
                console.error('Error fetching elements:', error);
                elementsTextArea.value = 'Error fetching elements';
            }
        });
    }
});