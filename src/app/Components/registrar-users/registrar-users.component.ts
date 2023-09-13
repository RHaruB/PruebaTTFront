import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IUsuario } from 'src/app/Interface/Usuario';
import { UsuarioService } from 'src/app/Service/usuario.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-registrar-users',
  templateUrl: './registrar-users.component.html',
  styleUrls: ['./registrar-users.component.sass']
})
export class RegistrarUsersComponent implements OnInit , OnDestroy{

  titulo: string = "Registrar  Usuario";
  usuariiAnt : string = ""
  Usuarios: IUsuario =
    {
      email: '',
      estado: true,
      id: 0,
      idCargo: 0,
      idDepartamento: 0,
      nombreCargo: '',
      nombreDepartamento: '',
      primerApellido: '',
      primerNombre: '',
      segundoApellido: '',
      segundoNombre: '',
      usuario: ''
    };

  
  public cargos: any[] = []
  public cargoSelect: number = 0;
  public departamentos: any[] = []
  public departamentoSelect: number = 0;
  expresiones = {
    texto: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    correo_: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  }
  constructor(private usuariSV: UsuarioService,    public dialogRef: MatDialogRef<AppComponent>
    ) {

  }
  ngOnDestroy(): void {
    localStorage.removeItem("usuario")
  }
  ngOnInit(): void {
    this.GetAllCargos();
    this.GetAllDepartamentos();
    this.obtenerDatos();
  }
  GetAllCargos() {
    this.usuariSV.getCargos().subscribe(resp => {
      console.log(resp);
      this.cargos = resp;
    })
  }
  GetAllDepartamentos() {
    this.usuariSV.getDepartamentos().subscribe(resp => {
      console.log(resp);
      this.departamentos = resp;
    })
  }

  onKeyPressTexto(event: KeyboardEvent) {
    const input = event.key;
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(input)) {
      event.preventDefault();
    }
  }
  validarDatos() {
    if (this.expresiones.texto.test(this.Usuarios.primerNombre)
      && this.expresiones.texto.test(this.Usuarios.segundoNombre)
      && this.expresiones.texto.test(this.Usuarios.primerApellido)
      && this.expresiones.texto.test(this.Usuarios.segundoApellido)
      && this.expresiones.correo_.test(this.Usuarios.email)
    ) {

      return true;
    }
    else if (this.expresiones.correo_.test(this.Usuarios.email)) {
      alert("Ingrese un correo valido")
      return false;
    } else {
      alert("Los datos son incorrectos")
      return false;
    }

  }
  ingresarPersona() {
    if (this.validarDatos()) {
      if (this.Usuarios.id === 0) {
        this.usuariSV.SetUsuarios(this.Usuarios).subscribe(resp => {
          console.log(resp)
          if (resp) {
            alert(resp.mensaje)
            this.dialogRef.close();
          }
          else {
            alert("No se pudo registrar el usuario");
          }

        });
      } else {
        this.Usuarios.usuario = this.usuariiAnt
        this.usuariSV.UpdateUsuarios(this.Usuarios).subscribe(resp => {
          console.log(resp)
          if (resp) {
            alert(resp.mensaje)
            this.dialogRef.close();
          }
          else {
            alert("No se pudo actuaizar el usuario");
          }

        });
        
      }
    }
  }
  cerrar(){
    this.dialogRef.close();
  }

  obtenerDatos() {
    if (localStorage.getItem("usuario")) {
      var datos = localStorage.getItem("usuario")
      this.Usuarios = JSON.parse(datos!)
      this.titulo = "Editar Usuario"
      this.usuariiAnt = this.Usuarios.usuario
    }

  }

}
