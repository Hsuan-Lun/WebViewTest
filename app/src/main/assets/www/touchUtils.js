var start = null;
var offset = window.clientX * 0.6;
var tabcontentidname = ["add", "search", "util"];
var timer;
var isTouch = false;
var delay = 200; // how much long u have to hold click in MS
var temp="";

//onmousedown="startTouch()"
function startTouch(num){
   isTouch = true;
   timer = setTimeout(function(){ makeChange(num);},delay);
}

function makeChange(num){
    if(timer){
        clearTimeout(timer);
    }
      
    if(isTouch){
        toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-center",
        "preventDuplicates": false,
        "onclick": function() { toastrBtnClick(event.target.id,num); },
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": 0,
        "extendedTimeOut": 0,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false
    }
        toastr.info("<br/><button type='button' class='toastrBtn' id='toastrBtn_modify'>修改</button><button type='button' class='toastrBtn' id='toastrBtn_delete'>刪除</button>", "你想對我幹嘛??");
    }else{
        expandItem(num);
    }
}

//onmouseup="resetTouch()"
function resetTouch(){
    isTouch =false;
}


function toastrBtnClick(idname,num){
    //temp = event.target.onclick ;
    //event.target.onclick = "";
    if(idname==="toastrBtn_modify"){
        modifySelectedStorage(num);
        toastr.remove();
        //event.target.onclick = temp ;
    }
    if(idname==="toastrBtn_delete"){
        deleteSelectedStorage(num);
        toastr.remove();
    }
}



window.addEventListener("touchstart",function(event){
    if(event.touches.length === 1){
        //just one finger touched
        start = event.touches.item(0).clientX;
    }else{
        //a second finger hit the screen, abort the touch
        start = null;
    }
});

window.addEventListener("touchend",function(event){
    if(start){
        //the only finger that hit the screen left it
        var end = event.changedTouches.item(0).clientX;
        if(end > start + offset){
            let cc = checkActivate();
            //a left -> right swipe
            let ind = cc.indexOf(true);
            ind = ind + 1;
            if (ind>3){ind=3;}
            console.log(ind);
            openTab(tabcontentidname[ind]);
        }
        if(end < start - offset ){
            let cc = checkActivate();
            //a right -> left swipe
            let ind = cc.indexOf(true)
            ind = ind - 1;
            if (ind<1){ind=1;}
            console.log(ind);
            openTab(tabcontentidname[ind]);
        }
    }
});


function checkActivate() {
    var cc = [];
    for (let i = 0; i < tabcontentidname.length; i++) {
        if (document.getElementById(tabcontentidname[i]).style.display === "block") {
            cc[i] = true;
        } else {
            cc[i] = false;
        }
    }
    return cc;
}