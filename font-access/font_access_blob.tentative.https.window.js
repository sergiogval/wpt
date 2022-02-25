//META: script=/resources/testdriver.js
//META: script=/resources/testdriver-vendor.js
//META: script=resources/font-asserts.js
//META: script=resources/font-data.js
//META: script=resources/font-test-utils.js

'use strict';

font_access_test(async t => {
  const fonts = await navigator.fonts.query();

  // Fonts we know about. Not all expected fonts are included.
  const testData = getTestData();
  // Reduce down the size of results for testing purposes.
  const filteredFonts = filterFonts(fonts, [...testData.keys()]);

  for (const font of filteredFonts) {
    const data = await font.blob();
    assert_not_equals(data.size, 0, 'Returned Blob size slot is populated.');
    const buffer = await data.arrayBuffer();
    assert_not_equals(buffer.length, 0, 'Returned ArrayBuffer is not empty.');
    assert_equals(
      data.type, 'application/octet-stream',
      'Returned Blob is of type octet-stream.');

    const parsedData = await parseFontData(data);
    assert_not_equals(
      parsedData.version, 'UNKNOWN', 'SFNT version is a known type.');
    assert_not_equals(
      parsedData.tables.size, 0, "Should not have tables of size zero.");
    assert_font_has_tables(font.postscriptName, parsedData.tables, BASE_TABLES);
  }
}, 'blob(): fonts have expected tables that are not empty');
