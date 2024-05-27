class Terminos{
    constructor(){
        this.reset();
    }
    sumOrest(operador){
        return !(isNaN(parseInt(operador+1)))    
    }
    add_operador(sign,doble){
        //nota:antes de este metodo se necesita una validacion para determinar si
            //es el primer numero, de ser asi no debe permitir que el signo sea
            // '/' o 'x'

        //Recibio un punto
        if(sign=="."){
            if(this.number.split(".").length!=1){
                //ingresa porque se ingreso el punto de nuevo
                alert("NO SE PUEDE PONER MAS DE UN PUNTO POR NUMERO")
                return "";
            }else{
                alert("primer punto")
                //ingreso el punto por primera vez
                if(this.number=="+"){
                    //ingresa porque lo primero que se ingreso fue el punto
                    //es decir: en pantalla aparece "."
                    //en el numero apareceria "+."
                    //ya no hay chance de que se cambie el operador
                    this.replace_opera("+");
                }
                this.number+=sign;
                return sign;

            }
        }
        //recibe uno de los 4 operadores(+,-,/,x)
        if(this.operador.length==0){
            //entra si no se ha añadido ningun operador
            //es el primer operador que entra 
            //todos los operadores son validos
            if(this.sumOrest(sign)){
                //entra si el operador es +,-
                //hay que modificar tanto this.operador como this.numero
                this.replace_sign(sign)
            }
            //si sigue es porque el operador ingresado es /,x
            //solo hay que alterar this.operador
            this.replace_opera(sign)
            return sign;
        }
        //en este punto, ya se habia ingresado otro operador al numero
        if(sign=="x" || sign=="/"){
            //aqui no entran +,-
            //si estas aqui los operadores son:
                // +/ , -/ , -x , +x, // , xx , x/ , /x ;
                //pdt:ninguno es legal
            //hay que remplazar el operador que habia antes por el nuevo y
                //hay que volver positivo al numero
            this.replace_sign("+");
            //deja indicador del nuevo operador
            this.replace_opera(sign);
            return sign;
        }
        //aqui el signo ingresado es +,-
        if(this.sumOrest(this.operador)){
            //entra si el operador pasado era suma o resta
            //si estas aqui los operadores son:
                // ++ , -- , -+ , +-
                //son posibles pero hay que multiplicarlos y remplazar operador
            
            sign=this.carga_num(sign)

            this.replace_sign(sign);
                //hay que dejar indicador de que ya se presiono +,-, 
                //por lo que no debe haber como sig signo a /,x
            this.replace_opera(sign);
            return sign;
        }
        //salta si el operador pasado era mult o div
        //es el resultado mas generoso
        //solo hay que afectar al signo del numero mas no al operador
        sign=this.carga_num(sign)
        this.replace_sign(sign)
        return sign;
    }
    carga_num(sign){
        sign=((this.get_signo()+1)*(sign+1))
        
        if(sign<0){
            //nuevo signo es negativo
            sign= "-"                    
        }else{
            //nuevo signo es positivo
            sign= "+"
        }
        return(sign)
        
    }
    replace_sign(signo){
        this.number=this.number.replace(this.get_signo(),signo)
        console.log("===",this.number,"===")
        // this.number=signo+this.number.substring(1,number.length-1)
    }
    replace_opera(signo){
        this.operador=signo;
        if(!this.sumOrest(signo)){
            this.doble=true;
        }
    }
    get_signo(){
        return this.number.charAt(0);
    }
    doble_signo(signo){
        if(!this.sumOrest(this.operador) && this.sumOrest(signo)){
            return true
        }
        return false;
    }
    add_number(char){
        if(isNaN(char) && char!="."){
            //entra porque recibio un caracter que ni es numero ni es un punto
            return -1;
        }
        // si llego hasta aqui es numero

        //si llegaste aqui:
        //o bien eres un numero o eres el primer punto
        if(this.number=="+" && this.operador==""){
            //se ingreso directo un numero sin antes ingresar un signo 
            this.replace_opera("+")
        }

        try {
            if(isNaN(char.charAt(0))){
                //se ingreso un string
                //el primer caracter del dato ingresado es un signo
                //en teoria, si entras aqui es porque estas reasignando un numero completo,
                    //es decir, llegas de obtener el resultado de la operacion y quieres 
                    //guardarla en este objeto
                this.number=""+char
                return
            }
        } catch (TypeError) {
            //el dato ingresado es un numero, no un string
        }
        this.number+=char;
        return 1;
    }
    
    get_number(){
        if(this.number.length==1){
            return ""
        }
        return this.number
    }
    get_operardor(){
        return this.operador
    }
    
    reset(){
        this.doble=false;
        this.number="+"
        this.operador="";
    }

    isValid(cursor){
        //valido significa que va a hacer una de las 4 operaciones

        //Escenarios:
            //X el numero solo es un punto (true/false si es division)
            //X solo se ingreso el operador (false)
            //X no se ingreso nada (-1)
            //X operador y numero estan completos (true)

        //numero ="+" , "-"
        //numero ="+." , "-.2"
        if(this.operador==""){
            //no se ingreso absolutamante nada
            //es un numero vacio
            return -1;
        }
        //a partir de este punto el operador ya tiene un valor
        if(this.number.charAt(1)==="." && this.number.length===2){
            //El numero esta solo compuesto por el signo y un punto.Nada mas
            //lo tornamos en cero
            this.number=this.number.replace(".","0")
            //verificamos si el operdor es una division
                //si es cierto entonces no es valido para la operacion
            if(operador=="/"){
                return -2
            }
            return true
        }
        if(isNaN(this.number)){
            //el termino en total solo es un signo
            //entra porque el numero es solo un signo
            return false;
        }
        //operador esta lleano
        //"number" es un numero
        //si sobrevivio hasta aqui el termino esta correcto y listo para operar
        return true;
    }                
    
}

