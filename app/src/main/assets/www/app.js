var FIELD, ACCOUNT, PASSWORD;


function helloVicky (){
	//alert("Hi Vicky!");
	toastr.options = {
		"positionClass": "toast-top-center",
		"showDuration": "300",
    	"hideDuration": "500",
    	"timeOut": "1000",
    	"extendedTimeOut": "500",
	} 
    toastr.info("Welcome Vicky!");
}

function openTab(evt, cityName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function addInfo(){
    if(checkInputInfo(false)) {
        let field, account, password, password_confirm;
        field = document.getElementById("field").value;
        account = document.getElementById("account").value;
        password = document.getElementById("inputPW").value;
        password_confirm = document.getElementById("inputPW_confirm").value;
        if (password !== password_confirm) {
            //alert("密碼確認過程有誤 !");
            toastr.options = {"positionClass": "toast-bottom-center"};
            toastr.error("密碼確認過程有誤 !").css("font-size", "16px");
        } else {

            if (localStorage.getItem("FIELD") == undefined) {
                FIELD = [field];
                ACCOUNT = [account];
                PASSWORD = [password];
            } else {
                if (!checkDuplicatedField()) {
                    FIELD = [field];
                    ACCOUNT = [account];
                    PASSWORD = [password];
                    FIELD.unshift(localStorage.getItem("FIELD"));
                    ACCOUNT.unshift(localStorage.getItem("ACCOUNT"));
                    PASSWORD.unshift(localStorage.getItem("PASSWORD"));

                    localStorage.setItem('FIELD', FIELD);
                    localStorage.setItem('ACCOUNT', ACCOUNT);
                    localStorage.setItem('PASSWORD', PASSWORD);

                    //alert("Save Complete!");
                    toastr.options = {"positionClass": "toast-bottom-center"};
                    toastr.success("Save Complete!").css("font-size", "16px");
                    clearInputInfo(false);
                }
            }
        }
    }else{
        toastr.options = {"positionClass": "toast-bottom-center"};
        toastr.error("尚有資料未填寫 !").css("font-size", "16px");
    }
}

function checkDuplicatedField(){
    FIELD = localStorage.getItem("FIELD");
    let field = document.getElementById("field").value ;
    let ind = FIELD.toLowerCase().split(",").indexOf(field);
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
        if (document.getElementById("field").value === "" &&
            document.getElementById("account").value === "" &&
            document.getElementById("inputPW").value === "" &&
            document.getElementById("inputPW_confirm").value === "") {
            return false;
        } else {
            return true;
        }
    }else{
        if (document.getElementById("field").value === "" ||
            document.getElementById("account").value === "" ||
            document.getElementById("inputPW").value === "" ||
            document.getElementById("inputPW_confirm").value === "") {
            return false;
        } else {
            return true;
        }
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
        let txt = localStorage.getItem("FIELD"); //typeof a is string
        let array = txt.split(","); //typeof array is object
        let a = document.getElementById("showField");
        for (let i = 0; i < array.length; i++) {
            input = input + "<li class='showitem' id='item" + i + "' onclick='returnData(this)'>" + array[i] + "</li>";
        }
        a.innerHTML = input;
        document.getElementById("showFieldBtn").innerText="收起清單";
    }else{
        document.getElementById("showField").innerHTML = "";
        document.getElementById("showFieldBtn").innerText="列出所有";
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
	toastr.warning("確定放棄治療?!")
}