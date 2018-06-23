var socket = io();

function scrollToBottom () {
    var elem = document.getElementById('messages');
    elem.scrollTop = elem.scrollHeight;
}

function getMyUsername() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var myUsername = url.searchParams.get('name');
    return myUsername;
}

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li class=\"user-list\" style=\"border: 1px solid ' + user.color + ';\"></li>').append('<img src=\"/images/user.png\" class=\"avatar\"> ' + user));
    });

    jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('HH:mm');
    var template = jQuery('#message-template').html();
    if(getMyUsername() === message.from) {
        var style = 'border: 2px solid ' + message.color + ';background-color: #C8C8C8;border-radius: 15px;padding: 5px 2% 5px 2%;margin: 5px 1% 5px 50%;';

        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formattedTime,
            style: style,
            avatar: "right",
        });
    } else {
        var style = 'border: 2px solid ' + message.color + ';background-color: white;border-radius: 15px;padding: 5px 2% 5px 2%;margin: 5px 50% 5px 1%;';

        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formattedTime,
            style: style,
            avatar: "left"
        });
    }

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newServiceMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('HH:mm');
    var template = jQuery('#message-service-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    });
});
