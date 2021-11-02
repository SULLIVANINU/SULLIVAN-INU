let web3 = new Web3(Web3.givenProvider);
let ContractAddress = "0x0484fbca58ad880f2232b9ef7bc1d23206236bbd";
let ContractSub = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
const INT_10_POW_18 = 1000000000000000000;
const Decimals = 1000000000;
let contract = new web3.eth.Contract(abi,ContractAddress);
let subcontract = new web3.eth.Contract(abi,ContractSub);
const STATUS = {
    CONNECT: "Connect your wallet",
    DISCONNECT: "Wallet Connected",
};
reconnect();
ethereum.on('accountsChanged', function (accounts) {
   getAccount();
});
$('#connect-wallet').on("click",function(){
    if (typeof window.ethereum !== 'undefined') {
        if($(this).text()==STATUS.CONNECT){
          getAccount();
        }
        else {
          disconnect();
        }
    }
    else {
      alert('MetaMask is installed!');
    }
       
});
function changestatus(status){
   $("#connect-wallet").text(status);
}
async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
        // console.log(result);
        const account = result[0];
        localStorage.setItem("METAMASK_CONNECT", "1");
        localStorage.setItem("METAMASK_ADDRESS", account);
        getcontract(account);
        getsubcontract(account);
        changestatus(STATUS.DISCONNECT);
    })
    .catch((error) => {
        console.log("error");
    });
}
function disconnect(){
    web3.eth.accounts.wallet.remove(ethereum.selectedAddress);
    localStorage.setItem("METAMASK_CONNECT", "0");
    localStorage.setItem("METAMASK_ADDRESS", '');
    changestatus(STATUS.CONNECT);
    show('00.00');
    console.log(ethereum.selectedAddress);
}
function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
function reconnect(){
    var status = localStorage.getItem("METAMASK_CONNECT");
        address = localStorage.getItem("METAMASK_ADDRESS");
    if(status==1 && address!=''){
        getAccount();
    }
}
function getcontract(address) {
    contract.methods.balanceOf(address).call().then(e => {
        var result = parseFloat(parseFloat(e)/Decimals).toFixed(3);
        show(result);
    });
}
function getsubcontract(address) {
    subcontract.methods.balanceOf(address).call().then(e => {
        var result = parseFloat(parseFloat(e)/INT_10_POW_18).toFixed(3);
        reward(result);
    });
}
function show(result){
    $("#SHIBA").html(formatNumber(result));
}
function reward(result){
    $("#reward").html(formatNumber(result));
}