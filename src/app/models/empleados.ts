export class Empleados {
    constructor(_id:String = '', nombre:String = '',
                puesto:String = '', departamento:String = '', salario:number = 0){
            this._id = _id;
            this.nombre = nombre;
            this.puesto = puesto;
            this.departamento = departamento;
            this.salario = salario;
    }//Fin del constructor

    //Definimos sus atributos de la clase
    _id: String;
    nombre: String;
    puesto: String;
    departamento: String;
    salario: Number;
}