function obtener_simbolo(txt){
    return txt.srcElement.innerText
}  

function get_lastCharAtPantalla(){
    return pantalla.value.charAt(pantalla.value.length-1)
}

function delete_last(){
    pantalla.value=pantalla.value.substring(0,pantalla.value.length-1)
}

function ejecutar_operaciones(){
    let n1=numeros[0].isValid()
    let n2=numeros[1].isValid()

    //Escenarios:
        //X el numero solo es un punto (true/false si es division)
        //X solo se ingreso el operador (false)
        //X no se ingreso nada (-1)
        //X operador y numero estan completos (true)
    
    if(n1 && n2==-1){
        reiniciar(true);
        return
    }
    if(!n1){
        alert("Termino 1 errado")
        return;
    }
    if(n2===-2){
        alert("Division por cero")
        return;
    }
    if(!n2){
        alert("Termino 2 errado")
        return;
    }
    
    opera=numeros[1].get_operardor();
    let pant;
    if(opera=="/"){
        console.log("Division")
        pant=""+(parseFloat(numeros[0].get_number())/parseFloat(numeros[1].get_number()));
    
    }else if(opera=="x"){
        console.log("Multiplicacion");
        pant=""+(parseFloat(numeros[0].get_number())*parseFloat(numeros[1].get_number()));
    
    }else{
        console.log("Suma o Resta");
        pant=""+(parseFloat(numeros[0].get_number())+parseFloat(numeros[1].get_number()));
    }
    // console.log("__NUm1:",numeros[0])
    // pantalla.value=pant.substring(0,11);
    pantalla.value=pant;
    reiniciar(true);
}
function reasignar_result(){
    if(0<pantalla.value){
        //el resultado es positivo
        numeros[0].add_operador("+")
    }else{
        //el resultado es negativo
        numeros[0].add_operador("-")
    }

    //en pantalla no hay ningun signo
    numeros[0].add_number(pantalla.value);
        
}

