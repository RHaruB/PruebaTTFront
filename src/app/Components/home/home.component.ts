import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Service/usuario.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  title = 'PruebaTTFront';


  constructor(private usuariSV: UsuarioService){

  }
  ngOnInit(): void {

  }
  

}
