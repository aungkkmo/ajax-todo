$(document).ready(function(){
  $("#new-task button").click(function(){
    var task=$("#new-task input").val();

    if(!task) return false;

    buildTask(task).appendTo("#tasks");

    $("h1 span").html($("#tasks li").length);
    $("#new-task input").val("").focus();
  });

  $("#new-task input").keydown(function(e){
    if(e.which==13){
      $("#new-task button").click();
    }
  });

});

function buildTask(msg){
  var checkbox=$("<input>",{
    type:"checkbox"
  }).click(function(){
    if($(this).is(":checked")){
      $(this).parent().prependTo("#done");
    }else{
      $(this).parent().appendTo("#tasks");
    }

    $("h1 span").html($("#tasks li").length);
  });

  var task=$("<span>").html(msg);

  var del=$("<a>",{
    href:"#"
  }).html("&times;").click(function(){
    $(this).parent().remove();
    $("h1 span").html($("#tasks li").length);
  });

  return　$("<li>").append(checkbox).append(task).append(del);
}