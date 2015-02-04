
var Biblitag = function () {
  this.defaultTranslation = 'NR2006';
  this.defaultBibleProvider = 'biblegateway';
  this.s = '';
  this.bibleProvider = '';
};

Biblitag.prototype.parse = function (s) {
  this.s = s;
  if (this.bibleProvider == '') {
    this.bibleProvider = this.defaultBibleProvider;
  }

  var bcv = new bcv_parser();
  var pe = bcv.parse(this.s).osis_and_indices();

  for (var i = 0; i < pe.length; i++) {
    var toReplace = this.s.substring(pe[i].indices[0], pe[i].indices[1] - (pe[i].translations[0].length ? pe[i].translations[0].length + 1 : 0)) + (pe[i].translations[0] ? ' ' + pe[i].translations[0] : '');
    var version = pe[i].translations[0] ? pe[i].translations[0] : this.defaultTranslation;
    var link = this.buildLink(pe[i].osis, version, toReplace, this.bibleProvider);
    s = s.replace(toReplace, link);
  }
  this.s = s.replace(/\x1f\x1e/gi, ' ');

  return this.s;
};

Biblitag.prototype.buildLink = function(osis, version, anchor, provider) {
  var a = document.createElement('a');
  var linkText = document.createTextNode(anchor.replace(/ /gi, '\x1f\x1e'));
  a.appendChild(linkText);
  switch(provider) {
    case 'biblegateway':
      a = this.biblegateway(a, osis, version);
  }
  return a.outerHTML;
}

Biblitag.prototype.biblegateway = function(a, osis, version) {
  a.href = 'https://www.biblegateway.com/passage/?search=' + osis + '&version=' + version;
  return a;
};

