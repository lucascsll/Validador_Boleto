import { modulo10, modulo11Bancario } from '../Modulos/validarModulo';
import { convertToBoletoBancarioCodigoBarras } from '../ConversorBoleto/converterBoleto';
import { clearMask } from '../utils/clearMask';
import {getValueBoleto} from "../utils/getValueBoleto";
import {getDateVencimentoBoleto} from "../utils/getDateVencimentoBoleto";



export function boletoBancarioCodigoBarras(codigo) {
    const linhaDigitavel = clearMask(codigo);
    if (!/^[0-9]{44}$/.test(linhaDigitavel)) return false;
    const DV = linhaDigitavel[4];
    const bloco = linhaDigitavel.substring(0, 4) + linhaDigitavel.substring(5);
    return modulo11Bancario(bloco) === Number(DV);
}

export function boletoBancarioLinhaDigitavel(codigo, validarBlocos = false) {
    const linhaDigitavel = clearMask(codigo);
    if (!/^[0-9]{47}$/.test(linhaDigitavel)) return false;
    const blocos = [
        {
            num: linhaDigitavel.substring(0, 9),
            DV: linhaDigitavel.substring(9, 10),
        },
        {
            num: linhaDigitavel.substring(10, 20),
            DV: linhaDigitavel.substring(20, 21),
        },
        {
            num: linhaDigitavel.substring(21, 31),
            DV: linhaDigitavel.substring(31, 32),
        },
    ];
    const validBlocos = validarBlocos ? blocos.every(e => modulo10(e.num) === Number(e.DV)) : true;
    const validarDigitoVerificador = boletoBancarioCodigoBarras(convertToBoletoBancarioCodigoBarras(linhaDigitavel));
    return (validBlocos && validarDigitoVerificador ? getInformacoesBoleto(linhaDigitavel) : {
        status:'error',
        message:'Boleto invalido'
    });
}

export function boletoBancario(codigo, validarBlocos = false) {
    const linhaDigitavel = clearMask(codigo);
    if (linhaDigitavel.length === 44) return  boletoBancarioCodigoBarras(linhaDigitavel);
    if (linhaDigitavel.length === 47) return boletoBancarioLinhaDigitavel(codigo, validarBlocos);
    return  {
        status:'error',
        message:'Quantidade de caracteres invalido'
    };
}

export function getInformacoesBoleto(codigo){
    const payload = {
    barCode: convertToBoletoBancarioCodigoBarras(codigo),
    amount: getValueBoleto(codigo),
    expirationDate: getDateVencimentoBoleto(codigo)

    }
return payload;
}