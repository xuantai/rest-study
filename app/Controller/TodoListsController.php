<?php

App::uses('AppController', 'Controller');

class TodoListsController extends AppController
{

    public function index()
    {
        $query = array(
            'fields' => array(
                'TodoList.id',
                'TodoList.todo',
                'TodoList.status',
                'Owner.id',
                'Owner.name',
                'Assignee.id',
                'Assignee.name'
            ),
            'order' => "TodoList.id"
        );
        $res = $this->TodoList->find('all', $query);
        // ���`
        if (count($res) > 0) {
            $loginUserId = $this->Auth->user()['id'];
            foreach ($res as $key => $row) {
                //�u���O�C�����[�U���I�[�i�ł���v�t���O
                $res[$key]['TodoList']['owned'] = $row['Owner']['id'] === $loginUserId;
                //�u���O�C�����[�U���S���ł���v�t���O
                $res[$key]['TodoList']['assigned'] = $row['Assignee']['id'] === $loginUserId;
            }
        }
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }

    public function view($id = null)
    {
        $res = $this->TodoList->findById($id);
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }

    public function add()
    {
        $data = $this->request->data;
        $data['owner'] = $this->Auth->user()['id'];
        $res = $this->TodoList->save($data);
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }

    public function delete($id)
    {
        $res = $this->TodoList->delete($id, false);
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }

    public function edit($id)
    {
        $this->TodoList->id = $id;
        $data = $this->request->data;
        $res = $this->TodoList->save($this->request->data);
        $res = !empty($res);
        $this->set(compact('res'));
        $this->set('_serialize', 'res');
    }

}
