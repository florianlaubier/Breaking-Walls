$(document).ready(function()
{
    var pause = false;
    //$("#Jeu").hide();
    //engine.stopRenderLoop();
    $("#Menu").hide();

    $(document).on('click', "#Jouer", function()
    {
        engine.runRenderLoop(function () {
            scene.render();
        });
        $("#Jeu").show("slow");
        $("#Menu").hide("slow");
    });

    window.addEventListener("keydown", function (e)
    {

        if(e.which == 80 && !pause) // P
        {
            engine.stopRenderLoop();
            console.log("heyyy");
            //$("#Jeu").hide("slow");
            $("#Menu").show("slow");
            pause = true;
        }
        else if (e.which == 80 && pause){
            engine.runRenderLoop(function () {
            scene.render();
            });
            $("#Jeu").show("slow");
            $("#Menu").hide("slow");
            pause = false;
        }

        if(e.which == 74 && pause) // J
        {
            engine.runRenderLoop(function () {
            scene.render();
            });
            $("#Jeu").show("slow");
            $("#Menu").hide("slow");
            pause = false;
        }
    });

});

