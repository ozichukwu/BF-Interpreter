function interprete(code, input=""){
    code = code.replace(/[^<>\+\-\.,\[\]]/g, "");
    const jumps = {}, open = [], mem = Array(1000).fill(0);
    let pt = 0, out = "", ix = 0;
    for (let i = 0; i < code.length; i++) {
        if (code[i] === "[") open.push(i);
        else if (code[i] === "]") jumps[i] = open[open.length-1], jumps[open.pop()] = i;
    }
    for (let i = 0; i < code.length; i++) {
        const cmd = code[i];
        if (cmd === ">") pt++;
        else if (cmd === "<") pt--;
        else if (cmd === "+") mem[pt] = (mem[pt]+1) % 256;
        else if (cmd === "-") mem[pt] = (mem[pt]+255) % 256;
        else if (cmd === ".") out += String.fromCharCode(mem[pt]);
        else if (cmd === ",") mem[pt] = ix === input.length ? 0 : input.charCodeAt(ix++);
        else if (cmd === "[" && !mem[pt]) i = jumps[i];
        else if (cmd === "]" && mem[pt]) i = jumps[i];
        if (pt < 0 || pt === mem.length) throw `Memory Error: You wanted to ${pt < 0 ? '<' : ">"} out of range`;
    }
    return out;
}
