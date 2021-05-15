const tipoArray = ["Promoción", "Acuerdo Comercial", "Plan de Compra", "Campaña"]
export const mapTipoToIntegerIdTipo = (tipo) =>{
    if(typeof tipo === 'string'){
        return tipoArray.indexOf(tipo);
    }
    return tipo;
}