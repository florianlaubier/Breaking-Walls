var MUR_MODEL;

function initDecor()
{
    Decor();

}

function Decor()
{
    // Création du sol
    var ground = BABYLON.Mesh.CreateGround("ground1", 100, 20, 2, scene);
    var murs = [];

    BABYLON.SceneLoader.ImportMesh("", "textures/", "face.babylon", scene, function (meshes)
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
        MUR_MODEL = m;
        murs.push(m);

        //AddMur(MUR_MODEL, 16.5, 3);
    });

    function AddMur(model, taille, NbMur)
    {
        for(var i=0;i<NbMur;i++)
        {
            var mur = model.clone(model.name);
            mur.position = new BABYLON.Vector3((taille*i),7,11);
            mur.isVisible = true;
            murs.push(mur);
        }
    }

    // Create a box for the skybox
    var skybox = BABYLON.Mesh.CreateBox("skybox", 500.0, scene);
    // create a texture for the skybox
    var skyboxtexture = new BABYLON.StandardMaterial("skybox", scene);
    // allow texture on internal face of the cube
    skyboxtexture.backFaceCulling = false;
    // apply the material created on the cube
    skybox.material = skyboxtexture;
    // remove light effect and create a white light
    skyboxtexture.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // give textures for the cube
    skyboxtexture.reflectionTexture = new BABYLON.CubeTexture("textures/skybox2/skybox", scene);
    // give the texture mode
    skyboxtexture.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

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


