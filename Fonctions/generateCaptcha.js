const Discord = require("discord.js")
const Canvas = require("canvas")

module.exports = async () => {

    let caracters = [..."1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]
    let text = [];
    for(let i = 0; i < 6; i++) text.push(caracters[Math.floor(Math.random() * caracters.length)]);
    text = text.join("");

    const canvas = Canvas.createCanvas(300, 150)
    const ctx = canvas.getContext("2d")

    ctx.font = '35px "Arial"'
    ctx.fillStyle ="RANDOM"
    ctx.fillText(text, (150 - (ctx.measureText(text).width) / 2), 85)

    return {canvas: canvas, text: text}
}