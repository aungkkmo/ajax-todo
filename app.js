$(document).ready(function(){
  $("#new-task button").click(function(){
    var task=$("#new-task input").val();

    if(!task) return false;

    

    // buildTask(task).appendTo("#tasks");
    $.post("actions.php",{action:"add",subject:task},function(res){
      if(res.err==1){
        alert(res.msg);
      }else{
        console.log(task);
        console.log(res.id);
        buildTask(task,res.id).appendTo("#tasks");

      }
    },"json");

    $("h1 span").html($("#tasks li").length);
    $("#new-task input").val("").focus();
    // location.reload();
  });
  
  $("#new-task input").keydown(function(e){
    if(e.which==13){
      $("#new-task button").click();
    }
  });




  $.get("actions.php",{action:"get"},function(tasks){
    $.each(tasks,function(index,task){
      if(task.status==1){
        buildTask(task.subject,task.id).appendTo("#done");
      }else{
        buildTask(task.subject,task.id).appendTo("#tasks");
      }
    });

    $("#done input").attr("checked","checked");
    $("h1 span").html($("#tasks li").length);
  },"json");

});

function buildTask(msg,id){
  var checkbox=$("<input>",{
    type:"checkbox"
  }).click(function(){
    var task=$(this).parent();
    var task_id=task.data("id");
    if($(this).is(":checked")){
      $.post("actions.php",{action:"done",id:task.id},function(){
        task.prependTo("#done");
        $("h1 span").html($("#task li").length);
      });
    }else{
      $.post("actions.php",{action:"undo",id:task_id},function(){
        task.appendTo("#tasks");
        $("h1 span").html($("#tasks li").length);
      });
    }

  });

  var task=$("<span>").html(msg);

  var del=$("<a>",{
    href:"#"
  }).html("&times;").click(function(){
    var task=$(this).parent();
    var task_id=task.data("id");
    $.post("actions.php",{action:"del",id:task_id},function(res){
      task.remove();
      $("h1 span").html($("#task li").length)
    },"json");
    
  });

  return　$("<li>").data("id",id).append(checkbox).append(task).append(del);
}