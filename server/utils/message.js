var moment = require('moment');

var generateMessage = (from, text, color) => {
    return {
        from,
        text,
        createdAt: moment().valueOf(),
        color
    };
};

module.exports = {generateMessage};
