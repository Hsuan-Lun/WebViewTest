var FIELD, ACCOUNT, PASSWORD;

var onlongtouch; 
var timer;
var touchduration = 500; //length of time we want the user to touch before we do something

function touchstart() {
    timer = setTimeout(onlongtouch, touchduration); 
}

function touchend() {

    //stops short touches from firing the event
    if (timer)
        clearTimeout(timer); // clearTimeout, not cleartimeout..
}

onlongtouch = function() {alert("Hi");} //do something };


function helloVicky (){
	//alert("Hi Vicky!");
	toastr.options = {
		"positionClass": "toast-center",
		"showDuration": "500",
    	"hideDuration": "100",
    	"timeOut": "1000",
    	"extendedTimeOut": "500",
	} 
    toastr.info("Welcome Vicky!");
}

function openTab(tabname) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    var tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(tabname).style.display = "block";
    tablinks[checkActivate().indexOf(true)].className += " active" ;

    //document.getElementById(tabname).className += " active";
    //evt.currentTarget.className += " active";
}

function addInfo(){
    if(checkInputInfo(false)) {
        let field, account, password, password_confirm;
        field = document.getElementById("field").value;
        account = document.getElementById("account").value;
        password = document.getElementById("inputPW").value;
        password_confirm = document.getElementById("inputPW_confirm").value;
        if (password_confirm_fcn()) {
            if (localStorage.getItem("FIELD") == undefined) {
                FIELD = [field];
                ACCOUNT = [account];
                PASSWORD = [password];
                save2localStorage(FIELD,ACCOUNT,PASSWORD);
                
            } else {
                if (!checkDuplicatedField()) {
                    FIELD = [field];
                    ACCOUNT = [account];
                    PASSWORD = [password];
                    FIELD.unshift(localStorage.getItem("FIELD"));
                    ACCOUNT.unshift(localStorage.getItem("ACCOUNT"));
                    PASSWORD.unshift(localStorage.getItem("PASSWORD"));
                    save2localStorage(FIELD,ACCOUNT,PASSWORD);
                }
            }
        }
    }else{
        toastr.options = {"positionClass": "toast-bottom-center"};
        toastr.error("尚有資料未填寫 !").css("font-size", "16px");
    }
}

function password_confirm_fcn(){
    let password = document.getElementById("inputPW").value;
    let password_confirm = document.getElementById("inputPW_confirm").value;
    let isSame = password === password_confirm ;
    if (!isSame) {
        //alert("密碼確認過程有誤 !");
        toastr.options = {"positionClass": "toast-bottom-center"};
        toastr.error("密碼確認過程有誤 !").css("font-size", "16px");
    }
    return isSame;
}


function save2localStorage(FIELD,ACCOUNT,PASSWORD){
    localStorage.setItem('FIELD', FIELD);
    localStorage.setItem('ACCOUNT', ACCOUNT);
    localStorage.setItem('PASSWORD', PASSWORD);
    toastr.options = {"positionClass": "toast-bottom-center"};
    toastr.success("Save Complete!").css("font-size", "16px");
    clearInputInfo(false);
    if(document.getElementById("showFieldBtn").innerText==="收起清單"){
        document.getElementById("showFieldBtn").innerText="列出所有";
    }
    parseFIELD();
}


function checkDuplicatedField(){
    let FIELD = localStorage.getItem("FIELD");
    let field = document.getElementById("field").value ;
    let ind = FIELD.toLowerCase().split(",").indexOf(field.toLowerCase());
    if (ind<0){
        return false;
    }else{
        toastr.error("之前輸入過囉!!");
        return true;
    }
}


function clearInputInfo(hasNotice){
    if(checkInputInfo(true)) {
        if (hasNotice === undefined) {
            var hasNotice = false;
        }

        if (hasNotice) {
            var r = confirm("確定要清除填寫內容 ?!");
        } else {
            var r = true;
        }

        if (r === true) {
            document.getElementById("field").value = "";
            document.getElementById("account").value = "";
            document.getElementById("inputPW").value = "";
            document.getElementById("inputPW_confirm").value = "";
        }
    }
}

