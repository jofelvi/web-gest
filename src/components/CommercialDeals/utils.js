export const goToNextIfValidationOk = (errors, setState, isVisible)=>{
    
    if(errors && (!errors.nombre && !errors.tipo && !errors.fechainicio && !errors.fechafin && !errors.margen && !errors.ind_surtido ))
    {
        this.setState({isVisible: true})
    }else{
        this.setState({isVisible: false})
    }
}