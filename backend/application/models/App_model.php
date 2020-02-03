<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App_model extends CI_Model {
    public $id;
    public $nombre;
    public $email;
    public $telefono;
    public $asunto;
    public $mensaje;
    public $fecha;

    public function set_data($datos){
        date_default_timezone_set('America/Mexico_City');
        foreach ($datos as $nombre_campo => $valor_campo) {
            if( property_exists('App_model',$nombre_campo) ){
                $this->$nombre_campo = $valor_campo;
            }
            $this->nombre = $datos['name'];
            $this->email = trim($datos['email']);
            $this->telefono = $datos['tel'];
            $this->asunto = $datos['subject'];
            $this->mensaje = $datos['message'];
            $this->fecha = date('Y-m-d H:i:s');
        }
        return $this;
    }

    private function is_exist($datos){
        $this->db->where('email',$datos->email);
        $this->db->from('app');
        $count = $this->db->count_all_results();
        return ($count > 0) ? true:false;
    }

    public function insert(){
        //validar que el email sea único
        // si no exite insertar
        if(!$this->is_exist($this)){
            $this->db->insert( 'app', $this );
            $resp = true;//si inserto a la bd
        }
        else {
            $resp = false;//no inserto a la bd
        }

        return $resp;
        
        
        
        // else{
        //   $hecho = false;
        //   $respuesta = array(
        //     'err'=>true,
        //     'mensaje'=>'El email ya esta registrado.'
        //   );
        // }
        // if($hecho){
        //   $respuesta = array(
        //     'err'=>false,
        //     'mensaje'=>'Registro insertado correctamente',
        //     'id'=>$this->db->insert_id()
        //   );
        // }else{
        //   $respuesta['mensaje2'] = 'Error al insertar';
        // }
        // return $respuesta;
    }
}