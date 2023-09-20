"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SocketIoService = void 0;
var socket_io_client_1 = require("socket.io-client");
var core_1 = require("@angular/core");
var SocketIoService = /** @class */ (function () {
    function SocketIoService() {
    }
    SocketIoService.prototype.init = function () {
        this.socket = socket_io_client_1.io('http://localhost:3000');
    };
    SocketIoService.prototype.getMessage = function () {
        this.socket.on('sendMessage', function (message) { });
    };
    // => JOINING SPECIFIC ROOM
    SocketIoService.prototype.joinRoom = function (joinPath) {
        this.socket.emit('join', joinPath, function (msg) { });
    };
    // => ON ADD NEW COMMENT (CLIENT => SERVER)
    SocketIoService.prototype.onAddComment = function (newComment, joinPath) {
        this.socket.emit('onAddComment', { newComment: newComment, joinPath: joinPath });
    };
    // => ON ADD NEW COMMENT (CLIENT => SERVER)
    SocketIoService.prototype.onDeleteComment = function (commentId, joinPath) {
        this.socket.emit('onDeleteComment', { commentId: commentId, joinPath: joinPath });
    };
    // => ON ADD NEW POST
    SocketIoService.prototype.onAddPost = function (post) {
        this.socket.emit('onAddPost', post);
    };
    SocketIoService.prototype.onDeletePost = function (postId) {
        this.socket.emit('onDeletePost', postId);
    };
    //=> DISCONNECT USERkdkk
    SocketIoService.prototype.disconnectUser = function (joinPath) {
        this.socket.emit('userOut', joinPath);
    };
    SocketIoService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], SocketIoService);
    return SocketIoService;
}());
exports.SocketIoService = SocketIoService;
