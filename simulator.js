function generateInputs() {
    const container = document.getElementById('machinesContainer');
    const currentMachines = container.children.length;
    
    const machineDiv = document.createElement('div');
    machineDiv.className = 'machine-input';
    machineDiv.innerHTML = `
        <div class="form-group">
            <label>Máquina ${currentMachines + 1} - Capacidade (BTUs):</label>
            <input type="number" class="btu-input form-control" 
                   min="1000" step="1000" placeholder="Ex: 12000"
                   oninput="validateInput(this)">
            <small class="text-muted">Insira um valor maior que zero</small>
        </div>
    `;
    container.appendChild(machineDiv);
}

function validateInput(input) {
    if (input.value < 0) {
        input.value = '';
        input.classList.add('is-invalid');
        setTimeout(() => input.classList.remove('is-invalid'), 500);
    }
}

function calculateBudget() {
    const inputs = document.querySelectorAll('.btu-input');
    const result = document.getElementById('result');
    result.className = 'result';
    
    let totalBTUs = 0;
    let isValid = true;
    let errorMessage = '';

    inputs.forEach((input, index) => {
        const btus = parseInt(input.value);
        if (isNaN(btus) || btus <= 0) {
            isValid = false;
            errorMessage = `Por favor, insira um valor válido para a Máquina ${index + 1}`;
            input.classList.add('is-invalid');
            setTimeout(() => input.classList.remove('is-invalid'), 500);
            return;
        }
        totalBTUs += btus;
    });

    if (!isValid) {
        result.innerHTML = `<div class="error">${errorMessage}</div>`;
        result.classList.add('show');
        return;
    }

    const pricePerUnit = 100;
    const monthlyBudget = Math.ceil(totalBTUs / 12000) * pricePerUnit;

    result.innerHTML = `
        <div>
            <p>Capacidade Total: <strong>${totalBTUs.toLocaleString()} BTUs</strong></p>
            <p>Orçamento Mensal: <span class="price">R$ ${monthlyBudget.toLocaleString()},00</span></p>
        </div>
    `;
    
    result.classList.add('show');
}

// Initialize with one input field when modal opens
document.getElementById('simulatorModal').addEventListener('shown.bs.modal', function () {
    const container = document.getElementById('machinesContainer');
    if (container.children.length === 0) {
        generateInputs();
    }
});