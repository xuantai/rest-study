<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <!-- Bootstrap CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- Application CSS -->
    <link href="css/app.css" rel="stylesheet">

    <title>TODO List</title>
</head>
<body>

    <!-- ヘッダ -->
    <div id="header" class="container"></div>
    <!-- コンテンツ -->
    <div id="main" class="container"></div>

    <!-- ヘッダのテンプレート -->
    <script type="text/template" id="header-template">
        <div>
            <div class="row header">
                <div class="form-group col-xs-12">
                    <form class="form-inline pull-right">
                        <label for="logout"><%- username %>（<%- name %>）</label>
                        <input type="button" class="btn btn-default btn-sm" id="logout" value="Log out">
                    </form>
                </div>
            </div>
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
            <div class="col-xs-12">
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                    <tr class="success">
                        <th class="col-sm-6" colspan="2">ToDo</th>
                        <th class="col-sm-2">Owner</th>
                        <th class="col-sm-2">Assignee</th>
                        <th class="col-sm-2" colspan="2"></th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </script>

    <script type="text/template" id="todo-item-template">
        <td colspan="2">
            <div class="checkbox">
                <label class="todo-item-text">
                    <input type="checkbox" class="toggle" <%- status === '1' ? 'checked' : '' %>><%- todo %>
                </label>
            </div>
        </td>
        <td>
            <span><%- Owner.name %></span>
        </td>
        <td>
            <span><%- Assignee.name %></span>
        </td>
        <td class="text-center">
            <div class="btn-group">
                <a class="btn btn-danger remove-link todo-item-button" href="#" id="remove-link">Delete</a>
            </div>
        </td>
        <td>
            <div class="btn-group">
                <a class="btn btn-success detail-link todo-item-button" href="#todo-lists/<%- id %>" id="detail-link">Detail</a>
            </div>
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