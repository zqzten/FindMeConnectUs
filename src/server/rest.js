module.exports = {
    APIError: function (code, message) {
        this.code = code || 'unknown_error';
        this.message = message || '';
    },
    restify: () => {
        const pathPrefix = '/api/';
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                ctx.rest = data => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                };
                try {
                    await next();
                } catch (e) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal_error',
                        message: e.message || ''
                    };
                }
            } else {
                await next();
            }
        };
    }
};
