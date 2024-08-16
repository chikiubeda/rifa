document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('raffleTable');
    const message = document.getElementById('message');
    const participantNameInput = document.getElementById('participantName');
    
    // Cargar celdas ocupadas desde localStorage
    const occupiedCells = JSON.parse(localStorage.getItem('occupiedCells')) || {};

    // Generar la tabla 10x10
    for (let i = 0; i < 10; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 10; j++) {
            const cell = row.insertCell();
            const number = i * 10 + j + 1;
            cell.textContent = number;

            if (occupiedCells[number]) {
                cell.classList.add('occupied');
                cell.textContent += ` (${occupiedCells[number]})`;
            } else {
                cell.classList.add('available');
            }

            cell.addEventListener('click', () => {
                const participantName = participantNameInput.value.trim();

                if (!participantName) {
                    message.textContent = "Por favor, ingresa tu nombre.";
                    return;
                }

                if (occupiedCells[number]) {
                    message.textContent = `El número ${number} ya está ocupado por ${occupiedCells[number]}.`;
                } else {
                    occupiedCells[number] = participantName;
                    localStorage.setItem('occupiedCells', JSON.stringify(occupiedCells));

                    cell.classList.remove('available');
                    cell.classList.add('occupied');
                    cell.textContent = `${number} (${participantName})`;
                    message.textContent = `¡Número ${number} seleccionado por ${participantName}!`;
                }
            });
        }
    }
});