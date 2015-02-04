# Biblitag

In short, this is an attempt to build something similar to [RefTagger](http://reftagger.com/).
The project's current aim is to provide a tool for the Italian language, but future efforts will go in making sure the final library is language-agnostic and able to leverage the multilinguality of the BCV parser being user.

All this initial version of Biblitag does is to identify Bible references (e.g. Giovanni 3:16) and "linkify" them (e.g. [Giovanni 3:16](https://www.biblegateway.com/passage/?search=John.3.16&version=NR2006)).

## The BCV parser

[The actual parser](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser) to match biblical references is developed by [@openbibleinfo](https://github.com/openbibleinfo) and it provides support for multiple languages.

However, for Italian (and possibly for other languages too) the Bible translations supported out of the box are do not include the most populare protestant Bibles. 
So, at the moment I am keeping in this repository a modified version of the parser for Italian. The original project is written in Coffeescript, so at the moment I am trying to figure out how to contribute those changes back to the original project so that I will no longer have to include the modified JS file here.

## Code

My JS is probably not great. In over a decade of Web Development, I carefully and wilfully avoided it, delegating it to others. 
This time I could not do any different. It surely is not a coincendence that the only time I do not refuse to write Javascript code is when it has to do with God my Lord.
