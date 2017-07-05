#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const express = require('express')
const open = require('open')
const imageType = require('image-type')
const app = express()

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

    ls.sort()

    if (program.random){
        let ols = ls
        ls = []
        while (ols.length > 0){
            let i = Math.floor(Math.random() * ols.length)
            ls.push(ols[i])
            ols.splice(i, 1)
        }
    }

    return ls
}

program
    .version('1.0.0')
    .option('-r, --random', 'Random swarp image list')
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

app.listen(3000, () => {
    open('http://localhost:3000')
})
