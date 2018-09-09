function setName(){
    person = document.getElementById("inputname").value ;
    if (person===""){
    person = "Guest" ;
    }
    localStorage.setItem("lastname",person);
    sayHello(person) ;
}

function demoClick(){
    person = "demo" ;
    localStorage.setItem("lastname",person) ;
    sayHello(person);
}

function sayHello(person){
console.log(person);
person = localStorage.getItem("lastname") ;
if (person===null | typeof person == "undefined"){
person = "Guest" ;
localStorage.setItem("lastname",person);
}else{
person = localStorage.getItem("lastname") ;
}
document.getElementById("demo").innerHTML = "Hello " + person + "! How are you today?";
}

function sayGoodbye(){
console.log("Bye bye ~ " + localStorage.getItem("lastname"));
//localStorage.removeItem("lastname");
alert("BYE");
}