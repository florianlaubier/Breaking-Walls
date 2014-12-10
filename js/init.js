var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var speed = 0.05;
    var speedJump = 0.2;
    var heightJump = 4;
    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);

    var decor = new BABYLON.Scene(engine);



    // Background color
    scene.clearColor = new BABYLON.Color3(1,1,1);

    // Création de la caméra
    var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 4, -15), scene);
    //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene);

    camera.target = player;

    // Attache la caméra au canvas
    camera.attachControl(canvas, true);

    // création de la lumière
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Intensité de la lumière
    light.intensity = 0.5;

    // Player
    var spriteManagerPlayer = new BABYLON.SpriteManager("playerManager","../textures/player.png", 2, 64, scene);
    var player = new BABYLON.Sprite("player", spriteManagerPlayer);
    player.position.y = 1.5;
    player.size = 3;
    player.invertU = -1;
    player.playAnimation(0, 6, true, 100);

    window.addEventListener("keypress", function (e) {
        console.log(e.which);

        if(e.which == 32)
        {
            Jump(player, heightJump, 0);

        }
    });

    window.addEventListener("keypress", function (e) {
        //console.log(e.which);

        if(e.which == 113)
        {
            scene.registerBeforeRender(function ()
            {
            player.position.x -= speed;
            });
        }

        else if(e.which == 100)
        {
            scene.registerBeforeRender(function ()
            {
            player.position.x += speed;
            });
        }
    });

    // Hitbox
    var hitbox = BABYLON.Mesh.CreateBox("box", 1.0, scene);
    hitbox.position.y = 1;
    hitbox.scaling.y = 3;
    var materialHitbox = new BABYLON.StandardMaterial("texture1", scene);
    hitbox.material = materialHitbox;
    hitbox.material.alpha = 0;


    var speed = 0.05;

    function Decor(speed)
    {
    // Création du sol
    var ground = BABYLON.Mesh.CreateGround("ground1", 60, 6, 2, scene);

    // Création du mur, scale et position
    var plane = BABYLON.Mesh.CreatePlane("plane", 7.0, scene);
    plane.scaling.x = 8;
    plane.position = new BABYLON.Vector3(0,3.5,3);

    // Déplacement du mur et du ground
    scene.registerBeforeRender(function () {

        if (plane.position.x < -15)
            plane.position.x = 15;
        });

        scene.registerBeforeRender(function () {
        ground.position.x -= speed;
        if (ground.position.x < -15)
            ground.position.x = 15;
        });
    }

    function Obstacle(speed)
    {
        // Création box
        var box = BABYLON.Mesh.CreateBox("box", 1.0, scene);
        box.position.y = 3.1;
        box.scaling.y = 7;
        box.material = new BABYLON.StandardMaterial("matbox", scene);

        scene.registerBeforeRender(function () {
            box.position.x -= speed;
            if (box.position.x < -15)
                box.position.x = 15;

            if (box.intersectsMesh(hitbox, false)) {
                box.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
            } else {
                box.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
            }
        });
    }

    function Caisse(speed)
    {
        // Création box
        var caisse = BABYLON.Mesh.CreateBox("caisse", 0.5, scene);
        caisse.position.y = 5;
        caisse.position.x = 10;
        caisse.material = new BABYLON.StandardMaterial("matbox", scene);

        scene.registerBeforeRender(function () {
            caisse.position.x -= speed;
            if (caisse.position.x < -15)
                caisse.position.x = 15;

            if (caisse.intersectsMesh(hitbox, false)) {
                caisse.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
            } else {
                caisse.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
            }
        });
    }

    function Caisse2(speed)
    {
        // Création box
        var caisse = BABYLON.Mesh.CreateBox("caisse", 0.5, scene);
        caisse.position.y = 0;
        caisse.position.x = 20;
        caisse.material = new BABYLON.StandardMaterial("matbox", scene);

        scene.registerBeforeRender(function () {
            caisse.position.x -= speed;
            if (caisse.position.x < -15)
                caisse.position.x = 15;

            if (caisse.intersectsMesh(hitbox, false)) {
                caisse.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
            } else {
                caisse.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
            }
        });
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
                    frame: 10+speedJump,
                    value: posY+saut
                },{
                    frame: 20+speedJump,
                    value: posRef
                });

                // Add these keys to the animation
                animateJump.setKeys(keys);

                // Link the animation to the mesh
                perso.animations.push(animateJump);

                // Run the animation !
                if(posRef == posY)
                scene.beginAnimation(perso, 0, 20+speedJump, false, 1);

            }

    Decor(speed);
    Obstacle(0.5);
    Caisse(0.5);
    Caisse2(0.5);

    // Leave this function
    return scene;

};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
