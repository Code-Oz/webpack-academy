import { three } from './three'
import _ from 'lodash'
import { tata } from './toto/tata/tata'
const jsonObjectImport = async () => import(/* webpackChunkName: "myChunkName" */ "./big-object.json")

_.cloneDeep({})
console.log(three)
tata()
console.log(process.env.TOTO_ENV)

document.getElementById("button").addEventListener("click", function() {
    jsonObjectImport().then(jsonObject => console.log(jsonObject.default))
})
