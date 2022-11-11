export function generate():string[] {
    return shuffle( "0123456789".split('')).slice(0,4)
}

function shuffle(o:string[]):string[]{
    for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}