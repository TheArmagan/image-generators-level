> # Image Generators: Level
> Armağan's Image Generators: Level


## Preview
- Automatically **blurs** the background image.
- **Fast:** Small (350x132) and async.
- Default preview
![Default Preview](https://i.imgur.com/LtI4YmK.png)
- Accent color based on avatar image
![Image changes accent color](https://i.imgur.com/J60vZei.png)
- Custom background image
![Custom background image](https://i.imgur.com/amWRxZ3.png)

## Basic Usage
```js
const drawLevelImage = require("image-generators-level");

(async ()=>{

  let image = await drawLevelImage({
  // backgroundSource: |
  //  "<image url>",   | Optional
    avatarSource: 
      message.author.avatarURL(), // string
  
    username: 
      message.author.tag, // string

    xpMax: 
      db.get(`xpMax.${message.author.id}`), // number

    xpCurrent: 
      db.get(`xpCurrent.${message.author.id}`), // number

    currentLevel: 
      db.get(`currentLevel.${message.author.id}`), // number
  });

  message.channel.send(new MessageAttachment(image, "igl.png"));
})();
```