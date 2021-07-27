class Egreso extends Dato{

    static contadorEgreso = 0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        this.idEgreso = ++Egreso.contadorEgreso;
    }
    get Egreso(){
        return this.idEgreso;
    }
}