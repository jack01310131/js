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
  if(txtId<=8){
    $("#showBlock").append('<p id="p' + txtId + '"><input type="text" name="test[]" placeholder="選項 ' + optionId + '"/> <button id="delOption-btn" onclick="deltxt('+txtId+')"><i class="fas fa-times"></i></button></p>');
    txtId++;
    optionId++;
  }else{
    $("#addOption-btn").hide();
  }
});

//移除選項
function deltxt(id) {
  $("#p"+id).remove();
  optionId--;
}
