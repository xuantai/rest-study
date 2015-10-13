<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>TODO List</title>
</head>
<body>
	<!-- コンテンツ -->
	<div id="main"></div>

	<!-- TODO一覧表示のレイアウトテンプレート -->
	<script type="text/template" id="todo-layout-template">
	<h1>TODO List</h1>
	<div id="todo-lists"></div>
	</script>

	<!-- TODO一覧表示のテンプレート -->
	<script type="text/template" id="todo-composite-template">
	<textarea style="width:300px;height:50px"id="new-todo" placeholder="Todo?" autofocus></textarea>
	<input type="button" id="addTodo" value="Add">
	<input type="button" id="resetAllTodo" value="Reset">
	<input type="button" id="hideShowTodo" value="<%- hided === true ? 'Show Done' : 'Hide Done' %>">

	<hr>
	<div>
		<table border="1" width="350px">
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
		<a class="remove-link" href="#">Delete</a>
		<a class="detail-link" href="#todo-lists/<%- id %>">Detail</a>
	</td>
	</script>

	<!-- 詳細画面のレイアウトテンプレート -->
	<script type="text/template" id="todo-detail-layout-template">
	<div id="todo-item"></div>
	</script>

	<!-- 詳細画面の表示内容テンプレート -->
	<script type="text/template" id="todo-detail-item-template">
	<h2>Todo #<%- id %></h2>
	<div>
	<textarea style="width:300px;height:50px" id="edit-todo" autofocus placeholder="Todo?"><%- todo %></textarea>
	<input type="button" id="updateTodo" value="Update">
	<input type="button" id="updateCancel" value="Cancel">
	</div>
	</script>

	   <!-- require -->
	   <script type="text/javascript" src="js/require-config.js"></script>
	   <script type="text/javascript" src="js/lib/require.js" data-main="main.js"></script>

</body>
</html>