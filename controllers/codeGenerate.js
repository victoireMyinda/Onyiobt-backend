const codeGenerate = () => {
    let allCharacters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let codeLength = 14;
    let convertInString = "";

    for (let i = 0; i <= codeLength; i++) {
        let convertRandom = Math.floor(Math.random() * allCharacters.length);
        convertInString += allCharacters.substring(convertRandom, convertRandom + 1);
    }

    let splitArray = convertInString.split('');
    splitArray[9] = '-';

    let accountNumber = splitArray.join().replace(/[,]/g, '');
    //verify if code exists
    return accountNumber

}

module.exports = codeGenerate