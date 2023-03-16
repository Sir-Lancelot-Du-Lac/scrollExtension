var tabActiveId = "";
chrome.tabs.query({active: true}, function(tabs){tabActiveId = tabs[0].id});
var isScrollColorModified = false;



//-----------functions with css codes fragments

const cssColOne = (color) =>{
    return '\
        ::-webkit-scrollbar-thumb{\
        background-color:' + color + ';\
    }'};

const cssColSec = (color) =>{
    return '\
        ::-webkit-scrollbar{\
        background-color:'+ color +';\
    }'};

const cssWidth = (numb) =>{
    return '\
        ::-webkit-scrollbar{\
        width:'+ numb +'px;\
    }'};

const cssRadius = (numb) =>{
    return '\
        ::-webkit-scrollbar-thumb{\
        border-radius: '+ numb +'px;\
    }'};
//---------------------------------------

//------------Functions that changes css

const handleColorChange = (type) =>{
    console.log(type);
    console.log("clicked");
    if(type){
        const color = document.getElementById("main").value;
        colorMain = color;
        console.log(cssColOne(String(color)));
        console.log(tabActiveId);
        //------------chrome scripting function allowing to implement css
        //------------It appears couple more times bellow
        chrome.scripting.insertCSS({
            target:{tabId: tabActiveId},
            css: String(cssColOne(color)),
        });
        if(!isScrollColorModified){handleMessager("Change second color to see effects")};
    }else{
        const color = document.getElementById("second").value;
        colorSec = color;
        console.log(cssColSec(String(color)));
        console.log(tabActiveId);
        chrome.scripting.insertCSS({
            target:{tabId: tabActiveId},
            css: String(cssColSec(color)),
        });
        isScrollColorModified = true;
    };
};

const handleRoundNWidth = (type) =>{
if(type){
    const rangeV = document.getElementById("round").value;
    console.log(rangeV);
    chrome.scripting.insertCSS({
        target:{tabId: tabActiveId},
        css: String(cssRadius(rangeV)),
    });
    if(!isScrollColorModified){handleMessager("Change colors first!");};
}else{
    const rangeV = document.getElementById("width").value;
    console.log(rangeV);
    chrome.scripting.insertCSS({
        target:{tabId: tabActiveId},
        css: String(cssWidth(rangeV)),
    });
    if(!isScrollColorModified){handleMessager("Change colors first!");};
}
};

const handleCheckboxes = (type) =>{
    if(type==0){
        const radioV = document.getElementById("radioOne").value;
        console.log(radioV);
        chrome.scripting.insertCSS({
            target: {tabId: tabActiveId},
            css: "body{overflow: scroll;}",
            });
    }else if(type==1){
        const radioV = document.getElementById("radioSec").value;
        console.log(radioV);
        chrome.scripting.insertCSS({
            target: {tabId: tabActiveId},
            css: "body{overflow: hidden;}",
            });
    }
};

//---------------------------------------

//----------------Simple messager with instructions
const handleMessager = (message) =>{
    document.getElementById("information").innerHTML = message;

}
//---------------------------------------


//-----------Listeners of inputs
const handleListeners = () =>{
    console.log("Loaded")
    document.getElementById("main").addEventListener('change',function(){handleColorChange(true);});
    document.getElementById("second").addEventListener('change',function(){handleColorChange(false)});
    document.getElementById("round").addEventListener('change',function(){handleRoundNWidth(true)});
    document.getElementById("width").addEventListener('change',function(){handleRoundNWidth(false)});
    document.getElementById("radioOne").addEventListener('click',function(){handleCheckboxes(0)});
    document.getElementById("radioSec").addEventListener('click',function(){handleCheckboxes(1)});
    };
window.addEventListener("load",handleListeners);
//---------------------------------------