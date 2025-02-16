const express = require('express');
const app = express();
const bodyP = require('body-parser');
const compiler = require('compilex');
const options = {
  stats: true
};
const fs = require('fs');
compiler.init(options);

app.use(bodyP.json());
app.use(
    '/codemirror-5.65.17', express.static('G:/CodeFlex/codemirror-5.65.17'));



app.get('/', function(req, res) {
  compiler.flush(function() {
    console.log('deleted');
  })
  res.sendFile('G:/CodeFlex/index.html');
});



app.post('/compile', function(req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;

  try {
    if (lang === 'Cpp') {
      if (!input) {
        var envData = {OS: 'windows', cmd: 'g++', options: {timeout: 10000}};
        compiler.compileCPP(envData, code, function(data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
        });
      } else {
        var envData = {OS: 'windows', cmd: 'g++', options: {timeout: 10000}};
        compiler.compileCPPWithInput(envData, code, input, function(data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
        });
      }
    } else if (lang === 'Java') {
      if (!input) {
        var envData = {OS: 'windows'};
        compiler.compileJava(envData, code, function(data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
        });
      } else {
        var envData = {OS: 'windows'};
        compiler.compileJavaWithInput(envData, code, input, function(data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
        });
      }
    } else if (lang === 'Python') {
      if (!input) {
        var envData = {OS: 'windows'};
        compiler.compilePython(envData, code, function(data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
        });
      } else {
        var envData = {OS: 'windows'};
        compiler.compilePythonWithInput(envData, code, input, function(data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
        });
      }
    }
  } catch (e) {
    console.log('Error' + e.message);
  }
});



// For Cpp
app.get('/template/cpp', function(req, res) {
  fs.readFile(
      'G:/CodeFlex/templates/cpp_template.txt', 'utf8', function(err, data) {
        if (err) {
          res.status(500).send('Template not found');
        } else {
          res.send({template: data});
        }
      });
});



// For Java
app.get('/template/java', function(req, res) {
  fs.readFile(
      'G:/CodeFlex/templates/java_template.txt', 'utf8', function(err, data) {
        if (err) {
          res.status(500).send('Template not found');
        } else {
          res.send({template: data});
        }
      });
});



// For Python
app.get('/template/python', function(req, res) {
  fs.readFile(
      'G:/CodeFlex/templates/python_template.txt', 'utf8', function(err, data) {
        if (err) {
          res.status(500).send('Template not found');
        } else {
          res.send({template: data});
        }
      });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});