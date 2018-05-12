import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import swal from 'sweetalert2';
import { Users } from './users';

declare let jQuery:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  toogleDelete:boolean = false; toogleEdit: boolean = false; toogleLevel: boolean = false;
  users: any[] = []; userEdit: any; stateEdit: any; user: any; impEdit: any; levelEdit: any;
  states: string; createState: string; createImp: string; createLevel: any; usuario: string; nombres: string; password: string;

  rForm: FormGroup; seeForm: FormGroup; passwordForm: FormGroup; resetForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {Users[]} 
   */
  count: Users[];

  /**
   * @type {Users} 
   */

  filter: Users = new Users();

  /**
   * @type {number} 
   */
  numberOfUsers: number;

  /**
   * @type {number} 
   */
  limit: number;

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 10,
      currentPage: 1
  };
  public labels: any = {
      previousLabel: 'Anterior',
      nextLabel: 'Siguiente',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  constructor(private _userservie: UsersService, private fb: FormBuilder) {

    this.rForm = fb.group({
      'usuario': [null, Validators.required],
      'nombres': [null, Validators.required],
      'password': [null, Validators.required],
      'nivel': [null, Validators.required],
      'tipoimpresora': [null, Validators.required], 
      'estado': [null, Validators.required],             
    });

    this.seeForm = fb.group({
      'usuario-ver': [null, Validators.required],
      'nombres-ver': [null, Validators.required],      
    });

    this.passwordForm = fb.group({
      'antigua': [null, Validators.required],
      'nueva': [null, Validators.required],      
    });

    this.resetForm = fb.group({
      'reset': [null, Validators.required],    
    });

  }

  ngOnInit() {
    jQuery( window ).resize( function () {
      if(jQuery( window ).width() <= 600) {
        console.log('entro')
       document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
      } else {
       document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
      }
      console.log(jQuery( window ).width());
    })
    this._userservie.getUsers().subscribe(data => {
      this.users = data.usuarios;
      this.states = data.estados;
    });
    this._userservie.getUsersFilter().subscribe(
      (count: Users[]) => {
        this.count = count;
        this.numberOfUsers = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    if (localStorage.getItem('nivel') != '1') {
      this.toogleLevel = true;
      /* document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
      document.getElementById('btn-footer-reset').setAttribute('style', 'visibility: hidden');
      document.getElementById('btn-footer-pss').setAttribute('style', 'visibility: hidden');    
      document.getElementById('btn-footer-create').setAttribute('style', 'visibility: hidden');         */
    }
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-changePassword').modal();
    jQuery('#modal-resetPassword').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#nomusuarioEdit').prop('disabled',true);
      jQuery('#nomapeEdit').prop('disabled',true);
      jQuery('#passwordEdit').prop('disabled',true);
      jQuery('#nivelEdit').prop('disabled',true);
      jQuery('#estadoEdit').prop('disabled',true);
      jQuery('#tipoimpresoraEdit').prop('disabled',true);
      this.toogleEdit = false;    
      jQuery('#btn-edit').prop('disabled', true); 
     }});
     jQuery('#registros').on('change', () => {
      this.config.itemsPerPage = Number(jQuery('#registros').val()); 
      console.log(jQuery('#registros').val());
      if (jQuery('#registros').val() == '10') {
        document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
      } else {
        document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
      }
    })
  }

  selectClicked(){
    jQuery('#btn-edit').prop('disabled', false);    
  }

  inputClicked() {
    console.log('input clicked')
    this.toogleEdit = true;
    this.onChanges()
  }

  onChanges(): void { 
    this.seeForm.valueChanges.subscribe(val => {  
      if(this.seeForm.valid == true && this.toogleEdit == true) {
        jQuery('#btn-edit').prop('disabled', false);
      } else if(this.seeForm.valid == false){    
        jQuery('#btn-edit').prop('disabled', true);
      }
    });
  }

  resetForms() {
    this.rForm.reset();
    this.seeForm.reset();
  }
  
  resetP(){
    this.passwordForm.reset();
    jQuery('input[type=text]').attr({style:' box-shadow: none'});        
  }

  resetF(){
    jQuery('input[type=text]').attr({style:' box-shadow: none'});        
    this.resetForm.reset();
  }
  
  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  openModal (user) {
    this.toogleEdit = false;    
    this.userEdit = Object.assign({}, user);
    for (let i = 0; i < this.states.length; i++) {
      if ( user.estado == this.states[i]['nombre']) {
        this.stateEdit = this.states[i]['nombre'];
      }
    }
    for (let i = 0; i < 2; i++) {
      if ( user.tipoImpresora == 'L' ) {
        this.impEdit = 'Láser';
      } else if ( user.tipoImpresora == 'P' ){
        this.impEdit = 'Post';
      }
    }
    jQuery('input[type=text]').attr({style:' box-shadow: none'});    
    jQuery('#modal-see').modal('open');
    document.getElementsByClassName('table-radio');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');  
  }

  updateUser() {
    if(this.userEdit){
      this._userservie.updateUsers({'id': this.userEdit.id, 'login': this.userEdit.login, 'nombre': this.userEdit.nombre, 'password': this.userEdit.password, 
                                    'password_confirmation': this.userEdit.password,'nivel': this.levelEdit, 'estado_id': this.user,  
                                    'tipoImpresora': this.impEdit ,'usuariocre': "admin",'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
        data => {
          console.log(data)
          if ( data.status == "updated") {
            swal({
              title: 'Registro actualizado con éxito',
              text: '',
              type: 'success',
              onClose: function reload() {
                        location.reload();
                      }
            })
          } else if ( data.error = "Entidad no aceptable o error de clave foranea" ) {
            swal(
              'No se pudo actualizar registro, datos incorrectos',
              '',
              'warning'
            )
          }
        },
        error =>{
          swal(
            'No se pudo actualizar el registro',
            '',
            'warning'
          )
        }
      );
    }
  }

  createUser(post){
    this.usuario = post.usuario;
    this.nombres = post.nombres;
    this.password = post.password;
    this.createLevel = post.nivel;
    this.createState = post.estado;
    this.createImp = post.tipoimpresora;
    if (post) {
      this._userservie.createUsers({ 'login': this.usuario, 'nombre': this.nombres, 'password': this.password, 'password_confirmation': this.password,
                                     'nivel': this.createLevel, 'usuariocre': "admin", 'estado_id': this.createState,
                                     'tipoImpresora': this.createImp, 'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
        data => {
          if ( data.status == "created") {
            swal({
              title: 'Registro creado con éxito',
              text: '',
              type: 'success',
              onClose: function reload() {
                        location.reload();
                      }
            })
          } else if ( data.error = "Entidad no aceptable o error de clave foranea" ) {
            swal(
              'No se pudo crear registro, datos incorrectos',
              '',
              'warning'
            )
          }
        },
        error =>{
          swal(
            'No se pudo crear el registro',
            '',
            'warning'
          )
        });
    }
  } 

  deleteUser(){
    swal({
      title: '¿Desea eliminar el registro?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        if (this.userEdit) {
          this._userservie.deleteUsers(this.userEdit.id).subscribe(
            data => {
              if ( data.status == "deleted") {
                swal({
                  title: 'Registro eliminado con éxito',
                  text: '',
                  type: 'success',
                  onClose: function reload() {
                            location.reload();
                          }
                })
              } else if ( data.error = "Entidad no aceptable o error de clave foranea" ) {
                swal(
                  'No se pudo eliminar el registro ya que tiene relación con otro módulo del sistema',
                  '',
                  'warning'
                )
              }
            },
            error =>{
              swal(
                'No se pudo eliminar el registro',
                '',
                'warning'
              )
            });
        } 
      }
    })
  }

  changePassword(post) {
    if(post){
      this._userservie.changePassword({'id': this.userEdit.id, 'antiguaP': post.antigua, 'nuevaP': post.nueva,  
                                      'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
        data => {
          console.log(data)
          if ( data.message == "Contraseña actualizada!") {
            swal({
              title: 'Contraseña actualizada con éxito',
              text: '',
              type: 'success',
              onClose: function reload() {
                        location.reload();
                      }
            })
          } else  if ( data.message == "Error!") {
            swal(
              'No se pudo actualizar la contraseña',
              '',
              'warning'
            )
          } if ( data.message == "Contraseña antigua incorrecta!") {
            swal(
              'Contraseña antigua incorrecta!',
              '',
              'warning'
            )
          }
        },
        error =>{
          swal(
            'No se pudo actualizar el registro',
            '',
            'warning'
          )
        });
    }
  }

  resetPassword(post) {
    if(post){
      this._userservie.resetPassword({'id': this.userEdit.id,  'nuevaP': post.reset,  
                                      'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
        data => {
          console.log(data)
          if ( data.message == "Contraseña cambiada!") {
            swal({
              title: 'Contraseña actualizada con éxito',
              text: '',
              type: 'success',
              onClose: function reload() {
                        location.reload();
                      }
            })
          } else  if ( data.message == "Error!") {
            swal(
              'No se pudo actualizar la contraseña',
              '',
              'warning'
            )
          } if ( data.message == "Contraseña antigua incorrecta!") {
            swal(
              'Contraseña antigua incorrecta!',
              '',
              'warning'
            )
          }
        }, 
        error =>{
          swal(
            'No se pudo actualizar el registro',
            '',
            'warning'
          )
        }
      );
    }
  }

  selectData(user){
    this.userEdit = user;
  }

  selectAll() {
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var radios = <HTMLInputElement><any>document.getElementsByName('group2');
    var cantidad = document.getElementsByName('group1');
    var rows = <HTMLInputElement><any>document.getElementsByName('rows');
    
    if (radios[0].checked){
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
      document.getElementById('btn-footer-pss').setAttribute('style', 'visibility: visible');
      document.getElementById('btn-footer-reset').setAttribute('style', 'visibility: visible');
      console.log(cantidad.length)
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = true;
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      }
    } else {
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
      document.getElementById('btn-footer-pss').setAttribute('style', 'visibility: hidden');
      document.getElementById('btn-footer-reset').setAttribute('style', 'visibility: hidden');
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = false;
        rows[i].setAttribute("style", "background-color : none");
      }
    }
  }

  selectRow() {
    var rows = <HTMLInputElement><any>document.getElementsByName('rows');
    var radios = <HTMLInputElement><any>document.getElementsByName('group2');
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var cantidad = document.getElementsByName('group1');

    if (this.toogleDelete == true) {
      if(this.toogleLevel == false){
        document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
        document.getElementById('btn-footer-pss').setAttribute('style', 'visibility: hidden');
        document.getElementById('btn-footer-reset').setAttribute('style', 'visibility: hidden');
      }
      this.toogleDelete = false;
    }
    
    for(var i = 0; i < cantidad.length; i++ ){
      if(check[i].checked){
        console.log('false');
        this.toogleDelete = true;
        if (localStorage.getItem('nivel') == '1') {
          document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
          document.getElementById('btn-footer-pss').setAttribute('style', 'visibility: visible');
          document.getElementById('btn-footer-reset').setAttribute('style', 'visibility: visible');
        } else if (localStorage.getItem('nivel') != '1') {
          document.getElementById('btn-footer-pss').setAttribute('style', 'visibility: visible');          
        }
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      } else {
        rows[i].setAttribute("style", "background-color : none");
      }
    }    
  }

  edit () {
    jQuery('#nomusuarioEdit').prop('disabled',false);
    jQuery('#nomapeEdit').prop('disabled',false);
    jQuery('#passwordEdit').prop('disabled',false);
    jQuery('#nivelEdit').prop('disabled',false);
    jQuery('#estadoEdit').prop('disabled',false);
    jQuery('#tipoimpresoraEdit').prop('disabled',false);
    jQuery('#nomusuarioEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nomapeEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#passwordEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nivelEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#estadoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tipoimpresoraEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#estadoEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#tipoimpresoraEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#estadoEdit').on('change', () => {
      this.user = jQuery('#estadoEdit').val();
    });
    jQuery('#tipoimpresoraEdit').on('change', () => {
      this.impEdit = jQuery('#tipoimpresoraEdit').val();
    });
    jQuery('#nivelEdit').on('change', () => {
      this.levelEdit = jQuery('#nivelEdit').val();
    });
  }

}
