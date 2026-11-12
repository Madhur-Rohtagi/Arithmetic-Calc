const  buttons=document.querySelectorAll('button');
const current=document.querySelector('#current');
const previous=document.querySelector('#previous');

let pVal="";
let cVal="";
let op=null;

function calc(a,b,op){
    a=Number(a);b=Number(b);
    let result;
    switch (op) {
        case "+":
            result=a+b;
            break;
        case "-":
            result=a-b;
            break;
        case "*":
            result=a*b;
            break;
        case "/":{
            result=b?a/b:"Error";
        }
    }
    return result==="Error"?result:String(parseFloat(result.toFixed(10)));
}

function updateDisplay(){
    current.textContent=cVal||"0";
    previous.textContent=op?`${pVal}${op}`:"";
}

buttons.forEach((button)=>{
    button.addEventListener('click',()=>{

        const {number,operator,action}=button.dataset;
        
        if(number!==undefined){
            cVal+=number;
        }
    
        if(operator!==undefined){
            if(cVal==="Error") return;

            if(pVal&&!cVal&&op){
                op=operator;
                updateDisplay();
                return;
            }

            if(!cVal)return;
            if(pVal){
                cVal=calc(pVal,cVal,op);
            }
            pVal=cVal;
            cVal="";
            op=operator;
        }
    
        if(action!==undefined){
            if(action==='clear'){
                pVal="";
                cVal="";
                op=null;
            }
            if(action==='delete'){
                if(cVal==="Error"){
                    cVal="";
                }
                else cVal=cVal.slice(0,-1);
            }
            if(action==='decimal'){
                if(!cVal.includes('.')){
                    cVal=cVal===""?"0.":(cVal+".");
                }
            }
            if(action==='sign'){
                if(cVal){cVal=String(-Number(cVal));}
            }
            if(action==='percentage'){
                if(cVal){cVal=String(Number(cVal)/100);}
            }
            if(action==='equals'){
                if(!cVal||!pVal||!op){
                    return;
                }
                cVal=calc(pVal,cVal,op);
                pVal="";
                op=null;
            }
        }
        updateDisplay();
    });
});