exports.successArray = function (data) {
    return {
        message: 'ok',
        data,
    };
};

exports.success = function (data) {
    return {
        message: 'ok',
        data: [data],
    };
};

exports.failure = (message) => {
    return {
        message,
    };
};

exports.error = (message) => {
    return {
        message,
    };
};
