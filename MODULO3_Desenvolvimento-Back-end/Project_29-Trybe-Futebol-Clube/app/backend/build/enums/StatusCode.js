"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["HTTP_OK"] = 200] = "HTTP_OK";
    StatusCode[StatusCode["HTTP_CREATED"] = 201] = "HTTP_CREATED";
    StatusCode[StatusCode["HTTP_NO_CONTENT"] = 204] = "HTTP_NO_CONTENT";
    StatusCode[StatusCode["HTTP_BAD_REQUEST"] = 400] = "HTTP_BAD_REQUEST";
    StatusCode[StatusCode["HTTP_UNAUTHORIZED"] = 401] = "HTTP_UNAUTHORIZED";
    StatusCode[StatusCode["HTTP_NOT_FOUND"] = 404] = "HTTP_NOT_FOUND";
    StatusCode[StatusCode["HTTP_CONFLICT"] = 409] = "HTTP_CONFLICT";
    StatusCode[StatusCode["HTTP_UNPROCESSABLE_ENTITY"] = 422] = "HTTP_UNPROCESSABLE_ENTITY";
    StatusCode[StatusCode["HTTP_INTERNAL_SERVER_ERROR"] = 500] = "HTTP_INTERNAL_SERVER_ERROR";
})(StatusCode || (StatusCode = {}));
exports.default = StatusCode;
//# sourceMappingURL=StatusCode.js.map