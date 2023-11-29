"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
/**
 * Add middleware
 *
 * @param noteService - note domain service
 */
function useAuthResolver() {
    /**
     *
     * @param requestData - fastify request data. Can be query, params or body
     */
    async function resolveUserAuth(requestData) {
        if (requestData.id !== null) {
            return await undefined;
        }
    }
    return {
        authResolver: async function authUserResolver(request, reply) {
            let user;
            try {
                user = resolveUserAuth(request);
                if (user !== undefined) {
                    request.body = user;
                }
                else {
                    throw new Error('Note not found');
                }
            }
            catch (error) {
                await reply
                    .code(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE)
                    .send({
                    message: 'Note not found',
                });
            }
        },
    };
}
exports.default = useAuthResolver;
