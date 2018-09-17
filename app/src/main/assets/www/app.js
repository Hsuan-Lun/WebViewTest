function helloVicky (){
	alert("Hi Vicky!");
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
    let field, account, password, password_confirm
    field = document.getElementById("field").value ;
    account = document.getElementById("account").value ;
    password = document.getElementById("password").value ;
    password_confirm = document.getElementById("password_confirm").value ;
    if (password != password_confirm){
        alert("密碼確認過程有誤 !");
    }else{

        if (localStorage.getItem("FIELD")==undefined){
            var FIELD = [field];
            var ACCOUNT = [account];
            var PASSWORD = [password];
        }else{
            var FIELD = [field];
            var ACCOUNT = [account];
            var PASSWORD = [password];
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

function clearInputInfo(){
	document.getElementById("field").value ="";
    document.getElementById("account").value ="";
    document.getElementById("password").value ="";
    document.getElementById("password_confirm").value ="";
}

var open = 'glyphicon-eye-open';
var close = 'glyphicon-eye-close';
var ele = document.getElementById('password');
document.getElementById('toggleBtn').onclick = function() {
    if( this.classList.contains(open) ) {
        ele.type="text";
        this.classList.remove(open);
        this.className += ' '+close;
    } else {
        ele.type="password";
        this.classList.remove(close);
        this.className += ' '+open;
    }
}
