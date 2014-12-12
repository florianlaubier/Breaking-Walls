$(document).ready(function()
{
    //$("#Jeu").hide();
    $("#Menu").hide();

    $(document).on('click', "#BtnPause", function()
    {
        console.log("heyyy");
        $("#Jeu").hide("slow");
        $("#Menu").show("slow");
    });

    $(document).on('click', "#Jouer", function()
    {
        $("#Jeu").show("slow");
        $("#Menu").hide("slow");
    });

});

