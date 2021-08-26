import { three } from './three'
import _ from 'lodash'
const jsonObjectImport = async () => import(/* webpackChunkName: "myChunkName" */ "./big-object.json")

_.cloneDeep({})
console.log(three)

document.getElementById("button").addEventListener("click", function() {
    jsonObjectImport().then(jsonObject => console.log(jsonObject.default))
})
