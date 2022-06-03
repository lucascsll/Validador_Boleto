import { boletoArrecadacao } from '../BoletoArrcadacao/validarBoletoArrecadacao';
import { boletoBancario } from '../BoletoBancario/validarBoletoBancario';
import { clearMask } from '../utils/clearMask';

export  function boleto(codigo, validarBlocos = false) {

    const linhaDigitavel = clearMask(codigo);

    if (Number(linhaDigitavel[0]) === 8) return  boletoArrecadacao(linhaDigitavel, validarBlocos);

    return boletoBancario(linhaDigitavel, validarBlocos)


}

