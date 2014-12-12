var MUR_MODEL;

function initDecor()
{
    Decor();

}

function Decor()
{
    // Création du sol
    var ground = BABYLON.Mesh.CreateGround("ground1", 60, 6, 2, scene);
    var murs = [];

    BABYLON.SceneLoader.ImportMesh("", "textures/", "facade.babylon", scene, function (meshes)
    {
       var m = meshes[0];
        // set the position of the model
        m.position = new BABYLON.Vector3(-16.5,7,8);
        m.rotate(BABYLON.Axis.Z, 3.14, BABYLON.Space.WORLD);
        m.rotate(BABYLON.Axis.Y, -1.57, BABYLON.Space.WORLD);
        // set the scale of the model
        m.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);
        //m.isVisible = false;
        // set relative referential, the model
        MUR_MODEL = m;
        murs.push(m);

        AddMur(MUR_MODEL, 16.5, 3);
    });

    function AddMur(model, taille, NbMur)
    {
        for(var i=0;i<NbMur;i++)
        {
            var mur = model.clone(model.name);
            mur.position = new BABYLON.Vector3((taille*i),7,8);
            mur.isVisible = true;
            murs.push(mur);
        }
    }

    // Déplacement du mur et du ground
    scene.registerBeforeRender(function () {
    ground.position.x -= speed;
    if (ground.position.x < -15)
        ground.position.x = 15;
    });

    scene.registerBeforeRender(function () {
    for (var i in murs) {
        murs[i].position.x -= speed;
        if (murs[i].position.x < -34)
            murs[i].position.x = 33;
        }
    });

}


