var sp = {
    Term : function(str, side_right){
        side_right = side_right || false;
        this.coef = (side_right ? -Number(str.match(/^\-*\d+/) ? str.match(/^\-*\d+/)[0] : 1) :
            Number(str.match(/^\-*\d+/) ? str.match(/^\-*\d+/)[0] : 1));
        this.variable = (str.match(/[A-Z]+/i) ? str.match(/[A-Z]+/i)[0] : 0);
        this.exponent = Number(str.match(/\^\d+/) ? str.match(/\^\d+/)[0].replace(/\^/, "") : 1);
    },
    
    noSpaces : function(str){
        return str.replace(/\s+/g, "");
    },
    m2pm : function(str){
        return str.replace(/\-/g, "+-");
    },
    sides : function(str){
        var answ = {};
        answ.left = str.split(/\=/)[0];
        answ.right = (str.split(/\=/)[1] ? str.split(/\=/)[1] : "");
        return answ;
    },
    seperate : function(str){
        return {
            right : str.right.split(/\+/),
            left : str.left.split(/\+/)
        };
    },
    mkterms : function(sides){
        sides.terms = [];
        for(var i in sides.right){
            if(sides.right[i]) sides.terms.push(new this.Term(sides.right[i], true));
        }
        for(var j in sides.left){
            if(sides.left[j]) sides.terms.push(new this.Term(sides.left[j]));
        }
        
        return sides.terms;
    },
    sort : function(terms){
        var sorted = {};
        for(var i in terms){
            if(!sorted[terms[i].exponent]) sorted[terms[i].exponent] = {};
            if(!sorted[terms[i].exponent][terms[i].variable])
                sorted[terms[i].exponent][terms[i].variable] = 0;
            sorted[terms[i].exponent][terms[i].variable] += terms[i].coef;
        }
        return sorted;
    },
    
    assem : function(eq){
        eq = this.noSpaces(eq);
        eq = this.m2pm(eq);
        eq = this.sides(eq);
        eq = this.seperate(eq);
        eq = this.mkterms(eq);
        eq = this.sort(eq);
        return eq;
    }
};