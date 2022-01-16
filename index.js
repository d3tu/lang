function parse(code = '', final = [], i = 0, d = '') {
  for (i = -1; i < code.length; i++) {
    switch (code[0]) {
      case '"':
      case "'":
        (d = parse.str(code)) && final.push({ type: 'str', data: d })
        break
      case '#':
        (d = parse.msg(code)) && final.push({ type: 'msg', data: d.slice(1).trim() })
        break
      default:
        if (/[0-9]/.test(code[0])) (d = parse.num(code)) && final.push({ type: 'num', data: d })
        else if (/[a-zA-Z]/.test(code[0])) (d = parse.val(code)) && final.push({ type: 'val', data: d })
        else (d = parse.sym(code)) ? final.push({ type: 'sym', data: d }) : final.push({ type: 'etc', data: d = parse.etc(code) })
    }
    code = code.slice(d.length)
    i = -1
  }
  return final
}
parse.str = function(code = '', match) {
  return (match = /\".*?\"/.exec(code) || /\'.*?\'/.exec(code)) ? match[0] : ''
}
parse.num = function(code = '', match) {
  return (match = /\d+/.exec(code)) ? match[0] : ''
}
parse.val = function(code = '', match) {
  return (match = /[a-zA-Z_][a-zA-Z0-9_]*/.exec(code)) ? match[0] : ''
}
parse.msg = function(code = '', match) {
  return (match = /#.*/.exec(code)) ? match[0] : ''
} 
parse.sym = function(code = '', s = '') {
  for (s of ['++', '--', '::', '>=', '<=', '==', '!=', ':+', ':-', ':/', ':*', ':%', '|', '&', '+', '-', '*', '/', '%', '<', '>', '!', ':', '[', ']', '(', ')', '{', '}']) if (code.startsWith(s)) return s
  return ''
}
parse.etc = function(code = '', final = '', c) {
  for (c of code) if (c != code[0]) break
    else final += c
  return final
}
