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

function Collision(objet)
{
    setInterval(function(){
        if (objet.intersectsMesh(hitbox, false)) {
            objet.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
            objet.dispose();
        }
    }, 10);

}

function Obstacle() // mur
{
    // Création box
    var box = BABYLON.Mesh.CreateBox("box", 1.0, scene);
    box.position.y = 3.1;
    box.position.x = 15;
    box.scaling.y = 7;
    box.material = new BABYLON.StandardMaterial("matbox", scene);
    box.material.emissiveColor = new BABYLON.Color3(0, 0, 1);

    scene.registerBeforeRender(function () {
        box.position.x -= speed;
        if (box.position.x < -15)
            box.isVisible = false;
            //box.position.x = 15;
        //Collision(box);

    });
}

function VraiMur()
{
    BABYLON.SceneLoader.ImportMesh("", "textures/obs/", "mur.babylon", scene, function (meshes)
    {
       var m = meshes[0];
        // set the position of the model
        m.position = new BABYLON.Vector3(-16.5,7,11);
        m.rotate(BABYLON.Axis.Z, 3.14, BABYLON.Space.WORLD);
        m.rotate(BABYLON.Axis.Y, -1.57, BABYLON.Space.WORLD);
        // set the scale of the model
        m.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);
        //m.isVisible = false;
        // set relative referential, the model

        //AddMur(MUR_MODEL, 16.5, 3);
    });
}

function Caisse() // caisse en l'air
{
    // Création box
    var caisse = BABYLON.Mesh.CreateBox("caisse", 0.5, scene);
    caisse.position.y = 5;
    caisse.position.x = 15;
    caisse.material = new BABYLON.StandardMaterial("matbox", scene);
    caisse.material.emissiveColor = new BABYLON.Color3(0, 0, 1);

    scene.registerBeforeRender(function () {
        caisse.position.x -= speed;
        if (caisse.position.x < -15)
            caisse.isVisible = false;
            //caisse.position.x = 15;

        //Collision(caisse);
    });
}

function Caisse2() // caisse au sol
{
    // Création box
    var caisse = BABYLON.Mesh.CreateBox("caisse", 0.5, scene);
    caisse.position.y = 0;
    caisse.position.x = 15;
    caisse.material = new BABYLON.StandardMaterial("matbox", scene);
    caisse.material.emissiveColor = new BABYLON.Color3(0, 0, 1);

    scene.registerBeforeRender(function () {
        caisse.position.x -= speed;
        if (caisse.position.x < -15)
            caisse.isVisible = false;
            //caisse.position.x = 15;

        //Collision(caisse);
    });
}
