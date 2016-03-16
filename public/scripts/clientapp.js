$(document).ready(function() {

    $('#submit-button').on('click', postData);


});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                // console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            appendDom(data);
            clearForms();
        }
    });
}

function appendDom(people){
    var fromDb = people[0];
    console.log(fromDb);
    $('.db-people').append('<p>Name: ' + fromDb.name + '</p>' +
                           '<p>Address: ' + fromDb.address + '</p>' +
                           '<p>City: ' + fromDb.city + '</p>' +
                           '<p>State: ' + fromDb.state + '</p>' +
                           '<p>Zip Code: ' + fromDb.zip_code + '</p>' );
}

function clearForms(){
    $('#name').val('');
    $('#address').val('');
    $('#city').val('');
    $('#state').val('');
    $('#zip_code').val('');
}
