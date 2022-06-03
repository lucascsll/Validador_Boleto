import { Router } from 'express';
import {boleto} from '../Boletos/validateBoleto'

const routes = new Router();

routes.get('/boleto/:linhaDigitavel', (req,res)=>{

    const validarBoleto = boleto(req.params.linhaDigitavel)

   return ((validarBoleto.status==='error') ?  res.status(400).json(validarBoleto) : res.status(200).json(validarBoleto))

});


export default routes;