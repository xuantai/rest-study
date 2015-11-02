<?php

App::uses('AppModel', 'Model');

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
}

