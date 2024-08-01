import express from 'express';

var app = express();
const server = require('http').createServer(app);

var io = require('socket.io')(server, {
    handlePreflightRequest: (req: any, res: any) => {
        const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": req.headers.origin //or the specific origin you want to give access to,
        };
        res.writeHead(200, headers);
        res.end();
    }
});

server.listen('3000');

const escapeHtml = (text = ""): string => {
    return text.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
};

export const initializeSockets = async () => {
    
    io.on('connection', (socket: any) => {
        socket.on('disconnect', (data: { frq: string }) => {
          console.log("user disconnected");
          socket.leave(data.frq);
          socket.disconnect(true);
          socket.to(data.frq).emit('frqUpdate', getFrqStats(data.frq));
        });
      
        // When we receive a 'message' event from our client, print out
        // the contents of that message and then echo it back to our client
        // using `io.emit()`
        socket.on('message', (message: any) => {
          console.log("Message Received: " + JSON.stringify(message));
          io.in(JSON.stringify(message.cuser)).emit('message', { type: "new-message", text: message });
        });
      
        socket.on('userConnect', (user: any) => {
          console.log("User Received: " + JSON.stringify(user));
          socket.join(JSON.stringify(user.user_id));
          // io.emit('message', { type: "new-message", text: message });
          io.in(JSON.stringify(user.user_id)).emit('message', { type: "new-message", text: user });
        });
      
        socket.on("join", (data: { frq: string, usrID: number }) => {
      
          console.log(data);
      
          console.log(`user ${data.usrID} on frequency ${data.frq} on line 194`);
      
          socket.join(data.frq);
      
          socket.to(data.frq).emit('frqUpdate', getFrqStats(data.frq));
      
        });
      
        socket.on("testOpen", (data: { frq: string }) => {
          io.in(data.frq).emit('testOpenResp', getFrqStatus(data.frq));
        });
      
        socket.on("respjoin", (data: { frq: string, usrID: number }) => {
      
          console.log(data);
      
          console.log(`user ${data.usrID} on frequency ${data.frq} on line 208`);
      
          socket.join(data.frq);
      
          socket.to(data.frq).emit('frqUpdate', getFrqStats(data.frq));
      
        });
      
        socket.on("leave", (data: { frq: string }) => {
      
          console.log('leave', data);
          socket.leave(data.frq);
          socket.disconnect(true);
      
          socket.to(data.frq).emit('frqUpdate', getFrqStats(data.frq));
      
          // io.emit('statsUpdate', getServerStats());
      
        });
        
        socket.on("isTyping", (data: { frq: string }) => {
          socket.to(data.frq).emit('isTyping', data);
        });
      
      
        socket.on("send", async (msgObj: { chat: any }) => {
          let data = msgObj.chat;
          // console.log(data);
      
          if (!data["msg"] || data["msg"] === "" || !data["frq"] || data["frq"] === "" || !data["usrID"] || data["usrID"] === "") return;
      
          //sanitize data
          data["frq"] = escapeHtml(data["frq"]).substring(0, 32);
          data["msg"] = escapeHtml(data["msg"]).substring(0, 512);
          // chatMsgArr.push()
          if (data.store_id != null) {
            socket.to(data.frq).emit('resp', msgObj);
          } else {
            socket.to(data.frq).emit('resp', msgObj);
          }
        });
    });
}

function getFrqStats(frq: string) {
    return {
      frq: frq,
      clientsCount: io.sockets.adapter.rooms[frq] ? io.sockets.adapter.rooms[frq].length : 0
    };
}

function getFrqStatus(frq: string) {

    return {
      frq: frq,
      status: io.sockets.adapter.rooms[frq] ? true : false,
      clientsCount: io.sockets.adapter.rooms[frq] ? io.sockets.adapter.rooms[frq].length : 0
    };
}