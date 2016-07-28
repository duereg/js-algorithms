const escape = require('../../../lib/algorithms/1-strings/escape.js');

const preEscape = 'A beautiful test string      ';
const postEscape = 'A%20beautiful%20test%20string';

describe('When using escape() on a string', function () {
  it('a string is generated with no spaces.', function () {
    expect(escape(preEscape)).not.toContain(' ');
  });

  it('a string is generated with "%20"', function () {
    expect(escape(preEscape)).toContain('%20');
  });

  it('the correct value is output', function () {
    expect(escape(preEscape)).toEqual(postEscape);
  });
});
