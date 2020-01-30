<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        $this->load->database();
        $this->load->model('App_model');
    }

	public function index(){
		$this->load->view('app');
    }

    public function contacto(){
        if(isset($_POST['email'])){
            $registro = $this->App_model->set_data($_POST);//regresa objeto
            if(is_object($registro)){
                $respuesta_model = $registro->insert();
                if($respuesta_model){
                    $respuesta = array(
                        'err'=>false,
                        'type'=>'success',
                        'message'=>'Gracias por contactarnos.'
                    );
                    //header
                    header('Content-Type: application/json');
                    echo json_encode($respuesta);
                }else {
                    $respuesta = array(
                        'err'=>true,
                        'type'=>'danger',
                        'message'=>'Error, correo ya registrado.'
                    );
                    //header
                    header('Content-Type: application/json');
                    echo json_encode($respuesta);
                }
            }
            else{
                echo 'Error, campos vacios';
            }
        }
        else{
            echo "??? WATHAFACK";
        }
    }
    
}
