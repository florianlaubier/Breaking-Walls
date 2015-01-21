// Player
var player;
var hitbox;

function initJoueur () {
    var spriteManagerPlayer = new BABYLON.SpriteManager("playerManager","textures/player.png", 2, 64, scene);

    player = new BABYLON.Sprite("player", spriteManagerPlayer);
    player.position.y = 1.5;
    //player.position.x = -8; // Qu'es ce que c'est ?
    player.size = 3;
    player.invertU = -1;
    player.playAnimation(0, 6, true, 100);

    // Hitbox player
    hitbox = BABYLON.Mesh.CreateBox("box", 1.0, scene);
    hitbox.position.y = 1;
    //hitbox.position.x = -8; // What ?
    hitbox.scaling.y = 3;

    materialHitbox = new BABYLON.StandardMaterial("texture1", scene);
    hitbox.material = materialHitbox;
    hitbox.material.alpha = 0;

    function AnimateMofo (player, pos, posRef, speed, range, axis)
    {
        // Create the Animation object
        var animate = new BABYLON.Animation(
        "animate",
        "", // fail
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

        // Animations keys
        var keys = [];
        keys.push({
            frame: 0,
            value: pos
        },{
            frame: 10+ (speed/2),
            value: pos+range
        },{
            frame: 20+speed,
            value: posRef
        });

        // Add these keys to the animation
        animate.setKeys(keys);

        // Link the animation to the mesh
        player.animations.push(animate);

        // Animation hitbox
        var animationBox = new BABYLON.Animation("myAnimation", " "/*fail*/, 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animationBox.setKeys(keys);
        hitbox.animations.push(animationBox);

        // Run the animation !
        if(posRef == pos)
        {
            scene.beginAnimation(player, 0, 20+speed, false, 1);
            scene.beginAnimation(hitbox, 0, 20+speed, false, 1);
        }
    }

    function Jump (perso, saut, speedJump) {
        // Get the initial position of our mesh
        var posY = perso.position.y;
        var posRef = 1.5;
        // Create the Animation object
        var animateJump = new BABYLON.Animation(
        "animateJump",
        "position.y",
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

        // Animations keys
        var keys = [];
        keys.push({
            frame: 0,
            value: posY
        },{
            frame: 10+ (speedJump/2),
            value: posY+saut
        },{
            frame: 20+speedJump,
            value: posRef
        });

        // Add these keys to the animation
        animateJump.setKeys(keys);

        // Link the animation to the mesh
        perso.animations.push(animateJump);

        // Animation hitbox
        var animationBox = new BABYLON.Animation("myAnimation", "position.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animationBox.setKeys(keys);
        hitbox.animations.push(animationBox);

        // Run the animation !
        if(posRef == posY)
        {
            scene.beginAnimation(perso, 0, 20+speedJump, false, 1);
            scene.beginAnimation(hitbox, 0, 20+speedJump, false, 1);
        }
    }

    function AntiJump(perso, speedJump)
    {
        // Get the initial position of our mesh
        var posY = perso.position.y;
        var posRef = 1.5;

        // Create the Animation object
        var animateAntiJump = new BABYLON.Animation(
        "animateAntiJump",
        "position.y",
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

        // Animations keys
        var keys = [];
        keys.push({
            frame: 0,
            value: posY
        },{
            frame: 5,
            value: posRef
        });

        // Add these keys to the animation
        animateAntiJump.setKeys(keys);

        // Link the animation to the mesh
        perso.animations.push(animateAntiJump);

        // Animation hitbox
        var animationBox = new BABYLON.Animation("myAnimation", "position.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animationBox.setKeys(keys);
        hitbox.animations.push(animationBox);

        // Run the animation !

        scene.beginAnimation(perso, 0, 20+speedJump, false, 1);
        scene.beginAnimation(hitbox, 0, 20+speedJump, false, 1);

    }

        function Kick (perso, lengthKick, speedKick) {
        // Get the initial position of our mesh
        var posX = perso.position.x;
        var posRef = -8;
        // Create the Animation object
        var animateKick = new BABYLON.Animation(
        "animateKick",
        "position.x",
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

        // Animations keys
        var keys = [];
        keys.push({
            frame: 0,
            value: posX
        },{
            frame: 10+ (speedKick/2),
            value: posX+lengthKick
        },{
            frame: 20+speedKick,
            value: posRef
        });

        // Add these keys to the animation
        animateKick.setKeys(keys);

        // Link the animation to the mesh
        perso.animations.push(animateKick);

        // Animation hitbox
        var animationBox = new BABYLON.Animation("myAnimation", "position.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animationBox.setKeys(keys);
        hitbox.animations.push(animationBox);

        // Run the animation !
        if(posRef == posX)
        {
            scene.beginAnimation(perso, 0, 20+speedKick, false, 1);
            scene.beginAnimation(hitbox, 0, 20+speedKick, false, 1);
        }
    }


    window.addEventListener("keydown", function (e)
    {
        //console.log(e.which);

        if(e.which == 32) // espace
        {
            //AnimateMofo(player, player.position.y, 1.5, speedJump, heightJump /* , fail */);
            Jump(player, heightJump, speedJump);
        }
    });

    window.addEventListener("keyup", function (e)
    {
        //console.log(e.which);

        if(e.which == 32) // espace
        {
            AntiJump(player, speedJump);

        }
    });


    window.addEventListener("keypress", function (e)
    {
        console.log(e.which);

        if(e.which == 68 || e.which == 100) // D
        {
            Kick(player, lengthKick, speedKick);
        }
    });

    // window.addEventListener("keypress", function (e) {
    //     //console.log(e.which);

    //     if(e.which == 32) // espace
    //     {
    //         Jump(player, heightJump, 0);

    //     }
    //     else if(e.which == 113) // Q
    //     {
    //         scene.registerBeforeRender(function ()
    //         {
    //         player.position.x -= speed;
    //         });
    //     }
    //     else if(e.which == 100) // D
    //     {
    //         scene.registerBeforeRender(function ()
    //         {
    //         player.position.x += speed;
    //         });
    //     }
    // });
}
