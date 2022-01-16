function tokenizer(code = '', final: { type: string, data: string }[] = [], i = 0, d = '') {
    for (i = -1; i < code.length; i++) {
        switch (code[0]) {
            case '"':
            case "'":
                (d = tokenizer.str(code)) && final.push({ type: 'str', data: d })
                break
            case '#':
                (d = tokenizer.msg(code)) && final.push({ type: 'msg', data: d.slice(1).trim() })
                break
            default:
                if (/[0-9]/.test(code[0])) (d = tokenizer.num(code)) && final.push({ type: 'num', data: d })
                else if (/[a-zA-Z]/.test(code[0])) (d = tokenizer.val(code)) && final.push({ type: 'val', data: d })
                else (d = tokenizer.sym(code)) ? final.push({ type: 'sym', data: d }) : final.push({ type: 'etc', data: d = tokenizer.etc(code) })
        }
        code = code.slice(d.length)
        i = -1
    }
    return final
}
tokenizer.str = function (code = '', match = null): string {
    return (match = /\".*?\"/.exec(code) || /\'.*?\'/.exec(code)) ? match[0] : ''
}
tokenizer.num = function (code = '', match = null): string {
    return (match = /\d+/.exec(code)) ? match[0] : ''
}
tokenizer.val = function (code = '', match = null): string {
    return (match = /[a-zA-Z_][a-zA-Z0-9_]*/.exec(code)) ? match[0] : ''
}
tokenizer.msg = function (code = '', match = null): string {
    return (match = /#.*/.exec(code)) ? match[0] : ''
}
tokenizer.sym = function (code = '', s = ''): string {
    for (s of ['++', '--', '::', '>=', '<=', '==', '!=', ':+', ':-', ':/', ':*', ':%', '|', '&', '+', '-', '*', '/', '%', '<', '>', '!', ':', '[', ']', '(', ')', '{', '}']) if (code.startsWith(s)) return s
    return ''
}
tokenizer.etc = function (code = '', final = '', c = ''): string {
    for (c of code) if (c != code[0]) break
    else final += c
    return final
}
export default tokenizer