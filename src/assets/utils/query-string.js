import strictUriEncode from 'strict-uri-encode';
import objectAssign from 'object-assign';

function encoderForArrayFormat(opts) {
    switch (opts.arrayFormat) {
        case 'index':
            return function (key, value, index) {
                return value === null ? [
                    encode(key, opts),
                    '[',
                    index,
                    ']'
                ].join('') : [
                    encode(key, opts),
                    '[',
                    encode(index, opts),
                    ']=',
                    encode(value, opts)
                ].join('');
            };

        case 'bracket':
            return function (key, value) {
                return value === null ? encode(key, opts) : [
                    encode(key, opts),
                    '[]=',
                    encode(value, opts)
                ].join('');
            };

        default:
            return function (key, value) {
                return value === null ? encode(key, opts) : [
                    encode(key, opts),
                    '=',
                    encode(value, opts)
                ].join('');
            };
    }
}

function parserForArrayFormat(opts) {
    let result;

    switch (opts.arrayFormat) {
        case 'index':
            return function (key, value, accumulator) {
                result = /\[(\d*)\]$/.exec(key);

                key = key.replace(/\[\d*\]$/, '');

                if (!result) {
                    accumulator[key] = value;
                    return;
                }

                if (accumulator[key] === undefined) {
                    accumulator[key] = {};
                }

                accumulator[key][result[1]] = value;
            };

        case 'bracket':
            return function (key, value, accumulator) {
                result = /(\[\])$/.exec(key);
                key = key.replace(/\[\]$/, '');

                if (!result) {
                    accumulator[key] = value;
                    return;
                } else if (accumulator[key] === undefined) {
                    accumulator[key] = [value];
                    return;
                }

                accumulator[key] = [].concat(accumulator[key], value);
            };

        default:
            return function (key, value, accumulator) {
                if (accumulator[key] === undefined) {
                    accumulator[key] = value;
                    return;
                }

                accumulator[key] = [].concat(accumulator[key], value);
            };
    }
}

function encode(value, opts) {
    if (opts.encode) {
        return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
    }

    return value;
}

function keysSorter(input) {
    if (Array.isArray(input)) {
        return input.sort();
    } else if (typeof input === 'object') {
        return keysSorter(Object.keys(input)).sort(function (a, b) {
            return Number(a) - Number(b);
        }).map(function (key) {
            return input[key];
        });
    }

    return input;
}

export const extract = function (str) {
    return str.split('?')[1] || '';
};

export const parse = function (str, opts) {
    opts = objectAssign({ arrayFormat: 'none' }, opts);

    let formatter = parserForArrayFormat(opts);

    // Create an object with no prototype
    // https://github.com/sindresorhus/query-string/issues/47
    let ret = Object.create(null);

    if (typeof str !== 'string') {
        return ret;
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
        return ret;
    }

    str.split('&').forEach(function (param) {
        let parts = param.replace(/\+/g, ' ').split('=');
        // Firefox (pre 40) decodes `%3D` to `=`
        // https://github.com/sindresorhus/query-string/pull/37
        let key = parts.shift();
        let val = parts.length > 0 ? parts.join('=') : undefined;

        // missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
        val = val === undefined ? null : decodeURIComponent(val);

        formatter(decodeURIComponent(key), val, ret);
    });

    return Object.keys(ret).sort().reduce(function (result, key) {
        let val = ret[key];
        if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
            // Sort object keys, not values
            result[key] = keysSorter(val);
        } else {
            result[key] = val;
        }

        return result;
    }, Object.create(null));
};

export const stringify = function (obj, opts) {
    let defaults = {
        encode: true,
        strict: true,
        arrayFormat: 'none'
    };

    opts = objectAssign(defaults, opts);

    let formatter = encoderForArrayFormat(opts);

    return obj ? Object.keys(obj).sort().map(function (key) {
        let val = obj[key];

        if (val === undefined) {
            return '';
        }

        if (val === null) {
            return encode(key, opts);
        }

        if (Array.isArray(val)) {
            let result = [];

            val.slice().forEach(function (val2) {
                if (val2 === undefined) {
                    return;
                }

                result.push(formatter(key, val2, result.length));
            });

            return result.join('&');
        }

        return encode(key, opts) + '=' + encode(val, opts);
    }).filter(function (x) {
        return x.length > 0;
    }).join('&') : '';
};
