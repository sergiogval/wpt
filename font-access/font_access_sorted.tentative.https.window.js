//META: script=/resources/testdriver.js
//META: script=/resources/testdriver-vendor.js
//META: script=resources/font-asserts.js
//META: script=resources/font-test-utils.js

'use strict';

font_access_test(async t => {
  const fonts = await navigator.fonts.query();
  // The following tests that fonts are sorted. Postscript names are expected to
  // be encoded in a subset of the ASCII character set.
  // See: https://docs.microsoft.com/en-us/typography/opentype/spec/name
  // Should the Postscript name contain characters that are multi-byte, this
  // test may erroneously fail.
  let previousFont = null;
  for (const font of fonts) {
    if (previousFont) {
      assert_true(
          previousFont.postscriptName < font.postscriptName,
          `font is not in expected order. expected: ${
              previousFont.postscriptName} < ${font.postscriptName}`);
    }

    previousFont = font;
  }
}, 'query(): fonts are sorted');
