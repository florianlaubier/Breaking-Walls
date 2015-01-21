var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

var speed = 0.2;
var speedJump = 0.2;
var heightJump = 4;

var createScene = function () {

    // Background color
    scene.clearColor = new BABYLON.Color3(1,1,1);

    // Création de la caméra
    //var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 4, -15), scene);

    // ArcRotateCamera >> Camera turning around a 3D point (here Vector zero) with mouse and cursor keys
    // Parameters : name, alpha, beta, radius, target, scene
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", -5.2, 1.5, -2, new BABYLON.Vector3(-2, 4, -13), scene);

    // caméra de debug
    // var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene);

    // Attache la caméra au canvas
    camera.attachControl(canvas, true);
    //camera.target = player;

    // création de la lumière
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Intensité de la lumière
    light.intensity = 0.5;

    //Appel player
    initJoueur();

    // Appel du décor
    initDecor();

    //Appel des obstacles
    initObstacle();

    // Leave this function
    return scene;
};
