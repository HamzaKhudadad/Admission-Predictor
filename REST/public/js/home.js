$(document).ready(function(){

    $('#favorite').on('submit', function(e){
        e.preventDefault();

        var id = $('#id').val();
        var UniName = $('#Uni_Name').val();

        $.ajax({
            url: '/home',
            type: 'POST',
            data: {
                id: id,
                UniName: UniName
            },
            success: function(){
                console.log(UniName);
            }
        })

    });
});
