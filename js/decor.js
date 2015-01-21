var FACADE_MODEL;
var SOL_MODEL;

function initDecor()
{
    Decor();

}

function Decor()
{
    // Création du sol
    // var ground = BABYLON.Mesh.CreateGround("ground1", 100, 20, 2, scene);
    var murs = [];
    var sols = [];

    BABYLON.SceneLoader.ImportMesh("", "textures/", "sol.babylon", scene, function (meshes)
    {
        var m = meshes[0];
        // set the position of the model
        m.position = new BABYLON.Vector3(0,7,11);
        //m.rotate(BABYLON.Axis.Z, 3.14, BABYLON.Space.WORLD);
        m.rotate(BABYLON.Axis.Y, 3.14, BABYLON.Space.WORLD);
        // set the scale of the model
        m.isVisible = false;
        m.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);
        SOL_MODEL = m;

        AddSol(SOL_MODEL, 50, 3);

    });

    BABYLON.SceneLoader.ImportMesh("", "textures/", "facade.babylon", scene, function (meshes)
    {
        var m = meshes[0];
        // set the position of the model
        m.position = new BABYLON.Vector3(0,7,11);
        //m.rotate(BABYLON.Axis.Z, 3.14, BABYLON.Space.WORLD);
        m.rotate(BABYLON.Axis.Y, 3.14, BABYLON.Space.WORLD);
        // set the scale of the model
        m.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);
        m.isVisible = false;
        // set relative referential, the model
        FACADE_MODEL = m;

        AddFacade(FACADE_MODEL, 36, 4);
    });

    function AddFacade(model, taille, NbMur)
    {
        for(var i=0;i<NbMur;i++)
        {
            var face = model.clone(model.name);
            face.position = new BABYLON.Vector3((taille*i),7,11);
            face.isVisible = true;
            murs.push(face);
        }
    }

    function AddSol(model, taille, NbMur)
    {
        for(var i=0;i<NbMur;i++)
        {
            var sol = model.clone(model.name);
            sol.position = new BABYLON.Vector3((taille*i),7,11);
            sol.isVisible = true;
            sols.push(sol);
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

    //Déplacement du mur et du ground
    scene.registerBeforeRender(function () {
        for (var i in sols) {
          sols[i].position.x -= speed;
          if (sols[i].position.x < -25)
              sols[i].position.x = 100;
        }
    });

    scene.registerBeforeRender(function () {
    for (var i in murs) {
        murs[i].position.x -= speed;
        if (murs[i].position.x < -36)
            murs[i].position.x = 72;
        }
    });

}


