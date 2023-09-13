import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from 'src/app/Interface/Usuario';
import { UsuarioService } from 'src/app/Service/usuario.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.sass']
})
export class TablaUsuariosComponent implements OnInit {

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

  constructor(private usuarioSV: UsuarioService) {

  }
  ngOnInit(): void {
    this.GetUsuarios();
  }
  displayedColumns: string[] = ['Usuario', 'Nombres', 'Apellidos', 'Departamento', 'Cargo', 'Email', 'Acciones'];
  dataSource = this.Usuarios;

  GetUsuarios() {
    this.usuarioSV.GetAllUsuarios().subscribe(resp => {
      console.log(resp);
      this.Usuarios = resp;
    })
  }
}