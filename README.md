# Biblitag

In short, this is an attempt to build something similar to [RefTagger](http://reftagger.com/).
The project's current aim is to provide a tool for the Italian language, but in theory the `biblitag.js` is language-agnostic and can leverage the multilinguality of the [`BCV` parser]((https://github.com/openbibleinfo/Bible-Passage-Reference-Parser) being used.

All this initial version of `Biblitag` does is to identify Bible references (e.g. Giovanni 3:16) and "linkify" them (e.g. [Giovanni 3:16](https://www.biblegateway.com/passage/?search=John.3.16&version=NR2006)).

## The Italian BCV parser

The parser to match biblical references is developed by [@openbibleinfo](https://github.com/openbibleinfo) and it provides support for multiple languages. However, for the Italian (and possibly for other languages too) the Bible translations supported out of the box do not include the most popular protestant Bibles. Therefore, at the moment I am keeping in this repository a modified version for the Italian flavour of the library (and even a minified version of it, which only comes for English in the official repository). The original project is written in Coffeescript, so at the moment I am trying to figure out how to contribute those changes back to the original project so that I will no longer have to include the modified JS file in here.

## Code

My JS is probably not great (so, please, contribute). In over a decade of Web Development, I carefully and wilfully avoided it, delegating it to others. 
This time I could not do any different. It surely is not a coincendence that the only time I did not refuse to write Javascript code was when it had to do with **The Lord my God**.

## Usage

To use `Biblitag` you will require `jQuery` (probably an overkill, I am open to suggestions) and the `BCV` parser by [@openbibleinfo](https://github.com/openbibleinfo) I already mentioned above (for the Italian, use the version included in this repo, not in theirs). I've decided to take advantage of Github `gh-pages` so you can include the `BCV` parser and `Biblitag` directly from here. In fact, the following added to your `<head></head>` should suffice to recognise and "linkify" every Italian verse reference on your entire HTML page.

```html
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js'></script>
<script type='text/javascript' src="http://vincenzo.github.io/biblitag/bcv/it_bcv_parser.min.js"></script>
<script type='text/javascript' src="http://vincenzo.github.io/biblitag/biblitag.js"></script>
<script type='text/javascript'>
    BIBLITAG.init();
</script>
```

(But of course you are free to download the files and host them where you prefer).

The `.init()` function accepts the same parameters as the `Biblitag()` constructor, so you can vary that to change your default Bible version or change the target in the page, e.g.

```html
<script type='text/javascript'>
    BIBLITAG.init('LND', null, '#article');
</script>
```

The above will

1. use `La Nuova Diodati` as Bible translation;
2. leave `biblegateway` as online Bible provider;
3. parse only the text contained in the HTML element with id `#article`

Like I said, `Biblitag` should work regardless of the language, so you should be able to replace this

```html
<script type='text/javascript' src="http://vincenzo.github.io/biblitag/bcv/it_bcv_parser.min.js"></script>
```

with 

```html
<script type='text/javascript' src="/path/to/en_bcv_parser.min.js"></script>
```

or 

```html
<script type='text/javascript' src="/path/to/de_bcv_parser.min.js"></script>
```

or any other available in the [Bible-Passage-Reference-Parser](github.com/openbibleinfo/Bible-Passage-Reference-Parser)'s repo.
