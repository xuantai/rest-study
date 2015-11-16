<?php

App::uses('AppModel', 'Model');
App::uses('User', 'Model');
App::uses('AuthComponent',  'Controller/Component');

class TodoList extends AppModel
{
    public $belongsTo = array(
        'Owner' => array(
            'className' => 'User',
            'foreignKey' => 'owner',
        ),
        'Assignee' => array(
            'className' => 'User',
            'foreignKey' => 'assignee'
        )
    );

    public $validate = array(
        //TODO check
        'todo' => array(
            //S? k? t?
            'rule1' => array(
                'rule' => array(
                    'between', 1, 200
                ),
                'message' => '[server]The characters must be in the range 1~200'
            ),
            //tr?ng v?i TODO ?? c?
            'rule2' => array(
                'rule' => 'isUnique',
                'message' => '[server]There are the same TODO exists in the TODO list.'
            )
        ),
        //Ki?m tra status
        'status' => array(
            'rule1' => array(
                'rule' => array(
                    'inList',
                    array(0, 1)
                ),
                'message' => 'The status value must be 0 or 1'
            ),
        ),
        //Ki?m tra ng??i ???c ph?n c?ng
        'assignee' => array(
            //ID ?? t?n t?i trong table users
            'rule1' => array(
                'rule' => array(
                    'existsUser'
                ),
                'message' => 'this user ID is already exists'
            ),
        ),
        //Vi?c s?a/x?a
        'id' => array(
            //Ki?m tra ng??i v?o trang detail c? ph?i Owner hay Assignee
            'rule1' => array(
                'rule' => array(
                    'isOwnerOrAssignee'
                ),
                'message' => 'Only Owner or Assigner can update this TODO'
            ),
        )
    );

    // Owner validation rules
    // ID ?? ???c ph?n c?ng c?ng vi?c, m?nh s? xem ID c? t?n t?i trong table users hay kh?ng
    public function existsUser($userId)
    {
        $userModel = new User();
        $count = $userModel->find('count', array('conditions' => array('id' => $userId), 'recursive' => -1));
        return $count > 0;
    }

    //Owner validation rules
    //T? ki?m tra xem c? ph?i Owner hay ng??i ???c ph?n c?ng hay kh?ng
    public function isOwnerOrAssignee($id)
    {
        if (!isset($id)) {
            //Bỏ qua người đang đăng ký
            return true;
        }
        $me = AuthComponent::user();
        $todo = $this->findById($id);
        if ($todo) {
            if ($todo['TodoList']['owner'] === $me['id']
                || $todo['TodoList']['assignee'] === $me['id']
            ) {
                return true;
            }
        }
        return false;
    }

    // Owner validation rules
    // Yourself to check whether the owner
    public function isOwner($id)
    {
        if (!isset($id)) {
            //Kh?ng quan t?m ??n ng??i m?i ??ng k?
            return true;
        }
        $me = AuthComponent::user();
        $todo = $this->findById($id);
        if ($todo) {
            if ($todo['TodoList']['owner'] === $me['id']) {
                return true;
            }
        }
        return false;
    }
}