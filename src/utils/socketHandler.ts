import { messageModel, roomModel } from '@models/index'

var { io } = require('../index');
const nsp = io.of('/demo');
const moment = require('moment-timezone');

export = async (eventEmitter: any) => {

nsp.on('connection', function (socket:any) {
    console.log("someone connected -------------------------------------------------------------------------");
    var addMessage = async function (data:any) {
        await new messageModel(data).save();
    }

    var addRoom = async function (room:any) {
        var chatData = await roomModel.findOne({ 'roomId': room.room_id });
        if (!chatData) {
            await new roomModel({ 'orderId': room.orderId, 'roomId': room.room_id, 'userId': room.userId, 'creator': room.creator, 'vendorId': room.vendorId, 'specId': room.specId, 'req_from': room.req_from, 'createdAt': new Date() }).save();
        }
    }

    socket.on('join_room', function (room:any) {
        console.log('join_room', room);
        console.log('Join room ------------');
        addRoom(room);
        socket.join(room.room_id);
    });

    socket.on('send_message', function (data:any) {
        console.log('Send message ------------', data);
        var saveMessage = {
            'userId': data.userId,
            'vendorId': data.vendorId,
            'specId': data.specId,
            'send_from': data.send_from,
            'send_to': data.send_to,
            'roomId': data.room_id,
            'message': data.message,
            'message_type': data.message_type,
            'date': data.date,
            'image': data.image,
            'createdAt': data.date_now
        };

        addMessage(saveMessage);
        socket.broadcast.to(data.room_id).emit('chat_message', {
            send_from: data.send_from,
            room_id: data.room_id,
            message: data.message,
            date_now: data.date_now
        });

        
    });

    socket.on('typing', function (room:any) {
        console.log('Typing ------------', room);
        socket.broadcast.to(room.room_id).emit('user_typing', {
            message: 'typing.......',
        });
    });
});



}




