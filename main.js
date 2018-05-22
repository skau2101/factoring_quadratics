var form;

var error = "CAN'T BE FACTORED";

function submit(){
    form = {
        a : $('#a').val(),
        b : $('#b').val(),
        c : $('#c').val()
    };
    
    var factored = factor();
    
    if(factored == error){
        alert(factor());
    }
    else{
        $('#output')[0].innerHTML = '<h3>' + factored + '</h3>';
    }
}

function factor(){
    if(!form.a) form.a = 1;
    var b = findB(form.a * form.c, form.b);
        if(!b) return error;
        console.log(b);
    var gcf1 = gcf(form.a, b[0]);
        console.log(gcf1);
        if(!gcf1) return error;
    var gcf2 = gcf(b[1], form.c);
        if(!gcf2) return error;
    var term1 = form.a / gcf1;
    var term2 = b[0] / gcf1;
    
    log(assemble(term1, term2, gcf1, gcf2));

    return(assemble(term1, term2, gcf1, gcf2));
}

function findB(c, b){
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
    return(check(b, factors) ? factors : false);
}

function gcf(x, y){
    for(var i = x; i > 0; i--){
        if(x % i === 0 && y % i === 0){
            return i;
        }
    }
    return false;
}

function check(b, factors){
    if(factors[0] + factors[1] == b) return true;
    else return false;
}

function simplify(){
    
}

function assemble(term1, term2, gcf1, gcf2){
    if(term1 == 1) term1 = "";
    if(gcf1 == 1) gcf1 = "";
    
    return("(" + term1 +  "x + " + term2 + ")(" + gcf1 + "x + " + gcf2 + ")");
}

function log(assembly){
    var row = document.createElement('tr');
    var equation = document.createElement('td');
    var factored = document.createElement('td');
    row.insertBefore(equation, null);
    row.insertBefore(factored, null);
    $('#table')[0].insertBefore(row, null);
    
    var a = form.a;
    if(a == 1) a = "";
    
    equation.innerHTML = 'f(x)= ' + a + 'x' + '<sup>2</sup>' +
        ' + ' + form.b + 'x' + ' + ' + form.c;
    factored.innerHTML = assembly;
}

function end(code){
    if(code !== 0) alert('Cannnot be factored');
}

for(var i in $("input")){
    if(i % 1 == 0) $("input")[i].addEventListener('keydown', function(e){
        if(e.keyCode == 13) submit();
    });
}