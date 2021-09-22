import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmpleadosService } from '../../services/empleados.service';
import { Empleados } from 'src/app/models/empleados';

declare var M:any; //Varviable para las notificaciones de Materialize

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  constructor(public empleadoService: EmpleadosService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  addEmpleado(empleadoForm:NgForm){
    //console.log(empleadoForm.value);

    //Si existe un id ya definido en el formulario 
    if (empleadoForm.value._id){  //Actualizamos
      this.empleadoService.putEmpleado(empleadoForm.value)
                          .subscribe(
                            res=>{
                              //console.log(res);
                              M.toast({html:'Empleado actualizado correctamente'});
                              this.getEmpleados();
                            },
                            err=>{
                              console.log(err);
                              M.toast({html:'Error al actualizar el emlpeado'});
                            }
                          );
    }else { //Insertamos
        //Guardarlos en la base de datos mediante el web service
        this.empleadoService.addEmpleado(empleadoForm.value)
                            .subscribe(
                            res =>{
                              //console.log(res);
                              M.toast({html: 'Empleado guardado correctamente'});
                              this.getEmpleados();
                            },
                            err=>{
                              console.log(err);
                              M.toast({html: 'Error al guardar empleado'});
                            }                            
                          );
    }//else
    empleadoForm.reset();
  }//Fin del addEmpleado

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
    this.empleadoService.empleado = new Empleados();
  }

  //Obtener los empleados de la base de datos
  getEmpleados(){
      this.empleadoService.getEmpleados()
                          .subscribe(
                            res =>{
                              this.empleadoService.empleados = res as Empleados[];
                              //console.log(res);  
                            },
                            err=>{
                              console.log(err);
                              M.toast({html: 'Error al guardar el empleado'});
                            }
                          )
  }//Fin del getEmpleado

  editarEmpleado(empleado: Empleados){
    //Asociamos los datos del empleado con el modelo de datos para asignarlos al formulario
    this.empleadoService.empleado = empleado;
  }//Fin de editarEmpleado

  eliminarEmpleado(_id:String){//_id:String
    if(confirm('¿Esta seguro de eliminar al empleado')){
      this.empleadoService.deleteEmpleado(_id)
      .subscribe(
        res=>{
          M.toast({html:'Empleado eliminado correctamente'});
          this.getEmpleados();
        },
        err=>{
          M.toast({html: 'Error al eliminar el empleado'});
        }
      ); //Suscribe
    }//if
  }//Fin de eliminarEmpleado

}//Fin de la clase
