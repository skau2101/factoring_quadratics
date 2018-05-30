var error = "CAN'T BE FACTORED";
var a, form;

function submit(){
    input = $('#equation').val();
    
    eq = sp.assem(input);
    
    console.log(eq);
    
    if(Object.keys(eq[2]).length > 1){
        alert(error);
        return -1;
    }

    form = {
        a : eq[2].x,
        b : eq[1].x,
        c : eq[1][0]
    };
    
    if(form.a < 0) for(var i in form) form[i] *= -1;
    
    var factored = factor();
    
    if(!factored) alert(error);
    else{
        $('#output')[0].innerHTML = '<h3>' + factored + '</h3>';
    }
}

function factor(){
    a = 1;
    console.log(a);
    var terms = [];
    
    if(gcf([form.a, form.b, form.c])){
        var fac = gcf([form.a, form.b, form.c]);
        form.a /= fac;
        form.b /= fac;
        form.c /= fac;
        a *= fac;
    }
    if(!form.a) form.a = 1;
    if(a == 1){
        var b = findB(form.c, form.b);
        console.log(b);
        if(!b) return false;
        terms[0] = 1;
        terms[1] = b[0];
        terms[2] = 1;
        terms[3] = b[1];
    }
    else{
        var b = findB(form.a * form.c, form.b);
        console.log(b);
        terms[2] = gcf([form.a, b[0]]);
        terms[3] = gcf([b[1], form.c]);
        terms[0] = form.a / terms[2];
        terms[1] = b[0] / terms[2];
    }
    
    for(var i in terms) if(!terms[i]) return false;

    console.log(terms);

    log(assemble(terms));

    return(assemble(terms));
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

function gcf(arr){
    var works = false;
    for(var i = Math.abs(arr[0]); i > 0; i--){
        works = true;
        for(var j in arr){
            if(Math.abs(arr[j]) % i !== 0){
                works = false;
                break;
            }
        }
        if(works) return i;
    }
    return false;
}

function check(b, factors){
    if(factors[0] + factors[1] == b) return true;
    else return false;
}

function assemble(terms){
    var assembly = (a + "(" + terms[0] +  "x + " + terms[1] + ")(" + terms[2] + "x + " + terms[3] + ")");
    assembly = assembly.replace(/1/g, '');
    return assembly;
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
    
    equation.innerHTML = input;
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