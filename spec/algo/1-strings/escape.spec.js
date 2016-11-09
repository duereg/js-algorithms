const escape = require('../../../lib/algorithms/1-strings/escape');

const preEscape = 'A beautiful test string      ';
const postEscape = 'A%20beautiful%20test%20string';

describe('When using escape() on a string', () => {
  it('a string is generated with no spaces.', () => {
    expect(escape(preEscape)).not.toContain(' ');
  });

  it('a string is generated with "%20"', () => {
    expect(escape(preEscape)).toContain('%20');
  });

  it('the correct value is output', () => {
    expect(escape(preEscape)).toEqual(postEscape);
  });
});
