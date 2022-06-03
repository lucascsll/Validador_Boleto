import {clearMask} from "./clearMask";

export function getDateVencimentoBoleto(linhaDigitavel){

    const code = clearMask(linhaDigitavel)
    var vencimento = code.slice(33, 37); // captura 6075
    var date = new Date('10/08/1997');
    date.setTime(date.getTime() + (vencimento * 24 * 60 * 60 * 1000));

    return  ("0" + (date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()

}