#!/usr/bin/env node
var wtf = require('../src/index');
var args = process.argv.slice(2, process.argv.length);

var modes = {
  '--json': 'json',
  '--plaintext': 'plaintext',
  '--html': 'html',
  '--markdown': 'markdown',
  '--latex': 'latex',
};
var mode = 'json';
args = args.filter((arg) => {
  if (modes.hasOwnProperty(arg) === true) {
    mode = modes[arg];
    return false;
  }
  return true;
});

var title = args.join(' ');
if (!title) {
  throw new Error('Usage: wtf_wikipedia Toronto Blue Jays --plaintext');
}

wtf.fetch(title, 'en', function (err, doc) {
  if (err) {
    console.error(err);
  }
  if (mode === 'json') {
    console.log(JSON.stringify(doc[mode](), null, 0));
  } else {
    var html = doc.sections(0).html();
    html = html.replace(/\n/gi,"</p>"); // Replace newline with paragraph break
    html = html.replace(/\/\"/gi,"\"");
    console.log(html);
    //console.log(doc[mode]()); // TODO: Above for testing, this is the default
  }
});
