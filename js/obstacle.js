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

var spawnSpeed = 3000;

function IA()
{
        function SpawnObstacle(){
            var result = getRandomInt(1, 3);

            if(!pause)
            {
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
                if(spawnSpeed > 500){
                    spawnSpeed = spawnSpeed - 100;
                    speed += 0.01;
                    //console.log(spawnSpeed);
                }
                setTimeout(SpawnObstacle,spawnSpeed);
            }
        }
        setTimeout(SpawnObstacle, spawnSpeed);
}

function Collision(objet)
{
    setInterval(function(){
        if (objet.intersectsMesh(hitbox, false)) {
            objet.dispose();
            //coeurDegat();
        }
    }, 100);

}

    function coeurDegat(){
        var coeur1 = $('#coeur1').attr("name");
        var coeur2 = $('#coeur2').attr("name");
        var coeur3 = $('#coeur3').attr("name");

        console.log(coeur1);
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


function Boite() // caisse en l'air
{
    // Création box
    var caisse = BOITE_MODEL.clone(BOITE_MODEL.name);
    caisse.position.x = 15;
    caisse.position.z = -2.1;
    caisse.position.y = -0.5;

    scene.registerBeforeRender(function () {
        caisse.position.x -= speed;
        if (caisse.position.x < -15)
            caisse.dispose();
    });

    Collision(caisse);
}

function Bouche() // caisse au sol
{
    // Création box
    var caisse = BOUCHE_MODEL.clone(BOUCHE_MODEL.name);
    caisse.position.x = 15;
    caisse.position.z = -7.8;
    caisse.position.y = -0.15;

    scene.registerBeforeRender(function () {
        caisse.position.x -= speed;
        if (caisse.position.x < -15)
            caisse.dispose();
    });

    Collision(caisse);
}

function Mur() // mur
{
    // Création box
    var caisse = MUR_MODEL.clone(MUR_MODEL.name);
    caisse.position.x = 20;
    caisse.position.z = 1.8;
    caisse.position.y = -0.15;

    scene.registerBeforeRender(function () {
        caisse.position.x -= speed;
        if (caisse.position.x < -15)
            caisse.dispose();
    });

    Collision(caisse);
}