function checkInputInfo(istoRemove){
    if(istoRemove) {
        return !(document.getElementById("field").value === "" &&
            document.getElementById("account").value === "" &&
            document.getElementById("inputPW").value === "" &&
            document.getElementById("inputPW_confirm").value === "");
    }else{
        return !(document.getElementById("field").value === "" ||
            document.getElementById("account").value === "" ||
            document.getElementById("inputPW").value === "" ||
            document.getElementById("inputPW_confirm").value === "");
    }
}


function toggler(e,idName) {
    if( e.className === 'showPW' ) {
        e.className = 'hidePW';
        e.src = "./res/eye1.png";
        document.getElementById(idName.id).type="text";
    } else {
        e.className = 'showPW';
        e.src = "./res/eye.png";
        document.getElementById(idName.id).type="password";
    }
}

function parseFIELD(){
    if(document.getElementById("showFieldBtn").innerText==="列出所有") {
        let input = "";
        if (localStorage.getItem("FIELD")===null){
            toastr.info("資料庫沒東西唷!!");
        }else {
            let field = localStorage.getItem("FIELD").split(","); //typeof field is object
            let account = localStorage.getItem("ACCOUNT").split(",");
            let password = localStorage.getItem("PASSWORD").split(",");
            for (let i = 0; i < field.length; i++) {
                input = input + "<p class='expandableitemhead' onclick='expandItem("+i+")'>"+ field[i] +"</p>"+
                "<ul id=item"+i+" class='expandableitem' style='display: none;'>"+
                "<li>account: " + account[i] + "</li>" +
                "<li>password: " + password[i] + "</li>" +
                "</ul>";
            }


/*
            for (let i = 0; i < array.length; i++) {
                input = input + "<li class='showitem' id='item" + i + "' onclick='returnData(this)'>" + array[i] + "</li>";
            }
            input = input + "</ul>";
*/
            document.getElementById("showField").innerHTML = input;
            document.getElementById("showFieldBtn").innerText = "收起清單";
        }
    }else{
        document.getElementById("showField").innerHTML = "";
        document.getElementById("showFieldBtn").innerText="列出所有";
    }
}

function expandItem(num){
	let name = "item"+num ;
	if(document.getElementById(name).style.display==="") {
        document.getElementById(name).style.display = "none";
    }else{
        document.getElementById(name).style.display="";
        //setTimeout(function(){ alert("Hello"); }, 3000);
        setTimeout(function(){expandItem(num);},2500);
    }
}



function returnData(itemhandle){
	toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-buttom-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
	};
    //let str = "Don't push " + e.id ;
    //toastr.info(str);
    let field = localStorage.getItem("FIELD");
    let account = localStorage.getItem("ACCOUNT");
    let password = localStorage.getItem("PASSWORD");
    FIELD = field.split(",");
    ACCOUNT = account.split(",");
    PASSWORD = password.split(",");
    let ind = parseInt(itemhandle.id[itemhandle.id.length-1]) ;
    let str = "<span font-size:'16px'>名稱: </span><span margin-top='0px'>"+ FIELD[ind]+ "</span><br>" +
             "<span font-size:'16px'>帳號: </span><span margin-top='0px'>"+ ACCOUNT[ind]+ "</span><br>" +
             "<span font-size:'16px'>密碼: </span><span margin-top='0px'>"+PASSWORD[ind]+"</span>";
    toastr.info(str).css("font-size","16px");
}


function clearStorage(){
    let r = confirm("確定要清除填寫內容 ?!");
    if (r===true) {
        localStorage.removeItem('FIELD');
        localStorage.removeItem('ACCOUNT');
        localStorage.removeItem('PASSWORD');
    }
    /*
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": true,
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
    toastr.warning('確定放棄治療?! <button type="button" class="btn clear" onclick="removeDB()">YES</button>' +
        '<button type="button" class="btn clear" onclick="">NO</button>');
        */
}

