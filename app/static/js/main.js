//$(document).ready(function() {
    var peer = new Peer();
    var conn_arr = [];
    var socket = io.connect(window.location.toString());
    var peer_id;
    var x = 20;
    var y = 30;

    function connect() {
        console.log('peer_id = ', peer_id);
        socket.emit('join', {peer_id: peer_id});
    }

    socket.on('all_users', function(data) {
        console.log(data['all_users']);
        for (let user_info of data['all_users']){
            let other_peer_id = user_info['peer_id'];
            let x = user_info['x'], y = user_info['y'];

            let player = document.createElement('div');
            player.className = 'player';
            $(player).css('top', y + 'px');
            $(player).css('left', x + 'px');
            player.id = other_peer_id;

            console.log(other_peer_id, '(', x, y, ')', peer_id === other_peer_id);

            if (peer_id !== other_peer_id) {
                connectToNode(other_peer_id);
                player.className = 'other-player';
            }

            $('body').append(player);
        }
    });

    function new_conn(c) {
        conn_arr.push(c);

        let player = document.createElement('div');
        player.className = 'other-player';
        $(player).css('top', y + 'px');
        $(player).css('left', x + 'px');
        player.id = c.peer;
        $('body').append(player);

        initConn(conn_arr.length - 1);
    }

    peer.on('open', function (peerID) {
        peer_id = peerID;
        console.log(peer_id);
        connect();
    });

    peer.on('connection', function (c) { //входящее соединение...
        console.log(c['peer']);
        new_conn(c);
    });

    function connectToNode(partnerPeer) { //исходящее соединение...
        new_conn(peer.connect(partnerPeer));
    }

    function initConn(ind) {
        let other_peer_id = conn_arr[ind].peer;
        conn_arr[ind].on('open', function () { //открыто соединение
            conn_arr[ind].on('data', function (data) { //прилетело сообщение
                console.log('message received');
                let new_x = data['x'];
                let new_y = data['y'];
                console.log(new_x, new_y);
                $('#' + other_peer_id).css('top', new_y.toString() + 'px');
                $('#' + other_peer_id).css('left', new_x + 'px');
            });
        });
        conn_arr[ind].on('close', function () {
            $('#' + other_peer_id).css('display', 'none');
        });
    }

    function sendMess(data) {
        for (let i = 0; i < conn_arr.length; i++) {
            conn_arr[i].send(data);
        }
    }

    $('.field').mousemove(function(event){
        //console.log('moving');
        let x = event.offsetX;
        let y = event.offsetY;
        $('#' + peer_id).css('top', y + 'px');
        $('#' + peer_id).css('left', x + 'px');
        console.log(x, y);
        sendMess({x: x, y: y});
    });


//});