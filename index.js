document.addEventListener('DOMContentLoaded', function() {
    const fromVal = document.getElementById('fromVal');
    const toVal = document.getElementById('toVal');
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const exchangeRateDiv = document.getElementById('exchangeRate');
    const swapBtn = document.getElementById('swaps');

    // No API key needed for this endpoint
    const BASE_URL = `https://api.exchangerate-api.com/v4/latest/`;

    async function convert() {
        const from = fromVal.value;
        const to = toVal.value;
        const amount = parseFloat(input.value);

        if (!amount || amount <= 0) {
            output.value = '';
            exchangeRateDiv.textContent = '';
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}${from}`);
            const data = await res.json();
            if (data && data.rates && data.rates[to]) {
                const rate = data.rates[to];
                output.value = (amount * rate).toFixed(2);
                exchangeRateDiv.style.display= 'block';
                exchangeRateDiv.textContent = `1 ${from} = ${rate} ${to}`;
            } else {
                exchangeRateDiv.textContent = "Error fetching rates.";
            }
        } catch (err) {
            exchangeRateDiv.textContent = "Network error.";
        }
    }

    input.addEventListener('input', convert);
    fromVal.addEventListener('change', convert);
    toVal.addEventListener('change', convert);

    swapBtn.addEventListener('click', function() {
        const temp = fromVal.value;
        fromVal.value = toVal.value;
        toVal.value = temp;
        convert();
    });
});
