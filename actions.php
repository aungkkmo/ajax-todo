<?php 

$conn=mysqli_connect("localhost","web","123456","todo");
// mysql_select_db("todo",$conn);

$action=$_REQUEST['action'];

switch ($action) {
  case 'get':
    get_all_tasks();
    break;

  case 'add':
    add_task();
    break;
 
  case 'del':
    del_task();
    break; 

  case 'done':
    done_task();
    break;

  case 'undo':
    undo_task();
    break;

  default:
    unknown_action();
    break;
}

function get_all_tasks(){
  $result=mysqli_query($GLOBALS['conn'],"SELECT * FROM tasks");

  $tasks=array();

  while($row=mysqli_fetch_assoc($result)){
    $tasks[]=$row;
  }

  echo json_encode($tasks);
}

function add_task(){
  $subject=$_POST['subject'];
  echo $subject;
  $result=mysqli_query($GLOBALS['conn'],"INSERT INTO tasks(subject,created_date) VALUES ('$subject',now())");

  if($result){
    $id=mysqli_insert_id($GLOBALS['conn']);
    echo json_encode(array("err"=>0, "id"=>$id));
  }else{
    echo json_encode(array("err"=>1,"msg"=>"Unable to insert task"));
  }
}

function del_task(){
  $id=$_POST['id'];
  $result=mysqli_query($GLOBALS['conn'],"DELETE FROM tasks WHERE id=$id");

  if($result){
    echo json_encode(array("err"=>0));
  }else{
    echo json_encode(array("err"=>1,"msg"=>"Unable to delete task"));
  }
}
function done_task(){
  $id=$_POST['id'];
  $result=mysqli_query($GLOBALS['conn'],"UPDATE tasks SET status=1 WHERE id=$id");

  if($result){
    echo json_encode(array("err"=>0));
  }else{
    echo json_encode(array("err"=>1,"msg"=>"Unable to update status"));
  }
}
function undo_task(){
  $id=$_POST['id'];
  $result=mysqli_query($GLOBALS['conn'],"UPDATE tasks SET status=0 WHERE id=$id");

  if($result){
    echo json_encode(array("err"=>0));
  }else{
    echo json_encode(array("err"=>0,"msg"=>"Unable to update status"));
  }
}

function unknown_action(){
  echo json_encode(array("err"=>1,"msg"=>"Unknown Action"));
}