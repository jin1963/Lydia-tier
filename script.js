const contractAddress = "0x8cede102e2ce12aed631f51fcec30db6d4ad93f2";
const tokenAddress = "0x6B088D3859F4ca3ea523da5841f677a8ec83e400";
const abi = ABI;

let contract;
let selectedTier = 240;

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.walletAddress = accounts[0];
            document.getElementById('wallet').innerText = window.walletAddress;
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, abi, signer);
            updateEarned();
        } catch (error) {
            alert("Wallet connection failed.");
        }
    }
}

async function stake() {
    const amount = document.getElementById('amount').value;
    if (!contract || !window.walletAddress) return alert("Connect wallet first");
    await contract.stake(ethers.utils.parseUnits(amount, 18));
}

async function claimReward() {
    if (!contract) return alert("Connect wallet first");
    await contract.claimReward();
}

async function withdraw() {
    if (!contract) return alert("Connect wallet first");
    await contract.withdraw();
}

async function updateEarned() {
    const earned = await contract.calculateReward(window.walletAddress);
    document.getElementById('earned').innerText = ethers.utils.formatUnits(earned, 18) + ' LYDIA';
}

function updateAPY() {
    selectedTier = parseInt(document.getElementById('tier').value);
    const rewardRatePerSecond = 0.0000015854896;
    const seconds = selectedTier * 24 * 60 * 60;
    const apy = ((rewardRatePerSecond * seconds) * 100).toFixed(2);
    document.getElementById('apy').innerText = apy;
}
