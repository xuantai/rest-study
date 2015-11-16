<?php

App::uses('AppController', 'Controller');

class TodoListsController extends AppController
{
    private $fields = array(
        'TodoList.id',
        'TodoList.todo',
        'TodoList.status',
        'Owner.id',
        'Owner.name',
        'Assignee.id',
        'Assignee.name'
    );


    public function index()
    {
        $query = array(
            'fields' => $this->fields,
            'order' => "TodoList.id"
        );
        $res = $this->TodoList->find('all', $query);
        // 整形
        if (count($res) > 0) {
            $loginUserId = $this->Auth->user()['id'];
            foreach ($res as $key => $row) {
                //「ログインユーザがオーナである」フラグ
                $res[$key]['TodoList']['owned'] = $row['Owner']['id'] === $loginUserId;
                //「ログインユーザが担当である」フラグ
                $res[$key]['TodoList']['assigned'] = $row['Assignee']['id'] === $loginUserId;
            }
        }
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }

    public function view($id = null)
    {
        $res = $this->TodoList->findById($id, $this->fields);
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }

    public function add()
    {
        $data = $this->request->data;
        $data['owner'] = $this->Auth->user()['id'];
        $res = $this->TodoList->save($data);
        $response = $this->editResponse($res);
        $this->set(compact('response'));
        $this->set('_serialize', 'response');
    }

    public function delete($id)
    {
        //オーナかどうかチェック
        if (!$this->TodoList->isOwner($id)) {
            $this->setStatusValidationError();
            $response = $this->editErrors('Only the owner can detete this TODO.');
        } else {
            $res = $this->TodoList->delete($id, false);
            $response = $this->editResponse($res);
        }
        $this->set(compact('response'));
        $this->set('_serialize', 'response');
    }

    public function edit($id)
    {
        $this->TodoList->id = $id;
        $data = $this->request->data;
        $res = $this->TodoList->save($this->request->data);
        $res = !empty($res);
        $response = $this->editResponse($res);
        $this->set(compact('response'));
        $this->set('_serialize', 'response');
    }

    //S?a c?c ph?n h?i
    private function editResponse($res)
    {
        if ($res) {
            $response = $res;
        } else {
            $this->setStatusValidationError();
            $respnse = array();
            if (count($this->TodoList->validationErrors) > 0) {
                $response = $this->editErrors($this->TodoList->validationErrors);
            } else {
                $response = $this->editErrors('An error occured.');
            }
        }
        return $response;
    }

    // Khi g?p validation errors set response gi? tr? 400
    private function setStatusValidationError()
    {
        $this->response->statusCode(400);
    }

    // S?a c?c th?ng b?o l?i
    private function editErrors($errors)
    {
        if (is_array($errors)) {
            $res['errors'] = $errors;
        } else {
            $res['errors'] = array('error' => array($errors));
        }
        return $res;
    }

}
