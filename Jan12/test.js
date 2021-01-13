
const f = ()=>{

    console.log("hello from test js")
    return 0
}

const y = ()=> {
    console.log("hello from y function")
    return "dummy text"
}

const obj = {

    name: "hello"
}
// export 
module.exports.function1 = f;
module.exports.function2 = y;
module.exports.obj = obj