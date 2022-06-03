export function getValueBoleto(linhaDigitavel){
    var valorBoleto = parseFloat(linhaDigitavel.substring(linhaDigitavel.length - 10, linhaDigitavel.length)).toString()
    if (valorBoleto.length == 2) {
        var valorFinalBoleto = "0," + valorBoleto;

    }else if (valorBoleto.length == 1) {
        var valorFinalBoleto = "0,0" + valorBoleto;

    } else {
        var valorFinalBoleto = valorBoleto.substring(0, valorBoleto.length -2) + "," + valorBoleto.substring(valorBoleto.length -2, valorBoleto.length);
    }
    return valorFinalBoleto
}