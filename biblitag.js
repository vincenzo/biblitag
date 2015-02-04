/**
 * Constructor.
 * @constructor
 */
var Biblitag = function (translation, provider) {
  this.bcv = new bcv_parser();
  this.defaultTranslation = translation || 'NR2006';
  this.bibleProvider = provider || 'biblegateway';
  this.s = '';
};

/**
 * Parse function to identify biblical references and replace them with links.
 * @param s
 *  The text to parse.
 * @returns {string}
 *  The "linkified" text.
 */
Biblitag.prototype.parse = function (s) {
  // Store the original text in a local property.
  this.s = s;

  // Parse the text.
  var pe = this.bcv.parse(this.s).osis_and_indices();

  for (var i = 0; i < pe.length; i++) {
    // The string to be replaced is identified as follows:
    // - From the original text to parse, get the substring beginning at
    //   pe[i].indices[0] and ending at pe[i].indices[1].
    //   If a translation was matched too, then the substring ends at
    //   pe[i].indices[1] - (length of the translation code + 1), where 1 is the
    //   length of the whitespace between the verse and the translation.
    // - Then add to the text to be replaced the translation (plus a whitespace)
    //   if one was matched.
    var toReplace = this.s.substring(pe[i].indices[0], pe[i].indices[1] - (pe[i].translations[0].length ? pe[i].translations[0].length + 1 : 0)) + (pe[i].translations[0] ? ' ' + pe[i].translations[0] : '');
    // The Bible's version (translation).
    var version = pe[i].translations[0] ? pe[i].translations[0] : this.defaultTranslation;
    // The "linkified" version of the original matched text.
    var link = this.buildLink(pe[i].osis, version, toReplace, this.bibleProvider);

    // Linkification.
    s = s.replace(toReplace, link);
  }

  // Remove control characters used during the linkification to mark those
  // passages already "linkified", so to avoid double (and thus erroneous)
  // linkification. Without this control characters (insert in 'buildLink'),
  // if the passage contained both 1 John 2:13 and John 2:13 (in this order, for
  // example), John 2:13 would never be linkified and its link would go onto the
  // former reference.
  this.s = s.replace(/\x1f\x1e/gi, ' ');

  // Return the linkified version of the original text passed in.
  return this.s;
};

/**
 * Builds the link to the Bible provider.
 *
 * @param osis
 *  The OSIS representation of the biblical reference.
 * @param version
 *  The version (translation).
 * @param anchor
 *  The anchor text to use in the link.
 * @param provider
 *  The Bible onlie provider (e.g. Bible Gateway => biblegateway).
 * @returns {string}
 *  The link.
 */
Biblitag.prototype.buildLink = function(osis, version, anchor, provider) {
  var a = document.createElement('a');
  a.appendChild(document.createTextNode(anchor.replace(/ /gi, '\x1f\x1e')));
  a.title = a.innerHTML;
  switch(provider) {
    case 'biblegateway':
      a = this.biblegateway(a, osis, version);
  }
  return a.outerHTML;
}

/**
 * Builds the href for Bible Gateway.
 *
 * @param a
 *  The link object to be completed with the href.
 * @param osis
 *  The OSIS representation of the biblical reference.
 * @param version
 *  The version (translation).
 * @returns {*}
 */
Biblitag.prototype.biblegateway = function(a, osis, version) {
  a.href = 'https://www.biblegateway.com/passage/?search=' + osis + '&version=' + version;
  return a;
};

