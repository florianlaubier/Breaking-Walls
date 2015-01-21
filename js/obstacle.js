var BOUCHE_MODEL;
var MUR_MODEL;
var BOITE_MODEL;

function initObstacle()
{
    Obstacle();
    //Bouche();
    //VraiMur();
    IA();
}

function getRandomInt(min, max)
{
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

function IA()
{
    // var i = 3000;

    // while (i >= 500)
    // {
    //     setInterval(function(){ i = i - 10; }, 2000);
    // }

    // setInterval(function(){
    //     var result = getRandomInt(1, 3);

    //     if (result == 1)
    //     {
    //         Obstacle(speed);
    //     }
    //     else if (result == 2)
    //     {
    //        Caisse(speed);
    //     }
    //     else if (result == 3)
    //     {
    //        Caisse2(speed);
    //     }
    // }, i);

    setInterval(function(){
        var result = getRandomInt(1, 3);

        if (result == 1)
        {
            Boite(speed);
        }
        else if (result == 2)
        {
           Bouche(speed);
        }
        else if (result == 3)
        {
           Mur(speed);
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
    BABYLON.SceneLoader.ImportMesh("", "textures/obs/", "bouche.babylon", scene, function (meshes)
    {
        var m = meshes[0];
        // set the position of the model
        m.position = new BABYLON.Vector3(150,0,-10);
        //m.rotate(BABYLON.Axis.Z, 3.14, BABLON.Space.WORLD);
        //m.rotate(BABYLON.Axis.Y, -1.57, BABYLON.Space.WORLD);
        // set the scale of the model
        m.scaling = new BABYLON.Vector3(0.08, 0.08, 0.08);
        BOUCHE_MODEL = m;
    });

    BABYLON.SceneLoader.ImportMesh("", "textures/obs/", "boite-aux-lettres.babylon", scene, function (meshes)
    {
        var k = meshes[0];
        // set the position of the model
        k.position = new BABYLON.Vector3(145,-0.25,-4);
        // m.rotate(BABYLON.Axis.Z, 3.14, BABYLON.Space.WORLD);
        // m.rotate(BABYLON.Axis.Y, -1.57, BABYLON.Space.WORLD);
        // set the scale of the model
        k.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
        BOITE_MODEL = k;
    });


    BABYLON.SceneLoader.ImportMesh("", "textures/obs/", "mur.babylon", scene, function (meshes)
    {
        var l = meshes[0];
        // set the position of the model
        l.position = new BABYLON.Vector3(150,0,0);
        l.rotate(BABYLON.Axis.Y, 1.62, BABYLON.Space.WORLD);
        //m.rotate(BABYLON.Axis.Y, -1.57, BABYLON.Space.WORLD);
        // set the scale of the model
        l.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);
        MUR_MODEL = l;
    });

}

// function Obstacle() // mur
// {
//     // Création box
//     var box = BABYLON.Mesh.CreateBox("box", 1.0, scene);
//     box.position.y = 3.1;
//     box.position.x = 15;
//     box.scaling.y = 7;
//     box.material = new BABYLON.StandardMaterial("matbox", scene);
//     box.material.emissiveColor = new BABYLON.Color3(0, 0, 1);

//     scene.registerBeforeRender(function () {
//         box.position.x -= speed;
//         if (box.position.x < -15)
//             box.isVisible = false;
//             //box.position.x = 15;
//         //Collision(box);

//     });
// }


function Bouche()
{
    BABYLON.SceneLoader.ImportMesh("", "textures/obs/", "bouche.babylon", scene, function (meshes)
    {
       var m = meshes[0];
        // set the position of the model
        m.position = new BABYLON.Vector3(0,1,0);
        //m.rotate(BABYLON.Axis.Z, 3.14, BABYLON.Space.WORLD);
        m.rotate(BABYLON.Axis.Y, -1.57,  BABYLON.Space.WORLD);
        // set the scale of the model
        m.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);
        BOUCHE_MODEL = m;
    });

}

function Boite() // caisse en l'air
{
    // Création box
    var caisse = BOITE_MODEL.clone(BOITE_MODEL.name);

    caisse.position.x = 15;
    scene.registerBeforeRender(function () {
        caisse.position.x -= speed;
        if (caisse.position.x < -15)
            caisse.isVisible = false;
            //caisse.position.x = 15;

        //Collision(caisse);
    });
}

function Bouche() // caisse au sol
{
    // Création box
    var caisse = BOUCHE_MODEL.clone(BOUCHE_MODEL.name);
    caisse.position.x = 15;

    scene.registerBeforeRender(function () {
        caisse.position.x -= speed;
        if (caisse.position.x < -15)
            caisse.isVisible = false;
            //caisse.position.x = 15;

        //Collision(caisse);
    });
}

function Mur() // mur
{
    // Création box
    var caisse = MUR_MODEL.clone(MUR_MODEL.name);
    caisse.position.x = 15;

    scene.registerBeforeRender(function () {
        caisse.position.x -= speed;
        if (caisse.position.x < -15)
            caisse.isVisible = false;
            //caisse.position.x = 15;

        //Collision(caisse);
    });
}

function VraiMur()
{
    BABYLON.SceneLoader.ImportMesh("", "textures/obs/", "mur.babylon", scene, function (meshes)
    {
       var m = meshes[0];
        // set the position of the model
        m.position = new BABYLON.Vector3(5,1,0);
        //m.rotate(BABYLON.Axis.Z, 3.14, BABYLON.Space.WORLD);
        m.rotate(BABYLON.Axis.Y, -1.57, BABYLON.Space.WORLD);
        // set the scale of the model
        m.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);
        BOUCHE_MODEL = m;
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
