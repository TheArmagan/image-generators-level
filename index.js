const { createCanvas, loadImage } = require("canvas");
const chillout = require("chillout");
const {percent, threeDots, defaultify} = require("stuffs");
const { getAverageColor } = require("fast-average-color-node");
const path = require("path");

/**
 * @param {{backgroundSource?:string,avatarSource?:string,username?:string,xpMax?:Number,xpCurrent?:number,currentLevel?:number}} opts
 */
async function draw(opts={}) {
  opts = defaultify(opts, {
    backgroundSource: path.resolve(__dirname, "background.jpg"),
    avatarSource: "https://i.imgur.com/Mj3IzDZ.png",
    username: "Armagan#4869",
    xpMax: 100,
    xpCurrent: 25,
    currentLevel: 1
  });

  const canvas = createCanvas(350, 132);
  const ctx = canvas.getContext("2d");

  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const avatarImage = await loadImage(opts.avatarSource);
  const bgImage = await loadImage(opts.backgroundSource);

  let avatarAVGColor = await getAverageColor(opts.avatarSource);

  ctx.drawImage(
    bgImage,
    0,
    0,
    bgImage.width > canvas.width ? bgImage.width : canvas.width,
    bgImage.height > canvas.height ? bgImage.height : canvas.height
  );

  ctx.globalAlpha = 0.3;

  await chillout.repeat(8, () => {
    ctx.drawImage(canvas, 1, 0, canvas.width - 1, canvas.height, 0, 0, canvas.width - 1, canvas.height);
    ctx.drawImage(canvas, 0, 1, canvas.width, canvas.height - 1, 0, 0, canvas.width, canvas.height - 1);
  });

  ctx.globalAlpha = 1;

  ctx.fillStyle = "#00000077";
  ctx.fillRect(8, 8, canvas.width - 16, canvas.height - 16);

  let generalPadding = 16;
  let avatarX = 16;
  let avatarY = 16;
  let avatarSize = 100;
  ctx.fillStyle = `${avatarAVGColor.hex}ee`;
  ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);
  let avatarPadding = 4;
  ctx.drawImage(
    avatarImage,
    avatarX + avatarPadding,
    avatarY + avatarPadding,
    avatarSize - avatarPadding * 2,
    avatarSize - avatarPadding * 2
  );

  ctx.fillStyle = "#fffffffe";
  ctx.font = "bold 20px 'Trebuchet MS'";

  ctx.fillText(
    threeDots(opts.username, 18),
    avatarX + avatarSize + generalPadding / 2,
    avatarY
  );

  ctx.fillStyle = "#ffffffee";
  ctx.font = "20px 'Trebuchet MS'";
  ctx.fillText(
    `${opts.xpCurrent} / ${opts.xpMax} / ${opts.currentLevel} LVL`,
    avatarX + avatarSize + generalPadding / 2,
    avatarY * 2 + generalPadding / 2
  );

  ctx.fillStyle = "#00000070";
  let barBorderX = avatarX + avatarSize + generalPadding / 2;
  let barBorderHeight = 24;
  let barBorderWidth = canvas.width - barBorderX - generalPadding;
  let barBorderY = canvas.height - avatarY - barBorderHeight;
  ctx.fillRect(
    barBorderX,
    barBorderY,
    barBorderWidth,
    barBorderHeight
  );

  ctx.fillStyle = `${avatarAVGColor.hex}ee`;
  let barPadding = 4;

  ctx.fillRect(
    barBorderX + barPadding,
    barBorderY + barPadding,
    percent(opts.xpCurrent, opts.xpMax, barBorderWidth - barPadding * 2),
    barBorderHeight - barPadding * 2
  );

  return canvas.toBuffer("image/png");
}

module.exports = draw;