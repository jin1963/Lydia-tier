
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('wallet').innerText = accounts[0];
        } catch (error) {
            alert('Wallet connection failed.');
        }
    }
}
function stake() { alert('Stake clicked'); }
function claimReward() { alert('Claim clicked'); }
function withdraw() { alert('Withdraw clicked'); }

document.getElementById('tier').addEventListener('change', function() {
    const days = parseInt(this.value);
    let apy = 0;
    if (days === 240) apy = 42;
    else if (days === 365) apy = 65;
    document.getElementById('apy').innerText = apy + '%';
});
