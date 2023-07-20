/*Criando Slide*/
let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function(){
    nextimg();
}, 4000);

function nextimg(){
    count++;
    if(count > 4){
        count = 1; 
    }
    document.getElementById("radio" + count).checked = true;
}