export default function randomNumber (pick, from, to) {
    let results=[];
    let end;
    if(pick<=0) return results;
    else if ((to-from+1)<pick) end = to-from+1;
    else end=pick;
    for(let i=0; i<end; i++){
        let randomNumber = Math.floor(Math.random() * (to - from + 1) + from);
        while(results.includes(randomNumber)) randomNumber = Math.floor(Math.random() * (to - from + 1) + from);
        results.push(randomNumber);
    }
    return results;
}