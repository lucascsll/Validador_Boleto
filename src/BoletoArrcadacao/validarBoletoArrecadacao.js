import { modulo10, modulo11Arrecadacao } from '../Modulos/validarModulo';
import { convertToBoletoArrecadacaoCodigoBarras } from '../ConversorBoleto/converterBoleto';
import { clearMask } from '../utils/clearMask';

export function boletoArrecadacaoCodigoBarras(codigo) {
    const linhaDigitavel = clearMask(codigo);
    if (!/^[0-9]{44}$/.test(linhaDigitavel) || Number(linhaDigitavel[0]) !== 8) return false;
    const codigoMoeda = Number(linhaDigitavel[2]);
    const digitoVerificador = Number(linhaDigitavel[3]);
    const bloco = linhaDigitavel.substring(0, 3) + linhaDigitavel.substring(4);
    let modulo;
    if (codigoMoeda === 6 || codigoMoeda === 7) modulo = modulo10;
    else if (codigoMoeda === 8 || codigoMoeda === 9) modulo = modulo11Arrecadacao;
    else return false;
    return modulo(bloco) === digitoVerificador;
}

export function boletoArrecadacaoLinhaDigitavel(codigo, validarBlocos = false) {
    const linhaDigitavel = clearMask(codigo);
    if (!/^[0-9]{48}$/.test(linhaDigitavel) || Number(linhaDigitavel[0]) !== 8) return false;
    const validDV = boletoArrecadacaoCodigoBarras(convertToBoletoArrecadacaoCodigoBarras(linhaDigitavel));
    if (!validarBlocos) return validDV;
    const codigoMoeda = Number(linhaDigitavel[2]);
    let modulo;
    if (codigoMoeda === 6 || codigoMoeda === 7) modulo = modulo10;
    else if (codigoMoeda === 8 || codigoMoeda === 9) modulo = modulo11Arrecadacao;
    else return false;
    const blocos = Array.from({ length: 4 }, (v, index) => {
        const start = (11 * (index)) + index;
        const end = (11 * (index + 1)) + index;
        return {
            num: linhaDigitavel.substring(start, end),
            DV: linhaDigitavel.substring(end, end + 1),
        };
    });
    const validBlocos = blocos.every(e => modulo(e.num) === Number(e.DV));
    return (validBlocos && validDV ? validBlocos && validDV : {
        status:'error',
        message:'Boleto invalido'
    } );
}

export function boletoArrecadacao(codigo, validarBlocos = false) {
    const linhaDigitavel = clearMask(codigo);
    if (linhaDigitavel.length === 44) return boletoArrecadacaoCodigoBarras(linhaDigitavel);
    if (linhaDigitavel.length === 48) return console.log(boletoArrecadacaoLinhaDigitavel(codigo, validarBlocos));
    return  {
        status:'error',
        message:'Quantidade de caracteres invalido'
    };
}