const sum  = require('./index');
//const post  = require('./index');

test('adds 2 nums', () => {
    expect(sum(1,3)).toBe(4);
});

/*test('posting index', () => {
    expect(post('./index.js')).toBe(true);
    done();
});*/