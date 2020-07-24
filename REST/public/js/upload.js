$(document).ready(function(){
    $('.upload-btn').on('click', function(){
        $('#upload-input').click();
    });

    //change eventlistener
    $('#upload-input').on('change', function(){
        var uploadInput = $('#upload-input');
        //emptyform validation javascrip form data to send data through xmlhttp request makes key value pair
        if(uploadInput.val() != ''){
            var formData = new FormData();

            formData.append('upload', uploadInput[0].files[0]);

// ajaz request to send data to server
            $.ajax({
                url: '/uploadFile',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(){
                    uploadInput.val('');
                }
            })
        }
    })
})
