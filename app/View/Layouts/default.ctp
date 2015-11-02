<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <title>TODO List</title>
</head>
<body>
<div class="container">
    <div id="header"></div>
    <!-- コンテンツ -->
    <div id="main"></div>
    <script type="text/template" id="header-template">
        <div class="page-header">
            <h3>
                <small>Welcome：</small>
                <%- username %>（<%- name %>）　
                <button class="btn btn-default" type="button" id="logout">Log Out</button>
            </h3>
        </div>

    </script>
    <!-- TODO一覧表示のレイアウトテンプレート -->
    <script type="text/template" id="todo-layout-template">
        <h1>TODO List</h1>
        <div id="todo-lists"></div>
    </script>

    <!-- TODO一覧表示のテンプレート -->


    <script type="text/template" id="todo-composite-template">
        <div class="row">
            <div class="col-md-9">
                <div class="form-group">
                    <textarea class="form-control" rows="4" id="new-todo" placeholder="Todo?" autofocus></textarea>
                </div>
            </div>
            <div class="col-md-3">

                <div class="form-group">
                    <button id="addTodo" class="btn btn-primary">Add Todo</button>
                </div>
                <div class="form-group">
                    <select class="form-control" name="assignee" id="user-list"></select>
                </div>
            </div>
        </div>

        <br>

        <div class="row">
            <div class="col-md-6">

                <div class="btn-group" role="group">

                    <button class="btn btn-default" id="resetAllTodo">Reset</button>
                    <button class="btn btn-primary" id="hideShowTodo"><%- hided === true ? 'Show Done' : 'Hide Done'
                        %>
                    </button>


                    <button class="btn btn-danger" id="deleteAllTodo">Delete All</button>

                </div>

            </div>
        </div>
        <br>
        <div class="row">
            <table class="table table-hover table-striped">
                <thead>
                <tr>

                    <th class="col-md-1">Status</th>
                    <th class="col-md-6">Todo</th>
                    <th class="col-md-1">Owner</th>
                    <th class="col-md-1">Assignee</th>
                    <th class="col-md-3">Action</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </script>

    <!-- TODO一行分のテンプレート（上のtbody部分に挿入される） -->
    <script type="text/template" id="todo-item-template">


        <td><input type="checkbox" class="toggle" <%- status === '1' ? 'checked' : '' %>></td>
        <td style="margin:0px">
            <span class="todo-edit" style="margin:0px"><%- todo %></span>
        </td>


        <td>
            <span><%- Owner.name %></span>
        </td>

        <td>
            <span><%- Assignee.name %></span>
        </td>

        <td>
            <button class="btn btn-success" id="detail-link" onclick="window.location.href='#todo-lists/<%- id %>'">
                Detail
            </button>
            <button class="btn btn-danger" id="remove-link">Delete</button>


        </td>


    </script>

    <!-- 詳細画面のレイアウトテンプレート -->
    <script type="text/template" id="todo-detail-layout-template">
        <div id="todo-item"></div>
    </script>

    <!-- 詳細画面の表示内容テンプレート -->
    <script type="text/template" id="todo-detail-item-template">
        <h2>Todo #<%- id %></h2>

        <div class="col-md-6" row="5">
            <div class="form-group">
            <textarea class="form-control" id="edit-todo" autofocus
                      placeholder="Todo?"><%- todo %></textarea>
            </div>
            <div class="form-group">
                <select class="form-control" name="assignee" id="user-list"></select>
            </div>
        </div>


        <div class="col-md-6">

            <button class="btn btn-info" id="updateTodo">Update</button>


            <button class="btn btn-default" type="button" id="updateCancel">Cancel</button>
        </div>

    </script>
    <script type="text/template" id="login-layout-template">
        <h2>Login</h2>
        <form class="form-horizontal">
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">User name</label>

                <div class="col-sm-5">
                    <input type="text" class="form-control" id="username" placeholder="Username">
                </div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">Password</label>

                <div class="col-sm-5">
                    <input type="password" class="form-control" id="password" placeholder="Password">

                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-primary" id="login">Sign in</button>
                </div>
            </div>
        </form>
        <hr>
        <h2>User registration</h2>
        <form class="form-horizontal">

            <div class="form-group">
                <label class="col-sm-2 control-label">Username</label>

                <div class="col-sm-5"><input type="text" id="signup-username" class="form-control"
                                             placeholder="username">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Name</label>

                <div class="col-sm-5"><input type="text" id="signup-name" class="form-control" placeholder="name">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Password</label>

                <div class="col-sm-5"><input type="password" id="signup-password" class="form-control"
                                             placeholder="password">
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-2 control-label">Re-Password</label>

                <div class="col-sm-5"><input type="password" id="signup-re-password" class="form-control"
                                             placeholder="Re-enter Password">
                </div>
            </div>
            <div id="notice">

            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-default" id="signup">Sign Up</button>
                </div>
            </div>

        </form>

    </script>
    <!-- require -->
    <script type="text/javascript" src="js/require-config.js"></script>
    <script type="text/javascript" src="js/lib/require.js" data-main="main.js"></script>

</div>

</body>
</html>