/* 登入 註冊 */
$('.signIn-popup-modal').magnificPopup({
		type: 'inline',
		preloader: false,
		//focus: '#username',
    midClick: true,
    closeOnBgClick: 'false',
    enableEscapeKey: 'false',
    closeBtnInside: true,
    fixedContentPos: true,
    alignTop: true,
		//modal: true,
    callbacks: {
      open: function() {
        //alert('Popup is opened');
      }
    }
});

$('.signUp-popup-modal').magnificPopup({
		type: 'inline',
		preloader: false,
		//focus: '#username',
    midClick: true,
    closeOnBgClick: 'false',
    enableEscapeKey: 'false',
    closeBtnInside: true,
    fixedContentPos: true,
    alignTop: true,
		//modal: true,
    callbacks: {
      open: function() {
        //alert('Popup is opened');
      }
    }
});

/*
$(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
});
*/

/* 新增投票選項 */
//set the default value
var txtId = 1;
var optionId = txtId + 2;

//add input block in showBlock
$("#addOption-btn").click(function () {
  
    $("#showBlock").append('<p id="p' + txtId + '"><input type="text" id="in'+txtId+'" name="test[]" placeholder="選項 '+optionId+'"/> <button id="delOption-btn" onclick="deltxt('+txtId+')"><i class="fas fa-times"></i></button></p>');
    txtId++;
    optionId++;
  if(optionId>10){
    $("#addOption-btn").hide();
  }
});

//移除選項
function deltxt(id) {
  if(optionId>10){
    $("#addOption-btn").show();
  }
  optionId--;

  $("#p"+id).remove();
  var k=3;
  for(var i=1;i<=txtId;i++){
    if( document.getElementById("in"+i) ){
      $("#in"+i).attr('placeholder','選項 '+k)
      k++;
    }
  }
}

//後臺隱藏
$(function(){
  $('#fff').hide();
  $('.watchbackstage').on('click', function(){
    $('#fff').slideToggle();
  });
});


