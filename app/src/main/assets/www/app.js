var FIELD, ACCOUNT, PASSWORD;

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
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
}

function helloVicky (){
	//alert("Hi Vicky!");
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
    let field, account, password, password_confirm;
    field = document.getElementById("field").value ;
    account = document.getElementById("account").value ;
    password = document.getElementById("password").value ;
    password_confirm = document.getElementById("password_confirm").value ;
    if (password !== password_confirm){
        alert("密碼確認過程有誤 !");
    }else{

        if (localStorage.getItem("FIELD")==undefined){
            FIELD = [field];
            ACCOUNT = [account];
            PASSWORD = [password];
        }else{
            FIELD = [field];
            ACCOUNT = [account];
            PASSWORD = [password];
            FIELD.unshift(localStorage.getItem("FIELD"));
            ACCOUNT.unshift(localStorage.getItem("ACCOUNT"));
            PASSWORD.unshift(localStorage.getItem("PASSWORD"));
        }

        localStorage.setItem('FIELD',FIELD);
        localStorage.setItem('ACCOUNT',ACCOUNT);
        localStorage.setItem('PASSWORD',PASSWORD);

        alert("Save Complete!");
        clearInputInfo();
    }

}

function clearInputInfo(hasNotice){
    if(hasNotice===undefined){let hasNotice = false; let r = true;}

    if (hasNotice){
        r = confirm("確定要清除填寫內容 ?!");
    }
    if(r===true) {
        document.getElementById("field").value = "";
        document.getElementById("account").value = "";
        document.getElementById("password").value = "";
        document.getElementById("password_confirm").value = "";
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
    let input="" ;
    let txt = localStorage.getItem("FIELD"); //typeof a is string
	let array = txt.split(","); //typeof array is object
    let a = document.getElementById("showField");
    for(let i=1;i<array.length;i++){
        input = input + "<li class='showitem' id='item" + i + "' onclick='returnData(this)'>" + array[i] + "</li>" ;
    }
    a.innerHTML = input ;
}

function returnData(e){
    //let str = "Don't push " + e.id ;
    //toastr.info(str);
    field = localStorage.getItem("FIELD");
    account = localStorage.getItem("ACCOUNT");
    password = localStorage.getItem("PASSWORD");
    FIELD = field.split(",");
    ACCOUNT = account.split(",");
    PASSWORD = password.split(",");
    let ind = parseInt(e.id[e.id.length-1]) ;
    let str = "<span font-size:'16px'>名稱: </span><span margin-top='0px'>"+ FIELD[ind]+ "</span><br>" +
             "<span font-size:'16px'>帳號: </span><span margin-top='0px'>"+ ACCOUNT[ind]+ "</span><br>" +
             "<span font-size:'16px'>密碼: </span><span margin-top='0px'>"+PASSWORD[ind]+"</span>";
    toastr.info(str).css("width","400px");
}