function reiniciar(guardar){
    //reinicia ambos numeros
    numeros.forEach(item=>item.reset());
    if(guardar){
        //se desea guardar el resultado de la pantalla en el primer termino
        //es decir, se quiere editar el resultado para hacerle mas operaciones
        reasignar_result();
    }else{
        pantalla.value="";
    }
    cursor=0;
}

let numeros=[];
let cursor=0; 

function repaint(){
    // if(pantalla.value.length==11){
    //     pantalla.value==""
    // }
    if(numeros[0].get_operardor()!=""){
        if(numeros[0].get_number()==""){
            pantalla.value=numeros[0].get_signo();
        }else{
            pantalla.value=numeros[0].get_number()
        }
        //ya se ingreso algo del primer numero, ya sea numero o su signo
    }
    if(numeros[1].get_operardor()!=""){
        //primero se escribe el operador(uno de los 4)
        //comproabamos si tiene doble signo(esta multiplicando o dividiendo)
            //si el signo es "+" entonces no hay nedesidad de escribirlo
        pantalla.value+=numeros[1].get_operardor()
        //ya se ingreso el segundo numero, al menos su signo/operdor
        //no hace falta imprimir el operador porque ya esta el signo en el numero
        if(numeros[1].doble && numeros[1].get_signo()=="-"){
            pantalla.value+="-"
        }
        pantalla.value+=numeros[1].get_number().substring(1);
    }
    //si salto directo aca:solo se ha ingresado el primer numero
}
function teclas(txt){
    if(isNaN(parseInt(txt))){
        //Entran solo los operadores y la C
        if(txt=="C"){
            //Hay que reiniciar la calculadora
            reiniciar()
            return
        }
        
        if(txt=="="){
            //hay que obtener el resultado
            if(isNaN(get_lastCharAtPantalla())){
                //entro porque el usuario dejo la operacion incomplenta:
                    //Ejemeplo: +,-, 6+, 8/, 3x, etc(el ultimo caracer es letra)
                alert("NO DEJES LAS OPERACIONES INCOMPLETAS")
                delete_last();
                return
            }
            //la operacion esta correcta, PERFECTA
            ejecutar_operaciones();
            return
        }

        //Eres punto o uno de los 4 operadores                        
            //avance del cursor 

        if(""!=(numeros[cursor].get_number()) && txt!="."){
            //entras porque el termino actual ya tiene numero,
            //eso significa que es el inicio del siguiente termino
            if(cursor==1){
                
                //entra porque ya es el segundo numero y quieres añadir un tercero(NO posible)
                //hay que ejecutar la operacion
                cursor=0;
                ejecutar_operaciones();
                //poner el resultado como termino 0
                //poner el cursor en la posicion 1 del array(termino 2)
            }
            cursor+=1;
        }
        
        //multipicacion o division en el primer termino
        if(cursor==0 &&(isNaN(txt+1))){
            //entras porque eres el primer termino y quieres dividir o multiplicar
            //(no se puede)
            //mandamos alerta y cancelamos la funcion para no escribir el operador en pantallla
            alert("OPERADOR INVALIDO")
            return;
        }
        txt=numeros[cursor].add_operador(txt);
    }else{
        //Entran los numeros    
        numeros[cursor].add_number(txt)
        pantalla.value+=txt;
    }
    // voy en la parte de añadir a la pantalla
        
    repaint();
}

function dar_eventos(nums){
    pantalla=document.getElementsByClassName("pantalla")[0];

    for(let b=0;b<2;b++){
        numeros.push(new Terminos());
    }

    for(let el=0;el<nums.length;el++){
        nums[el].onclick=function(txt=nums[el].value){
            txt=obtener_simbolo(txt)
            
            teclas(txt);
        }
    }
    // nums.array.forEach(element => {
        //     element.addEventListener("click",new funtion(){
            
    //     })  
    // });
}
let nums= document.getElementsByTagName("span")

dar_eventos(nums);