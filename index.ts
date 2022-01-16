import tokenizer from './tokenizer'
import compile from './compiler'
compile(tokenizer(`
o: {
    a: 'b',
    b: [123, 321.123, .12, -1214],
    c: true
}
# the o is object
{ a }: o
if a == /b/
    log('a')
orif a == 'a'
    log('b')
or
    log('c')
fun abc(arg)
    give arg
o::a:+ 'bc'
log(abc('xyz'))
i: 0
loop i < 10
    i++
    log(i)
loop c of o::b
    log(c)
a::c & log('data: $a::c')
log(..o::b)
`))