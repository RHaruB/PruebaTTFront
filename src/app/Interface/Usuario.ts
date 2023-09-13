export interface IUsuario {
    id: number;
    primerNombre : string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    usuario: string;
    idDepartamento : number;
    nombreDepartamento : string;
    idCargo : number;
    nombreCargo : string;
    estado : boolean;
    email : string;
}