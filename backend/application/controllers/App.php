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
            $respuesta = array(
                'err'=>false,
                'type'=>'success',
                'message'=>'Gracias'
            );
            //header
            header('Content-Type: application/json');
            echo json_encode($respuesta);
        }
        else{
            echo "??? WATHAFACK";
        }
    }
    
}
