
const handleColorChange = (type) =>{
    console.log(type);
    if(type){
        const color = document.getElementById("main").value;
        console.log(color);
    }else{
        const color = document.getElementById("second").value;
        console.log(color);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("main").addEventListener('change',handleColorChange(true));
    document.getElementById("second").addEventListener('change',handleColorChange(false));
});
