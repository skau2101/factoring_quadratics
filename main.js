var a, b, c;
var num1, num2;

function submit(){
    a = $('#a').val();
    b = $('#b').val();
    c = $('#c').val();
    
    if(a) {
        b /= a;
        c /= a;
    }
    
    factor();
}

function factor(){

    var factors = [];
    var guess = 0;
    while(guess < Math.sqrt(Math.abs(c))){
        if(c % guess === 0){
            factors = [
                guess,
                c / guess
            ];
            if(check(b, factors)) break;
        }
        if(c % -guess === 0){
            factors = [
                -guess,
                c / -guess
            ];
            if(check(b, factors)) break;
        }
        
        guess += 1;
    }
    
    if(check(b, factors)) assemble(factors[0], factors[1]);
    else alert('Cannot be factored');
}

function check(b, factors){
    console.log(factors);
    
    if(factors[0] + factors[1] == b){
        return true;
    }
    else return false;
}

function assemble(num1, num2){
    display(a + "(x + " + num1 + ")(x + " + num2 + ")");
}

function display(assembly){
    $('#output')[0].innerHTML = "<h3>" + assembly + "</h3>";
}


document.addEventListener('keydown', function(e){
    if(e.keyCode == 13) submit();
});