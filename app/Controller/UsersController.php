<?php

App::uses('AppController', 'Controller');
App::uses('BlowfishPasswordHasher', 'Controller/Component/Auth');

class UsersController extends AppController
{

    public function index()
    {
        $res = $this->User->find('all', array(
            'fields' => array(
                'User.id',
                'User.username',
                'User.name'
            )
        ));
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }



    public function login()
    {
        $user = $this->Auth->user();
        $res = array();
        if ($user) {
            if ($user['username'] === $this->request->data['username']) {
                $res['User'] = $user;
                $res['message'] = "ログイン済みです";
            } else {
                $res['message'] = "別のユーザがログイン済みです";
            }
        } else {
            $this->request->data['User']['username'] = $this->request->data['username'];
            $this->request->data['User']['password'] = $this->request->data['password'];
            if ($this->Auth->login()) {
                $user = $this->Auth->user();
                $res['User'] = $user;
                $res['message'] = "Login success";
            } else {
                $res['message'] = "wrong username or password";
            }
        }
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }

    public function loggedIn()
    {
        $user = $this->Auth->user();
        if ($user) {
            $res['User'] = $user;
            $res['message'] = "ログイン済みです";
            $this->set(compact('res'));
            $this->set('_serialize', 'res');
        } else {
            throw new UnauthorizedException();
        }
    }

    public function logout()
    {
        $user = $this->Auth->user();
        $res = array();
        if ($user !== null) {
            $this->Auth->logout();
            $res['message'] = "Login successfully";
        } else {
            $res['message'] = "can not login";
        }
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }

    public function signUp()
    {
        $data = $this->request->data;

        if (isset($data['password'])) {

            $passwordHasher = new BlowfishPasswordHasher();
            $data['password'] = $passwordHasher->hash($data['password']);
        }
        $res = $this->User->save($data);
        if ($res) {
            unset($res['User']['password']);
            $res['message'] = "Register successfully, you can Login!";
        } else {
            $res['message'] = "Fail to register";
            //  $res['message'] = json_encode($data);
        }
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }

}