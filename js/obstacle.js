function initObstacle()
{
    // Obstacle();
    // Caisse();
    // Caisse2();

    IA();
}

function getRandomInt(min, max)
{
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

function IA()
{
    setInterval(function(){
        var result = getRandomInt(1, 3);

        if (result == 1)
        {
            Obstacle(speed);
        }
        else if (result == 2)
        {
           Caisse(speed);
        }
        else if (result == 3)
        {
           Caisse2(speed);
        }
    }, 500);
}

function Obstacle() // mur
{
    // Création box
    var box = BABYLON.Mesh.CreateBox("box", 1.0, scene);
    box.position.y = 3.1;
    box.position.x = 15;
    box.scaling.y = 7;
    box.material = new BABYLON.StandardMaterial("matbox", scene);

    scene.registerBeforeRender(function () {
        box.position.x -= speed;
        if (box.position.x < -15)
            box.isVisible = false;
            //box.position.x = 15;

        if (box.intersectsMesh(hitbox, false)) {
            box.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
        } else {
            box.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
        }
    });
}

function Caisse() // caisse en l'air
{
    // Création box
    var caisse = BABYLON.Mesh.CreateBox("caisse", 0.5, scene);
    caisse.position.y = 5;
    caisse.position.x = 15;
    caisse.material = new BABYLON.StandardMaterial("matbox", scene);

    scene.registerBeforeRender(function () {
        caisse.position.x -= speed;
        if (caisse.position.x < -15)
            caisse.isVisible = false;
            //caisse.position.x = 15;

        if (caisse.intersectsMesh(hitbox, false)) {
            caisse.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
        } else {
            caisse.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
        }
    });
}

function Caisse2() // caisse au sol
{
    // Création box
    var caisse = BABYLON.Mesh.CreateBox("caisse", 0.5, scene);
    caisse.position.y = 0;
    caisse.position.x = 15;
    caisse.material = new BABYLON.StandardMaterial("matbox", scene);

    scene.registerBeforeRender(function () {
        caisse.position.x -= speed;
        if (caisse.position.x < -15)
            caisse.isVisible = false;
            //caisse.position.x = 15;

        if (caisse.intersectsMesh(hitbox, false)) {
            caisse.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
        } else {
            caisse.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
        }
    });
}
