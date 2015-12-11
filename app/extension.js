function getList(obj) {
    try {
        return Object.keys(obj).map(function(e) {
            return {
                value: obj[e],
                text: e
            };
        });
    } catch (e) {
        throw e;
    }

}