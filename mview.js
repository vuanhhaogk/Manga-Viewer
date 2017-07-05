#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const express = require('express')
const open = require('open')
const imageType = require('image-type')
const app = express()
const exec = require('child_process').exec

function getList(){
    let ls = fs.readdirSync(root)
    let i = 0

    while (i < ls.length){
        let path = `${root}/${ls[i]}`
        let info = imageType(fs.readFileSync(path))
        if (!info || !info.mime || info.mime.indexOf('image') === -1){
            ls.splice(i, 1)
            continue
        }

        i++
    }

    switch (true){
        case program.random:
            let ols = ls
            ls = []
            while (ols.length > 0){
                let i = Math.floor(Math.random() * ols.length)
                ls.push(ols[i])
                ols.splice(i, 1)
            }
            break
        case program.top:
            let os = ls
            let data = fs.existsSync(`.info`) ? JSON.parse(fs.readFileSync(`.info`)) : {}
            ls = []
            for (let i = 0; i < os.length; i++){
                let j = ls.length - 1
                while (j >= 0){
                    let d1 = data[os[i]] || 0
                    let d2 = data[ls[j]] || 0
                    if (d1 > d2){
                        ls[j + 1] = ls[j]
                        j--
                    } else
                        break
                }
                ls[j + 1] = os[i]
            }
            break
        default:
            ls.sort()
    }

    if (program.random){

    }

    return ls
}

program
    .version('1.0.0')
    .option('-r, --random', 'Random swarp image list')
    .option('-t, --top', 'Sort image by star')
    .parse(process.argv)

let root = process.cwd()
let aroot = __dirname

app.use('/images', express.static(root))
app.use('/assets', express.static(`${aroot}/viewer/assets`))

app.get('/', (req, res) => {
    res.sendFile(`${aroot}/viewer/index.html`)
})

app.get('/get-list', (req, res) => {
    res.json(getList())
})

app.get('/vote', (req, res) => {
    let name = req.query.name
    let data = fs.existsSync(`.info`) ? JSON.parse(fs.readFileSync(`.info`)) : {}
    data[name] = data[name] ? data[name] + 1 : 1
    fs.writeFileSync(`.info`, JSON.stringify(data))
    res.sendStatus(200)
})

app.listen(3000, () => {
    open('http://localhost:3000')
})
