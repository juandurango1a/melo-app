document.addEventListener('DOMContentLoaded', () => {
    const packageCards = document.querySelectorAll('.package-card');
    const toppingInputs = document.querySelectorAll('.topping-option input');
    const totalPriceEl = document.getElementById('total-price');
    const scheduleBtn = document.getElementById('schedule-btn');
    const messageEl = document.getElementById('message');

    let basePrice = 0;

    packageCards.forEach(card => {
        const input = card.querySelector('input');
        input.addEventListener('change', () => {
            packageCards.forEach(c => c.classList.remove('selected'));
            if (input.checked) {
                card.classList.add('selected');
                basePrice = parseFloat(card.dataset.price);
            }
            updateTotal();
        });
    });

    toppingInputs.forEach(input => {
        input.addEventListener('change', updateTotal);
    });

    function updateTotal() {
        let toppingTotal = 0;
        toppingInputs.forEach(input => {
            if (input.checked) {
                toppingTotal += parseFloat(input.parentElement.dataset.price);
            }
        });
        const total = basePrice + toppingTotal;
        totalPriceEl.textContent = `$${total}`;
    }

    scheduleBtn.addEventListener('click', () => {
        if (basePrice === 0) {
            alert('Por favor selecciona un paquete.');
            return;
        }
        messageEl.classList.remove('hidden');
        setTimeout(() => messageEl.classList.add('hidden'), 3000);
    });
});
