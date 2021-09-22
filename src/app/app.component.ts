import { Component } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

//Variable para los eventos de Materialize
declare var M:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Iniciar Sesión'; //Aparecer al inicio de la aplicación

  public user: SocialUser | undefined; //Indefinido es porque al inicio de la app no tiene valores
  public loggedIn: boolean = false; //Contiene verdadero si el usuario inicio sesión

  //Constructor
  constructor(private authService: SocialAuthService){
    this.authService.authState.subscribe( (user)=>{
      this.user = user;
      this.loggedIn = (user != null);
    });
  }//Fin del constructor

  //Ligin con Google
  signInWithGoogle(): void {
    console.log("Google");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.title = "Lista de empleados";
  } //Fin de signInWithGoogle

  //Login con Facebook
  signInWithFacebook():void{
      console.log("Facebook");
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.title ="Lista de empleados";
  }//Fin de signInWithFacebook  

  //Salir - Logout
  signOut():void{
    console.log("Salir");
    this.authService.signOut();
    this.title="Iniciar Sesión";
  }//Fin de signOut
}//Fin de la class AppComponent
