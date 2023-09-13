import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/Interface/Usuario';
import { UsuarioService } from 'src/app/Service/usuario.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarUsersComponent } from '../registrar-users/registrar-users.component';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.sass']
})
export class TablaUsuariosComponent implements OnInit {
  public cargos : any[]  = []
  public cargoSelect : number = 0;
  public departamentos : any[]  = []
  public departamentoSelect : number = 0;
  Usuari: IUsuario = 
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
  Usuarios: IUsuario[] = [
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
    }
  ];

  constructor(private usuarioSV: UsuarioService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.GetUsuarios();
    this.GetAllCargos();
    this.GetAllDepartamentos();
  }
  displayedColumns: string[] = ['Usuario', 'Nombres', 'Apellidos', 'Departamento', 'Cargo', 'Email', 'Acciones'];
  dataSource = this.Usuarios;

  GetUsuarios() {
    this.usuarioSV.GetAllUsuarios().subscribe(resp => {
      console.log(resp);
      this.Usuarios = resp;
    })
  }
  openConfirmationDialog(usuario: IUsuario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px', // Define el ancho del cuadro de diálogo según tus necesidades
      data: {
        message: '¿Estás seguro de que deseas continuar?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usuarioSV.DeleteUsuarios(usuario).subscribe(resp=>{
      
          if(resp){
            alert("Se elmino correctamente");
            this.ngOnInit();
          }else{
            alert("No se pudo eliminar la persona")
          }
        });
        console.log('Usuario confirmó');
      } else {
        // El usuario canceló la acción
        console.log('Usuario canceló');
      }
    });
  }

  Update(usuario:IUsuario){
    localStorage.setItem("usuario",JSON.stringify(usuario));
    const dialogRef = this.dialog.open(RegistrarUsersComponent, {
      width: '600px',
      panelClass: 'fondo',
      data: null
    })
    dialogRef.afterClosed().subscribe(() => {
      
      this.ngOnInit();
    });
  }

  GetAllCargos(){
    this.usuarioSV.getCargos().subscribe(resp=>{
      console.log(resp);
      this.cargos = resp;
    })
  }
  GetAllDepartamentos(){
    this.usuarioSV.getDepartamentos().subscribe(resp=>{
      console.log(resp);
      this.departamentos = resp;
    })
  }
  CrearUsuario(){
    const dialogRef = this.dialog.open(RegistrarUsersComponent, {
      width: '600px',
      panelClass: 'fondo',
      data: null
    })
    dialogRef.afterClosed().subscribe(() => {
      
      this.ngOnInit();
    });

  }
  GetUsuariosFiltros() {
 console.log(this.Usuari)
    this.usuarioSV.GetUsuariosFiltros(this.Usuari).subscribe(resp => {
      console.log(resp);
      this.Usuarios = resp;
    })
  }
}